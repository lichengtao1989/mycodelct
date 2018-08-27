<template>
  <div class="foot">
    <div class="pp">技术支持：甲骨文超级码科技股份</div>
    <div class="pp">Copyright 2005-2020 All Reserved</div>
    
  </div>
</template>

<script>
  export default {
    props: {
      msg: String
    },
    data: function () {
      return {
      
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/style/_var.scss";
  $base: 75;
  .foot {
   padding-top:60rem/$base;
   padding-bottom:100rem/$base;
   @include co(#909090);
   @include fo(20rem/$base);
   @include te;
   .pp{padding-bottom:12rem/$base;}
  }
</style>
