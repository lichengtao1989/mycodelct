export default {
  autoComplete: {
    //贫困户
    POOR_FAMILY: '/Ashx/AutoComplete.ashx?function=LookupPoorFamily',
    //机构
    ORG: '/Ashx/AutoComplete.ashx?function=LookupOrg',
    //产品
    PRODUCT: '/Ashx/AutoComplete.ashx?function=LookupProduct',
    //劳务岗位
    POVERTY_LABOR: '/Ashx/AutoComplete.ashx?function=lookUpPovertyLaborPost'
  },
  //机构
  org: {
    //导出
    EXPORT: '/Ashx/Export.ashx?function=OrgExport'
  },
  //贫困户
  poorFarmily: {
    //获取列表
    GET_LIST: '/Ashx/PoorFamily.ashx?function=getList',
    //获取详情
    GET: '/Ashx/PoorFamily.ashx?function=get',
    //保存
    SAVE: '/Ashx/PoorFamily.ashx?function=save',
    //删除
    DELETE: '/Ashx/PoorFamily.ashx?function=del',
    //导出
    EXPORT: '/Ashx/Export.ashx?function=PoorFamilyExport',
    //导入
    IMPORT: '/Ashx/PoorFamily.ashx?function=import',
    //上传ecxcel
    UPLOAD_EXCEL: '/Ashx/Common.ashx?function=uploadExcel'
  },
  //扶贫记录
  povertyRecord: {
    //获取列表
    GET_LIST: '/Ashx/PovertyAlleviation.ashx?function=getList',
    //获取详情
    GET: '/Ashx/PovertyAlleviation.ashx?function=get',
    //保存
    SAVE: '/Ashx/PovertyAlleviation.ashx?function=save',
    //删除
    DELETE: '/Ashx/PovertyAlleviation.ashx?function=del',
    //导出
    EXPORT: '/Ashx/Export.ashx?function=PovertyAlleviationExport',
    //导入
    IMPORT: '/Ashx/PovertyAlleviation.ashx?function=import'
  },
  //劳务岗位
  povertyLabor: {
    //获取列表
    GET_LIST: '/Ashx/PovertyLaborPost.ashx?function=getList',
    //获取详情
    GET: '/Ashx/PovertyLaborPost.ashx?function=getDetail',
    //保存
    SAVE: '/Ashx/PovertyLaborPost.ashx?function=add',
    //启用/禁用、删除
    UPDATESTATUS: '/Ashx/PovertyLaborPost.ashx?function=updateStatus'
  },
  //贫困职工收入记录
  povertyIncomeRecord: {
    //获取列表
    GET_LIST: '/Ashx/PovertyIncomeRecord.ashx?function=getList',
    //获取详情
    GET: '/Ashx/PovertyIncomeRecord.ashx?function=getDetail',
    //保存
    SAVE: '/Ashx/PovertyIncomeRecord.ashx?function=add',
    //启用/禁用、删除
    UPDATESTATUS: '/Ashx/PovertyIncomeRecord.ashx?function=updateStatus',
    //导出
    EXPORT: '/Ashx/Export.ashx?function=PovertyIncomeRecordExport',
    //导入
    IMPORT: '/Ashx/PovertyIncomeRecord.ashx?function=import'
  },
  //耳标记录
  earconRecordList: {
    //挂标列表
    ADD_RECORD_LIST: '/Ashx/CodeRelate.ashx?function=getEarconCodeRelate&bussinessType=1',
    //补标列表
    PUSH_RECORD_LIST: '/Ashx/CodeRelate.ashx?function=getEarconCodeRelate&bussinessType=2',
    //转栏列表
    CHANGE_RECORD_LIST: '/Ashx/CodeRelate.ashx?function=getEarconCodeRelate&bussinessType=3'
  }
};
