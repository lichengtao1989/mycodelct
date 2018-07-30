const proxy = {
  // target: 'http://w.kf315.net/',
  // target: 'http://dxxw.kf315.net/',
  target: 'http://dxx.kf315.net/',

  changeOrigin: true
};
// const proxy = {target: 'http://192.168.10.98:8003/', changeOrigin: true};
function createProxy(paths) {
  const result = {};
  paths.forEach(item => {
    result['/' + item] = proxy;
  });
  return result;
}
module.exports = createProxy(['Article', 'FeedBack', 'Syslink', 'syscorp', 'Sysslide', 'product', 'Product', 'User', 'Sysimage', 'FileUpload', 'NontraceabilityCorp', 'Region', 'Files', 'News', 'Material', 'SysCorp', 'common']);
