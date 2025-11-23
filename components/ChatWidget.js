// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

const createNewSessionId = () => {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ciao, come posso aiutare il tuo Frenchie oggi?🐾",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null); 
  const inputRef = useRef(null); 

  const [sessionId] = useState(createNewSessionId()); 

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
        setMessages(current => [...current, { role: "assistant", content: "Ops! Qualcosa è andato storto." }]);
        setLoading(false);
        return;
    }

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false); 
  };

  return (
    // CONTENITORE PRINCIPALE: Ombra più profonda e bordi più morbidi
    <div className="flex flex-col w-full h-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 ring-1 ring-black/5"> 
      
      {/* HEADER INTERNO CHAT (Tocco di classe: Stato Online) */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                    <img src="/logo.png" alt="Bot" className="w-full h-full object-cover" />
                </div>
                {/* Pallino verde pulsante "Online" */}
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400 animate-pulse"></span>
            </div>
            <div>
                <h3 className="font-bold text-gray-800 text-sm">FrenchiePal AI</h3>
                <p className="text-[10px] text-[#2a9d8f] font-medium">Sempre attivo per te</p>
            </div>
        </div>
      </div>

      {/* AREA MESSAGGI */}
      {/* Sfondo leggermente colorato per staccare dal bianco delle bolle del bot */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col gap-5 bg-[#fafcfc] scroll-smooth">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
          >
            {/* Avatar Bot (solo se messaggio bot) */}
            {m.role === "assistant" && (
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-auto mb-1 opacity-70">
                    <img src="/logo.png" alt="FP" className="w-full h-full object-cover"/>
                </div>
            )}

            <div 
              className={`
                relative max-w-[80%] md:max-w-[70%] px-5 py-3.5 text-sm leading-relaxed shadow-sm
                ${m.role === "user" 
                  ? "bg-[#2a9d8f] text-white rounded-2xl rounded-tr-sm" // Utente: Verde Brand, forma moderna
                  : "bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm" // Bot: Carta Bianca, pulita
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex justify-start items-center ml-8">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AREA INPUT (Stile Flottante/Elevato) */}
      <div className="p-4 bg-white border-t border-gray-100 relative z-10">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-1.5 py-1.5 shadow-inner focus-within:ring-2 focus-within:ring-[#2a9d8f]/20 focus-within:border-[#2a9d8f] transition-all duration-300">
            <input
              ref={inputRef} 
              className="flex-grow bg-transparent border-none text-gray-700 placeholder-gray-400 focus:ring-0 text-sm px-4 outline-none"
              placeholder="Chiedi qualcosa sul tuo Bullo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full text-white transition-all duration-200 flex-shrink-0 shadow-md
                ${loading || !input.trim() 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#2a9d8f] hover:bg-[#238b7e] hover:shadow-lg transform hover:scale-105 active:scale-95"
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-2 font-medium">
            Il sistema può commettere errori. Verifica le informazioni importanti.
        </p>
      </div>
    </div>
  );
}
