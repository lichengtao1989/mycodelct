const proxy = {
  target: 'http://nzcm.kf315.net/',
  changeOrigin: true
};
const proxy2 = {
  // target: 'http://192.168.10.54:82/',
  target: 'http://nzapi.kf315.net/',
  changeOrigin: true
};
// const proxy = {target: 'http://192.168.10.98:8003/', changeOrigin: true};

module.exports = {
  '/lsnyApi': proxy,
  '/api':proxy2
};
