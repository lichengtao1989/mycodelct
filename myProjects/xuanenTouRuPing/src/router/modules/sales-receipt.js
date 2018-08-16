export default {
  salesReceipt: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/sales-receipt/sales-list.vue'));
    }, '/modules/sales-receipt/sales-list');
  },
  salesAccount: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/sales-receipt/list.vue'));
    }, '/modules/sales-receipt/list');
  }
}
