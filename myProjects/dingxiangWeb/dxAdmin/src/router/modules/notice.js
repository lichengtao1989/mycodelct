import formatter from '../routerFormatter';
export default formatter({
  //通告通知
  notice: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/notice/notice.vue'));
    }, '/modules/notice/notice');
  }
});
