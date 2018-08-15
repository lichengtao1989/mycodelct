/**
 * Created by 67340 on 2017/8/24.
 */
export default {
  autoComplete: {
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //用户
    USER: '/Ashx/AutoComplete.ashx?function=LookupUser',
    //产品
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //产品批次
    PRODUCT_BATCH: '/Ashx/AutoComplete.ashx?function=LookupProductBatch'
  },
  //活动
  activity: {
    //导购红包
    salesRedPack: {
      //获取导购红包提现记录
      GET_REFLECT_RECORD_LIST: '/Ashx/GuideRedPackCashRecord.ashx?function=getList',
      //获取导购红包领取记录
      GET_RECEIVE_RECORD_LIST: '/Ashx/GuideRedPackReceiveRecord.ashx?function=getList',
      //红包发放及没收
      CHANGE_CASH_STATUS: '/Ashx/GuideRedPackCashRecord.ashx?function=getGuideRedRecordStatus',
      //提现记录导出列表
      EXPORT_REFLECT_RECORD_LIST: '/Ashx/Export.ashx?function=GuideRedPackCashRecordExport',
      //领取记录导出列表
      EXPORT_RECEIVE_RECORD_LIST: '/Ashx/Export.ashx?function=GuideRedPackReceiveRecordExport',
      //获取红包活动列表
      GET_ACTIVITY_LIST: '/Ashx/GuideRedPackActivity.ashx?function=getList',
      //红包提现审核
      RED_PACK_EXAMINE: '/Ashx/GuideRedPackActivity.ashx?function=audit',
      //获取红包提现审核状态
      GET_AUDIT: '/Ashx/GuideRedPackActivity.ashx?function=getAudit',
      //判断是否新建账户
      GET_AUDIT_INIT: '/Ashx/GuideRedPackActivity.ashx?function=auditInit',
      //启用/停用红包活动
      UP_DATE_STATUS: '/Ashx/GuideRedPackActivity.ashx?function=updateStatus',
      //获取产品列表
      GET_PRODUCT_LIST: '/Ashx/GuideRedPackActivity.ashx?function=getProductList',
      //获取产品下的批次
      GET_PRODUCT_BATCH_LIST: '/Ashx/GuideRedPackActivity.ashx?function=getProductBatchList',
      //获取当前组织的机构列表
      GET_ORG_LIST: '/Ashx/GuideRedPackActivity.ashx?function=getOrgList',
      //获取参与导购红包活动的经销商列表
      GET_ATTENDED_ORG_LIST: '/Ashx/GuideRedPackActivity.ashx?function=getAttendedOrgList',
      //新增活动
      ADD_ACTIVITY: '/Ashx/GuideRedPackActivity.ashx?function=add',
      //获取活动详情
      GET_DETAIL: '/Ashx/GuideRedPackActivity.ashx?function=getDetail',
      //请求红包明细
      GET_RED_PACK_DETAIL: '/Ashx/SendRedEnvelopeRecord.ashx?function=getList',
      //红包活动统计
      GET_REDPACK_STATIC: '/Ashx/GuideRedPackReceiveRecord.ashx?function=getRedPackSalesTotal',
      //获取提现记录页面金额总和
      GET_AMOUNT_SUM: '/Ashx/GuideRedPackCashRecord.ashx?function=GetAmountSum',
      //批量发放
      GET_BATCH_GUIDE_RED_RECORD_STATUS:
        '/Ashx/GuideRedPackCashRecord.ashx?function=getBatchGuideRedRecordStatus',
      //分类搜索
      GET_PRODUCT_CLASSIFY: '/Ashx/GuideRedPackReceiveRecord.ashx?function=getProductClassify'
    },
    //运营活动
    operatingActivities: {
      //获取运营活动列表
      GET_ACTIVITY_LIST: '/Ashx/OperatingActivity.ashx?function=getActivityList',
      //启用/停用功能
      UPDATE_STATUS: '/Ashx/OperatingActivity.ashx?function=updateStatus',
      //获取参与记录列表
      GET_PARTICIPATE_RECORDS:
        '/Ashx/OperatingActParticipateRecord.ashx?function=getParticipateRecords',
      //参与记录列表导出
      OPERATING_ACT_PARTICIPATE_PECORD_EXPORT:
        '/Ashx/OperatingActParticipateRecordExport.ashx?function=OperatingActParticipateRecordExport',
      //获取所有组织列表
      GET_CORP_LIST: '/Ashx/OperatingActivity.ashx?function=getCorpList',
      //新增 / 修改活动
      ADD_ACTIVITY: '/Ashx/OperatingActivity.ashx?function=addActivity',
      //获取活动详情
      GET_ACTIVITY_DETAIL: '/Ashx/OperatingActivity.ashx?function=getActivityDetail',
      //获取数据图表
      GET_DATA_STATISTICS: '/Ashx/OperatingDataStatistics.ashx?function=getDataStatistics',
      //获取机构列表
      GET_ORG_LIST: '/Ashx/OperatingDataStatistics.ashx?function=getOrgList',
      //获取活动名称列表
      GET_ACTIVITYNAME_LIST: '/Ashx/OperatingDataStatistics.ashx?function=getActivityNameList'
    },
    //抵用码
    verificateCode: {
      //获取活动列表
      GET_ACTIVITY_LIST: '/Ashx/VerificateActivity.ashx?function=getList',
      //获取记录列表
      GET_RECORD_LIST: '/Ashx/VerificateRecord.ashx?function=getList',
      //获取当前组织下的机构
      GET_ORG_LIST: '/Ashx/VerificateActivity.ashx?function=getOrgList',
      //导出记录列表
      RECORD_EXPORT: '/Ashx/Export.ashx?function=VerificateRecordExport',
      //启用/停用活动
      UPDATE_STATUS: '/Ashx/VerificateActivity.ashx?function=updateStatus',
      //获取编辑页面产品列表
      GET_EDIT_PRODUCT_LIST: '/Ashx/VerificateActivity.ashx?function=getProductList',
      //获取编辑页面机构列表
      GET_EDIT_ORG_LIST: '/Ashx/VerificateActivity.ashx?function=getActivityOrgID',
      //新增活动
      ADD_ACTIVITY: '/Ashx/VerificateActivity.ashx?function=add',
      //获取活动详情
      GET_ACTIVITY_DETAIL: '/Ashx/VerificateActivity.ashx?function=getDetail'
    },
    //兑换券/抵用券
    voucher: {
      //兑换券活动列表
      EXCHANGE_LIST: '/Ashx/VoucherActivity.ashx?function=getList&voucherType=vou1',
      //兑换券订单列表
      EXCHANGE_ORDER_LIST: '/Ashx/VoucherOrder.ashx?function=getList&voucherType=vou1',
      //抵用券活动列表
      DEDUCTIBLE_LIST: '/Ashx/VoucherActivity.ashx?function=getList&voucherType=vou2',
      //抵用券订单列表
      DEDUCTIBLE_ORDER_LIST: '/Ashx/VoucherOrder.ashx?function=getList&voucherType=vou2',
      //可用的批次
      GET_BATCH_IDS: '/Ashx/VoucherActivity.ashx?function=getBatchIDs',
      //判断券名称是否存在
      CHECK_NAME_IS_EXIST: '/Ashx/VoucherActivity.ashx?function=checkNameIsExist',
      //新增活动
      EXCHANGE_ADD: '/Ashx/VoucherActivity.ashx?function=add',
      //兑换券订单列表导出
      EXCHANGE_EXPORT_LIST: '/Ashx/VoucherOrderExchangeExport.ashx?function=VoucherOrderExport',
      //抵扣券订单列表导出
      DEDUCTIBLE_EXPORT_LIST: '/Ashx/VoucherOrderExport.ashx?function=VoucherOrderExport',
      //导入-兑换券
      IMPORT_EXCHANGE_ORDER_CODE: '/Ashx/VoucherOrder.ashx?function=ExchangeImport',
      //导入-抵扣券
      IMPORT_DEDUCTIBLE_ORDER_CODE: '/Ashx/VoucherOrder.ashx?function=Import',
      //获取产品列表
      PRODUCT: '/Ashx/VoucherActivity.ashx?function=getProductList'
    },
    //骆驼码
    camelCode: {
      //活动列表
      GET_LIST: '/Ashx/CamelActivity.ashx?function=getList',
      //获取活动产品
      GET_PRODUCT_LIST: '/Ashx/CamelActivity.ashx?function=GetLogisticsCodeBind',
      //新增活动
      ADD: '/Ashx/CamelActivity.ashx?function=add',
      //编辑活动
      EDIT: '/Ashx/CamelActivity.ashx?function=edit',
      //修改活动状态
      UPDATE_ACTIVITY_STATUS: '/Ashx/CamelActivity.ashx?function=UpdateCamelActivityStatus',
      //Base64加密
      GET_BASE64_ENCODE: '/Ashx/CamelActivity.ashx?function=Get3DESBase64Encode',
      //获取活动详情
      GET_ACTIVITY_DETAIL: '/Ashx/CamelActivity.ashx?function=GetCamelActivityInfo',
      //获取设置活动内容地址
      GET_SET_ACTIVITY_CONTENT_URL: '/Ashx/CamelActivity.ashx?function=GetCamelSystemUrl'
    }
  },
  //数据
  statistics: {
    //获取会员列表
    GET_VIP_LIST: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getList',
    //获取自定义搜索栏位
    GET_FIELDS: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getCustomFields',
    //获取会员等级-search
    GET_CLASSID: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getCustomerClassID',
    //会员统计数据
    GET_TOTAL_STATE_DATA: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getTotalStateData',
    //获取7日内会员合计
    GET_SEVEN_ACTIVE_STATE_DATA:
      '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getSevenActiveStateData',
    //获取性别数据
    GET_SEVEN_SEX_STATE_DATA: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getGenderData',
    //获取新老用户数据
    GET_SEVEN_NEW_OLD_DATA: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getNewOldData',
    //获取年龄数据
    GET_SEVEN_AGE_DATA: '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getAgeGroupData',
    //获取活跃比例数据
    GET_SEVEN_ACTIVE_PROPORTION_DATA:
      '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getActiveStatusGroupData',
    //获取品类排行数据
    GET_SEVEN_RANK_DATA:
      '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getStatisticsCustomFieldData',
    //获取价格区间
    GET_SEVEN_PRICE_DATA:
      '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getSellProductPriceData',
    //交易数据
    GET_TRADES_INFO: '/Special/HuaXiKou/Ashx/HuaXiKouTransaction.ashx?function=getTradesInfo',
    //title 交易数据
    GET_TRADES_INFO_DIFF:
      '/Special/HuaXiKou/Ashx/HuaXiKouTransaction.ashx?function=getTradesInfoDiff',
    //交易次数 search
    GET_TRADES_INFO_SEARCH:
      '/Special/HuaXiKou/Ashx/HuaXiKouTransaction.ashx?function=getTradesInfoSearch',
    //产品分类
    GET_PRODUCT_CLASSIFY:
      '/Special/HuaXiKou/Ashx/HuaXiKouCustomer.ashx?function=getProductClassify',
    //导出
    EXPORT_LIST: '/Ashx/Export.ashx?function=HuaXiKouCustomerExport'
  }
};
