<template>
  <div class="nz-cards" :class="[className, theme]">
    <slot></slot>
  </div>
</template>

<script>
  import emitter from '../../../../mixins/emitter';
  /**
   * 卡片容器组件，用于包含卡片组件
   * @module components/base/cards
   * @example
   * <nz-cards>
   *     <nz-card></nz-card>
   * </nz-cards>
   */
  export default{
    name: 'nz-cards',
    mixins: [emitter],
    data(){
      return {
        interval: null,
        className: '',
        contentWidth: 0
      }
    },
    props: {
      /**
       * 风格，默认为theme1
       */
      theme: {
        type: String,
        default: 'theme1'
      }
    },
    methods: {
      resize(){
        if (this.contentWidth === this.$el.clientWidth) {
          return;
        }
        this.contentWidth = this.$el.clientWidth;
        let result = '';
        if (this.contentWidth < 1020) {
          result = 'nz-cards-2';
        } else if (this.contentWidth < 1360) {
          result = 'nz-cards-3';
        } else if (this.contentWidth < 1700) {
          result = 'nz-cards-4';
        } else {
          result = 'nz-cards-5';
        }
        this.className = result;

        this.broadcast('nz-card', 'cardResize');
        this.$emit('resize');
      }
    },
    mounted(){
      this.resize();
      this.interval = setInterval(()=> {
        this.resize();
      }, 100);
    },
    destroyed(){
      clearInterval(this.interval);
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .nz-cards {
    /*overflow: hidden;*/
  }

  .nz-cards:after {
    content: '';
    display: block;
    clear: both;
  }

  .nz-cards-min .nz-card-wrap {
    width: 350px;
  }

  .nz-cards-min .nz-card-wrap.middle {
    width: 100%;
  }

  .nz-cards-2 .nz-card-wrap {
    width: 50%;
  }

  .nz-cards-2 .nz-card-wrap.middle {
    width: 100%;
  }

  .nz-cards-3 .nz-card-wrap {
    width: 33.3%;
  }

  .nz-cards-3 .nz-card-wrap.middle {
    width: 66.7%;
  }

  .nz-cards-4 .nz-card-wrap {
    width: 25%;
  }

  .nz-cards-4 .nz-card-wrap.middle {
    width: 50%;
  }

  .nz-cards-5 .nz-card-wrap {
    width: 20%;
  }

  .nz-cards-5 .nz-card-wrap.middle {
    width: 40%;
  }

  .nz-card-wrap.large {
    width: 100%;
  }
</style>
