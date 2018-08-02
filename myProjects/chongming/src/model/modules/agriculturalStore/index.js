import BaseModel from '../base.js';
class AgriculturalStoreModel extends BaseModel {
  //添加农资店信息 返回是否成功
  async add({StoreName, ChargePerson, IDCode, CreditCode, PhoneNum, ManageScope, Town, ManageAddress}) {
    const {err} = await this.$ajax.post(this.$apiUrl.AGRICULTURALSTORE.ADD, {StoreName, ChargePerson, IDCode, CreditCode, PhoneNum, ManageScope, Town, ManageAddress});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //更新农资店信息 返回是否成功
  async update({Id, StoreName, ChargePerson, IDCode, CreditCode, PhoneNum, ManageScope, Town, ManageAddress}) {
    const {err} = await this.$ajax.post(this.$apiUrl.AGRICULTURALSTORE.UPDATE, {Id, StoreName, ChargePerson, IDCode, CreditCode, PhoneNum, ManageScope, Town, ManageAddress});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //设置农资店状态 返回是否成功
  async setStatus(Id, StoreStatus) {
    const {err} = await this.$ajax.post(this.$apiUrl.AGRICULTURALSTORE.SET_STATUS, {Id, StoreStatus});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //根据id获取农资店信息
  async getData(id) {
    const {err, res} = await this.$ajax.post(this.$apiUrl.AGRICULTURALSTORE.GET_INFO, {id});
    if (err) {
      this.$message.showError(err);
      return null;
    }
    return res.data;
  }
}
export default AgriculturalStoreModel;
