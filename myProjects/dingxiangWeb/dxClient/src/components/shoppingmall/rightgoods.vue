<template>
  <div class="rightgoods">
    <div class="toptext">
      溯源产品地图
    </div>
    <div class="nextlist">
      <goodslist></goodslist>
    </div>
  </div>


</template>

<script>

  import goodslist from "./goodslist";

  export default {
    data() {
      return {};
    },
    components: {
      goodslist
    },
    methods: {},
    created() {
    },
    mounted() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
$base: 192;
  @import "static/style/_var.scss";

  .rightgoods {
    @include po;
    @include wh(327rem/$base, 773rem/$base);
    border-left: 1rem/$base solid #d6d9dd;
    bottom: 1rem/$base;
    right: 1rem/$base;
    background: rgba(255, 255, 255, 0.8);
    .toptext {
      @include fo(22rem/$base);
      @include co(#128f40);
      line-height: 1;
      padding-top: 46rem/$base;
      padding-bottom: 50rem/$base;
      padding-left: 25rem/$base;
      font-weight: bold;
    }
  }

  .nextlist {
    padding-left: 28rem/$base;
  }
</style>
