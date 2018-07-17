export default {
  install (Vue) {
    Vue.directive('tab-title', {
      bind: function (el, bind) {
        Vue.globalData.set('absoluteTabTitle', bind.value);
      },
      unbind: function () {
        Vue.globalData.set('absoluteTabTitle', '');
      }
    });
  }
}
