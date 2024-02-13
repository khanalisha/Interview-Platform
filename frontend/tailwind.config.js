/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F9D663", //darkest
          200: "#EFD990",
          300: "#EDE1B8",
          400: "#F3EEDC",
          500: "#fefdf8",
          600:"#ffffff;"
        },
        background: "#F3EEDC", //
        accent: "#fca920",
        text: "#000",
        boldText: "#292929",

        // text: "#fff",
      },
    },
  },
  plugins: [],
};
