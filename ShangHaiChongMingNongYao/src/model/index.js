import common from './modules/common';
import user from './modules/user';
import region from './modules/region';
import agriculturalStore from './modules/agriculturalStore';
import dataManagement from './modules/dataManagement';
import farmersFiling from './modules/farmersFiling';
import greenPesticide from './modules/greenPesticide';
import purchase from './modules/purchase';
//
const models = {common, user, region, agriculturalStore, dataManagement, farmersFiling, greenPesticide, purchase};

function model(modelName) {
  return new models[modelName]();
}
model.install = function (Vue) {
  Vue.prototype.$model = model;
  Vue.model = model;
};
export default model;
