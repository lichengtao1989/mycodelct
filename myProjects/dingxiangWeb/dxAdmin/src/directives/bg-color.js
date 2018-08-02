export default {
  install (Vue) {
    Vue.directive('bg-color', {
      bind: function (el, bind) {
        const {value = 'none'} = bind;
        const color = value != 'none' ? value : 'transparent';
        Vue.globalData.set('contentBgColor', color);
      },
      unbind: function () {
        Vue.globalData.set('contentBgColor', '');
      }
    });
  }
}
