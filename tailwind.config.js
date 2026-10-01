/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C0C0C',
        'primary-text': '#F5F1E8',
        'secondary-text': '#B8B2A8',
        maroon: '#5A1625',
        burgundy: '#7A2335',
        beige: '#D8C7A3',
        cream: '#F1E8D5',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
