/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Spartan'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        regular: 'hsl(var(--text-regular) / <alpha-value>)',
        strong: 'hsl(var(--text-strong) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
