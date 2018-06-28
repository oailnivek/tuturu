const readline = require('readline')
const chalk = require('chalk')

const clear = () => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
  }
}

const c = {
  type: s => chalk.bold.green(` ${s.toUpperCase()} `),
  action: s => chalk.black.bgGreen(` ${s.toUpperCase()} `),
  msg: chalk.green
}

const log = (type, msg) => console.log('%s  %s', c.type(type), c.msg(msg))

const logAction = (type, msg) => console.log('%s  %s', c.action(type), c.msg(msg))

exports.clear = clear
exports.c = c
exports.log = log
exports.logAction = logAction
