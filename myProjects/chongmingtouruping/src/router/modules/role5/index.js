import formatter from '../../routerFormatter';
export default formatter({
  //发货列表
  deliver: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/deliver/index.vue'));
    }, '/modules/deliver/index');
  },
  //进货入库
  purchase: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/purchase/index.vue'));
    }, '/modules/purchase/index');
  },
  //入库记录
  warehousRecord: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/warehousRecord/index.vue'));
    }, '/modules/warehousRecord/index');
  },
  //仓库库存
  stock: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/stock/index.vue'));
    }, '/modules/stock/index');
  },
  //病虫害管理
  diseasesInsectPests: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/diseasesinsectpests/index.vue'));
    }, '/modules/diseasesinsectpests/index');
  }
});
