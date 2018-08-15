//通用配置
const config = {
  printLodopUrl: '//static.app315.net/lib/print/Lodop.zip'
};

if (process.env.NODE_ENV === 'production') {
  //生产环境配置
  Object.assign(config, {
    videoPluginUrl: '//static.app315.net/lib/video',
    PCQueryUrl: 'http://aio.s315.net/index.html'
  });
} else {
  //测试环境和开发环境的配置
  Object.assign(config, {
    videoPluginUrl: '//static.kf315.net/video',
    PCQueryUrl: 'http://aio.kf315.net/index.html'
  });

  if (process.env.NODE_ENV === 'development') {
    //开发环境的配置
    Object.assign(config, {});
  }
}

export default config;
