// pages/index.js
import React from 'react';
import ChatWidget from "../components/ChatWidget";
import Head from 'next/head'; // Importiamo Head per la favicon e il titolo

export default function Home() {
  return (
    <>
      <Head>
        <title>FrenchiePal - L'esperto del tuo Bulldog Francese</title>
        <meta name="description" content="Assistente virtuale specializzato nella cura e gestione dei Bulldog Francesi." />
        <link rel="icon" href="/favicon.ico" /> {/* Assicurati di avere un file favicon.ico nella cartella public */}
      </Head>

      {/* Usiamo un gradiente morbido per lo sfondo */}
      <main className="min-h-screen bg-gradient-to-b from-frenchie-light to-white flex flex-col items-center">
        
        {/* Hero Section con maggiore spazio e impatto */}
        <div className="w-full max-w-4xl px-4 pt-10 pb-6 text-center">
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8 mx-auto max-w-2xl">
             <img
               src="/hero-image.jpg" 
               alt="FrenchiePal Banner"
               className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
             />
          </div>
          
          {/* Titolo Principale: Più grande, scuro e forte */}
          <h1 className="text-4xl md:text-5xl font-bold text-frenchie-dark mb-4 leading-tight">
            FrenchiePal, il miglior amico del tuo <span className="text-frenchie-mint">Bullo!</span> 🐾
          </h1>
          
          {/* Sottotitolo: Più leggibile con maggiore interlinea */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Siamo un team di <em>Frenchie-addicted</em>! Stiamo allenando questa IA per darti una mano nella gestione quotidiana: siamo super specializzati nei Bulldog Francesi, ma offriamo supporto a tutti i proprietari di cani.
          </p>

          {/* Disclaimer reso visivamente meno pesante ma chiaro */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800 max-w-3xl mx-auto rounded-r-lg shadow-sm text-left">
            <p>
              ⚠️ <strong>Disclaimer Importante:</strong> FrenchiePal è un assistente virtuale, non un veterinario. Le informazioni sono a scopo informativo e non sostituiscono una consulenza professionale. Per emergenze, contatta il medico.
            </p>
          </div>
        </div>
        
        {/* Il widget della chat */}
        <ChatWidget />

        {/* Footer semplice */}
        <footer className="w-full py-6 text-center text-gray-500 text-sm mt-auto">
          © {new Date().getFullYear()} FrenchiePal. Privacy Policy.
        </footer>
      </main>
    </>
  );
}
