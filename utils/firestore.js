// utils/firestore.js
import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Aggiunto parametro opzionale extraData per salvare campi aggiuntivi (es. interesse validazione)
export const updateChatSession = async (sessionId, messages, collectionName = "chat_sessions", status = "open", extraData = {}) => {
  try {
    if (!sessionId) {
        console.error("Session ID mancante per updateChatSession");
        return;
    }
    
    const docRef = doc(db, collectionName, sessionId);
    
    // Dati base da aggiornare
    let dataToUpdate = {
      messages: messages,
      lastUpdated: serverTimestamp(),
      status: status
    };

    // Se ci sono dati extra, li uniamo all'oggetto da salvare
    if (Object.keys(extraData).length > 0) {
        dataToUpdate = { ...dataToUpdate, ...extraData };
    }

    await setDoc(docRef, dataToUpdate, { merge: true });
    console.log(`Sessione ${sessionId} aggiornata in ${collectionName} con stato ${status}`);
  } catch (e) {
    console.error("Errore nell'aggiornamento della sessione: ", e);
    // Non rilanciamo l'errore per non bloccare il flusso della chat
  }
};
