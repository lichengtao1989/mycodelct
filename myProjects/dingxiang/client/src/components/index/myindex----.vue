<template>
  <div class="indexpage">
    <login v-if="loginShow"></login>
    <div v-wechat-title="myTitle"></div>
    <!-- 上部信息 -->
    <div class="topone">
      <div class="topleft">
        <tabbox></tabbox>
      </div>
      <div class="topmid">
        <topmid :swiperSlides="swiperSlides"></topmid>

      </div>
      <div class="topright">
        <topright></topright>
      </div>
    </div>
    <!-- 上部信息 -->
    <div class="hidestyle1">
      <!-- 公司信息8块显示 -->
      <div class="companyinfo">
        <companyinfo></companyinfo>
      </div>
      <!-- 公司信息8块显示 -->
      <!-- 可溯源企业不可溯源企业红黑榜工作交流政策法规 -->
      <!-- <div class="companymsg">
        <company-msg-list></company-msg-list>
      </div> -->
      <!-- 可溯源企业不可溯源企业红黑榜工作交流政策法规 -->
      <!-- 溯源产品地图 -->
      <div class="rightgoodspr">
        <trace-map></trace-map>
        <rightgoods></rightgoods>
      </div>
      <!-- 溯源产品地图 -->
      <!-- 溯源产品 -->
      <div class="sycp">
        <trace></trace>
      </div>
      <!-- 溯源产品 -->
      <!-- 电商产品 -->
      <div class="egoods">
        <egoods></egoods>
      </div>
      <!-- 电商产品 -->

      <!-- 友情链接 -->
      <div class="friendlylink">
        <friendlylink :dataAryLink="dataAryLink"></friendlylink>
      </div>
      <!-- 友情链接 -->
    </div>
  </div>
</template>

<script>
import tabbox from '@/base/tabbox';
import login from '@/base/login';
import topright from './topright';
import companyinfo from './companyinfo';
// import companyMsgList from './companymsglist';
import traceMap from './trace-map.vue';
import rightgoods from './rightgoods';
import trace from './trace';
import egoods from './egoods';
import topmid from './topmid';
import friendlylink from './friendlylink';
import apiList from '@/api/api';
import companyInfoFn from '@/api/companyinfo';
import swiperInfoFn from '@/api/swiperinfo';
import linkbottom from '@/api/linkbottom';

import newslist from '@/api/newslist';
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      dataAryLink: [],
      loginFlag: false,
      myTitle: '',
      swiperSlides: [],
      listInfoAry: [],
      arytext: [
        {
          text: '新闻动态',
          path: 'newslist',
          listtype: 1
        },
        {
          text: '通告通知',
          path: 'notice',
          listtype: 2
        }
      ]
    };
  },
  components: {
    tabbox,
    topright,
    companyinfo,
    // companyMsgList,
    traceMap,
    rightgoods,
    trace,
    egoods,
    friendlylink,
    topmid,
    login
  },
  computed: {
    ...mapGetters(['company', 'loginShow'])
  },
  methods: {
    changeTabFn(msg) {
      // console.log(msg)
      let queryObj = { pageSize: 6, pageNum: 1, ArticleType: msg };
      newslist(apiList.GetList, queryObj).then(res => {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.listInfoAry = dataInfo.List;
        }
      });
    },
    ...mapMutations({
      setCompany: 'SET_COMPANY'
    })
  },
  created() {},
  mounted() {
    //轮播图片
    swiperInfoFn(apiList.Sysslide).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data.List;
        this.swiperSlides = dataInfo;
      }
    });
    //新闻动态
    let queryObj = { pageSize: 6, pageNum: 1, ArticleType: 1 };
    newslist(apiList.GetList, queryObj).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data;

        this.listInfoAry = dataInfo.List;
      }
    });
    //友情链接
    // console.log(apiList.Syslink)
    linkbottom(apiList.Syslink).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data.List;
        let arylinklct = [];

        for (let i = 0; i < dataInfo.length; i++) {
          if (dataInfo[i].LinkType == 1) {
            arylinklct.push(dataInfo[i]);
          }
        }
        this.dataAryLink = arylinklct;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
$base: 14px;
.hidestyle {
  @include none;
}
.companymsg {
  margin-top: 7px;
}
.topone {
  width: 877px;
  padding-left: 443px;
  @include mag;
  @include pr;
  height:352px;
  margin-top: 7px;
  .topleft {
    @include po;
    height:100%;
    top: 0;
    left: 0;
  }
  .topmid {
    @include wh(558px, 352px);
    @include ov;
  }
  .topright {
    @include wh(309px, 100%);
    @include po;
    right: 0;
    top: 0;
    // @include ba(#fff);
  }
}

.rightgoodspr,
.sycp,
.egoods {
  @include wh(1198px, 257px);
  border: 1px solid #128f40;
  @include pr;
  @include mag;
  margin-top: 6px;
}

.rightgoodspr {
  height: 776px;
  border-top-width: 4px;
  @include ov;
}

.sycp,
.egoods {
  height: 526px;
  @include ov;
}
#topmidwrap {
  .swiper-pagination-bullet-active {
    @include ba(red);
  }
}
</style>
