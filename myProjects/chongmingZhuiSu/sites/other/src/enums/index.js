import enumUtil from 'framework/utils/enum';

const enums = [
  {
    name: '是否',
    code: 'yesOrNo',
    values: [
      { name: '是', code: 'YES', value: '1' },
      { name: '否', code: 'NO', value: '0' }
    ]
  },
  {
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
  },
  {
    name: '贫困类型',
    values: [{ name: '一般贫困户', value: '1' }, {name: '五保户', value: '2'}, {name: '低保贫困户', value: '3'}, {name: '建档立卡户', value: '4'}, {name: '农村低保户', value: '5'}, {name: '城镇低保户', value: '6'}, {name: '一般农户', value: '7'}, {name: '低保户', value: '8'}, {name: '五保贫困户', value: '9'}]
  },
  {
    name: '脱贫情况',
    values: [
      { name: '脱贫', value: '1' },
      { name: '未脱贫', value: '2' }
    ]
  },
  {
    name: '扶贫类型',
    values: [
      { name: '电商扶贫', value: '1' },
      { name: '产业扶贫', value: '2' },
      { name: '社会帮扶', value: '3' }
    ]
  },
  {
    name: '产业类型',
    values: [
      { name: '种植类', value: '1' },
      { name: '养殖类', value: '2' },
      { name: '加工类', value: '3' }
    ]
  },
  {
    name: '耳标处理类型',
    values: [
      {name: '挂耳标', value: '1'},
      {name: '补标', value: '2'},
      {name: '转栏', value: '3'}
    ]
  }
];

export default enumUtil.format(enums);
