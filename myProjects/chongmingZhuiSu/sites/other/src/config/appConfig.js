//通用配置
const config = {
  poorFarmilyImportTemplateUrl: 'static/files/贫困户模版.xls',
  povertyRecordImportTemplateUrl: 'static/files/扶贫记录模版.xls',
  povertyIncomeRecordImportTemplateUrl: 'static/files/贫困职工收入记录模板.xls',
  FarmingManagement: 'static/files/农事记录导入模板.xlsx'
};

if (process.env.NODE_ENV === 'production') {
  //生产环境配置
  Object.assign(config, {});
} else {
  //测试环境和开发环境的配置
  Object.assign(config, {});
}

export default config;
