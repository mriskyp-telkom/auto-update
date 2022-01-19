/* eslint-disable */
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[folder]_[local]__[hash:base64:5]',
        },
      },
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
  },
}
