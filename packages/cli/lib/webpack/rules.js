const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { root } = require('./util')

module.exports = debug => {
  return [
    {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        failOnError: true
      }
    },

    {
      // javascript source code
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    },

    {
      // vue single file component
      test: /\.vue$/,
      loader: 'vue-loader'
    },

    {
      test: /\.(css|scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false,
            importLoaders: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: root('build/postcss.config.js')
            }
          }
        },
        { loader: 'sass-loader' }
      ]
    }
  ]
}
