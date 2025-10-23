// components/ChatWidget.js

import React, { useState } from "react"; // <-- IMPORTAZIONE CORRETTA DI REACT

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ciao! Sono qui per aiutarti con il tuo amico a quattro zampe 🐾. Mi dici se il tuo cane è un Bulldog Francese?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-green-800"
      >
        💬 Chatta con FrenchiePal
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col z-50">
          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <p className={m.role === "user" ? "bg-green-100 inline-block px-3 py-2 rounded-xl my-1" : "bg-gray-100 inline-block px-3 py-2 rounded-xl my-1"}>
                  {m.content}
                </p>
              </div>
            ))}
            {loading && <p className="italic text-gray-500">FrenchiePal sta scrivendo...</p>}
          </div>
          <div className="flex border-t p-2">
            <input
              className="flex-grow border rounded-l-xl px-2 outline-none"
              placeholder="Scrivi qui..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-green-700 text-white px-3 rounded-r-xl hover:bg-green-800">
              Invia
            </button>
          </div>
        </div>
      )}
    </>
  );
}
