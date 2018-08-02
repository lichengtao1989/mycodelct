import BaseModel from '../base.js';
class FarmersInfoModel extends BaseModel {
  async getInfo() {
    const {err, res} = await this.$ajax.get(this.$apiUrl.FARMERSINFO.GET_INFO, {});
    if (err) {
      this.$message.showError(err);
      return null;
    } else {
      return res.data;
    }
  }
}
export default FarmersInfoModel;
