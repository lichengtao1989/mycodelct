//
import COMMON from './modules/common/index';
import USER from './modules/user/index';
import REGION from './modules/region/index';
import DATAMANAGEMENT from './modules/dataManagement/index';
import PURCHASEPURCHASE from './modules/purchasePurchase/index';
import SALESRECEIPT from './modules/salesReceipt/index';
import WAREHOUSE from './modules/warehouse/index';
import RESTRICTEDPESTICIDE from './modules/restrictedPesticide/index';
import MENU from './modules/menu/index';
import ROLE from './modules/role/index';
import ORG from './modules/org/index';
import STORE from './modules/store/index';
import DATAANALYSIS from './modules/dataAnalysis/index';
import NEWMANAGEMENT from './modules/newManagement/index';
import TEMPLATE from './modules/template/index';
//
const apiUrl = { COMMON, USER, REGION, DATAMANAGEMENT, WAREHOUSE, PURCHASEPURCHASE, SALESRECEIPT, RESTRICTEDPESTICIDE, MENU, ROLE, STORE, ORG, DATAANALYSIS, NEWMANAGEMENT, TEMPLATE };
export default {
  install(Vue) {
    Vue.prototype.$apiUrl = apiUrl;
    Vue.apiUrl = apiUrl;
  }
}
