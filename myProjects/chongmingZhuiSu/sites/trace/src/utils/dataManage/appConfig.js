import {storage} from 'framework/utils/storage'
import {ajax} from 'framework/utils/ajax'

export default {
  /**
   * 获取数据
   * @returns {Promise}
   */
  get(){
    return new Promise((resolve)=> {
      let config = storage.get('trace-appConfig');
      if (!config) {
        ajax.get('static/config/trace-appConfig.json').then((r)=> {
          storage.set('trace-appConfig', r);
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
    storage.remove('trace-appConfig');
  }
}
