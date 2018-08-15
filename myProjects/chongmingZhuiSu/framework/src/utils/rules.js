/**
 * 表单验证规则，已注入到Vue中，可通过Vue实例的.$formRules访问
 * @module utils/rules
 */
export const rules = {
  //必填
  required: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback(new Error('该项为必填项'))
      }
      if (Object.prototype.toString.call(value) === '[object Array]' && value.length === 0) {
        return callback(new Error('该项为必填项'))
      }
      return callback()
    },
    trigger: 'change,blur'
  },
  //手机号
  mobile: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //固定电话
  telephone: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{3})-(\d{8})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)|(^(\d{7})$)|(^(\d{8})$)/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的电话号码'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //手机号或者固定电话
  phoneOrMobile: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg1 = /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{3})-(\d{8})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)|(^(\d{7})$)|(^(\d{8})$)/
      const reg2 = /^1[3|4|5|6|7|8|9]\d{9}$/
      if (!reg1.test(value) && !reg2.test(value)) {
        return callback(new Error('请输入正确的手机号或电话号码'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //最小长度
  minLength: function (length) {
    return {
      min: length,
      message: `至少输入${length}个字符`,
      trigger: 'blur'
    }
  },
  //最大长度
  maxLength: function (length) {
    return {
      max: length,
      message: `最多输入${length}个字符`,
      trigger: 'blur'
    }
  },
  //整数
  int: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^\-?\d+?$/
      if (!reg.test(value)) {
        return callback(new Error('请输入整数'))
      }
      if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        return callback(new Error('您输入的数字太大啦'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //范围内的整数
  intRange: function (min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback()
        }
        const reg = /^\-?\d+?$/
        if (!reg.test(value)) {
          return callback(new Error('请输入整数'))
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的整数`))
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的整数`))
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'))
        }
        return callback()
      },
      trigger: 'blur'
    }
  },
  //范围内的长整型（64位）
  longRange: function (min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback()
        }
        const reg = /^\-?\d+?$/
        if (!reg.test(value)) {
          return callback(new Error('请输入整数'))
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的整数`))
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的整数`))
        }
        if (value > Math.pow(2, 63) || value < -Math.pow(2, 63)) {
          return callback(new Error('您输入的数字太大啦'))
        }
        return callback()
      },
      trigger: 'blur'
    }
  },
  //数字
  number: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^\-?\d+(\.\d+)?$/
      if (!reg.test(value)) {
        return callback(new Error('请输入数字'))
      }
      if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        return callback(new Error('您输入的数字太大啦'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //范围内的数字
  numberRange: function (min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback()
        }
        const reg = /^\-?\d+(\.\d+)?$/
        if (!reg.test(value)) {
          return callback(new Error('请输入数字'))
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的数字`))
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的数字`))
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error('您输入的数字太大啦'))
        }
        return callback()
      },
      trigger: 'blur'
    }
  },
  //ip地址
  ip: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的IP地址'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //URL地址
  url: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的URL地址'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //防伪码
  antifakeCode: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^(\d{20}|\d{21}|\d{22}|\d{36})$/
      if (!reg.test(value)) {
        return callback(new Error('请输入20位到22位或36位防伪码'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //物流码
  logisticsCode: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /^(\d{16}|\d{17}|\d{18}|\d{32})$/
      if (!reg.test(value)) {
        return callback(new Error('请输入16位到18位或32位物流码'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //身份证号
  idCardNo: {
    validator: (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        return callback()
      }
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的身份证号'))
      }
      return callback()
    },
    trigger: 'blur'
  },
  //指定长度
  length: function (length) {
    return {
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          return callback()
        }
        if (value.length != length) {
          return callback(new Error(`请输入${length}位字符`))
        }
        return callback()
      },
      trigger: 'blur'
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$formRules = rules
  }
}
