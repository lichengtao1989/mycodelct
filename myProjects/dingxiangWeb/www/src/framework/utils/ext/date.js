const toString = Date.prototype.toString;
/**
 * 扩展date的toString方法，当传入format时，可返回对应格式的日期
 * @returns {string}
 */
Date.prototype.toString = function (format) {
  if (!format || typeof format !== 'string') {
    return toString.call(this);
  }
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var date = this.getDate();
  var hour = this.getHours();
  var minute = this.getMinutes();
  var second = this.getSeconds();

  year += '';
  month = month < 10 ? '0' + month : month + '';
  date = date < 10 ? '0' + date : date + '';
  hour = hour < 10 ? '0' + hour : hour + '';
  minute = minute < 10 ? '0' + minute : minute + '';
  second = second < 10 ? '0' + second : second + '';

  format = format.replace(/yyyy/g, year).replace(/yy/g, year.substr(2))
    .replace(/MM/g, month).replace(/dd/g, date)
    .replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
  return format;
};

/**
 * 在当前日期上加上n天，当入参为负数时，则为减去n天
 */
if (typeof Date.prototype.addDay != 'function') {
  Date.prototype.addDay = function (day) {
    if (typeof day == 'number') {
      this.setDate(this.getDate() + day);
    }
    return this;
  }
}

if (typeof Date.getRange != 'function') {
  /**
   * 获取两个日期之间的日期，包含起始和结束日期
   * @param start 起始时间 （Date类型）
   * @param end 结束时间（Date类型）
   * @returns {Array} Date数组
   */
  Date.getRange = function (start, end) {
    if (!start || !end) {
      throw new Error('缺少必要参数start, end');
    }

    const startType = Object.prototype.toString.call(start).slice(8, -1);
    const endType = Object.prototype.toString.call(end).slice(8, -1);
    if (startType !== 'Date' || endType !== 'Date') {
      throw new TypeError('start,end必须为Date类型');
    }

    start = new Date(start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate());
    end = new Date(end.getFullYear() + '/' + (end.getMonth() + 1) + '/' + end.getDate());
    if (start >= end) {
      return [];
    }

    const dayTime = 24 * 60 * 60 * 1000; //一天的毫秒数
    const subtractTime = end.getTime() - start.getTime();
    const subtractDays = parseInt(subtractTime / dayTime) + 1;
    const arr = [];
    for (let i = 0; i < subtractDays; i++) {
      arr.push(new Date(start.getTime() + i * dayTime));
    }
    return arr;
  }
}
