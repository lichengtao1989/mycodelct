import './utils/ext';
import Vue from 'vue';
import Vuex from 'vuex';
import Component from './components';
import Directives from './directives';
import Ajax from './utils/ajax';
import Storage from './utils/storage';
import Rules from './utils/rules';
import GlobalData from './utils/globalData';
import crossMessage from './utils/crossMessage';
import axios from 'axios';
import appConfig from './config/appConfig';
import './utils/error/cjmError';
import './assets/css/reset.css';
import './assets/css/common.less';
import './assets/css/icon.css';
import './assets/css/analysis.less';
import './assets/css/components.less';

Vue.use(Vuex);
Vue.use(Ajax);
Vue.use(Storage);
Vue.use(Rules);
Vue.use(Component);
Vue.use(Directives);
Vue.use(GlobalData);

//全局的配置
Vue.globalData.set('appConfig', appConfig);

export default {
  /**
   * 添加事件处理程序
   * @param name  事件名称
   * @param handler 处理程序
   */
  addHandler(name, handler) {
    if (name === 'ajaxError') {
      axios.interceptors.response.use(function(res) {
        return res;
      }, handler);
    }
  },
  /**
   * 初始化跨窗口消息机制
   */
  initCrossMessage() {
    crossMessage.init();
  }
};
