const { gray } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter var',
        display: 'Gilroy'
      },
      colors: {
        rose: colors.rose,
        gray: colors.gray
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['invalid'],
      borderColor: ['invalid']
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-invalid-variant-plugin')
  ]
}
