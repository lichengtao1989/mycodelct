function parseCookieString(text, shouldDecode) {
  var cookies = {};

  if (typeof text === 'string' && text.length > 0) {
    var cookieParts = text.split(/;\s/g);
    var cookieName;
    var cookieValue;
    var cookieNameValue;

    for (var i = 0, len = cookieParts.length; i < len; i++) {
      cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
      if (cookieNameValue instanceof Array) {
        try {
          cookieName = decodeURIComponent(cookieNameValue[1]);
          if (shouldDecode) {
            cookieValue = decodeURIComponent(cookieParts[i].substring(cookieNameValue[1].length + 1));
          } else {
            cookieValue = cookieParts[i].substring(cookieNameValue[1].length + 1);
          }
        } catch (ex) {
          // Intentionally ignore the cookie -
          // the encoding is wrong
        }
      } else {
        // Means the cookie does not have an "=", so treat it as
        // a boolean flag
        cookieName = decodeURIComponent(cookieParts[i]);
        cookieValue = '';
      }

      if (cookieName) {
        cookies[cookieName] = cookieValue;
      }
    }
  }

  return cookies;
}

export default {
  /**
   * 返回指定name的cookie
   * @param {String} name 要检索cookie的名称
   * @returns {*}
   */
  get: function (name, options) {
    options = options || {};
    var cookies = parseCookieString(document.cookie, !options['raw']);
    return cookies[name];
  },
  /**
   * 根据给定的名称和值设置一个cookie
   * @param {string} name cookie的名称
   * @param {*} value 设置cookie的值
   * @param {Object} [options] 包含cookie选项的对象：
   *    path (string) 默认根目录
   *    domain (string) 默认当前域名的domain
   *    expires (number or a Date object) 默认30天
   *    secure (boolean) 当属性设置为true时，cookie只有在https协议下才能上传到服务器。
   *    raw (boolean). 如果设置为true,cookie不应该在设置之前URI编码。
   * @returns {string} 创建的cookie字符串
   */
  set: function (name, value, options) {
    options = options || {};
    var expires = options['expires'];
    if (typeof expires === 'undefined') {
      // 默认30天有效期
      expires = 30;
    }
    var domain = options['domain'];
    if (!domain && document.domain != 'localhost') {
      domain = document.domain;
    }
    var path = options['path'] || '/';

    if (!options['raw']) {
      value = encodeURIComponent(String(value));
    }

    var text = name + '=' + value;

    // expires
    var date = expires;
    if (typeof date === 'number') {
      date = new Date();
      date.setDate(date.getDate() + expires);
    }
    if (date instanceof Date) {
      text += '; expires=' + date.toUTCString();
    }

    // domain
    if (domain) {
      text += '; domain=' + domain;
    }

    // path
    if (path) {
      text += '; path=' + path;
    }

    // secure
    if (options['secure']) {
      text += '; secure';
    }

    document.cookie = text;
    return text;
  },
  /**
   * 通过将cookie有效期设置成一个过去的时间来移除cookie
   * @param {string} name 将要移除的cookie名
   */
  remove: function (name, options) {
    options = options || {};
    options['expires'] = new Date(0);
    this.set(name, '', options);
  }
}
