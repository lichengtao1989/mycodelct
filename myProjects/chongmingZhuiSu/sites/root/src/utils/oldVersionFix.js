/**
 * 此JS为了使Vue版本能兼容上一版本的部分功能
 */
import {Message} from 'element-ui'
import store from '../store'
import {clear} from './logout'

window.cjmFix = window.cjmFix || {};

//消息提示
window.cjmFix.message = function (text) {
  if (text && typeof text === 'string') {
    Message.info(text);
  }
};

//设置logo
window.cjmFix.setLogo = function (type, value) {
  store.commit('userConfig_setLogo', {
    type,
    value
  });
};

//打开菜单
window.cjmFix.openMenu = function (menuName) {
  const result = [];
  const searchMenu = function (items) {
    for (let item of items) {
      if (item.name === menuName) {
        result.push(item);
      }
      if (item.childList && item.childList.length > 0) {
        searchMenu(item.childList);
      }
    }
  };
  const getParent = function (matchItem, searchItemParent, searchItems) {
    if (searchItems != null && searchItems.length > 0) {
      let result;
      for (let i = 0, len = searchItems.length; i < len; i++) {
        if (searchItems[i] === matchItem) {
          result = searchItemParent;
          break;
        } else {
          result = getParent(matchItem, searchItems[i], searchItems[i].childList);
          if (result) {
            break;
          }
        }
      }
      return result;
    } else {
      return null;
    }
  };
  //首先搜索同2级的3级菜单
  const activeMenu2 = store.state.menu.activeMenu2;
  if (activeMenu2 && activeMenu2.childList.length > 0) {
    searchMenu(activeMenu2.childList);
  }
  //如果没有，搜索同1级的菜单
  if (result.length === 0) {
    const activeMenu1 = store.state.menu.activeMenu1;
    if (activeMenu1 && activeMenu1.childList.length > 0) {
      searchMenu(activeMenu1.childList);
    }
  }
  //如果没有，搜索所有菜单
  if (result.length === 0) {
    searchMenu(store.state.menu.menuData);
  }

  if (result.length > 0) {
    let menus = [];
    let parent = result[0];
    while (parent) {
      menus.unshift(parent);
      parent = getParent(parent, null, store.state.menu.menuData);
    }
    store.commit('menu_setActiveMenu1', {menu: menus[0]});
    if (menus.length > 1) {
      store.commit('menu_setActiveMenu2', {menu: menus[1]});
    }
    if (menus.length > 2) {
      store.commit('menu_setActiveMenu3', {menu: menus[2]});
    }
  }
};

//清除登录缓存
window.cjmFix.clearLoginCache = function () {
  clear();
};
