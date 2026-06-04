/** @type {import('tailwindcss').Config} */
const system = ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif']

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Flat grayscale palette — kept the same token names so no component
      // needs to change; only the look is neutralized.
      colors: {
        wine: '#1f1f1f', // primary (buttons / accents) -> near-black
        cream: '#ffffff', // backgrounds -> white
        stone: '#666666', // muted text / borders -> gray
        ink: '#111111', // main text -> almost black
        gold: '#555555', // ratings -> gray
        lavender: '#e5e5e5', // blocked cells -> light gray
      },
      fontFamily: {
        serif: system,
        sans: system,
      },
    },
  },
  plugins: [],
}
