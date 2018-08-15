/**
 * 本地存储工具类，已注入到Vue中，可通过Vue.storage或者Vue实例的.$storage调用
 * API文档地址：https://github.com/marcuswestin/store.js/
 * @module utils/storage
 */
const engine = require('node_modules/store/src/store-engine');
const storages = [
  require('node_modules/store/storages/localStorage')
];
const plugins = [
  require('node_modules/store/plugins/defaults'),
  require('node_modules/store/plugins/expire')
];

export const storage = engine.createStore(storages, plugins);

export default {
  install (Vue) {
    Vue.prototype.$storage = storage;
    Vue.storage = storage;
  }
};
