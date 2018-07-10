import Vue from 'vue';
import App from './App.vue';
import framework from 'framework/index.js';
import model from '@/model';
import enums from './enums/index';
import router from './router';
import directives from './directives';
import apiUrl from './data/apiUrl';
import setting from './data/setting';
import './assets/css/config.less';
import './assets/css/common.less';
import './assets/css/icon.css';
Vue.use(framework, setting);
Vue.use(enums);
Vue.use(directives);
Vue.use(apiUrl);
//
Vue.ajax.addHandler(res => {
  if (res && res.data && res.data.resultCode == 401) {
    Vue.eventBus.$emit('logout');
    this.$router.push('/login');
  }
});
//
Vue.use(model);
//
const {globalData} = Vue;
globalData.set('enums', enums);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
