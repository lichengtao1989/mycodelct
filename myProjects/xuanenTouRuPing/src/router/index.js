import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/demo/index.vue';
import loginRegRouterMap from './modules/login-reg';
import mainRouterMap from './modules/main';
import indexRouterMap from './modules/index';
import systemRouterMap from './modules/system';
import dataManagementRouterMap from './modules/data-management';
import warehouseManagementMap from './modules/warehouse';
import restrictedPesticideMap from './modules/restricted-pesticide';
import purchasePurchaseMap from './modules/purchase-purchase';
import salesReceiptMap from './modules/sales-receipt';
import dataAnalysisMap from './modules/data-analysis';
import newManagementRouterMap from './modules/new-management';
import routerFormatter from './routerFormatter';
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/demo', component: Demo },
    {
      path: '/main',
      component: mainRouterMap.main,
      children: [
        { path: '/', redirect: 'index' },
        { path: 'stayTuned', component: mainRouterMap.stayTuned },
        ...routerFormatter(indexRouterMap), //首页
        ...routerFormatter(dataManagementRouterMap), //
        ...routerFormatter(warehouseManagementMap), //库存
        ...routerFormatter(purchasePurchaseMap), //进货管理
        ...routerFormatter(salesReceiptMap), //销售管理
        ...routerFormatter(restrictedPesticideMap), //禁限农药
        ...routerFormatter(systemRouterMap), //系统管理
        ...routerFormatter(dataAnalysisMap), //数据分析
        ...routerFormatter(newManagementRouterMap), //农技资讯
        { path: '*', component: mainRouterMap.stayTuned } //没有匹配到
      ]
    },
    { path: '/login', component: loginRegRouterMap.login },
    { path: '/register', component: loginRegRouterMap.register },
    { path: '/details', component: newManagementRouterMap.details }
  ]
});
