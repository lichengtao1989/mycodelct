<template>
  <div class="imagesview" :style="{width:ww,height:hh}"  >
    <!-- @click.stop.prevent="closeFn" -->
   <div class="wrapimg">
      <div class="gbl" @click="closeFn"></div>
    <img :src="imagessrc" class="imgpart" :style="{height:hh}">
    <!-- :style="{height:hh}" -->
   </div>
 </div>

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    imagessrc: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      morePath: "",
      myindex: 0,
      ww: "",
      hh: ""
    };
  },
  computed: {},
  components: {},
  methods: {
    closeFn() {
      this.$emit("closeFn");
    }
  },
  created() {
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.ww = w + "px";
    this.hh = h + "px";
  },
  mounted() {}
};
</script>


<style lang="scss" scoped="" type="text/css">
@import "static/style/_var.scss";
.imagesview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1002;
  background: rgba(0, 0, 0, 0.8);
  @include te;
  .bgh {
    z-index: 1003;
    @include po;
    @include wh(100%, 100%);
  }
  .wrapimg {
    @include inline-block;
    @include pr;
    z-index:1003;
    .gbl {
      @include wh(36px, 36px);
      @include baimg("../../static/images/gb2.png");
      @include po;
      top: 5px;
      right: -40px;
      z-index: 1005;
      cursor: pointer;
    }
    .imgpart {
      display: block;
      max-width:1200px;
    }
  }
}
</style>
