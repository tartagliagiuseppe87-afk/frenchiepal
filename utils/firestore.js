// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
// 🚨 AGGIUNTO 'deleteDoc' agli import
import { getFirestore, collection, setDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

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
    // 1. Salva/Aggiorna nella collezione corretta (che sia 'full' o 'sensitive')
    const sessionDocRef = doc(db, collectionName, sessionId);
    
    await setDoc(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages,
      privacy_status: statusTag || "OK", 
      last_updated: serverTimestamp(), 
    }, { merge: true }); 

    // 🚨 2. PULIZIA: Se stiamo scrivendo in 'sensitive_review', 
    // dobbiamo assicurarci di CANCELLARE la copia che potrebbe essere rimasta in 'full_chat_sessions'
    if (collectionName === "sensitive_review") {
        const oldDocRef = doc(db, "full_chat_sessions", sessionId);
        // Proviamo a cancellarlo. Se non esiste, non succede nulla di male.
        await deleteDoc(oldDocRef);
    }

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
