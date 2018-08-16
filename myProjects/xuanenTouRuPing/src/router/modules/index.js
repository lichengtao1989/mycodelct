//首页
export default {
  //首页
  index: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/index/index.vue'));
    }, '/modules/index/index');
  }
}
