###nodejs之querystring模块
1 const querystring = require("querystring");
querystring.parse("name=whitemu&sex=man&sex=women");
/*
return:
{ name: 'whitemu', sex: [ 'man', 'women' ] }
*/
querystring.parse("name=whitemu#sex=man#sex=women","#",null,{maxKeys:2});
/*
return:
{ name: 'whitemu', sex: 'man' }
*/
querystring.stringify({name: 'whitemu', sex: [ 'man', 'women' ] });
/*
return:
'name=whitemu&sex=man&sex=women'
*/
querystring.stringify({name: 'whitemu', sex: [ 'man', 'women' ] },"*","$");
/*
return:
'name$whitemu*sex$man*sex$women'
*/
3 querystring.escape(str)

escape可使传入的字符串进行编码

例子3，querystring.escape

querystring.escape("name=慕白");
/*
return:
'name%3D%E6%85%95%E7%99%BD'
*/
4 querystring.unescape(str)

unescape方法可将含有%的字符串进行解码

例子4，querystring.unescape

querystring.unescape('name%3D%E6%85%95%E7%99%BD');
/*
return:
'name=慕白'
*/
############################################################