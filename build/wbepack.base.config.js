const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')
const {join} = require('path')
const {argvs} = require('./webpack.common.config');
const { injectJs, injectCss } = require('./config/build.config');
const HtmlInjectPlugin = require('./plugins/HtmlInjectPlugin');
const mode = argvs.mode || 'development'
const isProd = mode === 'production'
const isProfile = argvs.profile

const webpackModules = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'babel-loader',
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
            ],
            sideEffects: true
        },
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader',
                'css-loader',
                'less-loader'
            ],
            sideEffects: true
        },
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 1 * 1024,
                },
            },
            sideEffects: true
        },
        {
            test: /\.json$/,
            type: 'asset/resource',
        }
    ],
    generator: {
        asset: {
            filename: './asset/[name].[hash:8].[ext]',
        },
    },
}

const webpackPlugins = [
    new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
        template: join(__dirname, isProd?'../public/index-pro.html':'../public/index-dev.html'),
        inject: true,
        favicon: join(__dirname, '../public/favicon.ico'),
        title:'Pandavision GIS',
        minify:isProd?{
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }:false,
    }),
    new HtmlInjectPlugin({
        js: injectJs,
        css: injectCss,
      }),
    new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_I18N_FULL_INSTALL__:true,
        __VUE_I18N_LEGACY_API__:false
    }),
    new CircularDependencyPlugin({
        exclude: /node_modules/,
        // include specific files based on a RegExp
        include: /src\/web/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
    }),
    new CopyPlugin({
        patterns: [
            {
                from:'node_modules/@esri/calcite-components/dist/calcite/assets/',
                to:'esri/calcite/assets'
            }
        ]
    }),
    new webpack.SourceMapDevToolPlugin({
        test:/\.(js|jsx|ts|tsx|css)($|\?)/i,
        exclude: /node_modules/, 
        columns:!isProd
    })
].concat(isProfile ? [new BundleAnalyzerPlugin()] : [])


const WebpackOptimization = {
    minimize: true,
    splitChunks:{
      chunks: 'all',
      maxAsyncRequests:20,
      maxInitialRequests:30,
      minChunks:2,
      cacheGroups:{
        vendors:{
          chunks: 'initial',
          test:/[\\/]node_modules[\\/]/,
          idHint:'vendors',
          enforce:true,
          priority:-10,
        },
        common:{
          chunks:'all',
          idHint:'common',
          priority:-20,
          reuseExistingChunk:true
        }
      },
      //只有超过了这个字节的才会准备分包
      //实际并不会分包，需要判断maxSize,maxAsyncRequests,maxInitialRequests
      minSize: {
        javascript: 10000,
        style: 0,
      },
      //根据包大小进行拆包
      maxSize: {
        javascript: 100000,
        style: 100000,
      },
    },
    runtimeChunk:{
      name:'runtime'
    }
}

module.exports = {
    webpackModules,
    webpackPlugins,
    WebpackOptimization
}