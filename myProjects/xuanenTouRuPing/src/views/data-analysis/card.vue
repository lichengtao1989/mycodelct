<template>
  <div class="index-card" :class="size">
    <div class="card-title" v-if="title"><i></i>{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      size: {type: String, default: 'small'},
      title: {type: String, default: ''}
    },
    data(){
      return {};
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/assets/css/config";

  .index-card {
    position: relative;
    background-color: #fff;
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    white-space: normal;
    border-radius: 5px;
    box-shadow: 0 0 15px #ccc;
    &.small {
      width: 24.1%;
      margin-right: 1.2%;
      &:last-child {
        margin-right: 0;
      }
    }
    &.medium {
      width: 74.7%;
    }
    &.large {
      width: 100%;
    }
  }

  .card-title {
    font-size: 16px;
    color: #333333;
    margin-left: 18px;
    margin-top: 19px;
    margin-bottom: 40px;
    height: 16px;
    line-height: 16px;
    i {
      display: inline-block;
      vertical-align: top;
      width: 6px;
      height: 6px;
      margin-top: 5px;
      border-radius: 50%;
      background-color: @primaryColor;
      margin-right: 10px;
    }
  }
</style>
