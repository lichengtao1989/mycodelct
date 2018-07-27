const sleep = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
export default {
  install(Vue){
    Vue.prototype.$sleep = sleep;
    Vue.sleep = sleep;
  }
};
