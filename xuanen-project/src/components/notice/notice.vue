<template>
  <div class="containernotice">
<listview :listtype="2" :toptitle="toptitle" :listInfoAry="listAry"></listview>
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
     listAry:[],
     total:"",
      toptitle: "通告通知",
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
        ArticleType: 2
      };
      newslist(apiList.GetList, queryObj).then(res => {
        if (res.ResultCode == 200) {
          let dataInfo = res.Data;
          this.listAry = dataInfo.List;
        }
      });
    }
    },
  created() {
   
  },
  mounted() {
  let queryObj = { pageSize: 10, pageNum: 1, ArticleType: 2 };
    newslist(apiList.GetList, queryObj).then(res => {
      if (res.ResultCode == 200) {
        let dataInfo = res.Data;
        this.total = dataInfo.Total;
        this.listAry = dataInfo.List;

        this.pageSet = {
          align: "center",
          totalRow: dataInfo.Total, //required option
          language: "cn", //default: 'cn'
          pageSizeMenu: [10, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
        };
      }
    });
  }
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.containernotice{
  @include pr;
  border:1px solid #128f40;
  border-top:4px solid #128f40;
  width:1198px;
  @include mag;
  margin-top: 7px;
  .page {
  @include te;
  // @include po;
  width: 100%;
  left: 0;
  bottom: 10px;
  margin-bottom:15px;
  }
}
</style>
