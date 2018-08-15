export default {
  //码分配查询
  codeOrgAssignList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeOrgAssign/list.vue'))
    }, '/modules/base/codeOrgAssign/list')
  },
  //码关联统计
  codeCorrelationStatistics: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeCorrelation/statistics.vue'))
    }, '/modules/code/codeCorrelation/statistics')
  },
  //码关联
  codeCorrelation: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeCorrelation/list.vue'))
    }, '/modules/code/codeCorrelation/list')
  },
  codeSearch: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeSearch/search.vue'))
    }, '/modules/code/codeSearch/search')
  },
  //生码批次
  codeGenerationList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeGeneration/list.vue'))
    }, '/modules/code/codeGeneration/list')
  },
  //生码批次(组织)
  codeGenerationListForCorp: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeGeneration/listForCorp.vue'))
    }, '/modules/code/codeGeneration/listForCorp')
  },
  //OID管理
  oidManage: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/oid/list.vue'))
    }, '/modules/code/oid/list')
  },
  //π生码管理-列表
  codePaiGenerationList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/codePaiGeneration/list.vue'))
    }, '/modules/code/codePaiGeneration/list')
  },
  //π生码管理-编辑
  codePaiGenerationEdit: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/codePaiGeneration/edit.vue'))
    }, '/modules/code/codePaiGeneration/edit')
  },
  //产品订单
  productionOrderList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../../../code/src/views/productionOrder/product-list.vue'))
    }, '/modules/base/productionOrder/product-list')
  },
  //打印生码单
  codeOrderPreview: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/productionOrder/code-order-preview.vue'))
    }, '/modules/code/productionOrder/code-order-preview')
  },
  //生产订单-跟单表
  codeFollowList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/productionOrder/follow-list.vue'))
    }, '/modules/code/productionOrder/follow-list')
  },
  //生产订单-订单明细
  codeOrderDetailList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/productionOrder/order-detail-list.vue'))
    }, '/modules/code/productionOrder/order-detail-list')
  },
  //生产订单-待生码列表
  waitCodeList: (resolve) => {
    require.ensure([], () => {
      resolve(require('../views/productionOrder/wait-code-list.vue'))
    }, '/modules/code/productionOrder/wait-code-list')
  }
}
