import formatter from '../routerFormatter';
export default formatter({
  list: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/list.vue'));
    }, '/modules/demo/list');
  },
  select: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/select.vue'));
    }, '/modules/demo/select');
  },
  region: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/region.vue'));
    }, '/modules/demo/region');
  },
  print: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/print.vue'));
    }, '/modules/demo/print');
  },
  other: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/demo/other.vue'));
    }, '/modules/demo/other');
  }
});
