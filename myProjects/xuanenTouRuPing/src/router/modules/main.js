export default {
  main: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/main/main.vue'));
    }, '/modules/main/main');
  },
  stayTuned: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/main/stay-tuned.vue'));
    }, '/modules/main/stay-tuned');
  }
}
