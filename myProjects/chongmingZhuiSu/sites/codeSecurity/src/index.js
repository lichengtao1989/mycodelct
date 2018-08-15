import routerMap from './config/routerMap';
import apiUrl from './config/apiUrl';
import enums from './enums';
import appConfig from './config/appConfig';
import Vue from 'vue';

export default {
  init() {
    Vue.globalData.append('routerMap', routerMap);
    Vue.globalData.set('codeSecurity', 'enums', enums);
    Vue.globalData.set('codeSecurity', 'apiUrl', apiUrl);
    Vue.globalData.set('codeSecurity', 'appConfig', appConfig);
    return Promise.resolve();
  }
};
