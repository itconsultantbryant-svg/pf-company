/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /** Brand red — primary CTAs (white text) */
        primary: '#C62828',
        /** Gold accent — matches logo highlights */
        gold: '#FDB813',
        secondary: '#0B3C5D',
        accent: '#00A896',
        /** Official WhatsApp brand green */
        whatsapp: '#25D366'
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow:
          '0 0 0 1px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.06), 0 12px 40px rgba(15,23,42,0.08)'
      }
    }
  },
  plugins: []
};

