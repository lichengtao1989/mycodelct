// var a:string = "hello world";
// console.log(a)
var a:string = "HelloWorld"
console.log(a)
function searchXiaoJieJie2(age:number=18,stature:string='大胸'):string{

  let yy:string = ''
  yy = '找到了'+age+'岁'
  if(stature !=undefined){
      yy = yy + stature
  }
  return yy+'的小姐姐'

}

var result:string  =  searchXiaoJieJie2()
console.log(result)
var yangzi:string = '刘德华'

function zhengXing():void{
    var yangzi:string = '马德华'

    console.log('技术胖整形成了'+yangzi+'的样子')
}
zhengXing()
console.log(yangzi)