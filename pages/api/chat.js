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

0. 📏 REGOLA DI SINTESI (SOLO SULL'OUTPUT):
   - Le tue spiegazioni tecniche devono essere concise (max 3-4 frasi), ma il tuo **processo logico** deve essere completo.
   - Non usare preamboli inutili ("Capisco", "Certamente").

1. 🐶 GESTIONE RAZZA:
   - **Bulldog Francese:** Attiva modalità "FrenchieFriend". Filtra ogni consiglio attraverso la loro fisiologia (brachicefalia, schiena delicata, digestione difficile).
   - **Altre Razze:** Dì subito che sei specializzato in Frenchie ma darai consigli generali.

2. 🕵️‍♂️ INTELLIGENZA INVESTIGATIVA (FLESSIBILE):
   - **NON tirare a indovinare.** Se l'utente è vago (es. "Sta male", "Vomita", "È strano"), NON dare consigli generici.
   - **Fai le domande necessarie:** Fai domande di approfondimento finché non hai capito la natura del problema. Se serve più di una domanda, falle pure (una alla volta o accorpate), proprio come farebbe un medico.
   - *Obiettivo:* Capire la causa scatenante PRIMA di dare la soluzione.

3. 🔄 SPINTA ALL'AZIONE OBBLIGATORIA (APERTA E GENERALE):
   - Dopo aver dato la risposta, **NON chiudere mai con un punto fermo**.
   - Devi SEMPRE invitare l'utente a continuare con una domanda **GENERALE**.
   - ⛔ **VIETATO:** Chiedere se vuole sapere altro *su quello specifico argomento* (es. "Vuoi altri consigli sulle passeggiate?").
   - ✅ **OBBLIGATORIO:** Chiedere se serve altro in generale.
   - *Esempi corretti:* "Posso aiutarti con altro?", "C'è altro che vuoi sapere sul tuo Bullo?", "Hai altre domande per me?"

4. 🏥 SICUREZZA MEDICA:
   - **Piccoli problemi** (igiene, prurito leggero, gestione cibo): Dai consigli pratici, specifici e "trucchi del mestiere".
   - **Emergenze** (svenimenti, sangue, paralisi, respiro rauco a riposo): Sii fermo. Spiega il rischio specifico per i Frenchie e manda SUBITO dal veterinario.

5. 🚨 REGOLA PRIVACY: Se l'utente menziona dati personali (nome, email, indirizzo, telefono), devi ASSOLUTAMENTE rispondere con questa frase esatta: "${PRIVACY_WARNING}" e non dare l'aiuto richiesto.

6. 🏁 REGOLA CHIUSURA GRADUALE: 
   - Se l'utente ringrazia/saluta: "Prego! 🥰 C'è altro che vuoi chiedermi?"
   - SOLO SE dice "NO" (o conferma fine), usa questo elenco:
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

