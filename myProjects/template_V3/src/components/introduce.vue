<template>
  <div class="introduce ">
    <baseinfo :flag="flagbase" @closeFp="closeFp"></baseinfo>
    <credit :flag="flagcredit" @close="closeCredit"></credit>
    <chain :flag="flagchain" @close="closeChain"></chain>
    <company :flag="flagcompany" @close="closeCompany"></company>
    <tracemap :flag="flagmap" @close="closeMap"></tracemap>
    <!--<div class="rt-icos">-->
      <!--<div class="rit-item" v-if="OnlineShopVideoUrl">-->
        <!--<img class="gwc rit-inner" @click="onlineShopUrl(OnlineShopVideoUrl)" src="../assets/images/shop-icon.png"/>-->
      <!--</div>-->
      <!--<div class="rit-item" v-if="batchData.VrVideoUrl">-->
        <!--<img class="vrf rit-inner" @click="handleVr(batchData.VrVideoUrl)" src="../assets/images/vr-icon.png"/>-->
      <!--</div>-->
    <!--</div>-->
    <div class="poje">
      <div class="item" @click="showBox(1)" v-if="blockChainInfo.TransactionHash">
        <div class="tbs"></div>
        <div class="wz">区块链</div>
      </div>
      <!--<div class="item" @click="showBox(2)">-->
      <!--<div class="naxy">9.2</div>-->
      <!--<div class="wz">农安信用</div>-->
      <!--</div>         -->
      <div class="item" @click="showBox(3)">
        <div class="tbs tbs2"></div>
        <div class="wz">扶贫产品</div>
      </div>
    </div>
    <div class="tt ov">
      <div class="btxs fl">{{productInfo.ProductName}}</div>
      <div class="tbxs fl" v-if="OnlineShopVideoUrl">
        <div class="gwc" @click="onlineShopUrl(OnlineShopVideoUrl)"></div>
      </div>
    </div>
    <div class="nextline">
      <div class="linet ov" v-if="productAuthentication">
        <div class="fl fll ic1"></div>
        <div class="fl flr productAuthentication">{{productAuthentication}}</div>
      </div>
      <div class="linet ov" v-if="ExpiryDay">
        <div class="fl fll ic2"></div>
        <div class="fl flr">保质期{{ExpiryDay}}{{ExpiryDayUnit}}</div>
      </div>
      <div class="linet ov" v-if="productInfo.ProductBatchNo">
        <div class="fl fll ic3"></div>
        <div class="fl flr">批次号:{{productInfo.ProductBatchNo}}</div>
      </div>
      <div class="linet ov">
        <div class="fl fll ic4"></div>
        <div class="fl flr">{{productInfo.ProductOrgName}}<span class="sp1" @click="showBox(4)" v-if="OrgType !== '15'">详情</span></div>
      </div>
      <div class="linet ov" v-if="PlotsName">
        <div class="fl fll ic5"></div>
        <div class="fl flr">{{PlotsName}}<span class="sp1" @click="showBox(5)">地图</span></div>
      </div>
    </div>
    <div class="sm">*请仔细核对包装上的基本信息</div>
  </div>
</template>

<script>
  import baseinfo from "./baseinfo";
  import credit from "./credit";
  import chain from "./chain";
  import company from "./company";
  import tracemap from "./tracemap";

  export default {
    props: {
      msg: String
    },
    components: {
      baseinfo,
      credit,
      chain,
      company,
      tracemap,
    },
    methods: {
      scrollTo(top){
        const nowTop = document.body.scrollTop;
        if (Math.abs(nowTop - top) < 30) {
          document.body.scrollTop = top;
        } else {
          document.body.scrollTop = nowTop + (nowTop < top ? (30) : (-30));
          setTimeout(() => {
            this.scrollTo(top);
          }, 20);
        }
      },
      closeFp() {
        this.flagbase = 1;
      },
      closeCredit() {
        this.flagcredit = 1;
      },
      closeChain() {
        this.flagchain = 1;
      },
      closeCompany() {
        this.flagcompany = 1;
      },
      closeMap() {
        this.flagmap = 1;
      },
      showBox(msg) {
        if (msg == 3) {
          this.flagbase = 2;
        } else if (msg == 2) {
          this.flagcredit = 2;
        } else if (msg == 1) {
          this.flagchain = 2;
        } else if (msg == 4) {
          this.flagcompany = 2;
        } else if (msg == 5) {
          this.flagmap = 2;
        }
        // if (document.body.scrollTop < 300) {
        //   this.scrollTo(300);
        // }
      },
      onlineShopUrl(shopUrl){
        location.href = shopUrl;
      },
    },
    data: function () {
      return {
        flagbase: 1,
        flagcredit: 1,
        flagchain: 1,
        flagcompany: 1,
        flagmap: 1,
      };
    },
    computed: {
      batchData () {
        return this.$store.state.corpInfo.BatchData ? this.$store.state.corpInfo.BatchData : {};
      },
      productInfo (){
        return this.$store.state.corpInfo || {};
      },
      OnlineShopVideoUrl (){
        return this.$store.state.corpInfo.BatchData ? this.$store.state.corpInfo.BatchData.OnlineShopVideoUrl : '';
      },
      ExpiryDay () {
        return this.$store.state.corpInfo.Product ? this.$store.state.corpInfo.Product.ExpiryDay : '';
      },
      ExpiryDayUnit() {
        return this.$store.state.corpInfo.Product ? this.$store.state.corpInfo.Product.ExpiryDayUnit : '';
      },
      PlotsName() {
        let PlotsName = '';
        if (this.$store.state.corpInfo.TraceNodes && this.$store.state.corpInfo.TraceNodes.length > 0) {
          for (let i = 0; i < this.$store.state.corpInfo.TraceNodes.length; i++) {
            let TraceNodeType = this.$store.state.corpInfo.TraceNodes[i].TraceNodeType;
            if (TraceNodeType === '2') {
              let content = JSON.parse(this.$store.state.corpInfo.TraceNodes[i].TraceNodeContent)
              PlotsName = content.PlotsName
            }
          }
        }
        return PlotsName;
      },
      productAuthentication (){
        const {corpInfo} = this.$store.state;
        let ProductAuthenticationType = {
          1: '无公害',
          5: '绿色',
          10: '有机',
          15: '地理标志',
          20: '生态原产地',
          25: '三同',
          30: '其他',
          35: '无认证',
          40: 'Global G.A.P.',
        }
        let ProductAuthenticationArr = corpInfo.Product ? corpInfo.Product.ProductAuthentication.split(',') : [];
        let productAuthentication = ProductAuthenticationArr.map(element => {
          return element = ProductAuthenticationType[element]
        });
        return productAuthentication.filter(item => item != null).toString() || '';
      },
      blockChainInfo(){
        return this.$store.state.blockChainInfo;
      },
      OrgType() {
        return this.$store.state.corpInfo.OrgInfo ? this.$store.state.corpInfo.OrgInfo.OrgType : '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";

  $base: 75;
  .introduce {
    @include pr;
    @include ba(#fff);
    @include bs;
    min-height: 190rem / $base;
    padding-left: 32rem / $base;
    @include co(#aaa);
    @include fo(26rem / $base);
    padding-top: 30rem / $base;
    .tt {
      line-height: 50rem / $base;
    }
    .sp1 {
      margin-left: 10rem / $base;
      color: #3ea6ff;
    }
    .btxs {
      @include fo(36rem / $base);
      @include co(#323232);
    }
    .tbxs {
      @include wh(50rem / $base, 50rem / $base);
      @include ba(#a2ca43);
      @include border-radius(8rem / $base);
      margin-left: 12rem / $base;
      @include pr;
      .gwc {
        @include wh(25rem / $base, 25rem / $base);
        @include baimg("../assets/images/gwc.png");
        @include p_center;
        z-index: 2;
      }
    }
    .ic1 {
      @include wh(28rem / $base, 25rem / $base);
      margin-top: 7rem / $base;
      @include baimg("../assets/images/ic1.png");
    }
    .ic2 {
      @include wh(28rem / $base, 26rem / $base);
      @include baimg("../assets/images/ic2.png");
    }
    .ic3 {
      @include wh(30rem / $base, 27rem / $base);
      @include baimg("../assets/images/ic3.png");
    }
    .ic4 {
      @include wh(30rem / $base, 26rem / $base);
      @include baimg("../assets/images/ic4.png");
    }
    .ic5 {
      @include wh(30rem / $base, 29rem / $base);
      @include baimg("../assets/images/ic5.png");
    }
    .nextline {
      padding-top: 34rem / $base;
    }
    .flr {
      padding-left: 17rem / $base;
      padding-top: 3rem / $base;
    }
    .linet {
      margin-bottom: 24rem / $base;
    }
    .sm {
      padding-left: 193rem / $base;
      @include co(#ddd);
      @include fo(24rem / $base);
      margin-top: 7rem / $base;
      padding-bottom: 20rem / $base;
    }
    .poje {
      @include po;
      top: 86rem / $base;
      right: 32rem / $base;
      .item {
        @include wh(100rem / $base, 100rem / $base);
        border: 1px solid #e4e5ea;
        @include border-radius(8rem / $base);
        @include te;
        @include fo(18rem / $base);
        @include pr;
        @include ov;
        @include float;
        margin-left: 12rem / $base;
        .tbs {
          @include wh(50rem / $base, 50rem / $base);
          @include baimg("../assets/images/it1.png");
          margin: 5rem / $base 24rem / $base;
        }
        .tbs2 {
          @include baimg("../assets/images/it2.png");
        }
        .wz {
          @include po;
          left: 0;
          bottom: 0;
          border-bottom-left-radius: 8rem / $base;
          border-bottom-right-radius: 8rem / $base;
          @include co(#fff);
          @include ba(#ff9c00);
          width: 100%;
          @include li(30rem / $base);
        }
        .naxy {
          @include fo(30rem / $base);
          padding-top: 10rem / $base;
          color: #a2ca43;
          font-weight: bold;
        }
      }
    }
    .productAuthentication {
      width: 55%;
      line-height: 40rem / $base;
    }
  }

  .rt-icos {
    position: absolute;
    right: 0;
    top: 0;
  }

  .introduce {
    .rt-icos {
      right: 32rem / $base;
      top: 30rem / $base;
    }
    .rit-item {
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 100rem / $base;
      height: 48rem / $base;
      background-color: #fff;
      box-sizing: border-box;
      margin-left: 12rem / $base;
    }
    .rit-inner {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }


</style>
