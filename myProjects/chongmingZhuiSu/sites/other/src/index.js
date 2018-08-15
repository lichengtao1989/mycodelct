import apiUrl from './config/apiUrl';
import enums from './enums';
import routerMap from './config/routerMap';
import appConfig from './config/appConfig';
import Vue from 'vue';

export default {
  //初始化
  init() {
    Vue.globalData.set('other', 'apiUrl', apiUrl);
    Vue.globalData.set('other', 'enums', enums);
    Vue.globalData.append('routerMap', routerMap);
    Vue.globalData.set('other', 'appConfig', appConfig);
    return Promise.resolve();
  }
};
