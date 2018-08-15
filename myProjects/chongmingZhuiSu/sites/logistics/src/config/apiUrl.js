export default {//物流
  //箱标管理
  codeNesting: {
    //导出装箱列表
    EXPORT_CODE_NESTING_LIST: '/Ashx/Export.ashx?function=CodeNestingExport',
    //产品装箱提交接口
    NEST: '/Ashx/codeNesting.ashx?function=nest',
    //拆箱接口
    REMOVE_ALL: '/Ashx/codeNesting.ashx?function=removeAll',
    //补标入箱
    ADD: '/Ashx/codeNesting.ashx?function=add',
    //分离单标
    REMOVE: '/Ashx/codeNesting.ashx?function=remove',
    //获取列出整箱列表
    GET_LISTBOX_LIST: '/Ashx/CodeNesting.ashx?function=getList',
    //获取互查识别列表
    CODE_MUTUAL_QUERY: '/Ashx/CodeNesting.ashx?function=codeMutualQuery',
    //获取历史查询列表数据
    GET_NESTING_STATS_LIST: '/Ashx/CodeNesting.ashx?function=getNestingStatsList',
    //生产数据详情导出
    NESTING_STATS_LIST_EXPORT: '/Ashx/Export.ashx?function=NestingStatsListExpoort',
    //获取历史查询列表数据
    GET_PRODUCT_DATA_HISTORY_LIST: '/Ashx/CodeNesting.ashx?function=getProductDataHistoryList',
    //关联查询导出列表
    EXPORT_CODE_LIST: '/Ashx/Export.ashx?function=CodeListExport',
    //获取生产数据统计
    GET_PRODUCTION_DATA_OVERVIEW: '/Ashx/ProductionData.ashx?function=getProductionDataOverview',
    //今日产品生产数据
    GET_TODAY_PRODUCT_DATA_LIST: '/Ashx/ProductionData.ashx?function=getTodayProductDataList',
    //今日生产赋码数
    GET_TODAY_PRODUCTION_DATA: '/Ashx/ProductionData.ashx?function=getTodayProductionData',
    //本周生产赋码情况
    GET_WEEK_PRODUCTION_DATA_LIST: '/Ashx/ProductionData.ashx?function=getWeekProductionDataList',
    //本月生产赋码情况
    GET_MONTH_PRODUCTION_DATA_LIST: '/Ashx/ProductionData.ashx?function=getMonthProductionDataList',
    //本年度生产赋码情况
    GET_YEAR_PRODUCTION_DATA_LIST: '/Ashx/ProductionData.ashx?function=getYearProductionDataList',
    //产品生产数据表导出
    PRODUCTION_DATA_EXPORT: '/Ashx/ProductionDataExport.ashx?function=export',
    //周生产赋码情况导出
    PRODUCTION_DATA_WEEK_LIST_EXPORT: '/Ashx/Export.ashx?function=ProductionDataWeekListExport',
    //月生产赋码情况导出
    PRODUCTION_DATA_MONTH_LIST_EXPORT: '/Ashx/Export.ashx?function=ProductionDataMonthListExport',
    //年生产赋码情况导出
    PRODUCTION_DATA_YEAR_LIST_EXPORT: '/Ashx/Export.ashx?function=ProductionDataYearListExport',
    //标识替换列表
    GET_CODE_CHANGE_LIST: '/Ashx/CodeChange.ashx?function=getCodeChangeList',
    //标识替换
    CODE_CHANGE: '/Ashx/CodeChange.ashx?function=codeChange'
  },
  storage: {
    //获取入库列表
    GET_STOCK_IN_LIST: '/Ashx/WarehouseManagement.ashx?function=getStockInList',
    //导出入库列表
    EXPORT_STOCK_IN_LIST: '/Ashx/Export.ashx?function=StockExport',
    //入库
    STOCK_IN: '/Ashx/WarehouseManagement.ashx?function=stockIn',
    //其他入库
    GET_STOCK_IN_OTHER_LIST: '/Ashx/WarehouseManagement.ashx?function=getOtherStockInList',
    //其他入库添加
    STOCK_IN_OTHER: '/Ashx/WarehouseManagement.ashx?function=otherStockIn',
    //其他入库导出
    EXPORT_STOCK_IN_OTHER_LIST: '/Ashx/Export.ashx?function=OtherStockExport',
    //出库列表
    GET_STOCK_OUT_LIST: '/Ashx/WarehouseManagement.ashx?function=getStockOutList',
    //出库发货
    STOCK_OUT: '/Ashx/WarehouseManagement.ashx?function=stockOut',
    //出库发货导出
    EXPORT_STOCK_OUT_LIST: '/Ashx/Export.ashx?function=StockOutExport',
    //其他出库
    GET_STOCK_OUT_OTHER_LIST: '/Ashx/WarehouseManagement.ashx?function=getOtherStockOutList',
    //其他出库添加
    STOCK_OUT_OTHER: '/Ashx/WarehouseManagement.ashx?function=otherStockOut',
    //其他出库导出
    EXPORT_STOCK_OUT_OTHER_LIST: '/Ashx/Export.ashx?function=OtherStockOutExport',
    //产品调货
    GET_STOCK_TRANSFER_PRODUCT_LIST: '/Ashx/WarehouseManagement.ashx?function=getTransferProductList',
    //产品调货添加
    STOCK_TRANSFER_PRODUCT: '/Ashx/WarehouseManagement.ashx?function=transferProduct',
    //产品调货导出
    EXPORT_STOCK_TRANSFER_PRODUCT_LIST: '/Ashx/Export.ashx?function=TransferWareHouseExport',
    //产品调仓
    GET_STOCK_TRANSFER_WAREHOUSE_LIST: '/Ashx/WarehouseManagement.ashx?function=getTransferWarehouseList',
    //产品调仓添加
    STOCK_TRANSFER_WAREHOUSE: '/Ashx/WarehouseManagement.ashx?function=transferWarehouse',
    //产品调仓导出
    EXPORT_STOCK_TRANSFER_WAREHOUSE_LIST: '/Ashx/Export.ashx?function=TransferProductExport',
    //产品退货
    GET_STOCK_RETURN_LIST: '/Ashx/WarehouseManagement.ashx?function=getReturnList',
    //产品退货添加
    STOCK_RETURN: '/Ashx/WarehouseManagement.ashx?function=stockReturn',
    //产品退货导出
    EXPORT_STOCK_RETURN_LIST: '/Ashx/Export.ashx?function=ReturnExport',
    //收货确认
    GET_STOCK_IN_CONFIRM_LIST: '/Ashx/WarehouseManagement.ashx?function=getConfirmationList',
    //收货确认添加
    STOCK_IN_CONFIRM: '/Ashx/WarehouseManagement.ashx?function=stockInConfirm',
    //收货确认导出
    EXPORT_STOCK_IN_CONFIRM_LIST: '/Ashx/Export.ashx?function=ReceivingConfirmationExport',
    //库存盘点
    GET_STOCK_CHECK_TASK_LIST: '/Ashx/WarehouseManagement.ashx?function=getStockCheckList',
    //库存新建任务
    STOCK_CHECK_TASK: '/Ashx/WarehouseManagement.ashx?function=stockCheckTask',
    //库存盘点明细
    GET_STOCK_DETAIL_LIST: '/Ashx/WarehouseManagement.ashx?function=getStockTakingDetailList',
    //库存盘点报表
    GET_STOCK_CHECK_LIST: '/Ashx/WarehouseManagement.ashx?function=getStockTakingReportList',
    //完成任务
    SAVE_FINISH_TASK: '/Ashx/WarehouseManagement.ashx?function=stockFinishTask',
    //取消任务
    SAVE_CANCEL_TASK: '/Ashx/WarehouseManagement.ashx?function=stockCancelTask',
    //盘点任务导出
    EXPORT_STOCK_CHECK_TASK_LIST: '/Ashx/Export.ashx?function=StockCheckExport',
    //盘点明细导出
    EXPORT_TAKING_DETAIL_LIST: '/Ashx/Export.ashx?function=TakingDetailExport',
    //盘点报表导出
    EXPORT_CONFIRMATION_LIST: '/Ashx/Export.ashx?function=ConfirmationExport'
  },
  inventory: {
    //总部库存汇总
    GET_INVENTORY_LIST: '/Ashx/Inventory.ashx?function=getHeadSummary',
    //经销商，门店库存汇总
    GET_DEALER_LIST: '/Ashx/Inventory.ashx?function=getSummary',
    //总部库存数据导出
    EXPORT_HEADSUMMARY: '/Ashx/Export.ashx?function=HeadSummaryExport',
    //经销商门店库存 汇总导出
    EXPORT_SUMMARY: '/Ashx/Export.ashx?function=SummaryExport',
    //库存明细
    GET_DETAIL_LIST: '/Ashx/Inventory.ashx?function=getDetail',
    //总部库存明细导出
    EXPORT_DETAIL: '/Ashx/Export.ashx?function=DetailExport',
    //总部库存入库统计
    STOCK_LIST: '/Ashx/Inventory.ashx?function=getHeadStats',
    //.经销商，门店 入库出库统计
    STOCK_STATS_LIST: '/Ashx/Inventory.ashx?function=getStats',
    //总部 出入库统计
    EXPORT_STOCK: '/Ashx/Export.ashx?function=HeadStatsExport',
    //经销商门店出库存入库统计
    EXPORT_STOCK_STATS: '/Ashx/Export.ashx?function=StatsExport',
    //库存账统计列表
    GET_LEDGER_LIST: '/Ashx/Inventory.ashx?function=getStockLedger',
    //库存账统计列表入库明细
    GET_LEDGER_DETAIL: '/Ashx/Inventory.ashx?function=getStockLedgerDetali',
    //库存账统计列表出库明细
    GET_LEDGER_DETAIL_OUT: '/Ashx/Inventory.ashx?function=getStockLedgerDetaliOut',
    //库存账统计列表导出
    EXPORT_LEDGER: '/Ashx/Export.ashx?function=StockLedgerExport',
    //台账查询列表
    GET_LOGISTICS_LIST: '/Ashx/Inventory.ashx?function=getLogisticsHistory',
    //台账查询列表导出
    EXPORT_LOGISTICS: '/Ashx/Export.ashx?function=LogisticsHistoryExport'
  },
  //自动完成组件数据接口
  autoComplete: {
    //库房
    STOCK_HOUSE: '/Ashx/AutoComplete.ashx?function=LookupStockHouse',
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //产品
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //产品批次
    PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupProductBatch',
    //用户
    USER: '/Ashx/AutoComplete.ashx?function=LookupUser',
    //员工
    EMPLOYEE: '/Ashx/AutoComplete.ashx?function=lookupEmployee'
  }
};
