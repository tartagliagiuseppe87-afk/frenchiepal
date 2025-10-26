// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

// Configurazione (prende i valori dalle Variabili d'Ambiente su Vercel)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.process.env.FIREBASE_APP_ID, 
};

// Inizializza Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// 🚨 NUOVA FUNZIONE per salvare/aggiornare l'intera sessione
export async function updateChatSession(sessionId, messages) {
  
  if (!firebaseConfig.apiKey) {
    console.warn("⚠️ Firebase non configurato. Log disabilitato (ma la chat funziona).");
    return;
  }
  
  try {
    // Usiamo setDoc con l'ID sessione come ID del documento
    // Se il documento esiste, viene aggiornato; se non esiste, viene creato.
    const sessionDocRef = doc(db, "live_chat_sessions", sessionId);
    
    await setDoc(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages, 
      last_updated: serverTimestamp(), // Tiene traccia dell'ultimo messaggio
    }, { merge: true }); // merge: true assicura che non cancelli altri campi

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
