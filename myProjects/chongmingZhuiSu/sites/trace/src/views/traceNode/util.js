/**
 * Created by 67340 on 2017/7/19.
 */
export default {
  /*
   * 因为接口中有个字段是下面的这样的结构
   * fieldExt:[{
   *   itemType: 'defaultValue1',
   *   itemValue: '111'
   *  },{
   *   itemType: 'defaultValue2',
   *   itemValue: '222'
   * }]
   * 所以单独写了个方法去检索对应key value => util.findItemValue(fieldExt这个字段数组，'检索的itemValue')
   * */
  findItemValue(targetArr, target){
    let item;
    targetArr.map(function (p) {
      if (p.itemName === target) {
        item = p;
      }
    });
    return item;
  },
  /*
   * 溯源节点中涉及到很多sortID排序的问题
   * 适用的数据结构为         可以将这样的数组排序为
   * [{                      [{
   *   name: 'A',               name: 'A',
   *   sortID: 5                sortID: 0
   * },{                     },{
   *   name: 'B',               name: 'B',
   *   sortID: 3                sortID: 1
   * },{                     },{
   *   name: 'C',               name: 'C',
   *   sortID: 1                sortID: 2
   * },{                     },{
   *   name: 'D',               name: 'D',
   *   sortID: 9                sortID: 3
   * },]                     },]
   *
   * 使用时需要重新对自己赋值
   * arr = util.createSrotID(arr);
   *
   * */
  createSortID(arr){
    let len = arr.length;
    let sortArr = [];
    for (let j = 0; j < len; j++) {
      let min = parseInt(arr[0].sortID);
      let index = 0;
      for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].sortID) <= min) {
          min = parseInt(arr[i].sortID);
          index = i;
        }
      }
      sortArr.push(arr[index]);
      arr.splice(index, 1);
    }
    return sortArr.map((p, index) => {
      p.sortID = index;
      return p;
    });
  },
  createMaxID(arr, type){
    let max = arr[0];
    arr.forEach((value, index, array) => {
      if (parseInt(max[type]) < parseInt(value[type])) {
        max = value;
      }
    });
    return max;
  },
  createDateFormat(opt){
    let str = '';
    let addDays;
    let nowDate = new Date();
    if (!opt.optionValue.addDay || opt.optionValue.addDay == ' ') {
      addDays = 0;
    } else {
      if (typeof opt.optionValue.addDay == 'string') {
        addDays = parseInt(opt.optionValue.addDay.replace(/^\s+|\s+$/g, ''));
      } else {
        addDays = opt.optionValue.addDay;
      }
    }
    nowDate = new Date(nowDate.setDate(nowDate.getDate() + addDays));
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    month = String(month).length > 1 ? String(month) : '0' + month;
    let day = nowDate.getDate();
    switch (opt.optionValue.dateRuleType) {
      case 'yyyy年MM月dd日':
        str = year + '年' + month + '月' + day + '日';
        break;
      case 'yyyyMMdd':
        str = String(year) + month + day;
        break;
      case 'yyyy/MM/dd':
        str = year + '/' + month + '/' + day;
        break;
      case 'yyyy.MM.dd':
        str = year + '.' + month + '.' + day;
        break;
    }
    opt.tabLabel.map((p) => {
      if (p.tabType === 2) {
        p.tabValue = str;
      }
    });
    return str;
  },
  createSerialNumber(opt){
    let str = '';
    switch (opt.optionValue.numberRule) {
      case '001':
        str = '001';
        break;
      case '0001':
        str = '0001';
        break;
      case '00001':
        str = '00001';
        break;
    }
    opt.tabLabel.map((p) => {
      if (p.tabType === 3) {
        p.tabValue = str;
      }
    });
    return str;
  },
  contains(arr, val){
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return true;
      }
    }
  }
}
