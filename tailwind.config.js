/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
     "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'sans':['Poppins','sans-serif'],
        'overpass':['overpass','sans-serif'],
        'overpass-bold':['overpass-bold','sans-serif'],
      }
    },
  },
  plugins: [],
}

