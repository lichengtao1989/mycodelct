import enumUtil from 'framework/utils/enum'

const enums = [{
  name: '性别',
  values: [
    {name: '男', value: '1'},
    {name: '女', value: '2'}
  ]
}, {
  name: '是否',
  code: 'yesOrNo',
  values: [
    {name: '是', code: 'YES', value: '1'},
    {name: '否', code: 'NO', value: '0'}
  ]
}, {
  name: '启用禁用',
  values: [
    {name: '启用', value: '1'},
    {name: '禁用', value: '0'}
  ]
}, {
  name: '机构类型',
  code: 'orgType',
  values: [
    {name: '总部', code: 'HEAD', value: '1'},
    {name: '子公司', code: 'CHILD_CORP', value: '2'},
    {name: '经销商', code: 'DEALER', value: '3'},
    {name: '门店', code: 'SHOP', value: '4'},
    {name: '库房', code: 'STOCK_HOUSE', value: '5'},
    {name: '子门店', code: 'CHILD_SHOP', value: '10'},
    {name: '政府', code: 'GOVERNMENT', value: '15'},
    {name: '企业', code: 'COMPANY', value: '16'},
    {name: '农场', code: 'FARM', value: '25'}
  ]
}, {
  name: '组织类型',
  code: 'corpType',
  values: [
    {name: '企业', code: 'CORP', value: '1'},
    {name: '运营商', code: 'OPERATORS', value: '2'},
    {name: '政府', code: 'GOVERNMENT', value: '3'},
    {name: '检测公司', code: 'TESTING_COMPANY', value: '4'},
    {name: '保险公司', code: 'INSURANCE_COMPANY', value: '5'},
    {name: '印刷工厂', code: 'PRINTING_FACTORY', value: '6'}
  ]
}, {
  name: '采购商类型',
  values: [
    {name: '生产单位', value: '10'},
    {name: '经销商', value: '20'},
    {name: '家庭散户', value: '30'},
    {name: '其它', value: '99'}
  ]
}, {
  name: '供应商类型',
  values: [
    {name: '种苗', value: '1'},
    {name: '肥料', value: '5'},
    {name: '农药', value: '10'},
    {name: '饲料', value: '15'},
    {name: '兽药', value: '20'},
    {name: '生产耗材', value: '25'},
    {name: '加工原材料', value: '30'},
    {name: '设备器械', value: '35'},
    {name: '其他', value: '99'}
  ]
}, {
  name: '用工性质',
  values: [
    {name: '合同工', value: '1'},
    {name: '临时工', value: '2'}
  ]
}, {
  name: '健康状况',
  values: [
    {name: '正常', value: '1'},
    {name: '不正常', value: '2'}
  ]
}, {
  name: '系统业务',
  values: [
    {name: '防伪', value: '1'},
    {name: '物流', value: '2'},
    {name: '溯源', value: '3'},
    {name: '积分', value: '4'},
    {name: '商城', value: '5'}
  ]
}, {
  name: '功能类型',
  values: [
    {name: '操作', value: '3'},
    {name: '页面', value: '7'}
  ]
}, {
  name: '加载方式',
  values: [
    {name: 'Iframe加载', value: '1'},
    {name: '组件加载', value: '2'}
  ]
}, {
  name: '菜单类型',
  values: [
    {name: '一级菜单', value: '1'},
    {name: '二级菜单', value: '2'},
    {name: '三级菜单', value: '3'},
    {name: '标签页', value: '4'},
    {name: '卡片页', value: '5'}
  ]
}, {
  name: '产品批次展示类型',
  values: [
    {name: '溯源节点', value: '0'},
    {name: '微页', value: '1'}
  ]
}, {
  name: '类目规格',
  values: [
    {name: '床品尺寸', value: '床品尺寸'},
    {name: '分段', value: '分段'},
    {name: '服装尺码', value: '服装尺码'},
    {name: '内衣尺码', value: '内衣尺码'},
    {name: '容量', value: '容量'},
    {name: '袜子尺码', value: '袜子尺码'},
    {name: '箱具尺寸', value: '箱具尺寸'},
    {name: '鞋码', value: '鞋码'},
    {name: '颜色', value: '颜色'},
    {name: '运动包容量', value: '运动包容量'},
    {name: '床品尺寸', value: '床品尺寸'}
  ]
}, {
  name: '气象指标',
  values: [
    {name: '光有效辐射', value: '14'},
    {name: '空气温度', value: '1'},
    {name: '大气压强', value: '9'},
    {name: '光照强度', value: '6'},
    {name: '降水量', value: '5'},
    {name: '二氧化碳', value: '13'},
    {name: '土壤温度', value: '36,37,38,39'},
    {name: '土壤湿度', value: '40,41,42,43'},
    {name: '土壤盐分', value: '11'},
    {name: '土壤ph值', value: '10'},
    {name: '空气湿度', value: '2'},
    {name: '蒸发量', value: '12'},
    {name: '土壤温度与水分', value: '7,8'},
    {name: '风力风向', value: '4'},
    {name: '氨气', value: '15'},
    {name: '硫化氢', value: '16'},
    {name: 'PM10', value: '17'}
  ]
}, {
  name: '信息展示',
  values: [
    {name: '溯源节点', value: '0'},
    {name: '微页', value: '1'}
  ]
}, {
  name: 'H5溯源页',
  values: [
    {name: '模板一', value: '0'},
    {name: '模板二', value: '1'},
    {name: '模板三', value: '2'}
  ]
},
{
  name: 'H5颜色',
  values: [
    {name: '红色', value: '0'},
    {name: '蓝色', value: '1'},
    {name: '绿色', value: '2'}
  ]
}, {
  name: 'logo显示方式',
  code: 'logoShowWay',
  values: [
    {name: '图片', code: 'IMAGE', value: '0'},
    {name: '文字', code: 'TEXT', value: '1'}
  ]
}, {
  name: '卡片分类',
  code: 'cardCategory',
  values: [
    {name: '图表', code: 'GRAPH', value: '1'},
    {name: '引导', code: 'GUIDE', value: '2'},
    {name: '定制', code: 'CUSTOMIZATION', value: '3'}
  ]
}, {
  name: '图表卡片分类',
  code: 'graphCardCategory',
  values: [
    {name: '折线', code: 'LINE', value: '1'},
    {name: '柱状', code: 'BAR', value: '2'},
    {name: '饼状', code: 'PIE', value: '3'},
    {name: '地图', code: 'MAP', value: '4'},
    {name: '数字', code: 'NUMBER', value: '5'}
  ]
}, {
  name: '卡片尺寸',
  code: 'cardSize',
  values: [
    {name: '标准', code: 'SIZE1', value: '1'},
    {name: '大', code: 'SIZE2', value: '2'}
  ]
}, {
  name: '产品线',
  values: [
    {name: '架构', value: '1'},
    {name: '防伪', value: '2'},
    {name: '物流', value: '3'},
    {name: '追溯', value: '4'},
    {name: '营销', value: '5'},
    {name: '数据', value: '6'}
  ]
}, {
  name: '卡片优先级',
  values: [
    {name: '0级', value: '0'},
    {name: '1级', value: '1'},
    {name: '2级', value: '2'},
    {name: '3级', value: '3'}
  ]
}, {
  name: '通知范围',
  values: [
    {name: '全系统', value: '1'},
    {name: '全组织', value: '10'},
    {name: '所有下级机构', value: '15'},
    {name: '指定对象', value: '20'}
  ]
}, {
  name: '监控屏选择',
  values: [
    {name: '可追溯商品数据中心', value: '1'},
    {name: '溯源企业卫星地图', value: '2'},
    {name: '溯源地区热度图', value: '3'},
    {name: '气象环境监测中心', value: '4'},
    {name: '扶贫数据中心', value: '5'},
    {name: '防伪数据统计中心', value: '6'},
    {name: '溯源数据统计中心', value: '7'},
    {name: '企业监控中心', value: '8'},
    {name: '企业气象环境监控中心', value: '9'}
  ]
}, {
  name: '轮播间隔',
  values: [
    {name: '30s', value: 30000},
    {name: '25s', value: 25000},
    {name: '20s', value: 20000},
    {name: '15s', value: 15000},
    {name: '10s', value: 10000},
    {name: '5s', value: 5000}
  ]
}, {
  name: '是否显示',
  values: [
    {name: '是', value: '1'},
    {name: '否', value: '0'},
    {name: '自动', value: '2'}
  ]
}, {
  name: '显示方式',
  values: [
    {name: '只显示气象', value: '1'},
    {name: '只显示监控', value: '2'},
    {name: '显示气象与监控', value: '3'}
  ]
}, {
  name: '保险类型',
  values: [
    {name: '综合险', value: '1'},
    {name: '基础险', value: '2'}
  ]
}, {
  name: '关联方式',
  values: [
    {name: '暂不关联', value: '0'},
    {name: '按组织关联', value: '1'},
    {name: '按机构关联', value: '2'},
    {name: '按产品批次关联', value: '3'},
    {name: '按码关联', value: '4'}
  ]
}, {
  name: '区域类型',
  values: [
    {name: '省/直辖市/自治区地图', value: '1'},
    {name: '市地图', value: '2'},
    {name: '区／县域地图', value: '3'}
  ]
}, {
  name: '是否个性化',
  values: [
    {name: '否', value: '0'},
    {name: '是', value: '1'}
  ]
}, {
  name: '码关联方式',
  values: [
    {name: '单码', value: '0'},
    {name: '号段', value: '1'},
    {name: '整批', value: '2'}
  ]
}];

export default enumUtil.format(enums);
