<template>
  <div class="tabbox">
    <div class="topclick">
      <div @click="itemChange(index)" class="citem" :class="{activeitem:index==myindex}" v-for="(item,index) in textAry" :key="item.id">{{item.text}}</div>
    </div>
    <div class="nextlistinfo">
      <div class="part" v-if="myindex==0">
        <div class="lctwrap" @click="jumpArt">
          <div class="bt1">{{oneObj.ArticleTitle}}</div>
          <div class="nrxs">{{oneObj.ArticleShortContent}}</div>
        </div>
        <div class="listinfo">
          <div class="listitem" v-for="item in listAryNew" :key="item.ArticleID" @click="jumpUrl(item,item.ArticleID,1)">
            <div class="sk inline"></div>
            <div class="xssx inline">{{item.ArticleTitle}}</div>
          </div>
        </div>
      </div>
      <div class="part" v-if="myindex==1">
        <div class="listinfo listinfo2">
          <div class="listitem" v-for="item in listNotice" :key="item.ArticleID" @click="jumpUrl(item,item.ArticleID,2)">
            <div class="sk inline"></div>
            <div class="xssx inline">{{item.ArticleTitle}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['listAry', 'oneObj', 'listNotice'],
  data() {
    return {
      listAryNew: [],
      textAry: [{ text: '新闻动态', id: 1 }, { text: '通知公告', id: 2 }],
      morePath: '',
      myindex: 0,
      listtypeVal: 1
    };
  },
  computed: {},
  components: {},
  methods: {
    jumpUrl(obj, id, type) {
      if (obj.Islink) {
        window.open(obj.ArticleContent);
      } else {
        this.$router.push({
          path: `/article/${id}/?listtype=${type}`
        });
      }
    },
    jumpArt() {
      if (this.oneObj.Islink) {
        window.open(this.oneObj.ArticleContent);
      } else {
        this.$router.push({
          path: `/article/${this.oneObj.ArticleID}/?listtype=1`
        });
      }
    },
    operateFn(str) {
      let strVal = '';
      if (str.length > 58) {
        strVal = str.substr(0, 58) + '...';
      } else {
        strVal = str;
      }
      return strVal;
    },
    itemChange(idx) {
      this.myindex = idx;
    }
  },
  created() {},
  mounted() {
    function curtail(arr) {
      var m = arr.slice(0);
      m.splice(0, 1);
      return m;
    }

    this.listAryNew = curtail(this.listAry);
    // this.listAryNew=this.listAry;
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';

.tabbox {
  @include fo(16px);
  width: 433px;
  height: 100%;
  @include ba(#fff);
  .topclick {
    height: 45px;
    line-height: 45px;
    @include ba(#ececec);
    @include ov;
    @include fo(16px);
    @include co(#333333);
    div {
      @include float;
      width: 109px;
      @include te;
      cursor: pointer;
    }
    .activeitem {
      @include ba(#56bc4a);
      color: #fff;
    }
  }
  .nextlistinfo {
    padding-left: 13px;
    @include bs;
  }
  .part {
    cursor: pointer;
  }
  .part:first-child {
    // padding-top: 18px;
    width: 394px;
    .bt1 {
      @include fo(18px);
      line-height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include co(#4d4d4d);
      font-weight: bold;
    }
    .nrxs {
      @include fo(16px);
      line-height: 28px;
      height: 56px;
      @include co(#999);
    }

    .nrxs {
      position: relative;
      line-height: 20px;
      max-height: 40px; /*是行高的整数倍，防止下行文字露出*/
      overflow: hidden;
    }

    .nrxs::after {
      content: '...';
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 40px;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    }
    .listinfo {
      padding-top: 13;
      width: 405px;
      border-top: 1px solid #e1e1e1;
      margin-top: 10px;
      padding-top: 13px;
      .listitem {
        margin-bottom: 10px;
      }
      .inline {
        display: inline-block;
        vertical-align: middle;
      }
      .sk {
        @include wh(6px, 6px);
        @include ba(#ccc);
        margin-right: 10px;
      }

      .xssx {
        width: 363px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .listinfo2 {
      border: none;
      padding-top: 0;
    }
  }
}
</style>
<style lang="scss" type="text/css">
#topmidwrap .swiper-pagination-bullet {
  background: #68686c;
  opacity: 1;
  width: 10px;
  height: 10px;
}

#topmidwrap .swiper-pagination-bullet-active {
  background-color: #fff;
}
.swiper-pagination {
  position: absolute;
  text-align: center;
  /* padding-right:17px; */
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
#topmidwrap .swiper-pagination {
  // position: absolute;
  // text-align: left;
  // padding-left: 75%;
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  text-align: right;
  padding-right: 20px;
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
}

#topmidwrap .swiper-pagination-bullets {
  bottom: 17px;
  right: 0px;
}
</style>
