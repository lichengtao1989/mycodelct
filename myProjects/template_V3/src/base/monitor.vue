<template>
  <div class="monitor">
    <div class="imgvideo"  v-if="VideoUrl !== ''">
      <!-- <img src="../assets/images/pos.png" class="poster">
      <div class="pobtn"><div class="sj"></div></div> -->
        <div class="videobg">
            <video width="100%" height="100%" controls :src="VideoUrl" preload="preload" webkit-playsinline>
            </video>
        </div>
    </div>
   <div class="ttp">{{title}}</div>
    <div class="nodata" v-if="VideoUrl === ''">
      <img src="../assets/images/nodata.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" }
  },
  data: function() {
    return {
    };
  },
  computed: {
    VideoUrl() {
      if ( this.$store.state.corpInfo && this.$store.state.corpInfo.BatchData ){
        return this.$store.state.corpInfo.BatchData.VideoUrl;
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/style/_var.scss";
@import "../assets/style/util";
$base: 75;
.monitor {
  // width: 212rem / $base;
  // @include float;
  @include wh(100%, 100%);
  margin: 0 auto;
  .ttp {
    @include te;
    @include fo(24rem / $base);
    @include co(#aaa);
    padding-top: 20rem / $base;
    padding-bottom: 29rem / $base;
  }
  .imgvideo {
    @include wh(100%, 100%);
    @include pr;
      .videobg {
          width: 100%;
          height: 5.2rem;
          background: url("../assets/images/video_test.jpg") 100% 100% no-repeat;
      }
      video {
          left: 0;
          top: 0;
          height: 5.2rem;
      }
  }
  .poster {
    @include block;
    @include wh(100%, 100%);
  }
  .pobtn {
    @include po;
    @include p_center;
    @include wh(60rem / $base, 60rem / $base);
    @include ba(#fff);
    @include border-radius(50%);
    z-index: 2;
  }
  .sj {
    @include wh(22rem / $base, 26rem / $base);
    @include baimg("../assets/images/sjxl.png");
    @include p_center;
    z-index: 3;
    margin-left: 3rem / $base;
  }
}
</style>
