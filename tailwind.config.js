/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./vistas/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        dark: '#1e293b',
        light: '#f1f5f9',
      },
      fontFamily: {
        gaming: ['"Press Start 2P"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
