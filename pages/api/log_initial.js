// pages/api/log_initial.js
import { saveChatLog } from "../../utils/firestore"; // <--- NOME CORRETTO

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { sessionId, assistantMessage } = req.body;
  
  if (!sessionId || !assistantMessage) {
    return res.status(400).json({ error: "Session ID or message content missing." });
  }

  // Logga il messaggio di benvenuto.
  await saveChatLog({
    session_id: sessionId,
    user_message: "[INIZIO CHAT - WELCOME]", 
    ai_response: assistantMessage,
  });
  
  res.status(200).json({ success: true });
}
