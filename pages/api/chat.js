// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Frase standard che il bot userà (Regola 7)
const PRIVACY_WARNING = "Grazie! Per motivi di privacy, ti prego di non inserire i tuoi dati personali qui. Continuiamo a parlare del tuo amico a quattro zampe? 🐶";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId } = req.body; 
  if (!messages || !sessionId) return res.status(400).json({ error: "Dati sessione o messaggi mancanti." });

  const systemPrompt = `
Sei "FrenchiePal", assistente per proprietari di Bulldog Francesi 🐾.
Rispetta queste regole:
2. Se il cane è un Bulldog Francese → attiva modalità FrenchieFriend, tono empatico.
3. Se non lo è → attiva modalità generale cani, tono amichevole.
4. Risposte brevi (2-3 frasi max), emoji pertinenti.
5. Mai dare consigli medici; se sintomi → contatta veterinario.
6. Rispondi solo in italiano.
7. 🚨 REGOLA CRUCIALE: Se l'utente menziona dati personali (nome, email, indirizzo, telefono), devi ASSOLUTAMENTE rispondere con questa frase esatta: "${PRIVACY_WARNING}" e non dare l'aiuto richiesto.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    const finalMessages = [...messages, { role: "assistant", content: reply }];

    // 🚨 LOGICA DI SEPARAZIONE MIGLIORATA
    let collectionName = "full_chat_sessions";
    let statusTag = "OK";
    
    // Controlliamo se la risposta contiene parole chiave, invece della frase intera.
    // È più sicuro se l'AI cambia leggermente la punteggiatura.
    if (reply.includes("motivi di privacy") || reply.includes("dati personali")) {
        collectionName = "sensitive_review"; // Sposta in revisione
        statusTag = "NEEDS_REVIEW";
    }

    // Salvataggio
    await updateChatSession(sessionId, finalMessages, collectionName, statusTag); 

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
