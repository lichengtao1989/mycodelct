import BaseModel from '../base.js';
class StockModel extends BaseModel {
  async getWarnList(top = 4) {
    const {err, res} = await this.$ajax.get(this.$apiUrl.STOCK.GET_WARN_STOCK, {top});
    if (err) {
      console.error(err);
      return [];
    } else {
      return res.data;
    }
  }
}
export default StockModel;
