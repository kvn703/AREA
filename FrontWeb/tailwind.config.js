/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FEFEF1",
        secondary: "#1E2985",
        third: "#4F43DA",
      },
    },
  },
  plugins: [require("daisyui")],
};
