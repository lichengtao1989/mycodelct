<template>
  <div class="cjm-transfer-panel">
    <div class="cjm-transfer-title" v-if="title">{{title}}</div>
    <div class="cjm-transfer-search">
      <cjm-input size="small" v-model="search" :disabled="disabled"></cjm-input>
    </div>
    <cjm-scrollbar ref="scrollbar"
                   class="cjm-transfer-content"
                   :style="{height: title ? 400-38-40-54-2+'px' : 400-40-54-2+'px'}"
                   @scroll-bottom="loadMore">
      <cjm-checkbox-group v-model="checked">
        <cjm-checkbox v-for="item in displayData"
                      :key="item[keyProp]"
                      :label="item[keyProp]"
                      :disabled="item.disabled"
                      @change="checkedChange(arguments[0],item)"
                      class="cjm-transfer-item">{{item[labelProp]}}
        </cjm-checkbox>
      </cjm-checkbox-group>
      <p class="cjm-transfer-content-more" v-if="displayData.length<filteredData.length">
      </p>
    </cjm-scrollbar>
    <div class="cjm-transfer-footer">
      <cjm-checkbox v-model="allChecked"
                    :disabled="disabled"
                    :indeterminate="checked.length>0 && checked.length<filteredData.length"
                    @change="allCheckedChange">
        已选{{checked.length}}/{{data.length}}项
      </cjm-checkbox>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        search: '',
        checked: [],
        checkedItem: [],
        pageNum: 1,
        allChecked: false
      }
    },
    props: {
      data: {
        type: Array,
        default(){
          return [];
        }
      },
      disabled: Boolean,
      pageSize: {
        type: Number,
        default: 50
      },
      keyProp: String,
      labelProp: String,
      title: String
    },
    computed: {
      //显示的数据
      displayData(){
        return this.filteredData.slice(0, this.pageSize * this.pageNum);
      },
      //筛选之后的数据
      filteredData(){
        return this.data.filter(item=> {
          return item[this.labelProp].indexOf(this.search) >= 0;
        });
      }
    },
    watch: {
      search: function () {
        //搜索内容变化之后，都显示第一页的内容
        this.pageNum = 1;
        this.$refs.scrollbar.scrollTo(false, 'top');
      },
      //选中对象改变事件
      checkedItem: function (val) {
        this.$emit('checked-change', val);
        this.updateAllChecked();
      },
      data(val) {
        const checkedItem = [];
        this.checkedItem.forEach(item => {
          if (val.indexOf(item) > -1) {
            checkedItem.push(item);
          }
        });
        this.checkedItem = checkedItem;
        this.checked = checkedItem.map(item => item[this.keyProp]);
      }
    },
    methods: {
      //加载更多
      loadMore(){
        if (this.displayData.length < this.filteredData.length) {
          this.pageNum++;
        }
      },
      //全选按钮改变事件
      allCheckedChange(value){
        this.checkedItem = value
          ? this.filteredData
          : [];
        this.checked = this.checkedItem.map(item => item[this.keyProp])
      },
      updateAllChecked() {
        this.allChecked = this.filteredData.length > 0 &&
          this.checked.length === this.filteredData.length;
      },
      checkedChange(value, item){
        if (value) {
          this.checkedItem.push(item);
        } else {
          this.checkedItem.remove(item);
        }
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  @height: 400px;
  @titleHeight: 38px;
  @footerHeight: 40px;
  @searchHeight: 54px;

  .cjm-transfer-panel {
    position: relative;
    width: 100%;
    height: @height;
    box-sizing: border-box;
    border: 1px solid @Gray;
    box-shadow: 0 0 8px #ddd;

    .cjm-transfer-title{
      padding: 0 12px;
      line-height: @titleHeight;
      height: @titleHeight;
      background: @DarkWhite;
      color: @Silver;
      border-bottom: 1px solid @Gray;
      box-sizing: border-box;
    }

    .cjm-transfer-search {
      height: @searchHeight;
      padding: 10px 12px;
      box-sizing: border-box;

      .el-input__inner{
        border-color: #bfcbd9 !important;
      }
    }

    .cjm-transfer-content {
      padding-bottom: 10px;
      box-sizing: border-box;
    }

    .cjm-transfer-content-more {
      text-align: center;
    }

    .cjm-transfer-item.el-checkbox {
      display: block;
      position: relative;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      padding: 0 15px;
      margin-left: 0;
      margin-right: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:hover {
        background: @LightGray;
      }
    }

    .cjm-transfer-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: @footerHeight;
      line-height: @footerHeight;
      padding: 0 15px;
      background: @DarkWhite;
      border-top: 1px solid @Gray;
      box-sizing: border-box;

      .el-checkbox__label {
        color: @Silver;
      }
    }
  }
</style>
