/* eslint-disable */
const { guruMobile } = require('@wartek-id/tailwind-config')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        ...guruMobile.colors,
        ...guruMobile.textColor,
      },
      backgroundColor: {
        ...guruMobile.colors,
        ...guruMobile.backgroundColor,
        default: '#ffffff',
        warning: '#ffc453',
      },
      borderColor: {
        warning: '#ffc453',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
