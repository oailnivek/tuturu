const path = require('path')

const workDir = process.cwd()
const configRoot = (...src) => path.join(__dirname, '.', ...src)
const root = (...src) => path.join(workDir, ...src)
const src = (...file) => path.join(root('resources'), ...file)

exports.configRoot = configRoot
exports.root = root
exports.src = src
