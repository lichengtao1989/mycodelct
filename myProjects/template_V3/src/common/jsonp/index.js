import originJsonp from 'jsonp';
// import {commonParams, options} from './config'
const ncpURL = window.wap_config.data_service_site + '/JsonDataService.ashx';
let cjmURL = window.wap_config.data_service_supercode + '/JsonDataService.ashx';

function jsonp(data) {
  let url = '';
  if (data.type === 'cjm') {
    url = `${cjmURL}?${param(data)}`;
  } else if (data.type === 'ncp') {
    url = `${ncpURL}?${param(data)}`;
  }

  return new Promise((resolve, reject) => {
    originJsonp(url, {jsonp: 'callback', dataType: 'jsonp'}, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function param(data) {
  let url = '';
  for (var k in data) {
    if (k !== 'type') {
      let value = data[k] !== undefined ? data[k] : '';
      if (value != '') {
        url += '&' + k + '=' + encodeURIComponent(value);
      }
    }
  }
  return url ? url.substring(1) : '';
}

export default {
  install(Vue) {
    Vue.prototype.$jsonp = jsonp;
    Vue.jsonp = jsonp;
  }
};
