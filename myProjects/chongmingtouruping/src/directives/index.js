import tabTitle from './tab-title';
import bgColor from './bg-color';
import hideMenu from './hide-menu';
import focus from './focus';
export default {
  install (Vue) {
    Vue.use(tabTitle);
    Vue.use(bgColor);
    Vue.use(hideMenu);
    Vue.use(focus);
  }
}
