"use strict";
// var a:string = "hello world";
// console.log(a)
var a = "HelloWorld";
console.log(a);
function searchXiaoJieJie2(age, stature) {
    if (age === void 0) { age = 18; }
    if (stature === void 0) { stature = '大胸'; }
    var yy = '';
    yy = '找到了' + age + '岁';
    if (stature != undefined) {
        yy = yy + stature;
    }
    return yy + '的小姐姐';
}
var result = searchXiaoJieJie2();
console.log(result);
var yangzi = '刘德华';
function zhengXing() {
    var yangzi = '马德华';
    console.log('技术胖整形成了' + yangzi + '的样子');
}
zhengXing();
console.log(yangzi);
