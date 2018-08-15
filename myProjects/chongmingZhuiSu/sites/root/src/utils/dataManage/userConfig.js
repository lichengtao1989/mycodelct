import {storage} from 'framework/utils/storage'
import {ajax} from 'framework/utils/ajax'
import apiUrl from '../../config/apiUrl'

export default {
  /**
   * 获取数据
   * @returns {Promise}
   */
  get(){
    return new Promise((resolve, reject)=> {
      let useConfig = storage.get('userConfig');
      if (!useConfig) {
        ajax.get(apiUrl.GET_USER_CONFIG).then((r)=> {
          if (r && r.resultCode == 200) {
            storage.set('userConfig', r.data);
            resolve(r.data);
          } else {
            reject(new Error('获取用户配置异常'));
          }
        }).catch((error)=> {
          reject(error);
        })
      } else {
        resolve(useConfig);
      }
    });
  },
  /**
   * 清除用户配置的本地缓存
   */
  clear(){
    storage.remove('userConfig');
  }
}
