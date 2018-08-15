/**
 * arrayInstance.remove(val)
 * 移除数组中的指定项
 */
if (typeof Array.prototype.remove != 'function') {
  Array.prototype.remove = function (val) {
    var index = this.indexOf(val)
    if (index > -1) {
      this.splice(index, 1)
    }
  }
}
/**
 * arrayInstance.containTarget(val)
 * 判断val是否存在arrayInstance数组中 => 只支持非数组和非对象的值判断
 */
if (typeof Array.prototype.containTarget !== 'function') {
  Array.prototype.containTarget = function (val) {
    if (typeof val === 'object') {
      return false
    }
    for (var i = 0; i < this.length; i++) {
      if(val === this[i]){
        return true;
      }
    }
    return false;
  }
}
