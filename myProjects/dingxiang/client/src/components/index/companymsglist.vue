<template>
  <div class="companymsglist" v-if="arytext.length>0" :data-length="arytext.length">
    <div class="borderpo"></div>
    <tabboxlong v-if="arytext.length>0" :listInfoAry="listInfoAry" :textAry="arytext" :typeid="nowid" @changeTabFn="changeTabFn"></tabboxlong>
  </div>
</template>

<script>
  import tabboxlong from "@/base/tabboxlong";
  import apiList from "@/api/api";
  import baseFn from "@/api/baseFn";
  import navbar from "@/api/navbar";
  export default {
    data() {
      return {
        nowid: "",
        arytext: [],
        listInfoAry: []
      };
    },
    components: {
      tabboxlong
    },
    methods: {
      listFn(id) {
        this.nowid = id;
        let queryObjInit = {};
        let initApiUrl = "";
        switch (id) {
          case 1:
            //默认可追溯
            initApiUrl = apiList.GetCorpByName;
            queryObjInit = {pageNum: 1, pageSize: 12};
            break;
          case 2:
            //默认不可追溯
            initApiUrl = apiList.NontraceabilityCorp;
            queryObjInit = {pageNum: 1, pageSize: 12};
            break;
          case 3:
            //默认红黑榜
            initApiUrl = apiList.GetBlackList;
            queryObjInit = {pageNum: 1, pageSize: 12};
            break;
          case 4:
            //默认工作交流
            initApiUrl = apiList.GetList;
            queryObjInit = {pageNum: 1, pageSize: 12, ArticleType: 3};
            break;
          case 5:
            //默认政策法规
            initApiUrl = apiList.GetList;
            queryObjInit = {pageNum: 1, pageSize: 12, ArticleType: 4};
            break;
        }

        let myid = id;
        this.listInfoAry = [];
        baseFn(initApiUrl, queryObjInit).then(res => {
          // console.log(res)
          if (res.ResultCode == 200) {
            let dataInfo = res.Data;
            if (id == 4) {
              dataInfo = res.Data.List;
            } else if (id == 5) {
              dataInfo = res.Data.List;
            }

            this.listInfoAry = dataInfo;
            if (dataInfo.length > 0) {
              // console.log("bukong");
            } else {
              // console.log(id);

            }
          }
        });
      },
      changeTabFn(msg) {
        this.listFn(msg);
      },
      getInfo() {
        var that = this;
        navbar(apiList.GetNavigationBar).then(res => {
          if (res.ResultCode == 200) {
            let initAry = [];
            let dataInfo = res.Data[0];
            if (dataInfo.Traceability == 1) {
              initAry.push({
                path: "traceability",
                id: 1,
                text: "可追溯企业"
              });
            }
            if (dataInfo.Nontraceability == 1) {
              initAry.push({
                path: "untraceability",
                id: 2,
                text: "不可追溯企业"
              });
            }
            if (dataInfo.RedAndblacklist == 1) {
              initAry.push({
                path: "redandblack",
                id: 3,
                text: "红黑榜"
              });
            }

            if (dataInfo.Work == 1) {
              initAry.push({
                path: "exchange",
                text: "工作交流",
                id: 4
              });
            }
            if (dataInfo.Policy == 1) {
              initAry.push({
                path: "/regulations",
                id: 5,
                text: "政策法规"
              });
            }

            that.arytext = initAry;

            let zeroid = that.arytext[0].id;

            that.listFn(zeroid);
          }
        });
      }
    },
    created() {
    },
    mounted() {
      this.getInfo();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";
.companymsglist{
   border: 1px solid #128f40;
   width:1198px;
   @include mag;
   @include pr;
  //  margin-top:7px;
}
  .borderpo {
    @include wh(1px, 188px);
    @include ba(#d0e9d9);
    @include po;
    bottom: 13px;
    left: 597px;
    z-index: 2;
  }
</style>
