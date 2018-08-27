function WeiXinSingler() {
    if (WeiXinSingler.prototype.caller) {
        return WeiXinSingler.prototype.caller;
    }

    this.ApiInitialized = {};

    this.Initialized = function (api) {
        return !!this.ApiInitialized[api];
    }

    this.Set = function (api, value) {
        this.ApiInitialized[api] = value;
    }

    this.IsInitializing = false;
    this.IsInitialized = false;
}

function WeiXinCore(appid, ticket) {
    this.AppID = appid || "";
    this.Ticket = ticket || "";

    this.Api = {};

    this.Api["onMenuShareTimeline"] = { success: function () { }, error: function () { } }
    this.Api["onMenuShareAppMessage"] = { success: function () { }, error: function () { } }
    this.Api["onMenuShareQQ"] = { success: function () { }, error: function () { } }
    this.Api["onMenuShareWeibo"] = { success: function () { }, error: function () { } }
    this.Api["onMenuShareQZone"] = { success: function () { }, error: function () { } }
    this.Api["scanQRCode"] = { success: function () { }, error: function () { } }
    this.Api["chooseImage"] = { success: function () { }, error: function () { } }
    this.Api["uploadImage"] = { success: function () { }, error: function () { } }
    this.Api["hideMenuItems"] = { success: function () { }, error: function () { } }
    this.Api["showMenuItems"] = { success: function () { }, error: function () { } }
    this.Api["hideOptionMenu"] = { success: function () { }, error: function () { } }
    this.Api["showOptionMenu"] = { success: function () { }, error: function () { } }
    this.Api["hideAllNonBaseMenuItem"] = { success: function () { }, error: function () { } }
    this.Api["showAllNonBaseMenuItem"] = { success: function () { }, error: function () { } }
    this.Api["getLocation"] = { success: function () { }, error: function () { } }
    this.Api["openLocation"] = { success: function () { }, error: function () { } }

    this.getApiList = function (list) {
        list = list || [];
        var result = [];

        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var item = list[i]; 
                if (this.Api[item]) {
                    var o = {};
                    o.name = item;
                    o.success = this.Api[item].success || function () { };
                    o.error = this.Api[item].error || function () { };
                    result.push(o);
                }
            }
        }

        return result;
    }
}

WeiXinCore.prototype.GetNonceStr = function () {
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var noceStr = "";
    for (i = 0; i < 32; i++) {
        noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return noceStr;
}

WeiXinCore.prototype.GetTimeStamp = function () {
    var timestamp = new Date().getTime();
    var timestampstring = timestamp.toString().substring(0, 10); //一定要转换字符串
    return timestampstring;
}

WeiXinCore.prototype.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

WeiXinCore.prototype.Perapara = function (objvalues, isencode) {
    var parastring = "";
    for (var key in objvalues) {
        isencode = isencode || false;
        if (isencode) {
            parastring += (key + "=" + encodeURIComponent(objvalues[key]) + "&");
        }
        else {
            parastring += (key + "=" + objvalues[key] + "&");
        }
    }
    parastring = parastring.substr(0, parastring.length - 1);
    return parastring;
}

WeiXinCore.prototype.GetSign = function (beforesingstring) {
    var sign = CryptoJS.SHA1(beforesingstring).toString();
    return sign;
}

WeiXinCore.prototype.Init = function (apiCallback, init_error) {
    WeiXinSingler.prototype = this;
    WeiXinSingler.prototype.caller = null;
    var singler = new WeiXinSingler();
    WeiXinSingler.prototype.caller = singler;
    singler.IsInitializing = true;
    singler.IsInitialized = false;

    var apiList = [];
    var success_funs = {};
    var error_funs = {};

    apiCallback = apiCallback || [];
    init_error = init_error || function () { };

    for (var i = 0; i < apiCallback.length; i++) {
        var item = apiCallback[i];
        if (item.name && item.name.length > 0) {
            apiList.push(item.name);
            success_funs[item.name] = item.success || function () { };
            error_funs[item.name] = item.error || function () { };
        }
    }

    if (apiList.length < 1) {
        try {
            init_error()
        } catch (e) { }
        return;
    }

    var appid = this.AppID || "";
    var ticket = this.Ticket || "";
    var ua = navigator.userAgent.toLowerCase();
    if (appid.length < 1 || ticket.length < 1) {
        try {
            init_error()
        } catch (e) { }
        return;
    }
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
        singler.IsInitializing = false;
        singler.IsInitialized = true;
        try {
            init_error()
        } catch (e) { }
        return;
    }

    var timeStamp = this.GetTimeStamp();
    var nonceStr = this.GetNonceStr();

    var signparasobj = {
        "jsapi_ticket": ticket,
        "noncestr": nonceStr,
        "timestamp": timeStamp,
        "url": window.location.href.split('#')[0]
    };

    var signstring = this.GetSign(this.Perapara(signparasobj));

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appid, // 必填，公众号的唯一标识
        timestamp: timeStamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signstring, // 必填，签名，见附录1
        jsApiList: apiList.concat() // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: apiList.concat(),
            success: function (res) {
                // alert(res.checkResult);
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                for (var i = 0; i < apiList.length; i++) {
                    var api_name = apiList[i];
                    var checked = false;
                    try {
                        checked = res.checkResult[api_name];
                    } catch (e) { }

                    try {
                        singler.Set(api_name, checked);
                    } catch (e) { }

                    if (checked) {
                        try {
                            success_funs[api_name]();
                        } catch (e) { }
                    }
                    else {
                        try {
                            error_funs[api_name]();
                        } catch (e) { }
                    }
                }

                singler.IsInitializing = false;
                singler.IsInitialized = true;
            }
        });
    });

    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        singler.IsInitializing = false;
        singler.IsInitialized = true;
        try {
            init_error()
        } catch (e) { }
        return;
    });
}

/*****公共API******/

var WeiXinCoreAPIHelper = {};

WeiXinCoreAPIHelper.onMenuShareTimeline = function (t, l, i, s, c, o) {
    t = t || "";
    l = l || window.location.href;
    i = i || "";
    s = s || function () { };
    c = c || function () { };
    o = o || {};
    return function () {
        wx.onMenuShareTimeline({
            title: t, // 分享标题
            link: l, // 分享链接
            imgUrl: i, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                try {
                    s(o);
                } catch (e) { }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                try {
                    c(o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.onMenuShareAppMessage = function (t, d, l, i, s, c, o) {
    t = t || "";
    d = d || "";
    l = l || window.location.href;
    i = i || "";
    s = s || function () { };
    c = c || function () { };
    o = o || {};
    return function () {
        wx.onMenuShareAppMessage({
            title: t, // 分享标题
            desc: d, // 分享描述
            link: l, // 分享链接
            imgUrl: i, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                try {
                    s(o);
                } catch (e) { }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                try {
                    c(o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.onMenuShareQQ = function (t, d, l, i, s, c, o) {
    t = t || "";
    d = d || "";
    l = l || window.location.href;
    i = i || "";
    s = s || function () { };
    c = c || function () { };
    o = o || {};
    return function () {
        wx.onMenuShareQQ({
            title: t, // 分享标题
            desc: d, // 分享描述
            link: l, // 分享链接
            imgUrl: i, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                try {
                    s(o);
                } catch (e) { }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                try {
                    c(o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.onMenuShareWeibo = function (t, d, l, i, s, c, o) {
    t = t || "";
    d = d || "";
    l = l || window.location.href;
    i = i || "";
    s = s || function () { };
    c = c || function () { };
    o = o || {};
    return function () {
        wx.onMenuShareWeibo({
            title: t, // 分享标题
            desc: d, // 分享描述
            link: l, // 分享链接
            imgUrl: i, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                try {
                    s(o);
                } catch (e) { }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                try {
                    c(o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.onMenuShareQZone = function (t, d, l, i, s, c, o) {
    t = t || "";
    d = d || "";
    l = l || window.location.href;
    i = i || "";
    s = s || function () { };
    c = c || function () { };
    o = o || {};
    return function () {
        wx.onMenuShareQZone({
            title: t, // 分享标题
            desc: d, // 分享描述
            link: l, // 分享链接
            imgUrl: i, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                try {
                    s(o);
                } catch (e) { }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                try {
                    c(o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.scanQRCode = function (n, s, o) {
    n = n || 0;
    s = s || function () { };
    o = o || {};

    return function (ro) {
        ro = ro || {};
        wx.scanQRCode({
            needResult: n, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                try {
                    s(result, ro, o);
                } catch (e) { }
            }
        });
    }
}

WeiXinCoreAPIHelper.chooseImage = function (c, size, source, s, o) {
    c = c || 9;
    size = size || ['original', 'compressed'];
    source = source || ['album', 'camera'];
    s = s || function () { };
    o = o || {};

    return function (ro) {
        ro = ro || {};
        wx.chooseImage({
            count: c, // 默认9
            sizeType: size, // 可以指定是原图还是压缩图，默认二者都有
            sourceType: source, // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                s(localIds, ro, o);
            }
        });
    }
}

WeiXinCoreAPIHelper.uploadImage = function (t, s, o) {
    t = t || 1;
    s = s || function () { };
    o = o || {};

    return function (id, ro) {
        ro = ro || {};
        wx.uploadImage({
            localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: t, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                s(serverId, ro, o);
            }
        });
    }
}

WeiXinCoreAPIHelper.hideMenuItems = function (ms) {
    ms = ms || [];

    return function () {
        wx.hideMenuItems({
            menuList: ms // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    }
}

WeiXinCoreAPIHelper.showMenuItems = function (ms) {
    ms = ms || [
    //传播类
    "menuItem:share:appMessage", //发送给朋友
    "menuItem:share:timeline", //分享到朋友圈
    "menuItem:share:qq", //分享到QQ
    "menuItem:share:weiboApp", //分享到Weibo
    "menuItem:favorite", //收藏
    "menuItem:share:facebook", //分享到FB
    "menuItem:share:QZone", //分享到 QQ 空间
    //保护类
    "menuItem:editTag", //编辑标签
    "menuItem:delete", //删除
    "menuItem:copyUrl", //复制链接
    "menuItem:originPage", //原网页
    "menuItem:readMode", //阅读模式
    "menuItem:openWithQQBrowser", //在QQ浏览器中打开
    "menuItem:openWithSafari", //在Safari中打开
    "menuItem:share:email", //邮件
    "menuItem:share:brand" //一些特殊公众号
    ];

    return function () {
        wx.showMenuItems({
            menuList: ms // 要显示的菜单项，所有menu项见附录3
        });
    }
}

WeiXinCoreAPIHelper.hideOptionMenu = function () { return function () { wx.hideOptionMenu(); } }

WeiXinCoreAPIHelper.showOptionMenu = function () { return function () { wx.showOptionMenu(); } }

WeiXinCoreAPIHelper.hideAllNonBaseMenuItem = function () {
    /*
    基本类
    举报: "menuItem:exposeArticle"
    调整字体: "menuItem:setFont"
    日间模式: "menuItem:dayMode"
    夜间模式: "menuItem:nightMode"
    刷新: "menuItem:refresh"
    查看公众号（已添加）: "menuItem:profile"
    查看公众号（未添加）: "menuItem:addContact"
    */
    return function () {
        wx.hideAllNonBaseMenuItem();
    } 
}

WeiXinCoreAPIHelper.showAllNonBaseMenuItem = function () {
    /*
    基本类
    举报: "menuItem:exposeArticle"
    调整字体: "menuItem:setFont"
    日间模式: "menuItem:dayMode"
    夜间模式: "menuItem:nightMode"
    刷新: "menuItem:refresh"
    查看公众号（已添加）: "menuItem:profile"
    查看公众号（未添加）: "menuItem:addContact"
    */
    return function () {
        wx.showAllNonBaseMenuItem(); 
    } 
}

WeiXinCoreAPIHelper.getLocation = function (t, s) {
    t = t || "wgs84";
    s = s || function () { }

    return function () {
        wx.getLocation({
            type: t, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                s(latitude, longitude, speed, accuracy, res);
            }
        });
    }
}

WeiXinCoreAPIHelper.openLocation = function () {
    //火星经纬度
    return function (lat, lon, n, a, s, u) {
        wx.openLocation({
            latitude: lat, // 纬度，浮点数，范围为90 ~ -90
            longitude: lon, // 经度，浮点数，范围为180 ~ -180。
            name: n, // 位置名
            address: a, // 地址详情说明
            scale: s, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: u // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
}

/*****公共API******/