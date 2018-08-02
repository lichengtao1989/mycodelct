<template>
  <div class="carditem" :data-pcurl="cardinfo.PCUrl" :data-clicks="cardinfo.Clicks" :data-pid="cardinfo.ProductID" @click="jumpFn(cardinfo.PCUrl,cardinfo.Clicks,cardinfo.ProductID,1)">
 <div class="swiperimg" >
       <swiper :options="swiperOption" >
    <swiper-slide v-for="(item,index) in cardinfo.ProductImg" :key="index" >
       <div class="djl">
     {{cardinfo.Clicks}}
   </div>
   <div class="swiperinner">
    <!-- -->
     <psitem :srcstr="item.ImagePath"></psitem>
      <div class="notetext" v-if="cardinfo.ProductName">
          <div class="ttshow">{{cardinfo.ProductName}}</div>
        </div>
   </div>
   <!-- {{item.ImagePath}} -->
     <!-- <psitem :proitem="item.ImagePath"></psitem> -->
 <!-- :data-url=""  -->
   <!-- <div class="play" v-if="false"></div>
  
   <video  class="myvideo"></video>
   <img src="../../static/images/goods.jpg" class="imgs">
   <div class="btext">{{cardinfo.ProductName}}</div> -->


      <!-- <div class="swiperinner" :data-url="item.Url">
        <img :src="item.ImgPath" class="imgss" >
        <div class="notetext" v-if="item.Note">
          <div class="ttshow">{{item.Note}}</div>
        </div>
      </div> -->
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  
 </div>
 </div>

</template>

<script>
import psitem from "./swiperproduct";

export default {
  props: {
    cardinfo: {
      //信息
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      num: 1000,
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
      // swiperOption: {
      //   autoplay: true,
      //   delay: 3000,
      //   stopOnLastSlide: false,
      //   autoplayDisableOnInteraction: false,
      //   disableOnInteraction: false,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true
      //   }
      // }
    };
  },
  computed: {},
  components: {
    psitem
  },
  methods: {
    jumpFn(PCUrl, Clicks, ProductID,type) {
      if (PCUrl) {
        let urlstr = encodeURIComponent(PCUrl);
        let urlstrp = `/Click.aspx?ID=${ProductID}&type=${type}`;
        window.open(urlstrp);
      }
    }
  },
  created() {},
  mounted() {
    // console.log(this.cardinfo)
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
// .carditem{@include inline-block;margin-right:19px;}

.djl {

  
  @include te;
  
  @include ov;
  @include co(#fff);
  @include fo(11px);
  @include po;
  top: 327px;
  right: 21px;
  z-index: 8;
}

.swiperimg {
  height: 349px;
  @include pr;
}
.swiperinner {
  height: 100%;
}
.btext,
.notetext {
  @include te;
  @include fo(16px);
  @include co(#fff);
  height: 45px;
  padding-top: 14px;
  background: rgba(0, 0, 0, 0.57);
  @include po;
  left: 0;
  bottom: 0;
  width: 100%;
}
.ttshow{width:65%;height: 16px;line-height: 1;overflow: hidden;text-overflow: ellipsis;@include mag;white-space:nowrap;}
</style>
<style>
.swiper-container{height: 100%;}
</style>
