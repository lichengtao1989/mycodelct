import 'babel-polyfill';
import Vue from 'vue';
import getRouter from './router/routerForApp';
import store from './store';
import App from './app.vue';
import appConfig from './config/appConfig';
import userConfig from './utils/dataManage/userConfig';
import currentUser from './utils/dataManage/currentUser';
import menu from './utils/dataManage/menu';
import power from './utils/dataManage/power';
import systemList from './utils/dataManage/systemList';
import framework from 'framework';
import logout from './utils/logout';
import apiUrl from './config/apiUrl';
import site from './site';
import enums from './enums';
import routerUtil from 'framework/utils/router';
import { storage } from 'framework/utils/storage';
import './utils/oldVersionFix';
import './assets/css/theme.less';
import './assets/css/oldVersionFix.less';

//框架初始化
framework.addHandler('ajaxError', error => {
  if (error.response && error.response.status === 401) {
    // 未登录状态，跳转到登录页面
    logout();
  } else {
    console.error('接口异常', error.request || error);
    return Promise.reject(error);
  }
});
framework.initCrossMessage();

//根站点初始化
Vue.globalData.set('root', 'apiUrl', apiUrl);
Vue.globalData.set('root', 'enums', enums);

//子站点初始化
site.init().then(() => {
  Vue.globalData.set('root', 'appConfig', appConfig);

  Promise.all([currentUser.get(), userConfig.get(), power.get(), menu.get(), systemList.get()])
    .then(data => {
      Vue.globalData.set('currentUser', data[0]);
      Vue.globalData.set('userConfig', data[1]);
      Vue.globalData.set('powerCodes', data[2]);
      Vue.globalData.set('systemList', data[4]);
      store.commit('userConfig_set', data[1]);

      //如果有系统列表，并且当前没指定系统，则默认使用系统列表的第一个为当前系统
      let systemId = storage.get('systemId');
      if (data[4] && data[4].length > 0 && !systemId) {
        storage.set('systemId', data[4][0].id);
      }

      const menuData = data[3] || [];
      const router = getRouter(Vue.globalData.get('routerMap'), menuData);
      store.commit('menu_init', { router, menuData });
      routerUtil.init(formatMenuData(menuData), router);

      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app');

      // 隐藏loading
      document.querySelector('.cjm-index-loading').style.display = 'none';
    })
    .catch(error => {
      alert(error.message);
    });
});

//格式化菜单数据，成为{'code':'path'}的格式
function formatMenuData(menuData) {
  let result = {};
  menuData.forEach(item => {
    Object.assign(result, getFormatedMenuItem(item));
  });
  return result;
}
function getFormatedMenuItem(menuItem) {
  let result = {};
  if (menuItem.code) {
    result[menuItem.code] = menuItem.routePath;
  }
  if (menuItem.childList && menuItem.childList) {
    menuItem.childList.forEach(childItem => {
      Object.assign(result, getFormatedMenuItem(childItem));
    });
  }
  return result;
}
