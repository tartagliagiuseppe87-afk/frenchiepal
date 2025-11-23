// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
// 🚨 AGGIUNTO 'writeBatch' agli import
import { getFirestore, doc, serverTimestamp, writeBatch } from "firebase/firestore";

let app;
let db;

function initializeFirebase() {
    if (db) return;

    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID, 
    };

    if (!config.apiKey) {
      console.warn("⚠️ Firebase non configurato. Log disabilitato.");
      return;
    }

    app = !getApps().length ? initializeApp(config) : getApp();
    db = getFirestore(app);
}


export async function updateChatSession(sessionId, messages, collectionName, statusTag) {
  
  initializeFirebase(); 
  if (!db) return;
  
  try {
    // 1. Creiamo un Batch (un pacchetto di operazioni)
    const batch = writeBatch(db);

    // 2. Prepariamo il riferimento per il salvataggio (nella collezione corretta)
    const sessionDocRef = doc(db, collectionName, sessionId);
    
    // Aggiungiamo l'operazione di scrittura al batch
    batch.set(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages,
      privacy_status: statusTag || "OK", 
      last_updated: serverTimestamp(), 
    }, { merge: true }); 

    // 3. PULIZIA ATOMICA: Se stiamo scrivendo in 'sensitive_review', 
    // aggiungiamo al batch l'ordine di CANCELLARE dalla cartella 'full_chat_sessions'
    if (collectionName === "sensitive_review") {
        const oldDocRef = doc(db, "full_chat_sessions", sessionId);
        batch.delete(oldDocRef);
    }

    // 4. Eseguiamo tutto insieme ("Committiamo" il batch)
    await batch.commit();

  } catch (err) {
    console.error("Firestore Error: Could not update session batch", err);
  }
}
