/**
 * const valid = await this.$validForm(this.$refs.form);
 * */
async function validForm(form) {
  let valid = false;
  try {
    valid = await form.validate();
  } catch (err) {
    console.error(err);
  }
  return valid;
}
export default {
  install(vue){
    vue.prototype.$validForm = validForm;
  }
}
