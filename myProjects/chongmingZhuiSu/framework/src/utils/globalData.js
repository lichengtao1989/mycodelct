const globalData = {};
const getType = (value)=> {
  return Object.prototype.toString.call(value).slice(8, -1);
};

const data = {
  get(){
    if (arguments.length === 1) { //get(key)
      return globalData['_global_'][arguments[0]];
    } else if (arguments.length === 2) { //get(namespace, key)
      return globalData[arguments[0]][arguments[1]];
    } else {
      return null;
    }
  },
  set(){
    if (arguments.length === 2) { //set(key, value)
      this.set('_global_', arguments[0], arguments[1]);
    } else if (arguments.length === 3) { //set(namespace, key, value)
      if (getType(arguments[0]) != 'String' || getType(arguments[1]) != 'String') {
        throw new Error('参数格式不正确');
      }
      if (!globalData[arguments[0]]) {
        globalData[arguments[0]] = {};
      }
      globalData[arguments[0]][arguments[1]] = arguments[2];
    } else {
      throw new Error('参数个数不正确');
    }
  },
  append(){
    if (arguments.length === 2) { //append(key, value)
      this.append('_global_', arguments[0], arguments[1]);
    } else if (arguments.length === 3) { //append(namespace, key, value)
      if (getType(arguments[0]) != 'String' || getType(arguments[1]) != 'String') {
        throw new Error('参数格式不正确');
      }
      if(!globalData[arguments[0]]){
        this.set(arguments[0], arguments[1], arguments[2]);
        return;
      }
      let oldValue = globalData[arguments[0]][arguments[1]];
      if (!oldValue) {
        this.set(arguments[0], arguments[1], arguments[2]);
        return;
      }

      const oldValueType = getType(oldValue);
      const valueType = getType(arguments[2]);
      if (oldValueType != valueType) {
        throw new Error('现有数据和追加数据类型不匹配');
      }
      if (valueType == 'Object') {
        Object.assign(oldValue, arguments[2]);
      } else if (valueType == 'Array') {
        globalData[arguments[0]][arguments[1]] = oldValue.concat(arguments[2]);
      } else {
        throw new Error('该数据类型不允许追加');
      }
    } else {
      throw new Error('参数个数不正确');
    }
  }
};

export default {
  install (Vue) {
    Vue.prototype.$globalData = data;
    Vue.globalData = data;
  }
}
