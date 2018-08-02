<template>
  <div class="detailinfo">
    <div class="xqwrap">
      <div class="tmv">{{myTitleVal}}</div>
      <div class="mytitle">{{mytitle}}</div>
      <div class="fbxx">
        <div class="fbsm">
          <span class="spp1">[发布时间:{{CreateTime}}|阅读次数:{{ReadCount}}]</span><span class="spp2" v-if="ArticleSubType>0">[分类:{{typeFn}}]</span>
        </div>
      </div>
      <div class="content" v-html="mycontent"></div>
    </div>

  </div>
</template>

<script>
  import apiList from "@/api/api";
  import newsdetail from "@/api/newsdetail";
  import dataAry from "./data.js";

  export default {
    data() {
      return {
        mytitle: "",
        CreateTime:"",
        ReadCount:"",
        mycontent: "",
        ArticleType:"",
        ArticleSubType:""
      };
    },
    components: {
      // top
    },
    computed: {
      typeFn(){
    
        let str=(dataAry[this.ArticleType].values)[this.ArticleSubType].name?(dataAry[this.ArticleType].values)[this.ArticleSubType].name:"";
      
        return str;
 
      },
      myTitleVal() {
        let listtype = parseInt(this.$route.query.listtype);
        switch (listtype) {
          case 1:
            return "新闻动态"
            break;
          case 2:
            return "通告通知"
            break;
          case 3:
            return "工作交流"
            break;
          case 4:
            return "政策法规"
            break;
          default:
            break;
        }
      }
    },
    methods: {
      detailFn(id) {
      }
      // typeFn(ArticleType,ArticleSubType){}
    },
    created() {
    },
    mounted() {
      // console.log(this.$route);
      let idVal = this.$route.params.id;
      let listtype = this.$route.query.listtype;
      let queryObj = {ArticleID: idVal, ArticleType: listtype};
      newsdetail(apiList.GetSingle, queryObj).then(res => {
        if (res.ResultCode == 200) {
          // console.log(res);
          let dataInfo = res.Data.List[0];
          this.mycontent = dataInfo.ArticleContent;
          this.mytitle = dataInfo.ArticleTitle;
          this.ArticleType=dataInfo.ArticleType;
          this.CreateTime=dataInfo.CreateTime;
          this.ReadCount=dataInfo.ReadCount;
          this.ArticleSubType=dataInfo.ArticleSubType;

        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";
.fbsm{@include te;@include co(#999);}
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
