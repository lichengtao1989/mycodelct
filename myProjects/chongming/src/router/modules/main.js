import indexRouter from './index';
import role1 from './role1/index';
import role2 from './role2/index';
import role3 from './role3/index';
import role5 from './role5/index';
import demoRouter from './demo';
import defaultComponent from '@/views/main/stay-tuned.vue';
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
      ...indexRouter, //首页
      //区农委
      ...role1,
      //农户
      ...role2,
      //农资店
      ...role3,
      //总经销商
      ...role5,
      //
      ...demoRouter,
      //没有匹配到时显示
      {path: '*', component: defaultComponent}
    ]
  }
]
