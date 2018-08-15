export default {
  autoComplete: {
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //组织
    CORP: '/Ashx/AutoComplete.ashx?function=LookupCorp',
    //获取检测公司关联的企业
    CORPEX: '/Ashx/AutoComplete.ashx?function=LookupCorpEx',
    //供应商
    SUPPLIER: '/Ashx/AutoComplete.ashx?function=LookupSupplier',
    //员工
    EMPLOYEE: '/Ashx/AutoComplete.ashx?function=lookupEmployee',
    //投入品
    INPUTS: '/Ashx/AutoComplete.ashx?function=LookupInputsInfo',
    //监控
    MONITOR: '/Ashx/AutoComplete.ashx?function=LookupCameraDevice',
    //产品
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //产品2
    CHECK_PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupCheckProduct',
    //产品批次
    PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupProductBatch',
    //产品批次2
    PRODUCT_BATCH_EX: '/Ashx/AutoComplete.ashx?function=LookupProductBatchEx',
    //溯源节点
    TRACE_NODE_CONFIG: '/Ashx/AutoComplete.ashx?function=LookupTraceNodeConfig',
    //溯源树模板
    TRACE_TREE_TEMPLET: '/Ashx/AutoComplete.ashx?function=LookupTreeTemplet',
    //采购商
    PURCHASER: '/Ashx/AutoComplete.ashx?function=LookupPurchaser',
    //地块
    PLOTS: '/Ashx/AutoComplete.ashx?function=LookupPlots',
    //用户
    USER: '/Ashx/AutoComplete.ashx?function=LookupUser',
    //设备类型
    DEVICE: '/Ashx/AutoComplete.ashx?function=LookupDevice',
    //气象专用组织
    WEATHER_CORP: '/Ashx/AutoComplete.ashx?function=LookupCorp',
    //区域
    AREA: '/Ashx/AutoComplete.ashx?function=LookupArea',
    //用于审批流数据隔离的产品
    PRODUCT_ORG: '/Ashx/AutoComplete.ashx?function=LookupCheckProductDown',
    //用于审批流的产品批次的数据隔离
    PRODUCT_BATCH_ORG: '/Ashx/AutoComplete.ashx?function=LookupProductBatchExDown'
  },
  //投入品
  inputs: {
    //获取入库列表
    GET_STOCK_IN_LIST: '/Ashx/InputsStock.ashx?function=getInputsStockInList',
    //导出入库列表
    EXPORT_STOCK_IN_LIST: '/Ashx/Export.ashx?function=InputsStockExport',
    //入库
    STOCK_IN: '/Ashx/InputsStock.ashx?function=inputsStockIn',
    //获取入库统计列表
    GET_STOCK_IN_STATISTICS_LIST: '/Ashx/InputsStock.ashx?function=getInputsStockInStatisticsList',
    //导出入库统计列表
    EXPORT_STOCK_IN_STATISTICS_LIST: '/Ashx/Export.ashx?function=InputsStockCountExport',
    //获取出库列表
    GET_STOCK_OUT_LIST: '/Ashx/InputsStock.ashx?function=getInputsStockOutList',
    //导出出库列表
    EXPORT_STOCK_OUT_LIST: '/Ashx/Export.ashx?function=InputsStockOutExport',
    //出库
    STOCK_OUT: '/Ashx/InputsStock.ashx?function=inputsStockOut',
    //获取出库统计列表
    GET_STOCK_OUT_STATISTICS_LIST: '/Ashx/InputsStock.ashx?function=getInputsStockOutStatisticsList',
    //导出出库统计列表
    EXPORT_STOCK_OUT_STATISTICS_LIST: '/Ashx/Export.ashx?function=InputsStockOutStatisticsExport',
    //获取投入品所有批次的库存数量
    GET_BATCH_STOCK_QUANTITY: '/Ashx/InputsStock.ashx?function=getStockQuantity',
    //获取投入品库存统计列表
    GET_STOCK_STATISTICS_LIST: '/Ashx/InputsStock.ashx?function=getInputStatisticsList',
    //导出投入品库存统计列表
    EXPORT_STOCK_STATISTICS_LIST: '/Ashx/Export.ashx?function=InputStatisticsExport',
    //获取库存明细列表
    GET_STOCK_DETAIL_LIST: '/Ashx/InputsStock.ashx?function=getInputStatisticsDetialList'
  },
  //地块资料
  plots: {
    //获取入库列表
    GET_LIST: '/Module/Plots/PlotsList.aspx?response=json&function=getList'
  },
  //保险理赔
  insurance: {
    relate: {
      //获取关联保险列表
      GET_LIST: '/Ashx/CodeRelateInsure.ashx?function=getList',
      //添加关联保险
      ADD: '/Ashx/CodeRelateInsure.ashx?function=add',
      //获取关联保险详情
      GET_CHECK: '/Ashx/CodeRelateInsure.ashx?function=getDetail',
      //获取剩余保险数量
      GET_REMAIN: '/Ashx/CodeRelateInsure.ashx?function=getRemainInsureCount',
      //获取当前码数量
      GET_CURRENT: '/Ashx/CodeRelateInsure.ashx?function=getCurrentCodeCount',
      //获取产品列表
      GET_PRODUCT: '/Ashx/CodeRelateInsure.ashx?function=getProductList',
      //获取产品批次列表
      GET_PRODUCT_BATCH: '/Ashx/CodeRelateInsure.ashx?function=getProductBatchList',
      //导出关联码
      GET_RELATE_CODE_EXPORT: '/Ashx/Export.ashx?function=CodeRelateInsureExport',
      //获取当前已有已激活的保险类型
      GET_INSURE_TYPE: '/Ashx/CodeRelateInsure.ashx?function=getInsureType',
      //获取搜索框的产品
      QUERY_PRODUCT_LIST: '/Ashx/CodeRelateInsure.ashx?function=getQueryProductList',
      //获取搜索框的批次
      QUERY_PRODUCT_BATCH_LIST: '/Ashx/CodeRelateInsure.ashx?function=getQueryProductBatchList'
    },
    claim: {
      //理赔列表
      GET_LIST: '/Ashx/InsuranceCompensation.ashx?function=getList',
      //获取理赔详情
      GET_CHECK: '/Ashx/InsuranceCompensation.ashx?function=getDetail',
      //理赔审核
      AUDIT: '/Ashx/InsuranceCompensation.ashx?function=audit',
      //判断是否是企业登录
      CHECK_LOGIN: '/Ashx/InsuranceCompensation.ashx?function=checkLogin'
    },
    insureApplication: {
      //获取保险公司
      GET_INSURE_CORP_LIST: '/Ashx/Insure.ashx?function=getInsureCorpList',
      //机构名称--保险理赔
      GET_ORG_SELECT_LIST: '/Ashx/Insure.ashx?function=getOrgSelectList',
      //产品名称--投保详情
      GET_PRODUCT_SELECT_LIST: '/Ashx/Insure.ashx?function=getProductSelectList',
      //获取理赔详情
      GET_INSURE_APPLICATION: '/Ashx/Insure.ashx?function=getInsureApplication',
      //所选的机构ID，去获取最近的一笔已承保的机构信息
      GET_ORG_SELECT: '/Ashx/Insure.ashx?function=getOrgSelect',
      //获取保险公司的基本配置项
      GET_INSURE_BASIC_CONFIG: '/Ashx/Insure.ashx?function=getInsureBasicConfig',
      //保存草稿/提交
      SAVE: '/Ashx/Insure.ashx?function=save',
      //获取投保列表
      GET_LIST: '/Ashx/Insure.ashx?function=getList',
      //导出投保列表
      EXPORT_INSURE: '/Ashx/Export.ashx?function=InsureExport',
      //删除保单
      DELETE_INSURE: '/Ashx/Insure.ashx?function=del',
      //产品名称--已承保
      GET_PRODUCT_AUDIT_LIST: '/Ashx/Insure.ashx?function=getProductAuditList',
      //保险公司--审核
      AUDIT: '/Ashx/Insure.ashx?function=audit',
      //激活保险
      ACTIVATE: '/Ashx/Insure.ashx?function=activate',
      //数据图表
      GET_DATA_STATISTICS: '/Ashx/Insure.ashx?function=getDataStatistics'
    }
  },
  //溯源树
  traceTree: {
    //获取模板列表
    GET_TEMPLET_LIST: '/Ashx/TraceNode.ashx?function=getTempletList',
    //获取模板信息
    GET_TEMPLET: '/Ashx/TraceNode.ashx?function=getTemplet',
    //保存模板
    SAVE_TEMPLET: '/Ashx/TraceNode.ashx?function=saveTemplet',
    //删除模板
    DELETE_TEMPLET: '/Ashx/TraceNode.ashx?function=deleteTemplet',
    //获取溯源树列表
    GET_LIST: '/Ashx/TraceNode.ashx?function=getTreeList',
    //获取溯源树信息
    GET: '/Ashx/TraceNode.ashx?function=getTree',
    //保存溯源树
    SAVE: '/Ashx/TraceNode.ashx?function=saveTree',
    //删除溯源树
    DELETE: '/Ashx/TraceNode.ashx?function=deleteTree'
  },
  //品质监管
  productTesting: {
    //获取检测产品列表
    GET_PRODCUT_TEST_LIST: '/Ashx/ProductTesting.ashx?function=GetProductTestingList',
    //获取检测产品列表
    GET_PRODCUT_TEST: '/Ashx/ProductTesting.ashx?function=GetProductTesting',
    //新增或修改检测产品
    ADD_OR_EDIT: '/Ashx/ProductTesting.ashx?function=AddOrEditProductTesting',
    //删除检测产品
    DELETE_TEST: '/Ashx/ProductTesting.ashx?function=DeleteProductTesting',
    //获取检测标准
    GET_TEST_STANDARD: '/Ashx/ProductTesting.ashx?function=GetTestingStandard',
    //获取下载文件列表
    GET_TEST_DOWNLOAD_LIST: '/Ashx/ProductTesting.ashx?function=GetTestingDownloadFilesInfo',
    //获取检测项
    GET_TEST_TYPE: '/Ashx/ProductTesting.ashx?function=GetTestingType',
    //检测项列表
    GET_TEST_TYPE_List: '/Ashx/ProductTesting.ashx?function=getTestingTypeList',
    //获取单个检测项
    EDIT_TEST_TYPE: '/Ashx/ProductTesting.ashx?function=getTestingTypeById',
    //保存检测项
    SAVE_TEST_TYPE: '/Ashx/ProductTesting.ashx?function=addOrEditTestingType',
    //修改检测项状态
    SET_TEST_TYPE_Valid: '/Ashx/ProductTesting.ashx?function=setTestingTypeValid',
    //获取质量检测记录列表
    GET_QUALITYINSPECTION_LIST: '/Ashx/QualityInspection.ashx?function=getList',
    //质量检测记录列表导出
    QUALITYINSPECTION_LIST_EXPORT: '/Ashx/QualityInspectionExport.ashx?function=QualityInspectionExport',
    //质量检测记录列表导入
    QUALITYINSPECTION_LIST_IMPORT: '/Ashx/QualityInspection.ashx?function=import'
  },
  //溯源节点
  traceNode: {
    //获取溯源节点配置列表
    GET_TRACENODE_CONFIG_LIST: '/Ashx/Trace.ashx?function=getTraceNodeConfigList',
    //获取溯源节点配置详情
    GET_CONFIG_SINGLE: '/Ashx/Trace.ashx?function=getConfigSingle',
    //保存溯源节点配置详情
    SAVE_CONFIG: '/Ashx/Trace.ashx?function=saveConfig',
    //获取产品列表
    TRACE_PRODUCT_LIST: '/Ashx/AutoComplete.ashx?function=LookupProductEx',
    //获取角色权限
    GET_USER_RULE_LIST: '/Ashx/AutoComplete.ashx?function=LookupRole',
    //新增溯源配置
    ADD_CONFIG: '/Ashx/Trace.ashx?function=addConfig',
    //获取类目列表
    GET_CATE_LIST: '/Ashx/product.ashx?function=getCatelist',
    //通过类目获取溯源节点信息
    GET_LIST_BY_CATE: '/Ashx/Trace.ashx?function=getListByCate',
    //通过类目添加溯源节点信息
    ADD_FROM_NODE_CONFIG: '/Ashx/Trace.ashx?function=addFromNodeConfig',
    //有溯源节点的产品列表
    TRACE_NODE_PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupTraceNodeProduct',
    //溯源节点产品列表
    TRACE_NODE_PRODUCT_LIST: '/Ashx/product.ashx?function=getTraceProductList',
    //溯源节点列表删除功能
    DELETE_CONFIG_BY_PRODUCT: '/Ashx/Trace.ashx?function=deleteConfigByProduct',
    //删除溯源节点
    DELETE_TRACE_NODE: '/Ashx/Trace.ashx?function=deleteConfig',
    //保存溯源节点排序
    SAVE_NODE_SORT: '/Ashx/Trace.ashx?function=setSort',
    //通过基地或基地分区获取溯源节点信息
    GET_LIST_BY_BASE: '/Ashx/Trace.ashx?function=getListByBase',
    //通过基地或基地分区获取溯源节点信息
    GET_LIST_BY_PLOTS: '/Ashx/Trace.ashx?function=getConfigListByPlots'
  },
  traceRecord: {
    //获取溯源记录列表
    GET_LIST: '/Ashx/ProductBatch.ashx?function=getTraceRecordList',
    //获取溯源数据详情列表
    GET_DETAIL_LIST: '/Ashx/Trace.ashx?function=getDataList',
    //删除溯源记录列表数据
    DELETE_TRACE_RECORD: '/Ashx/Trace.ashx?function=deleteNodeByProductBatch',
    //保存单个溯源节点H5是否隐藏
    SAVE_NODE_H5_HIDE: '/Ashx/Trace.ashx?function=setShowHidden',
    //添加溯源数据
    ADD_NODE: '/Ashx/Trace.ashx?function=addNode',
    //保存溯源数据
    SAVE_NODE: '/Ashx/Trace.ashx?function=saveNode',
    //获取溯源节点配置列表
    GET_NODE_CONFIG: '/Ashx/Trace.ashx?function=getTraceNodeConfigList',
    //获取溯源节点单个配置
    GET_NODE_CONFIG_SIGLE: '/Ashx/Trace.ashx?function=getConfigSingle',
    //添加溯源配置
    ADD_NODE_CONFIG: '/Ashx/Trace.ashx?function=addNode',
    //删除溯源节点信息
    DELETE_NODE_CONFIG: '/Ashx/Trace.ashx?function=deleteNode',
    //获取单个溯源数据
    GET_NODE_DATA_SIGLE: '/Ashx/Trace.ashx?function=getDataSingle',
    //设置溯源信息排序类型
    SET_TEACE_NODE_ORDER_TYPE: '/Ashx/Trace.ashx?function=setTraceNodeOrderType',
    //溯源信息节点验证
    TRACE_NODE_VERIFY: '/Ashx/BlockChain.ashx?function=traceNodeVerify',
    //保存H5折叠配置
    SET_FOLD: '/Ashx/Trace.ashx?function=setFold',
    //保存H5折叠配置
    GET_FOLD: '/Ashx/Trace.ashx?function=getFold',
    //获取员工详细信息
    GET_EMPLOYEE_INFO: '/Ashx/Trace.ashx?function=GetEmployee'
  },
  cameraDevice: {
    //设备列表
    GET_LIST: '/Ashx/CameraDevice.ashx?function=getSaiShangList',
    SAVE: '/Ashx/CameraDevice.ashx?function=saveSaiShangCamera',
    DELETE: '/Ashx/CameraDevice.ashx?function=deleteSaiShangCamera'
  },
  //合格证
  certificate: {
    //获取合格证模板列表
    GET_TEMPLTE_LIST: '/Ashx/ElectronicCertificate.ashx?function=getTempletList',
    //保存合格证模板
    SAVE_TEMPLTE: '/Ashx/ElectronicCertificate.ashx?function=templetSave',
    //编辑
    GET_TEMPLTE: '/Ashx/ElectronicCertificate.ashx?function=getTempletInfo',
    //删除模板
    REMOVE_TEMPLTE: '/Ashx/ElectronicCertificate.ashx?function=removeTemplet',
    //获取合格证模板列表
    GET_LIST: '/Ashx/ElectronicCertificate.ashx?function=getList',
    //获取合格证打印信息
    GET: '/Ashx/ElectronicCertificate.ashx?function=getInfo',
    //保存打印记录
    SAVE: '/Ashx/ElectronicCertificate.ashx?function=savePrintRecord',
    //导出列表
    EXPORT_LIST: '/Ashx/ElectronicCertificateExport.ashx',
    //批量删除
    REMOVE: '/Ashx/ElectronicCertificate.ashx?function=remove',
    //产品分类
    PRODUCT_CALSSIFY: '/Ashx/product.ashx?function=getClassifyList'
  },
  //气象站管理
  weather: {
    //获取气象站列表
    GET_LIST: '/Ashx/Weather.ashx?function=getStationList',
    //获取单个气象站信息
    GET_STATION: '/Ashx/Weather.ashx?function=getStation',
    //保存气象站信息
    SAVE: '/Ashx/Weather.ashx?function=saveStation',
    //删除气象站信息
    DELETE: '/Ashx/Weather.ashx?function=deleteStation',
    //禁用启用气象站信息
    SET_STATUS: '/Ashx/Weather.ashx?function=setStatus',
    //获取最新气象信息
    GET_RECORD: '/Ashx/Weather.ashx?function=getLatestWeatherRecord',
    //气象一体机导出
    EXPORT: '/Ashx/Export.ashx?function=WeatherExport',
    //国家气象导出
    COUNTRY_EXPORT: '/Ashx/Export.ashx?function=CountryWeatherExport',
    //根据类型获取气象信息
    GET_DAY_INFO: '/Ashx/Weather.ashx?function=getWeatherAllDayInfoByType',
    //获取墨迹天气十五天预报
    GET_MOJI_API: '/Ashx/Weather.ashx?function=getWeatherForecastMojiApi',
    //空气质量AQI3天
    GET_AQI_API: '/Ashx/Weather.ashx?function=getWeatherAQIForecast3DaysMojiApi'
  },
  //一体机配置
  queryPageConfiguration: {
    GET_LIST: '/Ashx/QueryPageConfiguration.ashx?function=getList',
    GET_DETAIl: '/Ashx/QueryPageConfiguration.ashx?function=get',
    SAVE: '/Ashx/QueryPageConfiguration.ashx?function=save'
  },
  //审批流
  approval: {
    //审核配置列表
    GET_LIST: '/Ashx/Review.ashx?function=getConfigList',
    //获取审核配置详情
    GET_DETAIl: '/Ashx/Review.ashx?function=getConfig',
    //审核配置保存
    SAVE: '/Ashx/Review.ashx?function=saveConfig',
    //审核配置删除
    DELETE: '/Ashx/Review.ashx?function=deleteConfig',
    //获取审核申请列表
    GET_APPLY_LIST: '/Ashx/Review.ashx?function=getApplyList',
    //获取审核申请详细信息
    GET_APPLY: '/Ashx/Review.ashx?function=getApply',
    //审核申请保存
    SAVE_APPLY: '/Ashx/Review.ashx?function=saveApply',
    //撤销审核申请
    CANCEL_APPLY: '/Ashx/Review.ashx?function=cancelApply',
    //获取当前企业的审批配置ID
    GET_REVIEW_CONFIGID: '/Ashx/Review.ashx?function=getReviewConfigID',
    //审批
    REVIEW_APPLY: '/Ashx/Review.ashx?function=reviewApply',
    //导出
    REVIEW_EXPORT: '/Ashx/export.ashx?function=Review'
  },
  //基地管理
  baseManagement: {
    //获取基地列表
    GET_LIST: '/Ashx/BaseManagement.ashx?function=getBaseList',
    // 基地详情查看
    GET_DETAILED: '/Ashx/BaseManagement.ashx?function=getDetailed',
    //基地保存
    SAVE: '/Ashx/BaseManagement.ashx?function=save',
    //基地状态修改
    UPDATE_STATUS: '/Ashx/BaseManagement.ashx?function=updateStatus',
    //基地分区保存
    SAVE_BASE_AREA: '/Ashx/BaseManagement.ashx?function=saveBaseArea',
    //获取基地分区列表
    GET_BASE_LIST: '/Ashx/BaseManagement.ashx?function=getBaseAreaList',
    // 基地分区详情
    GET_AREA_DETAILED: '/Ashx/BaseManagement.ashx?function=getAreaDetailed',
    // 删除基地分区
    DELETE_BASE_AREA: '/Ashx/BaseManagement.ashx?function=deleteBaseArea'
  },
  //农事管理
  FarmingManagement: {
    EXPORT: '/Ashx/Export.ashx?function=FarmingExport',
    IMPORT: '/Ashx/FarmingManagement.ashx?function=import',
    LIST: '/Ashx/FarmingManagement.ashx?function=GetFarmingList',
    DETAIL: '/Ashx/FarmingManagement.ashx?function=GetFarmingDetailed',
    ADD: '/Ashx/FarmingManagement.ashx?function=SaveFarming',
    DELETE: '/Ashx/FarmingManagement.ashx?function=DeleteFarming',
    BASEAREA: '/Ashx/AutoComplete.ashx?function=lookupBaseArea',
    BASEAREALIST: '/Ashx/BaseManagement.ashx?function=getBaseList',
    TYPE: '/Ashx/AutoComplete.ashx?function=lookupFarmingType',
    TYPELIST: '/Ashx/FarmingType.ashx?function=GetFarmingTypeList',
    TYPEADD: '/Ashx/FarmingType.ashx?function=SaveFarmingType',
    TYPEDELETE: '/Ashx/FarmingType.ashx?function=DeleteFarmingType'
  },
  // 监测设备
  monitorDevice: {
    GET_LIST: '/Ashx/BaseManagement.ashx?function=getPlotsDeviceList',
    SAVE: '/Ashx/BaseManagement.ashx?function=savePlotsDevice',
    GET_DETAIL: '/Ashx/BaseManagement.ashx?function=getPlotsDeviceDetail',
    GET_DEVICE_LIST: '/Ashx/BaseManagement.ashx?function=getDeviceList'
  },
  //执法检查
  Law: {
    TOWNORG: '/Ashx/AutoComplete.ashx?function=lookupTownOrg',
    ADD: '/Ashx/LawEnforcement.ashx?function=save',
    DELETE: '/Ashx/LawEnforcement.ashx?function=del',
    LIST: '/Ashx/LawEnforcement.ashx?function=getlist',
    DETAIL: '/Ashx/LawEnforcement.ashx?function=get',
    ORGINFO: '/Ashx/AutoComplete.ashx?function=lookupOrgManager'
  }
};
