import routerMap from './config/routerMap'
import apiUrl from './config/apiUrl'
import enums from './enums'
import Vue from 'vue'
import appConfig from './config/appConfig'

export default {
  init(){
    return new Promise((resolve)=> {
      Vue.globalData.append('routerMap', routerMap);
      Vue.globalData.set('marketing', 'enums', enums);
      Vue.globalData.set('marketing', 'apiUrl', apiUrl);
      Vue.globalData.set('marketing', 'appConfig', appConfig);
      resolve();
    });
  }
}
