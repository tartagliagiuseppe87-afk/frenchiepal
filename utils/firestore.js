// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

// Configurazione (prende i valori dalle Variabili d'Ambiente su Vercel)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID, 
};

// Inizializza Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Funzione per salvare/aggiornare l'intera sessione
export async function updateChatSession(sessionId, messages) {
  
  if (!firebaseConfig.apiKey) {
    console.warn("⚠️ Firebase non configurato. Log disabilitato (ma la chat funziona).");
    return;
  }
  
  try {
    // Usa l'ID sessione come ID del documento Firestore
    const sessionDocRef = doc(db, "full_chat_sessions", sessionId);
    
    // setDoc aggiorna se il documento esiste, altrimenti lo crea.
    await setDoc(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages, 
      last_updated: serverTimestamp(), // Data dell'ultimo messaggio
    }, { merge: true }); 

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
