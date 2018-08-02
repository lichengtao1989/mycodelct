<template>
  <div class="goodslist">
    <div class="leftline" :class="isShow?'is-show':''" :style="'height:'+leftLineHeight+'px'" v-if="showProductList.length>1"></div>
    <div class="goodsitem-wrap" :class="isShow?'is-show':''" v-for="(product,index) in showProductList" :key="index">
      <goodsitem :show-line="showProductList.length>1" :product-data="product"></goodsitem>
    </div>
  </div>
</template>

<script>
  //这里有vuex去获取管理数据
  import goodsitem from "./goodsitem";
  import getIndexMapProductList from '@/api/getIndexMapProductList';
  export default {
    data() {
      return {
        productList: [],
        isShow: true,
        leftLineHeight: 300,
        loopTimeout: 5000, //间隔多少时间轮播一次
        loopCount: 7, // 每次轮播显示个数
        loopIndex: 0, //当前轮播页数
        loopIng: false //setTomeout
      };
    },
    components: {
      goodsitem
    },
    computed: {
      showProductList(){
        const minIndex = this.loopIndex * this.loopCount;
        const maxIndex = minIndex + this.loopCount - 1;
        const showList = this.productList.filter((item, index) => (index >= minIndex && index <= maxIndex));
        return showList;
      }
    },
    methods: {
      async loadTraceGoods(){
        const res = await getIndexMapProductList();
        let productList = (res && res.Data && res.Data.List) || [];
        productList = productList.filter(item => item.ProductType != 2); //排除电商产品
        this.productList = productList;
        this.loopView();
      },
      sleep(times){
        return new Promise(resolve => {
          setTimeout(resolve, times);
        })
      },
      async loopView(){
        this.isShow = true;
        await this.$nextTick();
        this.resetLeftLineHeight();
        await this.sleep(this.loopTimeout);
        this.isShow = false;
        await this.sleep(800);
        this.loopIndex = this.loopIndex + 1;
        if (this.showProductList.length == 0) {
          this.loopIndex = 0;
        }
        this.loopView();
      },
      async resetLeftLineHeight(){
        await this.$nextTick();
        const allProductDom = this.$el.querySelectorAll('.goodsitem-wrap');
        if (allProductDom.length > 1) {
          const firstProductDom = allProductDom[0];
          const lastProductDom = allProductDom[allProductDom.length - 1];
          this.leftLineHeight = lastProductDom.offsetTop - firstProductDom.offsetTop;
        }
      }
    },
    created() {
      this.loopIng = true;
      this.loadTraceGoods();
    },
    beforeDestroy(){
      this.loopIng = false;
    },
    mounted() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" rel="stylesheet/scss">
  @import "static/style/_var.scss";

  .goodsmapwrap {
    border-top: 2px solid #128f40;
  }

  .goodslist {
    position: relative;
  }

  .leftline {
    position: absolute;
    height: 300px;
    width: 1px;
    left: 0;
    top: 26px;
    @include ba(#b4b4b4);
    opacity: 0;
    transition: opacity 500ms;
    &.is-show {
      opacity: 1;
    }
  }

  .goodsitem-wrap {
    margin-bottom: 30px;
    animation: flipOutX 800ms;
    &.is-show {
      animation: flipInX 800ms;
    }
  }

  @keyframes flipInX {
    0% {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transition-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transition-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    100% {
      transform: perspective(400px);
    }
  }

  @keyframes flipOutX {
    0% {
      transform: perspective(400px);
    }
    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }
    100% {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }
</style>
