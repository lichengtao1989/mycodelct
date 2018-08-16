//注册登录忘记密码
export default {
  //注册
  register: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/login-reg/register.vue'));
    }, '/modules/login-reg/register');
  },
  //登录
  login: (resolve) => {
    require.ensure([], () => {
      resolve(require('@/views/login-reg/login.vue'));
    }, '/modules/login-reg/login');
  }
}
