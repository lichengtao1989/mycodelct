import common from './modules/common';
import role from './modules/role';
const enums = [...common, ...role];
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
