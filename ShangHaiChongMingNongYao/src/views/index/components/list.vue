<template>
  <div>
    <div style="padding: 0 3%">
      <table class="index-list" :style="config.tableStyle">
        <thead>
        <tr>
          <th v-for="(item,index) in config.columns" :key="index" :style="item.style">{{item.name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(dataItem,dataIndex) in config.data" :key="dataIndex">
          <td v-for="(col,index) in config.columns" :key="index" :style="col.style">
            <component v-if="col.component" :is="col.component" :data="dataItem"></component>
            <div class="inner-text" v-if="!col.component && col.render" v-html="col.render(dataItem)"></div>
            <div class="inner-text" :title="dataItem[col.key]" v-if="!col.component && !col.render">{{ dataItem[col.key] }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="more">
      <router-link class="more-link" :to="moreTarget">
        <i class="nz-icon-more"></i>
        <span>更多</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      config: Object,
      moreTarget: {type: String, default: ''}
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
      white-space: nowrap;
      .inner-text {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    th {
      color: #999999 !important;
    }
    td {
      color: #666666;
    }
  }

  @media screen and (max-width: 1400px) {
    .index-list {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 1300px) {
    .index-list {
      font-size: 12px;
    }
  }

  .more {
    height: 40px;
    background-color: #f9f9f9;
    text-align: right;
    color: @primaryColor;
    line-height: 40px;
    .more-link {
      margin-right: 20px;
      cursor: pointer;
      text-decoration: none;
      color: @primaryColor;
    }
  }
</style>
