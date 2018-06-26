function isPoneAvailable(Input) {  
  var myreg=/^[1][3,4,6,5,7,8][0-9]{9}$/;  
  if (!myreg.test(Input)) {  
      return false;  
  } else {  
      return true;  
  }  
}  
function getUrlParam(name) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) return unescape(r[2]);
  return null;
};
var code = getUrlParam('code') || sessionStorage.getItem('code');
//url跳转
$('.jumpurl').click(function(){
  var _this = $(this);
  var _url = _this.attr('data-url');
  window.location.href=_url;
})
//tab切换
$('.clicktab').click(function () {

  var _this = $(this);
  var _index = _this.attr('data-index')
  $('.clicktab').removeClass('active');
  _this.addClass('active')
  $('.ppwrap').hide();
  $('.ppwrap').eq(_index).show();
})
if (code) {
  $('#antiCode,#integralCode').val(code)
};
//弹窗消失
$('.btn').click(function () {
  $('.mask').hide();
  $('.errmsg').text("")
});
//抽奖操作
$('.choujiang').click(function(){
if(!code){
  
  $('.errmsg').text("没有抽奖码哦！").show();
  $('.mask').show();
}else{
  //有没有loginname
  var LoginNameVal=$('#LoginName').val();
  if(!LoginNameVal){
window.location.href="./register.html?code="+code+"&cropID="+ $('#codeval').val();
  }else{
    window.location.href="./reward.html?code="+code+"&cropID="+ $('#codeval').val()+"&LoginName="+$('#LoginName').val();
  };
};
});
//根据code获取企业id
var GetCorpIDByCodeUrl = cjm.config.wapApi + '?function=GetCorpIDByCode'; //'http://www.kf315.net/newwap/Common/DataService.ashx?function=GetCorpIDByCode';// cjm.config.wapApi + '?function=GetCorpIDByCode'
var getCorpID = function () {
  $.ajax({
    url: GetCorpIDByCodeUrl,
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        code: code
      })
    },
    success: function (res) {

      
      $('#codeval').val(res.result.data.corpID);
    }
  });
}
getCorpID();
//防伪查询
$('.fangwei .spart').click(function () {
  var AntifakeQueryUrl = cjm.config.antifakeQueryUrl;
  $.ajax({
    url: AntifakeQueryUrl,
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        CorpID: $('#codeval').val(),
        Code: code
      })
    },
    success: function (res) {
      var ResultID = res.result.ResultID;
      var msg = res.result.Result;
      window.location.href = cjm.config.getAntifakeQueryResultUrl(ResultID, msg)
     

    }
  });
})
//充值
$('.jifen .spart').click(function () {
  var integralRechargeUrl = cjm.config.integralRechargeUrl;
  var codejifen = code;
  var mobileval=$("#mobile").val().trim();

  if(isPoneAvailable(mobileval)){

    $.ajax({
      url: integralRechargeUrl,
      type: 'post',
      dataType: 'json',
      data: {
        data: JSON.stringify({
          CorpID: $('#codeval').val(),
          Code: codejifen,
          Mobile: mobileval
        })
      },
      success: function (res) {
        if (res.success == false) {
          var errmsg="";
           errmsg = '积分失败:' + res.message;
         var Registered=res.result.CreditResult.Registered;
         if(Registered){
          
          if(Registered==1){
            //注册
            var inforesult=res.result;
            $('.CorpName').text(inforesult.CorpName);
            $('.zhv').text(inforesult.CreditResult.LoginName);
            $('.mmv').text(inforesult.CreditResult.Password);
            $('#Password').val(inforesult.CreditResult.Password);
            $('.smnr').text(res.message);
            $('.ptitle,.zhm,.mima').show();
            $('#LoginName').val(inforesult.CreditResult.LoginName)
          }else if(Registered==0){
            //已经注册
           
          
            $('.smnr').text(res.message);
            $('.ptitle,.zhm,.mima').hide();
          }
          $('.reg').show();
         }else{
           $('.errmsg').text(res.message).show();
  
         }
      
         
       
        }else{
          $('.errmsg').text(res.message).show();
        }
        
        $('.mask').show();
      }
    });
  }else{
$('.msg').text('请输入正确的手机号码').show();
setTimeout(function(){
  $('.msg').text('').hide();
},2500)
  }
 
})