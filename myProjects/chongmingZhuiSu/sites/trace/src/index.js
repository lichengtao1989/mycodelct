import apiUrl from './config/apiUrl';
import enums from './enums';
import routerMap from './config/routerMap';
import pageRouterData from './config/pageRouterData';
import appConfig from './config/appConfig';
import Vue from 'vue';

export default {
  //初始化
  init() {
    Vue.globalData.set('trace', 'apiUrl', apiUrl);
    Vue.globalData.set('trace', 'enums', enums);
    Vue.globalData.append('routerMap', routerMap);
    Vue.globalData.append('pageRouterData', pageRouterData);
    Vue.globalData.set('trace', 'appConfig', appConfig);
    return Promise.resolve();
  }
};
