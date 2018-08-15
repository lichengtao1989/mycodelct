export default {
  //贫困户列表
  poorFarmilyList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/poorFarmily/list.vue'));
    }, '/modules/other/poorFarmily/list');
  },
  //扶贫记录
  povertyRecordList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/povertyRecord/list.vue'));
    }, '/modules/other/povertyRecord/list');
  },
  //劳务岗位管理
  povertyLaborList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/povertyLabor/list.vue'));
    }, '/modules/other/povertyLabor/list');
  },
  //贫困职工收入记录
  povertyIncomeRecordList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/povertyIncomeRecord/list.vue'));
    }, '/modules/other/povertyIncomeRecord/list');
  },
  earconAddRecordList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/earconRecord/add-record-list.vue'));
    }, '/modules/other/earcon/add-record-list')
  },
  earconPushRecordList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/earconRecord/push-record-list.vue'));
    }, '/modules/other/earcon/push-record-list')
  },
  earconChangeRecordList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/earconRecord/change-record-list.vue'));
    }, '/modules/other/earcon/change-record-list')
  }
}
