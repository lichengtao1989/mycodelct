import formatter from '../routerFormatter';
export default formatter({
  //登录
  '/login': (resolve) => {
    require.ensure([], () => {
      resolve(require('@/views/login-reg/login.vue'));
    }, '/modules/login-reg/login');
  }
});
