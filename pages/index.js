// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    <div className="main-container min-h-screen flex flex-col items-center justify-start bg-[#f4fbf8] font-poppins">
      
      {/* IMMAGINE BANNER IN ALTO (Correzione per non sgranare e sfondo uniforme) */}
      <div className="w-full bg-[#f4fbf8] shadow-lg flex justify-center items-center"> 
          <img 
            src="/hero-image.jpg" 
            alt="Illustrazione di un Bulldog Francese e un altro cane felici in un prato"
            // inline-block e h-auto mantengono le dimensioni originali, max-w-full lo rende responsive
            className="inline-block h-auto max-w-full object-contain" 
          />
      </div>

      {/* Contenuto principale (Header/Landing) */}
      <header className="w-full max-w-5xl mx-auto flex-grow px-4 md:px-8 pt-10">
        <div className="hero-content flex flex-col items-center gap-8 py-10">
          
          {/* Testo Hero */}
          <div className="hero-text w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2a9d8f] mb-4">
                FrenchiePal, il miglior amico del tuo bullo! 🐾
            </h1>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
              Ciao Bullo-Mamma/Papà! Siamo un piccolo, ma affiatato, gruppo di *Frenchie-addicted* e amiamo follemente questi adorabili musetti schiacciati. 
              Il nostro obiettivo è darti una mano nella gestione e nella cura quotidiana del tuo piccolo: siamo super specializzati nei Bulldog Francesi, ma offriamo un supporto valido e amichevole a tutti i proprietari di cani. 
            </p>

            {/* CTA in verde prima del bottone */}
            <p className="text-2xl font-semibold text-[#2a9d8f] mt-8 mb-4">
                Dai forza, che aspetti a provarlo! È gratis!
            </p>

            {/* PULSANTE CENTRALE (Unico punto di avvio) */}
            <button
                // Clicca il pulsante nascosto nel widget chat per aprirlo
                onClick={() => {
                    const chatButton = document.getElementById('chat-toggle-button');
                    if (chatButton) chatButton.click();
                }}
                className="inline-block mb-4 bg-[#2a9d8f] text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:bg-[#268d80] transition-all duration-300 transform hover:translate-y-[-2px] text-xl"
            >
                💬 Avvia una chiacchierata
            </button>
            
          </div>
        </div>
      </header>
      
      {/* DISCLAIMER IN BASSO (Neutro) */}
      <div className="w-full max-w-5xl mx-auto mt-12 mb-4 p-4 border-t border-gray-300">
        <p className="text-sm text-gray-600 text-center">
          ⚠️ **Disclaimer Importante:** FrenchiePal è un assistente virtuale e non fornisce pareri medici veterinari. Le informazioni fornite sono a scopo informativo e **non sostituiscono in alcun modo una consulenza professionale**. Per problemi di salute o emergenze, **contatta immediatamente il tuo veterinario di fiducia.**
        </p>
      </div>
      
      {/* Componente Chat Flottante (gestisce l'apertura a destra) */}
      <ChatWidget />
    </div>
  );
}
