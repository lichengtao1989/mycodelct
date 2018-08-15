class CjmError extends Error{
  constructor(message, code){
    super(message);
    this.code = code;
  }
}
if(!window.CjmError){
  window.CjmError = CjmError;
}
