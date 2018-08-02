import Vue from 'vue'
import Router from 'vue-router'
import loginReg from './modules/login-reg';
import main from './modules/main';
Vue.use(Router);
export default new Router({
  routes: [
    {path: '/', redirect: '/login'}, //默认访问登录页
    ...loginReg, //登录注册相关路由
    ...main //登录后的主页面路由
  ]
});
