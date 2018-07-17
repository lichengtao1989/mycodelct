import formatter from '../../routerFormatter';
export default formatter({
  //绿色农药目录
  greenPesticide: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/greenPesticide/index.vue'));
    }, '/modules/greenPesticide/index');
  },
  //农户主体备案
  farmersFiling: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/farmersFiling/index.vue'));
    }, '/modules/farmersFiling/index');
  },
  //农资店管理
  agriculturalStore: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/agriculturalStore/index.vue'));
    }, '/modules/agriculturalStore/index');
  },
  //总经销商备案
  distribution: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/distribution/index.vue'));
    }, '/modules/distribution/index');
  },
  //废弃物品回收台账
  abandonedRecovery: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/abandonedRecovery/index.vue'));
    }, '/modules/abandonedRecovery/index');
  },
  //用户管理
  userAdmin: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/userAdmin/index.vue'));
    }, '/modules/userAdmin/index');
  },
  //资金账户表
  capitalAccount: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/capitalAccount/index.vue'));
    }, '/modules/capitalAccount/index');
  }
});
