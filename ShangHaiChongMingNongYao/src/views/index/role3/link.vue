<template>
  <div class="link-wrap">
    <router-link :to="target" class="link">
      <img :src="icon"/>
      <p :style="'font-size: '+textFontSize+'px'">{{text}}</p>
    </router-link>
  </div>
</template>
<script>
  import resize from '@/mixins/resize';
  export default {
    props: ['icon', 'target', 'text'],
    mixins: [resize()],
    data(){
      return {
        textFontSize: 15
      };
    },
    methods: {
      onResize(){
        let fz = 15;
        if (this.$el) {
          const boxWidth = this.$el.offsetWidth;
          fz = parseInt(boxWidth / 6);
        }
        this.textFontSize = fz;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .link-wrap {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 14.58%;
    padding-bottom: 17.8%;
    /*background-color: rgba(0, 0, 0, 0.1);*/
    margin-right: 27.683%;
    margin-bottom: 8.34%;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    .link {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
    }
    p {
      position: absolute;
      left: 50%;
      bottom: 0;
      text-align: center;
      padding: 0;
      margin: 0;
      font-size: 20px;
      color: #666666;
      white-space: nowrap;
      transform: translateX(-50%);
    }
  }
</style>
