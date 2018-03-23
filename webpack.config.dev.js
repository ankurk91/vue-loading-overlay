'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'examples'),
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.jsx', '.json', '.vue'],
  },
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),// where to store build files
    publicPath: '',// to be used in index.html
    filename: "js/[name].[hash].js" // build file name
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader?name=[name].[hash].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader?name=[name].[ext]?[hash]',
      }

    ]
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
    // https://webpack.js.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    // Required for mhr
    new webpack.HotModuleReplacementPlugin()
  ],
  // Dev server related configs
  devServer: {
    contentBase: path.resolve(__dirname, 'examples'),
    port: 9000,
    host: 'localhost',
    open: true,
    inline: true,
    hot: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only'
  },
  devtool: '#cheap-module-eval-source-map',
};

