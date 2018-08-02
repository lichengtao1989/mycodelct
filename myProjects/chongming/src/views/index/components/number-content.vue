<template>
  <div class="number-content">
    <p class="number" :style="'font-size:'+numberFontSize+'px'">{{number}}</p>
    <p class="describe" :style="'font-size:'+describeFontSize+'px'">{{describe}}</p>
  </div>
</template>
<script>
  import resize from '@/mixins/resize';
  export default {
    mixins: [resize()],
    props: ['number', 'describe'],
    data(){
      return {boxWidth: 0};
    },
    computed: {
      numberFontSize(){
        let fz = 24;
        fz = fz * (this.boxWidth / 200);
        fz = parseInt(fz);
        return fz;
      },
      describeFontSize(){
        let fz = this.numberFontSize / 2;
        fz = parseInt(fz);
        return fz;
      }
    },
    methods: {
      onResize(){
        if (this.$el) {
          this.boxWidth = this.$el.offsetWidth;
        }
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .number-content {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }

  .number, .describe {
    padding: 0;
    margin: 0;
    margin-left: 13.8%;
  }

  .number {
    color: #333333;
    font-weight: bolder;
    margin-bottom: 10px;
  }

  .describe {
    color: #808080;
  }
</style>
