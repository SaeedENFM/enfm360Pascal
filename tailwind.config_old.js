/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      colors: {
        "dashboard-primary":  "#8B5CF6", //#4F46E5 blue color
        "dashboard-secondary": "#F1F5F8", // #ECEAFF // #DFE7FF
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
  },
  plugins: [],
}

