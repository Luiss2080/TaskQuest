/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bento-bg': '#cbd5e1', // Fondo exterior gris claro como en la imagen
        'bento-window': '#4a2529', // Granate oscuro de la ventana
        'bento-sidebar': '#3a1a1f', // Sidebar aún más oscuro
        'bento-card': '#633136', // Cards granate claro
        'bento-card-hover': '#7a3c42',
        'bento-accent': '#ff4757', // Acento rojo/coral brillante
        'bento-text': '#fdf2f8', 
        'bento-muted': '#fbcfe8',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        gaming: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
