<template>
  <div class="goodsitem">
    <div class="leftsl" v-if="showLine"></div>
    <div class="leftimg">
      <video v-if="isVideo(imgSrc)" :src="imgSrc" preload class="goodsimg"></video>
      <img v-if="!isVideo(imgSrc)" :src="imgSrc" class="goodsimg">
    </div>
    <div class="rightinfo">
      <div class="mc">{{ productData.ProductName }}</div>
      <div class="msgs"><span>{{ productData.Producer }}</span><span v-if="!productData.Producer">&nbsp;</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      productData: Object,
      showLine: Boolean
    },
    components: {},
    data() {
      return {};
    },
    computed: {
      imgSrc(){
        const {productData} = this;
        if (productData.ProductImg && productData.ProductImg[0]) {
          return productData.ProductImg[0].ImagePath
        }
        return '';
      }
    },
    methods: {
      isVideo(src){
        return /.mp4$/i.test(src);
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .goodsitem {
    width: 200px;
    padding-left: 98px;
    @include pr;
    @include co(#222);
    @include fo(12px);
  }

  .mc {
    @include fo(15px);
    padding-top: 5px;
    font-weight: bolder;
  }

  .goodsimg {
    @include block;
    @include po;
    @include wh(52px, 52px);
    top: 0;
    left: 23px;
  }

  .msgs {
    line-height: 25px;
  }

  .leftsl {
    @include wh(23px, 1px);
    @include ba(#b4b4b4);
    @include po;
    left: 0;
    top: 25px;
  }
</style>
