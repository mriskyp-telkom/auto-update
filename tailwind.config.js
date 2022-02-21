/* eslint-disable */
const { guruMobile } = require('@wartek-id/tailwind-config')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        base: '.875rem', //14px
        large: '1rem', //16px
      },
      textColor: {
        ...guruMobile.colors,
        ...guruMobile.textColor,
        blueCustom: '#0b5ae2',
      },
      backgroundColor: {
        ...guruMobile.colors,
        ...guruMobile.backgroundColor,
        default: '#ffffff',
        warning: '#ffc453',
      },
      borderColor: {
        ...guruMobile.colors,
        warning: '#ffc453',
      },
      boxShadow: {
        DEFAULT: 'inset 0px -1px 0px #c9cbcf',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
