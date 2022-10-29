'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      vue: "@vue/runtime-dom"
    },
  },
  entry: './examples/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    filename: 'js/[name].[chunkhash].js'
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
          isProduction ? MiniCssExtractPlugin.loader :
            {
              loader: 'style-loader',
            },
          {
            loader: 'css-loader',
            options: {}
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[contenthash].[ext]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[contenthash].[ext]',
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './examples/index.html',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        removeAttributeQuotes: isProduction,
        minifyJS: isProduction,
        minifyCSS: isProduction,
        minifyURLs: isProduction,
      }
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 9002,
    open: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      },
    },
    static: path.resolve(process.cwd(), 'docs'),
  },
  devtool: isProduction ? false : 'eval-cheap-source-map',
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    children: false,
    entrypoints: false,
  }
};

if (isProduction) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/demo-[chunkhash].css',
    }),
  );
  module.exports.optimization.minimizer.push(
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        output: {
          comments: false,
        },
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }),
  );
}
