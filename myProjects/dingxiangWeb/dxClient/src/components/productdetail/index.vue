<template>
  <div class="detailinfocp" id="pdetaillct">
    <div class="biaoti">
      优质农产品
    </div>
    <div class="nextinfo">
      <div class="left">
        <div class="xxl">
          {{infoData.ProductName}}
        </div>
        <div class="w300">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in infoData.ProductImg" :key="index">

              <div class="swiperinner" :data-url="item.Url">
                <img :src="item.ImagePath" class="imgss">
                <!-- <div class="notetext" v-if="item.ArticleTitle">
                  <div class="ttshow">{{item.ArticleTitle}}</div>
                </div> -->
              </div>
            </swiper-slide>
            <!-- <div class="zxwrap"> -->
            <div class="swiper-button-prev" slot="button-prev">

            </div>
            <div class="swiper-button-next" slot="button-next">

            </div>
            <!-- </div> -->

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="right">
        <div class="sm1">
          <div class="inline" v-if="infoData.ProductBrand">
            <span class="w80">品牌</span>
            <span class="w280">{{infoData.ProductBrand}}</span>
          </div>
          <div class="inline" v-if="infoData.ContactInfo">
            <span class="w80">联系方式</span>
            <span class="w280">{{infoData.ContactInfo}}</span>
          </div>
        </div>
        <div class="sm1">
          <div class="inline" v-if="infoData.Producer">
            <span class="w80">生产企业</span>
            <span class="w280">{{infoData.Producer}}</span>
          </div>
          <div class="inline" v-if="infoData.ShelfLife">
            <span class="w80">保质期</span>
            <span class="w280">{{infoData.ShelfLife+'天'}}</span>
          </div>
        </div>
        <div class="sm2">
          <div class="djgm" @click="jumpUrl">
            点击购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiList from '@/api/api';
import newsdetail from '@/api/newsdetail';
import dataAry from './data.js';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        delay: 3000,
        stopOnLastSlide: false,
        autoplayDisableOnInteraction: false,
        disableOnInteraction: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      infoData: {},
      mytitle: '',
      CreateTime: '',
      ReadCount: '',
      mycontent: '',
      ArticleType: '',
      ArticleSubType: ''
    };
  },
  components: {
    // top
  },
  computed: {},
  methods: {
    jumpUrl() {
      if (this.infoData.MallUrl) {
        window.open(this.infoData.MallUrl);
      }
    },
    async info() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.PRODUCDETAIL, { ProductID: this.$route.params.id });
      console.log(err, res);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          this.infoData = res.Data;
        }
      }
    }
  },
  created() {},
  mounted() {
    this.info();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
$base: 192;
@import 'static/style/_var.scss';
.swiperinner {
  @include wh(100%, 100%);
  img {
    @include block;
    @include wh(100%, 100%);
  }
}
.imgss {
  display: block;
  height: 100%;
}
.detailinfocp {
  @include ba(#fff);
  margin-top: 10rem/$base;
  width: 100%;
  border: 1rem/$base solid #128f40;
  .biaoti {
    padding: 10rem/$base 20rem/$base;
    font-size: 16rem/$base;
    color: #128f40;
  }
  .left {
    padding: 30rem/$base 70rem/$base;
  }
  .nextinfo {
    font-size:16rem/$base;
    .w280 {
      display: inline-block;
      width: 220rem/$base;
      vertical-align: top;
    }
    .w80 {
      display: inline-block;
      width: 80rem/$base;
    }
    min-height: 440rem/$base;
    @include pr;
    .right {
      @include po;
      top: 30rem/$base;
      left: 450rem/$base;
      width: 800rem/$base;
      .sm1 {
        // @include li(52rem/$base);
        line-height: 30rem/$base;
        padding-top: 15rem/$base;
        border-bottom: 1rem/$base solid #dadce0;
      }
      .inline {
        display: inline-block;
        vertical-align: top;
        width: 49%;
      }
    }
    .djgm {
      @include wh(320rem/$base, 47rem/$base);
      @include te;
      @include ba(#128f40);
      @include co(#fff);
      line-height: 47rem/$base;
      margin: 50rem/$base auto;
      cursor: pointer;
    }
  }
  .w300 {
    width: 300rem/$base;
    @include pr;
    height: 250rem/$base;
  }
  .xxl {
    padding-bottom: 10rem/$base;

    color: #212325;
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';

.newlist {
  width: 404rem/$base;
  border-top: 1rem/$base solid #e1e1e1;
  padding-top: 25rem/$base;
  margin-top: 8rem/$base;
  @include fo(16rem/$base);
  @include ov;
}
.inline {
  display: inline-block;
  vertical-align: top;
}
.newitem {
  cursor: pointer;
  margin-bottom: 17rem/$base;
  .inline {
    vertical-align: middle;
  }
  .sk {
    @include wh(6rem/$base, 6rem/$base);
    @include ba(#ccc);
    margin-right: 12rem/$base;
  }
  .xw {
    width: 333rem/$base;
    height: 16rem/$base;
    @include ovt;
  }
}
.moduleitem {
  padding-left: 15rem/$base;
  padding-right: 15rem/$base;
  padding-top: 11rem/$base;
  @include wh(433rem/$base, 352rem/$base);
  @include ov;
  @include bs;
  @include pr;
  @include ba(#fff);
  display: inline-block;
  margin-bottom: 14rem/$base;
  .left {
    @include wh(56rem/$base, 56rem/$base);
    @include baimg('../../../static/images/dxdbt1.png');
  }
  .ename {
    @include fo(12rem/$base);
    @include co(#cccccc);
  }
  .right {
    padding-left: 11rem/$base;
  }
  .dbt {
    @include fo(32rem/$base);
    font-weight: bold;
    @include co(#1993f0);
    padding-bottom: 10rem/$base;
  }
}
.itemtype2 {
  .left {
    @include baimg('../../../static/images/dxdbt2.png');
  }
  .dbt {
    @include co(#10b66f);
  }
}
.itemtype3 {
  .left {
    @include baimg('../../../static/images/dxdbt3.png');
  }
  .dbt {
    @include co(#f89a35);
  }
}
.itemtype4 {
  .left {
    @include baimg('../../../static/images/dxdbt4.png');
  }
  .dbt {
    @include co(#f8723b);
  }
}
.itemtype5 {
  .left {
    @include baimg('../../../static/images/dxdbt5.png');
  }
  .dbt {
    @include co(#c271f1);
  }
}
.itemtype6 {
  .left {
    @include baimg('../../../static/images/dxdbt6.png');
  }
  .dbt {
    @include co(#afd332);
  }
}
.itemtype7 {
  .left {
    @include baimg('../../../static/images/dxdbt7.png');
  }
  .dbt {
    @include co(#5fca24);
  }
}
.itemtype8 {
  .left {
    @include baimg('../../../static/images/dxdbt8.png');
  }
  .dbt {
    @include co(#2f7af5);
  }
}
.itemtype9 {
  .left {
    @include baimg('../../../static/images/dxdbt9.png');
  }
  .dbt {
    @include co(#f76f6f);
  }
}
.itemtype2,
.itemtype5,
.itemtype8 {
  margin-left: 10rem/$base;
  margin-right: 10rem/$base;
}
.morelink {
  @include po;
  @include fo(14rem/$base);
  @include co(#999);
  top: 55rem/$base;
  right: 16rem/$base;
  z-index: 2;
}
.swiperoutlct1 {
  margin-top: 11rem/$base;
  @include wh(404rem/$base, 257rem/$base);
  @include ov;
  img {
    @include block;
    @include wh(100%, 100%);
  }
}
.swiper-container {
  @include wh(100%, 100%);
}

.notetext {
  @include po;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  .ttshow {
    @include co(#fff);
    @include fo(16rem/$base);
    line-height: 44rem/$base;
    padding-left: 21rem/$base;
    padding-right: 21rem/$base;
    height: 44rem/$base;
    width: 75%;
    @include tov;
  }
}
</style>
<style lang="scss" type="text/css">
#pdetaillct {
  .swiper-pagination-bullet-active {
    background-color: #128f40;
  }
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    background-image: url('../../../static/images/jtzuo.png');
  }
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    background-image: url('../../../static/images/jtyou.png');
  }
}
</style>