// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; // <-- IMPORTIAMO LA FUNZIONE DI AGGIORNAMENTO

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId } = req.body; 
  if (!messages || !sessionId) return res.status(400).json({ error: "Dati sessione o messaggi mancanti." });

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

    // 🚨 COSTRUISCI LA CRONOLOGIA FINALE (messaggi originali + la nuova risposta AI)
    const finalMessages = [...messages, { role: "assistant", content: reply }];

    // 🚨 SALVATAGGIO/AGGIORNAMENTO: Aggiorna il documento in Firestore
    await updateChatSession(sessionId, finalMessages);

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
