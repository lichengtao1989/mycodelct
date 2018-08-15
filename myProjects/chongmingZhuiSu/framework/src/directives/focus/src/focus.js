export default {
  directiveName: 'focus',
  inserted: function (el, binding) {
    if (binding.value) {
      el.focus();
    }
  },
  update: function (el, binding) {
    if (binding.oldValue != binding.value && binding.value) {
      el.focus();
    }
  }
}
