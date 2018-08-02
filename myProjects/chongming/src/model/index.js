import common from './modules/common';
import user from './modules/user';
import region from './modules/region';
import agriculturalStore from './modules/agriculturalStore';
import dataManagement from './modules/dataManagement';
import farmersFiling from './modules/farmersFiling';
import greenPesticide from './modules/greenPesticide';
import purchase from './modules/purchase';
import farmersInfo from './modules/farmersInfo';
import stock from './modules/stock';
import diseases from './modules/diseases';
//
const models = {common, user, region, agriculturalStore, dataManagement, farmersFiling, greenPesticide, purchase, farmersInfo, stock, diseases};

function model(modelName) {
  return new models[modelName]();
}
model.install = function (Vue) {
  Vue.prototype.$model = model;
  Vue.model = model;
};
export default model;
