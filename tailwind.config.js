module.exports = {
  content: [],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        0.5: "0.5",
        0.6: "0.6",
        0.7: "0.7",
        0.8: "0.8",
      },
      keyframes: {
        fill: {
          "0%": { width: "0%" },
          "100%": { width: "50%" },
        },
      },
      animation: {
        fill: "fill 2s ease-in-out forwards",
      },
    },
    plugins: [],
  },
};
