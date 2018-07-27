<template>
  <div class="topright">
    <div class="pofixed" v-if="showFlag">
      <div class="loginout">
        <div class="loginwrap">
          <div class="close" @click="closeFn"></div>
          <div class="bt">系统登录</div>
          <div class="framestyle">
            <iframe :src="srcval" frameborder="0"></iframe>
          </div>

        </div>
      </div>
    </div>
    <div class="pobtn1 pobtn">
      <router-link to="/introduction" class="cf">平台简介</router-link>
    </div>
    <div class="pobtn2 pobtn">
      <router-link to="/download" class="cf">资料下载</router-link>
    </div>
    <div class="rightinnri">
      <div class="tzt">
        <div class="pp1 pp" @click="loginFn">
          <div class="inline tbs1 tbs"></div>
          <div class="inline">农产品监管系统</div>
        </div>
        <div class="pp2 pp" @click="jumpTrp">
          <div class="inline tbs2 tbs"></div>
          <div class="inline">投入品管理系统</div>
        </div>
        <div class="pp3 pp" @click="loginFn2">
          <div class="inline tbs3 tbs"></div>
          <div class="inline">农产品溯源系统</div>
        </div>
      </div>
      <div class="wrap">
        <div class="zheng">
          <div class="inline spi"></div>
          <div class="inline spt">防伪溯源查询</div>
        </div>
        <div class="inputpart">
          <input class="inputcx" placeholder="请输入标签上的防伪溯源码" v-model="numval" />
        </div>
        <div class="chaxunbtn" @click="queryNum">查询</div>

      </div>
    </div>
  </div>

</template>

<script>
import * as config from '@/api/config';

export default {
  data() {
    return {
      showFlag: false,
      idVal: '',
      idVal2: '',
      numval: '',
      numindex: '-1',
      srcval: ''
    };
  },
  components: {},
  methods: {
    loginFn2() {
      let urls = window.location.href;
      if (urls.indexOf('kf315') > -1) {
        this.srcval = `http://login.kf315.net/?callback=http://app315.kf315.net/module/index/landing.html?systemId=${this.idVal2}&btncolor=10cec6&iconcolor=10cec6`;
        // srcval=`http://login.kf315.net/?AudsId=t&callback=http://cjm.kf315.net/module/index/landing.html?systemId=${this.systemId}&btncolor=10cec6&iconcolor=10cec6`;
      } else {
        this.srcval = `http://login.app315.net/?AudsId=t&callback=http://cjm.app315.net/module/index/landing.html?systemId=${this.idVal2}&btncolor=10cec6&iconcolor=10cec6`;
      }
      this.showFlag = true;
    },
    loginFn() {
      let urls = window.location.href;
      if (urls.indexOf('kf315') > -1) {
        this.srcval = `http://login.kf315.net/?callback=http://app315.kf315.net/module/index/landing.html?systemId=${this.idVal}&btncolor=10cec6&iconcolor=10cec6`;
        // srcval=`http://login.kf315.net/?AudsId=t&callback=http://cjm.kf315.net/module/index/landing.html?systemId=${this.systemId}&btncolor=10cec6&iconcolor=10cec6`;
      } else {
        this.srcval = `http://login.app315.net/?AudsId=t&callback=http://cjm.app315.net/module/index/landing.html?systemId=${this.idVal}&btncolor=10cec6&iconcolor=10cec6`;
      }
      this.showFlag = true;
    },
    closeFn() {
      this.showFlag = false;
    },
    async GetSystemList() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.GetSystemList);

      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let info = JSON.parse(res.Data);
          // console.log(info);
          this.idVal = info[0].id;
          this.idVal2 = info[1].id;
        } else {
        }
      }
    },
    jumpTrp() {
      window.open('http://xuanen.trp.app315.net/#/login');
    },
    queryNum() {
      let jumpStr = `${config.checkApiUrl}${this.numval}#/`;

      window.open(jumpStr);
    },
    clearFn() {
      this.numval = '';
    }
  },
  created() {},
  mounted() {
    this.GetSystemList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
.pofixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
}
.topright {
  @include pr;
  height: 100%;
  .pobtn {
    @include po;
    bottom: 0;
    @include wh(150px, 36px);
    line-height: 36px;
    @include co(#fff);
    @include ba(#5fc054);
    @include te;
    @include brs(4px);
    z-index: 2;
  }
  .pobtn1 {
    left: 0;
  }
  .pobtn2 {
    right: 0;
  }

  .rightinnri {
    .tbs1 {
      @include wh(27px, 27px);
      @include baimg('../../../static/images/dxtbs1.png');
    }
    .tbs2 {
      @include wh(27px, 26px);
      @include baimg('../../../static/images/dxtbs2.png');
    }
    .tbs3 {
      @include wh(26px, 24px);
      @include baimg('../../../static/images/dxtbs3.png');
    }
    .pp {
      @include ba(#1993f0);
      @include wh(309px, 44px);
      line-height: 44px;
      @include te;
      @include co(#fff);
      @include fo(18px);
      @include brs(4px);
      margin-bottom: 8px;
      font-weight: bold;
    }
    .pp2 {
      @include ba(#f89a35);
    }
    .pp3 {
      @include ba(#10b66f);
    }
    .inline {
      display: inline-block;
      vertical-align: middle;
    }
    .zheng {
      padding-top: 6px;
    }
    .spi {
      @include wh(25px, 27px);
      @include baimg('../../../static/images/dxzheng.png');
    }
    .wrap {
      @include ba(#ececec);
      padding-left: 20px;
      @include ov;
      .spt {
        @include fo(18px);
        line-height: 28px;
        @include co(#5fc054);
        font-weight: bold;
      }
      .text {
        @include fo(16px);
        @include co(#128f40);
      }
      .inputcx {
        @include block;
        @include bs;
        @include wh(276px, 44px);
        padding-left: 9px;
        line-height: 44px;
        border: none;
        @include brs(4px);
        @include fo(15px);
        outline: none;
      }
    }
    .inputpart {
      padding-top: 7px;
      padding-bottom: 7px;
    }
    .chaxunbtn {
      margin-bottom: 14px;
      @include brs(4px);
      @include wh(276px, 44px);
      cursor: pointer;
      @include te;
      line-height: 44px;
      @include fo(18px);
      @include co(#fff);
      @include ba(#5fc054);
    }
    .numitem {
      @include wh(38px, 38px);
      @include te;
      line-height: 38px;
      @include co(#4b4b4b);
      @include fo(24px);
      border: 1px solid #cacfd4;
      @include float;
      margin-right: 7px;
      margin-top: 9px;
      cursor: pointer;
    }
    .numactive {
      @include co(#128f40);
      border: 1px solid #128f40;
    }
    .shuzishuru {
      @include pr;
    }
    .potuige,
    .qingkong {
      @include po;
      @include wh(85px, 38px);
      @include li(38px);
      @include te;
      @include co(#128f40);
      border: 1px solid #cacfd4;
      left: 141px;
      top: 57px;
      z-index: 2;
      cursor: pointer;
    }
    .qingkong {
      left: 235px;
    }
  }
  .cf {
    @include co(#fff);
  }
  .pp {
    cursor: pointer;
  }
}
.framestyle {
  @include wh(424px, 345px);
  @include mag;
}
iframe {
  @include block;
  @include wh(424px, 345px);
}
.loginbtn {
  @include wh(361px, 41px);
  @include te;
  @include li(41px);
  @include co(#fff);
  @include ba(#128f40);
  @include mag;
  border-radius: 5px;
  cursor: pointer;
  @include fo(17px);
}
.jzyhm {
  cursor: pointer;
  margin-bottom: 25px;
}
.rein {
  @include inline-block;
  vertical-align: 2px;
  margin-left: 32px;
  margin-right: 6px;
  border: 1px solid #c9c9c9;
  outline: none;
}
.loginout {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 5;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loginwrap {
  width: 540px;

  @include ba(#fff);
  border-radius: 8px;
  padding-top: 24px;
  // padding-bottom: 50px;
  // min-height: 330px;
  @include p_center;
  cursor: pointer;
}
.close {
  @include wh(36px, 36px);
  @include baimg('../../../static/images/close.png');
  @include po;
  top: -18px;
  right: -18px;
  z-index: 6;
}
.bt {
  @include te;
  @include fo(24px);
  // @include co(#128f40);
  color: rgb(16, 206, 198);
  padding-bottom: 29px;
}
.pp {
  @include wh(361px, 48px);
  @include mag;
  @include pr;
  input {
    outline: none;
    @include block;
    padding-left: 56px;
    width: 304px;
    @include li(46px);
    border: 1px solid #c5c5c5;
    border-radius: 4px;
  }
  img {
    @include po;
    top: 12px;
    left: 15px;
  }
}
.part1 {
  margin-bottom: 20px;
}
.part2 {
  margin-bottom: 36px;
}
</style>
