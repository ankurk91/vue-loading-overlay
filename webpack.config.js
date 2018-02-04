'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'vue-loading.min.css',
  disable: false
});

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.json', '.vue']
  },
  entry: ['./src/index.js'],
  // Don't include theme into library build
  externals: [
    'vue',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),// where to store build files
    filename: 'vue-loading.min.js', // build file name
    library: 'VueLoading',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'sass-loader',
              options: {importLoaders: 1}
            },
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
    ]
  },
  plugins: [
    extractSass,
    new CleanWebpackPlugin(['./dist']),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: false,
  performance: {
    hints: false,
  }
};
