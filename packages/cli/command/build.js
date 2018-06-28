module.exports = program => {
  program
    .command('build')
    .arguments('[mode]')
    .usage('[mode] [options]')
    .option('-e, --env [env]', 'Theme environment to run the command, default to `development`.')
    .action(function (mode) {
      if (!mode) {
        mode = 'development'
      }
    })
}
