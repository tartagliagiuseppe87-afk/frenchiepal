// components/ChatWidget.js
import React, { useState, useRef, useEffect } from "react"; 

export default function ChatWidget() {
  const [open, setOpen] = useState(false); // Stato per aprire/chiudere
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);


  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

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
      {/* PULSANTE NASCOSTO: Viene cliccato dal pulsante centrale in index.js */}
      <button
        id="chat-toggle-button" 
        onClick={() => setOpen(!open)}
        className="hidden" // Nascondiamo il pulsante
      >
        Toggle Chat
      </button>

      {open && (
        <div 
          // CHAT BOX POSIZIONATO IN BASSO A DESTRA (come richiesto)
          className="fixed bottom-20 right-5 w-80 max-w-[95vw] h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out"
        >
          {/* Intestazione Chat - chiude usando setOpen(false) */}
          <div className="bg-[#2a9d8f] text-white p-3 font-semibold flex justify-between items-center rounded-t-xl">
              <span>Chat con FrenchiePal</span>
              <button onClick={() => setOpen(false)} className="text-2xl font-semibold opacity-80 hover:opacity-100 transition-opacity p-0 bg-transparent">&times;</button>
          </div>

          {/* Area Messaggi */}
          <div className="flex-grow p-3 overflow-y-auto flex flex-col gap-3">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`chat-message p-2 max-w-[85%] rounded-xl text-sm leading-snug ${m.role === "user" ? "self-end bg-gray-200 rounded-br-sm" : "self-start bg-[#2a9d8f] text-white rounded-bl-sm"}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
                <div className="typing-indicator bg-[#2a9d8f] text-white p-2 max-w-fit rounded-xl rounded-bl-sm self-start">
                    FrenchiePal sta scrivendo...
                </div>
            )}
            {/* Elemento per lo scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Area Input */}
          <div className="flex border-t p-3">
            <input
              className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm outline-none focus:border-[#2a9d8f]"
              placeholder="Digita qui il tuo messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[#2a9d8f] text-white px-4 py-2 rounded-r-full font-semibold hover:bg-[#268d80] disabled:bg-gray-400 transition-colors"
            >
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
