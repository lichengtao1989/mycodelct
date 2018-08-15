import {storage} from 'framework/utils/storage'
import {ajax} from 'framework/utils/ajax'
import apiUrl from '../../config/apiUrl'
import Vue from 'vue'

const enums = {
  get menuType(){
    return Vue.globalData.get('root', 'enums').menuType;
  },
  get powerType(){
    return Vue.globalData.get('root', 'enums').powerType;
  }
};

//给菜单数据设置路由路径、父节点
const formatMenuData = (menuData)=> {
  menuData.forEach((item)=> {
    formatMenuItem(item, null);
  })
};

const formatMenuItem = (item, parentItem)=> {
  item.routePath = formatPath((parentItem ? parentItem.routePath : '') + '/' + item.nameSpell);
  if ((item.type == enums.powerType.MENU1 ||
    item.type == enums.powerType.MENU2 ||
    item.type == enums.powerType.MENU3) && item.childList.length > 0) {
    let hasTab =
      item.childList.find((child)=> {
        return child.type == enums.powerType.TAB;
      }) != null; //是否下级有tab
    let hasCard =
      item.childList.find((child)=> {
        return child.type == enums.powerType.CARD;
      }) != null; //是否下级有card
    if (hasTab || hasCard) {
      item.menuType = enums.menuType.FUNCTION;
    } else {
      item.menuType = enums.menuType.NODE;
    }
  } else if ((item.type == enums.powerType.MENU1 ||
    item.type == enums.powerType.MENU2 ||
    item.type == enums.powerType.MENU3) && item.childList.length == 0) {
    item.menuType = enums.menuType.FUNCTION;
  } else if (item.type == enums.powerType.TAB) {
    item.menuType = enums.menuType.FUNCTION;
  } else if (item.type == enums.powerType.CARD) {
    item.menuType = enums.menuType.CARD;
  }

  if (item.childList && item.childList.length > 0) {
    item.childList.forEach((childItem)=> {
      formatMenuItem(childItem, item);
    })
  }
};

//对路径格式化
const formatPath = (path)=> {
  return path.replace(/\(|\)|（|）/g, '').trim();
};

export default {
  /**
   * 获取数据
   * @returns {Promise}
   */
  get(){
    return new Promise((resolve, reject)=> {
      let menuData = storage.get('menuData');
      if (!menuData) {
        let systemId = storage.get('systemId') || '';
        let url = apiUrl.GET_USER_MENU;
        let params = {id: systemId};
        ajax.get(url, params).then((r)=> {
          if (r && r.resultCode == 200 && r.data && r.data.length > 0) {
            formatMenuData(r.data);
            storage.set('menuData', r.data);
            resolve(r.data);
          } else {
            reject(new Error(r.msg || '获取菜单数据异常'));
          }
        }).catch((error)=> {
          reject(error);
        });
      } else {
        resolve(menuData);
      }
    });
  },
  /**
   * 清除本地缓存
   */
  clear(){
    storage.remove('menuData');
  }
}
