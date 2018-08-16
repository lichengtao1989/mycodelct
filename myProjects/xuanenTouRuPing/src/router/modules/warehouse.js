export default {
  inventoryTable: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/warehouse/list.vue'));
    }, '/modules/warehouse/list');
  }
}
