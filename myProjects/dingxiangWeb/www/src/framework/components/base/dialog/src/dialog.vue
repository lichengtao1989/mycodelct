<template>
  <el-dialog :visible.sync="dialogVisible" :title="title" class="nz-dialog-content" :close-on-click-modal="false" :custom-class="customClass">
    <div v-if="dialogVisible">
      <slot></slot>
    </div>
    <div v-if="showFooter" class="nz-dialog-footer">
      <slot name="footer">
        <el-button v-if="isNeedOkButton" type="primary" :loading="okButtonLoading" @click="okButtonClick">
          <i class="nz-icon-confirm"></i>确 定
        </el-button>
        <el-button @click="hide">
          <i class="nz-icon-close"></i>取 消
        </el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: 'nz-dialog',
    props: {
      title: String,
      customClass: String,
      okHandler: Function,
      isNeedOkButton: {type: Boolean, default: true},
      /**
       * 是否显示footer 默认：true
       */
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogVisible: false,
        okButtonLoading: false
      };
    },
    methods: {
      okButtonClick() {
        if (typeof this.okHandler === 'function') {
          this.okButtonLoading = true;
          this.okHandler(() => {
            this.okButtonLoading = false;
          });
        }
      },
      show() {
        this.dialogVisible = true;
      },
      hide() {
        this.dialogVisible = false;
      }
    }
  };
</script>
<style rel='stylesheet/less' lang='less'>
  .el-dialog__title {
    color: #606266;
  }

  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
    height: 28px;
  }

  .nz-dialog-footer {
    padding-top: 20px;
    text-align: right;
  }
</style>
