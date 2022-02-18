/* eslint-disable */
const rules = require('./webpack.rules')
const plugins = require('./webpack.renderer.plugins')
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
    },
    { loader: 'postcss-loader' },
  ],
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      renderer: path.resolve(__dirname, './src/renderer'),
    },
  },
}
