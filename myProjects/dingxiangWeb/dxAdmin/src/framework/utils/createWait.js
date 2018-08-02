/**
 * 创建一个time毫秒内只能运行一次的function
 * 在间隔时间内运行返回上次的运行结果
 * 结束频繁调用后,最后一次如果没有运行,就再运行一次
 * //demo
 * const func = this.$createWait(() => {
 *    //函数体
 * },500);
 * func();
 * */
const createWaite = (func, time = 0) => {
  let lastRunTime = 0; //上次调用的时间
  let lastResult;
  let isFrequentRunning = false; //标识是否处于频繁调用状态
  let frTimeout = null; //timeout
  let lrTimeout = null;
  return function () {
    const args = arguments;
    const now = Date.now();
    isFrequentRunning = true;
    clearTimeout(frTimeout);
    frTimeout = setTimeout(() => {
      isFrequentRunning = false;
    }, time);
    //
    if (now - lastRunTime > time) {
      lastRunTime = now;
      lastResult = func.apply(this, args);
    } else {
      clearTimeout(lrTimeout);
      lrTimeout = setTimeout(() => {
        if (!isFrequentRunning) {
          lastRunTime = now;
          lastResult = func.apply(this, args);
        }
      }, time);
    }
    return lastResult;
  }
};
export default {
  install(Vue){
    Vue.prototype.$createWaite = createWaite;
    Vue.createWaite = createWaite;
  }
};
