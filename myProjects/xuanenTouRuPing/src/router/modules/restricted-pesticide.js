export default {
  //禁用农药
  forbiddenPesticides: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/restricted-pesticide/forbidden-list.vue'));
    }, '/modules/restricted-pesticide/forbidden-list');
  },
  //限用农药
  restrictedPesticides: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/restricted-pesticide/restricted-list.vue'));
    }, '/modules/restricted-pesticide/restricted-list');
  }
}
