import common from './modules/common';
import user from './modules/user';
//
const models = {common, user};

function model(modelName) {
  return new models[modelName]();
}
model.install = function (Vue) {
  Vue.prototype.$model = model;
  Vue.model = model;
};
export default model;
