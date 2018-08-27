export default {
  //获取单个用户信息
  FARMERINFO: '/lsnyApi/FarmerInfo/Get',
  //图片上传
  UPLOAD_IMAGE: '/lsnyApi/Common/UploadImage',
  //农药品详情
  PRODUCTPESTICIDEINFO: '/lsnyApi/ProductPesticideInfo/Get',
  DROP_DOWN: {
    //农户
    FARMER: '/lsnyApi/DropDownData/GetList?function=Farmer',
    //总经销商
    DISTRIBUTOR: '/lsnyApi/DropDownData/GetList?function=Distributor',
    //农资店
    AGRICULTURALMATERIALS: '/lsnyApi/DropDownData/GetList?function=AgriculturalMaterials',
    //农药信息
    PESTICIDEINFO: '/lsnyApi/DropDownData/GetList?function=PesticideInfo',
    //供应商
    SUPPLIER: '/lsnyApi/DropDownData/GetList?function=Supplier'
  },
  
};
