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
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .rightgoods {
    @include po;
    @include wh(327px, 773px);
    border-left: 1px solid #d6d9dd;
    bottom: 1px;
    right: 1px;
    background: rgba(255, 255, 255, 0.8);
    .toptext {
      @include fo(22px);
      @include co(#128f40);
      line-height: 1;
      padding-top: 46px;
      padding-bottom: 50px;
      padding-left: 25px;
      font-weight: bold;
    }
  }

  .nextlist {
    padding-left: 28px;
  }
</style>
