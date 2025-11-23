// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head';

export default function Home() {
  
  return (
    // SFONDO: Gradiente sottile da verde menta chiarissimo a bianco per dare "aria" e "gioia"
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#eafaf7] to-[#ffffff] font-poppins text-gray-800 overflow-hidden">
      
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog</title>
      </Head>

      {/* 1. HEADER "GLASS" (Moderno e professionale) */}
      <header className="flex-none py-4 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-20 sticky top-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-[#2a9d8f] tracking-tight leading-none">
                    FrenchiePal
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                    AI Assistant
                </span>
            </div>
        </div>
        {/* Badge di sicurezza visivo */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[#2a9d8f] bg-[#2a9d8f]/10 px-3 py-1 rounded-full font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            Privacy Protetta
        </div>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA (Più pulita e centrata) */}
      <div className="flex-none px-6 py-6 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in-down">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Il miglior amico del tuo <span className="text-[#2a9d8f]">Bullo!</span> 🐾
            </h2>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Siamo un team di <em>Frenchie-addicted</em> che sta allenando un'intelligenza artificiale per aiutarti nella gestione quotidiana.
            </p>
            
            {/* Card Ingaggio Community */}
            <div className="bg-white border border-[#2a9d8f]/20 p-3 rounded-xl shadow-sm inline-block mx-auto">
                <p className="text-xs md:text-sm text-gray-600">
                  🚀 <strong>Aiutaci a migliorare:</strong> Poni domande specifiche e reali sui problemi del tuo cane.
                </p>
            </div>
        </div>
      </div>

      {/* 3. AREA CHAT (Card Centrale con Ombra "Elevated") */}
      <main className="flex-grow relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 pb-4 overflow-hidden"> 
        <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-gray-100 bg-white">
            <ChatWidget />
        </div>
      </main>
      
      {/* 4. FOOTER (Discreto) */}
      <footer className="flex-none py-3 bg-white/50 border-t border-gray-200 text-center z-10 text-[10px] text-gray-400">
        <p>
          ⚠️ FrenchiePal è un assistente virtuale, non un veterinario. In caso di emergenza contatta un medico.
          <span className="mx-2">•</span>
          <a href="/privacy" className="hover:text-[#2a9d8f] transition-colors">Privacy Policy</a>
        </p>
      </footer>

    </div>
  );
}
