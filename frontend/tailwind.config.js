/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: "#f2fbf5",
          100: "#e1f6e8",
          200: "#c4ebd3",
          300: "#98dab4",
          400: "#64c18f",
          500: "#3ca56e",
          600: "#2d8656",
          700: "#266b46",
          800: "#225539",
          900: "#1d4731",
          950: "#0c271a",
        },
        earth: {
          50: "#faf8f5",
          100: "#f4f0e9",
          200: "#e8dfd2",
          300: "#d7c7b2",
          400: "#c3ab8e",
          500: "#b19273",
          600: "#9d7c5e",
          700: "#83654e",
          800: "#6b5443",
          900: "#59463a",
        }
      },
    },
  },
  plugins: [],
};
