// pages/privacy.js
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function PrivacyPolicy() {
    // VARIABILI DA SOSTITUIRE
    const titolare = "Giuseppe Tartaglia"; // Inserisci il tuo nome reale qui
    const emailContatto = "tuaemail@esempio.com"; // Inserisci la tua email qui

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#eafaf7] to-[#ffffff] font-poppins text-gray-800 py-10 px-4 md:px-8">
            
            <Head>
                <title>Privacy Policy - FrenchiePal</title>
            </Head>

            {/* Contenitore "Card" Centrale */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                
                {/* Header della Policy */}
                <div className="bg-[#2a9d8f]/5 p-8 border-b border-gray-100">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#2a9d8f] transition-colors mb-4 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Torna alla Chat
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#2a9d8f] mb-2">
                        Informativa sulla Privacy
                    </h1>
                    <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
                        FrenchiePal • Trasparenza e Sicurezza
                    </p>
                </div>

                {/* Contenuto del Documento */}
                <div className="p-8 md:p-12 space-y-10">

                    {/* Sezione 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">1</div>
                            <h2 className="text-xl font-bold text-gray-800">Base Giuridica del Trattamento</h2>
                        </div>
                        <div className="pl-11">
                            <p className="text-gray-600 leading-relaxed mb-3">
                                FrenchiePal registra le conversazioni degli utenti esclusivamente per finalità di **miglioramento del servizio** e ottimizzazione dei modelli linguistici.
                            </p>
                            <div className="bg-gray-50 border-l-4 border-[#2a9d8f] p-4 rounded-r-lg text-sm text-gray-700 italic">
                                La base giuridica che autorizza il trattamento è il <strong>Legittimo Interesse del Titolare</strong> (art. 6, par. 1, lett. f del GDPR). Il trattamento è limitato ai soli dati testuali e non è finalizzato alla profilazione o al marketing.
                            </div>
                        </div>
                    </section>

                    {/* Sezione 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">2</div>
                            <h2 className="text-xl font-bold text-gray-800">Dati Raccolti e Sicurezza</h2>
                        </div>
                        <div className="pl-11">
                            <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-outside ml-4">
                                <li>
                                    <strong className="text-gray-800">Dati Raccolti:</strong> Contenuto testuale delle conversazioni. I dati sono pseudonimizzati e associati a un ID di Sessione anonimo che cambia ad ogni visita. Non vengono raccolti indirizzi IP.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Minimizzazione Dati (Privacy by Design):</strong> Il sistema include un filtro attivo che intercetta e rimuove automaticamente eventuali dati personali (nome, email, telefono) inseriti dall'utente, prima che vengano salvati nel database.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Trattamento AI:</strong> Le risposte sono generate tramite OpenAI API, che elabora i messaggi unicamente per fornire la risposta e non li utilizza per l'addestramento dei modelli.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Conservazione:</strong> I log sono archiviati su Google Firebase (Firestore), servizio conforme al GDPR, su server situati nell'Unione Europea.
                                </li>
                            </ul>
                        </div>
                    </section>
                    
                    {/* Sezione 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">3</div>
                            <h2 className="text-xl font-bold text-gray-800">Periodo di Conservazione</h2>
                        </div>
                        <div className="pl-11">
                            <p className="text-gray-600 leading-relaxed">
                                I log delle conversazioni vengono conservati per un periodo massimo di <strong>12 mesi</strong>, dopodiché vengono eliminati automaticamente dal database.
                            </p>
                        </div>
                    </section>

                    {/* Sezione 4 */}
                    <section className="border-t border-gray-100 pt-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Titolare del Trattamento e Contatti</h2>
                        <div className="bg-[#f8fcfb] p-6 rounded-xl border border-gray-100">
                            <p className="text-gray-700 leading-relaxed mb-2">
                                <strong>Titolare del trattamento:</strong> {titolare}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Per esercitare i tuoi diritti (accesso, rettifica, cancellazione), puoi contattarci scrivendo a: <br/>
                                <a href={`mailto:${emailContatto}`} className="text-[#2a9d8f] font-semibold hover:underline">{emailContatto}</a>
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer della Card */}
                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Ultimo aggiornamento: Ottobre 2025 • FrenchiePal
                    </p>
                </div>
            </div>
        </div>
    );
}
