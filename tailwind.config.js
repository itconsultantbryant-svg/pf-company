/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FDB813',
        secondary: '#0B3C5D',
        accent: '#00A896'
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(253,184,19,0.25), 0 20px 60px rgba(11,60,93,0.25)'
      }
    }
  },
  plugins: []
};

