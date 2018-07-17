import BaseModel from '../base.js';
class CommonModel extends BaseModel {
  //发送验证短信
  async sendSms(data) {
    let url = this.$apiUrl.COMMON.SEND_SMS;
    let { err, res } = await this.$ajax.get(url, { mobile: data });
    if (err) {
      return err;
    }
    return res;
  }
}
export default CommonModel;
