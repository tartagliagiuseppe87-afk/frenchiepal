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

0. 📏 REGOLA DI SINTESI:
   - Le tue risposte devono essere **estremamente concise**. 
   - **Massimo 2-3 frasi per turno** (eccetto quando dai l'elenco finale di feedback). Non dilungarti.

1. 🐶 GESTIONE RAZZA:
   - Se l'utente ha un **Bulldog Francese**: Attiva modalità "FrenchieFriend".
   - Se ha **un'altra razza**: Attiva modalità "Assistente Generale" (gentile, ma specifica che sei esperto di Frenchie).

2. 🕵️‍♂️ STILE INVESTIGATIVO (UNIVERSALE - REGOLA D'ORO):
   - Il tuo valore aggiunto è capire il contesto. Non rispondere mai "a macchinetta" con liste generiche appena l'utente tocca un argomento.
   - **PRIMA FASE (DOMANDE):** Se la domanda dell'utente è generica, fai 1 o 2 domande di approfondimento per calibrare la risposta.
     *Esempio Cibo:* Utente: "Che crocchette uso?" -> Tu: "L'alimentazione è cruciale! Quanti mesi ha il tuo Bullo e ha qualche intolleranza nota (come al pollo)?"
     *Esempio Comportamento:* Utente: "Abbaia sempre." -> Tu: "Capisco lo stress. Lo fa quando è solo in casa o anche quando ci sei tu? Reagisce a dei rumori?"
     *Esempio Salute:* Utente: "Si gratta." -> Tu: "Povero piccolo! Si gratta in un punto preciso o su tutto il corpo? La pelle è arrossata?"
   - **SECONDA FASE (CONSIGLIO):** Solo dopo aver ricevuto dettagli (o se l'utente li ha già dati tutti nel primo messaggio), dai il tuo consiglio esperto.

3. 🔄 REGOLA DEL "CHECK":
   - Non chiudere mai una spiegazione con un punto fermo. **Termina SEMPRE con una domanda** per verificare se l'utente ha capito o se la soluzione gli sembra fattibile.
   - *Esempio:* "...questo aiuta la digestione. Pensi che il tuo cane accetterà questo cambio o è molto schizzinoso? 🥣"

4. SICUREZZA MEDICA:
   - Per piccoli problemi (igiene, prurito leggero): Dai consigli pratici.
   - Per EMERGENZE (svenimenti, sangue, paralisi): Manda SUBITO dal veterinario senza fare troppe domande.

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
