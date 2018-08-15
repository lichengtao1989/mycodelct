import Vue from 'vue'
import VueRouter from 'vue-router'
import CjmIframePage from '../views/common/iframePage'
import CjmTabPageContainer from '../views/common/tabPageContainer'
import routerSetting from './routerSetting'
Vue.use(VueRouter);

let routerMap;
const enums = {
  get powerType(){
    return Vue.globalData.get('root', 'enums').powerType;
  }
};

//根据权限码获取对应的组件
function getComponent(code) {
  let key = Object.keys(routerMap).find(item=> {
    return item.toLowerCase() === code.toLowerCase();
  });
  if(key){
    return routerMap[key];
  }
  return null;
}

//获取单个路由对象
function getRouterDataItem(menuItem, parentRouterItem) {
  let routerItem = null;
  if ((menuItem.type == enums.powerType.MENU1 ||
    menuItem.type == enums.powerType.MENU2 ||
    menuItem.type == enums.powerType.MENU3) && menuItem.childList.length === 0) { //一二三级菜单，且没子级
    routerItem = {
      path: menuItem.routePath,
      children: [{
        path: '',
        components: {
          default: menuItem.loadingMode == 2 ? getComponent(menuItem.code) : CjmIframePage
        },
        meta: {
          url: menuItem.path,
          name: menuItem.name,
          code: menuItem.code
        }
      }],
      components: {
        default: CjmTabPageContainer
      },
      meta: {
        url: menuItem.path,
        name: menuItem.name,
        tabs: [],
        code: menuItem.code
      }
    };
    return routerItem;
  } else if (menuItem.type == enums.powerType.MENU1 || menuItem.type == enums.powerType.MENU2 || menuItem.type == enums.powerType.MENU3) { // 一二三级菜单、且有Tab或卡片子级
    let hasTab =
      menuItem.childList.find((child)=> {
        return child.type == enums.powerType.TAB;
      }) != null; //是否下级有tab
    let hasCard =
      menuItem.childList.find((child)=> {
        return child.type == enums.powerType.CARD;
      }) != null; //是否下级有card
    if (hasCard || hasTab) {
      routerItem = {
        path: menuItem.routePath,
        children: [],
        components: {
          default: CjmTabPageContainer
        },
        meta: {
          url: menuItem.path,
          name: menuItem.name,
          tabs: [],
          code: menuItem.code
        }
      };
      //如果只有卡片,去掉默认的视图
      if (!hasTab) {
        routerItem.components = {};
      }
    }
    return routerItem;
  } else if (menuItem.type == enums.powerType.TAB) { // Tab页给父级设置路由
    routerItem = {
      path: menuItem.routePath,
      components: {
        default: menuItem.loadingMode == 2 ? getComponent(menuItem.code) : CjmIframePage
      },
      meta: {
        url: menuItem.path,
        name: menuItem.name,
        type: 'tab',
        code: menuItem.code
      }
    };
    if (parentRouterItem) {
      parentRouterItem.children.push(routerItem);
      parentRouterItem.meta.tabs.push({
        name: menuItem.name,
        path: menuItem.routePath
      });
    }
  } else if (menuItem.type == enums.powerType.CARD) { // Card页给父级设置路由
    if (parentRouterItem) {
      parentRouterItem.components.cardView = menuItem.loadingMode == 2 ? getComponent(menuItem.code) : CjmIframePage;
      parentRouterItem.meta.cardUrl = menuItem.path;
      parentRouterItem.meta.cardCode = menuItem.code;
    }
  } else {
    return null;
  }
}

//获取路由对象
function getRouterData(menuItems, parentRouterItem = null) {
  let router = [];
  let routerItem = null;
  for (const menuItem of menuItems) {
    routerItem = getRouterDataItem(menuItem, parentRouterItem);
    if (routerItem) {
      router.push(routerItem);
    }
    if (menuItem.childList && menuItem.childList.length > 0) {
      router = router.concat(getRouterData(menuItem.childList, routerItem));
    }
  }

  return router;
}

export default function (rm, menuData) {
  routerMap = rm;
  const routerData = getRouterData(menuData);
  // 首页
  let indexUrl = Vue.globalData.get('root', 'appConfig').indexUrl;
  if (Vue.globalData.get('currentUser').isAdmin == 1) {
    indexUrl = Vue.globalData.get('root', 'appConfig').adminIndexUrl;
  }
  routerData.push({
    path: '',
    components: {
      cardView: (reslove) => {
        require.ensure([], () => {
          reslove(require('../views/index/index.vue'))
        }, '/modules/base/index')
      }
      // cardView: CjmIframePage
    },
    meta: {
      cardUrl: indexUrl,
      url: indexUrl,
      name: '首页'
    }
  });

  const router = new VueRouter({
    mode: 'hash',
    routes: routerData
  });

  routerSetting(router);
  return router;
}
