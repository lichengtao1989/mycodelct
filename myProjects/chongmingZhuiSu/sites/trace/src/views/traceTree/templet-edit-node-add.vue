<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="产品名称" prop="productID" required class="cjm-form-item-long">
      <cjm-remote-select :value="form.productID" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT" @select="productSelect"></cjm-remote-select>
    </cjm-form-item>
    <cjm-form-item label="关联关系" prop="relation" class="cjm-form-item-long">
      <cjm-autocomplete v-model="form.relation" :fetch-suggestions="queryRelation"></cjm-autocomplete>
    </cjm-form-item>
    <cjm-form-item label="关联方式" prop="type" required class="cjm-form-item-long">
      <cjm-radio-group v-model="form.type">
        <cjm-radio label="1">优先使用现有节点</cjm-radio>
        <cjm-radio label="2">创建新节点</cjm-radio>
      </cjm-radio-group>
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
        relation: []
      }
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
    addForm(node, level) {
      this.reset();
      this.$nextTick(() => {
        this.form.level = level;
        this.form.node = node;
      });
    },
    productSelect(item) {
      this.form.productID = item ? item.id : '';
      this.form.productName = item ? item.name : '';
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
        relation: '',
        type: '1'
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
