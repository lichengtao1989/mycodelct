export default {
  purchasePurchase: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/purchase-purchase/purchase-list.vue'));
    }, '/modules/purchase-purchase/purchase-list');
  },
  purchaseAccount: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/purchase-purchase/list.vue'));
    }, '/modules/purchase-purchase/list');
  }
}
