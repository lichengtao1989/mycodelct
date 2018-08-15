/*eslint camelcase:0*/
import themes from '../../config/theme'
import {storage} from 'framework/utils/storage'
import Vue from 'vue'

//更新本地存储
function storageUpdate(key, value) {
  let config = storage.get('userConfig');
  config = config || {};
  if (config[key] != value) {
    config[key] = value;
    storage.set('userConfig', config);
  }
}

function setTheme(state, themeName) {
  themeName = themeName || 'theme1';
  if (!themes[themeName]) {
    themeName = 'theme1';
  }
  state.theme = themeName;
  storageUpdate('theme', themeName);

  let userConfig = Vue.globalData.get('userConfig');
  userConfig.theme = themeName;
  Vue.globalData.set('userConfig', userConfig);
}

function setLogo(state, logo) {
  logo = logo || {};
  logo.type = (logo.type === undefined || logo.type === '') ? '0' : logo.type;
  logo.value = (logo.value === undefined || logo.value === '') ? Vue.globalData.get('root', 'appConfig').systemLogo : logo.value;
  logo.isDisplay = (logo.isDisplay === undefined || logo.isDisplay === '') ? '1' : logo.isDisplay;
  logo.systemLogoList = logo.systemLogoList === undefined ? [] : logo.systemLogoList;
  state.logo = logo;
  storageUpdate('logo', logo);

  let userConfig = Vue.globalData.get('userConfig');
  userConfig.logo = logo;
  Vue.globalData.set('userConfig', userConfig);
}

export default{
  state: {
    //主题名
    theme: '',
    //系统logo
    logo: {},
    //组织使用的码的最大层级
    layerNumber: 2
  },
  mutations: {
    userConfig_set(state, config){
      config = config || {};
      setTheme(state, config.theme);
      setLogo(state, config.logo);
      state.layerNumber = parseInt(config.layerNumber || 2);
    },
    //设置主题
    userConfig_setTheme (state, themeName) {
      setTheme(state, themeName);
    },
    //设置logo
    userConfig_setLogo(state, logo){
      setLogo(state, logo);
    }
  }
}
