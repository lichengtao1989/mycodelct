import enumUtil from 'framework/utils/enum'
const enums = [
  {
    name: '机构类型', code: 'orgType',
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
  },
  {
    name: '组织类型', code: 'corpType',
    values: [
      {name: '企业', code: 'CORP', value: '1'},
      {name: '运营商', code: 'OPERATORS', value: '2'},
      {name: '政府', code: 'GOVERNMENT', value: '3'},
      {name: '检测公司', code: 'TESTING_COMPANY', value: '4'},
      {name: '保险公司', code: 'INSURANCE_COMPANY', value: '5'},
      {name: '印刷工厂', code: 'PRINTING_FACTORY', value: '6'}
    ]
  },
  {
    name: '装箱级别',
    values: [{name: '箱标与单标', value: '3'}, {name: '垛标与箱标', value: '2'}]
  },
  {
    name: '物流处理状态',
    values: [{name: '成功', value: '1'}, {name: '失败', value: '2'}]
  },
  {
    name: '操作类型',
    values: [{name: '装箱', value: '1'}, {name: '拆箱', value: '2'}, {name: '补标入箱', value: '3'}, {name: '分离单标', value: '4'}]
  },
  {
    name: '物流操作方式',
    values: [{name: '手工输入', value: '1'}, {name: '扫描上传', value: '3'}]
  },
  {
    name: '物流入库方式',
    values: [
      {name: '生产入库', value: '1'},
      {name: '退货入库', value: '2'},
      {name: '调货入库', value: '3'},
      {name: '调拨入库', value: '4'},
      {name: '拆解入库', value: '5'},
      {name: '分离入库', value: '6'},
      {name: '发货入库', value: '7'},
      {name: '盘盈入库', value: '30'},
      {name: '调整入库', value: '31'}
    ]
  },
  {
    name: '出库科目',
    values: [{name: '盘亏出库', value: '40'}, {name: '调整出库', value: '41'}]
  },
  {
    name: '入库科目',
    values: [{name: '盘盈入库', value: '30'}, {name: '调整入库', value: '31'}]
  },
  {
    name: '盘点状态',
    values: [{name: '未开始', value: '1'}, {name: '进行中', value: '2'}, {name: '结束', value: '3'}]
  },
  {
    name: '台账出入库科目',
    values: [
      {name: '生产入库', value: '1'},
      {name: '退货入库', value: '2'},
      {name: '调货入库', value: '3'},
      {name: '调拨入库', value: '4'},
      {name: '拆解入库', value: '5'},
      {name: '分离入库', value: '6'},
      {name: '发货入库', value: '7'},
      {name: '发货出库', value: '10'},
      {name: '拆解出库', value: '11'},
      {name: '补标出库', value: '12'},
      {name: '装箱出库', value: '13'},
      {name: '退货出库', value: '14'},
      {name: '调货出库', value: '15'},
      {name: '调拨出库', value: '16'},
      {name: '销售出库', value: '19'},
      {name: '盘盈入库', value: '30'},
      {name: '调整入库', value: '31'},
      {name: '盘亏出库', value: '40'},
      {name: '调整出库', value: '41'}
    ]
  },
  {
    name: '物流出库方式',
    values: [
      {name: '发货出库', value: '10'},
      {name: '拆解出库', value: '11'},
      {name: '补标出库', value: '12'},
      {name: '装箱出库', value: '13'},
      {name: '退货出库', value: '14'},
      {name: '调货出库', value: '15'},
      {name: '调拨出库', value: '16'},
      {name: '销售出库', value: '19'},
      {name: '盘亏出库', value: '40'},
      {name: '调整出库', value: '41'}
    ]
  },
  {
    name: '台账出入库',
    values: [{name: '出库', value: '-1'}, {name: '入库', value: '1'}]
  }
];
export default enumUtil.format(enums);
