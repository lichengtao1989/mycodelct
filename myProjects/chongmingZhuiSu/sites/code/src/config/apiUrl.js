export default {
  common: {
    //发送短信验证码
    SEND_SMS_CODE: '/Ashx/Common.ashx?function=getSmsCode',
    //验证短信验证码
    CHECK_SMS_CODE: '/Ashx/Common.ashx?function=checkSmsCode'
  },
  autoComplete: {
    //组织
    CORP: '/Ashx/AutoComplete.ashx?function=LookupCorp',
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //产品
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //产品批次
    PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupProductBatch',
    //码关联产品
    LOOKUP_CORRELATIVE_PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupCorrelativeProduct',
    //标签样式
    STICKER: '/Ashx/AutoComplete.ashx?function=LookupSticker',
    //生码批次
    LOOK_UP_CODE_GENERATION: '/Ashx/AutoComplete.ashx?function=LookupCodeGeneration'
  },
  //组织
  corp: {
    //获取组织信息
    GET: '/Ashx/corp.ashx?function=get'
  },
  //码分配
  codeOrgAssign: {
    LIST: '/Ashx/CodeOrgAssign.ashx?function=getCodeOrgAssign',
    EXPORT: '/Ashx/Export.ashx?function=CodeOrgAssignExport'
  },
  //码关联统计
  codeRelationStatistics: {
    //码综合
    GET_CODE_STATISTICS_GENERAL: '/Ashx/CodeStatistics.ashx?function=getCodeStatisticsGeneral',

    //码使用率统计图 表格
    GET_CODE_SCAN_RATE_LIST: '/Ashx/CodeStatistics.ashx?function=getCodeScanRateStatisticsList',
    //码使用率统计图 图表
    GET_CODE_SCAN_RATE_LIST_CHART: '/Ashx/CodeStatistics.ashx?function=getCodeScanRateStatisticsListForGraph',
    //码关联企业统计图 表格
    GET_CODE_RELATION_CORP_LIST: '/Ashx/CodeStatistics.ashx?function=getCodeRelationCorpStatisticsList',
    //码关联企业统计图 图表
    GET_CODE_RELATION_CORP_LIST_CHART: '/Ashx/CodeStatistics.ashx?function=getCodeRelationCorpStatisticsListForGraph',
    //码关联产品统计图 表格
    GET_CODE_RELATION_PRODUCT_LIST: '/Ashx/CodeStatistics.ashx?function=getCodeRelationProdutStatisticsList',
    //码关联产品统计图 图表
    GET_CODE_RELATION_PRODUCT_LIST_CHART: '/Ashx/CodeStatistics.ashx?function=getCodeRelationProdutStatisticsListForGraph',

    //码使用率导出
    EXPORT_CODE_SCAN_RATE: '/Ashx/Export.ashx?function=CodeScanRateStatisticsListExport',
    //码关联企业导出
    EXPORT_CODE_RELATION_CORP: '/Ashx/Export.ashx?function=CodeRelationCorpStatisticsExport',
    //码关联产品导出
    EXPORT_CODE_RELATION_PRODUCT: '/Ashx/Export.ashx?function=CodeRelationProdutStatisticsListExport'
  },
  //码关联
  codeCorrelation: {
    //码关联列表查询
    GET_LIST: '/Ashx/CodeRelate.ashx?function=getCodeRelate',
    //获取码关联数量
    GET_LOGISTICS_CODE_COUNT: '/Ashx/CodeRelate.ashx?function=getLogisticsCodeCount',
    //码关联保存
    SAVE_LOGISTICS_CODE_BIND: '/Ashx/CodeRelate.ashx?function=saveLogisticsCodeBind',
    //码关联重置
    RESET_LOGISTICS_CODE_BIND: '/Ashx/CodeRelate.ashx?function=resetLogisticsCodeBind',
    //验证码关联是否已经存在有关联的记录
    CHECK_IS_EXIST_LOGISTICS_CODE_BIND: '/Ashx/CodeRelate.ashx?function=checkIsExistLogisticsCodeBind',
    //导出
    CODE_RELATE_EXPORT: '/Ashx/export.ashx?function=CodeRelate'
  },
  //码查询
  codeSearch: {
    //生码信息
    GET_CODE_INFO: '/Ashx/IdentityCodeQuery.ashx?function=getCodeInfo',
    //窜货查询
    GET_LOGISTICS_QUERY: '/Ashx/IdentityCodeQuery.ashx?function=getLogisticsQuery',
    //防伪码与物流码互查
    GET_MUTUAL_CHECK_RECOGNITION: '/Ashx/IdentityCodeQuery.ashx?function=getMutualCheckRecognition',
    //列出整箱
    BOX_LIST_QUERY: '/Ashx/IdentityCodeQuery.ashx?function=boxListQuery',
    //码嵌套历史查询
    GET_PRODUCT_DATA_HISTORY_LIST: '/Ashx/IdentityCodeQuery.ashx?function=getProductDataHistoryList',
    //台账查询列表
    GET_LOGISTICS_HISTORY: '/Ashx/IdentityCodeQuery.ashx?function=getLogisticsHistory',
    //防伪查询记录
    GET_ANTI_FAKE_LIST: '/Ashx/AntifakeQuery.ashx?function=getList',
    //积分充值记录
    GET_CODE_INTEGRAL_RECHARGE_RECORD: '/Ashx/CodeIntegralRechargeRecord.ashx?function=getCodeIntegralRechargeRecord'
  },
  //生码
  codeGeneration: {
    //列表
    GET_LIST: '/Ashx/CodeGeneration.ashx?function=getList',
    //获取生码批次信息
    GET: '/Ashx/CodeGeneration.ashx?function=get',
    //获取企业下一批批次号
    GET_NEXT_BATCH_ID: '/Ashx/CodeGeneration.ashx?function=getNextbatchId',
    //保存生码批次
    SAVE: '/Ashx/CodeGeneration.ashx?function=save',
    //删除生码批次
    DELETE: '/Ashx/CodeGeneration.ashx?function=delete',
    //提交生码批次
    COMMIT: '/Ashx/CodeGeneration.ashx?function=commit',
    //审核生码批次
    APPROVE: '/Ashx/CodeGeneration.ashx?function=approve',
    //获取变更信息
    GET_ALTERATION: '/Ashx/CodeGeneration.ashx?function=getAlteration',
    //变更审核
    ALTER_APPROVE: '/Ashx/CodeGeneration.ashx?function=alterapprove',
    //获取工厂列表
    GET_FACTORY_LIST: '/Ashx/CodeGeneration.ashx?function=getFactoryList',
    //导出
    EXPORT: '/Ashx/CodeGeneration.ashx?function=export',
    //获取加密狗信息
    GET_USB_KEY_CONFIG: '/Ashx/CodeGeneration.ashx?function=getUSBKeyConfig',
    //列表（组织）
    GET_LIST_FOR_CORP: '/Ashx/CodeGeneration.ashx?function=getListForCorp',
    //获取生码批次信息（组织）
    GET_FOR_CORP: '/Ashx/CodeGeneration.ashx?function=getForCorp',
    //保存生码批次（组织）
    SAVE_FOR_CORP: '/Ashx/CodeGeneration.ashx?function=saveForCorp',
    //防伪列表验证
    ANTI_FAKE_VERIFY: '/Ashx/BlockChain.ashx?function=antifakeVerify',
    //产品
    GET_PRODUCT: '/Ashx/product.ashx?function=getProductListForAdmin'
  },
  //OID管理
  oid: {
    //获取列表
    GET_LIST: '/Ashx/product.ashx?function=getOIDList',
    //获取详情
    GET: '/Ashx/product.ashx?function=getOID',
    //保存
    SAVE: '/Ashx/product.ashx?function=addOrEditOID'
  },
  //π生码管理
  codePaiGeneration: {
    //获取列表
    GET_LIST: '/Ashx/CodeGeneration.ashx?function=getPIList',
    //获取编辑详情
    GET_DETAIL: '/Ashx/CodeGeneration.ashx?function=getpiconfig',
    //保存配置项
    SAVE_CONFIG: '/Ashx/CodeGeneration.ashx?function=savepiconfig',
    //上传文件路径
    UPLOAD_FILE_URL: '/Ashx/CodeGeneration.ashx?function=uploadpicode',
    //复制配置项提交
    COPY_CONFIG_SUBMIT: '/Ashx/CodeGeneration.ashx?function=copyPIConfig'
  },
  //生产订单
  productionOrder: {
    //获取生产订单列表
    GET_ORDER_LIST: '/Ashx/CodeProductionOrder.ashx?function=getList',
    //获取生产订单详情
    GET_DETAIL: '/Ashx/CodeProductionOrder.ashx?function=get',
    //保存生产订单
    SAVE_DATA: '/Ashx/CodeProductionOrder.ashx?function=save',
    //获取跟单列表
    GET_DOCUMENTARY_LIST: '/Ashx/CodeProductionOrder.ashx?function=getDocumentaryList',
    //获取生产订单列表
    GET_PRODUCTION_OREDER_LIST: '/Ashx/CodeGeneration.ashx?function=getList&isProductionOrder=2',
    //删除生产订单
    DELETE_PRODUCTION_OREDER: '/Ashx/CodeGeneration.ashx?function=delete',
    //获取工厂
    GET_FACTORY_LIST: '/Ashx/CodeGeneration.ashx?function=getFactoryListNew',
    //删除生产订单
    DELETE_ORDER: '/Ashx/CodeProductionOrder.ashx?function=delete',
    //提交生产订单
    COMMIT_ORDER: '/Ashx/CodeProductionOrder.ashx?function=commit',
    //打印预览
    PRINT_PREVIEW: '/Ashx/CodeProductionOrder.ashx?function=preview',
    //复制订单
    COPY_ORDER: '/Ashx/CodeProductionOrder.ashx?function=copy',
    //撤销标识
    CANCEL_ORDER: '/Ashx/CodeGeneration.ashx?function=productionOrderApprove',
    //生产订单标签上传附件
    UPLOAD_FILES: '/Ashx/CodeGeneration.ashx?function=uploadAttchment',
    //订单明细列表
    ORDER_DETAIL_LIST: '/Ashx/CodeProductionOrder.ashx?function=getExportList',
    //订单明细列表导出
    ORDER_DETAIL_LIST_EXPORT: '/Ashx/Export.ashx?function=CodeProductionOrder',
    //待生码列表
    WAIT_GET_LIST: '/Ashx/CodeGeneration.ashx?function=getList&status=-2&isProductionOrder=1',
    //保存跟单
    SAVE_DOCUMENTARY: '/Ashx/CodeProductionOrder.ashx?function=saveDocumentary',
    //获取跟单详情
    GET_DOCUMENTARY: '/Ashx/CodeProductionOrder.ashx?function=getDocumentary',
    //审核标识
    APPROVE: '/Ashx/CodeGeneration.ashx?function=productionOrderApprove',
    //跟单表导出
    EXPORT_DOCUMENTARY: '/Ashx/export.ashx?function=Documentary'
  }
};
