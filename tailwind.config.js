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
          fadedtext: "rgba(104, 112, 137, 0.925)",
        },
      },
      fontSize: {
        "h1-mobile": "3rem",
        "h1-medium": "4rem",
        "h1-large": "5rem",
        "h2-mobile": "1.5rem",
        "h2-medium": "2rem",
        "h2-large": "3rem",
      },
    },
  },
  plugins: [],
};
