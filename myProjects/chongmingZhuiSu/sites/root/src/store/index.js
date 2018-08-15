/*eslint camelcase:0*/
import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import userConfig from './modules/userConfig'
Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';
const state = {};
const mutations = {};
const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    menu,
    userConfig
  },
  //之前是在开发环境开始严格模式，但发现性能损耗太严重了，因此关闭
  strict: false
})
