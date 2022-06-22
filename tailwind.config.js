module.exports = {
  content: ["./public/index.html", "./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui'),],
};
