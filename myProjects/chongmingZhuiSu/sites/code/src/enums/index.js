import enumUtil from 'framework/utils/enum'

const enums = [{
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
  name: '数据分析时间查询',
  values: [
    {name: '最近7天', value: '7'},
    {name: '最近15天', value: '15'},
    {name: '最近30天', value: '30'}
  ]
}, {
  name: '码关联方式',
  values: [
    {name: '单码', value: '0'},
    {name: '号段', value: '1'}
  ]
}, {
  name: '生码状态',
  code: 'codeGenerationStatus',
  values: [
    {name: '已录入', code: 'ENTERED', value: '0'},
    {name: '已提交', code: 'COMMITTED', value: '1'},
    {name: '生码中', code: 'GENERATING', value: '2'},
    {name: '已生码', code: 'GENERATED', value: '3'},
    {name: '加密中', code: 'ENCRYPTING', value: '4'},
    {name: '已加密', code: 'ENCRYPTED', value: '5'}
  ]
}, {
  name: '生码审核状态',
  code: 'codeApproveStatus',
  values: [
    {name: '审核不通过', code: 'FAILED', value: '0'},
    {name: '审核通过', code: 'PASS', value: '1'},
    {name: '未审核', code: 'NONE', value: '2'}
  ]
}, {
  name: '生码变更审核状态',
  code: 'codeAlterApproveStatus',
  values: [
    {name: '审核不通过', code: 'FAILED', value: '0'},
    {name: '审核通过', code: 'PASS', value: '1'},
    {name: '未审核', code: 'NONE', value: '2'}
  ]
}, {
  name: 'SV状态',
  code: 'svComposeStatus',
  values: [
    {name: '未合成', code: 'BEFORE_COMPOSE', value: '0'},
    {name: '正在合成', code: 'COMPOSING', value: '1'},
    {name: '已合成', code: 'COMPOSED', value: '2'}
  ]
}, {
  name: '码功能',
  code: 'codeFunctionType',
  values: [
    {name: '防伪', code: 'ANTIFAKE', value: '1'},
    {name: '物流', code: 'LOGISTICS', value: '2'},
    {name: '积分', code: 'INTEGRAL', value: '3'}
  ]
}, {
  name: '码类型',
  code: 'codeType',
  values: [
    {name: '17+4', code: 'MINGANMA', value: '1'},
    {name: 'π技术', code: 'PAI', value: '2'},
    {name: '码上图', code: 'MASHANGTU', value: '3'},
    {name: 'SV', code: 'SV', value: '4'},
    {name: '农药码', code: 'PESTICIDE', value: '5'}
  ]
}, {
  name: '码上图模板',
  code: 'maShangTuTemplate',
  values: [
    {name: '生肖', code: 'SHENG_XIAO', value: '1'},
    {name: '星座', code: 'XING_ZUO', value: '2'},
    {name: '多边形', code: 'DUO_BIAN_XING', value: '3'}
  ]
}, {
  name: '系统',
  code: 'systemCode',
  values: [
    {name: '超级码系统', code: 'SUPERCODE', value: 'SuperCode'},
    {name: '农产品溯源系统', code: 'AGRICULTURE', value: 'Agriculture'}
  ]
}, {
  name: '码排版',
  code: 'textPosition',
  values: [
    {name: '在前', code: 'BEFORE', value: '1'},
    {name: '在后', code: 'AFTER', value: '2'}
  ]
}, {
  name: '防伪码网址',
  values: [
    {name: 'http://cjm.so/f/  【防伪码专用】', value: 'http://cjm.so/f/'},
    {name: 'http://cjm.so/s/  【溯源码专用】', value: 'http://cjm.so/s/'},
    {name: 'http://cjm.so/j/  【积分码专用】', value: 'http://cjm.so/j/'},
    {name: 'http://cjm.so/w/  【物流码专用】', value: 'http://cjm.so/w/'},
    {name: '其他', value: '-1'}
  ]
}, {
  name: '允许防伪查询次数',
  values: [
    {name: '不限', value: '0'},
    {name: '1次', value: '1'},
    {name: '2次', value: '2'},
    {name: '3次', value: '3'}
  ]
}, {
  name: '防伪技术特征',
  values: [
    {name: '数码防伪', value: '1'},
    {name: '扫码防伪', value: '2'},
    {name: '印钞版纹', value: '22'},
    {name: '缩微文字', value: '25'},
    {name: 'π技术防伪', value: '39'},
    {name: '开窗安全线', value: '3'},
    {name: '激光嵌入式塑膜', value: '5'},
    {name: '语音点读', value: '21'},
    {name: '多彩镭射条', value: '17'},
    {name: '激光定位烫', value: '13'},
    {name: '塑膜', value: '4'},
    {name: '彩虹全息纸', value: '6'},
    {name: '轮胎胶材', value: '7'},
    {name: '撕不烂纸', value: '8'},
    {name: '易碎纸', value: '9'},
    {name: 'PVC材', value: '10'},
    {name: '揭开式', value: '11'},
    {name: '防揭起刀痕', value: '12'},
    {name: '激光全息', value: '14'},
    {name: '3D激光膜', value: '15'},
    {name: '通版放射状激光膜', value: '16'},
    {name: '随便烫', value: '18'},
    {name: '三维激光冷烫', value: '19'},
    {name: '开锁防伪', value: '20'},
    {name: '浮雕', value: '23'},
    {name: '潜影', value: '24'},
    {name: '彩虹印刷', value: '26'},
    {name: '点阵对应', value: '27'},
    {name: '大小码', value: '28'},
    {name: '逻辑对应', value: '29'},
    {name: '彩色二维码', value: '30'},
    {name: '温变防伪', value: '31'},
    {name: '荧光防伪', value: '32'},
    {name: '滴水防伪', value: '33'},
    {name: '光变防伪', value: '34'},
    {name: '核径迹防伪', value: '35'},
    {name: '荧光纤维', value: '36'},
    {name: '证券纸', value: '37'},
    {name: '水印纸', value: '38'}
  ]
}, {
  name: '标签显示样式',
  code: 'tagCardStyle',
  values: [
    {name: '横向', code: 'HORIZONTAL', value: '1'},
    {name: '纵向', code: 'VERTICAL', value: '2'}
  ]
}, {
  name: '防伪生效时间',
  code: 'antiFakeEnableTime',
  values: [
    {name: '发货前', code: 'BEFORE_DELIVER', value: '1'},
    {name: '发货后', code: 'AFTER_DELIVER', value: '2'},
    {name: '收货后', code: 'AFTER_RECEIVE', value: '3'}
  ]
}, {
  name: '物流码网址',
  values: [
    {name: 'http://cjm.so/f/  【防伪码专用】', value: 'http://cjm.so/f/'},
    {name: 'http://cjm.so/s/  【溯源码专用】', value: 'http://cjm.so/s/'},
    {name: 'http://cjm.so/w/  【物流码专用】', value: 'http://cjm.so/w/'},
    {name: '其他', value: '-1'}
  ]
}, {
  name: '物流码位数',
  values: [
    {name: '16位', value: '16'},
    {name: '18位', value: '18'}
  ]
}, {
  name: '物流码层数',
  code: 'layerNumber',
  values: [
    {name: '无层级', code: 'NONE', value: '1'},
    {name: '二级', code: 'TWO', value: '2'},
    {name: '三级', code: 'THREE', value: '3'}
  ]
}, {
  name: '物流码层级',
  code: 'codeLayer',
  values: [
    {name: '大标', code: 'ONE', value: '1'},
    {name: '中标', code: 'TWO', value: '2'},
    {name: '小标', code: 'THREE', value: '3'}
  ]
}, {
  name: '物流码规则',
  code: 'codeRule',
  values: [
    {name: '随机', code: 'RANDOM', value: '1'},
    {name: '顺序', code: 'ORDINAL', value: '2'}
  ]
}, {
  name: '积分定义方式',
  code: 'isIntegralDefineLater',
  values: [
    {name: '前定义', code: 'NO', value: '0'},
    {name: '后定义', code: 'YES', value: '1'}
  ]
}, {
  name: 'OID行业分配码',
  values: [
    {name: '10001—肉菜', value: '10001'},
    {name: '10002—中药材', value: '10002'}
  ]
}, {
  name: 'OID追溯方式码百位',
  values: [
    {name: '1—品类', value: '1'},
    {name: '2—批次', value: '2'},
    {name: '3—单品', value: '3'}
  ]
}, {
  name: 'OID追溯方式码十位个位',
  values: [
    {name: '01—何人', value: '01'},
    {name: '02—何处', value: '02'},
    {name: '03—何时', value: '03'},
    {name: '04—何物', value: '04'},
    {name: '05—何人、何处', value: '05'},
    {name: '06—何人、何时', value: '06'},
    {name: '07—何人、何物', value: '07'},
    {name: '08—何处、何时', value: '08'},
    {name: '09—何处、何物', value: '09'},
    {name: '10—何时、何物', value: '10'},
    {name: '11—何人、何处、何时', value: '11'},
    {name: '12—何人、何处、何物', value: '12'},
    {name: '13—何人、何时、何物', value: '13'},
    {name: '14—何处、何时、何物', value: '14'},
    {name: '15—何人、何时、何处、何物', value: '15'}
  ]
}, {
  name: '生产订单状态',
  values: [
    {name: '未下单', value: '0'},
    {name: '已下单', value: '1'}
  ]
}, {
  name: '生产订单紧急程度',
  values: [
    {name: '正常', value: '1'},
    {name: '加急', value: '2'}
  ]
}, {
  name: '生产订单客户类型',
  values: [
    {name: '老客户', value: '1'},
    {name: '新客户', value: '2'}
  ]
}, {
  name: '生产订单状态',
  values: [
    {name: '未提交', value: '1'},
    {name: '待审核', value: '2'},
    {name: '审核通过', value: '3'},
    {name: '审核不通过', value: '4'}
  ]
}, {
  name: '生产订单-发放方式',
  values: [
    {name: '发杭州总部', value: '1'},
    {name: '直发客户', value: '2'}
  ]
}, {
  name: '有无',
  values: [
    {name: '有', value: '1'},
    {name: '无', value: '0'}
  ]
}]

export default enumUtil.format(enums)
