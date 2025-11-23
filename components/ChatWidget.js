// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

const createNewSessionId = () => {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      // 🚨 ECCO LA RIGA CORRETTA (Senza virgolette extra alla fine)
      content: "Ciao! Sono FrenchiePal 🐾. Come posso aiutarti con il tuo amico a quattro zampe oggi? Ma prima mi dici se il tuo cane è un Bullo?",
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
    // CONTENITORE PRINCIPALE DELLA CHAT
    <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"> 
      
      {/* AREA MESSAGGI */}
      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm
                ${m.role === "user" 
                  ? "bg-[#2a9d8f] text-white rounded-br-md" 
                  : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-md" 
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
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

      {/* AREA INPUT */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-full px-2 py-2 shadow-inner focus-within:ring-2 focus-within:ring-[#2a9d8f] focus-within:border-transparent transition-all">
            <input
              ref={inputRef} 
              className="flex-grow bg-transparent border-none text-gray-700 placeholder-gray-400 focus:ring-0 text-base px-4 py-1 outline-none"
              placeholder="Scrivi qui..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`
                p-3 rounded-full text-white transition-all duration-200 flex-shrink-0
                ${loading || !input.trim() ? "bg-gray-300" : "bg-[#2a9d8f] hover:scale-105"}
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
        </div>
      </div>
    </div>
  );
}
