<template>
  <div class="detailinfo">
    <div class="xqwrap">
      <div class="tmv">{{myTitleVal}}</div>
      <div class="mytitle">{{mytitle}}</div>
      <div class="fbxx">
        <div class="fbsm">
          <span class="spp1">[发布时间:{{CreateTime}}|阅读次数:{{ReadCount}}]</span>
          <span class="spp2" v-if="ArticleSubType>0">[分类:{{typeFn}}]</span>
        </div>
      </div>
      <div class="content contentlcttext" v-html="mycontent"></div>
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
  computed: {
    typeFn() {
      let str = dataAry[this.ArticleType].values[this.ArticleSubType].name ? dataAry[this.ArticleType].values[this.ArticleSubType-1].name : '';
      return str;
    },
    myTitleVal() {
      let listtype = parseInt(this.$route.query.listtype);
      switch (listtype) {
        case 1:
          return '新闻动态';
          break;
        case 2:
          return '通告通知';
          break;
        case 3:
          return '工作交流';
          break;
        case 4:
          return '政策法规';
        case 5:
          return '质量监管';
        case 6:
          return '热点聚焦';
        case 7:
          return '执法公开';
        case 8:
          return '产品认证';
        case 9:
          return '农情预警';
        case 10:
          return '魅力定襄';
        case 11:
          return '标准规范';
          break;
        default:
          break;
      }
    }
  },
  methods: {
    async listInfo(url, query) {
      let { err, res } = await this.$ajax.get(url, query);
      if (err) {
      } else {
        if (res.ResultCode == 200) {
             let dataInfo = res.Data.List[0];
          if (query.ArticleID) {
         
            this.mycontent = dataInfo.ArticleContent;
            this.mytitle = dataInfo.ArticleTitle;
            this.ArticleType = dataInfo.ArticleType;
            this.CreateTime = dataInfo.CreateTime;
            this.ReadCount = dataInfo.ReadCount;
            this.ArticleSubType = dataInfo.ArticleSubType;
          }else{
            this.mycontent = dataInfo.Content;
            this.mytitle = dataInfo.Title;
            this.ArticleType = dataInfo.Type;
            this.CreateTime = dataInfo.CreateTime;
            this.ReadCount = dataInfo.ReadCount;
            this.ArticleSubType = dataInfo.ArticleSubType;
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    // console.log(this.$route);
    let idVal = this.$route.params.id;
    let listtype = this.$route.query.listtype;
    let apiUrl = '';
    let queryObj = {};
    if (listtype < 5) {
      apiUrl = this.$apiUrl.COMMON.SINGLE;
      queryObj = { ArticleID: idVal, ArticleType: listtype };
    } else {
      apiUrl = this.$apiUrl.NEWS.GETSINGLE;
      queryObj = { NewID: idVal, ArticleType: listtype };
    }

    this.listInfo(apiUrl, queryObj);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
@import 'static/style/_var.scss';
.fbsm {
  @include te;
  @include co(#999);
}
.xqwrap {
  @include mag;
  min-height: 600px;
  width: 1198px;
  border: 1px solid #128f40;
  border-top-width: 4px;
  @include fo(16px);
  line-height: 31px;
  @include co(#333);
  @include ba(#fff);
  margin-top: 7px;
  .tmv {
    @include co(#128f40);
    padding: 9px 0 34px 19px;
  }
  .content {
    @include mag;
    width: 878px;
    line-height: 31px;
    text-indent: 32px;
    // div,p{

    // }
  }
  .mytitle {
    @include te;
    padding-bottom: 45px;
    @include fo(20px);
  }
}
</style>
<style lang="scss"  rel="stylesheet/scss">
.contentlcttext {
  img {
    display: block;
    max-width: 100%;
  }
}
</style>