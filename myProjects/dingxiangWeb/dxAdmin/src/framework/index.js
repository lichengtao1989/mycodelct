import utils from './utils';
import './utils/ext';
import './assets/css/components.less';
import components from './components';
import setting from './setting';
export default (Vue, settings) => {
  setting.set(settings);
  Vue.use(utils);
  Vue.use(components);
};
