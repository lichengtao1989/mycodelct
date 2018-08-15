<template>
  <div class="moduleitem" :class="computedClass">
    <div class="morelink" @click="jumpUrlList">更多>></div>
    <div class="top">
      <div class="left inline"></div>
      <div class="right inline">
        <div class="dbt ">{{itemobj.text}}</div>
        <div class="ename ">{{itemobj.ename}}</div>
      </div>
    </div>
    <div class="showtype" v-if="itemobj.type==1">
      <div class="swiperoutlct1" id="swiperoutlct1">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index)  in newlist" :key="index">
            <div class="swiperinner" :data-url="item.Url" @click="jumpUrl(item,itemobj.type)">
              <img :src="item.ImgList[0]" class="imgss">
              <div class="notetext" v-if="item.Title">
                <div class="ttshow">{{item.Title}}</div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="showtype" v-if="itemobj.type==2">
      <div class="swiperoutlct1" id="swiperoutlct2">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in newlist" :key="index">
            <div class="swiperinner" :data-url="item.Url" @click="jumpUrl(item,itemobj.type)">
              <img :src="item.ProductImg[0].ImagePath" class="imgss">
              <div class="notetext" v-if="item.ProductName">
                <div class="ttshow">{{item.ProductName}}</div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="showtype" v-if="itemobj.type>2">
      <div class="newlist">
        <div class="newitem" v-for="(item,index) of newlist" :key="index" @click="jumpUrl(item,itemobj.type)">
          <div class="inline sk"></div>
          <div class="inline xw">{{item.Title||item.ArticleTitle}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  props: {
    itemobj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    computedClass() {
      return `itemtype${this.itemobj.type}`;
    }
  },
  data() {
    return {
      newlist: [],
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
  components: {},
  methods: {
    async listInfo(url, query) {
      let { err, res } = await this.$ajax.get(url, query);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.total = dataInfo.Total;
          this.newlist = dataInfo.List;
        }
      }
    },
    jumpUrlList() {
      console.log(this.itemobj);
      let typeVal = parseInt(this.itemobj.type);
      let path = '';
      switch (typeVal) {
        case 9:
          //政策法规
          path = '/regulations';
          break;
        case 8:
          //标准规范
          path = '/standard';
          break;
        case 7:
          //农情预警
          path = '/warning';
          break;
        case 6:
          //热点聚焦
          path = '/hotfocus';
          break;
        case 5:
          //质量监管
          path = '/quality';
          break;
        case 4:
          //执法公开
          path = '/law';
          break;
        case 3:
          //产品认证
          path = '/certification';
          break;
        case 2:
          //特色商城
          path = '/shoppingmall';
          break;
        case 1:
          //魅力定襄
          path = '/charm';
          break;
        default:
          break;
      }
      this.$router.push({
        path: path
      });
    },
    jumpUrl(obj, type) {
      let typeVal = parseInt(type);
      let id = '';
      let listtype = '';
      switch (typeVal) {
        case 9:
          //政策法规
          id = obj.ArticleID;
          listtype = 4;
          break;
        case 8:
          //标准规范
          id = obj.NewID;
          listtype = 11;
          break;
        case 7:
          //农情预警
          id = obj.NewID;
          listtype = 9;
          break;
        case 6:
          //热点聚焦
          id = obj.NewID;
          listtype = 6;
          break;
        case 5:
          //质量监管
          id = obj.NewID;
          listtype = 5;
          break;
        case 4:
          //执法公开
          id = obj.NewID;
          listtype = 7;
          break;
        case 3:
          //产品认证
          id = obj.NewID;
          listtype = 8;
          break;
        case 2:
          //特色商城
          id = obj.ProductID;
          listtype = 12;
          break;
        case 1:
          //魅力定襄
          id = obj.NewID;
          listtype = 10;
          break;
        default:
          break;
      }
      if (typeVal == 2) {
        this.$router.push({
          path: `/productdetail/${id}/?listtype=${listtype}`
        });
      } else {
        this.$router.push({
          path: `/article/${id}/?listtype=${listtype}`
        });
      }
    }
  },
  created() {},
  mounted() {
    let apiUrl = '';
    let queryObj = {};
    let typeVal = parseInt(this.itemobj.type);
    switch (typeVal) {
      case 9:
        //政策法规
        apiUrl = this.$apiUrl.COMMON.LIST;
        queryObj = { pageSize: 7, pageNum: 1, ArticleType: 4 };
        break;
      case 8:
        //标准规范
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 7 };
        break;
      case 7:
        //农情预警
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 5 };
        break;
      case 6:
        //热点聚焦
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 2 };
        break;
      case 5:
        //质量监管
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 1 };
        break;
      case 4:
        //执法公开
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 3 };
        break;
      case 3:
        //产品认证
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 4 };
        break;
      case 2:
        //特色商城
        apiUrl = this.$apiUrl.COMMON.PRODUCTLIST;
        queryObj = { pageSize: 7, pageNum: 1, ProductType: 2 };
        break;
      case 1:
        //魅力定襄
        apiUrl = this.$apiUrl.NEWS.LIST;
        queryObj = { pageSize: 7, pageNum: 1, Type: 6 };
        break;
      default:
        break;
    }
    this.listInfo(apiUrl, queryObj);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';
.newlist {
  width: 404rem / $base;
  border-top: 1rem / $base solid #e1e1e1;
  padding-top: 25rem / $base;
  margin-top: 8rem / $base;
  @include fo(16rem / $base);
  @include ov;
}
.inline {
  display: inline-block;
  vertical-align: top;
}
.newitem {
  cursor: pointer;
  margin-bottom: 13rem / $base;
  .inline {
    vertical-align: middle;
  }
  .sk {
    @include wh(6rem / $base, 6rem / $base);
    @include ba(#ccc);
    margin-right: 12rem / $base;
  }
  .xw {
    width: 333rem / $base;
    height: 20rem / $base;
    @include ovt;
  }
}
.moduleitem {
  padding-left: 15rem / $base;
  padding-right: 15rem / $base;
  padding-top: 11rem / $base;
  @include wh(433rem / $base, 352rem / $base);
  @include ov;
  @include bs;
  @include pr;
  @include ba(#fff);
  display: inline-block;
  margin-bottom: 14rem / $base;
  .left {
    @include wh(56rem / $base, 56rem / $base);
    @include baimg('../../../static/images/dxdbt1.png');
  }
  .ename {
    @include fo(12rem / $base);
    @include co(#cccccc);
  }
  .right {
    padding-left: 11rem / $base;
  }
  .dbt {
    @include fo(32rem / $base);
    font-weight: bold;
    @include co(#1993f0);
    padding-bottom: 10rem / $base;
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
  margin-left: 10rem / $base;
  margin-right: 10rem / $base;
}
.morelink {
  cursor: pointer;
  @include po;
  @include fo(14rem / $base);
  @include co(#999);
  top: 55rem / $base;
  right: 16rem / $base;
  z-index: 2;
}
.swiperoutlct1 {
  margin-top: 11rem / $base;
  @include wh(404rem / $base, 257rem / $base);
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
    @include fo(16rem / $base);
    line-height: 44rem / $base;
    padding-left: 21rem / $base;
    padding-right: 21rem / $base;
    height: 44rem / $base;
    width: 75%;
    @include tov;
  }
}
</style>
<style lang="scss" type="text/css">
$base: 192;
#swiperoutlct1 .swiper-pagination-bullet,
#swiperoutlct2 .swiper-pagination-bullet {
  background: #68686c;
  opacity: 1;
  width: 10rem / $base;
  height: 10rem / $base;
}

#swiperoutlct1 .swiper-pagination-bullet-active,
#swiperoutlct2 .swiper-pagination-bullet-active {
  background-color: #fff;
}
#swiperoutlct1 .swiper-pagination,
#swiperoutlct2 .swiper-pagination {
  position: absolute;
  text-align: right;
  padding-right: 20rem / $base;
  box-sizing: border-box;
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
  bottom: 15rem / $base;
  right: 10%;
  display: inline-block;
}
</style>
