const fs = require('fs')
const path = require('path')
const { src } = require('./util')

module.exports = () => {
  const files = fs.readdirSync(src('pages'))

  return files.reduce((entries, file) => {
    const key = path.basename(file, '.js')
    entries[key] = [
      // src('utils/bootstrap'),
      src(`pages/${key}`)
    ]

    return entries
  }, {})
}
