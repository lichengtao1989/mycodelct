//
import DEMO from './modules/demo/index'; //
import COMMON from './modules/common/index'; //通用
import STOCK from './modules/stock/index'; //通用
import USER from './modules/user/index'; //用户
import REGION from './modules/region/index'; //省市区
import AGRICULTURALSTORE from './modules/agriculturalStore/index'; //农资店
import MAINDISTRIBUTION from './modules/maindistribution/index';
import USERMANAGE from './modules/usermanage/index';
import FUNDACCOUNT from './modules/fundaccount/index';
import GREENPESTICIDE from './modules/greenPesticide/index'; //绿色农药目录
import FARMERSFILING from './modules/farmersFiling/index'; //农户主体备案
import PURCHASE from './modules/purchase/index'; //进货发货

//
const apiUrl = {DEMO, COMMON, USER, REGION, AGRICULTURALSTORE, MAINDISTRIBUTION, USERMANAGE, FUNDACCOUNT, GREENPESTICIDE, FARMERSFILING, STOCK, PURCHASE};
export default {
  install(Vue) {
    Vue.prototype.$apiUrl = apiUrl;
    Vue.apiUrl = apiUrl;
  }
};
