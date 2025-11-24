// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Variabili per l'istanza del database
let app;
let db;

// Funzione per inizializzare Firebase solo quando serve
function initializeFirebase() {
    if (db) return; // Se è già pronto, esci

    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID, 
    };

    if (!config.apiKey) {
      console.warn("⚠️ Firebase non configurato. Log disabilitato.");
      return;
    }

    // Pattern Singleton per evitare inizializzazioni multiple
    app = !getApps().length ? initializeApp(config) : getApp();
    db = getFirestore(app);
}

// Funzione aggiornata per gestire anche i dati extra (validazione)
export async function updateChatSession(sessionId, messages, collectionName = "full_chat_sessions", status = "OK", extraData = {}) {
  
  initializeFirebase(); 
  if (!db) return;
  
  try {
    const sessionDocRef = doc(db, collectionName, sessionId);
    
    // 1. Prepariamo i dati base
    let dataToSave = {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages,
      privacy_status: status, 
      last_updated: serverTimestamp(), 
    };

    // 2. Se ci sono dati extra (es. validation_interest), li uniamo all'oggetto
    if (extraData && Object.keys(extraData).length > 0) {
        dataToSave = { ...dataToSave, ...extraData };
    }

    // 3. Salviamo con merge: true per non sovrascrivere dati esistenti se non serve
    await setDoc(sessionDocRef, dataToSave, { merge: true }); 

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
