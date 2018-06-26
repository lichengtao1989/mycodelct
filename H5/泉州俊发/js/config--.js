//需要知道weixinUrl 和corpId这样配置好了才能成功跳转

window.cjm = window.cjm || {};
window.cjm.config = {
  corpId: 10942,
  // weixinUrl: 'https://app315.net',
  // weixinUrl: 'http://wap.sxqc.app315.net/',
  // weixinUrl: 'http://www.kf315.net/mall',
  weixinUrl: 'http://mall.app315.net',
  //当前项目的域名
  currentHost:'http://localhost:3000',
  //项目根目录
  root: '../..',
  //pv、uv统计
  statsUrl: 'http://www.kf315.net/interface/JsonDataService.ashx?function=PageViewsRecord',
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
  //物流查询接口
  get logisticsQueryUrl() {
    return this.wapApi + '?function=LogisticsQuery';
  },
  //会员登录接口
  get customerLoginUrl() {
    return this.wapApi + '?function=CustomerLogin';
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
    return 'http://122.224.171.198/nywap/index.aspx?code=' + code + "&uuid=" + uuid;
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
  //获取openId的页面地址
  getWxOpenIdUrl: function (callbackUrl) {
    return this.weixinUrl + '/WXAuth.ashx?Scope=snsapi_baseinfo&CorpID=' + this.corpId + '&callback=' + encodeURIComponent(callbackUrl);
  },
  //根据appid获取openid
  getOpenId: function(callbackUrl){
   return this.weixinUrl + '/WXAuth.ashx?Scope=snsapi_baseinfo&CorpID='+this.corpId+'&callback='+encodeURIComponent(callbackUrl);
  },
  //根据OpenId获取用户信息
  getWxUserInfoUrl: function (openId) {
    return this.weixinUrl + '/WXUserInfo.ashx?refresh=1&CorpID=' + this.corpId + '&openid=' + openId + '&random='+ Math.random();
  }
};