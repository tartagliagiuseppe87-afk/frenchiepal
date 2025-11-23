/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      // Estendiamo la famiglia di font
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // Aggiungiamo i tuoi colori personalizzati alla palette di Tailwind
      colors: {
        'frenchie-mint': '#A8BCA1',
        'frenchie-dark': '#4A5D43', // Un verde scuro per il contrasto
        'frenchie-light': '#E8F3E6', // Un verde chiarissimo per gli sfondi
      }
    },
  },
  plugins: [],
};
