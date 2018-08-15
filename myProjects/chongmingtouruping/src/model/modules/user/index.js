import BaseModel from '../base.js';
class UserModel extends BaseModel {
  //判断是否已登录
  async isLogin() {
  }

  //登录
  async login(mobile, password) {
    let {err, res} = await this.$ajax.post(this.$apiUrl.USER.LOGIN, {mobile, password});
    if (err) {
      this.$message.showError(err);
      return false;
    } else {
      this.$storage.set('userInfo', res.data);
    }
    return true;
  }

  //修改密码
  async resetPassword(data) {
    let {err, res} = await this.$ajax.post(this.$apiUrl.USER.RETRIEVE_PASSWORD, data);
    return {err, res};
  }

  //退出
  async logout() {
    let {err} = await this.$ajax.post(this.$apiUrl.USER.LOGOUT);
    if (err) {
      this.$message.showError(err);
      return false;
    }
    const loginData = this.$storage.get('loginData');
    this.$storage.clear();
    loginData && this.$storage.set('loginData', loginData);
    return true;
  }

  //注册
  async save(data, status) {
    let url = this.$apiUrl.USER.REGISTER;
    if (status == 2) {
      url = this.$apiUrl.USER.REGISTER;
    }
    let {err, res} = await this.$ajax.post(url, data);
    return {err, res};
  }

  //获取当前登陆用户的信息
  async getLoginUserInfo() {
    let {err, res} = await this.$ajax.post(this.$apiUrl.USER.GET_LOGIN_USER_INFO);
    if (err) {
      this.$message.showError(err);
      return null;
    } else {
      return res.data;
    }
  }

  //
  devSetRole(role) {
    if (process.env.NODE_ENV !== 'production') {
      const userInfo = this.$storage.get('userInfo');
      userInfo.role = role;
      this.$storage.set('userInfo', userInfo);
      window.location.reload(true);
    }
  }
}
export default UserModel;
