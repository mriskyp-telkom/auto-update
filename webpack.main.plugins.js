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
    ],
  }),
]
