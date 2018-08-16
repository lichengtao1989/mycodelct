import BaseModel from '../base.js';
class UserModel extends BaseModel {
  //判断是否已登录
  async isLogin() {}

  //登录
  async login(data) {
    let { err, res } = await this.$ajax.post(this.$apiUrl.USER.LOGIN, data);
    if (res.resultCode == 200) {
      this.$storage.set('userInfo', res.data)
    }
    return { err, res };
  }

  //修改密码
  async resetPassword(data) {
    let { err, res } = await this.$ajax.post(this.$apiUrl.USER.RETRIEVE_PASSWORD, data);
    return { err, res };
  }

  //退出
  async logout() {
    let { err, res } = await this.$ajax.post(this.$apiUrl.USER.LOGOUT);
    return { err, res };
  }

  //注册
  async save(data, status) {
    let url = this.$apiUrl.USER.REGISTER;
    if (status == 2) {
      url = this.$apiUrl.USER.REGISTER;
    }
    let { err, res } = await this.$ajax.post(url, data);
    return { err, res };
  }
  //获取logo设置
  async getOrgExt() {
    let { err, res } = await this.$ajax.post(this.$apiUrl.ORG.GET_LOGO_EXT);
    if (res.resultCode == 200) {
      this.$storage.set('configInfo', res.data)
    }
    return { err, res };
  }
}
export default UserModel;
