const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => ({
  noEmitOnErrors: true,

  splitChunks: {
    name: 'commons',
    chunks: 'initial',

    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name: 'vendor',
        chunks: 'initial',
        enforce: true
      }
    }
  },

  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
})
