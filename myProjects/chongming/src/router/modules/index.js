import formatter from '../routerFormatter';
export default formatter({
  index: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/index/index.vue'));
    }, '/modules/index/index');
  }
});
