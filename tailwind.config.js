module.exports = {
  content: ["./public/index.html", "./src/**/*.svelte"],
  plugins: [require("@tailwindcss/typography"), require('daisyui'),],
   daisyui: {
    themes: ["emerald"],
  },
};