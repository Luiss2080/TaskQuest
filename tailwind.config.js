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
          dark: '#050505',
          card: '#0f0f13',
          border: '#1f1f2e',
          neonCyan: '#00f3ff',
          neonPink: '#ff00ea',
          neonGreen: '#39ff14',
          neonYellow: '#ffe600',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['"Press Start 2P"', 'cursive'],
        cyber: ['"Orbitron"', 'sans-serif'], // We'll assume orbitron or standard sans
      },
      boxShadow: {
        'neon-cyan': '0 0 5px theme("colors.quest.neonCyan"), 0 0 20px theme("colors.quest.neonCyan")',
        'neon-pink': '0 0 5px theme("colors.quest.neonPink"), 0 0 20px theme("colors.quest.neonPink")',
        'neon-green': '0 0 5px theme("colors.quest.neonGreen"), 0 0 20px theme("colors.quest.neonGreen")',
        'neon-yellow': '0 0 5px theme("colors.quest.neonYellow"), 0 0 20px theme("colors.quest.neonYellow")',
      },
      backgroundImage: {
        'gamer-grid': 'linear-gradient(to right, #1f1f2e 1px, transparent 1px), linear-gradient(to bottom, #1f1f2e 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
