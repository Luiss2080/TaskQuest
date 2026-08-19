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
          border: '#334155',
          'neon-cyan': '#06b6d4',
          'neon-pink': '#d946ef',
          'neon-green': '#22c55e',
          'neon-yellow': '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px theme("colors.quest.neon-cyan")',
        'neon-pink': '0 0 10px theme("colors.quest.neon-pink")',
        'neon-green': '0 0 10px theme("colors.quest.neon-green")',
        'neon-yellow': '0 0 10px theme("colors.quest.neon-yellow")',
      }
    },
  },
  plugins: [],
}
