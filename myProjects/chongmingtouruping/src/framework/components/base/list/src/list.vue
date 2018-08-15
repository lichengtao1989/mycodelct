<template>
  <div class="nz-list">
    <!--工具栏-->
    <div class="nz-list-handleBar">
      <!--操作按钮-->
      <div class="nz-list-handlerBar-operate">
        <slot name="operate"></slot>
      </div>
      <!--基础搜索-->
      <div class="nz-list-handleBar-search" v-if="needBaseSearch" :style="{marginBottom: advancedSearchVisible ? '' : '10px'}">
        <transition name="nz-baseSearch">
          <nz-search-input @search="baseSearch" style="float:left;" :placeholder="baseSearchPlaceholder" v-show="!advancedSearchVisible"></nz-search-input>
        </transition>
        <div class="nz-list-search-switch" :class="{'unfold':advancedSearchVisible}" @click="advancedSearchVisible=!advancedSearchVisible" v-if="needAdvancedSearch">
          <label>高级搜索</label>
          <i class="nz-icon-caret-down" :class="{'nz-icon-rotate-180':advancedSearchVisible}"></i>
        </div>
      </div>
    </div>
    <!--高级搜索-->
    <div class="nz-list-advancedSearch" v-show="advancedSearchVisible" v-if="needAdvancedSearch">
      <nz-search-container @search="advancedSearch" @reset="advancedReset" ref="searchContainer">
        <slot name="search"></slot>
      </nz-search-container>
    </div>
    <!--table-->
    <nz-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" class="nz-table" @selection-change="selectionChange" @sort-change="sortChange" :stripe="true" tooltip-effect="light" border>
      <slot name="tableColumns"></slot>
    </nz-table>
    <div class="nz-list-bottom">
      <!--分页器-->
      <nz-pagination @current-change="currentPageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" class="nz-pagination">
      </nz-pagination>
      <i class="nz-icon-update" @click="refresh"></i>
    </div>
  </div>
</template>

<script>
/**
 * 通用列表组件
 */
export default {
  name: 'nz-list',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalPage: 1,
      loading: false,
      sortCol: '',
      sortType: '',
      searchCondition: {},
      advancedSearchVisible: false
    };
  },
  props: {
    /**
     * 请求数据的url地址
     */
    requestUrl: {
      type: String,
      required: true
    },
    /**
     * 是否需要基础搜索 默认：是
     */
    needBaseSearch: {
      type: Boolean,
      default: true
    },
    /**
     * 是否需要高级搜索 默认：否
     */
    needAdvancedSearch: Boolean,
    /**
     * 搜索前的钩子函数，传入参数：conditions 返回：处理后的conditions
     */
    beforeSearch: Function,
    /**
     * 搜索填写输入字段的提示
     */
    baseSearchPlaceholder: String,
    /**
     * 是否自动获取数据，默认为true
     */
    autoGetData: {
      type: Boolean,
      default: true
    },
    /**
     * 格式化列表数据，传入参数：tableData 返回：格式化之后的tableData
     */
    formatData: {
      type: Function
    }
  },
  watch: {
    advancedSearchVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchContainer.resize();
        });
      }
    }
  },
  methods: {
    currentPageChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    sortChange({ column, prop, order }) {
      this.sortCol = prop;
      this.sortType = order;
      this.getTableData();
    },
    selectionChange(val) {
      this.$emit('selection-change', val);
    },
    async getTableData() {
      let startTime = Date.now();
      this.loading = true;
      let orderType = '';
      if (this.sortType === 'descending') {
        orderType = '0';
      } else if (this.sortType === 'ascending') {
        orderType = '1';
      }
      let condition = this.searchCondition;
      if (this.beforeSearch && typeof this.beforeSearch === 'function') {
        condition = this.beforeSearch(Object.deepClone(this.searchCondition));
      }
      let params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        orderField: this.sortCol || '',
        orderType: orderType,
        ...condition
      };
      const { err, res } = await this.$ajax.get(this.requestUrl, params);
      if (err) {
        this.$message.showError(err);
      } else if (res.resultCode == 200) {
        let data = res.data && res.data.rows ? res.data.rows : [];
        if (this.formatData && typeof this.formatData === 'function') {
          this.tableData = this.formatData(data);
        } else {
          this.tableData = data;
        }
        this.totalPage = res.data && res.data.total ? res.data.total : 0;
        this.$emit('data-change', res.data);
      }
      //为了显示loading效果
      let time = Date.now() - startTime;
      if (time < 150) {
        setTimeout(() => {
          this.loading = false;
        }, 150 - time);
      } else {
        this.loading = false;
      }
    },
    baseSearch(queryTxt) {
      this.searchCondition = {
        keyWord: queryTxt
      };
      this.getTableData();
    },
    advancedSearch(conditions) {
      this.searchCondition = conditions;
      this.getTableData();
    },
    advancedReset() {
      this.searchCondition = {};
      this.getTableData();
    },
    /**
     * 刷新列表
     * @alias module:components/composite/list.refresh
     */
    refresh() {
      this.getTableData();
    },
    /**
     * 获取当前列表的搜索条件
     */
    getConditions() {
      return this.searchCondition;
    }
  },
  created() {
    //设置默认的每页行数
    let contentHeight = window.innerHeight - 50 - 20;
    if (contentHeight > 1040) {
      this.pageSize = 20;
    } else if (contentHeight > 840) {
      this.pageSize = 15;
    } else {
      this.pageSize = 10;
    }
    if (this.needAdvancedSearch && !this.needBaseSearch) {
      this.advancedSearchVisible = true;
    }
    if (this.autoGetData) {
      this.getTableData();
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../../../assets/css/config';

.nz-list {
  min-height: 700px;
  padding: 40px 20px;
  background-color: #fff;
  &:after {
    content: '';
    clear: both;
    display: block;
  }

  .nz-list-handleBar {
    position: relative;
  }

  .nz-list-handleBar:after {
    content: '';
    clear: both;
    display: block;
  }

  .nz-list-handleBar-search {
    float: right;
  }
  .nz-list-handleBar-search:after {
    content: '';
    clear: both;
    display: block;
  }

  .nz-list-handlerBar-operate {
    float: left;
    margin-right: 20px;

    .el-button {
      margin-bottom: 10px;
    }
  }

  .nz-list-search-switch {
    float: left;
    line-height: 34px;
    font-size: 14px;
    padding: 0 10px;
    margin-left: 5px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background: #fff;
    border: 1px solid #fff;
    border-bottom: none;
    cursor: pointer;
    user-select: none;
  }
  .nz-list-search-switch.unfold {
    height: 46px;
    border: 1px solid #ddd;
    border-bottom: none;
    padding-left: 13px;
    box-shadow: 0px -2px 4px #ddd;
  }
  .nz-list-search-switch label {
    user-select: none;
    cursor: pointer;
  }
  .nz-list-search-switch i {
    transition: all 0.3s ease;
    color: @primaryColor;
    font-size: 12px;
  }

  .nz-list-advancedSearch {
    float: right;
    width: 100%;
    margin-top: -1px;
    margin-bottom: 15px;
    padding: 20px 0;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 4px #ddd;
  }

  .nz-table {
    margin-top: 5px;
  }

  .nz-list-bottom {
    margin-top: 30px;
    text-align: center;

    .nz-icon-update {
      color: #48576a;
      font-size: 18px;
      cursor: pointer;
      position: relative;
      top: 4px;

      &:hover {
        color: #20a0ff;
      }
    }

    /*分页器*/
    .nz-pagination {
      display: inline-block;
    }
  }
}

/*基础搜索框动画*/
.nz-baseSearch-enter-active {
  animation: nz-baseSearch-enter 0.3s;
}

.nz-baseSearch-leave-active {
  animation: nz-baseSearch-leave 0.3s;
}

@keyframes nz-baseSearch-enter {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes nz-baseSearch-leave {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-50px);
    opacity: 0;
  }
}
</style>
