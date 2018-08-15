import Vue from 'vue'
import VueRouter from 'vue-router'
import routerSetting from './routerSetting'
Vue.use(VueRouter);

export default function (routerMap, routerData) {
  const routerItems = [];
  for (let item of routerData) {
    let routerItem = {
      path: item.path,
      components: {
        default: routerMap[item.code]
      },
      meta: {
        name: item.name
      }
    };
    routerItems.push(routerItem);
  }

  const router = new VueRouter({
    mode: 'hash',
    routes: routerItems
  });

  routerSetting(router);
  return router;
}
