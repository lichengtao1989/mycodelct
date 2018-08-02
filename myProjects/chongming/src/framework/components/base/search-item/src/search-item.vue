<template>
  <div class="nz-search-item">
    <label :style="{'width':labelWidth+'px'}">{{label}}</label>
    <div class="nz-search-item-content" :style="{'padding-left':labelWidth+25+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import emitter from '../../../../mixins/emitter';
/**
 * 高级搜索项
 */
export default {
  name: 'nz-search-item',
  componentName: 'nz-search-item',
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
      get() {
        return this.value.trim();
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  mounted() {
    //给容器发送事件，通知有个新的Item加入
    this.dispatch('nz-search-container', 'nz.searchItem.mounted', [this]);
  }
};
</script>

<style>
.nz-search-item {
  width: 33.3%;
  position: relative;
  line-height: 30px;
  float: left;
  margin: 10px 0;
}

.nz-search-container-2 .nz-search-item {
  width: 50%;
}

.nz-search-container-3 .nz-search-item {
  width: 33.3%;
}

.nz-search-container-4 .nz-search-item {
  width: 25%;
}

.nz-search-container-5 .nz-search-item {
  width: 20%;
}

.nz-search-item:after {
  content: '';
  display: block;
  clear: both;
}

.nz-search-item > label {
  font-size: 13px;
  padding-left: 20px;
}

.nz-search-item-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding-right: 20px;
}
</style>
