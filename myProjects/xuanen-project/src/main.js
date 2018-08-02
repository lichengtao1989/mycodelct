// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import "babel-polyfill";
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import router from './router'
import store from "./store"
import VueAwesomeSwiper from "vue-awesome-swiper"
import vPage from "v-page";
import uploader from "vue-simple-uploader";
import "static/style/swiper.css";
import "static/font/iconfont.css";
Vue.use(require("vue-wechat-title"));
Vue.use(vPage);
Vue.use(uploader);
Vue.use(VueAwesomeSwiper);
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */);
Vue.use(require("vue-wechat-title"));
Vue.config.productionTip = false

/* eslint-disable no-new */
// console.log(VueAwesomeSwiper);
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
