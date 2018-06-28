const getEntries = require('./entries')
const getRules = require('./rules')
const getPlugins = require('./plugins')
const getOptimization = require('./optimization')
const { root, src } = require('./util')

exports.config = debug => ({
  entries: getEntries(),
  rules: getRules(debug),
  plugins: getPlugins(debug),
  optimization: getOptimization(debug)
})

exports.root = root
exports.src = src
