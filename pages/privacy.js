// pages/privacy.js
import React from 'react';
import Link from 'next/link'; // Importiamo Link per la navigazione

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#f4fbf8] font-poppins p-8 md:p-16 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-[#2a9d8f] mb-2">🔒 Informativa sulla Privacy – FrenchiePal</h1>
                <Link href="/">
                    <p className="text-lg text-gray-600 hover:underline">← Torna al Chatbot</p>
                </Link>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Base Giuridica del Trattamento (Art. 6 GDPR)</h2>
                <p className="text-gray-700 leading-relaxed">
                    FrenchiePal registra le conversazioni al solo scopo di migliorare la qualità e l'accuratezza del servizio. La base giuridica che autorizza il trattamento è il **Legittimo Interesse** del titolare (Art. 6, par. 1, lett. f) GDPR). Questo interesse prevale sui diritti dell'interessato in quanto i dati sono raccolti in forma pseudonima.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Dati Raccolti e Modalità di Conservazione</h2>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                    <li>**Contenuto della Chat:** Le conversazioni testuali sono registrate in formato libero. Sebbene non sia richiesto, l'utente è l'unico responsabile nel non inserire dati personali (nome, email, telefono, ecc.).</li>
                    <li>**Dati Pseudonimi:** Viene generato un **ID di Sessione Unico** per ogni visita, utilizzato per raggruppare i messaggi. Questo identificativo non è persistente e non viene associato a indirizzi IP o altri dati identificativi.</li>
                    <li>**Servizi Esterni (Responsabili Esterni):** I dati pseudonimi sono conservati su **Google Firebase (Firestore)**. Firebase è un servizio conforme al GDPR.</li>
                    <li>**Luogo del Trattamento:** I dati sono ospitati su server dell'Unione Europea (UE), come specificato nelle impostazioni di Firebase.</li>
                </ul>
            </section>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Periodo di Conservazione</h2>
                <p className="text-gray-700 leading-relaxed">
                    Le conversazioni vengono eliminate dopo un periodo massimo di **12 mesi** dalla data di registrazione e non sono utilizzate per fini di profilazione o marketing.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Titolare del Trattamento e Contatti</h2>
                <p className="text-gray-700 leading-relaxed">
                    **Titolare del trattamento:** [IL TUO NOME/RAGIONE SOCIALE].
                    <br/>
                    Per ogni richiesta di informazioni, accesso o cancellazione dei dati, puoi contattare: **[LA TUA EMAIL DI CONTATTO]**.
                </p>
            </section>

            <footer className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
                Ultimo aggiornamento: Ottobre 2025.
            </footer>
        </div>
    );
}
