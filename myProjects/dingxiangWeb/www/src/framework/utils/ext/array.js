/**
 * arrayInstance.remove(val)
 * 移除数组中的指定项
 */
if (typeof Array.prototype.remove != 'function') {
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
}
