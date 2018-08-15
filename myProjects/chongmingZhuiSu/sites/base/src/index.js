import apiUrl from './config/apiUrl';
import enums from './enums';
import routerMap from './config/routerMap';
import pageRouterData from './config/pageRouterData';
import appConfig from './config/appConfig';
import Vue from 'vue';

export default {
  init() {
    Vue.globalData.set('base', 'apiUrl', apiUrl);
    Vue.globalData.set('base', 'enums', enums);
    Vue.globalData.append('routerMap', routerMap);
    Vue.globalData.append('pageRouterData', pageRouterData);
    Vue.globalData.set('base', 'appConfig', appConfig);
    return Promise.resolve();
  }
};
