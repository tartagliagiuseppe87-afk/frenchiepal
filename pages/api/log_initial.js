// pages/api/log_initial.js
import { saveLogToFirestore } from "../../utils/firestore"; 

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { sessionId, assistantMessage } = req.body;
  
  if (!sessionId || !assistantMessage) {
    return res.status(400).json({ error: "Session ID or message content missing." });
  }

  // Logga il messaggio di benvenuto. Usiamo un segnaposto per il messaggio utente 
  // per mantenere la coerenza nella struttura del database (session_id, user_message, ai_response).
  await saveLogToFirestore(
    sessionId,
    "[INIZIO CHAT - WELCOME]", // Segnaposto: il database capirà che questo è il primo log.
    assistantMessage,
    "initial_welcome"
  );
  
  res.status(200).json({ success: true });
}
