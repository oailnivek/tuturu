const { config, root } = require('./config')

module.exports = (env, argv) => {
  const debug = argv.mode === 'development'
  const { entries, plugins, optimization } = config(debug)

  return {
    entry: {
      ...entries
    },

    stats: { children: false },

    output: {
      path: root('dist/assets'),
      filename: '[name].js.liquid'
    },

    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        'vue-bus-driver$': 'vue-bus-driver/dist/index.esm.js'
      },
      extensions: ['.js', '.json', '.vue']
    },

    devtool: debug ? '#eval-source-map' : '#cheap-source-map',

    plugins,

    optimization
  }
}
