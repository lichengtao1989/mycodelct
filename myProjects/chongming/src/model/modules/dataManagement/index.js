import BaseModel from '../base.js';
class DataManagementModel extends BaseModel {
  //供应商管理方法
  async commonfn(url, data) {
    let { err, res } = await this.$ajax.post(url, data);
    return { err, res };
  }
  async commonfn2(url, data) {
    let { err, res } = await this.$ajax.get(url, data);
    return { err, res };
  }
}
export default DataManagementModel;
