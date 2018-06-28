const Webpack = require('../core/webpack')
const Slate = require('../core/slate')

module.exports = program => {
  program
    .command('serve')
    .arguments('[mode]')
    .usage('[mode] [options]')
    .description('Watch your changes, bundle with webpack and upload to Shopify.')
    .option('-e, --env [env]', 'Theme environment to run the command, default to `development`.')
    .action(async function (mode) {
      if (!mode) {
        mode = 'development'
      }

      const slate = new Slate()
      slate.watch()

      const webpack = new Webpack({ mode })
      webpack.watch()
    })
}
