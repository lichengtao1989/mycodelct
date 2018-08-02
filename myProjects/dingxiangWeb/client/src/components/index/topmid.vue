<template>
  <div class="topmidwrap" id="topmidwrap">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperSlides" :key="item.SlideID">

        <div class="swiperinner" :data-url="item.Url">
          <img :src="item.ImagePath" class="imgss">
          <div class="notetext" v-if="item.ArticleTitle">
            <div class="ttshow">
              <div class="ovt">{{item.ArticleTitle}}</div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>

</template>

<script>
export default {
  props: {
    swiperSlides: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data() {
    return {
      swiperOption: {
        autoplay: true,
        delay: 3000,
        stopOnLastSlide: false,
        autoplayDisableOnInteraction: false,
        disableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    };
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
.topmidwrap {
  height: 100%;
  @include ov;
  @include ba(#fff);
}
.swiperinner {
  @include wh(100%, 100%);
  @include pr;
}
.imgss {
  @include block;
  @include wh(100%, 100%);
}
.notetext {
  @include po;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
  .ttshow {
    .ovt {
      width: 74%;
      @include ovt;
    }

    background: rgba(0, 0, 0, 0.7);
    @include co(#fff);
    @include fo(16px);
    line-height: 21px;
    padding-left: 21px;
    padding-right: 21px;
    height: 38px;
    padding-top: 18px;
  }
}
.swiper-container {
  height: 100%;
}
</style>
