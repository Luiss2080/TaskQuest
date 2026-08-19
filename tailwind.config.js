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
        'quest-dark': '#0b0f19',
        'quest-card': '#111827',
        'quest-border': '#1f2937',
        'quest-neon-cyan': '#00f2fe',
        'quest-neon-pink': '#fe0979',
        'quest-neon-green': '#10b981',
        'quest-neon-yellow': '#f59e0b',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        gaming: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px theme("colors.quest-neon-cyan")',
        'neon-pink': '0 0 10px theme("colors.quest-neon-pink")',
        'neon-green': '0 0 10px theme("colors.quest-neon-green")',
        'neon-yellow': '0 0 10px theme("colors.quest-neon-yellow")',
      }
    },
  },
  plugins: [],
}
