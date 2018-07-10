window.cjm = window.cjm || {};
window.cjm.config = {
  version: 2,
  corpId: 10054,
  //当前项目的域名
  currentHost:'http://wap.cjm.so/Individuation/14827',
  basicWapSite: 'http://www.kf315.net/newwap',
  commonWapWebSite: 'http://www.kf315.net/newwap',
  // commonWapWebSite: '../..',
  interfaceWebSite: function(interfaceName) {
    return ('http://www.kf315.net/newwap/individuation/QuanZhouJunFaH5/DataService.ashx?function=' + interfaceName);
  },
  interfaceCommonWebSite: function(interfaceName) {
    // console.log(this.commonWapWebSite + '/Common/DataService.ashx?function=' + interfaceName)
    return this.commonWapWebSite + '/Common/DataService.ashx?function=' + interfaceName;
  },
  currentHost:'',
  //项目根目录
  root: '../..',
  //pv、uv统计
  // statsUrl: 'http://www.kf315.net/interface/JsonDataService.ashx?function=PageViewsRecord',
  statsUrl: 'http://interface.app315.net/JsonDataService.ashx?function=PageViewsRecord',
  //wap接口
  get wapApi() {
    return this.root + '/Common/DataService.ashx';
  },
  //防伪查询接口
  get antifakeQueryUrl() {
    return this.wapApi + '?function=AntifakeQuery';
  },
  //溯源查询接口
  get traceQueryUrl() {
    return this.wapApi + '?function=TraceQuery';
  },
  //积分充值接口
  get integralRechargeUrl() {
    return this.wapApi + '?function=IntegrateCredit';
  },
  //获取某个活动
  get GetLotteryActivity() {
    return this.wapApi + '?function=GetLotteryActivity';
  },
  //8、	会员注册
  get CustomerRegister() {
    return this.wapApi + '?function=CustomerRegister';
  },
  //	所有积分查询
  get GetCustomerIntegralAllUrl() {
    return this.wapApi + '?function=GetCustomerIntegralAll';
  },
  //物流查询接口
  get logisticsQueryUrl() {
    return this.wapApi + '?function=LogisticsQuery';
  },
  //会员登录接口
  get customerLoginUrl() {
    return this.wapApi + '?function=CustomerLogin';
  },
   //根据防伪码获取活动
   get ActivityID() {
    return this.wapApi + '?function=GetAntiFakeCodeCorrespondLotteryActivityID';
  },
   //获取会员信息
   get GetCustomerInfo() {
    return this.wapApi + '?function=GetCustomerInfo';
  },
   //获取某个活动的奖项设置
   get GetAwardsSetting() {
    return this.wapApi + '?function=GetAwardsSetting';
  },
   //检查抽奖码是否已经抽过奖
   get CheckAntiFakeCodeLotteryUnitExtracted() {
    return   '../QuanZhouJunFaH5/DataService.ashx?function=CheckAntiFakeCodeLotteryUnitExtracted';
  },
   //用防伪码去抽奖
   get AntiFakeCodeLotteryUnitExtracted() {
    return   '../QuanZhouJunFaH5/DataService.ashx?function=AntiFakeCodeLotteryUnitExtracted';
  },
   //填写中奖记录的收件人信息
   get FilloutActivityWinReceiver() {
    return   '../QuanZhouJunFaH5/DataService.ashx?function=FilloutActivityWinReceiver';
  },
  //根据防伪码获得物流码
  get getLogisticsCodeUrl() {
    return this.wapApi + '?function=GetLogisticsCodeByAntiFakeCode';
  },
  //验证码图片地址
  get verificationCodeUrl() {
    return this.root + '/Common/ValidateCode.ashx?r=' + Math.random();
  },
  //商城地址
  get mallUrl(){
    return 'http://www.kf315.net/mall/?corpid='+this.corpId;
    // return 'http://mall.app315.net/?corpid='+this.corpId;
  },
  //获取防伪查询结果页面url
  getAntifakeQueryResultUrl: function (id, message) {
    id = id || "";
    message = message || "";
    return this.root + "/Operator/Common/AntiFakeQueryResult.aspx?ID=" + id + "&Message=" + encodeURI(message);
  },
  //获取溯源查询结果页面url
  getTraceQueryResultUrl: function (code,uuid) {
    // return this.root + "/Operator/Common/TraceQueryResult.aspx?code=" + code;
    // return 'http://122.224.171.198/nywap2/index.aspx?code=' + code + "&uuid=" + uuid;
    return 'http://ncp.cjm.so/index.aspx?code=' + code + "&uuid=" + uuid;
  },
  //获取物流查询结果页面url
  getLogisticsQueryResultUrl: function (code) {
    return this.root + "/Operator/Common/LogisticsQueryResult.aspx?code=" + code;
  },
  //积分查询结果页面url
  getIntegralQueryResultUrl: function (corpId, loginName) {
    return this.root + "/Operator/Common/CorpCustomerIntegrate.aspx?CorpID=" + corpId + '&Mobile=' + loginName;
  },
  //积分充值结果页面Url
  getIntegralRechargeResultUrl: function () {
    return this.root + "/Operator/Common/IntegrateCreditSuccess.aspx";
  },

  //微信appId
  wxAppId: 'wx32ab5628a5951ecc',
  //获取openId的页面地址
  getWxOpenIdUrl: function (callbackUrl) {
    // return 'http://www.kf315.net/mall/WXAuth.ashx?Scope=snsapi_baseinfo&appid=' + this.wxAppId + '&callback=' + encodeURIComponent(callbackUrl);
    return 'http://mall.app315.net/WXAuth.ashx?Scope=snsapi_baseinfo&appid=' + this.wxAppId + '&callback=' + encodeURIComponent(callbackUrl);    
  },
  //根据OpenId获取用户信息
  getWxUserInfoUrl: function (openId) {
    // return 'http://www.kf315.net/mall/WXUserInfo.ashx?refresh=1&appid=' + this.wxAppId + '&openid=' + openId;
    return 'http://mall.app315.net/WXUserInfo.ashx?refresh=1&appid=' + this.wxAppId + '&openid=' + openId;    
  }
};