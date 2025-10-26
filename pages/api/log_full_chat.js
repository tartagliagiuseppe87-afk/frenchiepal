// pages/api/log_full_chat.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Configurazione Firebase (Copiamo il codice dal tuo utils/firestore.js)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID, 
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    
    const { sessionId, messages } = req.body;

    if (!sessionId || !messages || messages.length === 0) {
        return res.status(400).json({ error: "Dati sessione o messaggi mancanti." });
    }

    try {
        // 🚨 SALVA UN UNICO DOCUMENTO con l'intera cronologia
        await addDoc(collection(db, "full_chat_sessions"), {
            session_id: sessionId,
            total_messages: messages.length,
            // 🚨 Questo campo contiene l'array completo della conversazione
            history: messages, 
            closed_at: serverTimestamp(), 
        });

        res.status(200).json({ success: true, message: "Sessione salvata con successo." });
    } catch (e) {
        console.error("Errore salvataggio sessione completa:", e);
        res.status(500).json({ error: "Errore interno durante il salvataggio." });
    }
}
