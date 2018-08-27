import COMMON from './modules/common/index'; //通用

//
const apiUrl = {
  COMMON
};
export default {
  install(Vue) {
    Vue.prototype.$apiUrl = apiUrl;
    Vue.apiUrl = apiUrl;
  }
};
