// pages/privacy.js
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function PrivacyPolicy() {
    // 🚨 COMPILA QUESTI DATI REALI PRIMA DEL COMMIT
    const titolare = "[IL TUO NOME E COGNOME]"; 
    const indirizzo = "[IL TUO INDIRIZZO O CITTÀ]"; 
    const emailContatto = "[LA TUA EMAIL DI CONTATTO]"; 

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
                        Conforme al Regolamento UE 2016/679 (GDPR)
                    </p>
                </div>

                {/* Contenuto del Documento */}
                <div className="p-8 md:p-12 space-y-10">

                    {/* Sezione 1: Base Giuridica (Migliorata con Balancing Test) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">1</div>
                            <h2 className="text-xl font-bold text-gray-800">Base Giuridica e Finalità</h2>
                        </div>
                        <div className="pl-11">
                            <p className="text-gray-600 leading-relaxed mb-3">
                                FrenchiePal tratta i dati esclusivamente per finalità di <strong>miglioramento del servizio</strong>, analisi delle prestazioni e ottimizzazione delle risposte dell'intelligenza artificiale.
                            </p>
                            <div className="bg-gray-50 border-l-4 border-[#2a9d8f] p-4 rounded-r-lg text-sm text-gray-700 italic">
                                <p className="mb-2">
                                    <strong>Base Giuridica:</strong> Il trattamento si fonda sul <strong>Legittimo Interesse del Titolare</strong> (art. 6, par. 1, lett. f) GDPR), consistente nel mantenimento della qualità e della sicurezza del servizio offerto.
                                </p>
                                <p>
                                    Il Titolare ha effettuato un test di bilanciamento (Balancing Test) che ha confermato che tale interesse non prevale sui diritti e sulle libertà fondamentali degli utenti, in quanto i dati sono trattati in forma pseudonima e non per fini di profilazione o marketing.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sezione 2: Dati e Sicurezza (Migliorata su OpenAI) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">2</div>
                            <h2 className="text-xl font-bold text-gray-800">Dati Raccolti e Sicurezza</h2>
                        </div>
                        <div className="pl-11">
                            <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-outside ml-4">
                                <li>
                                    <strong className="text-gray-800">Minimizzazione (Privacy by Design):</strong> Il sistema include un filtro attivo che intercetta e rimuove automaticamente eventuali dati personali (nome, email, telefono) inseriti dall'utente, <em>prima</em> che vengano salvati nel database.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Pseudonimizzazione:</strong> I dati salvati sono associati a un ID di Sessione casuale che cambia ad ogni visita. Non vengono raccolti né memorizzati indirizzi IP o altri identificativi persistenti.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Trattamento AI (OpenAI):</strong> Le risposte sono generate tramite <strong>OpenAI API</strong>. OpenAI tratta i dati inviati esclusivamente per erogare il servizio di risposta e non li utilizza per l'addestramento dei propri modelli, in conformità ai relativi termini di servizio aziendali (API Data Privacy).
                                </li>
                                <li>
                                    <strong className="text-gray-800">Archiviazione (Firebase):</strong> I log sono archiviati su <strong>Google Firebase (Firestore)</strong>, su server situati nell'Unione Europea, garantendo standard di sicurezza elevati.
                                </li>
                            </ul>
                        </div>
                    </section>
                    
                    {/* Sezione 3: Conservazione (Specificato motivo e automazione) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#eafaf7] flex items-center justify-center text-[#2a9d8f] font-bold text-sm border border-[#2a9d8f]/20">3</div>
                            <h2 className="text-xl font-bold text-gray-800">Periodo di Conservazione</h2>
                        </div>
                        <div className="pl-11">
                            <p className="text-gray-600 leading-relaxed">
                                I log delle conversazioni vengono conservati per un periodo massimo di <strong>6 mesi</strong>. Tale periodo è ritenuto necessario per l'analisi storica dei malfunzionamenti e il miglioramento progressivo del servizio. Alla scadenza, i dati vengono eliminati.
                            </p>
                        </div>
                    </section>

                    {/* Sezione 4: Titolare (Campi Obbligatori Aggiunti) */}
                    <section className="border-t border-gray-100 pt-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Titolare del Trattamento e Contatti</h2>
                        <div className="bg-[#f8fcfb] p-6 rounded-xl border border-gray-100">
                            <p className="text-gray-700 leading-relaxed mb-1">
                                <strong>Titolare del trattamento:</strong> {titolare}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Indirizzo:</strong> {indirizzo}
                            </p>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                Gli utenti possono esercitare in qualsiasi momento i propri diritti (accesso, rettifica, cancellazione, limitazione, opposizione) previsti dagli artt. 15-22 del GDPR contattando il Titolare all'indirizzo: <br/>
                                <a href={`mailto:${emailContatto}`} className="text-[#2a9d8f] font-semibold hover:underline mt-1 inline-block">{emailContatto}</a>
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer della Card */}
                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Ultimo aggiornamento: Novembre 2025 • FrenchiePal
                    </p>
                </div>
            </div>
        </div>
    );
}
