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
<style lang="scss" scoped="" type="text/css">
$base: 192;
  @import "static/style/_var.scss";

  .goodsitem {
    width: 200rem/$base;
    padding-left: 98rem/$base;
    @include pr;
    @include co(#222);
    @include fo(12rem/$base);
  }

  .mc {
    @include fo(15rem/$base);
    padding-top: 5rem/$base;
    font-weight: bolder;
  }

  .goodsimg {
    @include block;
    @include po;
    @include wh(52rem/$base, 52rem/$base);
    top: 0;
    left: 23rem/$base;
  }

  .msgs {
    line-height: 25rem/$base;
  }

  .leftsl {
    @include wh(23rem/$base, 1px);
    @include ba(#b4b4b4);
    @include po;
    left: 0;
    top: 25rem/$base;
  }
</style>
