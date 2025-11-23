// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Frase standard di avviso Privacy (Regola 7)
const PRIVACY_WARNING = "Grazie! Per motivi di privacy, ti prego di non inserire i tuoi dati personali qui. Continuiamo a parlare del tuo amico a quattro zampe? 🐶";
// Parole chiave per identificare l'avviso nella cronologia
const PRIVACY_KEYWORDS = ["motivi di privacy", "dati personali"];

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
7. 🚨 REGOLA PRIVACY: Se l'utente menziona dati personali (nome, email, indirizzo, telefono), devi ASSOLUTAMENTE rispondere con questa frase esatta: "${PRIVACY_WARNING}" e non dare l'aiuto richiesto.

8. 📝 REGOLA FEEDBACK (CHIUSURA): 
   Se capisci che l'utente sta chiudendo la conversazione (es. dice "grazie", "ciao", "a presto", "tutto chiaro", "buona giornata"), NON limitarti a salutare.
   Rispondi ringraziando e poi scrivi ESATTAMENTE questo elenco puntato per chiedere feedback (usa un tono gentile):
   
   "Prima di lasciarci, ci aiuteresti a migliorare con 3 risposte veloci? 🦴
   1) Come valuti questa esperienza?
   2) Hai suggerimenti per il futuro?
   3) Ti piacerebbe ricevere qui consigli su Food 🍖, Servizi 🏥 o Gestione del cane 🐕?"
   
   Se l'utente ha già risposto a queste domande nei messaggi precedenti, allora puoi salutare definitivamente.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    // 1. Creiamo la cronologia completa
    let fullHistory = [...messages, { role: "assistant", content: reply }];

    // 2. 🧹 SANITIZZAZIONE (Privacy by Design)
    const sanitizedHistory = fullHistory.map((msg, index) => {
        if (msg.role === 'assistant') {
            const isPrivacyWarning = PRIVACY_KEYWORDS.some(keyword => msg.content.includes(keyword));
            if (isPrivacyWarning) {
                if (index > 0 && fullHistory[index - 1].role === 'user') {
                    fullHistory[index - 1].content = "[DATO PERSONALE RIMOSSO PER PRIVACY]";
                }
            }
        }
        return msg;
    });

    // 3. Salvataggio
    await updateChatSession(sessionId, sanitizedHistory, "full_chat_sessions", "OK");

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
