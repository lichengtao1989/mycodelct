<template>
  <div class="cjm-list">
    <!--工具栏-->
    <div class="cjm-list-handleBar">
      <!--操作按钮-->
      <div class="cjm-list-handlerBar-operate">
        <slot name="operate"></slot>
      </div>
      <!--基础搜索-->
      <div class="cjm-list-handleBar-search" v-if="needBaseSearch" :style="{marginBottom: advancedSearchVisible ? '' : '10px'}">
        <transition name="cjm-baseSearch">
          <cjm-search-input @search="baseSearch" style="float:left;" :placeholder="baseSearchPlaceholder" v-show="!advancedSearchVisible"></cjm-search-input>
        </transition>
        <div class="cjm-list-search-switch" :class="{'unfold':advancedSearchVisible}"
             @click="advancedSearchVisible=!advancedSearchVisible" v-if="needAdvancedSearch">
          <label>高级搜索</label>
          <i class="cjm-icon-caret-down" :class="{'cjm-icon-rotate-180':advancedSearchVisible}"></i>
        </div>
      </div>
    </div>
    <!--高级搜索-->
    <div class="cjm-list-advancedSearch" v-show="advancedSearchVisible" v-if="needAdvancedSearch">
      <cjm-search-container @search="advancedSearch" @reset="advancedReset" ref="searchContainer">
        <slot name="search"></slot>
      </cjm-search-container>
    </div>
    <!--table-->
    <cjm-table v-loading="loading"
               element-loading-text="拼命加载中"
               :data="tableData"
               class="cjm-table"
               @selection-change="selectionChange"
               @sort-change="sortChange"
               :stripe="true"
               tooltip-effect="light"
               border>
      <slot name="tableColumns"></slot>
    </cjm-table>
    <div class="cjm-list-bottom">
      <!--分页器-->
      <cjm-pagination @current-change="currentPageChange" @size-change="pageSizeChange" :current-page="currentPage"
                      :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPage"
                      class="cjm-pagination">
      </cjm-pagination>
      <i class="cjm-icon-update" @click="refresh"></i>
    </div>
  </div>
</template>

<script>
  /**
   * 通用列表组件
   */
  export default {
    name: 'cjm-list',
    data(){
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
      }
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
      advancedSearchVisible(val){
        if (val) {
          this.$nextTick(()=> {
            this.$refs.searchContainer.resize();
          });
        }
      }
    },
    methods: {
      currentPageChange(val){
        this.currentPage = val;
        this.getTableData();
      },
      pageSizeChange(val){
        this.pageSize = val;
        this.getTableData();
      },
      sortChange({column, prop, order}){
        this.sortCol = prop;
        this.sortType = order;
        this.getTableData();
      },
      selectionChange(val){
        this.$emit('selection-change', val);
      },
      getTableData(){
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
          'pageSize': this.pageSize,
          'pageNum': this.currentPage,
          'orderField': this.sortCol || '',
          'orderType': orderType,
          ...condition
        };
        this.$ajax.get(this.requestUrl, params).then((r) => {
          if (r.resultCode == '200') {
            let data = (r.data && r.data.rows) ? r.data.rows : [];
            if(this.formatData && typeof this.formatData === 'function'){
              this.tableData = this.formatData(data);
            } else {
              this.tableData = data;
            }
            this.totalPage = (r.data && r.data.total) ? r.data.total : 0;
            this.$emit('data-change', r.data);
          } else {
            if(r.msg){
              this.$message.error(r.msg);
            }else{
              this.$message.error('获取数据异常，请稍后再试');
            }
          }
          //为了显示loading效果
          let time = Date.now() - startTime;
          if(time < 150){
            setTimeout(()=> {
              this.loading = false;
            }, 150 - time)
          } else {
            this.loading = false;
          }
        }).catch((error)=> {
          this.$message.error(error.message);
          this.loading = false;
        });
      },
      baseSearch(queryTxt){
        this.searchCondition = {
          'keyWord': queryTxt
        };
        this.getTableData();
      },
      advancedSearch(conditions){
        this.searchCondition = conditions;
        this.getTableData();
      },
      advancedReset(){
        this.searchCondition = {};
        this.getTableData();
      },
      /**
       * 刷新列表
       * @alias module:components/composite/list.refresh
       */
      refresh(){
        this.getTableData();
      },
      /**
       * 获取当前列表的搜索条件
       */
      getConditions(){
        return this.searchCondition;
      }
    },
    created(){
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
      if(this.autoGetData){
        this.getTableData();
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  .cjm-list {
    &:after {
      content: '';
      clear: both;
      display: block;
    }

    .cjm-list-handleBar {
      position: relative;
    }

    .cjm-list-handleBar:after {
      content: '';
      clear: both;
      display: block;
    }

    .cjm-list-handleBar-search {
      float: right;
    }
    .cjm-list-handleBar-search:after {
      content: '';
      clear: both;
      display: block;
    }

    .cjm-list-handlerBar-operate {
      float: left;
      margin-right: 20px;

      .el-button{
        margin-bottom: 10px;
      }
    }

    .cjm-list-search-switch {
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
    .cjm-list-search-switch.unfold {
      height: 46px;
      border: 1px solid #ddd;
      border-bottom: none;
      padding-left: 13px;
      box-shadow: 0px -2px 4px #ddd;
    }
    .cjm-list-search-switch label {
      user-select: none;
      cursor: pointer;
    }
    .cjm-list-search-switch i {
      transition: all 0.3s ease;
      color: @primaryColor;
      font-size: 12px;
    }

    .cjm-list-advancedSearch {
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

    .cjm-table{
      margin-top: 5px;
    }

    .cjm-list-bottom {
      margin-top: 30px;
      text-align: center;

      .cjm-icon-update {
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
      .cjm-pagination {
        display: inline-block;
      }
    }
  }

  /*基础搜索框动画*/
  .cjm-baseSearch-enter-active {
    animation: cjm-baseSearch-enter .3s;
  }

  .cjm-baseSearch-leave-active {
    animation: cjm-baseSearch-leave .3s;
  }

  @keyframes cjm-baseSearch-enter {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0px);
    }
  }

  @keyframes cjm-baseSearch-leave {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(-50px);
      opacity: 0;
    }
  }
</style>
