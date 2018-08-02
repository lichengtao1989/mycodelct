import BaseModel from '../base.js';
class FarmersFilingModel extends BaseModel {
  async setDisabled(Id) {
    const Status = 1;
    const {err} = await this.$ajax.post(this.$apiUrl.FARMERSFILING.SET_STATUS, {Id, Status});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }

  async setEnable(Id) {
    const Status = 0;
    const {err} = await this.$ajax.post(this.$apiUrl.FARMERSFILING.SET_STATUS, {Id, Status});
    if (err) {
      this.$message.showError(err);
      return false;
    }
    return true;
  }
}
export default FarmersFilingModel;
