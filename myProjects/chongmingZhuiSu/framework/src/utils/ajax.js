/**
 * ajax工具类，已注入到Vue中，可通过Vue.ajax或者Vue实例的.$ajax调用
 * @module utils/ajax
 */
import axios from 'axios'

const qs = require('qs');
const formatParams = function (params) {
  params = params || {};
  let result = {};
  for (let key in params) {
    const objType = Object.prototype.toString.call(params[key]).slice(8, -1);
    if (objType === 'Object' || objType === 'Array') {
      result[key] = JSON.stringify(params[key]);
    } else {
      result[key] = params[key];
    }
  }
  return result;
};

export const ajax = {
  /**
   * 发送ajax get请求
   * @alias module:utils/ajax.get
   * @param url {String} 请求地址
   * @param params {Object} http参数
   * @param options {Object}
   * @returns {Promise}
   */
  get: function (url, params, options) {
    options = options || {};
    let formatResult = formatParams(params);
    formatResult._r_ = Math.floor(Math.random() * 10000000 + 10000000); //增加一个随机数参数，禁止IE的缓存
    options.params = formatResult;
    return new Promise((resolve, reject) => {
      axios.get(url, options).then((res) => {
        if (res) {
          resolve(res.data);
        }
      }).catch(reject);
    })
  },
  /**
   * 发送ajax post请求
   * @alias module:utils/ajax.post
   * @param url {String} 请求地址
   * @param params {Object} http参数
   * @param options {Object}
   * @returns {Promise}
   */
  post: function (url, params, options) {
    //需要对复杂对象进行JSON序列化
    let formatResult = formatParams(params);
    formatResult = qs.stringify(formatResult);
    return new Promise((resolve, reject) => {
      axios.post(url, formatResult, options).then((res) => {
        if (res) {
          // console.log(res)
          resolve(res.data);
        }
      }).catch(reject);
    })
  }
};
//
export const ajaxSync = {
  async get(url, params, options) {
    let err = null,
      res = null;
    try {
      res = await ajax.get(url, params, options);
      if (res.resultCode != 200) {
        err = new Error(res.msg);
      }
    } catch (error) {
      err = error;
    }
    return {
      res,
      err
    };
  },
  async post(url, params, options) {
    let err = null,
      res = null;
    try {
      res = await ajax.post(url, params, options);
      if (res.resultCode != 200) {
        err = new Error(res.msg);
      }
    } catch (error) {
      err = error;
    }
    return {
      res,
      err
    };
  }
};
export default {
  install(Vue) {
    Vue.prototype.$ajax = ajax;
    Vue.ajax = ajax;
    //
    Vue.prototype.$ajaxSync = ajaxSync;
    Vue.ajaxSync = ajaxSync;
  }
}
