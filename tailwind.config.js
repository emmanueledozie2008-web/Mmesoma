/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'fbi-navy': '#0B3B60',
          'fbi-red': '#B22234',
          'fbi-gold': '#FFD700',
        },
      },
    },
    plugins: [],
  };