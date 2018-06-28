const { spawn } = require('child_process')
const logger = require('../lib/logger')

const workDir = process.cwd()

const gulp = {
  bin: require.resolve('.bin/gulp'),
  config: require.resolve('@shopify/slate-tools/lib/gulpfile.js')
}

class Slate {
  constructor (options = {}) {
    this.previewURL = null
    this.initialized = false
    this.env = options.env || 'development'
  }

  get _spawnArgs () {
    return [
      'watch',
      '--gulpfile', gulp.config,
      '--cwd', workDir,
      '--environment', this.env
    ]
  }

  async watch () {
    logger.log('slate', 'Building files...')

    try {
      const child = await spawn(gulp.bin, this._spawnArgs, {})

      child.stdout.on('data', this._handleStdout.bind(this))
    } catch (err) {
      console.error(err)
    }
  }

  _handleStdout (data) {
    const str = data.toString()
    const msg = str.replace(/\r|\n/, '')
    let match

    if (this.initialized) {
      match = str.match(/^\[\d{2}:\d{2}:\d{2}\]/)

      if (!match) {
        if (str.indexOf(`[${this.env}]`) > -1) {
          process.stdout.write(str + '\r')
        } else if (str.indexOf('Transfer Complete:') > -1) {
          this._reset()
          process.stdout.write(`${logger.c.type('slate')}\t`)
          process.stdout.write(data)
        } else if (msg.trim().length === 0) {
          // do nothing
        } else {
          // process.stdout.write(`${logger.c.type('slate')}\t`)
          // process.stdout.write(data)
        }
      }

      return
    }

    match = str.match(/Local:.*(https:\/\/localhost:\d*\/\?preview_theme_id=\d*)/)

    if (match && match[1]) {
      console.log(this)
      this.previewURL = match[1]
      this._reset()
      this.initialized = true
    }
  }

  _reset () {
    logger.clear()
    logger.logAction('open', this.previewURL + '\n')
  }
}


module.exports = Slate
