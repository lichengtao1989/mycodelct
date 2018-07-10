/**
 * Object.insertAfter(source, newObj)
 * 在对象后面插入新的内容，返回添加之后的对象
 */
if (typeof Object.insertAfter != 'function') {
  Object.insertAfter = function (source, obj) {
    if (!source || !obj || typeof source != 'object' || typeof obj != 'object') {
      return;
    }
    let temp = {};
    for (let key in source) {
      temp[key] = source[key];
    }
    for (let key in obj) {
      temp[key] = obj[key];
    }
    return temp;
  };
}

/**
 * Object.insertBefore(source, newObj)
 * 在对象前面插入新的内容，返回添加之后的对象
 */
if (typeof Object.insertBefore != 'function') {
  Object.insertBefore = function (source, obj) {
    if (!source || !obj || typeof source != 'object' || typeof obj != 'object') {
      return;
    }
    let temp = {};
    for (let key in obj) {
      temp[key] = obj[key];
    }
    for (let key in source) {
      temp[key] = source[key];
    }
    return temp;
  };
}
/**
 * 克隆json object
 * */
if (typeof Object.jsonClone != 'function') {
  Object.jsonClone = function (jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
  }
}
/**
 * Object.deepClone(source)
 * 深拷贝一个对象
 */
if (typeof Object.deepClone != 'function') {
  Object.deepClone = function (source) {
    let result;
    const objType = Object.prototype.toString.call(source).slice(8, -1);
    if (objType == 'Object') {
      result = {};
    } else if (objType == 'Array') {
      result = [];
    } else {
      return source;
    }
    for (const o in source) {
      if (source.hasOwnProperty(o)) {
        result[o] = Object.deepClone(source[o]);
      }
    }
    return result;
  };
}

/**
 * Object.transfer(source, target)
 * 把source的属性赋值到target中，前提是target有此属性
 */
if (typeof Object.transfer != 'function') {
  Object.transfer = function (source, target) {
    for (let key in source) {
      if (source.hasOwnProperty(key) && target.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  };
}

/**
 * Object.sort(source, compareFn)
 * 按compareFn对对象进行排序，返回排序之后的对象, compareFn格式与数组的比较函数相同：(keyValue1, keyValue2)=>{return 1;}
 */
if (typeof Object.sort != 'function') {
  Object.sort = function (source, compareFn) {
    if (!source || !compareFn) {
      throw new Error('Object.sort缺少必要参数');
    }
    let arr = [],
      newObject = {};
    for (let key in source) {
      arr.push({
        key: key,
        value: source[key]
      });
    }
    arr.sort(compareFn).forEach(item => {
      newObject[item.key] = item.value;
    });
    return newObject;
  };
}

/**
 * Object.deepMerge(target, source)
 * 对象合并。和Object.assign不同的是，如果对象的属性也是对象（但不是数组），则也会合并，而不是覆盖。
 */
if (typeof Object.deepMerge != 'function') {
  Object.deepMerge = function (target, source) {
    if (!target || !source) {
      return target;
    }
    for (let key in source) {
      target[key] =
        target[key] && target[key].toString() === '[object Object]' && !Array.isArray(source[key])
          ? Object.deepMerge(target[key], source[key])
          : (target[key] = source[key]);
    }
    return target;
  };
}
