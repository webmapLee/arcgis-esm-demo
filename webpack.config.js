const { merge } = require('webpack-merge')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { resolve } = require('path')
const {argvs} = require('./build/webpack.common.config')
const mode = argvs.mode || 'development'
const webpackEnvConfig = require(`./build/webpack.${mode}.config.js`)
const {webpackModules,webpackPlugins,WebpackOptimization} = require('./build/wbepack.base.config.js')

// const smp = new SpeedMeasurePlugin()
/**
 * @type {import('webpack').Configuration}
 */
const baseConfig = {
  entry: {
    path:'./src/index.ts',
  },
  module: webpackModules,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/web'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: webpackPlugins,
  optimization: WebpackOptimization,
}

const mergeConfig = merge(baseConfig, webpackEnvConfig)
// module.exports = smp.wrap(mergeConfig)
module.exports = mergeConfig

