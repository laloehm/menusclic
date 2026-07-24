import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from './firebase';
import { proxy } from './utils/proxy';
import { requestTableActivation, addOrderToSession, requestBillFromFirestore } from './utils/telegram';

export default function SnackDemo({ onBack, onAdmin }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de Sesión
  const [sessionData, setSessionData] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [table, setTable] = useState("S/N");
  const [sessionId, setSessionId] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  // Diccionario de Tokens a Mesas (Seguridad Criptográfica)
  const TABLE_TOKENS = {
    "k8x9p2": "5",
    "z9y8x7": "10",
    "a1b2c3": "1" // Ejemplo
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.split('?')[1]);
      const token = params.get('t');

      if (token) {
        const tableNumber = TABLE_TOKENS[token];
        
        if (tableNumber) {
          setTable(tableNumber);
          setInvalidToken(false);
          
          let id = localStorage.getItem(`menusclic_session_${tableNumber}`);
          if (!id) {
            id = `mesa_${tableNumber}`;
            localStorage.setItem(`menusclic_session_${tableNumber}`, id);
          }
          setSessionId(id);
        } else {
          setInvalidToken(true);
          setTable("S/N");
          setSessionId("");
        }
      } else {
        setTable("S/N");
        setSessionId("");
        setInvalidToken(true);
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    return () => window.removeEventListener('hashchange', handleUrlChange);
  }, []);

  // Escuchar cambios en la sesión (activación y pedidos)
  useEffect(() => {
    if (table !== "S/N" && sessionId) {
      const docRef = doc(db, "activations", sessionId);
      const unsub = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          
          // Reinicio si la mesa se cierra
          if (isActivated && data.active === false) {
            localStorage.removeItem(`menusclic_session_${table}`);
            window.location.reload(); 
            return;
          }

          setSessionData(data);
          setSessionData(data);
          if (data.table === table && data.active) {
            setIsActivated(true);
          } else {
            setIsActivated(false);
          }
        } else {
          // Si el documento no existe (mesa nunca activada), asegurarse de desactivar
          setIsActivated(false);
          setSessionData(null);
        }
      });
      return () => unsub();
    }
  }, [table, sessionId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "snack_items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => doc.data());
      itemsData.sort((a,b) => a.id - b.id);
      setItems(itemsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching snack items:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sending, setSending] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  // Detectar si la solicitud fue rechazada
  useEffect(() => {
    if (sessionData && sessionData.activationRequested === false && !sessionData.active && pendingOrder) {
      setPendingOrder(null);
      setSending(false);
      alert("❌ Tu solicitud fue rechazada por el mesero.");
    }
  }, [sessionData, pendingOrder]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (snack) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === snack.id);
      if (exists) {
        return prev.map(i => i.id === snack.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...snack, quantity: 1 }];
    });
  };

  const handleSendOrder = async () => {
    if (cartCount === 0 || invalidToken || !sessionId) return;
    setSending(true);

    const orderData = {
      items: cartItems,
      total: cartTotal,
      table: table
    };

    if (!isActivated) {
      try {
        setPendingOrder(orderData);
        await requestTableActivation(table, sessionId);
        // El botón ahora dirá "Esperando Mesero..."
      } catch (error) {
        alert("Error al solicitar activación.");
        setSending(false);
        setPendingOrder(null);
      }
    } else {
      try {
        await addOrderToSession(sessionId, orderData);
        setCartItems([]);
        setShowCart(false);
        setShowHistory(true);
        alert("¡Pedido enviado a cocina!");
      } catch (error) {
        alert("Error al enviar pedido.");
      } finally {
        setSending(false);
      }
    }
  };

  // Enviar pedido pendiente automáticamente cuando el mesero activa la mesa
  useEffect(() => {
    if (isActivated && pendingOrder) {
      const sendPending = async () => {
        try {
          await addOrderToSession(sessionId, pendingOrder);
          setPendingOrder(null);
          setCartItems([]);
          setShowCart(false);
          setShowHistory(true);
          setSending(false);
          alert("¡Mesa activada y pedido enviado a cocina!");
        } catch (e) {
          console.error("Error enviando pedido pendiente:", e);
        }
      };
      sendPending();
    }
  }, [isActivated, pendingOrder, sessionId]);

  const handleRequestBill = async () => {
    if (window.confirm("¿Estás seguro de que quieres pedir la cuenta?")) {
      try {
        await requestBillFromFirestore(sessionId);
        alert("Solicitud enviada.");
      } catch (error) {
        alert("Error al solicitar la cuenta.");
      }
    }
  };



  return (
    <div className="bg-[#fbfbe2] font-body text-[#1b1d0e] min-h-screen antialiased flex justify-center">
      <div className="w-full max-w-[700px] bg-[#fbfbe2] relative shadow-2xl min-h-screen">
        {/* Header */}
        <header className="fixed top-0 max-w-[700px] w-full z-50 bg-[#fbfbe2]/90 backdrop-blur-md px-6 h-16 flex items-center justify-between border-b border-[#ddc0ba]/30 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1 hover:bg-[#ddc0ba]/20 rounded-full transition-colors text-[#795c51]">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h1 className="font-headline text-xl font-bold tracking-tight text-[#ff4b2b]">Snack Attack</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHistory(true)} className="p-2 bg-white border border-[#ddc0ba]/40 rounded-xl shadow-sm text-[#1b1d0e] flex items-center gap-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Mi Cuenta</span>
            </button>
          </div>
        </header>

        <main className="pt-16 pb-0 relative">
          {invalidToken && (
            <div className="absolute inset-x-0 top-0 bottom-0 z-[60] bg-[#fbfbe2] flex flex-col items-center justify-center px-10 text-center min-h-[500px]">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-red-600">qr_code_scanner</span>
              </div>
              <h3 className="font-headline text-2xl font-black text-[#1b1d0e] uppercase mb-2">QR Inválido</h3>
              <p className="text-sm text-[#56423e] leading-relaxed">Este código no es válido o la URL ha sido alterada. Escanea el código QR original de la mesa.</p>
            </div>
          )}

          {(!isActivated && sessionData?.lockedByOther) && (
            <div className="absolute inset-x-0 top-0 bottom-0 z-[60] bg-[#fbfbe2]/60 backdrop-blur-[2px] flex flex-col items-center justify-start pt-32 px-10 text-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-[#ddc0ba]/30 max-w-sm">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl text-orange-600">lock</span>
                </div>
                <h3 className="font-headline text-2xl font-black text-[#1b1d0e] uppercase mb-2">Mesa Ocupada</h3>
                <p className="text-sm text-[#56423e] mb-8 leading-relaxed">Esta mesa ya está siendo utilizada por otro dispositivo.</p>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section className="relative h-[250px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbe2] via-transparent to-transparent z-10"></div>
            <img alt="Snack Experience" className="w-full h-full object-cover" src={proxy('https://images.unsplash.com/photo-1544148103-0773bf10d330')} />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="inline-block bg-[#ff4b2b] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-1 shadow-lg shadow-red-500/30">Premium Snacks</span>
              <h2 className="text-3xl font-headline font-bold text-[#1b1d0e] leading-tight text-shadow-sm">Sabor Intenso <br />en Cada Bocado</h2>
            </div>
          </section>

          {/* Single List of Items */}
          <section className="px-6 py-8 space-y-6 min-h-[400px]">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#ddc0ba] border-t-[#ff4b2b] rounded-full animate-spin"></div>
                <p className="text-[#56423e] font-bold tracking-widest text-xs uppercase animate-pulse">Preparando Snacks...</p>
              </div>
            ) : items.filter(i => i.available !== false).map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-[#ddc0ba]/20 hover:border-[#ff4b2b]/30 transition-all group shadow-sm">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300">
                  <img alt={item.title} className="w-full h-full object-cover" src={proxy(item.img)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline font-bold text-[#1b1d0e] group-hover:text-[#ff4b2b] transition-colors truncate">{item.title}</h3>
                    {item.tag && <span className="px-1.5 py-0.5 bg-red-100 text-[#ff4b2b] text-[8px] font-bold uppercase rounded leading-none">{item.tag}</span>}
                  </div>
                  <p className="text-[11px] text-[#56423e] line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-headline font-bold text-[#ff4b2b]">${item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-[#1b1d0e] text-white flex items-center justify-center hover:bg-[#ff4b2b] transition-colors shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>

        {cartCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[90]">
            <button 
              onClick={() => setShowCart(true)}
              className="w-full bg-[#ff4b2b] text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">{cartCount}</div>
                <span className="font-headline font-bold tracking-widest uppercase text-sm">Ver Pedido</span>
              </div>
              <span className="font-headline font-black text-lg">${cartTotal}</span>
            </button>
          </div>
        )}

        {/* Modals */}
        {showCart && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !sending && setShowCart(false)}></div>
            <div className="relative bg-[#fbfbe2] w-full max-w-[500px] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
              <div className="p-6 border-b border-[#ddc0ba]/30 flex items-center justify-between">
                <div>
                  <h3 className="font-headline text-2xl font-black text-[#1b1d0e] uppercase italic">Tu Pedido</h3>
                  <p className="text-[#ff4b2b] font-bold text-xs uppercase tracking-widest mt-1">Mesa {table}</p>
                </div>
                <button onClick={() => setShowCart(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ddc0ba]/20 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#ddc0ba]/20 text-xs">
                    <span className="font-medium">{item.quantity}x {item.title}</span>
                    <span className="font-headline font-bold text-[#ff4b2b]">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white border-t border-[#ddc0ba]/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total a pagar</span>
                  <span className="font-headline text-3xl font-black text-[#ff4b2b]">${cartTotal}</span>
                </div>
                <button disabled={sending || !!pendingOrder} onClick={handleSendOrder} className="w-full bg-[#ff4b2b] text-white py-5 rounded-2xl font-headline font-black text-lg uppercase tracking-tighter shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all">
                  {pendingOrder ? "Esperando Mesero..." : sending ? "Enviando..." : "Confirmar Pedido"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showHistory && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
            <div className="relative bg-white w-full max-w-[400px] rounded-[2rem] overflow-hidden shadow-2xl animate-scale-in">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-headline text-lg font-bold text-[#1b1d0e] uppercase tracking-tighter">Estado de Cuenta</h3>
                <button onClick={() => setShowHistory(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                {!sessionData?.orders || sessionData.orders.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-xs italic">No hay consumos todavía.</p>
                ) : (
                  <div className="space-y-6">
                    {sessionData.orders.map((order, idx) => (
                      <div key={idx} className="pb-4 border-b border-gray-50 last:border-0">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pedido #{idx + 1}</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs mb-1">
                            <span>{item.quantity}x {item.title}</span>
                            <span className="font-medium">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Acumulado</span>
                  <span className="text-2xl font-headline font-bold text-[#ff4b2b]">${sessionData?.orders?.reduce((acc, o) => acc + o.total, 0) || 0}</span>
                </div>
                {sessionData?.billRequested ? (
                  <div className="bg-white border border-orange-200 p-4 rounded-2xl flex items-center justify-center gap-2 animate-pulse text-orange-600 font-bold text-[10px] uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                    Cuenta en camino...
                  </div>
                ) : (
                  <button onClick={handleRequestBill} className="w-full bg-[#1b1d0e] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">payments</span>
                    Pedir Cuenta
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
