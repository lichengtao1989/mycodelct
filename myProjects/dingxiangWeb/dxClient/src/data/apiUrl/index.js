//
import DEMO from './modules/demo'; //
import USER from './modules/user';
import SYSIMAGE from './modules/sysimage';
import SLIDE from './modules/slide';
import CORPINFO from './modules/corpinfo';
import SYSLINK from './modules/syslink';
import PRODUCT from './modules/product';
import COMMON from './modules/COMMON';
import NEWS from './modules/news';
import MATERIAL from './modules/material';
//
const apiUrl = {
  MATERIAL,
  NEWS,
  CORPINFO,
  SYSLINK,
  PRODUCT,
  DEMO,
  USER,
  COMMON,
  SYSIMAGE,
  SLIDE
};
export default {
  install(Vue) {
    Vue.prototype.$apiUrl = apiUrl;
    Vue.apiUrl = apiUrl;
  }
};
