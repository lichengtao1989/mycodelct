<template>
  <div class="topmidwrap" id="topmidwrap" >
    <swiper :options="swiperOption" >
    <swiper-slide v-for="(item,index) in swiperSlides" :key="item.SlideID" >
     
      <div class="swiperinner" :data-url="item.Url">
        <img :src="item.ImgPath" class="imgss" >
        <div class="notetext" v-if="item.Note">
          <div class="ttshow">{{item.Note}}</div>
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
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted() {
    // setInterval(() => {
    //   console.log('simulate async data')
    //   if (this.swiperSlides.length < 10) {
    //     this.swiperSlides.push(this.swiperSlides.length + 1)
    //   }
    // }, 3000)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.topmidwrap {
  height: 259px;
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
    background: rgba(0, 0, 0, 0.7);
    @include co(#fff);
    @include fo(13px);
    line-height: 21px;
    padding-left: 21px;
    padding-right: 21px;
    height: 38px;
    padding-top: 12px;
  }
}
.swiper-container {
  height: 100%;
}
</style>
