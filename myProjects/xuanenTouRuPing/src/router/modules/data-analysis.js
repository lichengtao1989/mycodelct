export default {
  dataAnalysis: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/data-analysis/list.vue'));
    }, '/modules/data-analysis/list');
  }
}
