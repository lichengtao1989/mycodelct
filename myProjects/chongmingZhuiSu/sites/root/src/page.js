import 'babel-polyfill';
import Vue from 'vue';
import getRouter from './router/routerForPage';
import store from './store';
import Page from './page.vue';
import appConfig from './config/appConfig';
import userConfig from './utils/dataManage/userConfig';
import currentUser from './utils/dataManage/currentUser';
import power from './utils/dataManage/power';
import framework from 'framework';
import logout from './utils/logout';
import apiUrl from './config/apiUrl';
import site from './site';
import enums from './enums';
import './assets/css/theme.less';

//框架初始化
framework.addHandler('ajaxError', error => {
  if (error.response && error.response.status === 401) {
    // 未登录状态，跳转到登录页面
    logout();
    return Promise.reject(new Error('登录信息丢失，请重新登录'));
  } else {
    console.error('接口异常', error.request || error);
    return Promise.reject(error);
  }
});

//根站点初始化
Vue.globalData.set('root', 'apiUrl', apiUrl);
Vue.globalData.set('root', 'enums', enums);

//子站点初始化
site.init().then(() => {
  Vue.globalData.set('root', 'appConfig', appConfig);

  Promise.all([currentUser.get(), userConfig.get(), power.get()])
    .then(data => {
      Vue.globalData.set('currentUser', data[0]);
      Vue.globalData.set('userConfig', data[1]);
      Vue.globalData.set('powerCodes', data[2]);

      store.commit('userConfig_set', data[1]);
      const router = getRouter(
        Vue.globalData.get('routerMap'),
        Vue.globalData.get('pageRouterData')
      );
      new Vue({
        router,
        store,
        render: h => h(Page)
      }).$mount('#app');

      // 隐藏loading
      document.querySelector('.cjm-index-loading').style.display = 'none';
    })
    .catch(error => {
      alert(error);
    });
});
