<template>
  <div class="titlepart">
       <div class="tname">{{titletext}}</div>
        <div class="gd" @click="jumpFn">
          更多<span class="sp1">>></span>
        </div>
      </div>
 
</template>

<script>
import card from "@/base/card";

export default {
  props:{
    titletext:{
      type:String,
      default:""
    },
type:{
  type:Number,
  default:""
}
  },
  data() {
    return {
      
    };
  },
  components: {
  card
  },
  methods: {
    jumpFn(){
    let pathVal="";
      if(parseInt(this.type)==5){
//溯源
pathVal="origins";
      }else if(parseInt(this.type)==6){
//电商
pathVal="egoods";
      };
       this.$router.push({
        path: pathVal
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.titlepart{
  font-weight: bold;
  @include fo(16px);
  .tname{
    padding-top: 10px;
    padding-bottom:24px;
     padding-left: 19px;
  }
  .gd{
    cursor: pointer;
    @include fo(13px);
    @include po;
    right:21px;
    top:11px;
    z-index: 2;
    .sp1{vertical-align: 1px;margin-left:2px;}
  }
}
</style>
