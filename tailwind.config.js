/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1EA',
        ink: '#1A1A1A',
        wine: '#7C2D28',
        gold: '#B8956A',
        stone: '#8B8680',
      },
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
