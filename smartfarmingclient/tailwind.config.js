/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#001524",
        secondaryColor: "#FF7D00",
        darkerColor: "#78290F",
        buttonColor: "#15616D",
        textColor: "#FFECD1",
        lighterColor: "#C7EFCF",
      },
    },
  },
  plugins: [],
};
