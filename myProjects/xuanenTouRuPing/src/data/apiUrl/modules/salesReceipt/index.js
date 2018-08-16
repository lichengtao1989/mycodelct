export default {
  //获取进货台账列表
  GET_LIST: '/nzjxcApi/SalesReceipt/GetList',
  //获取单个进货台账信息
  GET: '/nzjxcApi/SalesReceipt/Get',
  //保存采购进货信息
  SAVE: '/nzjxcApi/SalesReceipt/Save',
  //进货台账撤销订单
  SET_STATUS: '/nzjxcApi/SalesReceipt/SetStatus',
  //经销商列表
  AUTO_GET_SUPPLIER: '/nzjxcApi/Supplier/GetSearchList',
  //产品列表
  AUTO_GET_PRODUCT: '/nzjxcApi/Product/GetSearchList',
  //针对作物病虫害
  AUTO_CROP_LIST: '/static/data/crop-list.json',
  //保存处方单
  PRESCRIPTION_SAVE: '/nzjxcApi/PrescriptionOrder/Save',
  //获取单个处方单信息
  PRESCRIPTION_GET: '/nzjxcApi/PrescriptionOrder/Get',
  //删除单个处方单信息
  PRESCRIPTION_DELETE: '/nzjxcApi/PrescriptionOrder/delete'

}
