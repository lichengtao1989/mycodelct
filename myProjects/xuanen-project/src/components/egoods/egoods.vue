<template>
  <div class="originsout">
    <div class="lxwm">电商产品</div>
    <div class="traceoutpart">
      <div class="cardlist">
        <card :listInfoAry="listInfoAry"></card>
      </div>
      <div class="page" v-if="total>0?true:false">
      <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
    </div>
  </div>
</template>

<script>
import card from "@/base/card";
import apiList from "@/api/api";
import egoods from "@/api/egoods";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      listInfoAry: [],
      total: "",

      pageSet: {}
    };
  },
  components: {
    card
  },
  methods: {
    pageChange(pInfo) {
      let queryObj = {
        pageSize: pInfo.pageSize,
        pageNum: pInfo.pageNumber,
        ProductType: 2
      };
      egoods(apiList.product, queryObj).then(res => {
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data.List;
        }
      });
    }
  },
  created() {},
  mounted() {
    let query = {
      pageSize: 8,
      pageNum: 1,
      ProductType: 2
    };
    egoods(apiList.product, query).then(res => {
      if (res.ResultCode == 200) {
        this.listInfoAry = res.Data.List;
        this.total = res.Data.Total;
        this.pageSet = {
          align: "center",
          totalRow: res.Data.Total, //required option
          language: "cn", //default: 'cn'
          pageSizeMenu: [8, 24, 36, 48, 60, 100] //default: [10, 20, 50, 100]
        };
      }
    });
  }
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.cardlist {
  padding-left: 19px;

  @include ov;
  .card {
    margin-bottom: 51px;
  }
}

.originsout {
  width: 1198px;
  // min-height: 797px;
  border: 1px solid #128f40;
  border-top: 4px solid #128f40;
  @include mag;
  @include ba(#fff);
  margin-top: 7px;
  .lxwm {
    @include fo(16px);
    @include co(#128f40);
    padding: 9px 0 29px 19px;
  }
}
.traceoutpart {
  @include pr;
  padding-bottom: 20px;
}
.page {
  @include te;
  @include po;
  width: 100%;
  left: 0;
  bottom: 10px;
}
</style>
