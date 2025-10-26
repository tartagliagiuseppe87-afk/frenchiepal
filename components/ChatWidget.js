// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

// La funzione getOrCreateSessionId e lo stato rimangono come prima.
const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('frenchiepal_session_id');
    if (!sessionId) {
        sessionId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('frenchiepal_session_id', sessionId);
    }
    return sessionId;
};

// 🚨 NUOVA FUNZIONE: Invia solo il messaggio iniziale al server per il log
const logInitialMessage = async (sessionId, messageContent) => {
    try {
        await fetch("/api/log_initial", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId: sessionId,
                assistantMessage: messageContent,
            }),
        });
    } catch (e) {
        console.error("Impossibile loggare il messaggio iniziale:", e);
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

  // 🚨 MODIFICA: Chiama la funzione di log qui dentro
  useEffect(() => {
      const id = getOrCreateSessionId();
      setSessionId(id);
      
      // Chiama la nuova funzione di log per il primo messaggio
      if (id && messages.length > 0 && messages[0].role === 'assistant') {
          logInitialMessage(id, messages[0].content);
      }
      
  }, []); // Esegui solo una volta al caricamento


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
    // La logica sendMessage rimane la stessa
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
    
    // ... (gestione della risposta e setMessages)

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
      {/* ... (resto del codice del componente) ... */}
    </>
  );
}
