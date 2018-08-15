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
      // window.open('http://xuanen.trp.app315.net/#/login');
      window.open('http://dingxiang.trp.app315.net');
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
$base: 192;
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
    @include wh(150rem/$base, 36rem/$base);
    line-height: 36rem/$base;
    @include co(#fff);
    @include ba(#5fc054);
    @include te;
    @include brs(4rem/$base);
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
      @include wh(27rem/$base, 27rem/$base);
      @include baimg('../../../static/images/dxtbs1.png');
    }
    .tbs2 {
      @include wh(27rem/$base, 26rem/$base);
      @include baimg('../../../static/images/dxtbs2.png');
    }
    .tbs3 {
      @include wh(26rem/$base, 24rem/$base);
      @include baimg('../../../static/images/dxtbs3.png');
    }
    .pp {
      @include ba(#1993f0);
      @include wh(309rem/$base, 44rem/$base);
      line-height: 44rem/$base;
      @include te;
      @include co(#fff);
      @include fo(18rem/$base);
      @include brs(4rem/$base);
      margin-bottom: 8rem/$base;
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
      padding-top: 6rem/$base;
    }
    .spi {
      @include wh(25rem/$base, 27rem/$base);
      @include baimg('../../../static/images/dxzheng.png');
    }
    .wrap {
      @include ba(#ececec);
      padding-left: 20rem/$base;
      @include ov;
      .spt {
        @include fo(18rem/$base);
        line-height: 28rem/$base;
        @include co(#5fc054);
        font-weight: bold;
      }
      .text {
        @include fo(16rem/$base);
        @include co(#128f40);
      }
      .inputcx {
        @include block;
        @include bs;
        @include wh(276rem/$base, 44rem/$base);
        padding-left: 9rem/$base;
        line-height: 44rem/$base;
        border: none;
        @include brs(4rem/$base);
        @include fo(14rem/$base);
        outline: none;
      }
    }
    .inputpart {
      padding-top: 7rem/$base;
      padding-bottom: 7rem/$base;
    }
    .chaxunbtn {
      margin-bottom: 14rem/$base;
      @include brs(4rem/$base);
      @include wh(276rem/$base, 44rem/$base);
      cursor: pointer;
      @include te;
      line-height: 44rem/$base;
      @include fo(18rem/$base);
      @include co(#fff);
      @include ba(#5fc054);
    }
    .numitem {
      @include wh(38rem/$base, 38rem/$base);
      @include te;
      line-height: 38rem/$base;
      @include co(#4b4b4b);
      @include fo(24rem/$base);
      border: 1rem/$base solid #cacfd4;
      @include float;
      margin-right: 7rem/$base;
      margin-top: 9rem/$base;
      cursor: pointer;
    }
    .numactive {
      @include co(#128f40);
      border: 1rem/$base solid #128f40;
    }
    .shuzishuru {
      @include pr;
    }
    .potuige,
    .qingkong {
      @include po;
      @include wh(85rem/$base, 38rem/$base);
      @include li(38rem/$base);
      @include te;
      @include co(#128f40);
      border: 1rem/$base solid #cacfd4;
      left: 141rem/$base;
      top: 57rem/$base;
      z-index: 2;
      cursor: pointer;
    }
    .qingkong {
      left: 235rem/$base;
    }
  }
  .cf {
    @include co(#fff);
    font-size:15rem/$base;
  }
  .pp {
    cursor: pointer;
  }
}
.framestyle {
  @include wh(424rem/$base, 345rem/$base);
  @include mag;
}
iframe {
  @include block;
  @include wh(424rem/$base, 345rem/$base);
}
.loginbtn {
  @include wh(361rem/$base, 41rem/$base);
  @include te;
  @include li(41rem/$base);
  @include co(#fff);
  @include ba(#128f40);
  @include mag;
  border-radius: 5rem/$base;
  cursor: pointer;
  @include fo(17rem/$base);
}
.jzyhm {
  cursor: pointer;
  margin-bottom: 25rem/$base;
}
.rein {
  @include inline-block;
  vertical-align: 2rem/$base;
  margin-left: 32rem/$base;
  margin-right: 6rem/$base;
  border: 1rem/$base solid #c9c9c9;
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
  width: 540rem/$base;

  @include ba(#fff);
  border-radius: 8rem/$base;
  padding-top: 24rem/$base;
  // padding-bottom: 50rem/$base;
  // min-height: 330rem/$base;
  @include p_center;
  cursor: pointer;
}
.close {
  @include wh(36rem/$base, 36rem/$base);
  @include baimg('../../../static/images/close.png');
  @include po;
  top: -18rem/$base;
  right: -18rem/$base;
  z-index: 6;
}
.bt {
  @include te;
  @include fo(24rem/$base);
  // @include co(#128f40);
  color: rgb(16, 206, 198);
  padding-bottom: 29rem/$base;
}
.pp {
  @include wh(361rem/$base, 48rem/$base);
  @include mag;
  @include pr;
  input {
    outline: none;
    @include block;
    padding-left: 56rem/$base;
    width: 304rem/$base;
    @include li(46rem/$base);
    border: 1rem/$base solid #c5c5c5;
    border-radius: 4rem/$base;
  }
  img {
    @include po;
    top: 12rem/$base;
    left: 15rem/$base;
  }
}
.part1 {
  margin-bottom: 20rem/$base;
}
.part2 {
  margin-bottom: 36rem/$base;
}
</style>
