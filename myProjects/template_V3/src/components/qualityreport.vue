<template>
  <div class="qualityreport">

    <div class="bxsm" v-if="insureCompany">
     <span>
        该产品由
         <span class="paimg">
             <span class="iim" v-if="insureCompany.indexOf('平安') !== -1"></span>
             <span class="ilh" v-if="insureCompany.indexOf('联合') !== -1 || insureCompany.indexOf('中华') !== -1"></span>
         </span>&nbsp;承保
         <span class="wylp" @click="claims(insureUrl)">我要理赔</span>
     </span>
    </div>

    <div v-show="TestingNodes.length > 0">
      <div v-for="(item, index) in TestingNodes" :key="index">
        <div class="nbjc" v-bind:class="{ dsfjc: item.CheckedCorpID !== item.CorpID}" @click="showBox(item)">
          <div class="jct">
            <div class="tpl">
              <div class="tbx"></div>
            </div>
            <div class="wzsm">{{item.CheckedCorpID === item.CorpID ? '内部检测' : '第三方检测'}}</div>
          </div>
          <div class="nexti">
            <div class="bgi"></div>
            <div class="bgg">
              <div class="jchg"></div>
              <div class="fangda">
                <div class="fangdabg"></div>
              </div>
              <img :src="item.Images.length > 0 ? item.Images[0].ImagePath : '' " class="baogao">
            </div>
          </div>
        </div>
      </div>
      <div v-show="show" class="model">
        <div class="boxinner">
          <div class="guanbi" @click="closeFn"></div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in reportinfo.Images" :key="item.ImagePath">
              <img :src="item.ImagePath" alt="" class="reportimg">
              <div v-if="showAll" @click="showAllPdf" class="seeall"><i></i>点击查看完整检测文档</div>
            </swiper-slide>
            <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div>

    <div class="nodata" v-show="TestingNodes.length === 0">
      <img src="../assets/images/nodata.png" alt="">
    </div>

  </div>
</template>

<script>
  //配置保险理赔大洼金社裕农企业id
  const specialCorpClaimConfig = {
    daWaJinSheYuNong:'11285'
  }
  export default {
    props: {
      msg: String
    },

    data(){
      return {
        show: false,
        showAll: false,
        reportinfo: {},
        swiperOption: {
          initialSlide: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange: this.slideChange,
          }
        },
      }
    },
    methods: {
      showBox(item){
        this.swiper.activeIndex = 0;
        this.showAll = false;
        this.show = true;
        this.reportinfo = item
      },
      slideChange(){
        let imageLength = this.reportinfo.Images.length;
        let pdfsLength = this.reportinfo.PDFs.length;
        let activeIndex = this.swiper.activeIndex + 1;
        if (activeIndex === imageLength && pdfsLength > 0) {
          this.showAll = true;
        } else {
          this.showAll = false;
        }
      },
      showAllPdf(){
        let href = this.reportinfo.PDFs[0].PDFPath;
        window.open(href);
      },
      closeFn (){
        this.show = false;
      },
      claims(insureUrl){
        if (!insureUrl) {
          this.$toasted.show('已超过产品有效期，无法发起申请理赔')
        } else {
          if (this.insureUrl) {
            location.href = `${wap_config.data_service_claims}/${this.insureUrl}`;
          }
        }
      }
    },
    created(){

    },
    computed: {
      insureCompany (){
        let insureCompany = ''
        const corpInfo = this.$store.state.corpInfo
        if (this.$store.state.corpInfo && corpInfo.CorpInfo) {
          if (corpInfo.CorpInfo.CorpID == specialCorpClaimConfig.daWaJinSheYuNong && corpInfo.isInsurance == 1) {
            insureCompany = '中国平安'
          } else {
            insureCompany = corpInfo.insureCompany
          }
        }
        return insureCompany;
      },
      TestingNodes (){
        return this.$store.state.corpInfo.TestingNodes || [];
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      insureUrl() {
        const corpInfo = this.$store.state.corpInfo
        if ((corpInfo.isRelatedInsurance == 1 && corpInfo.isInsuranceOverdue == 0) || (corpInfo.CorpInfo.CorpID == specialCorpClaimConfig.daWaJinSheYuNong && corpInfo.isInsurance == 1)) {
          let InsureCompany = corpInfo.insureCompany;
          let query = `code=${corpInfo.BatchData.Code}`;
          if (corpInfo.isProductOverdue == 1 && corpInfo.isClaimsisExisted != 1) { //产品过期
            return ''
          } else {
            let querys = '';
            let insureID = corpInfo.insureID;
            if (corpInfo.logisticsCode) {
              querys = `code=${corpInfo.logisticsCode}&tag=1&insureID=${insureID}&insureCompany=${encodeURI(InsureCompany)}`;
            } else {
              querys = `${query}&tag=2&insureID=${insureID}&insureCompany=${encodeURI(InsureCompany)}`;
            }
            let insureType = `&insureType=${corpInfo.insureType}`;
            if (corpInfo.isClaimsisExisted == 1) {
              return `ConsumerCSchedule.aspx?${querys}${insureType}`;
            } else {
              let corp = `&corpID=${corpInfo.CorpInfo.CorpID}`;
              return `claims.aspx?${querys}${corp}${insureType}`;
            }
            sessionStorage.setItem("insureType" + corpInfo.BatchData.Code, corpInfo.insureType);
          }
        }
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";
  @import "../assets/style/util.scss";

  $base: 75;
  .qualityreport {

    .bxsm {
      @include wh(734rem / $base, 144rem / $base);
      line-height: 144rem / $base;
      @include te;
      @include fo(28rem / $base);
      @include co(#aaa);
      @include pr;
      @include baimg("../assets/images/bgc01.png");
      @include mag;
      margin-bottom: 15rem / $base;
      .paimg {
        @include inline-block;
        margin-left: 14rem / $base;
        margin-right: 9rem / $base;
        @include wh(104rem / $base, 48rem / $base);
        @include border-radius(8rem / $base);
        vertical-align: middle;
        @include pr;
      }
      .iim {
        @include inline-block;
        @include wh(100rem / $base, 50rem / $base);
        @include baimg("../assets/images/zgpa.png");
        @include p_center;
      }
      .ilh {
        @include inline-block;
        @include wh(130rem / $base, 70rem / $base);
        @include baimg("../assets/images/zhlh.png");
        @include p_center;
      }
    }
    .wylp {
      margin-left: 34rem / $base;
      padding: 10rem / $base 15rem / $base;
      color: #fff;
      background: #FF9202;
      border-radius: 5px;
    }
    .nbjc {
      @include wh(734rem / $base, 671rem / $base);
      @include mag;
      @include baimg("../assets/images/bgc02.png");
      @include fo(28rem / $base);
      .jct {
        @include ov;
        height: 60rem / $base;
        padding-left: 30rem / $base;
        padding-top: 30rem / $base;
        line-height: 60rem / $base;
      }
      .tpl,
      .wzsm {
        @include float;
        @include pr;
      }
      .wzsm {
        @include fo(32rem / $base);
        padding-left: 12rem / $base;
      }
      .tpl {
        @include wh(40rem / $base, 40rem / $base);
        @include border-radius(50%);
        @include ba(#a2ca43);
        margin-top: 8rem / $base;
      }
      .tbx {
        @include wh(22rem / $base, 24rem / $base);
        @include p_center;
        @include baimg("../assets/images/ngjc.png");
      }
    }
    .bgi {
      @include wh(338rem / $base, 504rem / $base);
      @include baimg("../assets/images/bgp.png");
      @include mag;
    }
    .nexti {
      @include pr;
    }
    .bgg {
      @include wh(388rem / $base, 448rem / $base);
      @include baimg("../assets/images/bgc02.png");
      @include l50;

      top: 60rem / $base;
      z-index: 2;
    }
    .baogao {
      @include p_center;
      @include wh(90%, 95%);
    }
    .fangda {
      @include wh(70rem / $base, 71rem / $base);
      @include l50;
      @include ba(#a2ca43);
      @include border-radius(50%);
      z-index: 4;
      bottom: -34rem / $base;
    }
    .fangdabg {
      @include wh(32rem / $base, 32rem / $base);
      @include baimg("../assets/images/fdj.png");
      @include p_center;
      z-index: 4;
    }
    .jchg {
      @include wh(153rem / $base, 153rem / $base);
      @include baimg("../assets/images/jchec.png");
      @include po;
      right: -80rem / $base;
      top: -80rem / $base;
      z-index: 4;
    }
    .dsfjc {
      .tbx {
        @include baimg("../assets/images/dsf.png");
      }
      .jchg {
        @include baimg("../assets/images/sgs.png");
      }
    }
    .model {
      .boxinner {
        min-height: 700rem / $base;
      }
      img {
        @include wh(100%, 100%);
      }
      .seeall {
        float: right;
        line-height: 40rem / $base;
        i {
          @include baimg("../assets/images/icon-pdf.png");
          width: 25rem / $base;
          height: 40rem / $base;
          float: left;
          vertical-align: middle;
          margin-right: 0.15rem;
        }
      }
    }
  }
</style>
