/**
 * Created by 67340 on 2017/8/24.
 */
export default {
  //导购红包
  salesRedPack: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/salesRedPack/list.vue'))
    }, '/modules/marketing/activity/salesRedPack/list')
  },
  //领取记录
  receiveRecord: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/salesRedPack/receive-record.vue'))
    }, '/modules/marketing/activity/salesRedPack/receive-record')
  },
  //提现记录
  reflectRecord: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/salesRedPack/reflect-record.vue'))
    }, '/modules/marketing/activity/salesRedPack/reflect-record')
  },
  //数据分析-红包活动
  redpackDataAnalysis: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/salesRedPack/redpack-data-analysis.vue'))
    }, '/modules/marketing/activity/salesRedPack/redpack-data-analysis')
  },
  //运营活动-活动列表
  operatingActivitiesList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/operatingActivities/activity-list.vue'))
    }, '/modules/marketing/activity/operatingActivities/activity-list')
  },
  //运营活动-参与记录
  operatingActivitiesRecordList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/operatingActivities/record-list.vue'))
    }, '/modules/marketing/activity/operatingActivities/record-list')
  },
  //运营活动-数据图表
  operatingActivitiesDataList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/activity/operatingActivities/data-list.vue'))
    }, '/modules/marketing/activity/operatingActivities/data-list')
  },
  //抵用码-活动列表
  verificateCodeActivityList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/verificateCode/activity-list.vue'))
    }, 'modules/marketing/activity/verificateCode/activity-list')
  },
  //抵用码-记录列表
  verificateCodeRecordList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/verificateCode/record-list.vue'))
    }, 'modules/marketing/activity/verificateCode/record-list')
  },
  //会员数据分析
  vipData: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/statistics/vipDataAnalysis/vip-data.vue'))
    }, 'modules/marketing/statistics/vipDataAnalysis/vip-data')
  },
  //会员数据列表
  vipDataList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/statistics/vipDataAnalysis/vip-data-list.vue'))
    }, 'modules/marketing/statistics/vipDataAnalysis/vip-data-list')
  },
  //交易数据分析
  exchangeData: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/statistics/vipDataAnalysis/exchange-data.vue'))
    }, 'modules/marketing/statistics/vipDataAnalysis/exchange-data')
  },
  //交易数据列表
  exchangeList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/statistics/vipDataAnalysis/exchange-list.vue'))
    }, 'modules/marketing/statistics/vipDataAnalysis/exchange-list')
  },
  //发放兑换券
  voucherExchangeList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/voucher/exchange-list.vue'))
    }, 'modules/marketing/activity/voucher/exchange-list')
  },
  //兑换券订单列表
  voucherExchangeOrderList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/voucher/exchange-order-list.vue'))
    }, 'modules/marketing/activity/voucher/exchange-order-list')
  },
  //发放抵扣券
  voucherDeductibleList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/voucher/deductible-list.vue'))
    }, 'modules/marketing/activity/voucher/deductible-list')
  },
  //抵扣券订单列表
  voucherDeductibleOrderList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/voucher/deductible-order-list.vue'))
    }, 'modules/marketing/activity/voucher/deductible-order-list')
  },
  //骆驼码活动
  camelCode: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/activity/camelCode/list.vue'))
    }, 'modules/marketing/activity/camelCode/list')
  }
}
