export default {
  autoComplete: {
    //库房
    STOCK_HOUSE: '/Ashx/AutoComplete.ashx?function=LookupStockHouse',
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //组织
    CORP2: '/Ashx/AutoComplete.ashx?function=LookupCorp',
    //供应商
    SUPPLIER: '/Ashx/AutoComplete.ashx?function=LookupSupplier',
    //员工
    EMPLOYEE: '/Ashx/AutoComplete.ashx?function=lookupEmployee',
    //用户
    USER: '/Ashx/AutoComplete.ashx?function=LookupUser',
    //产品(需筛选物流状态的产品)
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //产品批次
    PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupProductBatch',
    //组织
    CORP: '/Ashx/AutoComplete.ashx?function=LookupCorpEx',
    //采购商
    PURCHASER: '/Ashx/AutoComplete.ashx?function=LookupPurchaser',
    //地块
    PLOTS: '/Ashx/AutoComplete.ashx?function=LookupPlots',
    //产品(没有需筛选物流状态的产品)
    PRODUCT_EX: '/Ashx/AutoComplete.ashx?function=LookupProductEx',
    //产品(农产品溯源，需筛选审核通过的产品)
    AUDIT_PRODUCT_EX: '/Ashx/AutoComplete.ashx?function=LookupAuditProductExEntity',
    //产品(获取当前企业下所选机构的所有产品)
    ALL_PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupAllProduct',
    //产品批次
    ALL_PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupAllProductBatch',
    //产品批次获取基地
    LOOK_BASE: '/Ashx/AutoComplete.ashx?function=lookupBase',
    //产品批次获取基地
    LOOK_BASE_AREA: '/Ashx/AutoComplete.ashx?function=lookupBaseArea',
    //生码批次
    LOOK_UP_CODE_GENERATION: '/Ashx/AutoComplete.ashx?function=LookupCodeGeneration'
  },
  //员工
  employee: {
    EDIT: '/Ashx/Employee.ashx?function=save'
  },
  //供应商
  supplier: {
    EDIT: '/Ashx/Supplier.ashx?function=save'
  },
  //采购商
  purchaser: {
    EDIT: '/Ashx/Purchaser.ashx?function=save'
  },
  //类别管理
  powerCategory: {
    //获取类别列表
    GET_LIST: '/Ashx/Power.ashx?function=getPowerCategoryList',
    //保存类别
    EDIT: '/Ashx/Power.ashx?function=addOrEditPowerCategory',
    //删除类别
    DELELE: '/Ashx/Power.ashx?function=deletePower'
  },
  //功能管理
  power: {
    //获取权限功能信息
    GET: '/Ashx/Power.ashx?function=getPower',
    //获取功能权限信息列表
    GET_LIST: '/Ashx/Power.ashx?function=GetPowerList',
    //删除功能
    DELELE: '/Ashx/Power.ashx?function=deletePower',
    //保存功能
    EDIT: '/Ashx/Power.ashx?function=AddOrEditPower',
    //获取当前用户的权限
    GET_USER_POWER: '/Ashx/Power.ashx?function=GetUserOperatePowerCode'
  },
  //系统管理
  system: {
    //获取系统列表
    GET_LIST: '/Ashx/Power.ashx?function=getSystemSettingList',
    //新增或编辑系统
    EDIT: '/Ashx/Power.ashx?function=addOrEditSystemSetting',
    //单个系统管理配置信息
    GET: '/Ashx/Power.ashx?function=getSystemSetting',
    //更新系统配置项状态
    UPDATE_STATUS: '/Ashx/Power.ashx?function=UpdateSystemSettingStatus',
    //获取当前用户的系统列表
    GET_USER_SYSTEM_LIST: '/Ashx/Power.ashx?function=GetSystemElementsList'
  },
  //菜单管理
  menu: {
    //新增或编辑菜单或标签页或卡片页
    EDIT: '/Ashx/Power.ashx?function=addOrEditMenu',
    //批量菜单或标签页或卡片页
    ADD_BATCH: '/Ashx/Power.ashx?function=AddBatchMenu',
    //系统菜单结构列表
    GET_LIST: '/Ashx/Power.ashx?function=getDirectoryMenuList',
    // 获取上级菜单列表
    GET_PARENT_LIST: '/Ashx/Power.ashx?function=getParentMenuList',
    // 删除菜单或标签页或卡片页
    DELETE: '/Ashx/Power.ashx?function=deleteMenu',
    // 获取用户菜单
    GET_USER_MENU: '/Ashx/Power.ashx?function=getHomeMenu'
  },
  //产品批次
  productBatch: {
    //获取产品批次列表
    GET_PRODUCT_LIST: '/Ashx/ProductBatch.ashx?function=getProductBatchList',
    //批次 H5模板切换
    UPDATE_H5_MODE: '/Ashx/productBatch.ashx?function=updateH5Mode',
    //溯源类型切换
    SET_TRACE_TYPE: '/Ashx/productBatch.ashx?function=setTraceType',
    //获取监控地址是否为视频监控
    GET_CAMERALS_VIDEO: '/Ashx/productBatch.ashx?function=getCameraIsVideo',
    //批次删除
    DELETE: '/Ashx/productBatch.ashx?function=delete',
    //产品批次列表导出
    PRODUCT_BATCH_EXPORT: '/Ashx/Export.ashx?function=ProductBatchExport',
    //溯源列表验证
    TRACE_VERIFY: '/Ashx/BlockChain.ashx?function=traceVerify',
    //根据产品获取所属机构（政府企业）
    GET_PRODUCT_ORG: '/Ashx/productBatch.ashx?function=getProductOrg',
    //获取产品详细信息
    GET_PRODUCT_BATCH_INFO: '/Ashx/productBatch.ashx?function=getProductBatchInfo',
    //产品批次保存
    SAVE: '/Ashx/productBatch.ashx?function=saveProductBatch',
    //获取H5模板和信息展示
    GET_H5_MODEL: '/Ashx/productBatch.ashx?function=getH5Model'
  },
  //类目管理
  productCategory: {
    //获取类别列表
    GET_LIST: '/Ashx/product.ashx?function=getCatelist',
    //保存类别
    EDIT: '/Ashx/product.ashx?function=saveCategory',
    //获取单个类目信息
    GET_CATEGORY_INFO: '/Ashx/product.ashx?function=getCateSingle',
    //删除类别
    DELELE: '/Ashx/product.ashx?function=deleteCategory',
    //保存类目排序
    SAVE_CATEGORY_SORT: '/Ashx/product.ashx?function=categorySort',
    //获取溯源节点信息
    GET_TRACE_NODE: '/Ashx/Trace.ashx?function=getListByCate',
    //删除溯源节点
    DELETE_TRACE_NODE: '/Ashx/Trace.ashx?function=deleteConfig',
    //保存溯源节点排序
    SAVE_NODE_SORT: '/Ashx/Trace.ashx?function=setSort'
  },
  //监控管理
  monitorScreen: {
    //监控屏组织信息列表
    CONFIG_LIST: '/Ashx/MonitorScreen.ashx?function=getMonitorScreenGroupList',
    //新增监控屏配置内容
    CONFIG_SAVE: '/Ashx/MonitorScreen.ashx?function=save',
    //获取监控屏配置信息
    GET_CONFIG_INFO: '/Ashx/MonitorScreen.ashx?function=getMonitorScreenlode',
    //获取监控点列表
    GET_MONITOR_LIST: '/Ashx/MonitorScreen.ashx?function=getMonitorList',
    //获取监控屏登录TOKEN
    GET_MONITOR_TOKEN: '/Ashx/MonitorScreen.ashx?function=getToken',
    //设备列表
    GET_STATION_LIST: '/Ashx/Weather.ashx?function=getStationList',
    //获取气象指标
    GET_METEOROLOGICAL_INDICATORS: '/Ashx/MonitorScreen.ashx?function=getMeteorologicalIndicators'
  },
  //监控屏配置
  monitorScreenConfig: {
    CONFIG_LIST: '/Ashx/DataScreenConfig.ashx?function=getList',
    ADD_AND_MODIFY: '/Ashx/DataScreenConfig.ashx?function=save',
    GET_COMPONENT_LIST: '/Ashx/DataScreenConfig.ashx?function=getTemplateList',
    DELETE: '/Ashx/DataScreenConfig.ashx?function=delete'
  },
  //logo设置
  logo: {
    SAVE: '/Ashx/corp.ashx?function=setLogo'
  },
  //区块链
  blockChain: {
    //溯源区块链详情
    BLOCK_CHAIN_TRACE_DETAIL: '/Ashx/BlockChain.ashx?function=getTraceDetail',
    //溯源节点
    GET_NODE_LIST: '/Ashx/Trace.ashx?function=getDataList',
    //溯源信息节点验证
    TRACE_NODE_VERIFY: '/Ashx/BlockChain.ashx?function=traceNodeVerify',
    //防伪区块链详情
    BLOCK_CHAIN_ANTI_FAKE_DETAIL: '/Ashx/BlockChain.ashx?function=getAntifakeDetail',
    //当前溯源节点信息
    GET_CURRENT_TRACE_NODE_INFO: '/Ashx/BlockChain.ashx?function=getCurrentTraceNodeInfo',
    //当前防伪生码信息
    GET_CURRENT_ANTIFAKE_INFO: '/Ashx/BlockChain.ashx?function=getCurrentAntifakeInfo'
  },
  //卡片管理
  card: {
    //获取列表
    GET_LIST: '/Ashx/Card.ashx?function=getManageList',
    //获取详情
    GET: '/Ashx/Card.ashx?function=get',
    //保存
    SAVE: '/Ashx/Card.ashx?function=save',
    //启用/禁用
    SET_STATUS: '/Ashx/Card.ashx?function=setStatus'
  },
  //通知
  notification: {
    //获取列表
    GET_LIST: '/Ashx/NotificationNew.ashx?function=getList',
    //获取详情
    GET: '/Ashx/NotificationNew.ashx?function=get',
    //保存
    SAVE: '/Ashx/NotificationNew.ashx?function=save',
    //启用/禁用
    SET_STATUS: '/Ashx/NotificationNew.ashx?function=setStatus',
    //删除
    DELETE: '/Ashx/NotificationNew.ashx?function=delete'
  },
  //组织管理
  corp: {
    //获取保险组织列表
    GET_INSURE_LIST: '/Ashx/Insure.ashx?function=getInsureCompany',
    //获取全部配置信息
    GET_CONFIG: '/Ashx/Insure.ashx?function=getConfig',
    //保存保险公司配置模板维护
    SAVE_CONFIG: '/Ashx/Insure.ashx?function=saveConfig'
  },
  //H5工具
  mobileWebsite: {
    //获取H5列表
    GET_LIST: '/Ashx/MobileWebsiteList.ashx?function=getList',
    //新增/编辑
    SAVE: '/Ashx/MobileWebsiteList.ashx?function=add',
    //查看详情
    GET_DETAIL: '/Ashx/MobileWebsiteList.ashx?function=getDetail',
    //查看详情
    DEL: '/Ashx/MobileWebsiteList.ashx?function=del',
    //新增/编辑关联关系
    ADD_RELATE: '/Ashx/MobileWebsiteList.ashx?function=addRelate',
    //删除关联关系
    DEL_RELATE: '/Ashx/MobileWebsiteList.ashx?function=delRelate',
    //新增/编辑关联关系【批量】
    ADD_RELATE_ALL: '/Ashx/MobileWebsiteList.ashx?function=addRelateAll'
  }
};
