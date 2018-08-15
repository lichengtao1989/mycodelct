'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

var includes = [resolve('framework/src'), resolve('sites/root/src')];
config.sites.forEach(site => {
  includes.push(resolve(`sites/${site}/src`));
});

var modules = includes.concat();
modules.push(resolve('node_modules'));

var alias = {
  vue$: 'vue/dist/vue.common.js',
  node_modules: resolve('node_modules'),
  framework: resolve('framework/src'),
  root: resolve('sites/root/src')
};
config.sites.forEach(site => {
  alias[site] = resolve(`sites/${site}/src`);
});

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: includes,
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './sites/root/src/app.js',
    page: './sites/root/src/page.js',
    landing: './sites/root/src/landing.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    chunkFilename: 'chunk/[name]-[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: modules,
    alias: alias
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/element-ui/src'), ...includes]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vendor.manifest.json')
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['static/dll/vendor.js'],
      files: ['index.html'],
      append: false,
      hash: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['static/dll/vendor.js'],
      files: ['page.html'],
      append: false,
      hash: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['static/dll/vendor.js'],
      files: ['landing.html'],
      append: false,
      hash: true
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
