/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["content/*.md", "layouts/**/*.html"],
  theme: {
    extend: {
      colors: {
        "pl-blue": "#2c7df7",
        "pl-dark-blue": "#002256",
        "pl-gray": "#f6f7fa",
        "pl-recruiting-blue": "#156ff7",
      },
    },
    plugins: [],
  },
};
