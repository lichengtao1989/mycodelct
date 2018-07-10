import BaseModel from '../base.js';
class RegionModel extends BaseModel {
  //获取某个地区代码下的所有子地区
  async getRegion(parentRegionCode = '0') {
    const storageRegionKey = `Region_${parentRegionCode}`;
    let data = this.$storage.get(storageRegionKey);
    if (!data) {
      const {err, res} = await this.$ajax.get(this.$apiUrl.REGION.GET_REGION_DATA, {parentRegionCode});
      if (err) {
        data = [];
      } else if (res) {
        data = res.data.rows;
        this.$storage.set(storageRegionKey, data);
      }
    }
    return data;
  }

  //根据某个地区代码获取该地区名称
  async getRegionNameByCode(regionCode) {
    let regions;
    if (regionCode.length === 2) {
      regions = await this.getRegion('0');
    }
    if (regionCode.length === 4) {
      regions = await this.getRegion(regionCode.substr(0, 2));
    }
    if (regionCode.length === 6) {
      regions = await this.getRegion(regionCode.substr(0, 4));
    }
    if (regionCode.length === 9) {
      regions = await this.getRegion(regionCode.substr(0, 6));
    }
    const matchRegion = regions.find(item => item.regionCode === regionCode);
    if (matchRegion) {
      return matchRegion.location;
    }
  }

  //根据某个地区代码获取该地区和上级地区直到省的名称
  async getRegionText(regionCode) {
    const texts = [];
    if (regionCode.length >= 2) {
      const regionName = await this.getRegionNameByCode(regionCode.substr(0, 2));
      texts.push(regionName);
    }
    if (regionCode.length >= 4) {
      const regionName = await this.getRegionNameByCode(regionCode.substr(0, 4));
      texts.push(regionName);
    }
    if (regionCode.length >= 6) {
      const regionName = await this.getRegionNameByCode(regionCode.substr(0, 6));
      texts.push(regionName);
    }
    if (regionCode.length >= 9) {
      const regionName = await this.getRegionNameByCode(regionCode.substr(0, 9));
      texts.push(regionName);
    }
    return texts;
  }
}
export default RegionModel;
