// import { EHOSTUNREACH } from "constants";

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./config');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
// const devMode
module.exports = (env, argv) => {
  // console.log(argv);
  const devMode = argv.mode !== 'production';
  return {
    entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            // devMode?'style-loader':MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ]
          // use:{
          //   minimize:EHOSTUNREACH
          // }
        },
        {
          test: /\.scss$/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ]
    },
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }]
      },
      // hot: true,
      inline: true,
      contentBase: false, // since we use CopyWebpackPlugin.
      compress: true,
      host: HOST || config.dev.host,
      port: PORT || config.dev.port,
      open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true, // necessary for FriendlyErrorsPlugin
      open: true,
      watchOptions: {
        poll: config.dev.poll
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebPackPlugin({
        // template: './src/index.html',
        template: './index.html',
        filename: './index.html'
      }),
      new CleanWebpackPlugin(['dist'])
    ]
  };
};
