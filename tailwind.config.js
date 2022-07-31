/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "rgba(255, 103, 0, 0.925)",
          text: "#000",
        },
      },
      fontSize: {
        "h2-mobile": "2rem",
        "h2-small": "3rem",
        "h2-medium": "4rem",
        "h2-large": "5rem",
      },
    },
  },
  plugins: [],
};
