import common from './modules/common';
import agriculturalStore from './modules/agriculturalStore';
import purchase from './modules/purchase';
const enums = [...common, ...agriculturalStore, ...purchase];
/**
 * const ynEnum = this.$enum('是否');
 * */
function getEnum(enumName) {
  return enums.find(item => item.name === enumName);
}
export default {
  install(Vue){
    Vue.prototype.$enum = getEnum;
  }
}
