import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

// Cargar .env manualmente
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BOT_TOKEN = env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = env.VITE_TELEGRAM_CHAT_ID;
let lastUpdateId = 0;

console.log("🚀 Bot de Menusclic (Telegram Forums) iniciado...");

async function tgApi(method, body = null) {
  const options = { method: body ? 'POST' : 'GET' };
  if (body) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, options);
    const data = await res.json();
    if (!data.ok) console.error(`[tgApi Error en ${method}]:`, data.description);
    return data;
  } catch (e) {
    console.error(`[tgApi Fetch Error en ${method}]:`, e.message);
    return { ok: false, description: e.message };
  }
}

// Caché local
const ordersCache = new Map();
const pendingActivations = new Map();
const pendingOrders = new Map();
const pendingBills = new Map();

onSnapshot(collection(db, "activations"), (snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    const data = change.doc.data();
    const sessionId = change.doc.id;

    if (change.type === "added" || change.type === "modified") {
      
      // 1. SOLICITUD DE APERTURA (MESA NUEVA)
      if (data.activationRequested && !data.active) {
        if (!pendingActivations.has(sessionId)) {
          const message = `🛎️ *NUEVA ORDEN EN ESPERA*\n\nLa *Mesa ${data.table}* está intentando enviar su primer pedido.\n\n_ID Dispositivo: ${sessionId.substring(0, 8)}_`;
          await tgApi('sendMessage', {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: `✅ Aprobar Mesa ${data.table} (Crear Hilo)`, callback_data: `activate_${data.table}_${sessionId}` }],
                [{ text: `❌ Rechazar (Mesa Vacía)`, callback_data: `reject_${sessionId}` }]
              ]
            }
          });
          
          pendingActivations.set(sessionId, {
            table: data.table,
            lastPing: Date.now()
          });
        }
      }

      if (data.active && data.threadId) {
        // Limpiar de activaciones pendientes
        pendingActivations.delete(sessionId);

        // 2. NUEVOS PEDIDOS
        const oldLen = ordersCache.get(sessionId) || 0;
        const newLen = data.orders ? data.orders.length : 0;

        if (newLen > oldLen) {
           ordersCache.set(sessionId, newLen);
           
           for (let i = oldLen; i < newLen; i++) {
             const order = data.orders[i];
             let text = `📦 *NUEVO PEDIDO #${i + 1}*\n`;
             text += `_Hora: ${new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}_\n\n`;
             
             order.items.forEach(item => {
               text += `• ${item.quantity}x ${item.title} ($${item.price * item.quantity})\n`;
             });
             const totalAccumulated = data.orders.reduce((acc, o) => acc + o.total, 0);
             text += `\n💰 *Total Acumulado:* $${totalAccumulated}`;

             await tgApi('sendMessage', {
               chat_id: CHAT_ID,
               message_thread_id: data.threadId,
               text: text,
               parse_mode: 'Markdown',
               reply_markup: {
                 inline_keyboard: [[{ text: `✅ Pedido Visto (Confirmar)`, callback_data: `ack_order_${sessionId}_${i}` }]]
               }
             });

             pendingOrders.set(`${sessionId}_${i}`, {
               table: data.table,
               threadId: data.threadId,
               orderIndex: i + 1,
               lastPing: Date.now()
             });
           }
        }

        // 3. PETICIÓN DE CUENTA
        if (data.billRequested) {
           const totalAccumulated = data.orders ? data.orders.reduce((acc, o) => acc + o.total, 0) : 0;
           
           if (!data.billNotified) {
             await tgApi('sendMessage', {
               chat_id: CHAT_ID,
               message_thread_id: data.threadId,
               text: `⚠️ *EL CLIENTE HA SOLICITADO LA CUENTA* ⚠️\n\n💰 *Total Final a Cobrar:* $${totalAccumulated}`,
               parse_mode: 'Markdown',
               reply_markup: {
                 inline_keyboard: [[{ text: `🔒 Cerrar Mesa ${data.table}`, callback_data: `close_${sessionId}` }]]
               }
             });
             await setDoc(doc(db, "activations", sessionId), { billNotified: true }, { merge: true });
           }

           if (!pendingBills.has(sessionId)) {
             pendingBills.set(sessionId, {
               table: data.table,
               threadId: data.threadId,
               totalAccumulated: totalAccumulated,
               lastPing: Date.now()
             });
           }
        }
      }
    }

    if (change.type === "removed" || (change.type === "modified" && !data.active)) {
      ordersCache.delete(sessionId);
      pendingBills.delete(sessionId);
      // Borrar todos los pendingOrders de esta sesión
      for (const key of pendingOrders.keys()) {
        if (key.startsWith(sessionId + "_")) pendingOrders.delete(key);
      }
    }
    
    if (change.type === "modified" && data.active && !data.billRequested) {
      pendingBills.delete(sessionId);
    }
    
    // Si se rechazó la activación o se canceló
    if (change.type === "removed" || (change.type === "modified" && !data.activationRequested)) {
      pendingActivations.delete(sessionId);
    }
  });
});

// Monitor que revisa cada 10 segundos
setInterval(async () => {
  const now = Date.now();

  // A. Activaciones Pendientes
  for (const [sessionId, info] of pendingActivations.entries()) {
    if (now - info.lastPing > 60000) {
      await tgApi('sendMessage', {
        chat_id: CHAT_ID,
        text: `🔔 *RECORDATORIO:* La Mesa ${info.table} aún espera que apruebes su acceso.`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: `✅ Aprobar Mesa ${info.table}`, callback_data: `activate_${info.table}_${sessionId}` },
            { text: `❌ Rechazar`, callback_data: `reject_${sessionId}` }
          ]]
        }
      });
      info.lastPing = now;
      pendingActivations.set(sessionId, info);
    }
  }

  // B. Pedidos Sin Confirmar
  for (const [orderKey, info] of pendingOrders.entries()) {
    if (now - info.lastPing > 60000) {
      await tgApi('sendMessage', {
        chat_id: CHAT_ID,
        message_thread_id: info.threadId,
        text: `🔔 *RECORDATORIO:* El PEDIDO #${info.orderIndex} de la Mesa ${info.table} aún no ha sido confirmado como Visto.`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{ text: `✅ Pedido Visto`, callback_data: `ack_order_${orderKey}` }]]
        }
      });
      info.lastPing = now;
      pendingOrders.set(orderKey, info);
    }
  }

  // C. Cuentas Pendientes
  for (const [sessionId, info] of pendingBills.entries()) {
    if (now - info.lastPing > 60000) {
       await tgApi('sendMessage', {
         chat_id: CHAT_ID,
         message_thread_id: info.threadId,
         text: `🔔 *RECORDATORIO: LA MESA ${info.table} AÚN ESPERA SU CUENTA* 🔔\n\n💰 *Total a Cobrar:* $${info.totalAccumulated}`,
         parse_mode: 'Markdown',
         reply_markup: {
           inline_keyboard: [[{ text: `🔒 Cerrar Mesa ${info.table}`, callback_data: `close_${sessionId}` }]]
         }
       });
       info.lastPing = now;
       pendingBills.set(sessionId, info);
    }
  }
}, 10000);

async function poll() {
  const data = await tgApi(`getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
  if (data.ok && data.result.length > 0) {
    for (const update of data.result) {
      lastUpdateId = update.update_id;
      if (update.callback_query) await handleCallback(update.callback_query);
      
      // Imprimir el Chat ID si el usuario manda un mensaje de texto (útil para cuando cree el nuevo grupo)
      if (update.message && update.message.text) {
        console.log(`\n=== 🚨 NUEVO MENSAJE DETECTADO 🚨 ===`);
        console.log(`Mensaje: "${update.message.text}"`);
        console.log(`El CHAT_ID de este grupo/chat es: ${update.message.chat.id}`);
        console.log(`Copia este número (con todo y el signo menos si lo tiene) en tu archivo .env en VITE_TELEGRAM_CHAT_ID\n`);
      }
    }
  }
  setTimeout(poll, 1000);
}

async function handleCallback(query) {
  const data = query.data;
  const messageId = query.message.message_id;

  if (data.startsWith('activate_')) {
    const [_, table, sessionId] = data.split('_');
    try {
      // 1. Crear el Tema (Hilo) en Telegram
      const topicRes = await tgApi('createForumTopic', {
        chat_id: CHAT_ID,
        name: `🟢 Mesa ${table}`,
      });

      if (!topicRes.ok) {
         console.error("Error creando Topic:", topicRes.description);
         // FALLBACK si el grupo no es Foro todavía o el bot no tiene permisos
         await tgApi('sendMessage', {
           chat_id: CHAT_ID,
           text: `❌ *Error:* Para abrir la Mesa ${table} en su propia pestaña, debes convertir este grupo en un "Foro" (activar Temas) en los ajustes del chat, y darle permisos al bot para gestionar temas.`,
           parse_mode: 'Markdown'
         });
         // No cerramos la petición por si lo quiere arreglar e intentar de nuevo
         return;
      }

      const threadId = topicRes.result.message_thread_id;

      // 2. Activar la mesa en Firestore guardando el ID del Hilo
      await setDoc(doc(db, "activations", sessionId), {
        table: table,
        active: true,
        activationRequested: false, // Importante para limpiar la alerta
        orders: [],
        billRequested: false,
        billNotified: false,
        threadId: threadId,
        timestamp: new Date().toISOString()
      }, { merge: true });

      // 3. Modificar el mensaje de petición original (Tema General)
      await tgApi('editMessageText', {
        chat_id: CHAT_ID,
        message_id: messageId,
        text: `✅ *Mesa ${table} Activada.*\nBusca su pestaña (hilo) en la lista de temas.`,
        parse_mode: 'Markdown'
      });

      // 4. Enviar un mensaje de bienvenida dentro del hilo
      await tgApi('sendMessage', {
        chat_id: CHAT_ID,
        message_thread_id: threadId,
        text: `📍 *SISTEMA INICIADO PARA LA MESA ${table}*\n_El cliente ya puede realizar pedidos desde la web._\n\nTodos los pedidos que haga esta mesa llegarán exclusivamente a esta pestaña. Si necesitas cerrar la mesa anticipadamente, usa el botón de abajo.`,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{ text: `🔒 Forzar Cierre de Mesa`, callback_data: `close_${sessionId}` }]]
        }
      });

    } catch (e) { console.error("Error activando:", e); }
  }

  if (data.startsWith('close_')) {
    const sessionId = data.split('_')[1];
    try {
      const docSnap = await getDoc(doc(db, "activations", sessionId));
      const finalData = docSnap.data();

      // Cerrar en Firestore
      await setDoc(doc(db, "activations", sessionId), { 
        active: false,
        billRequested: false,
        orders: []
      }, { merge: true });

      // Opcional: Cambiar el nombre del Hilo a "Cerrada" y cerrarlo en Telegram
      if (finalData && finalData.threadId) {
         await tgApi('editForumTopic', {
           chat_id: CHAT_ID,
           message_thread_id: finalData.threadId,
           name: `🔒 Mesa ${finalData.table} (Cerrada)`
         });

         await tgApi('closeForumTopic', {
           chat_id: CHAT_ID,
           message_thread_id: finalData.threadId
         });
      }

    } catch (e) {
      console.error("Error al cerrar mesa:", e);
    }
  }

  if (data.startsWith('reject_')) {
    const sessionId = data.split('_')[1];
    try {
      await setDoc(doc(db, "activations", sessionId), { 
        activationRequested: false 
      }, { merge: true });

      await tgApi('editMessageText', {
        chat_id: CHAT_ID,
        message_id: messageId,
        text: `❌ *Solicitud Rechazada*\nSe denegó el acceso a la sesión: ${sessionId.substring(0, 8)}`,
        parse_mode: 'Markdown'
      });
    } catch (e) {
      console.error("Error al rechazar mesa:", e);
    }
  }

  if (data.startsWith('ack_order_')) {
    // data: ack_order_sessionId_index
    const parts = data.split('_');
    const sessionId = parts[2];
    const orderIndex = parseInt(parts[3]);

    try {
      // Editar el mensaje para quitar el botón y poner palomita
      await tgApi('editMessageReplyMarkup', {
        chat_id: CHAT_ID,
        message_id: messageId,
        reply_markup: { inline_keyboard: [] }
      });
      // Opcional: Podrías editar el texto para añadir ✅
      
      // Actualizamos Firestore (traemos el array, lo modificamos, lo guardamos)
      const docRef = doc(db, "activations", sessionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (docData.orders && docData.orders[orderIndex]) {
          docData.orders[orderIndex].acknowledged = true;
          await setDoc(docRef, { orders: docData.orders }, { merge: true });
        }
      }
      
      pendingOrders.delete(`${sessionId}_${orderIndex}`);
    } catch (e) {
      console.error("Error al reconocer pedido:", e);
    }
  }

  await tgApi('answerCallbackQuery', { callback_query_id: query.id });
}

poll();
