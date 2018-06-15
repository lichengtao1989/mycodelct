<template>
  <div class="companyinfo companyinfowrap" v-if="companyList.length>0">
    <div class="bbr" v-if="companyList.length>8"></div>
    <div class="bgwrap" :class="computedIndex">
<companyinfoitem  :idx="index"  :linkid="item.id" v-for="(item,index) in companyList" :typeid="index" :logoImage="item.logoImage" :key="item.id" :textval="item.name" >
</companyinfoitem>
</div>
</div>
 
 
</template>

<script>
import companyinfoitem from "./companyinfoitem";
import getSystemList from "@/api/getSystemList";
import apiList from "@/api/api";
export default {
  data() {
    return {
      companyList: []
    };
  },
  components: {
    companyinfoitem
  },
  computed: {
    computedIndex() {
      return `cindex${this.companyList.length}`;
    }
  },
  methods: {
    numClick(e) {},
    loginShow() {
      this.$emit("loginShow");
    },
    getData() {}
  },
  created() {},
  mounted() {
    getSystemList(apiList.getSystemList).then(res => {
      if (res.ResultCode == 200) {
        if (res.ResultCode == 200) {
          let dataInfo = JSON.parse(res.Data);
          let defaultItem = [
            {
              name: "农资进销存系统",
              logoImage: "cjm-icon-system5",
              id: "45056363-5d78-43fc-8a3f-bac2adf36980",
              typeflag: 1
            }
          ];

          let newS = dataInfo.concat(defaultItem);
          this.companyList = newS;
        }
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.companyinfowrap{
  @include pr;
}
.bbr {
  @include wh(1198px, 1px);
  @include ba(#d0e9d9);
  @include po;
  left: 50%;
  margin-left:-599px;
  top: 398px;
  z-index: 3;
}
.bgwrap {
  @include pr;
  @include ov;
  @include ba(#fff);
  // @include wh(1198px,398px);
  width: 1198px;
  border: 1px solid #128f40;
  @include mag;
}
</style>
