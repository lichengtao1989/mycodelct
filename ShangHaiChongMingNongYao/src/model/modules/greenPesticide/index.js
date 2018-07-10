import BaseModel from '../base.js';
class GreenPesticideModel extends BaseModel {
  async getInfo(id) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.GREENPESTICIDE.GET_INFO, {id});
    if (err) {
      this.$message.showError(err);
      return null;
    } else {
      return res.data;
    }
  }
}
export default GreenPesticideModel;
