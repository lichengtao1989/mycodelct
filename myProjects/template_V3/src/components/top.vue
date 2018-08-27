<template>
  <div>
    <div class="topwrap pifu">

      <div v-show="false" :class="[ dzSatus ? 'dz1': 'dz' ]" @click="changeDz(dzSatus)">
        <div class="xx"></div>
      </div>
      <div v-wechat-title="PageTitle"></div>
      <div class="top">
        <!--<div class="fx">-->
        <!--<img src="../assets/images/fxtb.png" alt="">-->
        <!--</div>-->
        <div class="play" v-if="batchData.EnterpriseVideoUrl" @click="showVideo">
          <div class="jty"></div>
        </div>
        <div class="play vrflag" v-if="batchData.VrVideoUrl" @click="handleVr(batchData.VrVideoUrl)">
          <div class="jty"></div>
        </div>
        <div class="myswiper">
          <swiper :options="swiperOption">
            <!--<swiper-slide v-if="batchData.EnterpriseVideoUrl">-->
            <!--&lt;!&ndash;<iframe frameborder="0" width="100%" height="100%" :src="batchData.EnterpriseVideoUrl" allowfullscreen></iframe>&ndash;&gt;-->
            <!--<div class="video-cover"></div>-->
            <!--</swiper-slide>-->
            <swiper-slide v-for="item in imgs.filter(img => img !== '')" :key="item">
              <div class="swiperinner">
                <img :src="item" class="imgss">
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
    <div class="model" v-if="videoStatus">
      <div class="boxinner">
        <div class="guanbi" @click="closeFn"></div>
        <iframe frameborder="0" width="100%" height="100%" :src="batchData.EnterpriseVideoUrl" v-if="videoStatus"></iframe>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      msg: String
    },

    data: function () {
      return {
        flagbase: '1',
        swiperOption: {
          autoplay: true,
          delay: 3000,
          stopOnLastSlide: false,
          autoplayDisableOnInteraction: false,
          disableOnInteraction: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        },
        dzSatus: false,
        videoStatus: false,
      };
    },
    methods: {
      handleVr(url) {
        location.href = url;
      },
      handleVideo(url) {
        location.href = url;
      },
      changeDz(dzSatus) {
        this.dzSatus = !dzSatus;
      },
      closeFn(){
        this.videoStatus = false;
      },
      showVideo() {
        this.videoStatus = true;
      }
    },
    computed: {
      imgs (){
        const {Product} = this.$store.state.corpInfo;
        let imgs = []
        if (Product) {
          const {Thumbnail1, Thumbnail2, Thumbnail3, Thumbnail4, Thumbnail5} = Product;
          imgs.push(Thumbnail1, Thumbnail2, Thumbnail3, Thumbnail4, Thumbnail5);
        }
        return imgs;
      },
      PageTitle (){
        return this.$store.state.customInfo.CustomTitle ? this.$store.state.customInfo.CustomTitle[0].PageTitle : '农产品溯源';
      },
      batchData () {
        return this.$store.state.corpInfo.BatchData ? this.$store.state.corpInfo.BatchData : {};
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/util.scss";
  @import '../assets/style/_var.scss';
  $base: 75;
  .topwrap {
    @include pr;
    .fx {
      @include border-radius(50%);
      @include wh(60rem / $base, 60rem / $base);
      background: rgba(0, 0, 0, 0.5);
      @include bs;
      @include po;
      top: 20rem / $base;
      right: 32rem / $base;
      z-index: 3;
      img {
        @include p_center;
        z-index: 3;
        @include block;
        @include wh(40rem / $base, 40rem / $base);
      }
    }
    .myswiper {
      @include pr;
      height: 500rem / $base;
      .swiperinner {
        height: 100%;
        @include pr;
      }
      img {
        @include block;
        @include wh(100%, 500rem / $base);
      }
      iframe {
        height: 500rem / $base;
      }
    }
    .play {
      @include wh(120rem / $base, 55rem / $base);
      @include bs;
      @include po;
      bottom: 20rem / $base;
      right: 32rem / $base;
      z-index: 3;
      .jty {
        @include wh(100%, 100%);
        @include baimg('../assets/images/video.png');
      }
    }
    .vrflag {
      top: 20rem / $base;
      right: 32rem / $base;
      z-index: 2;
      .jty {
        @include baimg('../assets/images/vr.png');
      }
    }
    .dz, .dz1 {
      @include wh(126rem / $base, 126rem / $base);
      @include baimg('../assets/images/ty.png');
      @include po;
      top: 448rem / $base;
      right: 24rem / $base;
      z-index: 4;
      .xx {
        @include wh(44rem / $base, 40rem / $base);
        @include baimg('../assets/images/wdz.png');
        left: 50%;
        margin-left: -22rem / $base;
        top: 34rem / $base;
        @include po;
      }
    }
    .dz1 .xx {
      @include baimg('../assets/images/dz1.png');
    }
    .boxtc {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 6;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
