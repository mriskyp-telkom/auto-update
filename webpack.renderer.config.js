/* eslint-disable */
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
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
      components: path.resolve(__dirname, './src/components'),
      constants: path.resolve(__dirname, './src/constants'),
      helpers: path.resolve(__dirname, './src/helpers'),
      repositories: path.resolve(__dirname, './src/repositories'),
      services: path.resolve(__dirname, './src/services'),
      stores: path.resolve(__dirname, './src/stores'),
      types: path.resolve(__dirname, './src/types'),
      views: path.resolve(__dirname, './src/views'),
    },
  },
}
