import formatter from '../../routerFormatter';
export default formatter({
  //进货申请
  purchaseApplication: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/purchaseApplication/index.vue'));
    }, '/modules/purchaseApplication/index');
  },
  //进货列表
  purchaseList: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/purchaseList/index.vue'));
    }, '/modules/purchaseList/index');
  },
  //销售开单
  salesBill: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/salesBill/index.vue'));
    }, '/modules/salesBill/index');
  },
  //销售单据
  salesBillAdmin: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/salesBillAdmin/index.vue'));
    }, '/modules/salesBillAdmin/index');
  },
  //退货单据
  cancBill: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/cancBill/index.vue'));
    }, '/modules/cancBill/index');
  },
  //退货记录
  cancRecord: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/cancRecord/index.vue'));
    }, '/modules/cancRecord/index');
  },
  //附近门店库存查询
  nearbyStoreInventoryQuery: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/nearbyStoreInventoryQuery/index.vue'));
    }, '/modules/nearbyStoreInventoryQuery/index');
  },
  //农资店信息
  agriculturalStoreInfo: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/agriculturalStoreInfo/index.vue'));
    }, '/modules/agriculturalStoreInfo/index');
  }
});
