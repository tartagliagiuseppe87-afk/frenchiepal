// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

// Funzione per creare o recuperare un ID sessione anonimo
const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('frenchiepal_session_id');
    if (!sessionId) {
        sessionId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('frenchiepal_session_id', sessionId);
    }
    return sessionId;
};

// 🚨 NUOVA FUNZIONE: Salva l'intera cronologia della chat in un unico documento
const logFullConversation = async (sessionId, messages) => {
    // Non salvare se ci sono solo 1 o 2 messaggi (es. solo messaggio iniziale)
    if (messages.length <= 1) return; 

    try {
        await fetch("/api/log_full_chat", { // Nuovo endpoint API
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId: sessionId,
                messages: messages, // Invia l'intero array dei messaggi
            }),
        });
    } catch (e) {
        console.error("Errore durante il log della conversazione completa:", e);
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

  const [sessionId, setSessionId] = useState(getOrCreateSessionId()); // Inizializza l'ID qui

  // Funzione che gestisce la chiusura
  const handleChatClose = () => {
      // 🚨 Logga l'intera conversazione prima di chiudere
      logFullConversation(sessionId, messages);
      setOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (open && !loading && inputRef.current) {
        inputRef.current.focus();
    }
  }, [messages, open, loading]);


  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return; 
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); 
    setInput(""); 
    setLoading(true); 

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
          messages: newMessages,
          sessionId: sessionId
      }),
    });
    
    if (!res.ok) {
        setMessages(current => [...current, { role: "assistant", content: "Ops! Qualcosa è andato storto. Riprova tra un attimo." }]);
        setLoading(false);
        return;
    }

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* PULSANTE NASCOSTO */}
      <button
        id="chat-toggle-button" 
        onClick={() => setOpen(true)} // Apre la chat
        className="hidden" 
      >
        Toggle Chat
      </button>

      {open && (
        <div 
          className="fixed bottom-4 right-2 w-72 max-w-[98vw] h-[60vh] bg-white rounded-3xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out overflow-hidden md:w-80 md:h-[70vh] md:right-5 md:bottom-20"
        >
          {/* Intestazione Chat - usa handleChatClose() */}
          <div className="bg-[#2a9d8f] text-white p-4 font-semibold flex justify-between items-center rounded-t-3xl">
              <span>Chat con FrenchiePal</span>
              <button onClick={handleChatClose} className="text-2xl font-semibold opacity-90 hover:opacity-100 transition-opacity p-0 bg-transparent">&times;</button>
          </div>

          {/* ... (resto del codice Area Messaggi e Input) ... */}
        </div>
      )}
    </>
  );
}
