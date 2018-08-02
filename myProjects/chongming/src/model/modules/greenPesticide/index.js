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

  async getInfoByProductBarCode(ProductBarCode) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.GREENPESTICIDE.GET_INFO, {ProductBarCode});
    if (err) {
      this.$message.showError(err);
      return null;
    } else {
      return res.data;
    }
  }

  async update(data) {
    const {err} = await this.$ajax.post(this.$apiUrl.GREENPESTICIDE.UPDATE, {...data});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }
}
export default GreenPesticideModel;
