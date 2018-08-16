export default {
  //登录
  LOGIN: '/nzjxcApi/SysUser/Login',
  //退出
  LOGOUT: '/nzjxcApi/SysUser/LogOut',
  //注册
  REGISTER: '/nzjxcApi/Store/Register',
  //获取用户列表
  GET_LIST: '/nzjxcApi/SysUser/GetList',
  //获取单个用户信息
  GET: '/nzjxcApi/SysUser/Get',
  //修改密码
  RESET_PASSWORD: '/nzjxcApi/SysUser/ResetPassword',
  //找回密码
  RETRIEVE_PASSWORD: '/nzjxcApi/SysUser/RetrievePassword',
  //检测手机号码是否已注册
  IS_EXIST: '/nzjxcApi/Store/IsExist',
  //检测手机号码是否已注册
  GET_ORG_INFO: '/nzjxcApi/Store/GetOrgInfo',
  //保存小票模板打印驱动信息
  SAVE_USER_PRINT_CONFIG: '/nzjxcApi/UserPrintConfig/Save',
  //获取用户驱动信息
  GET_USER_PRINT_CONFIG: '/nzjxcApi/UserPrintConfig/Get',
  //获取默认小票打印模板
  PRINT_TEMPLET: '/nzjxcApi/SmallticketConfig/Print',
  // 保存小票模板信息
  SAVE_PRINT_TEMPLET: '/nzjxcApi/SmallticketConfig/Save',
  // 获取小票模板列表
  GET_LIST_PRINT_TEMPLET: '/nzjxcApi/SmallticketConfig/GetList',
  // 获取小票模板列表
  GET_PRINT_TEMPLET: '/nzjxcApi/SmallticketConfig/Get',
  //获取默认小票打印模板
  DEFAULT_PRINT_CONFIG: '/nzjxcApi/SmallticketConfig/DefaultPrintConfig',
  //获取账号列表
  GET_ACCOUNT_LIST: '/nzjxcApi/SysUser/GetAccountList',
  //新增账号
  SAVE_ACCOUNT_LIST: '/nzjxcApi/SysUser/AccountSave',
  //新增账号
  SET_STATUS: '/nzjxcApi/SysUser/SetStatus',
  //账号重置密码
  RESET_PWD: '/nzjxcApi/SysUser/ResetPwd',
  //获取账号信息
  GET_ACCOUNT_BY_ID: '/nzjxcApi/SysUser/GetAccountByID'
}
