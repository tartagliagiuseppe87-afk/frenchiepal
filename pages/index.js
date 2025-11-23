// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    // Layout a tutta altezza (h-screen) senza scroll della pagina principale
    <div className="flex flex-col h-screen bg-[#f8fcfb] font-poppins text-gray-800">
      
      {/* HEADER COMPATTO */}
      <header className="flex-none py-4 px-6 flex items-center justify-center md:justify-between bg-white border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center gap-3">
            {/* Logo/Immagine piccola */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#2a9d8f] tracking-tight">
                FrenchiePal
            </h1>
        </div>
        {/* Slogan visibile solo su desktop */}
        <p className="hidden md:block text-sm text-gray-500 font-medium">
            Il tuo esperto di Bulldog Francesi 🐾
        </p>
      </header>

      {/* CORPO CENTRALE - La Chat occupa tutto lo spazio rimanente */}
      <main className="flex-grow p-4 md:p-6 overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl h-full flex flex-col">
            {/* Componente Chat (ora occupa il 100% di questo contenitore) */}
            <ChatWidget />
        </div>
      </main>
      
      {/* FOOTER MINIMAL */}
      <footer className="flex-none py-2 text-center bg-[#f8fcfb]">
        <p className="text-[10px] md:text-xs text-gray-400 px-4">
          ⚠️ Non è un medico veterinario. <a href="/privacy" className="hover:underline text-[#2a9d8f]">Privacy Policy</a>.
        </p>
      </footer>

    </div>
  );
}
