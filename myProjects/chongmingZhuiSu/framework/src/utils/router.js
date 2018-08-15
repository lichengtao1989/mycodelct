let maps = {};
let router = null;

export default {
  /**
   * 初始化
   * @param data 格式{'productBatchList':'/JiChuShuJu/ChanPinGuanLi/ChanPinPiCi'}
   * @param r 路由对象
   */
  init(data, r) {
    for (let key in data) {
      maps[key.toLowerCase()] = data[key];
    }
    router = r;
  },
  /**
   * 根据code进行路由跳转
   * @param code
   */
  push(code, query = {}) {
    code = code.toLowerCase();
    if (!maps[code]) {
      throw new Error(`不存在${code}对应的路由信息`);
    }
    //router.push(maps[code]);
    router.push({ path: maps[code], query: query });
  }
};
