export default {
  autoComplete: {
    //工厂名称
    GET_FACTORYS: '/CodeAshx/CodeGenerationDownload.ashx?function=getFactorys'
  },
  //数据下载
  codeData: {
    //获取列表
    GET_LIST: '/CodeAshx/CodeGenerationDownload.ashx?function=getList',
    //短信是否授权
    IS_SMS_AUTH: '/CodeAshx/CodeGenerationDownload.ashx?function=IsSmsAuth',
    //获取明文token
    GET_TOKEN: '/CodeAshx/CodeGenerationDownload.ashx?function=GetToken',
    //获取验证码
    GET_CODE: '/CodeAshx/common.ashx?function=getcode',
    //验证验证码
    CHECK_CODE: '/CodeAshx/common.ashx?function=checkcode',
    //明文下载
    EXPRESS_DOWNLOAD: '/CodeAshx/CodeGenerationDownload.ashx?function=download',
    //密文下载
    // DOWNLOAD2: 'http://df.kf315.net/CodeGeneration/getfile',
    //再次申请下载
    APPLY: '/CodeAshx/CodeGenerationDownload.ashx?function=apply',
    //获取当前登陆用户的手机号码
    GET_USER_INFO: '/Ashx/user.ashx?function=getUserInfo'
  }
}
