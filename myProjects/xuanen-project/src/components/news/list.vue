<template>
  <div class="listwrap">
<listview :listtype="1" :toptitle="toptitle" :listInfoAry="listAry"></listview>
 <div class="page" v-if="total>0?true:false">
      <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
  </div>
</template>

<script>
import listview from "@/base/listview";
import apiList from "@/api/api";
import newslist from "@/api/newslist";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      toptitle: "新闻动态",
      total: "",
      listAry: [],
      pageSet: {}
    };
  },
  components: {
    listview
  },
  methods: {
    pageChange(pInfo) {
      // console.log(pInfo)
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber,
        ArticleType: 1
      };
      newslist(apiList.GetList, queryObj).then(res => {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.listAry = dataInfo.List;
        }
      });
    }
  },
  created() {},
  mounted() {
    let queryObj = { pageSize: 10, pageNum: 1, ArticleType: 1 };
    newslist(apiList.GetList, queryObj).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data;
        this.total = dataInfo.Total;
        this.listAry = dataInfo.List;

        this.pageSet = {
          align: "center",
          totalRow: dataInfo.Total, //required option
          language: "cn", //default: 'cn'
          pageSizeMenu: [10,20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
        };
      }
    });
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.listwrap {
  
   @include pr;
  border:1px solid #128f40;
  border-top:4px solid #128f40;
  width:1198px;
  @include mag;
  margin-top: 7px;
  padding-bottom:0px;
}
.page {
  @include te;
  // @include po;
  margin-bottom:15px;
  width: 100%;
  left: 0;
  bottom: 80px;
  
}
</style>
