import ScrollBar from './src/scrollbar.js';

ScrollBar.install = function (Vue) {
  Vue.component(ScrollBar.name, ScrollBar);
};

export default ScrollBar;
