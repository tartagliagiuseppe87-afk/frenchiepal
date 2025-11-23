// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head';

export default function Home() {
  
  return (
    // Sfondo: Gradiente più soffice e professionale
    <div className="flex flex-col h-screen bg-[#f4f8f9] font-poppins text-gray-800 overflow-hidden">
      
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* 1. HEADER */}
      <header className="flex-none py-4 px-6 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-gray-200 z-20 sticky top-0 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center drop-shadow-sm">
              <img src="/logo.png" alt="FrenchiePal Logo" className="w-full h-full object-contain" />
            </div>
            <div>
                <h1 className="text-lg font-bold text-gray-800 tracking-tight leading-none">
                    Frenchie<span className="text-[#2a9d8f]">Pal</span>
                </h1>
                <span className="text-[9px] uppercase tracking-[0.15em] text-gray-400 font-semibold">
                    AI Assistant
                </span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium text-[#2a9d8f] bg-[#e0f2f1] px-3 py-1.5 rounded-full border border-[#2a9d8f]/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Privacy Protetta</span>
        </div>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA */}
      <div className="flex-none px-6 py-5 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-down">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
                Il miglior amico del tuo <span className="text-[#2a9d8f] underline decoration-[#2a9d8f]/30 underline-offset-4">Bullo!</span> 🐾
            </h2>
            
            <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                <p>
                  Ciao Bullo-Mamma/Papà! Siamo un piccolo team di <em>Frenchie-addicted</em>. Stiamo sviluppando un sistema allenato per offrirti le risposte più accurate ai problemi di gestione quotidiana.
                </p>
            </div>
            
            <div className="mt-4 inline-block">
                <p className="text-xs font-medium text-[#2a9d8f] bg-white border border-[#2a9d8f]/20 px-4 py-2 rounded-full shadow-sm">
                  🚀 <strong>Aiutaci a migliorare:</strong> Poni domande reali qui sotto.
                </p>
            </div>
        </div>
      </div>

      {/* 3. AREA CHAT (Centrale) */}
      <main className="flex-grow relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 pb-4 overflow-hidden"> 
        <div className="w-full h-full flex flex-col">
            <ChatWidget />
        </div>
      </main>
      
      {/* 4. FOOTER */}
      <footer className="flex-none py-3 bg-white border-t border-gray-200 text-center z-10 text-[10px] text-gray-400">
        <p className="leading-relaxed px-4">
          ⚠️ <strong>Disclaimer:</strong> FrenchiePal è un assistente virtuale. In caso di emergenza medica contatta un veterinario.
          <span className="mx-2 hidden sm:inline">•</span>
          <a href="/privacy" className="hover:text-[#2a9d8f] transition-colors font-semibold mt-1 inline-block sm:mt-0">Privacy Policy</a>
        </p>
      </footer>

    </div>
  );
}
