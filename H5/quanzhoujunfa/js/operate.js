var ww = $('.yuanwrap').width();
var canvasWidth = ww * 0.8617021276595745;
var halfw = canvasWidth / 2;
var turnplate = {
    restaraunts: [], //大转盘奖品名称
    colors: [], //大转盘奖品区块对应背景颜色
    outsideRadius: halfw, //大转盘外圆的半径
    textRadius: 100, //大转盘奖品位置距离圆心的距离
    insideRadius: 10, //大转盘内圆的半径
    startAngle: 0, //开始角度
    randomRate: [], //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
    bRotate: false //false:停止;ture:旋转
};
var myAry = [];

$(document).ready(function () {
    $('.btn').click(function () {
        $('.mask').hide();
    });

    function getUrlParam(name) {
        //构造一个含有目标参数的正则表达式对象
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //匹配目标参数
        var r = window.location.search.substr(1).match(reg);
        //返回参数值
        if (r != null) return unescape(r[2]);
        return null;
    };
    var CorpID = getUrlParam('cropID');
    var antiFakeCode = getUrlParam('code');
    var LoginName = localStorage.getItem('LoginName');//getUrlParam('LoginName')
    var Password = LoginName.substr(5, 6);
    $('#Phone').val(LoginName);
    function GetLotteryActivityFn(CustomerID,ActivityID) {
        var GetLotteryActivityUrl = cjm.config.GetLotteryActivity;
        $.ajax({
            url: GetLotteryActivityUrl,
            type: 'post',
            dataType: 'json',
            data: {
                data: JSON.stringify({
                    CorpID: CorpID,
                    CustomerID: CustomerID,
                    ActivityID:ActivityID
                })
            },
            success: function (res) {
                $('.noteval').html(res.result.LotteryActivityList[0].Note);
               
            }
        });
    }
    function GetCustomerIntegralAllFn() {
        var GetCustomerIntegralAllUrl = cjm.config.GetCustomerIntegralAllUrl;
        $.ajax({
            url: GetCustomerIntegralAllUrl,
            type: 'post',
            dataType: 'json',
            data: {
                data: JSON.stringify({
                    Password: Password,
                    LoginName: LoginName
                })
            },
            success: function (res) {

                $('#IntegralValue').val(res.result.IntegralResult[0].IntegralValue);
            }
        });
    }

    function GetCustomerInfoFn() {
        var getActivityIDUrl = cjm.config.GetCustomerInfo;
        $.ajax({
            url: getActivityIDUrl,
            type: 'post',
            dataType: 'json',
            data: {
                data: JSON.stringify({
                    CorpID: CorpID,
                    LoginName: LoginName
                })
            },
            success: function (res) {
                if (res.success) {
                    $('#CustomerID').val(res.result.CustomerID);
                    GetLotteryActivityFn(res.result.CustomerID,$('#ActivityID').val())
                    $('.pointer').click(function () {
                   
                        if (turnplate.bRotate) return;
                        turnplate.bRotate = !turnplate.bRotate;
                        checkFn();
                       
                    });
                } else {
                    //前往登录
                    window.location.href = "./login.html?code=" + antiFakeCode + "&cropID=" + CorpID;
                };

            }
        });
    };

    function getActivityID() {
        var getActivityIDUrl = cjm.config.ActivityID;
        $.ajax({
            url: getActivityIDUrl,
            type: 'post',
            dataType: 'json',
            data: {
                data: JSON.stringify({
                    CorpID: CorpID,
                    AntiFakeCode: antiFakeCode
                })
            },
            success: function (res) {
                var aid = res.result.ActivityID;
                $('#ActivityID').val(aid);
                //获取奖项设置
                GetAwardsSettingFn(aid)
                GetCustomerInfoFn();
            }
        });
    };
    //动态添加大转盘的奖品与奖品区域背景颜色
    // turnplate.randomRate = ["50%", '50%', '0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%']; //小心设置按100%分配
    // turnplate.restaraunts = ["谢谢参与", "谢谢参与"];
    turnplate.colors = ["#ffb72c", "#ffe63f", "#ffb72c", "#ffe63f", "#ffb72c", "#ffe63f"];
    var aryList = [];
    var eObj = {};
    var stre = '';

    function showReward(name) {}

    function getReward() {
        var AntiFakeCodeLotteryUnitExtractedUrl = cjm.config.AntiFakeCodeLotteryUnitExtracted;
        $.ajax({
            url: AntiFakeCodeLotteryUnitExtractedUrl,
            type: 'post',
            dataType: 'json',
            data: {
                CustomerID: $('#CustomerID').val(),
                ActivityID: $('#ActivityID').val(),
                AntiFakeCode: antiFakeCode
            },
            success: function (res) {
                var _iindex = "";
                var _text = "";
                var messages=res.message;
                if(messages.indexOf('结束')>=0){
                    $('.mask .errmsg').text(res.message).show();
                    $('.mask').show();
                    return;
                }else if(messages.indexOf('明天')>=0){
                    $('.mask .errmsg').text(res.message).show();
                    $('.mask').show();
                    return;
                }
                if (res.success) {
                    //中奖
                    var RecordID = res.result.recordID;
                    var recordMark = res.result.recordMark;
                    $('#RecordID').val(RecordID);
                    $('#recordMark').val(recordMark);
                    var resultval = res.result;
                    var awardName = resultval.awardName;
                    _iindex = myAry.indexOf(awardName) + 1;
                    $('.imgpp').attr('src', res.result.img);
                    $('.rrt').text(awardName);

                    _text = awardName;
                    rotateFn(_iindex, _text);
                } else {

                    if (res.message.indexOf('积分') >= 0) {
                        $('.mask .errmsg').text(res.message).show();
                        $('.mask').show();
                    } else {
                        //没中奖
                        _iindex = 2;
                        _text = "谢谢参与";
                        //   _text = res.message;
                        rotateFn(_iindex, _text);
                    }
                }

            }
        });
    }

    function checkFn() {
        var CheckAntiFakeCodeLotteryUnitExtractedUrl = cjm.config.CheckAntiFakeCodeLotteryUnitExtracted;
        $.ajax({
            url: CheckAntiFakeCodeLotteryUnitExtractedUrl,
            type: 'post',
            dataType: 'json',
            data: {
                CustomerID: $('#CustomerID').val(),
                ActivityID: $('#ActivityID').val(),
                AntiFakeCode: antiFakeCode
            },
            success: function (res) {

                if (res.success) {
                    //去抽奖
                    getReward();
                } else {
                    $('.mask .errmsg').text(res.message).show();
                    $('.mask').show();
                }


            }
        });
    }
    //获取大转盘设置奖项
    function GetAwardsSettingFn(aid) {
        var GetAwardsSettingUrl = cjm.config.GetAwardsSetting;
        $.ajax({
            url: GetAwardsSettingUrl,
            type: 'post',
            dataType: 'json',
            data: {
                data: JSON.stringify({
                    CorpID: CorpID,
                    ActivityID: aid
                })
            },
            success: function (res) {
                var list = res.result.LotteryAwardsSettingList;
                var _length = list.length;
                var _length2 = _length + 2;
                for (var i = 0; i < _length; i++) {
                    myAry.push(list[i].AwardName);
                }
                for (var j = 0; j <= _length2; j++) {
                    if (j % 2) {
                        myAry.splice(j, 0, "谢谢参与")
                    }
                }
                turnplate.restaraunts = myAry;
                drawRouletteWheel();
            }
        });
    };
    if (!antiFakeCode) {
        $('.errmsg').text('没有有效抽奖码哦！').show();
        $('.mask').show();
        // $('.btn').click(function () {
        //     window.location.href = "./index.html?code=" + antiFakeCode + "&cropID=" + CorpID + "&LoginName=" + LoginName;
        // });
    } else {
        getActivityID();
     
        GetCustomerIntegralAllFn();
    };
    //提交收件人信息
    $('.tijiao').click(function () {
        var FilloutActivityWinReceiverUrl = cjm.config.FilloutActivityWinReceiver;
        if ($('#Phone').val() == "" || $('#ReceiverName').val() == "" || $('#ReceiverAddress').val() == "") {
            $('.msg').text('请填写完整信息哦！').show();
            setTimeout(function () {
                $('.msg').hide();
            }, 2500)
        } else {
            $.ajax({
                url: FilloutActivityWinReceiverUrl,
                type: 'post',
                dataType: 'json',
                data: {
                    RecordID: $('#RecordID').val(),
                    ActivityID: $('#ActivityID').val(),
                    CustomerID: $('#CustomerID').val(),
                    AntiFakeCode: antiFakeCode,
                    Phone: $('#Phone').val(),
                    ReceiverName: $('#ReceiverName').val(),
                    ReceiverAddress: $('#ReceiverAddress').val()
                },
                success: function (res) {
                    if (res.success) {
                        $('.msg').text('提交成功')
                    } else {
                        $('.msg').text('提交失败')
                    };
                    $('.msg').show();
                    setTimeout(function () {
                        $('.msg').hide();
                        $('.mask2').hide();

                    }, 2500)
                }
            });
        }


    });

    var rotateTimeOut = function () {
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };

    //旋转转盘 item:奖品位置; txt：提示语;
    var rotateFn = function (item, txt) {


        var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

        if (angles < 270) {
            angles = 270 - angles;
        } else {
            angles = 360 - angles + 270;
        }
        $('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function () {
                if (txt == "谢谢参与") {
                    $('.errmsg').text(txt).show();
                    $('.mask').show();
                } else {
                    $('.mask2').show();
                };
               turnplate.bRotate = !turnplate.bRotate;
            }
        });
    };

 
});

function rnd(rate) {
    var random = Math.floor(Math.random() * 100);
    var myRandom = [];
    var randomList = [];
    var randomParent = [];
    for (var i = 0; i < 100; i++) {
        myRandom.push(parseInt([i]) + 1);
    }
    for (var i = 0; i < rate.length; i++) {
        var temp = [];
        var start = 0;
        var end = 0;
        randomList.push(parseInt(rate[i].split('%')[0]));
        for (var j = 0; j < randomList.length; j++) {
            start += randomList[j - 1] || 0
            end += randomList[j]
        }
        temp = myRandom.slice(start, end);
        randomParent.push(temp)
    }
    for (var i = 0; i < randomParent.length; i++) {
        if ($.inArray(random, randomParent[i]) > 0) {
            return (i + 1)
        }
    }

}


//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
// window.onload = function () {
//     drawRouletteWheel();
// };


function drawRouletteWheel() {
    var canvas = document.getElementById("wheelcanvas");
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasWidth + 'px');
    if (canvas.getContext) {
        //根据奖品个数计算圆周角度
        var arc = Math.PI / (turnplate.restaraunts.length / 2);
        var ctx = canvas.getContext("2d");
        //在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, canvasWidth, canvasWidth);
        //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  

        ctx.strokeStyle = "#ffff00";
        //font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '14px Microsoft YaHei';
        for (var i = 0; i < turnplate.restaraunts.length; i++) {
            var angle = turnplate.startAngle + i * arc;
            ctx.fillStyle = turnplate.colors[i];
            ctx.beginPath();
            //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
            ctx.arc(halfw, halfw, turnplate.outsideRadius, angle, angle + arc, false);
            ctx.arc(halfw, halfw, turnplate.insideRadius, angle + arc, angle, true);
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill();
            //锁画布(为了保存之前的画布状态)
            ctx.save();

            //----绘制奖品开始----
            ctx.fillStyle = "#E5302F";
            var text = turnplate.restaraunts[i];
            var line_height = 17;
            //translate方法重新映射画布上的 (0,0) 位置
            ctx.translate(halfw + Math.cos(angle + arc / 2) * turnplate.textRadius, halfw + Math.sin(angle + arc / 2) * turnplate.textRadius);

            //rotate方法旋转当前的绘图
            ctx.rotate(angle + arc / 2 + Math.PI / 2);

            /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
            if (text.indexOf("M") > 0) { //流量包
                var texts = text.split("M");
                for (var j = 0; j < texts.length; j++) {
                    ctx.font = j == 0 ? '12px Microsoft YaHei' : '12px Microsoft YaHei';
                    if (j == 0) {
                        ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                    } else {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                }
            } else if (text.indexOf("M") == -1 && text.length > 6) { //奖品名称长度超过一定范围 
                text = text.substring(0, 6) + "||" + text.substring(6);
                var texts = text.split("||");
                for (var j = 0; j < texts.length; j++) {
                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                }
            } else {
                //在画布上绘制填色的文本。文本的默认颜色是黑色
                //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            }

            //添加对应图标
            // if (text.indexOf("纸尿裤") >= 0) {

            //     var img = document.getElementById("imga0");
            //     img.onload = function () {
            //         ctx.drawImage(img, -15, 10, 35, 35);
            //     };
            //     ctx.drawImage(img, -15, 10, 35, 35);
            // } else if (text.indexOf("拉拉裤") >= 0) {
            //     var img = document.getElementById("imga1");
            //     img.onload = function () {
            //         ctx.drawImage(img, -15, 10, 35, 35);
            //     };
            //     ctx.drawImage(img, -15, 10, 35, 35);
            // } else if (text.indexOf("尿不湿") >= 0) {
            //     var img = document.getElementById("imga2");
            //     img.onload = function () {
            //         ctx.drawImage(img, -15, 10, 35, 35);
            //     };
            //     ctx.drawImage(img, -15, 10, 35, 35);
            // } else if (text.indexOf("谢谢参与") >= 0) {
            //     var img = document.getElementById("sorry-img");
            //     img.onload = function () {
            //         ctx.drawImage(img, -15, 10, 35, 35);
            //     };
            //     ctx.drawImage(img, -15, 10, 35, 35);

            // }
            //把当前画布返回（调整）到上一个save()状态之前 
            ctx.restore();
            //----绘制奖品结束----
        }
    }
}