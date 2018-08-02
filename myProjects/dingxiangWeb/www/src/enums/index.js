import common from './modules/common';
const enums = [...common];
function getEnum(enumName) {
  return enums.find(item => item.name === enumName);
}
export default {
  install(Vue){
    Vue.prototype.$enum = getEnum;
  }
}
