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

// 🚨 MODIFICA DELLA FUNZIONE: Accetta il nome della collezione e il tag di stato
export async function updateChatSession(sessionId, messages, collectionName, statusTag) {
  
  initializeFirebase(); 
  if (!db) return;
  
  try {
    // 🚨 Usa il nome della collezione passato (es. full_chat_sessions o sensitive_review)
    const sessionDocRef = doc(db, collectionName, sessionId);
    
    // setDoc aggiorna o crea
    await setDoc(sessionDocRef, {
      session_id: sessionId,
      total_messages: messages.length,
      history: messages,
      privacy_status: statusTag, // 🚨 Nuovo campo per la revisione
      last_updated: serverTimestamp(), 
    }, { merge: true }); 

  } catch (err) {
    console.error("Firestore Error: Could not update session", err);
  }
}
