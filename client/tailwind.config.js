/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD166',
        secondary: '#F5F5F0',
      },
      fontFamily: {
        primary: ['Poppins', 'Inter', 'Helvetica', 'Arial', 'sans-serif'], // custom primary font
      },
    },
  },
  plugins: [],
}

