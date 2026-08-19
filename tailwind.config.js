/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quest: {
          dark: '#0f172a',
          card: '#1e293b',
          primary: '#6366f1',
          secondary: '#ec4899',
          accent: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['"Press Start 2P"', 'cursive'],
      }
    },
  },
  plugins: [],
}
