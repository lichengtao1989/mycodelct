import Vue from 'vue'
import VueRouter from 'vue-router'
import enums from '../../src/enums'
import apiUrl from '../../src/config/apiUrl'
import appConfig from '../../static/config/root-appConfig.json'
import 'framework'

/**
 * 初始化
 */
const init = ()=>{
  Vue.use(VueRouter);
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
  Vue.globalData.set('root', 'enums', enums);
  Vue.globalData.set('root', 'appConfig', appConfig);
  Vue.globalData.set('root', 'apiUrl', apiUrl);
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
