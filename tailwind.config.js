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
          bg: "rgba(153,186,221, 0.9)",
          text: "#000",
          fadedtext: "rgba(104, 112, 137, 0.925)",
        },
      },
      fontSize: {
        "h1-mobile": "1.5rem",
        "h1-medium": "3rem",
        "h1-large": "4rem",
        "h2-mobile": "1rem",
        "h2-medium": "2rem",
        "h2-large": "3rem",
      },
    },
  },
  plugins: [],
};

("rgba(255, 103, 0, 0.925)");
