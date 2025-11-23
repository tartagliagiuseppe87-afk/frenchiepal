// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    // Layout a tutta altezza
    <div className="flex flex-col h-screen bg-[#f8fcfb] font-poppins text-gray-800 overflow-hidden">
      
      {/* 1. HEADER (Logo e Nome) */}
      <header className="flex-none py-3 px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-200 z-20 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                 <img src="/hero-image.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#2a9d8f] tracking-tight">
                FrenchiePal
            </h1>
        </div>
        <div className="hidden md:block text-xs text-gray-500">
            Assistente Virtuale per Bulldog Francesi
        </div>
      </header>

      {/* 2. SEZIONE INTRODUTTIVA (Testo esplicativo, senza pulsanti) */}
      <div className="flex-none px-4 py-4 md:py-6 text-center bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#2a9d8f] mb-2">
                Il miglior amico del tuo bullo! 🐾
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Ciao Bullo-Mamma/Papà! Siamo un piccolo team di <em>Frenchie-addicted</em> e amiamo follemente questi adorabili musetti schiacciati. 
              Il nostro obiettivo è darti una mano nella gestione e nella cura quotidiana del tuo piccolo: siamo super specializzati nei Bulldog Francesi, ma offriamo un supporto valido e amichevole a tutti i proprietari di cani. 
            </p>
        </div>
      </div>

      {/* 3. AREA CHAT (Card Centrale) */}
      <main className="flex-grow relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden"> 
        <div className="w-full max-w-4xl h-full flex flex-col">
            <ChatWidget />
        </div>
      </main>
      
      {/* 4. FOOTER (Con Disclaimer Completo) */}
      <footer className="flex-none py-3 px-4 text-center bg-white border-t border-gray-200 z-20">
        <p className="text-[10px] text-gray-500 px-4 leading-tight">
          ⚠️ **Disclaimer Importante:** FrenchiePal è un assistente virtuale e non fornisce pareri medici veterinari. Le informazioni ricevute **non sostituiscono in alcun modo una consulenza veterinaria professionale**. Per problemi di salute seri o emergenze, contatta immediatamente il tuo veterinario di fiducia.
          <br />
          Consulta l'Informativa sulla <a href="/privacy" className="hover:underline text-[#2a9d8f]">Privacy Policy</a>. (Base Giuridica: Legittimo Interesse, per miglioramento del servizio).
        </p>
      </footer>

    </div>
  );
}
