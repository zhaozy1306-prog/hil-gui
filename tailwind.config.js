/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        tesla: {
          dark: '#000000',
          darkgray: '#181818',
          gray: '#222222',
          lightgray: '#393c41',
          blue: '#3e6ae1',
          white: '#ffffff',
          accent: '#e82127',
        }
      },
      fontFamily: {
        tesla: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
