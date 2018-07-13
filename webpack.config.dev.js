'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  mode: 'development',
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.jsx', '.json', '.vue'],
  },
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    filename: 'js/[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              minimize: false
            }
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[hash].[ext]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[hash].[ext]',
        }
      }

    ]
  },
  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './examples/index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        minifyJS: false,
        minifyCSS: false,
        minifyURLs: false,
      }
    }),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
    }),
    new VueLoaderPlugin(),
  ],
  // webpack-serve related configs
  serve: {
    host: 'localhost',
    port: 9000,
    open: true,
    hot: true,
    logTime: true,
    logLevel: 'info',
    clipboard: false
  },
  devtool: '#cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
  }
};

