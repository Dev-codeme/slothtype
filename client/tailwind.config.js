/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#ffebc8',
        secondary: '#bdfff5'
      },
      boxShadow: {
        normal: '0 0 3px 1px'
      }
    },
  },
  plugins: [],
}