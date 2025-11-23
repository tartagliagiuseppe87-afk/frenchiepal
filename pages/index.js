// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    // Layout a tutta altezza
    <div className="flex flex-col h-screen bg-[#f8fcfb] font-poppins text-gray-800 overflow-hidden">
      
      {/* 1. HEADER (Logo e Nome) */}
      <header className="flex-none py-3 px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-100 z-20 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#2a9d8f] tracking-tight">
                FrenchiePal
            </h1>
        </div>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA (Ripristinata e integrata) */}
      <div className="flex-none px-4 py-4 md:py-6 text-center bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#2a9d8f] mb-2">
                Il miglior amico del tuo bullo! 🐾
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Ciao Bullo-Mamma/Papà! Siamo un piccolo team di <em>Frenchie-addicted</em>. 
              Il nostro obiettivo è darti una mano nella gestione quotidiana del tuo piccolo: 
              siamo specializzati nei <strong>Bulldog Francesi</strong>, ma offriamo supporto a tutti i proprietari di cani.
            </p>
        </div>
      </div>

      {/* 3. AREA CHAT (Occupa tutto lo spazio rimanente) */}
      <main className="flex-grow relative w-full max-w-5xl mx-auto flex flex-col overflow-hidden">
        {/* Passiamo una prop opzionale se vuoi, ma il widget si adatta al contenitore */}
        <ChatWidget />
      </main>
      
      {/* 4. FOOTER MINIMAL */}
      <footer className="flex-none py-2 bg-[#f8fcfb] border-t border-gray-200 text-center z-20">
        <p className="text-[10px] text-gray-400 px-4">
          ⚠️ Non è un medico veterinario. <a href="/privacy" className="hover:underline text-[#2a9d8f]">Privacy Policy</a>.
        </p>
      </footer>

    </div>
  );
}
