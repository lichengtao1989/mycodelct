//通用配置
const config = {
  systemLogo: '//cjm.app315.net/Resource/images/newTheme/logo.png'
};

if (process.env.NODE_ENV === 'production') {
  //生产环境配置
  Object.assign(config, {
    agricultureWapHost: 'http://ncp.cjm.so',
    agricultureWapHostV2: 'http://ncp2.cjm.so',
    monitorPlatform: 'http://ncpjk.cjm.so/v3/MonitorPlaform.html',
    monitorScreenConfigPage: 'http://datav.cjm.so'
  });
} else {
  //测试环境和开发环境的配置
  Object.assign(config, {
    agricultureWapHost: 'http://122.224.171.198/nywap',
    agricultureWapHostV2: 'http://122.224.171.198/nywap2',
    monitorPlatform: 'http://122.224.171.198/MonitorPlaform/MonitorPlaform.html'
  });
  if (process.env.NODE_ENV === 'development') { //开发环境的配置
    Object.assign(config, {
      monitorScreenConfigPage: 'http://localhost:8081',
      h5ConfigPage: 'http://localhost:8082/manage.html?configID=',
      h5Page: 'http://localhost:8082/index.html?configID='
    });
  } else if(process.env.NODE_ENV === 'testing'){ //测试环境的配置
    Object.assign(config, {
      monitorScreenConfigPage: 'http://datav.kf315.net',
      h5ConfigPage: 'http://h5tool.kf315.net/manage.html?configID=',
      h5Page: 'http://h5tool.kf315.net/index.html?configID='
    });
  }
}

export default config;
