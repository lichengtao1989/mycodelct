<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="产品名称" prop="productID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productID" :disabled="!productEditable" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT" @select="productSelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="产品批次" prop="productBatchID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productBatchID" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH" :params="{productID: form.productID}" @select="productBatchSelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="关联关系" prop="relation" class="cjm-form-item-long">
      <cjm-autocomplete v-model="form.relation" :fetch-suggestions="queryRelation"></cjm-autocomplete>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        productID: [this.$formRules.required],
        productBatchID: [this.$formRules.required]
      },
      //产品是否可编辑
      productEditable: false
    };
  },
  watch: {
    'form.productID': function() {
      if (this.form.level === -1) {
        //向上
        this.form.relation = '';
      }
    }
  },
  methods: {
    addForm(node, level, productEditable) {
      this.productEditable = productEditable;
      this.reset();
      this.$nextTick(() => {
        this.form.level = level;
        this.form.node = node;
      });
    },
    queryRelation(queryString, cb) {
      let params;
      if (this.form.level === -1) {
        //向上
        if (!this.form.productID) {
          cb([]);
          return;
        }
        params = {
          inputValue: queryString,
          productID: this.form.productID
        };
      } else {
        params = {
          inputValue: queryString,
          productID: this.form.node.productID
        };
      }
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').autoComplete.TRACE_NODE_CONFIG, params)
        .then(r => {
          if (r.resultCode == 200) {
            cb(
              r.data.map(item => {
                return { value: item.name };
              })
            );
          }
        });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.form;
      });
    },
    reset() {
      this.form = {
        productID: '',
        productName: '',
        productBatchID: '',
        productBatchName: '',
        relation: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    productSelect(item) {
      this.form.productID = item ? item.id : '';
      this.form.productName = item ? item.name : '';
      this.form.productBatchID = '';
      this.form.productBatchName = '';
    },
    productBatchSelect(item) {
      this.form.productBatchID = item ? item.id : '';
      this.form.productBatchName = item ? item.name : '';
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
