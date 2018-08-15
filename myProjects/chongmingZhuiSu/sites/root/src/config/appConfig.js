//通用配置
const config = {
  systemLogo: 'http://cjm.app315.net/Resource/images/newTheme/logo.png',
  indexUrl: '/Module/Sys/Index.aspx',
  adminIndexUrl: '/Module/Admin/Index.aspx'
};

if (process.env.NODE_ENV === 'production') {
  //生产环境配置
  Object.assign(config, {
    loginUrl: '/Login.aspx',
    logoutUrl: '/Logout.aspx?callback=http%3A%2F%2Fcjm.app315.net',
    helpCenterUrl: 'http://helpclient.kf315.net/index.html'
  });
} else {
  //测试环境和开发环境的配置
  Object.assign(config, {
    loginUrl: '//login.kf315.net/?AudsId=t&callback=http%3A%2F%2Flocalhost%3A8080%2Flanding.html',
    logoutUrl: '/Logout.aspx?callback=http%3A%2F%2Flogin.kf315.net%2F%3FAudsId%3Dt%26callback%3Dhttp%253A%252F%252Flocalhost%253A8080%252Flanding.html',
    helpCenterUrl: 'http://helpclient.kf315.net/index.html'
  });
}

export default config;
