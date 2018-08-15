<template>
  <form class="el-form cjm-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    {'el-form--inline': inline }]">
    <slot></slot>
  </form>
</template>

<script>
  import {Form} from 'element-ui'
  export default{
    name: 'cjm-form',
    mixins: [
      Form
    ],
    props: {
      labelWidth: {
        type: String,
        default: '110px'
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-form {
    box-sizing: border-box;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    .el-form-item {
      width: 50%;
      float: left;
      margin-bottom: 20px;
      min-height: 37px;

      &.cjm-form-item-long {
        width: 100%;
      }

      &:last-child{
        margin-bottom: 0;
      }

      &.is-required .el-form-item__label:before {
        margin-right: 0;
      }

      .el-checkbox, .el-radio {
        margin-left: 0;
        margin-right: 15px;
      }

      .el-checkbox+.el-checkbox{
        margin-left: 0;
      }

      .el-radio+.el-radio{
        margin-left: 0;
      }

      .el-autocomplete, .el-date-editor.el-input, .el-cascader, .el-select {
        width: 100%;
      }
    }

    .splitLine {
      clear: both;
      width: 100%;
      height: 0px;
      border-bottom: 2px dashed #ccc;
      margin-bottom: 20px;
    }
  }
</style>
