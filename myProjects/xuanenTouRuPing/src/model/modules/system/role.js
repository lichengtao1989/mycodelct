import BaseModel from '../base.js';
class RoleModel extends BaseModel {
  //加载角色信息,如果失败返回null
  async loadData(roleID) {
    const { err, res } = await this.$ajax.get(this.$apiUrl.ROLE.GET_ROLE_BY_ID, { ID: roleID });
    if (err) {
      this.$message.showError(err);
      return null;
    } else {
      return res.data;
    }
  }

  //根据不同的角色登录，加载角色信息
  async loadData2(powerType) {
    const param = { powerType };
    const { err, res } = await this.$ajax.get(this.$apiUrl.ROLE.GET_MENU_BY_ID, param);
    if (err) {
      this.$message.showError(err);
      return [];
    } else {
      return res.data;
    }
  }

  //添加角色 成功返回true 失败返回false
  async insert(roleName, roleType, powerList) {
    const { err } = await this.$ajax.post(this.$apiUrl.ROLE.SAVE, { roleName, roleType, powerList });
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //更新角色 成功返回true 失败返回false
  async update(roleID, roleName, roleType, powerList) {
    const { err } = await this.$ajax.post(this.$apiUrl.ROLE.SAVE, { roleID, roleName, roleType, powerList });
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }
}
export default RoleModel;
