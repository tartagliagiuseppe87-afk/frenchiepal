// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID, 
};

// 🚨 Ottimizzazione: Controlla se l'app è già stata inizializzata.
// Usa getApp() se esiste, altrimenti inizializza.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Funzione per salvare il log
export async function saveChatLog(log) {
  
  // 🚨 Controllo ambiente: Se non c'è la chiave API, il log non viene salvato (utile in sviluppo locale)
  if (!firebaseConfig.apiKey) {
    console.warn("⚠️ Firebase non configurato. Log disabilitato (ma la chat funziona).");
    return;
  }
  
  try {
    // Aggiungiamo un nuovo documento alla collezione "chat_logs"
    await addDoc(collection(db, "chat_logs"), {
      session_id: log.session_id,
      user_message: log.user_message,
      ai_response: log.ai_response,
      created_at: serverTimestamp(), // Nome più chiaro per il timestamp
      source: "frenchiepal_webapp" // Campo opzionale per l'analisi futura
    });
  } catch (err) {
    console.error("Firestore Error: Could not save log", err);
  }
}
