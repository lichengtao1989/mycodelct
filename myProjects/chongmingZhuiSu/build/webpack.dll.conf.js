var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');

function resolve (dir){
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'axios',
      'vue/dist/vue.common.js',
      'vue-router',
      'vuex',
      'store/src/store-engine',
      'store/storages/localStorage',
      'store/plugins/defaults',
      'store/plugins/expire',
      'element-ui/lib/alert',
      'element-ui/lib/autocomplete',
      'element-ui/lib/button',
      'element-ui/lib/button-group',
      'element-ui/lib/cascader',
      'element-ui/lib/checkbox',
      'element-ui/lib/checkbox-button',
      'element-ui/lib/checkbox-group',
      'element-ui/lib/date-picker',
      'element-ui/lib/dropdown',
      'element-ui/lib/dropdown-item',
      'element-ui/lib/dropdown-menu',
      'element-ui/lib/form',
      'element-ui/lib/form-item',
      'element-ui/lib/icon',
      'element-ui/lib/input',
      'element-ui/lib/loading',
      'element-ui/lib/message',
      'element-ui/lib/message-box',
      'element-ui/lib/option',
      'element-ui/lib/option-group',
      'element-ui/lib/pagination',
      'element-ui/lib/popover',
      'element-ui/lib/progress',
      'element-ui/lib/radio',
      'element-ui/lib/radio-button',
      'element-ui/lib/radio-group',
      'element-ui/lib/scrollbar',
      'element-ui/lib/select',
      'element-ui/lib/step',
      'element-ui/lib/steps',
      'element-ui/lib/switch',
      'element-ui/lib/table',
      'element-ui/lib/table-column',
      'element-ui/lib/tabs',
      'element-ui/lib/tab-pane',
      'element-ui/lib/time-picker',
      'element-ui/lib/time-select',
      'element-ui/lib/tooltip',
      'element-ui/lib/upload',
      'echarts/lib/echarts',
      'echarts/lib/chart/pie',
      'echarts/lib/chart/bar',
      'echarts/lib/chart/line',
      'echarts/lib/chart/map',
      'echarts/lib/component/grid',
      'echarts/lib/component/tooltip',
      'echarts/lib/component/legend',
      'echarts/lib/component/visualMap'
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'node_modules': resolve('node_modules')
    }
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]_library'
  },
  module: {
    rules: [
      ...utils.styleLoaders({sourceMap: false})
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll/[name].manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
