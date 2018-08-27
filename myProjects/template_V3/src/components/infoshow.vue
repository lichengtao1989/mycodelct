<template>
  <div class="infoshow ">

    <div class="page01" v-show="showtype==1?true:false">
      <qualityreport></qualityreport>
    </div>
    <div class="page02" v-show="showtype==2?true:false">
      <traceability></traceability>
    </div>
    <div class="page03" v-show="showtype==3?true:false">
      <div class="cardout">
        <div class="top1 ov">
          <div class="leftp fl"></div>
          <div class="leftr fl">实景监控</div>
          <div class="poms ">*智能硬件实时采集数据</div>
          <div class="bd"></div>
        </div>
        <div class="monitorlist">
          <monitor title="监控"></monitor>
        </div>
      </div>
      <div class="cardout">
        <div class="top1 ov">
          <div class="leftp fl leftp2"></div>
          <div class="leftr fl">气象检测</div>
          <select class="poms" @change="handleStation">
            <option v-for="(item) in weatherStation" :key="item.StationID" v-bind:value="item.StationID">{{item.StationName}}</option>
          </select>
          <div class="bd"></div>
        </div>
        <!--<div class="weatherlist" v-if="Object.keys(weatherdata).length > 0">-->
        <!--<div class="qxlist">-->
        <!--<weather v-bind:weatherdata="weatherdata" :moretype="more"></weather>-->
        <!--</div>-->
        <!--<div class="ckgd" @click="showMore(more)">{{more ? '收起' : '查看更多'}}</div>-->
        <!--</div>-->

        <div class="weatherlist" v-if="Object.keys(weatherdata).length > 0">
          <weatherv2 v-bind:weatherdata="weatherdata"></weatherv2>
        </div>
        <div class="nodata" v-if="Object.keys(weatherdata).length === 0">
          <img src="../assets/images/nodata.png" alt="">
        </div>
      </div>
      <!--<div class="cardout">-->
      <!--<toptitle icontype="1" title="土壤各项指标" setitle="镉、铅、铜离子浓度均未超标" level="1" zhibiaotype="1"></toptitle>-->
      <!--<div class="quotalist">-->
      <!--<quota v-for="(item,index) in 4" title="镉离子浓度" quotaval="8.0" unitval="ppb" timeval="10"  :key="index"></quota>-->
      <!--</div>  -->
      <!--</div>-->
      <!--<div class="cardout">-->
      <!--<toptitle icontype="2" title="水质各项指标" setitle="镉、铅、铜离子浓度均未超标" level="1" zhibiaotype="1"></toptitle>-->
      <!--<div class="quotalist">-->
      <!--<quota v-for="(item,index) in 4" title="镉离子浓度" quotaval="8.0" unitval="ppb" timeval="10" :key="index"></quota>-->
      <!--</div>  -->
      <!--</div>-->
      <!--<div class="cardout">-->
      <!--<toptitle icontype="3" title="空气各项指标" setitle="镉、铅、铜离子浓度均未超标" level="1" zhibiaotype="1"></toptitle>-->
      <!--<div class="quotalist">-->
      <!--<quota v-for="(item,index) in 4" title="镉离子浓度" quotaval="8.0" unitval="ppb" timeval="10" :key="index"></quota>-->
      <!--</div>  -->
      <!--</div>-->


    </div>
    <div class="page04" v-show="showtype==4?true:false">
      <!-- <div class="qyzs gditem">
        <div class="leftlt leftlt1 fl"><div class="gdim"></div></div>
        <div class="leftltr fl">企业展示</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <div class="qyzs gditem">
        <div class="leftlt leftlt2 fl"><div class="gdim"></div></div>
        <div class="leftltr fl">产地环境</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <div class="qyzs gditem">
        <div class="leftlt leftlt3 fl"><div class="gdim"></div></div>
        <div class="leftltr fl">淘宝店铺</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <div class="qyzs gditem">
        <div class="leftlt leftlt4 fl"><div class="gdim"></div></div>
        <div class="leftltr fl">联系我们</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div> -->
      <!-- 自定义模块 -->
      <div class="qyzs gditem" v-for="(item, index) in customInfo.CustomFunction" :key="'CustomFunction'+index" @click="iconDetail(item.DataUrl, 'noVideo')">
        <div class="leftlt fl">
          <img :src="item.IcoUrl" alt="" v-if="item.IcoUrl">
          <img :src="defaultIconUrl" alt="" v-if="!item.IcoUrl">
        </div>
        <div class="leftltr fl">{{item.IcoName}}</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <div class="qyzs gditem" v-for="(item, index) in customInfo.CustomFunctionVideo" :key="'CustomFunctionVideo'+index" @click="iconDetail(item.VideoUrl, 'video')" v-if="item.VideoUrl && item.VideoUrl !== 'http://'">
        <div class="leftlt fl">
          <img :src="item.CoverPic || ''" alt="" v-if="item.CoverPic">
          <img :src="defaultIconUrl" alt="" v-if="!item.CoverPic">
        </div>
        <div class="leftltr fl">{{item.VideoTitle}}</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <div class="model" v-if="show">
        <div class="boxinner">
          <div class="guanbi" @click="closeFn"></div>
          <div v-if="modelType === 'video'">
            <!--<video width="100%" height="100%" controls v-if="videoType === 'defaultVideo'">-->
            <!--<source :src="dataUrl" type="video/mp4">-->
            <!--<source :src="dataUrl" type="video/ogg">-->
            <!--<source :src="dataUrl" type="video/webm">-->
            <!--<object :data="dataUrl"  width="100%" height="100%">-->
            <!--<embed :src="dataUrl"  width="100%" height="100%">-->
            <!--</object>-->
            <!--</video>-->
            <iframe :src="dataUrl" frameborder="0" width="100%" height="100%"></iframe>
          </div>
        </div>
      </div>
      <div class="qyzs gditem" @click="showCompany" v-if="OrgType !== '15'">
        <div class="leftlt fl">
          <img src="../assets/images/qyzs.png" alt="">
        </div>
        <div class="leftltr fl">企业展示</div>
        <div class="jtt"></div>
        <div class="bdb"></div>
      </div>
      <company :flag="flagcompany" @close="closeCompany"></company>
    </div>

    <!--<div>-->
      <!--<iframe frameborder="0" width="100%" height="100%" :src="batchData.EnterpriseVideoUrl+'?wmode=Opaque'"></iframe>-->
    <!--</div>-->
  </div>
</template>

<script>
  import qualityreport from "./qualityreport";
  import traceability from "./traceability";
  import company from './company';

  import monitor from "../base/monitor";

  // import weather from "../base/weather";
  import weatherv2 from "../base/weatherv2";
  import toptitle from "../base/toptitle";
  import quota from "../base/quota";
  import urlQuery from '../common/jsonp/urlQuery';

  export default {
    props: {
      showtype: {
        type: Number,
        default: 1
      }
    },
    data: function () {
      return {
        weatherStation: [],
        Code: '',
        weatherdata: {},
        more: false,
        flagcompany: 1,
        show: false,
        modelType: 'noVideo',
        dataUrl: '',
        videoType: 'defaultVideo',
        defaultIconUrl: 'http://static.app315.net/Resource/images/suyuanIcons/icon6.png'
      };
    },
    created() {
      const {code} = urlQuery(location.href.toLocaleLowerCase());
      const Code = code;
      this.Code = code;
      this.getWeatherStation(Code).then(res => {
        if (res.Result === "200" && res.Data) {
          let weatherStation = res.Data.RecordList;
          let defaultStationID = weatherStation[0].StationID;
          this.weatherStation = weatherStation;
          this.getWeatherRecord(Code, defaultStationID).then(res => {
            if (res.Data.weatherData) {
              this.weatherdata = res.Data.weatherData;
            } else {
              this.weatherdata = {};
            }
          })
        }
      })
    },
    mounted() {
    },
    components: {
      qualityreport,
      traceability,
      monitor,
      // weather,
      weatherv2,
      toptitle,
      quota,
      company,
    },
    methods: {
      setLocation(url){
        const preWords = 'video.html?url=';
        if (url.toLocaleLowerCase().indexOf(preWords) === 0) {
          const paramUrl = url.substr(preWords.length);
          location.href = preWords + encodeURIComponent(paramUrl);
        } else {
          location.href = url;
        }
      },
      iconDetail(url, type) {
        this.modelType = type;
        if (type === 'noVideo') {
          this.setLocation(url);
        } else {
          this.show = true;
          this.dataUrl = url;
          if (url.indexOf('iframe') !== -1) {
            this.videoType = 'iframe';
          } else {
            this.videoType = 'defaultVideo';
          }
        }
      },
      closeFn() {
        this.show = false;
      },
      getWeatherStation(Code) {
        let data = {function: 'GetWeatherStationList', Code, type: 'cjm'};
        return this.$jsonp(data);
      },
      handleStation (e) {
        let Code = this.Code;
        let StationID = e.target.value;
        this.getWeatherRecord(Code, StationID).then(res => {
          if (res.Data && Object.keys(res.Data).length > 0) {
            this.weatherdata = res.Data.weatherData;
          } else {
            this.weatherdata = {};
          }
        })
      },
      getWeatherRecord(Code, StationID){
        let data = {function: 'GetLatestWeatherRecord', Code, StationID, type: 'cjm'};
        return this.$jsonp(data);
      },
      showMore(more) {
        this.more = !more;
      },
      showCompany() {
        this.flagcompany = 2;
      },
      closeCompany() {
        this.flagcompany = 1;
      },
    },
    computed: {
      customInfo() {
        return this.$store.state.customInfo;
      },
      OrgType() {
        return this.$store.state.corpInfo.OrgInfo ? this.$store.state.corpInfo.OrgInfo.OrgType : '';
      },
      batchData () {
        return this.$store.state.corpInfo.BatchData ? this.$store.state.corpInfo.BatchData : {};
      },
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";
  @import "../assets/style/util.scss";

  $base: 75;
  .infoshow {
    .page01 {
      padding-top: 27rem / $base;
      @include ba(#fff);
      padding-bottom: 83rem / $base;

    }
    .page02 {
      @include ba(#fff);
      padding-bottom: 70rem / $base;

    }
    .page03 {
      padding: 0 .3rem;
      @include ov;
      @include ba(#fff);
      padding-bottom: 70rem / $base;
      .cardout {
        box-shadow: 0 0 5px rgba(170, 170, 170, 0.59);
        border-radius: 5px;
        @include mag;
        margin-top: 29rem / $base;
        padding-top: 20rem / $base;
        .leftp {
          @include wh(21rem / $base, 26rem / $base);
          margin-top: 12rem / $base;
          @include baimg("../assets/images/jk.png");
        }
        .leftp2 {
          margin-top: 12rem / $base;
          @include baimg("../assets/images/qx.png");
        }
        .top1 {
          height: 60rem / $base;
          line-height: 60rem / $base;
          @include ov;
          padding-left: 30rem / $base;
          @include fo(28rem / $base);
          @include pr;
        }
        .poms {
          @include po;
          @include fo(28rem / $base);
          @include co(#aaa);
          right: 23rem / $base;
        }
        .leftr {
          @include fo(28rem / $base);
          @include co(#323232);
          padding-left: 16rem / $base;
        }
        .bd {
          @include wh(710rem / $base, 2rem / $base);
          @include ba(#ededed);
          @include po;
          @include l50;
          bottom: 0;
        }
      }
      .monitorlist {
        padding: 30rem / $base;
      }
      .qxlist {
        padding-left: 30rem / $base;
        padding-top: 36rem / $base;
        @include ov;
      }
      .qxlist {
        min-height: 228rem / $base;
      }
      .ckgd {
        @include fo(24rem / $base);
        @include co(#aaa);
        @include te;
        padding-bottom: 20rem / $base;
      }
      .quotalist {
        padding-top: 64rem / $base;
        @include ov;
        padding-left: 79rem / $base;
        padding-right: 79rem / $base;
      }
    }
    .page04 {
      @include ov;
      @include ba(#fff);
      .gditem {
        height: 129rem / $base;
        @include pr;
        @include fo(28rem / $base);
        line-height: 129rem / $base;
        @include co(#aaa);
        @include bs;
        padding-left: 32rem / $base;
        overflow: hidden;
        .leftlt img {
          @include wh(90rem / $base, 90rem / $base);
          @include border-radius(40%);
          @include ba(#c7c8c8);
          @include pr;
          margin-top: 19rem / $base;
          margin-right: 24rem/$base;
        }
        .bdb {
          @include wh(710rem / $base, 1px);
          @include ba(#ddd);
          @include po;
          @include l50;
          bottom: 0;
          z-index: 2;
        }
        .jtt {
          @include wh(17rem / $base, 31rem / $base);
          @include po;
          top: 47rem / $base;
          right: 32rem / $base;
          z-index: 2;
          @include baimg("../assets/images/jtri.png");
        }
      }
    }
    .qyxx {
      @include wh(90rem / $base, 90rem / $base);
      @include border-radius(40%);
      @include ba(#c7c8c8);
      @include pr;
      margin-top: 19rem / $base;
      margin-right: 24rem/$base;
    }
    .leftlt1 {
      div {
        @include wh(50rem/$base, 41rem/$base);
        @include p_center;
        @include baimg('../assets/images/qyzs.png');
      }
    }
    .weatherlist {
      overflow: hidden;
    }
  }
</style>
