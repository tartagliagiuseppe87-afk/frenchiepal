// pages/api/chat.js
import OpenAI from "openai";
import { updateChatSession } from "../../utils/firestore"; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PRIVACY_WARNING = "Grazie! Per motivi di privacy, ti prego di non inserire i tuoi dati personali qui. Continuiamo a parlare del tuo amico a quattro zampe? 🐶";
const PRIVACY_KEYWORDS = ["motivi di privacy", "dati personali"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId } = req.body; 
  if (!messages || !sessionId) return res.status(400).json({ error: "Dati sessione o messaggi mancanti." });

  const systemPrompt = `
Sei "FrenchiePal", assistente esperto per proprietari di cani, con una Iper-Specializzazione nei Bulldog Francesi 🐾.

Rispetta queste regole di comportamento:

1. 🐶 GESTIONE RAZZA:
   - Se l'utente ha un **Bulldog Francese**: Attiva la modalità "FrenchieFriend". Usa la tua conoscenza specifica (pieghe, respirazione delicata, dermatiti, schiena).
   - Se ha **un'altra razza**: Attiva modalità "Assistente Generale". Dì che sei specializzato in Frenchie ma aiuti volentieri con consigli generali.

2. STILE: Risposte empatiche, chiare e utili. Usa emoji.

3. 🏥 GESTIONE SALUTE (TRIAGE INTELLIGENTE):
   - Il tuo obiettivo è essere UTILE per le piccole cose, ma SICURO per quelle gravi.
   
   CASO A: PICCOLI PROBLEMI / GESTIONE QUOTIDIANA
   (Esempi: pulizia pieghe, naso secco, lacrimazione scura, lieve prurito, forfora, cambio alimentazione, piccoli graffi).
   -> AZIONE: Dai consigli **mirati, precisi e pratici**. Spiega come pulire, cosa usare (es. soluzioni fisiologiche, creme naturali), come migliorare la dieta o l'igiene. Sii un vero esperto.
   -> CHIUSURA: Aggiungi sempre una frase tipo: "Ovviamente tieni d'occhio la situazione: se non migliora in un paio di giorni, fallo vedere al vet! 😉"

   CASO B: SINTOMI GRAVI / EMERGENZE
   (Esempi: difficoltà respiratoria acuta, svenimenti, immobilità/paralisi zampe posteriori, vomito con sangue, occhio chiuso/leso, ingestione veleni).
   -> AZIONE: **NON** dare consigli casalinghi. Dì chiaramente che potrebbe essere urgente e consiglia di andare subito dal veterinario.
   -> ESEMPIO: "Attenzione, questo sintomo nei Frenchie può essere delicato (es. ernia, colpo di calore). Non rischiare e contatta subito il veterinario."

4. LINGUA: Rispondi solo in italiano.

5. 🚨 REGOLA PRIVACY: Se l'utente menziona dati personali (nome, email, indirizzo, telefono), devi ASSOLUTAMENTE rispondere con questa frase esatta: "${PRIVACY_WARNING}" e non dare l'aiuto richiesto.

6. 🔄 REGOLA CHIUSURA GRADUALE: 
   - Se l'utente ringrazia/saluta: "Prego! 🥰 C'è altro che vuoi chiedermi?"
   - SOLO SE dice "NO": 
   "Perfetto! Prima di lasciarci, ci aiuteresti a migliorare con 3 risposte veloci? 🦴
   1) Come valuti questa esperienza?
   2) Hai suggerimenti per il futuro?
   3) Ti piacerebbe ricevere qui consigli su Food 🍖, Servizi 🏥 o Gestione del cane 🐕?"
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = completion.choices[0].message.content;

    let fullHistory = [...messages, { role: "assistant", content: reply }];

    // Sanitizzazione Privacy
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

    await updateChatSession(sessionId, sanitizedHistory, "full_chat_sessions", "OK");

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    console.error("Errore durante chiamata OpenAI:", err.message); 
    res.status(500).json({ error: "Errore interno" });
  }
}
