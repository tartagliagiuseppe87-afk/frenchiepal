// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Definiamo la frase standard che il bot userà per il blocco privacy (Regola 7)
const PRIVACY_WARNING = "Grazie! Per motivi di privacy, ti prego di non inserire i tuoi dati personali qui. Continuiamo a parlare del tuo amico a quattro zampe? 🐶";

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
7. 🚨 NUOVA REGOLA: Se l'utente menziona il proprio nome, email o indirizzo, rispondi immediatamente con la frase standard: "Grazie! Per motivi di privacy, ti prego di non inserire i tuoi dati personali qui. Continuiamo a parlare del tuo amico a quattro zampe? 🐶" Non dare l'aiuto richiesto, ma solo questo avviso.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    const finalMessages = [...messages, { role: "assistant", content: reply }];

    // 🚨 LOGICA DI SALVATAGGIO CONDIZIONALE:
    let collectionName = "full_chat_sessions";
    let statusTag = "OK";

    // Se il bot ha usato la frase di avviso, etichettiamo la sessione
    if (reply.includes("Per motivi di privacy")) {
        collectionName = "sensitive_review"; // Sposta la chat in una collezione da revisionare/cancellare
        statusTag = "NEEDS_REVIEW";
    }

    // Usiamo la funzione di log aggiornata per salvare nella collezione corretta
    await updateChatSession(sessionId, finalMessages, collectionName, statusTag); 

    res.status(200).json({ reply });
  } catch (err) {
    // ... (gestione errore) ...
  }
}
