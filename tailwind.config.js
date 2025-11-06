/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: '#00B9EB',
        azul2: '#004E7D'

      },
        fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
          bebas: ['Bebas Neue', 'sans-serif'],
        helvetica: ['Helvetica','sans-serif'],
      },
    },
  },
  plugins: [],
}

