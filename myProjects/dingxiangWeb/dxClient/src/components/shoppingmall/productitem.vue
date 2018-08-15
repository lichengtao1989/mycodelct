<template>
  <div class="productitem">
    <div class="pitem" @click="jumpUrl(item.ProductID)" v-for="item of listInfoAry" :key="item.ProductID" :class="{canhover:item.TraceUrl}">
      <div class="shangm">
        <div class="imgp"><img :src="item.ProductImg[0].ImagePath" class="imgs"></div>
        <div class="wenben">{{item.ProductName}}</div>
      </div>
      <div class="xiam" v-if="item.TraceUrl">
        <qrcodep :traceurl="item.TraceUrl"></qrcodep>
      </div>
    </div>
  </div>
</template>
<script>
import qrcodep from './qrcode';
export default {
  props: {
    productData: Object,
    showLine: Boolean,
    listInfoAry: Array
  },
  components: { qrcodep },
  data() {
    return {};
  },
  computed: {
    computedClass() {}
  },
  methods: {
    jumpUrl(id) {
      this.$router.push({
        path: `/productdetail/${id}/?listtype=12`
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
$base: 192;
@import 'static/style/_var.scss';
.pitem {
  cursor: pointer;
  @include te;
  margin-left: 1.5%;
  width: 23%;
  height: 300rem / $base;
  @include ov;
  @include inline;
  @include pr;
  margin-bottom: 30rem / $base;
  .wenben {
    font-size: 16rem / $base;
    @include li(40rem / $base);
    width: 100%;
    @include ovt;
  }
  .xiam {
    @include po;
    left: 0;
    bottom: 0;
    z-index: 2;
    @include wh(100%, 100%);
    @include none;
  }
  .shangm {
    height: 300rem / $base;
    @include ov;
  }
  .imgs {
    @include block;
    @include wh(100%, 260rem / $base);
  }
}
.canhover:hover {
  .shangm {
    @include none;
  }
  .xiam {
    @include block;
  }
}
</style>
