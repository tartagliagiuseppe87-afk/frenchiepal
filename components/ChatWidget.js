// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

// Funzione ID Sessione (Invariata)
const createNewSessionId = () => {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

export default function ChatWidget() {
  // Rimosso 'open' state: la chat è sempre visibile
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ciao! Sono FrenchiePal 🐾. Come posso aiutare il tuo Bulldog Francese oggi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null); 
  const inputRef = useRef(null); 

  // Inizializza ID
  const [sessionId] = useState(createNewSessionId()); 

  // Scroll automatico
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (!loading && inputRef.current) {
        inputRef.current.focus();
    }
  }, [messages, loading]);


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
    // CONTENITORE PRINCIPALE DELLA CHAT (Stile ChatGPT)
    // Occupa il 100% della larghezza e altezza del suo contenitore padre
    <div className="flex flex-col w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      
      {/* AREA MESSAGGI */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col gap-4 bg-white">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm
                ${m.role === "user" 
                  ? "bg-[#f4f4f4] text-gray-800 rounded-br-sm" // Stile Utente (Grigio chiaro moderno)
                  : "bg-[#f0fdfa] text-gray-800 border border-[#2a9d8f]/20 rounded-bl-sm" // Stile Bot (Verde chiarissimo)
                }
              `}
            >
              {/* Iconcina opzionale prima del testo per il bot */}
              {m.role === "assistant" && <span className="font-bold text-[#2a9d8f] block mb-1 text-xs">FrenchiePal 🐾</span>}
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex justify-start">
                <div className="bg-[#f0fdfa] p-4 rounded-2xl rounded-bl-sm border border-[#2a9d8f]/20">
                    <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AREA INPUT (Fissata in basso) */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#2a9d8f] focus-within:border-transparent transition-all shadow-sm">
            <input
              ref={inputRef} 
              className="flex-grow bg-transparent border-none text-gray-700 placeholder-gray-400 focus:ring-0 text-base py-2 px-2 outline-none"
              placeholder="Chiedi qualcosa sul tuo Frenchie..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`
                ml-2 p-2 rounded-full text-white transition-all duration-200
                ${loading || !input.trim() ? "bg-gray-300 cursor-not-allowed" : "bg-[#2a9d8f] hover:bg-[#21867a] shadow-md transform hover:scale-105"}
              `}
            >
              {/* Icona Invia (Freccia) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
            FrenchiePal può commettere errori. Verifica le informazioni importanti.
        </p>
      </div>
    </div>
  );
}
