//路由通用配置
export default function (router) {
  router.afterEach((to, from) => {
    //设置页面title
    if (to.meta && to.meta.name) {
      window.document.title = to.meta.name + '【超级码】';
    } else {
      window.document.title = '超级码系统';
    }
  });

  return router;
}
