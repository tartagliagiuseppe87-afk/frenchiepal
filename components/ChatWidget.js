import React, { useState, useRef, useEffect } from "react"; 

const createNewSessionId = () => {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
};

// Domande suggerite per iniziare subito
const SUGGESTED_QUESTIONS = [
    "Cosa può mangiare il Frenchie? 🍖",
    "Perché russa così tanto? 😴",
    "Come pulire le pieghe del muso? 🧼",
    "Quanto deve camminare? 🚶‍♂️"
];

export default function ChatWidget() {
  // Messaggio iniziale più accogliente
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ciao! Sono FrenchiePal 🐾. Sono qui per aiutarti con il tuo Bulldog Francese. Di cosa vuoi parlare oggi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // Stato per mostrare/nascondere i suggerimenti

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

  // Funzione unica per inviare messaggi (sia da input che da suggerimenti)
  const handleSend = async (textToSend) => {
    if (!textToSend.trim() || !sessionId) return;

    // Nascondi suggerimenti dopo il primo invio
    setShowSuggestions(false);
    
    const userMessage = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages); 
    setInput(""); 
    setLoading(true); 

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                messages: newMessages, 
                sessionId: sessionId 
            }),
        });
        
        if (!res.ok) {
            setMessages(curr => [...curr, { role: "assistant", content: "Ops! Qualcosa è andato storto." }]);
        } else {
            const data = await res.json();
            setMessages(curr => [...curr, { role: "assistant", content: data.reply }]);
        }
    } catch (error) {
        console.error("Errore:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white relative">
      
      {/* AREA MESSAGGI */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col gap-4 bg-white scroll-smooth pb-32"> {/* pb-32 lascia spazio ai suggerimenti */}
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            {/* Avatar Bot */}
            {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#2a9d8f]/20 mr-3 mt-1 shadow-sm">
                    <img src="/logo.png" alt="FrenchiePal" className="w-full h-full object-cover"/>
                </div>
            )}

            <div 
              className={`
                max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                ${m.role === "user" 
                  ? "bg-[#2a9d8f] text-white rounded-br-none" // Utente: Verde pieno
                  : "bg-[#f8fafc] text-gray-800 border border-gray-100 rounded-bl-none" // Bot: Grigio chiarissimo
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}
        
        {loading && (
            <div className="flex justify-start items-center ml-11">
                <div className="bg-[#f8fafc] px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 flex space-x-1 shadow-sm">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AREA SUGGERIMENTI E INPUT (Fissa in basso) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-4 px-4 md:px-6">
        
        {/* Suggerimenti (Visibili solo all'inizio) */}
        {showSuggestions && !loading && (
            <div className="flex flex-wrap gap-2 mb-3 justify-center md:justify-start animate-slide-up">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-xs md:text-sm bg-white border border-[#2a9d8f]/30 text-[#2a9d8f] px-3 py-1.5 rounded-full hover:bg-[#2a9d8f] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                        {q}
                    </button>
                ))}
            </div>
        )}

        {/* Barra di Input Rinnovata */}
        <div className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-2 shadow-lg focus-within:ring-2 focus-within:ring-[#2a9d8f]/50 focus-within:border-[#2a9d8f] transition-all">
            <input
              ref={inputRef} 
              className="flex-grow bg-transparent border-none text-gray-700 placeholder-gray-400 focus:ring-0 text-sm md:text-base px-4 outline-none"
              placeholder="Chiedi qualcosa..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              disabled={loading}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={loading || !input.trim()}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full text-white transition-all duration-200 flex-shrink-0
                ${loading || !input.trim() 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" // Stato disabilitato più elegante
                    : "bg-[#2a9d8f] hover:bg-[#238b7e] shadow-md transform hover:scale-105" // Stato attivo vibrante
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
            FrenchiePal è un'IA in fase di training.
        </p>
      </div>
    </div>
  );
}
