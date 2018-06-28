const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const logger = require('../lib/logger')

const defaultStats = {
  children: false,
  colors: true,
  cached: false,
  cachedAssets: false,
  entrypoints: false
}


class Webpack {
  constructor (options = {}) {
    this.mode = options.mode || 'development'
    this.config = this._resolveConfig(require('../lib/webpack'))
  }

  _resolveConfig (config) {
    if (typeof config === 'function') {
      config = config({}, { mode: this.mode })
    }

    if (!config.mode) {
      config.mode = this.mode
    }

    config.plugins.push(new ProgressBarPlugin({
      format: logger.c.type('webpack') + '\t build [:bar] ' + logger.c.msg(':percent') + ' (:elapsed seconds)'
    }))

    return config
  }

  watch () {
    logger.log('webpack', `Running in ${this.mode} mode.`)
    logger.log('webpack', 'Building files...')

    const compiler = webpack(this.config)

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)

        return
      }

      const output = stats.toString({
        ...this.config.stats,
        ...defaultStats
      })

      console.log('\n%s\n', output)
    })
  }
}

module.exports = Webpack
