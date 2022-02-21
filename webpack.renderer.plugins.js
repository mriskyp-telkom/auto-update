/* eslint-disable */
require('dotenv').config()

const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'public'),
        to:
          process.env.BUILD.trim() === 'false'
            ? path.resolve(__dirname, '.webpack/renderer')
            : path.resolve(__dirname, '.webpack/renderer/main_window'),
      },
    ],
  }),
]
