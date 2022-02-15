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
      components: path.resolve(__dirname, './src/renderer/components'),
      configs: path.resolve(__dirname, './src/renderer/configs'),
      constants: path.resolve(__dirname, './src/renderer/constants'),
      helpers: path.resolve(__dirname, './src/main/helpers'),
      repositories: path.resolve(__dirname, './src/main/repositories'),
      services: path.resolve(__dirname, './src/main/services'),
      stores: path.resolve(__dirname, './src/renderer/stores'),
      types: path.resolve(__dirname, './src/renderer/types'),
      views: path.resolve(__dirname, './src/renderer/views'),
    },
  },
}
