/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primary: '#1b4f08',
      secondary: '#BFE2A3',
      white: '#ffffff',
      black: '#000000',
      darkGreen: '#0d2504',
      darkPrimary: '#174007',
      lightGrey: '#F7F7F7',
      grey : '#5a5a5a',
      darkGrey:'#3b4939',
      darkGreyGreen: '#323e28',
      darkSecondary:'#233e1b',
      red : '#970000',
    }
  },
  plugins: [],
})
