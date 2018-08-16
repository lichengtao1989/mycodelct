import BaseModel from '../base.js';
class MenuModel extends BaseModel {
  //-------------------------菜单
  //获取菜单列表
  async getList(powerType) {
    const { err, res } = await this.$ajax.get(this.$apiUrl.MENU.GET_LIST);
    if (err) {
      this.$message.showError(err);
      return [];
    } else if (res) {
      return res.data || [];
    }
  }
  async getPowerList(powerType) {
    const param = { powerType };
    const { err, res } = await this.$ajax.get(this.$apiUrl.MENU.GET_POWER_LIST, param);
    if (err) {
      this.$message.showError(err);
      return [];
    } else if (res) {
      if (res.data == null) {
        return [];
      } else {
        return res.data;
      }
    }
  }

  //globalData menuData 菜单数据同步
  async syncMenuData() {
    const menuData = await this.getList();
    this.$globalData.set('menuData', menuData);
  }

  //获取globalData menuData 如果不存在就调用getList
  async getGlobalMenuData() {
    let menuData = this.$globalData.get('menuData');
    if (!menuData || menuData.length === 0) {
      menuData = await this.getList();
    }
    return menuData;
  }

  //添加菜单
  async addItem(parentID, menuItemData) {
    const { powerName, powerCode, sorting, powerType } = menuItemData;
    const { err } = await this.$ajax.post(this.$apiUrl.MENU.SAVE, { sorting, powerType, powerName, powerCode, parentID });
    //await this.syncMenuData();
    if (err) {
      this.$message.showError(err);
    }
    return { err };
  }

  //删除菜单
  async delItem(id) {
    const { err } = await this.$ajax.post(this.$apiUrl.MENU.DELETE, { id });
    await this.syncMenuData();
    if (err) {
      this.$message.showError(err);
    }
    return { err };
  }

  //编辑菜单
  async editItem(menuItemData) {
    const { powerID, parentID, powerName, powerCode, sorting, powerType } = menuItemData;
    const { err } = await this.$ajax.post(this.$apiUrl.MENU.SAVE, { powerID, parentID, powerName, powerCode, sorting, powerType });
    //await this.syncMenuData();
    if (err) {
      this.$message.showError(err);
    }
    return { err };
  }
  //上下移菜单
  async sortItem(sortArray, powerType) {
    let data = {
      sortArray: sortArray
    };
    const { err } = await this.$ajax.post(this.$apiUrl.MENU.SORT, data);
    if (powerType == 3) {
      await this.syncMenuData();
    }
    if (err) {
      this.$message.showError(err);
    }
    return { err };
  }
}
export default MenuModel;
