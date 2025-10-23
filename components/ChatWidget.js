// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

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
  // 🚨 1. NUOVO RIFERIMENTO PER L'INPUT
  const inputRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // 🚨 2. MANTIENI IL FOCUS DOPO LA RISPOSTA
    // Se la chat è aperta e non sta caricando, metti il focus sull'input
    if (open && !loading && inputRef.current) {
        inputRef.current.focus();
    }
  }, [messages, open, loading]); // Aggiunto 'loading' alle dipendenze


  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    // Nota: Il focus viene perso qui, ma ripristinato in useEffect quando loading diventa false

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
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
      {/* PULSANTE NASCOSTO (necessario per l'avvio dal pulsante centrale) */}
      <button
        id="chat-toggle-button" 
        onClick={() => setOpen(!open)}
        className="hidden" 
      >
        Toggle Chat
      </button>

      {open && (
        <div 
          className="fixed bottom-20 right-5 w-80 max-w-[95vw] h-[70vh] bg-white rounded-3xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out overflow-hidden"
        >
          {/* Intestazione Chat - chiude usando setOpen(false) */}
          <div className="bg-[#2a9d8f] text-white p-4 font-semibold flex justify-between items-center rounded-t-3xl">
              <span>Chat con FrenchiePal</span>
              <button onClick={() => setOpen(false)} className="text-2xl font-semibold opacity-90 hover:opacity-100 transition-opacity p-0 bg-transparent">&times;</button>
          </div>

          {/* Area Messaggi */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`p-3 max-w-[85%] rounded-3xl text-sm leading-snug shadow-sm transition-all duration-200 ${m.role === "user" ? "self-end bg-[#dcf8c6] rounded-br-md" : "self-start bg-[#2a9d8f] text-white rounded-tl-md"}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
                <div className="typing-indicator bg-[#2a9d8f] text-white p-3 max-w-fit rounded-3xl rounded-tl-md self-start text-sm">
                    FrenchiePal sta scrivendo...
                </div>
            )}
            {/* Elemento per lo scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Area Input */}
          <div className="flex border-t border-gray-200 p-3 bg-white">
            <input
              // 🚨 3. COLLEGA IL RIFERIMENTO ALL'INPUT
              ref={inputRef} 
              className="flex-grow border border-gray-300 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2a9d8f] transition-all duration-200"
              placeholder="Digita qui il tuo messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[#2a9d8f] text-white px-4 py-2 ml-2 rounded-full font-semibold hover:bg-[#268d80] disabled:bg-gray-400 transition-colors shadow-md"
            >
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
