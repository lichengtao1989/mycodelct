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
var cropID = getUrlParam('cropID') ;

//url跳转
$('.jumpurl').click(function(){
  var _this = $(this);
  var _url = _this.attr('data-url');
  window.location.href=_url;
})
//tab切换

if (code) {
  $('#antiCode,#integralCode').val(code)
};
//弹窗消失
$('.btn').click(function () {
  window.location.href="./reward.html?code="+code+"&cropID="+ cropID+"&LoginName="+ $('#LoginName').val();
});
//抽奖操作


//防伪查询
//登录
function loginFn(phone,pwd){
  var loginFnUrl = cjm.config.customerLoginUrl;
  $.ajax({
    url: loginFnUrl,
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        LoginName: phone,
        Password: pwd
      })
    },
    success: function (res) {
    
     $('#LoginName').val(phone)
    }
  });
};
//注册
$('.zhuce').click(function () {
  var integralRechargeUrl = cjm.config.integralRechargeUrl;
  var codejifen = code;
  var mobile=$("#mobile").val().trim();
  if(!isPoneAvailable(mobile)){
    alert('请输入正确手机号码！');
    return ;
  };
  $.ajax({
    url: integralRechargeUrl,
    type: 'post',
    dataType: 'json',
    data: {
      data: JSON.stringify({
        CorpID: cropID,
        Code: codejifen,
        Mobile:mobile,
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
          $('.smnr').text(res.message).hide();
          $('.ptitle,.zhm,.mima').show();
          $('#LoginName').val(inforesult.CreditResult.LoginName);
          loginFn(inforesult.CreditResult.LoginName,inforesult.CreditResult.Password);
          $('.reg').show();
        }else if(Registered==0){
          //已经注册
          window.location.href="./reward.html?code="+code+"&cropID="+ cropID+"&LoginName="+mobile;
        
  
        }
      
       }else{
         $('.errmsg').text(res.message).show();

       }
    
       
     
      }else{
        $('.errmsg').text(res.message).show();
      }
      
      $('.mask').show();
    }
  });
})