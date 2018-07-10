import BaseModel from '../base.js';
class PurchaseModel extends BaseModel {
  //进货发货 返回是否成功
  async add(Suppliers, PriorityDescription, Note, MoneyCount, sonList) {
    const {err, res} = await this.$ajax.post(this.$apiUrl.PURCHASE.ADD, {Suppliers, PriorityDescription, Note, MoneyCount, sonList});
    if (err) {
      this.$message.showError(err);
      return false;
    } else if (res) {
      return true;
    }
  }
}
export default PurchaseModel;
