// components/ChatWidget.js
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ciao! Sono FrenchiePal 🐾. Come posso aiutare il tuo Bulldog Francese oggi?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Riferimento per lo scroll automatico verso il basso
  const messagesEndRef = useRef(null);

  // Funzione per scrollare in fondo alla chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scorre ogni volta che i messaggi cambiano

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
        const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        });
        const data = await res.json();
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
        console.error("Errore:", error);
        setMessages([...newMessages, { role: "assistant", content: "Ops, ho avuto un problema. Riprova più tardi!" }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      {/* Pulsante di apertura: Più visibile, con ombra e transizione */}
      <button
        onClick={() => setOpen(!open)}
        className={`${open ? 'hidden' : 'fixed'} bottom-6 right-6 md:bottom-10 md:right-10 bg-frenchie-dark hover:bg-green-800 text-white font-semibold px-6 py-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2`}
      >
        <span className="text-2xl">💬</span> 
        <span className="hidden md:inline">Inizia a chattare</span>
      </button>

      {/* Contenitore del Widget: Più grande, centrato su mobile, moderno */}
      {open && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:bottom-10 md:right-10 w-auto md:w-[28rem] h-[80vh] md:h-[36rem] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out">
          
          {/* Header della Chat */}
          <div className="bg-frenchie-dark p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h3 className="font-bold text-lg">FrenchiePal Assistant</h3>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Area Messaggi */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed
                  ${m.role === "user" 
                    ? "bg-frenchie-mint text-white rounded-tr-none" // Stile Utente
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none" // Stile Bot
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {/* Animazione di caricamento (loading dots) */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none flex space-x-2 items-center shadow-sm">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Elemento invisibile per lo scroll */}
          </div>

          {/* Area di Input: Stile moderno "a pillola" */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                <input
                className="flex-grow bg-transparent border-none focus:ring-0 text-gray-700 px-4 py-2 outline-none"
                placeholder="Scrivi qui la tua domanda..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
                />
                <button 
                    onClick={sendMessage} 
                    disabled={loading || !input.trim()}
                    className={`bg-frenchie-dark text-white p-3 rounded-full transition-all hover:bg-green-800 focus:outline-none m-1
                        ${(loading || !input.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-md'}`}
                >
                {/* Icona aeroplano di carta */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-0 pl-0.5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">L'IA può commettere errori.</p>
          </div>
        </div>
      )}
    </>
  );
}
