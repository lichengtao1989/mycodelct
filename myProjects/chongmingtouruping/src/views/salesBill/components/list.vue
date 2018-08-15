<template>
  <div>
    <div style="padding: 0 22px">
      <table class="index-list">
        <thead>
        <tr>
          <th v-for="(item,index) in config.columns" :key="index" :style="item.style">{{item.name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(dataItem,dataIndex) in config.data" :key="dataIndex">
          <td v-for="(col,index) in config.columns" :key="index" :style="col.style">
            <component v-if="col.component" :is="col.component" :data="dataItem"></component>
            <div v-if="!col.component && col.render" v-html="col.render(dataItem)"></div>
            <span v-if="!col.component && !col.render">{{ dataItem[col.key] }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="more">
      <a>
        <i class="nz-icon-more"></i>
        <span>更多</span>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      config: Object
    },
    data(){
      return {};
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/assets/css/config";

  .index-list {
    width: 100%;
    text-align: left;
    font-size: 14px;
    tr, td, th {
      height: 43px;
      border-bottom: 1px solid #ededed;
    }
    th {
      color: #999999 !important;
    }
    td {
      color: #666666;
    }
  }

  .more {
    height: 40px;
    background-color: #f9f9f9;
    text-align: right;
    color: @primaryColor;
    line-height: 40px;
    a {
      margin-right: 20px;
      cursor: pointer;
    }
  }
</style>
