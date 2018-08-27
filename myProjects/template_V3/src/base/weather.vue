<template>
 <div class="ddwrap">
    <div class="qixiang" v-if="defaultWeatherData[101]">
      <div class="powz">
        <div class="wd">温度</div>
        <div class="wdval">{{defaultWeatherData[101]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico"></div>
      </div>

  </div>
   <div class="qixiang " v-if="defaultWeatherData[107]">
      <div class="powz">
        <div class="wd">湿度</div>
        <div class="wdval">{{defaultWeatherData[107]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico2"></div>
      </div>

  </div>
   <div class="qixiang " v-if="defaultWeatherData[102]">
      <div class="powz">
        <div class="wd">气压</div>
        <div class="wdval">{{defaultWeatherData[102]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

  </div>

  <div v-if="moretype">
     <div class="qixiang " v-if="defaultWeatherData[103]">
      <div class="powz">
        <div class="wd">风向</div>
        <div class="wdval">{{defaultWeatherData[103]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

    </div>

    <div class="qixiang " v-if="defaultWeatherData[104]">
      <div class="powz">
        <div class="wd">风力</div>
        <div class="wdval">{{defaultWeatherData[104]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

    </div>

    <div class="qixiang " v-if="defaultWeatherData[105]">
      <div class="powz">
        <div class="wd">日出</div>
        <div class="wdval">{{defaultWeatherData[105]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

    </div>
    <div class="qixiang " v-if="defaultWeatherData[106]">
      <div class="powz">
        <div class="wd">日落</div>
        <div class="wdval">{{defaultWeatherData[106]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

    </div>

    <div class="qixiang " v-if="defaultWeatherData[108]">
      <div class="powz">
        <div class="wd">紫外线强度</div>
        <div class="wdval">{{defaultWeatherData[108]}}</div>
      </div>
      <img src="../assets/images/zstp.png" class="imgp">
      <div class="maskp"></div>
      <div class="pic">
        <div class="ico ico3"></div>
      </div>

    </div>
  </div>
 </div>
</template>

<script>

export default {
  props: {
    title: { type: String, default: "", },
    weatherdata: { type: Object, default: () => {} },
    moretype: { type: Boolean, default: false },
  },
  data: function() {
    return {};
  },
  computed: {
    defaultWeatherData() {
      return this.weatherdata;
    },
    showmore() {
      console.log(this.moretype);
      return this.moretype;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
$base: 75;
.qixiang {
  width: 212rem / $base;
  @include float;
  margin-right: 15rem / $base;
  margin-bottom: 65rem / $base;
  @include pr;
  .imgp {
    @include wh(100%, 140rem / $base);
    @include block;
    @include border-radius(10rem / $base);
  }
  .maskp {
    @include wh(100%, 100%);
    @include border-radius(10rem / $base);
    background: rgba(108, 153, 2, 0.85);
    @include po;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .powz {
    @include te;
    @include co(#fff);
    @include po;
    @include fo(24rem / $base);
    @include l50;
    top: 26rem / $base;
    z-index: 4;
  }
  .wd {
    padding-bottom: 15rem / $base;
  }
  .wdval {
    @include fo(46rem / $base);
  }
  .pic {
    @include wh(96rem / $base, 96rem / $base);
    @include l50;
    top: 110rem / $base;
    @include baimg("../assets/images/ty3.png");
    z-index:4;
   
  }
   .ico{
      @include wh(20rem/$base,35rem/$base);
      @include l50;
      top:20rem/$base;
      @include baimg('../assets/images/qg.png');
    }
     .ico2{
      @include wh(25rem/$base,33rem/$base);
      @include l50;
      top:20rem/$base;
      @include baimg('../assets/images/sd.png');
    }
      .ico3{
      @include wh(42rem/$base,20rem/$base);
      @include l50;
      top:30rem/$base;
      @include baimg('../assets/images/co.png');
    }
}
</style>
