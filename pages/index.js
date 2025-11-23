// pages/index.js
import React from 'react'; 
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  
  return (
    // Contenitore principale
    <div className="main-container min-h-screen w-full flex flex-col items-center justify-start bg-[#f4fbf8] font-poppins">
      
      {/* IMMAGINE BANNER IN ALTO */}
      <div className="w-full bg-[#f4fbf8] shadow-lg flex justify-center items-center py-4"> 
          <img 
            src="/hero-image.jpg" 
            alt="Illustrazione di un Bulldog Francese e un altro cane felici in un prato"
            className="inline-block h-auto max-w-full shadow-md rounded-lg" 
          />
      </div>

      {/* Contenuto principale */}
      <header className="w-full max-w-4xl mx-auto flex-grow px-4 md:px-8 pt-8 pb-8">
        <div className="hero-content flex flex-col items-center gap-6">
          
          {/* Testo Hero */}
          <div className="hero-text w-full text-center">
            
            {/* Titolo */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a9d8f] mb-6 tracking-tight leading-tight">
                Costruiamo insieme il miglior amico del tuo Bullo! 🐾
            </h1>
            
            {/* Descrizione */}
            <div className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto font-medium space-y-4">
              <p>
                Ciao Bullo-Mamma e Papà! FrenchiePal è un progetto nato dall'amore per i nostri Bulldog Francesi, ma ha bisogno di te per crescere.
              </p>
              <p className="font-semibold text-[#268d80]">
                Stiamo sviluppando un sistema allenato per offrirti le risposte più accurate ai problemi di gestione quotidiana.
              </p>
              <p>
                Ci aiuti a migliorare? Il tuo contributo è prezioso: <strong>aiutaci a capire quale problema possiamo risolvere ponendo delle domande specifiche</strong> qui sotto. Più domande reali ci fai, più FrenchiePal diventa intelligente e utile per tutta la community!
              </p>
            </div>

            {/* Pulsante RIMOSSO */}
            
          </div>
        </div>
      </header>
      
      {/* Componente Chat (Card Centrale) */}
      <main className="flex-grow relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden"> 
        <div className="w-full max-w-4xl h-[600px] flex flex-col"> {/* Altezza fissa per dare importanza alla chat */}
            <ChatWidget />
        </div>
      </main>

      {/* DISCLAIMER E FOOTER */}
      <div className="w-full max-w-5xl mx-auto mt-auto p-4 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500 text-center px-4">
          ⚠️ **Disclaimer Importante:** FrenchiePal è un assistente virtuale in fase di addestramento e non fornisce pareri medici veterinari. Le informazioni fornite sono a scopo informativo. Per problemi di salute o emergenze, **contatta immediatamente il tuo veterinario di fiducia.**
          <br/>
          <a href="/privacy" className="hover:underline text-[#2a9d8f] font-bold mt-2 inline-block">Informativa Privacy</a>
        </p>
      </div>
      
    </div>
  );
}
