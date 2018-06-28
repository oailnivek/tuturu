// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { configRoot, root } = require('./util')

const excludeChunksForHTML = ['kroma', 'runtime', 'vendor', 'commons', 'jquery', 'bugsnag']

module.exports = () => {
  return [
    new MiniCssExtractPlugin({
      filename: '[name].css.liquid'
    }),

    // new VueLoaderPlugin(),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    }),

    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),

    new HtmlWebpackPlugin({
      cache: true,
      excludeChunks: excludeChunksForHTML,
      template: configRoot('templates/bundle-scripts.html'),
      filename: root('dist/snippets/bundle-scripts.liquid')
    }),

    new HtmlWebpackPlugin({
      cache: true,
      excludeChunks: excludeChunksForHTML,
      template: configRoot('templates/bundle-styles.html'),
      filename: root('dist/snippets/bundle-styles.liquid')
    })
  ]
}
