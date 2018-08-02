<template>
  <div class="traceout">
    <titlelink :type="6" :titletext="tval"></titlelink>
     <div class="cardlist" id="listegoods"  >
   <card :listInfoAry="listInfoAry"></card>
    


     </div>
      
</div>
 
 
</template>

<script>
import titlelink from "./titlelink";
import card from "@/base/card";
import apiList from "@/api/api";
import egoods from "@/api/egoods";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      tval: "电商产品",
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
        path: "egoods"
      });
    }
  },
  created() {},
  mounted() {
     let query = {
        pageSize: 4,
        pageNum: 1,
        ProductType: 2
      };
      egoods(apiList.product, query).then(res => {
       
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
#listegoods{
  height: 428px;
   @include ov;


}
</style>
