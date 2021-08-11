module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true,
    browser: true
  },
  globals: {
    Markdown: true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended', 'eslint:recommended'],
  rules: {
    // 修改默认prettier规则，这里配置才生效
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 是否使用单引号
        semi: false, // 是否强制在每段末尾使用分号
        trailingComma: 'none', // 尾随逗号
        jsxBracketSameLine: true, // jsx的‘>’符号是否需要在同一行显示
        arrowParens: 'avoid', // 箭头函数一个参数是否带括号
        endOfLine: 'crlf', // 换行符
        printWidth: 100 // 指定每行代码的最佳长度， 如果超出长度则换行
      }
    ],
    // eqeqeq: ['error', 'always'],
    'no-unused-vars': ['error'], // 禁止出现未使用过的变量
    'space-before-function-paren': 'off', // 方法名后是否保留空格
    'no-async-promise-executor': 'off', // promise上不能使用async
    'comma-dangle': ['error', 'never'], // 禁用拖尾逗号
    'vue/max-attributes-per-line': 'off', // 元素属性超过几个换行显示
    'vue/no-mutating-props': 'off', // 子组件不允许修改父组件值
    'vue/require-default-prop': 1, // 是否需要设置默认的prop值
    'vue/custom-event-name-casing': 'off', // 自定义事件名执行 kebab-case
    'vue/singleline-html-element-content-newline': 'off', // html文本是否需要单起一行
    'vue/no-use-v-if-with-v-for': 1 // 是否不允许v-if和v-for同时使用
  }
}
