// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Frase standard di avviso (Regola 7)
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
7. 🚨 REGOLA CRUCIALE: Se l'utente menziona dati personali (nome, email, indirizzo, telefono), devi ASSOLUTAMENTE rispondere con questa frase esatta: "${PRIVACY_WARNING}" e non dare l'aiuto richiesto.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    // 1. Creiamo la cronologia completa (quella che è appena successa)
    let fullHistory = [...messages, { role: "assistant", content: reply }];

    // 2. 🧹 SANITIZZAZIONE: Ripuliamo i dati sensibili prima di salvare
    // Scansioniamo la storia. Se troviamo l'avviso del bot, censuriamo il messaggio utente precedente.
    const sanitizedHistory = fullHistory.map((msg, index) => {
        // Se questo messaggio è del bot...
        if (msg.role === 'assistant') {
            // ...e contiene le parole chiave dell'avviso privacy...
            const isPrivacyWarning = PRIVACY_KEYWORDS.some(keyword => msg.content.includes(keyword));
            
            if (isPrivacyWarning) {
                // ...allora andiamo a cercare il messaggio precedente (quello dell'utente) nell'array originale
                if (index > 0 && fullHistory[index - 1].role === 'user') {
                    // Modifichiamo il messaggio utente nell'array sanitizzato
                    fullHistory[index - 1].content = "[DATO PERSONALE RIMOSSO PER PRIVACY]";
                }
            }
        }
        return msg;
    });

    // 3. Salviamo sempre nella collezione principale 'full_chat_sessions'
    // Ora siamo sicuri che è pulita grazie alla sanitizzazione sopra.
    await updateChatSession(sessionId, sanitizedHistory, "full_chat_sessions", "OK");

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
