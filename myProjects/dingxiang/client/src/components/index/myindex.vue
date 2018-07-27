<template>
  <div class="indexpage">
    <login v-if="loginShow"></login>
    <div v-wechat-title="myTitle"></div>
    <!-- 上部信息 -->
    <div class="topone">
      <div class="topleft">
        <tabbox :listAry="listInfoAry" :oneObj="detailOne" :listNotice='listNotice' v-if="listInfoAry.length>0"></tabbox>
      </div>
      <div class="topmid">
        <topmid :swiperSlides="swiperSlides"></topmid>
      </div>
      <div class="topright">
        <topright></topright>
      </div>
    </div>
    <!-- 上部信息 -->
    <div class="bannerout">
      <img :src="biglongimg" class="cbanner" v-if="biglongimg">
    </div>
    <div class="moduleAry">
      <module-item v-for="item of itemAry" :key="item.type" :itemobj="item"></module-item>
    </div>
    <!-- 友情链接 -->
    <div class="friendlylink">
      <friendlylink :dataAryLink="dataAryLink"></friendlylink>
    </div>
    <!-- 友情链接 -->

  </div>
</template>

<script>
import tabbox from '@/base/tabbox';
import login from '@/base/login';
import topright from './topright';
import companyinfo from './companyinfo';
import topmid from './topmid';
import moduleItem from './moduleitem';
import friendlylink from './friendlylink';
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      biglongimg: '',
      dataAryLink: [],
      loginFlag: false,
      myTitle: '',
      swiperSlides: [],
      detailOne: {},
      listInfoAry: [],
      listNotice: [],
      itemAry: [
        { text: '魅力定襄', type: 1, ename: 'Charismatic Dingxiang' },
        { text: '特色商城', type: 2, ename: 'Characteristic Mall' },
        { text: '产品认证', type: 3, ename: 'Product Dertification' },
        { text: '执法公开', type: 4, ename: 'Law Enforcement' },
        { text: '质量监管', type: 5, ename: 'Quality Supervision' },
        { text: '热点聚焦', type: 6, ename: 'Hot news focus' },
        { text: '农情预警', type: 7, ename: 'Early warning of agricultural situation' },
        { text: '标准规范', type: 8, ename: 'standard specification' },
        { text: '政策法规', type: 9, ename: 'policies and regulations' }
      ]
    };
  },
  components: {
    moduleItem,
    tabbox,
    topright,
    companyinfo,
    friendlylink,
    topmid,
    login
  },
  computed: {
    ...mapGetters(['company', 'loginShow'])
  },
  methods: {
    dataDefaultObj(ArticleType = 1, pageSize = 6, pageNum = 1) {
      return { ArticleType, pageNum, pageSize };
    },
    async swiperInfo() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.SWIPERINDEX);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data.List;
          this.swiperSlides = dataInfo;
        }
      }
    },
    async newsInformation() {
      let ArticleType = 1;
      let pageSize = 7;
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.LIST, this.dataDefaultObj(ArticleType, pageSize));
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.listInfoAry = dataInfo.List;
          this.detailOne = dataInfo.List[0];
        }
      }
    },
    async listNoticeFn() {
      let ArticleType = 2;
      let pageSize = 10;
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.LIST, this.dataDefaultObj(ArticleType, pageSize));
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.listNotice = dataInfo.List;
        }
      }
    },
    async GetImgList() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.SYSIMAGE.GETLIST);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          if (dataInfo.Total == 0) {
          } else {
            this.biglongimg = dataInfo.List[0].ImagePath;
          }
        }
      }
    },
    async Syslink() {
      let { err, res } = await this.$ajax.get(this.$apiUrl.SYSLINK.LIST);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.dataAryLink = dataInfo.List;
        }
      }
    },
    ...mapMutations({
      setCompany: 'SET_COMPANY'
    })
  },
  created() {},
  mounted() {
    //轮播图片

    this.swiperInfo();

    //新闻动态
    this.newsInformation();
    //通告通知
    this.listNoticeFn();
    //广告图片
    this.GetImgList();
    //友情链接
    this.Syslink();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import 'static/style/_var.scss';
$base: 14px;
.moduleAry {
  margin-top: 10px;
}
.cbanner {
  @include wh(100%, 115px);
  margin-top: 14px;
  margin-bottom: 14px;
}
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
  height: 352px;
  margin-top: 7px;
  .topleft {
    @include po;
    height: 100%;
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
