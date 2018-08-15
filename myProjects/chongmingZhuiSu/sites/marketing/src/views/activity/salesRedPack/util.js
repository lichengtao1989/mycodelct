/**
 * Created by 67340 on 2017/8/17.
 */
export default {
  loopObject(target, loopArr, type){
    for (let i = 0; i < loopArr.length; i++) {
      if (target[type] === loopArr[i][type]) {
        return i;
      }
    }
    return false;
  },
  deleteContainElement(target, loopArr){
    for (let i = 0; i < loopArr.length; i++) {
      if (target === loopArr[i]) {
        loopArr.splice(i, 1);
        return loopArr;
      }
    }
  },
  dateArr(beginTime, endingTime){
    return [];
  }
}
