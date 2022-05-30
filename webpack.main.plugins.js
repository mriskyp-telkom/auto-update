/* eslint-disable */
require('dotenv').config()

const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')

module.exports = [
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'convert'),
        to: path.resolve(__dirname, '.webpack/main/convert'),
      },
      {
        from: path.resolve(__dirname, 'print'),
        to: path.resolve(__dirname, '.webpack/main/print'),
      },
      {
        from: path.resolve(__dirname, 'src/splash.html'),
        to: path.resolve(__dirname, '.webpack/main'),
      },
      {
        from: path.resolve(__dirname, 'public/assets/splash.png'),
        to: path.resolve(__dirname, '.webpack/main'),
      },
    ],
  }),
]
