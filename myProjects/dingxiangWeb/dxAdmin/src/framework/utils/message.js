import {Message, MessageBox} from 'element-ui';
const {success, warning, info, error} = Message;
const confirm = async (text = '', title = '提示', type = 'warning') => {
  let result = false;
  try {
    await MessageBox.confirm(text, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type
    });
    result = true;
  } catch (err) {
    result = false;
  }
  return result;
};
const showError = (err) => {
  let errMsg = '';
  if (typeof err === 'string') {
    errMsg = err;
  } else if (typeof err === 'object' && err.constructor === Error) {
    errMsg = err.message;
    console.error(err);
  }
  if (errMsg.length > 0) {
    error(errMsg);
  }
};
const message = {success, warning, info, error, confirm, showError};
export default {
  install(Vue){
    Vue.prototype.$message = message;
    Vue.message = message;
  }
};
