// https://github.com/vuejs-templates/webpack/blob/master/template/.eslintrc.js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'airbnb-base', // 更加严格的规范，更加符合es6 https://github.com/airbnb/javascript#strings
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    // 'vuefix', // 自动格似乎vue文件，但不稳定，还有bug，以后跟进
    // 'import', // 不对import 引入进行管理
    'html',
  ],
  // 自定义规则，按首字母排序
  'rules': {
    'arrow-spacing': 0, //箭头函数前后间隔
    'curly': [2, 'all'], //要求遵循大括号约定
    'eqeqeq': 0,  // 使用=== 与 !==
    'guard-for-in': 0, //需要约束 for-in
    'keyword-spacing': 0, //关键字前后间隔控制
    'no-extend-native': 0, //允许扩展原生对象
    'no-extra-semi': 2, //没有多余的分号
    'no-inline-comments': 0,//禁止内联注释：即注释与执行语句同行
    'no-shadow': 0,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'one-var': 0, //要求或禁止在变量声明周围换行
    'object-curly-spacing': 0, //强制在花括号中使用一致的空格
    'prefer-const': 0, //建议使用const
    'semi': [0, 'always', {'omitLastInOneLineBlock': true}], //分号
    'spaced-comment': 0, //注释风格要不要有间隔
    'space-before-function-paren': 0, //函数定义时括号前面要不要有间隔
    'space-before-blocks': 0, //要求或禁止语句块之前的空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // allow debugger during development
    'object-property-newline': 0,
    'no-useless-escape': 0,
    'no-new': 0
  },
  globals: {
    AMap: false,
    CjmError: false
  }
}
