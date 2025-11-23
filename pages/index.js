// pages/index.js
import React from 'react';
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head';
import Link from 'next/link'; // Importiamo Link per rendere cliccabile il badge

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#eafaf7] to-[#ffffff] font-poppins text-gray-800 overflow-hidden">
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* 1. HEADER */}
      <header className="flex-none py-3 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-20 sticky top-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="FrenchiePal Logo" className="w-full h-full object-contain" />
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
        
        {/* MODIFICA: Il badge ora è un Link cliccabile */}
        <Link href="/privacy" className="flex items-center gap-2 text-xs text-[#2a9d8f] bg-[#2a9d8f]/10 px-3 py-1 rounded-full font-medium hover:bg-[#2a9d8f]/20 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Privacy Protetta</span>
        </Link>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA */}
      <div className="flex-none px-6 py-4 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-down">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                <span className="text-[#2a9d8f]">FrenchiePal</span>, il miglior amico del tuo <span className="text-[#2a9d8f]">Bullo!</span> 🐾
            </h2>
            
            <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                <p>
                  Ciao Bullo MammaPapà! Siamo un piccolo team di <em>Frenchie addicted</em>. Stiamo sviluppando un sistema per offrirti le risposte più accurate ai problemi di gestione quotidiana.
                </p>
                
                <p className="text-[#2a9d8f] font-medium pt-1">
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
      
      {/* 4. FOOTER RIMOSSO (Nessun disclaimer visibile in basso) */}
      
    </div>
  );
}
