import apiUrl from './config/apiUrl'
import enums from './enums'
import routerMap from './config/routerMap'
import pageRouterData from './config/pageRouterData'
import Vue from 'vue'

export default {
  init(){
    Vue.globalData.set('code', 'apiUrl', apiUrl);
    Vue.globalData.set('code', 'enums', enums);
    Vue.globalData.append('routerMap', routerMap);
    Vue.globalData.append('pageRouterData', pageRouterData);
  }
}
