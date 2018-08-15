import focus from './src/focus.js'

export default {
  install: function (Vue) {
    Vue.directive(focus.directiveName, focus);
  }
};
