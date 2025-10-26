// utils/firestore.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Configurazione (prende i valori dalle Variabili d'Ambiente su Vercel)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID, 
};

// Inizializza Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Funzione per salvare il log
export async function saveChatLog(log) {
  try {
    await addDoc(collection(db, "chat_logs"), {
      session_id: log.session_id, // Permette di raggruppare i messaggi di una sessione (anonimo)
      user_message: log.user_message,
      ai_response: log.ai_response,
      timestamp: serverTimestamp(), 
    });
  } catch (err) {
    console.error("Firestore Error: Could not save log", err);
  }
}
