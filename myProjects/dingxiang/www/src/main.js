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
// import '../static/UE/ueditor.config.js'
// import '../static/UE/ueditor.all.min.js'
// import '../static/UE/lang/zh-cn/zh-cn.js'
// import '../static/UE/ueditor.parse.min.js'
import VueResource from 'vue-resource';
// import uploader from 'vue-simple-uploader';

Vue.use(VueResource)
Vue.use(framework, setting);
Vue.use(enums);
Vue.use(directives);
Vue.use(apiUrl);
// Vue.use(uploader);
//
Vue.ajax.addHandler(res => {
  if (res && res.data && res.data.ResultCode == 401) {
    Vue.eventBus.$emit('logout');
    this.$router.push('/login');
  }
});
//
Vue.use(model);
//

const {
  globalData
} = Vue;
globalData.set('enums', enums);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
