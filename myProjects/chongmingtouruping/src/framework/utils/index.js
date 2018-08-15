import ajax from './ajax';
import createWait from './createWait';
import eventBus from './eventBus';
import globalData from './globalData';
import message from './message';
import sleep from './sleep';
import storage from './storage';
import rules from './rules';
import valid from './valid';
export default {
  install(Vue) {
    Vue.use(ajax);
    Vue.use(createWait);
    Vue.use(eventBus);
    Vue.use(globalData);
    Vue.use(message);
    Vue.use(sleep);
    Vue.use(storage);
    Vue.use(rules);
    Vue.use(valid);
  }
};
