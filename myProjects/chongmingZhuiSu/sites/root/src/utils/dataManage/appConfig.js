import {storage} from 'framework/utils/storage'
import {ajax} from 'framework/utils/ajax'
import apiUrl from '../../config/apiUrl'

export default {
  /**
   * 获取数据
   * @returns {Promise}
   */
  get(){
    return new Promise((resolve)=> {
      let config = storage.get('root-appConfig');
      if (!config) {
        ajax.get(apiUrl.GET_APP_CONFIG).then((r)=> {
          storage.set('root-appConfig', r);
          resolve(r);
        })
      } else {
        resolve(config);
      }
    });
  },
  /**
   * 清除系统配置的本地缓存
   */
  clear(){
    storage.remove('root-appConfig');
  }
}
