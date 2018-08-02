import axios from 'axios'
const qs = require('qs');
const formatParams = function (params) {
  params = params || {};
  let result = {};
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value != null && typeof value === 'object') {
      if (value.constructor === Array) {
        value.forEach(item => {
          result[`${key}[]`] = item;
        });
      } else {
        Object.keys(value).forEach(valueKey => {
          result[`${key}[${valueKey}]`] = value[valueKey];
        });
      }
    } else {
      result[key] = value;
    }
  });
  return result;
};
function submit(url, data) {
  let postData = formatParams(data);
  postData = qs.stringify(postData);
  return axios.post(url, postData).then(res => {
    return Promise.resolve(res.data);
  });
}

export default submit;
