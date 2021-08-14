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
        sans: 'neue-haas-grotesk-text',
        display: 'neue-haas-grotesk-display'
      },
      colors: {
        rose: colors.rose,
        gray: colors.coolGray
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
}
