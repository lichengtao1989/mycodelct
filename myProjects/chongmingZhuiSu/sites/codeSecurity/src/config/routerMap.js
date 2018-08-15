/**
 * Created by 67340 on 2017/8/23.
 */
export default {
  //数据下载
  codeData: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeData/list.vue'));
    }, '/modules/codeSecurity/codeData/list');
  }
}
