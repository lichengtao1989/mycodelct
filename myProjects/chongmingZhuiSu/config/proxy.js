var proxy = {
  // target: 'http://app315.kf315.net/',
  // target: 'http://192.168.10.98:8001',
  target: 'http://app315m.kf315.net',
  // target: 'http://localhost:2495/',
  // target: 'http://192.168.10.98:8003',
  changeOrigin: true
};
var proxyModule = {
  // target: 'http://192.168.10.98:8001/Module',
  target: 'http://app315m.kf315.net/Module',
  // target: 'http://app315.kf315.net/Module',
  // target: 'http://localhost:2495/Module',
  //target: 'http://192.168.10.98:8003',
  changeOrigin: true
};
var proxyMa = {
  target: 'http://ma.api.kf315.net/',
  changeOrigin: true
};
var proxySaiSang = {
  target: 'http://dev.svideo.com.cn:2400/',
  changeOrigin: true,
  pathRewrite: {
    '^/SaiShangAPI': ''
  }
};

module.exports = {
  '/SaiShangAPI': proxySaiSang,
  '/CodeAshx': proxyMa,
  '/Module': proxy,
  '/Special': proxy,
  '/Resource': proxy,
  '/Ashx': proxy,
  '/Default.aspx': proxy,
  '/Logout.aspx': proxy,
  '/Login.aspx': proxy,
  '/Admin': proxyModule,
  '/AntiFake': proxyModule,
  '/Approval': proxyModule,
  '/Approval2': proxyModule,
  '/Common': proxyModule,
  '/DataAnalysis': proxyModule,
  '/Inputs': proxyModule,
  '/InsuranceClaim': proxyModule,
  '/Integral': proxyModule,
  '/Logistics': proxyModule,
  '/Mall': proxyModule,
  '/MobileEnforcement': proxyModule,
  '/Monitor': proxyModule,
  '/Plots': proxyModule,
  '/PovertyAlleviation': proxyModule,
  '/SMSCenter': proxyModule,
  '/Sys': proxyModule,
  '/Trace': proxyModule,
  '/TraceNode': proxyModule,
  '/TraceNodePlots': proxyModule,
  '/Vote': proxyModule,
  '/WeixinManage': proxyModule
};
