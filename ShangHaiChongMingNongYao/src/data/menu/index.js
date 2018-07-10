import Vue from 'vue';

function menuItem(powerCode, powerName, children) {
  return Object.jsonClone({
    powerCode,
    powerName,
    children
  });
}

function hideMenuItem(item) {
  item.hide = true;
  return Object.jsonClone(item);
}
export default () => {
  //根据不同的登录账户 返回不同的菜单
  const userInfo = Vue.storage.get('userInfo');
  let {
    role
  } = userInfo || {};
  // if (!role) {
  //   role = 4;
  // }
  // role = 4;
  if (role == 1) { //区农委
    return [
      menuItem('index', '首页'),
      menuItem('greenPesticide', '绿色农药目录'),
      menuItem('farmersFiling', '农户主体备案'),
      menuItem('agriculturalStore', '农资店管理'),
      menuItem('distribution', '总经销商备案'),
      menuItem('abandonedRecovery', '废弃物品回收台账'),
      menuItem('userAdmin', '用户管理'),
      menuItem('capitalAccount', '资金账户表'),
      menuItem('pesticidesCirculation', '农药流通查询'),
      menuItem('demo', '组件示例', [
        menuItem('list', '列表'), menuItem('select', '下拉选择'),
        menuItem('region', '省市区街道选择'), menuItem('print', '打印小票'),
        menuItem('other', '其它')
      ])
    ];
  } else if (role == 2) { //农户
    return [
      hideMenuItem(menuItem('index', '首页')),
      menuItem('farmersInfo', '农户备案信息'),
      menuItem('pesticideBuyRecords', '购买农药记录'),
      menuItem('capitalAccount', '资金账户'),
      menuItem('agriculturalStore', '农资店管理')
    ];
  } else if (role == 3) { //农资店
    return [
      menuItem('index', '首页'),
      menuItem('salesBill', '销售开单'),
      menuItem('salesBillAdmin', '销售单据'),
      menuItem('purchaseApplication', '进货申请'),
      menuItem('purchaseList', '进货列表'),
      menuItem('stock', '库存管理'),
      menuItem('cancBill', '退货单据'),
      menuItem('cancRecord', '退货记录'),
      menuItem('capitalAccount', '资金账户'),
      menuItem('abandonedRecovering', '废弃物品回收'),
      menuItem('abandonedRecovery', '废弃物品回收台账'),
      menuItem('farmersFiling', '农户主体备案'),
      menuItem('agriculturalStoreInfo', '农资店信息'),
      menuItem('greenPesticide', '绿色农药目录'),
      menuItem('nearbyStoreInventoryQuery', '附近门店库存查询')
    ];
  } else if (role == 5) { //总经销商
    return [
      menuItem('index', '首页'),
      menuItem('deliver', '发货列表'),
      menuItem('purchase', '进货入库'),
      menuItem('warehousRecord', '入库记录'),
      menuItem('stock', '仓库库存'),
      menuItem('agriculturalStoreStock', '农资店库存'),
      menuItem('capitalAccount', '资金账户'),
      menuItem('userAdmin', '用户管理'),
      menuItem('pesticidesCirculation', '农药流通查询'),
      menuItem('distributorInfo', '总经销商备案信息'),
      menuItem('agriculturalStore', '农资店管理'),
      menuItem('greenPesticide', '绿色农药目录')
    ];
  }
  return [];
}
