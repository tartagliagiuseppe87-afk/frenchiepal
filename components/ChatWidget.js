// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

// Funzione per creare o recuperare un ID sessione anonimo (salvato nel browser)
const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('frenchiepal_session_id');
    if (!sessionId) {
        // Genera un ID anonimo
        sessionId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('frenchiepal_session_id', sessionId);
    }
    return sessionId;
};

// Funzione per inviare il solo messaggio iniziale al backend per il logging
const logInitialMessage = async (sessionId, messageContent) => {
    // Non fa nulla se manca l'ID o il messaggio
    if (!sessionId || !messageContent) return; 
    
    try {
        await fetch("/api/log_initial", { // Chiama il nuovo endpoint API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId: sessionId,
                assistantMessage: messageContent,
            }),
        });
        // Non è necessario gestire la risposta qui, è solo per il log
    } catch (e) {
        console.error("Errore durante il log del messaggio iniziale:", e);
    }
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ciao! Sono qui per aiutarti con il tuo amico a quattro zampe 🐾. Mi dici se il tuo cane è un Bulldog Francese?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null); 
  const inputRef = useRef(null); 

  const [sessionId, setSessionId] = useState(null);

  // useEffect per impostare l'ID sessione e loggare il messaggio iniziale
  useEffect(() => {
      const id = getOrCreateSessionId();
      setSessionId(id);
      
      // Chiama la funzione di log per il primo messaggio del bot
      // Assicurati che ci siano messaggi e che il primo sia dell'assistente
      if (id && messages.length > 0 && messages[0].role === 'assistant') {
          logInitialMessage(id, messages[0].content);
      }
      
  }, []); // Esegui solo una volta al caricamento del componente


  // useEffect per lo scroll automatico e il focus sull'input
  useEffect(() => {
    scrollToBottom();
    if (open && !loading && inputRef.current) {
        inputRef.current.focus();
    }
  }, [messages, open, loading]);

  // Funzione per lo scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Funzione per inviare i messaggi dell'utente e ricevere risposte
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return; // Non inviare se l'input è vuoto o manca l'ID sessione
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); // Mostra subito il messaggio dell'utente
    setInput(""); // Svuota l'input
    setLoading(true); // Mostra l'indicatore "sta scrivendo"

    // Chiamata all'API principale per ottenere la risposta del bot
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
          messages: newMessages, // Invia tutta la cronologia
          sessionId: sessionId // Invia l'ID sessione
      }),
    });
    
    // Gestione degli errori della chiamata API
    if (!res.ok) {
        setMessages(current => [...current, { role: "assistant", content: "Ops! Qualcosa è andato storto. Riprova tra un attimo." }]);
        setLoading(false);
        return;
    }

    // Aggiungi la risposta del bot alla chat
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false); // Nascondi l'indicatore "sta scrivendo"
  };

  return (
    <>
      {/* PULSANTE NASCOSTO (necessario per l'avvio dal pulsante centrale) */}
      <button
        id="chat-toggle-button" 
        onClick={() => setOpen(!open)}
        className="hidden" 
      >
        Toggle Chat
      </button>

      {/* Finestra della Chat (visibile solo se 'open' è true) */}
      {open && (
        <div 
          className="fixed bottom-4 right-2 w-72 max-w-[98vw] h-[60vh] bg-white rounded-3xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out overflow-hidden md:w-80 md:h-[70vh] md:right-5 md:bottom-20"
        >
          {/* Intestazione Chat */}
          <div className="bg-[#2a9d8f] text-white p-4 font-semibold flex justify-between items-center rounded-t-3xl">
              <span>Chat con FrenchiePal</span>
              <button onClick={() => setOpen(false)} className="text-2xl font-semibold opacity-90 hover:opacity-100 transition-opacity p-0 bg-transparent">&times;</button>
          </div>

          {/* Area Messaggi (con scroll) */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-2 bg-gray-50">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`p-3 max-w-[85%] rounded-3xl text-xs leading-snug shadow-sm transition-all duration-200 ${m.role === "user" ? "self-end bg-[#dcf8c6] rounded-br-md" : "self-start bg-[#2a9d8f] text-white rounded-tl-md"}`}
              >
                {m.content} {/* Contenuto del messaggio */}
              </div>
            ))}
            {/* Indicatore "sta scrivendo" */}
            {loading && (
                <div className="typing-indicator bg-[#2a9d8f] text-white p-3 max-w-fit rounded-3xl rounded-tl-md self-start text-xs">
                    FrenchiePal sta scrivendo...
                </div>
            )}
            {/* Elemento invisibile per lo scroll automatico */}
            <div ref={messagesEndRef} />
          </div>

          {/* Area Input (input + bottone invia) */}
          <div className="flex border-t border-gray-200 p-3 bg-white">
            <input
              ref={inputRef} // Riferimento per il focus automatico
              className="flex-grow border border-gray-300 rounded-full px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[#2a9d8f] transition-all duration-200"
              placeholder="Digita qui il tuo messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Invia con Invio
              disabled={loading} // Disabilita l'input mentre il bot risponde
            />
            <button
              onClick={sendMessage} // Invia al click
              disabled={loading} // Disabilita il bottone mentre il bot risponde
              className="bg-[#2a9d8f] text-white px-4 py-2 ml-2 rounded-full font-semibold hover:bg-[#268d80] disabled:bg-gray-400 transition-colors shadow-md text-xs"
            >
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
