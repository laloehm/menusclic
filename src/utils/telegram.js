import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../firebase';

export const addOrderToSession = async (sessionId, orderData) => {
  const activationRef = doc(db, "activations", sessionId);
  
  try {
    await updateDoc(activationRef, {
      orders: arrayUnion({
        ...orderData,
        timestamp: new Date().toISOString()
      })
    });
    return true;
  } catch (error) {
    console.error("Error al añadir pedido a Firestore:", error);
    throw error;
  }
};

export const requestTableActivation = async (table, sessionId) => {
  const activationRef = doc(db, "activations", sessionId);
  try {
    await updateDoc(activationRef, {
      activationRequested: true,
      activationTimestamp: new Date().toISOString()
    }).catch(async (e) => {
      // Si el documento no existe, lo creamos (comportamiento esperado al ser mesa nueva)
      const { setDoc } = await import("firebase/firestore");
      await setDoc(activationRef, {
        table: table,
        active: false,
        activationRequested: true,
        activationTimestamp: new Date().toISOString(),
        orders: [],
        billRequested: false
      });
    });
    return true;
  } catch (error) {
    console.error("Error al solicitar activación:", error);
    throw error;
  }
};

export const requestBillFromFirestore = async (sessionId) => {
  const activationRef = doc(db, "activations", sessionId);
  try {
    await updateDoc(activationRef, {
      billRequested: true,
      billTimestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error al solicitar cuenta:", error);
    throw error;
  }
};
