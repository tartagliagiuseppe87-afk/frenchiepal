// pages/index.js
import React from 'react';
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#eafaf7] to-[#ffffff] font-poppins text-gray-800 overflow-hidden">
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* 1. HEADER */}
      <header className="flex-none py-1 px-3 md:py-2 md:px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-20 sticky top-0">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
                <h1 className="text-base md:text-lg font-bold text-[#2a9d8f] tracking-tight leading-none">
                    FrenchiePal
                </h1>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                    Smart Assistant
                </span>
            </div>
        </div>
        
        <Link href="/privacy" className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#2a9d8f] bg-[#2a9d8f]/10 px-2 py-0.5 rounded-full font-medium hover:bg-[#2a9d8f]/20 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Qui info Privacy</span>
        </Link>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA (Testo Promozionale Semplice) */}
      <div className="flex-none px-4 py-1 text-center md:px-6 md:py-2">
        <div className="max-w-3xl mx-auto animate-fade-in-down">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-0.5 tracking-tight">
                FrenchiePal, il miglior amico del tuo <span className="text-[#2a9d8f]">Bullo!</span> 🐾
            </h2>
            
            <div className="text-xs text-gray-600 leading-snug space-y-0.5 mb-1">
                <p>
                  Ciao Bullo MammaPapà! Siamo un piccolo team di <em>Frenchie addicted</em>.
                </p>
                <p className="font-medium text-gray-700">
                  Stiamo sviluppando un sistema allenato per offrirti le risposte più accurate ai problemi di gestione quotidiana.
                </p>
                {/* 🚨 MODIFICATO QUI: Rimosso lo stile "balloon", mantenuto il testo */}
                <p className="text-[10px] font-medium text-[#2a9d8f] mt-1"> 
                  🚀 <strong>Ci aiuti a migliorare?</strong> Poni le tue domande specifiche qui sotto.
                </p>
            </div>
        </div>
      </div>

      {/* 3. AREA CHAT (Massimo Spazio Verticale) */}
      <main className="flex-grow relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 overflow-hidden"> 
        <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-gray-100 bg-white">
            <ChatWidget />
        </div>
      </main>    
    </div>
  );
}

