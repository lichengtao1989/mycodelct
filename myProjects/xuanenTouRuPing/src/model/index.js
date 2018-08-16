import common from './modules/common'
import user from './modules/user';
import region from './modules/region';
import dataManagement from './modules/dataManagement'
import warehouse from './modules/warehouse'
import restrictedPesticide from './modules/restrictedPesticide'
import system from './modules/system';
//
const models = {common, user, region, dataManagement, warehouse, restrictedPesticide, system};

function model(modelName) {
  return new models[modelName]();
}
model.install = function (Vue) {
  Vue.prototype.$model = model;
  Vue.model = model;
};
export default model;
