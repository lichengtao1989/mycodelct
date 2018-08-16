import BaseModel from '../base.js';
class StoreModel extends BaseModel {
  async getList(param = {}) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.STORE.GET_LIST, param);
    if (err) {
      this.$message.showError(err);
      return {total: 0, rows: []};
    } else {
      return res.data;
    }
  }

  async approve(storeId, isPass) {
    const value = isPass ? 3 : 2;
    const {err, res} = await this.$ajax.get(this.$apiUrl.STORE.APPROVE, {storeId, value});
    if (err) {
      this.$messags.showError(err);
      return false
    } else if (res) {
      return true;
    }
  }
}
export default StoreModel;
