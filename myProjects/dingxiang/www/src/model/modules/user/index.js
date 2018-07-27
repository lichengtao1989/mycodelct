import BaseModel from '../base.js';
class UserModel extends BaseModel {
  //登录
  async login(loginname, password) {
    const {
      err,
      res
    } = this.$ajax.post(this.$apiUrl.USER.LOGIN, {
      loginname,
      password
    });
    console.log(res);
    if (err) {
      this.$message.showError(err);
      return false;
    }

    return true;
  }

  //退出
  async logout() {
    let {
      err,
      res
    } = this.$ajax.get(this.$apiUrl.USER.LOGINOUT);
    console.log(res);
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }
}
export default UserModel;
