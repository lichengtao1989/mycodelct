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
      let systemList = storage.get('systemList');
      if (!systemList) {
        ajax.get(apiUrl.GET_USER_SYSTEM_LIST).then((r)=> {
          if (r && r.resultCode == 200) {
            storage.set('systemList', r.data);
            resolve(r.data);
          } else {
            reject(new Error('获取子系统信息异常'));
          }
        }).catch((error)=> {
          reject(error);
        })
      } else {
        resolve(systemList);
      }
    });
  },
  clear(){
    storage.remove('systemList');
  }
}
