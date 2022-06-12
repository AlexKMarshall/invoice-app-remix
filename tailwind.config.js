/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Spartan'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          alt: 'hsl(var(--surface-alt) / <alpha-value>)',
        },
        regular: 'hsl(var(--text-regular) / <alpha-value>)',
        strong: 'hsl(var(--text-strong) / <alpha-value>)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('aria-invalid', `&[aria-invalid]`)
    }),
  ],
}
