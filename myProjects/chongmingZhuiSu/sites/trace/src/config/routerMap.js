export default {
  //溯源节点记录
  traceNodeHistory: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/traceNodeHistory/traceNodeHistory.vue'));
    }, '/modules/trace/traceNodeHistory/traceNodeHistory');
  },
  //投入品入库列表
  inputsStockInList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stockIn-list.vue'));
    }, '/modules/trace/inputs/stockInList');
  },
  //投入品入库统计
  inputsStockInStatistics: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stockIn-statistics.vue'));
    }, '/modules/trace/inputs/stockInStatistics');
  },
  //投入品出库列表
  inputsStockOutList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stockOut-list.vue'));
    }, '/modules/trace/inputs/stockOutList');
  },
  //投入品出库统计
  inputsStockOutStatistics: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stockOut-statistics.vue'));
    }, '/modules/trace/inputs/stockOutStatistics');
  },
  //投入品销售出库列表
  inputsSalesList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stockOut-list.vue'));
    }, '/modules/trace/inputs/stockOutList');
  },
  //投入品库存统计
  inputsStockStatistics: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stock-statistics.vue'));
    }, '/modules/trace/inputs/stockStatistics');
  },
  //投入品库存明细
  inputsStockDetailList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inputs/stock-detail.vue'));
    }, '/modules/trace/inputs/stockDetail');
  },
  //溯源树模板
  traceTreeTempletList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/traceTree/templet-list.vue'));
    }, '/modules/trace/traceTree/templetList');
  },
  //溯源树
  traceTreeList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/traceTree/list.vue'));
    }, '/modules/trace/traceTree/list');
  },
  //溯源信息-溯源节点
  traceNodeList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/traceNode/traceNode-list.vue'));
    }, '/modules/trace/traceNode/traceNodeList')
  },
  //溯源信息-溯源记录
  traceRecordList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/traceRecord/traceRecord-list.vue'));
    }, '/modules/trace/traceRecord/traceRecordList')
  },
  //合格证模板
  certificateTempletList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/certificate/templet-list.vue'));
    }, '/modules/certificate/templet-list');
  },
  //合格证列表
  certificateList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/certificate/list.vue'));
    }, '/modules/certificate/list');
  },
  //视频设备管理-设备列表
  cameraDeviceList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/cameraDevice/list.vue'));
    }, '/modules/trace/cameraDevice/list')
  },
  //视频设备管理-监控列表
  videoList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/cameraDevice/video-list.vue'));
    }, '/modules/trace/cameraDevice/videoList')
  },
  //内部检测
  internalTestList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productTesting/internalTest/list.vue'));
    }, '/modules/trace/productTesting/internalTest/list');
  },
  //第三方检测
  thirdPartyTestList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productTesting/thirdPartyTest/list.vue'));
    }, '/modules/trace/productTesting/thirdPartyTest/list');
  },
  //关联保险列表
  insuranceRelateList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/insurance/insuranceRelate/list.vue'));
    }, '/modules/trace/insurance/insuranceRelate/list');
  },
  //理赔记录
  claimRecordList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/insurance/claimRecord/list.vue'));
    }, '/modules/trace/insurance/claimRecord/list');
  },
  //投保申请
  insureApplication: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/insurance/insureApplication/application.vue'));
    }, '/modules/trace/insurance/insureApplication/application');
  },
  //投保列表
  insureApplicationList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/insurance/insureApplication/list.vue'));
    }, '/modules/trace/insurance/insureApplication/list');
  },
  //保险理赔数据图表
  policyData: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/insurance/insureApplication/policy-data.vue'));
    }, '/modules/trace/insurance/insureApplication/policy-data');
  },
  //气象站管理
  weatherStationList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/weatherStation/list.vue'));
    }, '/modules/trace/weatherStation/list')
  },
  //气象监控
  weatherMonitor: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/weatherStation/weather-monitor.vue'));
    }, '/modules/trace/weatherStation/weatherMonitor')
  },
  //一体机
  pcQueryConfigList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/pcQueryConfig/list.vue'));
    }, '/modules/trace/pcQueryConfig/list')
  },
  //检测项管理
  testItemManagemer: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productTesting/testItemsManager/list.vue'));
    }, '/modules/trace/productTesting/testItemsManager/list');
  },
  //审批配置
  reviewConfig: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/approval/config/list.vue'));
    }, '/modules/trace/approval/config/list');
  },
  //我发起的
  InitiateReview: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/approval/record/initiateReview/list.vue'));
    }, '/modules/trace/approval/record/initiateReview/list');
  },
  //我审批的
  approved: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/approval/record/pending/list.vue'));
    }, '/modules/trace/approval/record/pending/list');
  },
  //基地信息
  baseList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/baseManagement/list.vue'));
    }, '/modules/trace/baseManagement/list');
  },
  //基地分区
  baseArea: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/baseManagement/base-area.vue'));
    }, '/modules/trace/baseManagement/base-area');
  },
  //质检记录
  qualityInspectionRecord: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/productTesting/qualityInspectionRecord/list.vue'));
    }, '/modules/trace/productTesting/qualityInspectionRecord/list');
  },
  //农事管理
  farmingManagement: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/farmingManagement/list.vue'));
    }, '/modules/trace/farmingManagement/list');
  },
  //农事管理
  monitorDevice: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/monitorDevice/list.vue'));
    }, '/modules/trace/monitorDevice/list');
  },
  //执法检查
  lawEnforcementInspection: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/lawEnforcementInspection/list.vue'));
    }, '/modules/trace/lawEnforcementInspection/list');
  }
}
