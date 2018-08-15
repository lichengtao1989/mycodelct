export default {
  //--------------------箱标管理begin
  //产品装箱
  nestingList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nesting-list.vue'));
    }, '/modules/logistics/codeNesting/nestingList');
  },
  //拆解整箱
  nestingRemoveAllList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nestingRemoveAll-list.vue'));
    }, '/modules/logistics/codeNesting/nestingRemoveAllList');
  },
  //补标入箱
  nestingAddList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nestingAdd-list.vue'));
    }, '/modules/logistics/codeNesting/nestingAddList');
  },
  //分离单标
  nestingRemoveList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nestingRemove-list.vue'));
    }, '/modules/logistics/codeNesting/nestingRemoveList');
  },
  //列出整箱
  showBoxList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/listBox-list.vue'));
    }, '/modules/logistics/codeNesting/listBoxList');
  },
  //互查识别
  codeMutual: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/codeMutual.vue'));
    }, '/modules/logistics/codeNesting/codeMutual');
  },
  //生产数据详情
  nestingStats: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nesting-stats.vue'));
    }, '/modules/logistics/codeNesting/nesting-stats');
  },
  //生产数据总览
  nestingStatsOverview: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nesting-stats-overview.vue'));
    }, '/modules/logistics/codeNesting/nesting-stats-overview');
  },
  //历史数据
  nestingHistory: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/nesting-history.vue'));
    }, '/modules/logistics/codeNesting/nesting-history');
  },
  //标识替换
  CodeChange: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/codeNesting/code-change.vue'));
    }, '/modules/logistics/codeNesting/code-change');
  },
  //--------------------箱标管理end
  //--------------------仓储管理begin
  //产品入库
  stockInList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-in-list.vue'));
    }, '/modules/logistics/storage/stockInList');
  },
  //其他入库
  stockInOtherList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-in-other-list.vue'));
    }, '/modules/logistics/storage/stockInOtherList');
  },
  //产品出库
  stockOutList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-out-list.vue'));
    }, '/modules/logistics/storage/stockOutList');
  },
  //其他出库
  stockOutOtherList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-out-other-list.vue'));
    }, '/modules/logistics/storage/stockOutOtherList');
  },
  //产品调货
  stockTransferProductList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-transfer-product-list.vue'));
    }, '/modules/logistics/storage/stockTransferProductList');
  },
  //产品调仓
  stockTransferWarehouseList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-transfer-warehouse-list.vue'));
    }, '/modules/logistics/storage/stockTransferWarehouseList');
  },
  //产品退货
  stockReturnList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-return-list.vue'));
    }, '/modules/logistics/storage/stockReturnList');
  },
  //收货确认
  billStockInConfirmList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-in-confirm-list.vue'));
    }, '/modules/logistics/storage/stockInConfirmList');
  },
  //库存盘点
  stockCheckTaskList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-check-task-list.vue'));
    }, '/modules/logistics/storage/stockCheckTaskList');
  },
  //库存明细
  stockDetailList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-detail-list.vue'));
    }, '/modules/logistics/storage/stockDetailList');
  },
  //库存报表
  stockCheckList: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/storage/stock-check-list.vue'));
    }, '/modules/logistics/storage/stockCheckList');
  },
  //--------------------仓储管理end
  //--------------------库存数据begin
  //库存总汇
  headSummary: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-list.vue'));
    }, '/modules/logistics/inventory/inventory-list');
  },
  //库存明细
  headDetail: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-detail-list.vue'));
    }, '/modules/logistics/inventory/inventory-detail-list');
  },
  //入库统计
  headStockIn: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-in-list.vue'));
    }, '/modules/logistics/inventory/inventory-warehouse-list');
  },
  //出库统计
  headStockOut: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-out-list.vue'));
    }, '/modules/logistics/inventory/inventory-warehouse-list');
  },
  //经销商库存总汇
  dealerSummary: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-list.vue'));
    }, '/modules/logistics/inventory/inventory-list');
  },
  //经销商库存明细
  dealerDetail: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-detail-list.vue'));
    }, '/modules/logistics/inventory/inventory-detail-list');
  },
  //经销商入库统计
  dealerStockIn: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-in-list.vue'));
    }, '/modules/logistics/inventory/inventory-warehouse-list');
  },
  //经销商出库统计
  dealerStockOut: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-out-list.vue'));
    }, '/modules/logistics/inventory/inventory-warehouse-list');
  },
  //门店库存总汇
  storeSummary: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-list.vue'));
    }, '/modules/logistics/inventory/inventory-list');
  },
  //门店库存明细
  storeDetail: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-detail-list.vue'));
    }, '/modules/logistics/inventory/inventory-detail-list');
  },
  //门店入库统计
  storeStockIn: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-in-list.vue'));
    }, '/modules/logistics/inventory/inventory-stock-in-list');
  },
  //门店出库统计
  storeStockOut: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-stock-out-list.vue'));
    }, '/modules/logistics/inventory/inventory-stock-out-list');
  },
  //库存帐统计
  stockCountStatistics: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/inventory-count-statistics-list.vue'));
    }, '/modules/logistics/inventory/inventory-count-statistics-list');
  },
  //台账查询
  stockDetailView: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/inventory/logistics-history-list.vue'));
    }, '/modules/logistics/inventory/logistics-history-list');
  },
  //--------------------库存数据end
  // 在线订货->订货申请
  orderApply: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/order/apply-list.vue'));
    }, '/modules/logistics/order/orderApply');
  },
  //防窜设置
  cuanhuoConfig: (reslove) => {
    require.ensure([], () => {
      reslove(require('../views/cuanhuo/config.vue'));
    }, '/modules/logistics/cuanhuo/config');
  }
}
