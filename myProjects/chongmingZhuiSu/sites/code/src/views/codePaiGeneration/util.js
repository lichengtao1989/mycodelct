/**
 * Created by 67340 on 2017/12/6.
 */
let compare = (property) => { //排序规则
  return function (a, b) {
    let value1 = a[property];
    let value2 = b[property];
    return value1 - value2;
  }
};
let toDouble = (number) => {
  return number.toString().length > 1 ? number.toString() : '0' + number;
};
let util = {
  //判断点是否在矩形内部
  isInside(rectCenterX, rectCenterY, rectWidth, rectHeight, x, y, rotate){
    rotate = rotate / 180 * Math.PI;
    let r = Math.sqrt(Math.pow(x - rectCenterX, 2) + Math.pow(y - rectCenterY, 2)); //计算该点与矩形中心点的距离
    let angle = Math.atan((x - rectCenterX) / (y - rectCenterY));
    //该点相对于矩形中心点的距离
    let rx = Math.abs(Math.cos(Math.PI / 2 - rotate - angle) * r);
    let ry = Math.abs(Math.sin(Math.PI / 2 - rotate - angle) * r);
    if (rx > rectWidth / 2 || ry > rectHeight / 2) {
      return false;
    }
    return true;
  },
  elementSortID(target){ //按照对象中的index值进行排序
    let obj = Object.deepClone(target);
    let arr = [];
    for (let key in obj) {
      if ((typeof obj[key]).toLowerCase() === 'object' && obj[key]) {
        obj[key].type = key;
        arr.push(obj[key]);
      }
    }
    return arr.sort(compare('index'));
  },
  elementSortMaxIndex(arr, type){ //查找中数组中的对象中index 最大的一个
    let len = arr.length;
    let maxType = 0;
    let maxObject = {};
    for (let i = 0; i < len; i++) {
      if (arr[i][type] > maxType) {
        maxType = arr[i][type];
        maxObject = arr[i];
      }
    }
    return {
      maxObject: maxObject,
      index: maxType
    };
  },
  elementNavSelect(dom){
    if (dom.tagName === 'SPAN') {
      if (dom.className === 'element-nav-span') {
        return dom.parentNode;
      } else {
        return false;
      }
    } else if (dom.tagName === 'LI') {
      return dom;
    } else {
      return false;
    }
  },
  copyObject(mainObject, copyObject){
    for (let key in mainObject) {
      if ((typeof mainObject[key]).toLocaleLowerCase() === 'object') {
        for (let w in mainObject[key]) {
          if ((copyObject[key] || copyObject[key] == false) && (copyObject[key][w] || copyObject[key][w] == false)) {
            mainObject[key][w] = copyObject[key][w];
          }
        }
      } else if ((typeof mainObject[key]).toLocaleLowerCase() === 'string') {
        mainObject[key] = copyObject[key];
      }
    }
    return mainObject;
  },
  compareIndexSort(a, b){
    if ((typeof a.value).toLowerCase() === 'object' && (typeof b.value).toLowerCase() === 'object') {
      if (a.value.index < b.value.index) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  },
  getPageParam(key){ //获取导航栏参数
    let url = window.location.href;
    let search = url.split('?')[1];
    let arr = search.split('&');
    let value = '';
    arr = arr.map((p) => {
      return {
        key: p.split('=')[0],
        value: p.split('=')[1]
      }
    });
    arr.forEach((p) => {
      if (p.key === key) {
        value = p.value;
      }
    });
    return value;
  },
  createRandomCode(len){ //生成一个随机码
    let code = len.toString();
    for (let i = 2; i < len; i++) {
      code += parseInt(Math.random() * 10);
    }
    return code;
  },
  colorTypeChange(colors){ //颜色从cmyk格式转换成 rgb格式
    colors = colors.map((item) => {
      return item.map((p) => {
        if (p && p.substr(0, 1) !== '#') {
          let c = p.split(',')[0];
          let m = p.split(',')[1];
          let y = p.split(',')[2];
          let k = p.split(',')[3];
          let r = toDouble(parseInt(255 * (100 - c) * (100 - k) / 10000).toString(16));
          let g = toDouble(parseInt(255 * (100 - m) * (100 - k) / 10000).toString(16));
          let b = toDouble(parseInt(255 * (100 - y) * (100 - k) / 10000).toString(16));
          let color = '#' + r + g + b;
          return color;
        }
      });
    });
    return colors;
  }
};
export default util;
