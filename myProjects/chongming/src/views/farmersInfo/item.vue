<template>
  <div class="info-item">
    <div class="label">{{label}}：</div>
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
  export default {
    props: ['label', 'text'],
    data(){
      return {};
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .info-item {
    margin-bottom: 20px;
    .label {
      display: inline-block;
      vertical-align: top;
      width: 70px;
      text-align: right;
      font-size: 14px;
      color: #999999;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      color: #666666;
    }
  }
</style>
