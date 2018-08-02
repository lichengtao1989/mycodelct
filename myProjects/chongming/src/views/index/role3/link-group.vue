<template>
  <div class="link-group-wrap">
    <div class="link-group">
      <slot></slot>
    </div>
  </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
  .link-group-wrap {
    position: absolute;
    padding-bottom: 45.7%;
    width: 66.6%;
    left: 16.7%;
    top: 50%;
    transform: translateY(-50%);
  }

  .link-group {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
  }
</style>
