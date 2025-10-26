// utils/firestore.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

// Definiamo le variabili globali, ma le inizializziamo SOLO nella funzione
let app;
let db;

// 🚨 NUOVA FUNZIONE DI INIZIALIZZAZIONE SICURA
function initializeFirebase() {
    if (db) return; // Se è già inizializzato, esci

    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID, 
    };

    // Aggiungiamo un controllo di sicurezza per Vercel
    if (!firebaseConfig.apiKey) {
      console.warn("⚠️ Firebase non configurato. Log disabilitato.");
      return;
    }

    // Inizializza l'app e il database
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
}

// Funzione per salvare/aggiornare l'intera sessione
export async function updateChatSession(sessionId, messages) {
  
  // 🚨 CHIAMIAMO L'INIZIALIZZAZIONE QUI, dove process.env è disponibile
  initializeFirebase(); 
  
  if (!db) {
    // Se l'inizializzazione fallisce per mancanza di API Key (avviso nel log)
    return;
  }
  
  try {
    // Usiamo l'ID sessione come ID del documento Firestore
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
