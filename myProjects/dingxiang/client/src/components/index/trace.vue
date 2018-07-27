<template>
  <div class="traceout">
    <titlelink :type="5" :titletext="tval"></titlelink>
     <div class="cardlist" id="listsuyan" >
   <card :listInfoAry="listInfoAry"></card>
    


     </div>
      
</div>
 
 
</template>

<script>
import titlelink from "./titlelink";
import card from "@/base/card";
import apiList from "@/api/api";
import suyuan from "@/api/suyuan";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      tval: "溯源产品",
      listInfoAry:[]
    };
  },
  components: {
    titlelink,
    card
  },
  methods: {
    jumpUrl(){
        this.$router.push({
        path: "origins"
      });
    }
  },
  created() {},
  mounted() {
     let query = {
        pageSize: 4,
        pageNum: 1,
        ProductType: 1
      };
      suyuan(apiList.product, query).then(res => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.listInfoAry = res.Data.List;
       
         
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.traceout {
  border-top: 2px solid #128f40;
  // padding-left: 19px;
  // padding-right: 21px;
  @include co(#128f40);
  
}
.cardlist{
  @include ov;
  width: 100%;
}
#listsuyan{
  height: 428px;
   @include ov;


}
</style>
