let navList = [
  //运营商
  [
    {url: 'index', name: '首页', active: true},
    {
      name: '进货管理',
      active: false,
      subItem: [
        {url: 'purchasePurchase', name: '采购进货', active: false},
        {url: 'purchaseAccount', name: '进货台账', active: false},
        {url: 'stayTuned', name: '采购退货', active: false},
        {url: 'stayTuned', name: '采购退货记录', active: false}
      ]
    },
    {
      name: '销售管理',
      active: false,
      subItem: [
        {url: 'salesReceipt', name: '销售', active: false},
        {url: 'salesAccount', name: '销售台账', active: false},
        {url: 'stayTuned', name: '销售退货', active: false},
        {url: 'stayTuned', name: '销售退货记录', active: false}
      ]
    },
    {
      name: '仓库管理',
      active: false,
      subItem: [
        {url: 'inventoryTable', name: '库存表', active: false},
        {url: 'stayTuned', name: '库存分析', active: false},
        {url: 'stayTuned', name: '库存盘点', active: false},
        {url: 'stayTuned', name: '盘点记录', active: false},
        {url: 'stayTuned', name: '库存预警', active: false}
      ]
    },
    {
      name: '资料管理',
      active: false,
      subItem: [
        {url: 'businessEntityManagement', name: '经营主体管理', active: false},
        {url: 'customerList', name: '客户管理', active: false},
        {url: 'supplierList', name: '供应商管理', active: false},
        {url: 'productList', name: '商品管理', active: false}
      ]
    },
    {url: 'stayTuned', name: '病虫害查询', active: false},
    {
      name: '数据分析',
      active: false,
      subItem: [
        {url: 'stayTuned', name: '财务报表', active: false},
        {url: 'stayTuned', name: '库存分析', active: false},
        {url: 'stayTuned', name: '销售分析', active: false},
        {url: 'stayTuned', name: '高毒农药销售分析', active: false}
      ]
    },
    {
      name: '配方管理',
      active: false,
      subItem: [
        {url: 'stayTuned', name: '创建处方', active: false},
        {url: 'stayTuned', name: '处方单列表', active: false}
      ]
    },
    {
      name: '禁限农药',
      active: false,
      subItem: [
        {url: 'forbiddenPesticides', name: '禁用农药', active: false},
        {url: 'restrictedPesticides', name: '限用农药', active: false}
      ]
    },
    {
      name: '系统管理',
      active: false,
      subItem: [
        {url: 'role', name: '角色管理', active: false},
        {url: 'account', name: '账号管理', active: false},
        {url: 'smallTicketConfig', name: '小票设置', active: false},
        {url: 'userPrintConfig', name: '驱动设置', active: false}
      ]
    },
    {
      name: '农技服务',
      active: false,
      subItem: [
        {url: 'stayTuned', name: '农技知识', active: false},
        {url: 'stayTuned', name: '农技新闻', active: false}
      ]
    },
    {
      url: 'stayTuned',
      name: '许可证申请',
      active: false
    }
  ],
  //政府
  [
    {url: 'index', name: '首页', active: true},
    {url: 'stayTuned', name: '经营主体注册审核', active: false},
    {url: 'stayTuned', name: 'GIS店铺地图', active: false},
    {url: 'stayTuned', name: '经营主体总览', active: false},
    {url: 'stayTuned', name: '店铺进货台账', active: false},
    {url: 'stayTuned', name: '店铺销售台账', active: false},
    {url: 'stayTuned', name: '高毒农药销售提醒', active: false},
    {url: 'stayTuned', name: '新闻发布公告', active: false},
    {url: 'stayTuned', name: '红黑榜', active: false},
    {
      name: '监督执法',
      subItem: [
        {url: 'stayTuned', name: '行政执法', active: false},
        {url: 'stayTuned', name: '执法记录', active: false}
      ]
    },
    {url: 'stayTuned', name: '数据分析', active: false},
    {
      name: '系统管理',
      active: false,
      subItem: [
        {url: 'menu', name: '菜单管理', active: false},
        {url: 'org', name: '组织管理', active: false},
        {url: 'businessRegistrationAudit', name: '经营注册审核', active: false},
        {url: 'businessEntityList', name: '经营主体管理', active: false},
        {url: 'role', name: '角色管理', active: false},
        {url: 'account', name: '账号管理', active: false}
      ]
    }
  ],
  //经营主体
  [
    {url: 'index', name: '首页', active: true},
    {
      name: '系统管理',
      active: false,
      subItem: [
        {url: 'org', name: '组织管理', active: false},
        {url: 'role', name: '角色管理', active: false},
        {url: 'account', name: '账号管理', active: false},
        {url: 'stayTuned', name: 'LOGO设置', active: false}
      ]
    }
  ]
];

export default navList;
