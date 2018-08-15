// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // extends: [
  //   // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  //   // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  //   'plugin:vue/essential', 
  //   // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  //   'standard'
  // ],
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    // 'vue'
    'html'
  ],
  // add your custom rules here
  rules: {
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
    'no-new': 0,
    'prefer-promise-reject-errors': 2,
    'no-multi-spaces': 0,
    'no-useless-escape': 0,
    'no-unused-expressions': 0,
    'standard/no-callback-literal': 0
  },
  globals: {
    AMap: false,
    CjmError: false
  }
}
