import axios from 'axios'
const qs = require('qs');

function formatParams(params) {
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
}

function ajaxGet(url, params, options) {
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
}

function ajaxPost(url, params, options) {
  //需要对复杂对象进行JSON序列化
  let formatResult = formatParams(params);
  formatResult = qs.stringify(formatResult);
  // formatResult = qs.stringify(formatResult, {
  //   arrayFormat: 'brackets'
  // });
  // console.log(formatResult);
  return new Promise((resolve, reject) => {
    axios.post(url, formatResult, options).then((res) => {
      if (res) {
        resolve(res.data);
      }
    }).catch(reject);
  })
}
const ajax = {
  async get(url, params, options) {
    let err = null,
      res = null;
    try {
      res = await ajaxGet(url, params, options);
      if (res.ResultCode != 200) {
        err = new Error(res.Error);
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
      res = await ajaxPost(url, params, options);
      if (res.ResultCode != 200) {
        err = new Error(res.Error);
      }
    } catch (error) {
      err = error;
    }
    return {
      res,
      err
    };
  },
  addHandler(handler) {
    axios.interceptors.response.use(function (res) {
      handler(res);
      return res;
    }, function (error) {
      handler(error);
      return Promise.reject(error);
    });
  }
};
export default {
  install(Vue) {
    Vue.prototype.$ajax = ajax;
    Vue.ajax = ajax;
  }
};
