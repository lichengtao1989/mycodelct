import axios from 'axios'

const apiList = {
  GetCorpInfo: "/SysCorp/GetCorpInfo",
  GetList: "Article/GetList",
  Sysslide: "/Sysslide/GetList",
  GetSingle: "/Article/GetSingle",
  getSystemList: "/sysCorp/GetSystemList",
  GetCorpByName: "/SysCorp/GetCorpByName",
  NontraceabilityCorp: "/NontraceabilityCorp/GetList",
  GetBlackList: "/SysCorp/GetBlackList",
  product: "/product/GetList",
  GetNavigationBar: "/SysCorp/GetNavigationBar ",
  ComplainSubmit: "/Feedback/add",
  VerificationCode: "/common/CodeGenerate.ashx?type=verificationcode",
  UploadPicture: "/Feedback/UploadPicture",
  GetCropList: "/sysCorp/getlist",
  GetRegionList: "/Region/GetList",
  Syslink: "Syslink/GetList",
  GetArticleSlideShowPictureList: 'Article/GetArticleSlideShowPictureList'
};

export default apiList;
