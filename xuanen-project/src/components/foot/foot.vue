<template>
  <div class="foot">
    <div class="footinner">
      <div class="p01">
        <div class="lam" @click="jumpUrl(1)">投诉举报</div>
        <div class="lin">|</div>
         <div class="lam" @click="jumpUrl(2)">使用帮助</div>
        <div class="lin">|</div>
         <div class="lam" @click="jumpUrl(3)">联系我们</div>
       
      </div>
      <div class="smtt">主办单位：{{company.Organizer}}</div>
      <div class="smtt">Copyright 2005-2025 技术支持：<span class="sp" @click="jumpUrlIndex">甲骨文超级码科技股份</span> Inc. All Reserved. 浙ICP备05049758号</div>
      
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {

  data() {
    return {};
  },
  components: {},
  methods: {
    jumpUrlIndex(){window.open('http://www.app315.net/')},
    jumpUrl(id) {
      console.log(id);
      switch (parseInt(id)) {
        case 1:
          this.$router.push({
            path: "/complain"
          });
          break;
        case 2:
          this.$router.push({
            path: "/help"
          });
          break;
        case 3:
          this.$router.push({
            path: "/linkus"
          });
          break;
      }
    }
  },
    computed: {
    ...mapGetters(["company"])
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.foot {
  height: 180px;
  width: 100%;
  @include ba(#f2f3f6);
  margin-top: 60px;
  .footinner {
    width: 1200px;
    @include te;
    @include mag;
    padding-top: 42px;
    @include co(#676767);
    @include fo(12px);
    .p01 {
      div {
        cursor: pointer;
        @include inline-block;
      }
    }
    .smtt {
      padding-top: 18px;
    }
  }
}
.sp{cursor: pointer;}
</style>
