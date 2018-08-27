import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Toasted from 'vue-toasted'
import apiUrl from './data/apiUrl';
import jsonp from './common/jsonp';
Vue.use(jsonp);
Vue.use(require('vue-wechat-title'));
Vue.use(VueAwesomeSwiper);
Vue.use(apiUrl);
Vue.use(Toasted, {
  duration: 1000,
});
import './assets/style/swiper.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
