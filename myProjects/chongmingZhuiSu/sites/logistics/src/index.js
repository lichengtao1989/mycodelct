import apiUrl from './config/apiUrl';
import routerMap from './config/routerMap';
import enums from './enums';
import Vue from 'vue';

export default {
  init(){
    return new Promise((resolve)=> {
      Vue.globalData.set('logistics', 'apiUrl', apiUrl);
      Vue.globalData.set('logistics', 'enums', enums);
      Vue.globalData.append('routerMap', routerMap);
      resolve();
    });
  }
}
