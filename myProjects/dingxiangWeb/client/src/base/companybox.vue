<template>
  <div class="companybox" :style="'height:'+height+'px;'">
    <div class="topt">{{toptitle}}</div>
    <companycard :listInfoAry="listInfoAry" :type="listtype"></companycard>
    <div class="page" v-if="total>0?true:false">
      <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
  </div>

</template>

<script>
import companycard from "./companycard";
import apiList from "@/api/api";
import getCorpByName from "@/api/getCorpByName";
import nontraceabilityCorp from "@/api/nontraceabilityCorp";
import blackred from "@/api/blackred";

export default {
  props: {
    toptitle: {
      type: String,
      default: ""
    },
    listtype: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      morePath: "",
      myindex: 0,
      total: "",
      listInfoAry: [],
      pageSet: {}
    };
  },
  computed: {
    height() {
      const length = this.listInfoAry.length;
      let itemHeight = 308;
      if (this.listtype == 1 || this.listtype == 2) {
        //可追溯企业 不可追溯企业
        itemHeight = 308;
      } else {
        //红黑榜
        itemHeight = 338;
      }
      return Math.ceil(length / 4) * itemHeight + 53;
    }
  },
  components: {
    companycard
  },
  methods: {
    pageChange(pInfo) {
       console.log(pInfo)
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber
      };
   
      let apiSrc="";
      let typeVal=this.listtype;
      if(typeVal==1) {
      //可追溯企业
      apiSrc = apiList.GetCorpByName;
      getCorpByName(apiSrc, { pageNum:pInfo.pageNumber, pageSize:pInfo.pageSize }).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;
       
        }
      });
    } else if (typeVal == 2) {
      //不可追溯企业
      apiSrc = apiList.NontraceabilityCorp;
      nontraceabilityCorp(apiSrc, { pageNum: pInfo.pageNumber, pageSize: pInfo.pageSize }).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;

       
        }
      });
    } else {
      //红黑榜
      apiSrc = apiList.GetBlackList;
      blackred(apiSrc, { pageNum: pInfo.pageNumber, pageSize: pInfo.pageSize}).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;
      
        }
      });
    }
      // newslist(apiList.GetList, queryObj).then(res => {
      //   if (res.ResultCode == 200) {
      //     let dataInfo = res.Data;
      //     this.listAry = dataInfo.List;
      //   }
      // });
    }
  },
  created() {},
  mounted() {
    // console.log(this.listtype);
    let apiSrc = "";
    let typeVal = parseInt(this.listtype);
    let totalPart = "";

    if (typeVal == 1) {
      //可追溯企业
      apiSrc = apiList.GetCorpByName;
      getCorpByName(apiSrc, { pageNum: 1, pageSize: 8 }).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;
          this.pageSet = {
            align: "center",
            totalRow: res.Total, //required option
            language: "cn", //default: 'cn'
            pageSizeMenu: [8, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
          };
          this.total = res.Total;
        }
      });
    } else if (typeVal == 2) {
      //不可追溯企业
      apiSrc = apiList.NontraceabilityCorp;
      nontraceabilityCorp(apiSrc, { pageNum: 1, pageSize:8 }).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;

          this.pageSet = {
            align: "center",
            totalRow: res.Total, //required option
            language: "cn", //default: 'cn'
            pageSizeMenu: [8, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
          };
          this.total = res.Total;
        }
      });
    } else {
      //红黑榜
      apiSrc = apiList.GetBlackList;
      blackred(apiSrc, { pageNum: 1, pageSize: 8 }).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data;
          this.pageSet = {
            align: "center",
            totalRow: res.Total, //required option
            language: "cn", //default: 'cn'
            pageSizeMenu: [8, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
          };
          this.total = res.Total;
        }
      });
    }

    // this.pageSet = {
    //   align: "center",
    //   totalRow: dataInfo.Total, //required option
    //   language: "cn", //default: 'cn'
    //   pageSizeMenu: [10, 20, 30, 40, 50, 100] //default: [10, 20, 50, 100]
    // };
  }
};
</script>


<style lang="scss" scoped="" rel="stylesheet/scss">
@import "static/style/_var.scss";

.companybox {
  @include ba(#fff);
  // min-height: 675px;
  width: 1179px;
  padding-left: 19px;
  border: 1px solid #128f40;
  border-top: 4px solid #128f40;
  padding-bottom:30px;
  @include mag;
  margin-top: 7px;
  @include fo(15px);
  @include co(#2b2b2b);
  @include pr;
 
  .topt {
    padding-top: 9px;
    @include co(#128f40);
    padding-bottom: 21px;
  }
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
