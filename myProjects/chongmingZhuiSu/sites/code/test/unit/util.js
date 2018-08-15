import Vue from 'vue'
import enums from '../../src/enums'
import apiUrl from '../../src/config/apiUrl'
import 'framework'

/**
 * 初始化
 */
const init = () => {
  //当前用户信息
  Vue.globalData.set('currentUser', {
    userID: 'test',
    loginName: 'test',
    userName: '测试',
    corpID: '10000',
    corpName: '单元测试企业',
    corpType: '3',
    orgID: 'testOrgID',
    orgName: 'test Org',
    orgType: '1',
    isAdmin: 0
  });
  Vue.globalData.set('code', 'enums', enums);
  Vue.globalData.set('code', 'apiUrl', apiUrl);
};

/**
 * 创建Vue组件
 * @param component
 * @param propsData
 * @returns {Vue}
 */
const createComponent = (component, propsData = {}) => {
  const Constructor = Vue.extend(component);
  return new Constructor({
    propsData
  }).$mount();
};

/*
 * 用JSON.stringify JSON.parse深度复制对象 只能复制属性 不能复制方法
 * */
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}
export default {
  createComponent,
  init,
  deepClone
}
