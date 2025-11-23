// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

// Funzione ID Sessione
const createNewSessionId = () => {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ciao,🐾come posso aiutare con il tuo bullo oggi?",
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
    <div className="flex flex-col w-full h-full bg-white">
      
      {/* AREA MESSAGGI */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col gap-4 bg-white scroll-smooth">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            {/* Avatar Bot */}
            {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#eafaf7] flex items-center justify-center mr-2 flex-shrink-0 border border-[#2a9d8f]/20">
                    <span className="text-[10px]">🤖</span>
                </div>
            )}

            <div 
              className={`
                max-w-[85%] md:max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${m.role === "user" 
                  ? "bg-[#2a9d8f] text-white rounded-tr-none" // Utente
                  : "bg-[#f4f6f8] text-gray-800 rounded-tl-none border border-gray-100" // Bot
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex justify-start items-center ml-9">
                <div className="bg-[#f4f6f8] px-3 py-2 rounded-2xl rounded-tl-none border border-gray-100 flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AREA INPUT */}
      <div className="p-3 bg-white border-t border-gray-50">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#2a9d8f]/50 focus-within:border-[#2a9d8f] transition-all duration-300">
            <input
              ref={inputRef} 
              className="flex-grow bg-transparent border-none text-gray-700 placeholder-gray-400 focus:ring-0 text-sm px-4 outline-none"
              placeholder="Scrivi qui la tua domanda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`
                w-8 h-8 flex items-center justify-center rounded-full text-white transition-all duration-200 flex-shrink-0
                ${loading || !input.trim() 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-[#2a9d8f] hover:bg-[#238b7e] shadow-md transform hover:scale-105"
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
        </div>
        <p className="text-center text-[10px] text-gray-300 mt-1.5">
            L'IA può commettere errori.
        </p>
      </div>
    </div>
  );
}

