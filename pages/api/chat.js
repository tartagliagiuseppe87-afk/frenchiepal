// pages/api/chat.js
import OpenAI from "openai";
import { saveChatLog } from "../../utils/firestore"; // <-- Importa la funzione di salvataggio

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId } = req.body; // <-- Riceve l'ID Sessione
  if (!messages) return res.status(400).json({ error: "No messages provided" });

  const userMessage = messages[messages.length - 1]?.content || "";

  const systemPrompt = `
Sei "FrenchiePal", assistente per proprietari di Bulldog Francesi 🐾.
Rispetta queste regole:
1. Prima domanda: chiedi se il cane è un Bulldog Francese.
2. Se sì → modalità FrenchieFriend, tono empatico.
3. Se no → modalità generale cani, tono amichevole.
4. Risposte brevi (2-3 frasi max), emoji pertinenti.
5. Mai dare consigli medici; se sintomi → contatta veterinario.
6. Rispondi solo in italiano.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    // SALVATAGGIO LOG
    await saveChatLog({
      session_id: sessionId || 'unknown_session', 
      user_message: userMessage,
      ai_response: reply,
    });

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
