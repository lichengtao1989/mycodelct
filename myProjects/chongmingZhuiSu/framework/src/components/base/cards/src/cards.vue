<template>
  <div class="cjm-cards" :class="[className, theme]">
    <slot></slot>
  </div>
</template>

<script>
  import emitter from '../../../../mixins/emitter';
  /**
   * 卡片容器组件，用于包含卡片组件
   * @module components/base/cards
   * @example
   * <cjm-cards>
   *     <cjm-card></cjm-card>
   * </cjm-cards>
   */
  export default{
    name: 'cjm-cards',
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
          result = 'cjm-cards-2';
        } else if (this.contentWidth < 1360) {
          result = 'cjm-cards-3';
        } else if (this.contentWidth < 1700) {
          result = 'cjm-cards-4';
        } else {
          result = 'cjm-cards-5';
        }
        this.className = result;

        this.broadcast('cjm-card', 'cardResize');
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
  .cjm-cards {
    /*overflow: hidden;*/
  }

  .cjm-cards:after {
    content: '';
    display: block;
    clear: both;
  }

  .cjm-cards-min .cjm-card-wrap {
    width: 350px;
  }

  .cjm-cards-min .cjm-card-wrap.middle {
    width: 100%;
  }

  .cjm-cards-2 .cjm-card-wrap {
    width: 50%;
  }

  .cjm-cards-2 .cjm-card-wrap.middle {
    width: 100%;
  }

  .cjm-cards-3 .cjm-card-wrap {
    width: 33.3%;
  }

  .cjm-cards-3 .cjm-card-wrap.middle {
    width: 66.7%;
  }

  .cjm-cards-4 .cjm-card-wrap {
    width: 25%;
  }

  .cjm-cards-4 .cjm-card-wrap.middle {
    width: 50%;
  }

  .cjm-cards-5 .cjm-card-wrap {
    width: 20%;
  }

  .cjm-cards-5 .cjm-card-wrap.middle {
    width: 40%;
  }

  .cjm-card-wrap.large {
    width: 100%;
  }
</style>
