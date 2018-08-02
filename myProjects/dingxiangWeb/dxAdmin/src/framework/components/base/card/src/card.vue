<template>
  <transition name="nz-normal-card-wrap">
    <!--卡片包裹容器-->
    <div class="nz-normal-card-wrap nz-card-wrap"
         :class="[size]" v-if="editable || visible">
      <nz-card-inside :title="title"
                       :sub-title="subTitle"
                       :editable="editable"
                       :status="status"
                       :visible="visible"
                       :format-style="formatStyle"
                       :head-operates="headOperates"
                       @visibleChange="visibleChange">
        <slot></slot>
        <template slot="bottomRightOperate">
          <slot name="operate"></slot>
        </template>
      </nz-card-inside>
    </div>
  </transition>
</template>

<script>
  import CardInside from './card-inside.vue'
  export default {
    name: 'nz-card',
    componentName: 'nz-card',
    components: {
      'nz-card-inside': CardInside
    },
    props: {
      /**
       * 尺寸，默认为small
       */
      size: {
        type: String,
        default: 'small'
      },
      /**
       * 标题
       */
      title: {
        type: String
      },
      /**
       * 副标题
       */
      subTitle: {
        type: String
      },
      /**
       * 是否可编辑
       */
      editable: {
        type: Boolean
      },
      /**
       * 状态 可选值：loading、ready、empty、error
       */
      status: {
        type: String,
        default: 'ready'
      },
      /**
       * 格式化样式
       */
      formatStyle: Boolean,
      /**
       * 右上角操作项
       */
      headOperates: Object,
      /**
       * 是否显示
       */
      visible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      /**
       * 获取卡片内容区域宽度
       */
      getContentWidth(){
        return this.$el.clientWidth - 50;
      },
      visibleChange(val){
        this.$emit('visibleChange', val);
      }
    },
    created () {
      this.$on('cardResize', () => {
        this.$nextTick(() => {
          /**
           * 卡片宽度改变事件
           * @event cardResize
           * @param clientWidth {number} 卡片宽度
           * @alias module:components/base/card.cardResize
           */
          this.$emit('resize', this.getContentWidth());
        });
      });
    }
  };
</script>

<style rel='stylesheet/less' lang='less'>
  .nz-normal-card-wrap-leave-active {
    transform: scale(0, 0);
    transform-origin: top left;
    transition: transform 0.4s ease;
  }

  .nz-normal-card-wrap {
    float: left;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
  }
</style>
