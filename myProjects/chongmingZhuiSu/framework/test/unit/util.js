import Vue from 'vue'
import 'framework'

/**
 * 初始化
 */
const init = ()=>{

};

/**
 * 创建Vue组件
 * @param component
 * @param propsData
 * @returns {Vue}
 */
const createComponent = (component, propsData = {})=>{
  const Constructor = Vue.extend(component);
  return new Constructor({
    propsData
  }).$mount();
};

export default {
  createComponent,
  init
}
