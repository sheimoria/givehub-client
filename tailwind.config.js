const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
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
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-invalid-variant-plugin')
  ]
}
