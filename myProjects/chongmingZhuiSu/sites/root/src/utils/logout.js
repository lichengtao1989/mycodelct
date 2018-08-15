import cookie from 'framework/utils/cookie'
import appConfig from './dataManage/appConfig'
import userConfig from './dataManage/userConfig'
import currentUser from './dataManage/currentUser'
import menu from './dataManage/menu'
import power from './dataManage/power'
import systemList from './dataManage/systemList'
import {storage} from 'framework/utils/storage'
import Vue from 'vue'

const clearHandlers = [];
const logoutHandlers = [];

/**
 * 站点清理，做清理缓存类的工作
 */
export function clear() {
  appConfig.clear();
  userConfig.clear();
  currentUser.clear();
  menu.clear();
  power.clear();
  systemList.clear();

  if (clearHandlers.length > 0) {
    clearHandlers.forEach(handler => {
      handler();
    })
  }
}

/**
 * 添加登出处理程序
 * @param handler
 */
export function addLogoutHandler(handler) {
  logoutHandlers.push(handler);
}

/**
 * 移除登出处理程序
 * @param handler
 */
export function removeLogoutHandler(handler) {
  var index = logoutHandlers.indexOf(handler);
  if (index > -1) {
    logoutHandlers.splice(index, 1);
  }
}

/**
 * 添加站点清理处理程序
 * @param handler
 */
export function addClearHandler(handler) {
  clearHandlers.push(handler);
}

/**
 * 移除站点清理处理程序
 * @param handler
 */
export function removeClearHandler(handler) {
  var index = clearHandlers.indexOf(handler);
  if (index > -1) {
    clearHandlers.splice(index, 1);
  }
}

/**
 * 退出登录
 */
export default function () {
  clear();
  cookie.remove('access_token');

  if (logoutHandlers.length > 0) {
    logoutHandlers.forEach(handler => {
      handler();
    })
  }

  let fromUrl = storage.get('fromUrl');
  if (fromUrl) {
    location.href = fromUrl;
  } else {
    location.href = Vue.globalData.get('root', 'appConfig').logoutUrl;
  }
}
