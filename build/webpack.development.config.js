const { resolve } = require("path");
const webpack = require("webpack");
const {mockFn} = require("./_mock/mock.server");
const proxyTable = require("./config/proxy.table.config");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  cache:{
    type:'memory'
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "js/[name].js",
  },
  mode: "development",
  devtool: false,
  optimization:{
    usedExports:true,
  },
  devServer: {
    liveReload: true,
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    onBeforeSetupMiddleware:mockFn,
    historyApiFallback:true,
    proxy: proxyTable,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
