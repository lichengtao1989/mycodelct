<template>
  <nz-dialog customClass="width-800" ref="dialog" title="废弃回收详情信息" :okHandler="submit">
    <nz-scrollbar style="height:500px">
      <nz-form>
        <h3 class="title">废弃物回收信息</h3>
        <nz-table element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
          <nz-table-column label="来源者" prop="Farmer"></nz-table-column>
          <nz-table-column label="回收点" prop="FarmCapitalStore"></nz-table-column>
          <nz-table-column label="经手人" prop="HandMan"></nz-table-column>
          <nz-table-column label="回收时间" prop="CreateTime"></nz-table-column>
          <nz-table-column label="预警类型" prop="Farmer">
            <template slot-scope="scope">
              {{typeFn(scope.row.EarlyWarningType)}}
            </template>
          </nz-table-column>
        </nz-table>
        <h3 class="title">详情</h3>
        <nz-form-item>
          <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
            <nz-table-column label="序号">
              <template slot-scope="scope"><span>{{ (scope.$index*1)+1 }}</span></template>
            </nz-table-column>
            <nz-table-column label="废弃物名称" prop="NameOfWaste"></nz-table-column>
            <nz-table-column label="类型" prop="Farmer">
              <template slot-scope="scope">
                {{typeFnVal(scope.row.WasteType)}}
              </template>
            </nz-table-column>
            <nz-table-column label="数量" prop="Number"></nz-table-column>
            <nz-table-column label="重量" prop="Weight"></nz-table-column>
          </nz-table>
        </nz-form-item>
        <nz-form-item label="备注" label-width="75px">
          <nz-input readonly type="textarea" rows="3" resize="none" placeholder="请输入备注" v-model="form.Note"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      formModel: {},
      form: {},
      orderData: [],
      goodsDetails: []
    };
  },
  methods: {
    typeFnVal(type) {
      let str = '';
      if (parseInt(type) == 1) {
        str = '塑料袋';
      } else if (parseInt(type) == 2) {
        str = '塑料瓶';
      } else if (parseInt(type) == 3) {
        str = '玻璃瓶';
      } else if (parseInt(type) == 4) {
        str = '其它';
      } else if (parseInt(type) == 5) {
        str = '绿色农药';
      }
      return str;
    },
    typeFn(type) {
      let str = '';
      if (parseInt(type) == 1) {
        str = '含违禁药品包装';
      } else {
        str = '含非绿色农药包装';
      }
      return str;
    },
    async submit(callback) {
      this.$refs.dialog.hide();
      callback();
    },
    init() {
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      // console.log(data);
      this.orderData.push(data);
      this.goodsDetails = data.SonList;
      this.title = '查看详情';
      this.form.Note = data.Note || '';
      this.form.key2 = data.key2 || '';
      this.form.key3 = data.key3 || '';
    },
    show(data) {
      this.orderData = [];
      this.init();
      if (data) {
        this.initEdit(data);
      }
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
