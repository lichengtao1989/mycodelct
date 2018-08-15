import enumUtil from 'framework/utils/enum';

const enums = [
  {
    code: 'menuType',
    values: [
      { code: 'NODE', value: '1' },
      { code: 'FUNCTION', value: '2' },
      { code: 'CARD', value: '3' }
    ]
  },
  {
    name: '菜单类型',
    code: 'powerType',
    values: [
      { name: '一级菜单', code: 'MENU1', value: '1' },
      { name: '二级菜单', code: 'MENU2', value: '2' },
      { name: '三级菜单', code: 'MENU3', value: '3' },
      { name: '标签页', code: 'TAB', value: '4' },
      { name: '卡片页', code: 'CARD', value: '5' }
    ]
  },
  {
    name: '卡片分类',
    code: 'cardCategory',
    values: [
      { name: '通知', code: 'NOTIFICATION', value: '0' },
      { name: '图表', code: 'GRAPH', value: '1' },
      { name: '引导', code: 'GUIDE', value: '2' },
      { name: '定制', code: 'CUSTOMIZATION', value: '3' }
    ]
  },
  {
    name: '图表卡片分类',
    code: 'graphCardCategory',
    values: [
      { name: '折线', code: 'LINE', value: '1' },
      { name: '柱状', code: 'BAR', value: '2' },
      { name: '饼状', code: 'PIE', value: '3' },
      { name: '地图', code: 'MAP', value: '4' },
      { name: '数字', code: 'NUMBER', value: '5' }
    ]
  },
  {
    name: '卡片尺寸',
    code: 'cardSize',
    values: [{ name: '标准', code: 'SIZE1', value: '1' }, { name: '大', code: 'SIZE2', value: '2' }]
  },
  {
    name: 'logo显示方式',
    code: 'logoShowWay',
    values: [
      { name: '图片', code: 'IMAGE', value: '0' },
      { name: '文字', code: 'TEXT', value: '1' }
    ]
  }
];

export default enumUtil.format(enums);
