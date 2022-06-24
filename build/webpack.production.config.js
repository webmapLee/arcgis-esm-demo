const { resolve } = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash].js",
    clean: {
      keep:/ignored\/esriAssets\//
    },
  },
  mode: "production",
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
};
