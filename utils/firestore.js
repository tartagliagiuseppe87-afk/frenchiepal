// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, serverTimestamp, setDoc } from "firebase/firestore";

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

export async function updateChatSession(sessionId, messages, collectionName = "full_chat_sessions", statusTag = "OK") {
  
  initializeFirebase(); 
  if (!db) return;
  
  try {
    const sessionDocRef = doc(db, collectionName, sessionId);
    
    // Salviamo o sovrascriviamo il documento esistente con la versione aggiornata (e sanitizzata)
    await setDoc(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages,
      privacy_status: statusTag, 
      last_updated: serverTimestamp(), 
    }, { merge: true }); 

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
