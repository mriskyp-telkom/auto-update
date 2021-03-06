/* eslint-disable */
const { guruMobile } = require('@wartek-id/tailwind-config')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        tiny: '.750rem', //12px
        base: '.875rem', //14px
        form: '15px',
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
        lightBlue: colors.blue[50],
      },
      borderColor: {
        ...guruMobile.colors,
        warning: '#ffc453',
      },
      borderRadius: {
        large: '.625rem',
      },
      boxShadow: {
        DEFAULT: 'inset 0px -1px 0px #c9cbcf',
        card: '0px 1px 4px rgba(0, 22, 10, 0.2)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
