export default {
  //系统配置文件
  GET_APP_CONFIG: 'static/config/root-appConfig.json',
  //修改主题
  CHANGE_THEME: '/Ashx/User.ashx?function=changeTheme',
  //获取当前用户的权限
  GET_USER_POWER: '/Ashx/Power.ashx?function=GetUserOperatePowerCode',
  //获取当前用户的系统列表
  GET_USER_SYSTEM_LIST: '/Ashx/Power.ashx?function=GetSystemElementsList',
  // 获取用户菜单
  GET_USER_MENU: '/Ashx/Power.ashx?function=getHomeMenu',
  //修改密码
  CHANGE_PASSWORD: '/Ashx/User.ashx?function=changePassword',
  //获取用户配置
  GET_USER_CONFIG: '/Ashx/User.ashx?function=getUserConfig',
  // 获取用户信息
  GET_USER_INFO: '/Ashx/User.ashx?function=GetUserInfo',
  //获取弱密码返回
  GET_WEAKCODE: '/Ashx/Common.ashx?function=CheckWeakCipher',
  //卡片
  card: {
    //获取列表
    GET_LIST: '/Ashx/Card.ashx?function=getIndexList',
    // GET_LIST: 'static/mock/cardList.json',
    //隐藏/显示
    SET_VISIBLE: '/Ashx/Card.ashx?function=setVisible',
    CodeOrgAssignList: '/Module/Logistics/CodeOrgAssignList.aspx?response=json&function=GetAuditingList'
  },
  //通知
  notification: {
    //读取通知
    READ: '/Ashx/NotificationNew.ashx?function=setRead'
  }
};
