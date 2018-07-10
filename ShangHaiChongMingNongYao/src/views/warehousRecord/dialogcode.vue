<template>
  <nz-dialog ref="dialog" customClass="width-500" :title="title" :okHandler="submit">
    <div class="nrs">
      <div class="lines">
        <div class="left">入库方式:</div>
        <div class="right">单个</div>
      </div>
      <div class="lines">
        <div class="left">追溯码:</div>
        <div class="right">
          <div class="codelist" v-for=" item in codelist" :key="item">{{item}}</div>
        </div>
      </div>
    </div>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      title: '',
      codelist: [],
      formModel: { key1: '', key2: '', key3: '', key4: '', key5: '' },
      form: {},
      rules: {
        // key1: [this.$formRules.required],
        // key2: [this.$formRules.required], //, this.$formRules.intRange(5, 10)
        // key3: [this.$formRules.required], //, this.$formRules.minLength(10), this.$formRules.maxLength(20)
        // key4: [this.$formRules.required],
        // key5: [this.$formRules.required],
        // key6: [this.$formRules.required],
        // key7: [this.$formRules.required]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    async submit(callback) {
      console.log(this.activeName);
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        /**
         * 执行表单提交
         * const isSaveSuccess = this.$model('demo').save(this.form);
         * */
        const isSaveSuccess = true;
        if (isSaveSuccess) {
          this.$emit('save-success');
          this.$refs.dialog.hide();
        }
      }
      callback();
    },
    init() {
      this.title = '查看农药码';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '查看农药码';
      this.codelist = [];
      let BarCode = data.BarCode || '';
      if (BarCode.indexOf(',') > -1) {
        //多个
        this.codelist = BarCode.split(',');
      } else {
        this.codelist.push(BarCode);
      }
    },
    show(data) {
      this.init();
      if (data) {
        console.log(data);
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.lines {
  overflow: hidden;
  margin-bottom: 25px;
  .left {
    width: 60px;
    text-align: right;
    padding-right: 10px;
  }
  .left,
  .right {
    display: inline-block;
    vertical-align: top;
  }
  .codelist {
    padding-bottom: 15px;
  }
}
</style>