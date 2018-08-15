<template>
  <div class="cjm-search-item">
    <label :style="{'width':labelWidth+'px'}">{{label}}</label>
    <div class="cjm-search-item-content" :style="{'padding-left':labelWidth+25+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import emitter from '../../../../mixins/emitter';
  /**
   * 高级搜索项
   */
  export default{
    name: 'cjm-search-item',
    componentName: 'cjm-search-item',
    mixins: [emitter],
    props: {
      /**
       * 标题
       */
      label: {
        type: String,
        required: true
      },
      /**
       * 标题宽度 默认：80
       */
      labelWidth: {
        type: Number,
        default: 80
      },
      /**
       * 搜索的键 必填
       */
      searchKey: {
        type: String,
        required: true
      },
      /**
       * 搜索的值
       */
      value: String
    },
    computed: {
      searchValue: {
        get(){
          return this.value.trim();
        },
        set(val){
          this.$emit('input', val);
        }
      }
    },
    mounted(){
      //给容器发送事件，通知有个新的Item加入
      this.dispatch('cjm-search-container', 'cjm.searchItem.mounted', [this]);
    }
  }
</script>

<style>
  .cjm-search-item {
    width: 33.3%;
    position: relative;
    line-height: 30px;
    float: left;
    margin: 10px 0;
  }

  .cjm-search-container-2 .cjm-search-item {
    width: 50%;
  }

  .cjm-search-container-3 .cjm-search-item {
    width: 33.3%;
  }

  .cjm-search-container-4 .cjm-search-item {
    width: 25%;
  }

  .cjm-search-container-5 .cjm-search-item {
    width: 20%;
  }

  .cjm-search-item:after {
    content: '';
    display: block;
    clear: both;
  }

  .cjm-search-item > label {
    font-size: 13px;
    padding-left: 20px;
  }

  .cjm-search-item-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding-right: 20px;
  }
</style>
