import formatter from '../../routerFormatter';
export default formatter({
  //农户备案信息
  farmersInfo: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/farmersInfo/index.vue'));
    }, '/modules/farmersInfo/index');
  },
  //购买农药记录
  pesticideBuyRecords: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/pesticideBuyRecords/index.vue'));
    }, '/modules/pesticideBuyRecords/index');
  },
  //病虫害管理
  diseasesInsectPests: resolve => {
    require.ensure([], () => {
      resolve(require('@/views/diseasesinsectpests/index.vue'));
    }, '/modules/diseasesinsectpests/index');
  }
});
