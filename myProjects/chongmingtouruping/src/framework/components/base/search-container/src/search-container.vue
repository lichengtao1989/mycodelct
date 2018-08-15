<template>
  <div class="nz-search-container" :class="[className, theme]">
    <div class="nz-search-container-content clear" @keyup.enter="search">
      <slot></slot>
    </div>
    <div class="nz-search-container-footer" v-if="theme!=='theme2'">
      <slot name="footer">
        <nz-button size="small" type="primary" @click="search">
          <i class="nz-icon-search"></i>搜索</nz-button>
        <nz-button size="small" @click="reset">
          <i class="nz-icon-reset"></i>重置</nz-button>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * 高级搜索框
 */
export default {
  name: 'nz-search-container',
  componentName: 'nz-search-container',
  data() {
    return {
      interval: null,
      className: '',
      contentWidth: 0,
      items: []
    };
  },
  props: {
    theme: {
      type: String,
      default: 'theme1'
    }
  },
  methods: {
    search() {
      let conditions = {};
      for (let item of this.items) {
        if (item.searchValue) {
          conditions[item.searchKey] = item.searchValue;
        }
      }
      /**
       * 搜索事件
       * @param conditions 数据格式：{'userName':'test','createTime':'2017-1-1'}
       */
      this.$emit('search', conditions);
    },
    reset() {
      for (let item of this.items) {
        item.searchValue = '';
      }
      this.$emit('reset');
    },
    /**
     * 使容器重新计算宽度
     */
    resize() {
      if (this.$el.clientWidth === 0) {
        return;
      }
      if (this.contentWidth === this.$el.clientWidth) {
        return;
      }
      this.contentWidth = this.$el.clientWidth;
      let result = '';
      if (this.contentWidth < 1000) {
        result = 'nz-search-container-2';
      } else if (this.contentWidth < 1300) {
        result = 'nz-search-container-3';
      } else if (this.contentWidth < 1600) {
        result = 'nz-search-container-4';
      } else {
        result = 'nz-search-container-5';
      }
      this.className = result;
    }
  },
  created() {
    //接收Item的加入事件
    this.$on('nz.searchItem.mounted', item => {
      this.items.push(item);
    });
  },
  mounted() {
    this.resize();
    this.interval = setInterval(() => {
      this.resize();
    }, 300);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style rel='stylesheet/less' lang="less">
.nz-search-container {
  .nz-search-container-content {
    display: inline-block;
    width: 100%;
    .el-autocomplete,
    .el-date-editor,
    .el-date-editor.el-input,
    .el-cascader,
    .el-select {
      width: 100%;
    }
  }
}

.nz-search-container.theme1 {
  .nz-search-container-content {
    .el-input__inner {
      height: 32px;
    }
    .el-input__icon,
    .el-range-separator {
      line-height: 24px;
    }
    .el-range-input,
    .el-input__inner {
      font-size: 13px;
    }
  }
}

.nz-search-container.theme2 {
  .nz-search-container-content {
    .nz-search-item {
      width: 500px;
      float: none;
    }

    .nz-search-item-content {
      padding-right: 0;
    }
  }
}

.nz-search-container-footer {
  margin-top: 10px;
  text-align: center;

  .el-button {
    font-size: 13px;
    padding: 8px 12px;

    i {
      margin-right: 5px;
      /*font-weight: bold;*/
    }
  }
}
</style>
