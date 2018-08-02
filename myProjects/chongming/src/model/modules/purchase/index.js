import BaseModel from '../base.js';
class PurchaseModel extends BaseModel {
  //获取列表
  async getList(param = {}) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.PURCHASE.GET_LIST, {pageSize: 30, pageNum: 1, ...param});
    if (err) {
      this.$message.showError(err);
      return [];
    } else {
      return res.data.rows;
    }
  }

  //进货 返回是否成功
  async add(Suppliers, PriorityDescription, Note, MoneyCount, sonList) {
    const {err, res} = await this.$ajax.post(this.$apiUrl.PURCHASE.ADD, {Suppliers, PriorityDescription, Note, MoneyCount, sonList});
    if (err) {
      this.$message.showError(err);
      return false;
    } else if (res) {
      return true;
    }
  }

  //获取详情
  async getPurchase(id) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.PURCHASE.GET_INFO, {id});
    if (err) {
      this.$message.showError(err);
      return null;
    }
    return res.data;
  }

  //
  async getProductPesticideInfo(id) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.PURCHASE.GET_PRODUCTPESTICIDEINFO, {id});
    if (err) {
      this.$message.showError(err);
      return null;
    }
    return res.data;
  }

  //发货 返回是否成功
  async send(ID, Note, SonList) {
    const {err} = await this.$ajax.post(this.$apiUrl.PURCHASE.SEND, {ID, Note, SonList});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //撤销 返回是否成功
  async cancel(ID) {
    const {err} = await this.$ajax.post(this.$apiUrl.PURCHASE.CANCEL, {ID});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  //确认收获 防火是否成功
  async confirmReceipt(ID) {
    const {err} = await this.$ajax.post(this.$apiUrl.PURCHASE.CONFIRM_RECEIPT, {ID});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }
}
export default PurchaseModel;
