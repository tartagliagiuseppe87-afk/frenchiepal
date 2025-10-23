// pages/index.js
import React from 'react';
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <div className="main-container min-h-screen flex flex-col items-center justify-start pt-10 px-4 md:px-8 bg-[#f4fbf8] font-poppins">
      
      {/* Contenuto principale (Header/Landing) */}
      <header className="w-full max-w-5xl mx-auto">
        <div className="hero-content flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10">
          
          {/* Testo Hero */}
          <div className="hero-text flex-1 text-center md:text-left">
            {/* 1) NUOVO HEADER */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#2a9d8f] mb-4">
                FrenchiePal, il miglior amico del tuo bullo! 🐾
            </h1>
            
            {/* 2) NUOVA DESCRIZIONE RIFORMULATA */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Ciao Bullo-Mamma/Papà! Siamo un piccolo, ma affiatato, gruppo di *Frenchie-addicted* e amiamo follemente questi adorabili musetti schiacciati. 
              Il nostro obiettivo è darti una mano nella gestione e nella cura quotidiana del tuo piccolo: siamo super specializzati nei Bulldog Francesi, ma offriamo un supporto valido e amichevole a tutti i proprietari di cani. 
            </p>

            <p className="cta-text text-xl font-semibold text-[#2a9d8f] mt-8 mb-6">
                Dai forza, che aspetti a provarlo? Iniziare è gratis!
            </p>

            {/* 2) NUOVO DISCLAIMER SOTTO LA DESCRIZIONE */}
            <div className="disclaimer mt-8 p-3 bg-red-100 border border-red-300 rounded-lg text-sm text-red-700">
                ⚠️ **Disclaimer Importante:** FrenchiePal è un assistente virtuale e non fornisce pareri medici veterinari. Le informazioni fornite sono a scopo informativo e **non sostituiscono in alcun modo una consulenza professionale**. Per problemi di salute o emergenze, **contatta immediatamente il tuo veterinario di fiducia.**
            </div>

          </div>
          
          {/* Immagine Hero */}
          <div className="hero-image flex-1 w-full max-w-sm md:max-w-none">
            <img 
              src="/hero-image.jpg" 
              alt="Illustrazione di un Bulldog Francese e un altro cane felici in un prato"
              // 3) CLASSI PER MANTENERE LE PROPORZIONI E SCALARE DINAMICAMENTE
              className="w-full h-auto rounded-3xl shadow-xl object-contain max-h-96 mx-auto"
            />
          </div>
        </div>
      </header>
      
      {/* Footer (rimosso il disclaimer duplicato) */}
      <footer className="w-full max-w-5xl mx-auto mt-12 mb-4">
        {/* Potrebbe essere vuoto o avere link legali */}
      </footer>
      
      {/* Componente Chat Flottante */}
      <ChatWidget />
    </div>
  );
}
