'use strict';

const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js', '.json', '.vue']
  },
  entry: './src/index.js',
  externals: {
    'vue': {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-loading.min.js',
    library: 'VueLoading',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    // Workaround to fix umd build, restore webpack v3 behaviour
    // https://github.com/webpack/webpack/issues/6642
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          },
        ],
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          output: {
            beautify: false,
          },
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      }),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-loading.css',
    }),
    new UnminifiedWebpackPlugin({
      exclude: /\.css$/
    }),
    new VueLoaderPlugin(),
    new webpack.BannerPlugin({
      banner: require('./package.json').name
    }),
  ],
  devtool: false,
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    children: false,
    entrypoints: false,
  }
};
