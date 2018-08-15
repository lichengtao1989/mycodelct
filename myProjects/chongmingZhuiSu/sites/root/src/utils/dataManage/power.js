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
      let powerData = storage.get('powerData');
      if (!powerData) {
        ajax.get(apiUrl.GET_USER_POWER).then((r)=> {
          if (r && r.resultCode == 200) {
            let data = r.data && r.data.length > 0 ? r.data.map(powerCode => {
              return powerCode.toLowerCase();
            }) : [];
            storage.set('powerData', data);
            resolve(data);
          } else {
            reject(new Error('获取权限数据异常'));
          }
        }).catch((error)=> {
          reject(error);
        });
      } else {
        resolve(powerData);
      }
    });
  },
  /**
   * 清除本地缓存
   */
  clear(){
    storage.remove('powerData');
  }
}
