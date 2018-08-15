import 'babel-polyfill';
import Vue from 'vue';
import url from 'framework/utils/url';
import cookie from 'framework/utils/cookie';
import { storage } from 'framework/utils/storage';
import { clear } from './utils/logout';
import site from './site';
import { getBrowserType } from 'framework/utils/browser';
import Landing from './landing.vue';
import 'framework/assets/css/reset.css';

const browser = getBrowserType();
if (browser.indexOf('IE') > -1 && browser !== 'IE11') {
  new Vue({
    render: h => h(Landing)
  }).$mount('#app');
} else {
  const token = url.getParam('token');
  const systemId = url.getParam('systemId');
  const fromUrl = url.getParam('FromLoginUrl');

  if (token) {
    site.addClearHandlers();
    clear();
    cookie.set('access_token', token);

    if (systemId) {
      storage.set('systemId', systemId);
    } else {
      storage.remove('systemId');
    }
    if (fromUrl) {
      storage.set('fromUrl', fromUrl);
    } else {
      storage.remove('fromUrl');
    }

    location.href = 'index.html';
  } else {
    alert('登录异常');
  }
}
