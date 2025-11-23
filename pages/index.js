import React from 'react';
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#eafaf7] to-[#ffffff] font-poppins text-gray-800 overflow-hidden">
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog</title>
      </Head>

      {/* 1. HEADER (Stile Glass) */}
      <header className="flex-none py-3 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-20 sticky top-0">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
                <h1 className="text-lg font-bold text-[#2a9d8f] tracking-tight leading-none">
                    FrenchiePal
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    Smart Assistant
                </span>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-[#2a9d8f] bg-[#2a9d8f]/10 px-3 py-1 rounded-full font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            Privacy Protetta
        </div>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA (Compattata) */}
      <div className="flex-none px-6 py-3 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-down">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Il miglior amico del tuo <span className="text-[#2a9d8f]">Bullo!</span> 🐾
            </h2>
            <div className="text-sm text-gray-600 leading-tight mb-2 space-y-1">
                <p>
                  Ciao Bullo-Mamma/Papà! Siamo un piccolo team di <em>Frenchie-addicted</em>. Stiamo sviluppando un sistema allenato per offrirti le risposte più accurate ai problemi di gestione quotidiana.
                </p>
            </div>
            <div className="bg-white border border-[#2a9d8f]/20 p-2 rounded-lg shadow-sm inline-block mx-auto">
                <p className="text-xs text-gray-600 leading-tight">
                  🚀 <strong>Ci aiuti a migliorare?</strong> Poni le tue domande specifiche qui sotto.
                </p>
            </div>
        </div>
      </div>

      {/* 3. AREA CHAT */}
      <main className="flex-grow relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 pb-4 overflow-hidden">
        <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-gray-100 bg-white">
            <ChatWidget />
        </div>
      </main>
      
      {/* 4. FOOTER */}
      <footer className="flex-none py-3 bg-white/50 border-t border-gray-200 text-center z-10 text-xs text-gray-500">
        <p className="leading-relaxed px-4">
          ⚠️ <strong>Disclaimer:</strong> FrenchiePal è un assistente virtuale, non un veterinario. Le informazioni non sostituiscono una consulenza professionale. In caso di emergenza contatta un medico.
          <span className="mx-2 hidden sm:inline">•</span>
          <a href="/privacy" className="hover:text-[#2a9d8f] transition-colors font-semibold mt-1 inline-block sm:mt-0">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}


