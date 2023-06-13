/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,ttf}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-instagram' : '#000000',
        'story': '#121212'
      },
      fontFamily: {
        'billabong' : ['Billabong', 'sans-serif']
      }
    },
  },
  plugins: [],
}

