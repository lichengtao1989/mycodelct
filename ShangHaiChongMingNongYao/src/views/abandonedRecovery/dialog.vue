<template>
  <nz-dialog customClass="width-800" ref="dialog" title="废弃回收详情信息" :okHandler="submit">
    <nz-scrollbar style="height:500px">
      <nz-form>
        <h3 class="title">废弃物回收信息</h3>
        <nz-table element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="来源者"></nz-table-column>
          <nz-table-column label="回收点"></nz-table-column>
          <nz-table-column label="经手人"></nz-table-column>
          <nz-table-column label="回收时间"></nz-table-column>
          <nz-table-column label="预警类型"></nz-table-column>
        </nz-table>
        <h3 class="title">详情</h3>
        <nz-form-item>
          <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
            <nz-table-column label="序号"></nz-table-column>
            <nz-table-column label="废弃物名称"></nz-table-column>
            <nz-table-column label="类型"></nz-table-column>
            <nz-table-column label="数量"></nz-table-column>
            <nz-table-column label="重量"></nz-table-column>
          </nz-table>
        </nz-form-item>
        <nz-form-item label="备注" label-width="75px">
          <nz-input readonly type="textarea" rows="3" resize="none" placeholder="请输入备注"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      orderData: [{}, {}, {}, {}, {}],
      goodsDetails: [{}, {}, {}, {}, {}]
    };
  },
  methods: {
    async submit(callback) {
      this.$refs.dialog.hide();
      callback();
    },
    init() {},
    show(data) {
      this.init(data);
      this.$refs.dialog.show();
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
h3.title {
  font-size: 16px;
  color: #333333;
  padding: 0;
  margin: 0;
  margin-bottom: 13px;
  margin-top: 35px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
