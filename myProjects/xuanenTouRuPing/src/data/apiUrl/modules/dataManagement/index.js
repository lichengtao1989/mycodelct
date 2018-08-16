export default {
  //获取单个经营主体信息
  GET: '/nzjxcApi/Store/Get',
  //保存主体信息(含新建、更新)
  SAVE: '/nzjxcApi/Store/Save',
  //获取经营主体列表
  GET_LIST: '/nzjxcApi/Store/GetList',
  //设置禁用与开启
  SET_STATUS: '/nzjxcApi/Store/SetStatus',
  //获取客户列表
  GET_LIST_CUSTOMER: '/nzjxcApi/Customer/GetList',
  //获取单个客户信息
  GET_CUSTOMER: '/nzjxcApi/Customer/Get',
  //保存客户
  SAVE_CUSTOMER: '/nzjxcApi/Customer/Save',
  //删除客户
  DELETE_CUSTOMER: '/nzjxcApi/Customer/Delete',
  //设置客户禁用与开启
  SET_CUSTOMER_STATUS: '/nzjxcApi/Customer/SetStatus',
  //导入客户列表
  IMPORT_CUSTOMER_LIST: '/nzjxcApi/Customer/Import',
  //导出客户列表
  EXPOET_CUSTOMER_LIST: '/nzjxcApi/CustomerExport/Export',
  //获取供应商列表
  GET_LIST_SUPPLIER: '/nzjxcApi/Supplier/GetList',
  //获取单个供应商信息
  GET_SUPPLIER: '/nzjxcApi/Supplier/Get',
  //保存供应商
  SAVE_SUPPLIER: '/nzjxcApi/Supplier/Save',
  //删除供应商
  DELETE_SUPPLIER: '/nzjxcApi/Supplier/Delete',
  //导入供应商列表
  IMPORT_SUPPLIER_LIST: '/nzjxcApi/Supplier/Import',
  //导出供应商列表
  EXPOET_SUPPLIER_LIST: '/nzjxcApi/SupplierExport/Export',
  //设置供应商禁用与开启
  SET_SUPPLIER_STATUS: '/nzjxcApi/Supplier/SetStatus',
  //获取商品列表
  GET_LIST_PRODUCT: '/nzjxcApi/Product/GetList',
  //获取单个农肥商品信息
  GET_PRODUCT_FERTILIZER: '/nzjxcApi/ProductFertilizer/Get',
  //保存单个农肥商品信息
  SAVE_PRODUCT_FERTILIZER: '/nzjxcApi/ProductFertilizer/Save',
  //删除单个农肥商品信息
  DELETE_PRODUCT_FERTILIZER: '/nzjxcApi/ProductFertilizer/Delete',
  //设置禁用启用农肥商品信息
  SET_STATUS_PRODUCT_FERTILIZER: '/nzjxcApi/ProductFertilizer/SetStatus',
  //获取单个农药商品信息
  GET_PRODUCT_PESTICIDE: '/nzjxcApi/ProductPesticide/Get',
  //保存单个农药商品信息
  SAVE_PRODUCT_PESTICIDE: '/nzjxcApi/ProductPesticide/Save',
  //删除单个农药商品信息
  DELETE_PRODUCT_PESTICIDE: '/nzjxcApi/ProductPesticide/Delete',
  //设置禁用启用农药商品信息
  SET_STATUS_PRODUCT_PESTICIDE: '/nzjxcApi/ProductPesticide/SetStatus',
  //获取单个种子商品信息
  GET_PRODUCT_SEEDS: '/nzjxcApi/ProductSeeds/Get',
  //保存单个种子商品信息
  SAVE_PRODUCT_SEEDS: '/nzjxcApi/ProductSeeds/Save',
  //删除单个种子商品信息
  DELETE_PRODUCT_SEEDS: '/nzjxcApi/ProductSeeds/Delete',
  //设置禁用启用种子商品信息
  SET_STATUS_PRODUCT_SEEDS: '/nzjxcApi/ProductSeeds/SetStatus',
  //获取单个其他商品信息
  GET_PRODUCT_OTHER: '/nzjxcApi/ProductOther/Get',
  //保存单个其他商品信息
  SAVE_PRODUCT_OTHER: '/nzjxcApi/ProductOther/Save',
  //删除单个其他商品信息
  DELETE_PRODUCT_OTHER: '/nzjxcApi/ProductOther/Delete',
  //设置禁用启用其他商品信息
  SET_STATUS_PRODUCT_OTHER: '/nzjxcApi/ProductOther/SetStatus',
  //获取种子列表
  AUTO_LIST_SYS_SEEDS: '/nzjxcApi/SysSeeds/GetList',
  //获取农药列表
  AUTO_LIST_SYS_PESTICIDE: '/nzjxcApi/SysPesticide/GetList',
  //获取农肥列表
  AUTO_LIST_SYS_FERTILIZER: '/nzjxcApi/SysFertilizer/GetList',
  //判断农药产品名称是否被禁用
  CHECK_REGISTATIONNAME: '/nzjxcApi/SysForbiddenPesticide/CheckRegistrationName'
}
