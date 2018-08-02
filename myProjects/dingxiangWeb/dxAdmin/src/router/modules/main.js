import mainChildRuter from './main-child-router';
export default [
  {
    path: '/main',
    component: resolve => {
      require.ensure([], () => {
        resolve(require('@/views/main/main.vue'));
      }, '/modules/main/main');
    },
    children: [
      {path: '/', redirect: 'index'},
      ...mainChildRuter //首页
    ]
  }
]
