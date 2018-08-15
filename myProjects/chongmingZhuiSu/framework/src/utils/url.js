export default {
  getLocationSearch: function () {
    return window.location.search;
  },
  /**
   * 获取url中的所有参数
   * @alias module:url.getParams
   * @returns {object} 所有参数的键值对
   * @example cjm.url.getParams()
   */
  getParams: function () {
    var url = this.getLocationSearch(),
      searchResult = {},
      strs = [],
      i = 0,
      item;
    if (url.indexOf('?') >= 0) {
      strs = url.substr(1).split('&');
      for (; i < strs.length; i++) {
        item = strs[i].split('=');
        searchResult[item[0].toLowerCase()] = decodeURIComponent(item[1]);
      }
    }
    return searchResult;
  },
  /**
   * 获取url中的某个参数
   * @alias module:url.getParam
   * @param {string} key 参数的key
   * @returns {string} 参数的value
   * @example cjm.url.getParam('code')
   */
  getParam: function (key) {
    var p = this.getParams();
    return p[key.toLowerCase()];
  }
}
