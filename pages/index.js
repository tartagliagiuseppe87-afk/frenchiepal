// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    // Layout a tutta altezza (h-screen) senza scorrimento della pagina esterna
    <div className="flex flex-col h-screen bg-[#f8fcfb] font-poppins text-gray-800 overflow-hidden">
      
      {/* 1. HEADER MINIMAL (Fisso in alto) */}
      <header className="flex-none py-3 px-6 flex items-center justify-between bg-white border-b border-gray-200 z-20">
        <div className="flex items-center gap-3">
            {/* Piccolo Logo tondo */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-bold text-[#2a9d8f] tracking-tight">
                FrenchiePal
            </h1>
        </div>
        <div className="hidden md:block text-xs text-gray-400">
            Assistente Virtuale per Bulldog Francesi
        </div>
      </header>

      {/* 2. AREA CENTRALE (La Chat occupa tutto lo spazio disponibile) */}
      <main className="flex-grow relative w-full max-w-5xl mx-auto flex flex-col overflow-hidden">
        {/* Il widget ora si espande per riempire questo spazio */}
        <ChatWidget />
      </main>
      
      {/* 3. FOOTER (Fisso in basso, disclaimer legale piccolo) */}
      <footer className="flex-none py-2 bg-white border-t border-gray-200 text-center z-20">
        <p className="text-[10px] text-gray-400 px-4 leading-tight">
          ⚠️ <strong>Disclaimer Importante:</strong> FrenchiePal è un assistente virtuale e non fornisce pareri medici veterinari. 
          <br className="hidden sm:inline"/> Per emergenze, contatta il veterinario. 
          <a href="/privacy" className="hover:underline text-[#2a9d8f] ml-1">Privacy Policy</a>.
        </p>
      </footer>

    </div>
  );
}
