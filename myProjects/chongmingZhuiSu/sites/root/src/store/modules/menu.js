/*eslint camelcase:0*/
import Vue from 'vue'
const enums = {
  get menuType() {
    return Vue.globalData.get('root', 'enums').menuType;
  },
  get powerType() {
    return Vue.globalData.get('root', 'enums').powerType;
  }
};

let router = null;

export default{
  state: {
    menuData: null,
    activeMenu1: null,
    activeMenu2: null,
    activeMenu3: null,
    rightMenuVisible: false // 右侧菜单是否显示
  },
  mutations: {
    //初始化
    menu_init(state, option){
      option = option || {};
      router = option.router;
      state.menuData = option.menuData;
    },
    /**
     * @param menu 菜单
     * @param routeChange 是否改变路由
     */
    menu_setActiveMenu1 (state, {menu, routeChange = true}) {
      if (menu && menu.menuType == enums.menuType.FUNCTION && routeChange) {
        if (menu === state.activeMenu1) {
          router.replace({path: '/'});
          Vue.nextTick(()=> {
            router.replace({path: menu.routePath});
          });
        } else {
          router.push({path: menu.routePath});
        }
        state.activeMenu2 = null;
        state.activeMenu3 = null;
        state.rightMenuVisible = false;
      }

      state.activeMenu1 = menu;
    },
    /**
     * @param menu 菜单
     * @param routeChange 是否改变路由
     */
    menu_setActiveMenu2 (state, {menu, routeChange = true}) {
      if (menu && menu.menuType != enums.menuType.FUNCTION) {
        state.rightMenuVisible = true;
      } else {
        state.rightMenuVisible = false;
      }

      if (menu && menu.menuType == enums.menuType.FUNCTION && routeChange) {
        if (menu === state.activeMenu2) {
          router.replace({path: menu.routePath.substr(0, menu.routePath.length - menu.nameSpell.length - 1)});
          Vue.nextTick(()=> {
            router.replace({path: menu.routePath});
          });
        } else {
          router.push({path: menu.routePath});
        }
      }

      state.activeMenu2 = menu;
      state.activeMenu3 = null;
    },
    /**
     * @param menu 菜单
     * @param routeChange 是否改变路由
     */
    menu_setActiveMenu3 (state, {menu, routeChange = true}) {
      if (menu && routeChange) {
        if (menu === state.activeMenu3) { //如果点击当前菜单，则刷新当前页面
          router.replace({path: menu.routePath.substr(0, menu.routePath.length - menu.nameSpell.length - 1)});
          Vue.nextTick(()=> {
            router.replace({path: menu.routePath});
          });
        } else {
          router.push({path: menu.routePath});
        }
      }
      state.activeMenu3 = menu;
    },
    menu_setRightMenuVisible (state, visible) {
      state.rightMenuVisible = visible;
    }
  }
}
