function menuItem(powerCode, powerName, children) {
  return Object.jsonClone({
    powerCode,
    powerName,
    children
  });
}
export default () => {
  return [
    menuItem('index', '新闻动态'),
    menuItem('notice', '通告通知'),
    menuItem('work', '工作交流'),
    menuItem('policy', '政策法规'),
    menuItem('quality', '质量监管'),
    menuItem('hotfocus', '热点聚焦'),
    menuItem('law', '执法公开'),
    menuItem('certification', '产品认证'),
    menuItem('warning', '农情预警'),
    menuItem('charm', '魅力定襄'),
    menuItem('standard', '标准规范'),
    // menuItem('sysimage', '图片管理'),
    menuItem('slide', '轮播管理'),
    menuItem('banner', '图片新闻轮播'),
    // menuItem('kepu', '科普之窗'),
    menuItem('product', '产品管理'),
    menuItem('ggimgpictures', '广告图片'),
    menuItem('datauploading', '资料上传'),
    menuItem('link', '链接管理'),
    menuItem('platform', '平台管理'),
    menuItem('map', '地图管理'),
    menuItem('complaint', '投诉管理')
    // menuItem('demo', '组件示例', [
    //   menuItem('list', '列表'), menuItem('select', '下拉选择'),
    //   menuItem('editor', '富文本编辑器'), menuItem('other', '其它')
    // ])
  ];
}
