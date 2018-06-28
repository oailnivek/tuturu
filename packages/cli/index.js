const program = require('commander')

program
  .name('tuturu')
  .version('0.1.0')
  .usage('<command> [options]')
  .action(function (command) {
    program.outputHelp()
  })

require('./command/serve')(program)
require('./command/build')(program)

program.parse(process.argv)
