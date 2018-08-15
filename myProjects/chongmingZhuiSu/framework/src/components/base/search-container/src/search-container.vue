<template>
  <div class="cjm-search-container" :class="[className, theme]">
    <div class="cjm-search-container-content clear" @keyup.enter="search">
      <slot></slot>
    </div>
    <div class="cjm-search-container-footer" v-if="theme!=='theme2'">
      <slot name="footer">
        <cjm-button size="small" type="primary" @click="search"><i class="cjm-icon-search"></i>搜索</cjm-button>
        <cjm-button size="small" @click="reset"><i class="cjm-icon-reset"></i>重置</cjm-button>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * 高级搜索框
 */
export default {
  name: 'cjm-search-container',
  componentName: 'cjm-search-container',
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
        result = 'cjm-search-container-2';
      } else if (this.contentWidth < 1300) {
        result = 'cjm-search-container-3';
      } else if (this.contentWidth < 1600) {
        result = 'cjm-search-container-4';
      } else {
        result = 'cjm-search-container-5';
      }
      this.className = result;
    }
  },
  created() {
    //接收Item的加入事件
    this.$on('cjm.searchItem.mounted', item => {
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
.cjm-search-container {
  .cjm-search-container-content {
    .el-autocomplete,
    .el-date-editor,
    .el-date-editor.el-input,
    .el-cascader,
    .el-select {
      width: 100%;
    }
  }
}

.cjm-search-container.theme1 {
  .cjm-search-container-content {
    .el-input__inner {
      height: 32px;
    }
    .el-input__icon, .el-range-separator {
      line-height: 24px;
    }
    .el-range-input, .el-input__inner {
      font-size: 13px;
    }
  }
}

.cjm-search-container.theme2 {
  .cjm-search-container-content {
    .cjm-search-item {
      width: 500px;
      float: none;
    }

    .cjm-search-item-content {
      padding-right: 0;
    }
  }
}

.cjm-search-container-footer {
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
