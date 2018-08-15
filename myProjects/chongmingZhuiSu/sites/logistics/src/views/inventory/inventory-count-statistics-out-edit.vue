<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="产品编号">
      {{form.productCode}}
    </cjm-form-item>
    <cjm-form-item label="产品名称">
      {{form.productName}}
    </cjm-form-item>
    <cjm-form-item label="所属机构">
      {{form.orgName}}
    </cjm-form-item>
    <cjm-form-item label="单标单位">
      {{form.unit}}
    </cjm-form-item>
    <cjm-form-item label="出库数量">
      {{form.inNum}}
    </cjm-form-item>
    <cjm-table :data="tableData">
      <cjm-table-column prop="type" label="出库类型" enum-namespace="logistics" enum-name="台账出入库科目"></cjm-table-column>
      <cjm-table-column prop="number" label="出库数量"></cjm-table-column>
    </cjm-table>
  </cjm-form>
</template>
<script>
  export default{
    data: function () {
      return {
        form: {},
        tableData: [],
        rules: {
          name: [
            this.$formRules.required,
            this.$formRules.maxLength(40)
          ]
        }
      }
    },
    methods: {
      reset() {
        this.form = {};
        this.$refs.form.resetFields();
      },
      editForm(orgID, productID, stockTime) {
        this.reset();
        this.$ajax.get(this.$globalData.get('logistics', 'apiUrl').inventory.GET_LEDGER_DETAIL_OUT, {
          orgID: orgID,
          productID: productID,
          stockTime: stockTime
        }).then((r) => {
          if (r.resultCode == 200) {
            this.form = r.data.rows[0];
            this.tableData = r.data.rows[0].detail;
            this.logoSelect = r.data.logoImage;
            this.form.code = '';
            if (productID != '') {
              this.form.orgID = '';
              this.form.productID = productID;
            }
          } else {
            this.$message.error(r.msgDetails.msgs[0].toString());
          }
        }).catch()
      }
    }
//    props: ['data']
  }
</script>
