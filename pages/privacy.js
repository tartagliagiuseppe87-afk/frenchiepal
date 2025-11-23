// pages/privacy.js
import React from 'react';
import Link from 'next/link'; // Importiamo Link per la navigazione

export default function PrivacyPolicy() {
    // VARIABILI DA SOSTITUIRE
    const titolare = "[IL TUO NOME/RAGIONE SOCIALE]";
    const emailContatto = "[LA TUA EMAIL DI CONTATTO]";

    return (
        <div className="min-h-screen bg-[#f4fbf8] font-poppins p-8 md:p-16 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-[#2a9d8f] mb-2">🔒 Informativa sulla Privacy – FrenchiePal</h1>
                <Link href="/">
                    <p className="text-lg text-gray-600 hover:underline cursor-pointer">← Torna al Chatbot</p>
                </Link>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Base Giuridica del Trattamento (Legittimo Interesse)</h2>
                <p className="text-gray-700 leading-relaxed">
                    FrenchiePal registra le conversazioni degli utenti esclusivamente per finalità di **miglioramento del servizio** e ottimizzazione dei modelli linguistici. La base giuridica che autorizza il trattamento è il **Legittimo Interesse del Titolare** (art. 6, par. 1, lett. f del GDPR).
                </p>
                <p className="text-gray-700 leading-relaxed mt-2 italic text-sm border-l-4 border-[#2a9d8f] pl-3">
                    Il trattamento è limitato ai soli dati testuali e non è finalizzato alla profilazione o al marketing. Non vengono richiesti dati identificativi (nome, email, IP).
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Dati Raccolti e Responsabili Esterni</h2>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                    <li>**Dati Raccolti:** Contenuto testuale delle conversazioni (dati pseudonimi associati a un ID di Sessione anonimo e non persistente).</li>
                    <li>**Finalità:** Analisi interna, debugging e miglioramento della qualità delle risposte AI.</li>
                    <li>**Trattamento AI (OpenAI API):** Le risposte sono generate tramite il servizio OpenAI API, che elabora i messaggi unicamente per fornire la risposta e non li utilizza per addestramento dei propri modelli, conformemente ai Termini d’Uso di OpenAI.</li>
                    <li>**Conservazione (Firebase):** I log sono archiviati su Google Firebase (Firestore), servizio conforme al GDPR e ospitato su server dell’Unione Europea.</li>
                </ul>
            </section>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Periodo di Conservazione</h2>
                <p className="text-gray-700 leading-relaxed">
                    I log delle conversazioni vengono conservati per un periodo massimo di **12 mesi**, dopodiché vengono eliminati automaticamente dal database.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Titolare del Trattamento e Contatti</h2>
                <p className="text-gray-700 leading-relaxed">
                    **Titolare del trattamento:** {titolare}
                    <br/>
                    Per ogni richiesta di informazioni, accesso o cancellazione dei dati (diritti dell’interessato), puoi contattarci scrivendo a: **{emailContatto}**.
                </p>
            </section>

            <footer className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
                Ultimo aggiornamento: Ottobre 2025.
            </footer>
        </div>
    );
}
