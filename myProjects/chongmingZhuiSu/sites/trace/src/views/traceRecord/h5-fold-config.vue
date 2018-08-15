<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="折叠分类" prop="foldType" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.foldType">
          <cjm-radio :label="value" v-for="(value, key) in foldTypeFn" :key="key">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
      <cjm-form-item label="显示方式" prop="isFolded" required>
        <cjm-radio-group v-model="form.isFolded">
          <cjm-radio :label="value" v-for="(value, key) in isFoldFn" :key="key">{{key}}</cjm-radio>
        </cjm-radio-group>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {
        foldType: '0',
        isFolded: '0',
        productBatchID: ''
      },
      rules: {}
    };
  },
  computed: {
    foldTypeFn() {
      return this.$globalData.get('trace', 'enums')['折叠分类'];
    },
    isFoldFn() {
      return this.$globalData.get('trace', 'enums')['显示方式'];
    }
  },
  methods: {
    getFold(productBatchID) {
      this.form.productBatchID = productBatchID;
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').traceRecord.GET_FOLD, {
          productBatchID: productBatchID
        })
        .then(res => {
          if (res.resultCode === '200') {
            this.form.foldType = res.data.foldType;
            this.form.isFolded = res.data.isFolded;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
    },
    setFold() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').traceRecord.SET_FOLD, this.form)
          .then(data => {
            if (data.resultCode != 200) {
              throw new Error(data.msg);
            }
          });
      });
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
