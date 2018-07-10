export default {
  install (Vue) {
    Vue.directive('hide-menu', {
      bind: function (el, bind) {
        if (bind.value) {
          Vue.globalData.set('hide-menu', true);
        } else {
          Vue.globalData.set('hide-menu', false);
        }
      },
      unbind: function () {
        Vue.globalData.set('hide-menu', false);
      }
    });
  }
}
