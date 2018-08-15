//通用配置
const config = {};

if (process.env.NODE_ENV === 'production') {
  //生产环境配置
  Object.assign(config, {
    ciphertextDownload: 'http://api.ma.app315.net/CodeGeneration/getfile'
  });
} else {
  //测试环境和开发环境的配置
  Object.assign(config, {
    ciphertextDownload: 'http://df.kf315.net/CodeGeneration/getfile'
  });
}

export default config;
