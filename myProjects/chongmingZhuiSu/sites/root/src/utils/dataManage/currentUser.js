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
      let userInfo = storage.get('userInfo');
      if(!userInfo){
        ajax.get(apiUrl.GET_USER_INFO).then((r)=> {
          if (r && r.resultCode == 200) {
            storage.set('userInfo', r.data);
            resolve(r.data);
          } else {
            reject(new Error('获取用户信息异常'));
          }
        }).catch((error)=> {
          reject(error);
        })
      } else {
        resolve(userInfo);
      }
    });
  },
  clear(){
    storage.remove('userInfo');
  }
}
