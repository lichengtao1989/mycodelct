function getUrlParam(name) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) return unescape(r[2]);
  return null;
};
var code = getUrlParam('code') ;
var cropID = getUrlParam('cropID') ;
function isPoneAvailable(Input) {  
  var myreg=/^[1][3,4,6,5,7,8][0-9]{9}$/;  
  if (!myreg.test(Input)) {  
      return false;  
  } else {  
      return true;  
  }  
};
$('.spart').click(function(){
  var apiUrlLongin=cjm.config.customerLoginUrl;
  var mobile=$('.phone').val();
  if(isPoneAvailable(mobile)){
    //登录
    var pwd=mobile.substr(5,6);
    
    $.ajax({
      url: apiUrlLongin,
      type: 'post',
      dataType: 'json',
      data: {
        data: JSON.stringify({
          LoginName: mobile,
          Password:pwd
        })
      },
      success: function (res) {
  
        if(res.success){
          window.location.href="./reward.html?code="+code+"&cropID="+ cropID+"&LoginName="+mobile;
        }else{
          alert('登录失败')
        }
      }
    });
  }else{
    alert('请输入正确的手机号码')
  };
})  
