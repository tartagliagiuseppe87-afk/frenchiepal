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
            <h1 className="text-4xl md:text-5xl font-bold text-[#2a9d8f] mb-4">Benvenuto in FrenchiePal! 🐾</h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Ciao! Siamo un piccolo team di appassionati, con una specializzazione e un amore enorme per i **Bulldog Francesi**.
              <br/>In ogni caso, proviamo a fare del nostro meglio per aiutare i proprietari di qualsiasi razza. Per questo abbiamo creato un assistente gratuito che ti guida a risolvere i dubbi più comuni.
            </p>
            <p className="cta-text text-xl font-semibold text-[#2a9d8f] mt-8 mb-6">Dai forza, che aspetti a provare? Non costa nulla!</p>
            
            {/* Nota: Il bottone di avvio chat è ora flottante e gestito da ChatWidget */}
          </div>
          
          {/* Immagine Hero */}
          <div className="hero-image flex-1 w-full max-w-sm md:max-w-none">
            {/* Assicurati che l'immagine 'hero-image.jpg' sia nella cartella public/ */}
            <img 
              src="/hero-image.jpg" 
              alt="Illustrazione di un Bulldog Francese e un altro cane felici in un prato"
              className="w-full h-auto rounded-3xl shadow-xl object-cover"
            />
          </div>
        </div>
      </header>
      
      {/* Footer Disclaimer */}
      <footer className="w-full max-w-5xl mx-auto mt-12 mb-4">
        <p className="text-xs text-gray-500 text-center px-4">
          <strong>Disclaimer Importante:</strong> FrenchiePal è un assistente virtuale e non fornisce pareri medici. Le informazioni ricevute non sostituiscono in alcun modo una consulenza veterinaria professionale. Per problemi di salute seri o emergenze, contatta immediatamente il tuo veterinario di fiducia.
        </p>
      </footer>
      
      {/* Componente Chat Flottante (non modificato) */}
      <ChatWidget />
    </div>
  );
}
