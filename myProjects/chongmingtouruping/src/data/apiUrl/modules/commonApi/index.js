// const apiHead = 'http://nzapi.kf315.net';
// export default {
//   //农作物列表
//   'GetCropInfosList': '/api/CropInfo/GetCropInfosList',
//   //农作物病虫害信息列表
//   'GetPestinfosList': '/api/CropInfo/GetPestinfosList',
//   //农作物病虫害详细信息
//   'GetPestinfoDetailList': '/api/CropInfo/GetPestinfoDetailList',
//   //肥料
//   'GetFertilizerInfos': '/api/Fertilizer/GetFertilizerInfos',
//   //获取农药信息下拉列表
//   'GetPesticideInfosForDropDownList': '/api/Pesticide/GetPesticideInfosForDropDownList',
//   //通过农药登记证号获取农药详细信息
//   'GetPesticideInfoByCertificateNumber': '/api/Pesticide/GetPesticideInfoByCertificateNumber',
//   //获取农药信息列表
//   'GetPesticideInfos': '/api/Pesticide/GetPesticideInfos'
// }
const apiHead = 'http://nzapi.kf315.net';
export default {
  //农作物列表
  'GetCropInfosList': apiHead + '/api/CropInfo/GetCropInfosList',
  //农作物病虫害信息列表
  'GetPestinfosList': apiHead + '/api/CropInfo/GetPestinfosList',
  //农作物病虫害详细信息
  'GetPestinfoDetailList': apiHead + '/api/CropInfo/GetPestinfoDetailList',
  //肥料
  'GetFertilizerInfos': apiHead + '/api/Fertilizer/GetFertilizerInfos',
  //肥料详情
  'GetFertilizerInfo': apiHead + '/api/Fertilizer/GetFertilizerInfo',
  //获取农药信息下拉列表
  'GetPesticideInfosForDropDownList': apiHead + '/api/Pesticide/GetPesticideInfosForDropDownList',
  //通过农药登记证号获取农药详细信息
  'GetPesticideInfoByCertificateNumber': apiHead + '/api/Pesticide/GetPesticideInfoByCertificateNumber',
  //获取农药信息列表
  'GetPesticideInfos': apiHead + '/api/Pesticide/GetPesticideInfos'
}
