import BaseModel from '../base.js';
class DiseasesModel extends BaseModel {
  //获取病虫害数据
  async getDiseasesData() {
    let data = this.$globalData.get('diseasesData');
    if (!data) {
      const {res} = await this.$ajax.get(this.$apiUrl.DISEASES.GET_DATA);
      data = res.data;
      this.$globalData.set('diseasesData', data);
    }
    return data;
  }

  async getCropList() {
    const data = await this.getDiseasesData();
    return data.map(item => item.name);
  }

  async getGrowthList(crop) {
    const data = await this.getDiseasesData();
    const matchItem = data.find(item => item.name === crop);
    return matchItem ? matchItem.growthList : [];
  }

  async getPestList(crop) {
    const data = await this.getDiseasesData();
    const matchItem = data.find(item => item.name === crop);
    return matchItem ? matchItem.pestList : [];
  }
}
export default DiseasesModel;
