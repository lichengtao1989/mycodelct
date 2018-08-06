<template>
  <div class="detailinfocp" id="pdetaillct">
    <div class="biaoti">
      优质农产品
    </div>
    <div class="nextinfo">
      <div class="left">
        <div class="ppxs">
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
  margin-top: 10px;
  width: 100%;
  border: 1px solid #128f40;
  .biaoti {
    padding: 10px 20px;
    font-size: 16px;
    color: #128f40;
  }
  .left {
    padding: 30px 70px;
  }
  .nextinfo {
    .w280 {
      display: inline-block;
      width: 220px;
      vertical-align: top;
    }
    .w80 {
      display: inline-block;
      width: 80px;
    }
    min-height: 440px;
    @include pr;
    .right {
      @include po;
      top: 30px;
      left: 450px;
      width: 800px;
      .sm1 {
        // @include li(52px);
        line-height: 30px;
        padding-top: 15px;
        border-bottom: 1px solid #dadce0;
      }
      .inline {
        display: inline-block;
        vertical-align: top;
        width: 49%;
      }
    }
    .djgm {
      @include wh(320px, 47px);
      @include te;
      @include ba(#128f40);
      @include co(#fff);
      line-height: 47px;
      margin: 50px auto;
      cursor: pointer;
    }
  }
  .w300 {
    width: 300px;
    @include pr;
    height: 250px;
  }
  .ppxs {
    padding-bottom: 10px;

    color: #212325;
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';

.newlist {
  width: 404px;
  border-top: 1px solid #e1e1e1;
  padding-top: 25px;
  margin-top: 8px;
  @include fo(16px);
  @include ov;
}
.inline {
  display: inline-block;
  vertical-align: top;
}
.newitem {
  cursor: pointer;
  margin-bottom: 17px;
  .inline {
    vertical-align: middle;
  }
  .sk {
    @include wh(6px, 6px);
    @include ba(#ccc);
    margin-right: 12px;
  }
  .xw {
    width: 333px;
    height: 16px;
    @include ovt;
  }
}
.moduleitem {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 11px;
  @include wh(433px, 352px);
  @include ov;
  @include bs;
  @include pr;
  @include ba(#fff);
  display: inline-block;
  margin-bottom: 14px;
  .left {
    @include wh(56px, 56px);
    @include baimg('../../../static/images/dxdbt1.png');
  }
  .ename {
    @include fo(12px);
    @include co(#cccccc);
  }
  .right {
    padding-left: 11px;
  }
  .dbt {
    @include fo(32px);
    font-weight: bold;
    @include co(#1993f0);
    padding-bottom: 10px;
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
  margin-left: 10px;
  margin-right: 10px;
}
.morelink {
  @include po;
  @include fo(14px);
  @include co(#999);
  top: 55px;
  right: 16px;
  z-index: 2;
}
.swiperoutlct1 {
  margin-top: 11px;
  @include wh(404px, 257px);
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
    @include fo(16px);
    line-height: 44px;
    padding-left: 21px;
    padding-right: 21px;
    height: 44px;
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