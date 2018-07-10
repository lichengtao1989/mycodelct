<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" class="heg">
      <nz-scrollbar style="height:450px">
      <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="农药品名称" prop="mobile">
          <nz-input v-model="form.mobile" placeholder="农药品名称" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="注册商标" prop="contact">
          <nz-input v-model="form.contact" placeholder="注册商标" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="规格" prop="password">
          <nz-input v-model="form.password" placeholder="规格" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="生产批次" prop="iDNumber">
          <nz-input v-model="form.iDNumber" placeholder="生产批次" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="应扫描数量" prop="iDNumber">
          <nz-input v-model="form.iDNumber" placeholder="应扫描数量" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="入库方式" prop="iDNumber">
          <nz-button class="dange btnl">单个</nz-button>
          <nz-button class="xiang btnl">整箱</nz-button>
        </nz-form-item>
        <nz-form-item label="农药码" prop="iDNumber">
          <nz-input v-model="form.iDNumber" placeholder="请扫码/或手动输入" type="textarea" :rows="10"></nz-input>
        </nz-form-item>
        <nz-form-item label="已扫" prop="iDNumber">
          <nz-input v-model="form.iDNumber" placeholder="已扫" readonly="true"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      selectAry: '',
      remoteUrl: this.$apiUrl.USERMANAGE.DROPDOWNDATA,
      accountID: '',
      title: '',
      formModel: {},
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
  mounted() {},
  methods: {
    changeItemFn(value) {
      let obj = {};
      obj = this.selectAry.find(item => {
        return item.name === value;
      });
      this.accountID = obj.id;
      this.form.accountID = obj.id;
    },
    changeFn() {
      let pStr = '';
      if (this.form.accountType == 2) {
        pStr = 'Farmer';
      } else if (this.form.accountType == 3) {
        pStr = 'AgriculturalMaterials';
      } else if (this.form.accountType == 5) {
        pStr = 'Distributor';
      }
      this.getData(pStr);
    },
    async getData(str) {
      let { err, res } = await this.$ajax.post(this.$apiUrl.USERMANAGE.DROPDOWNDATA, { function: str, pageNum: '1', pageSize: '100' });
      if (err) {
        this.$message.showError(err);
        return false;
      }
      this.selectAry = res.data;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    async submit(callback) {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        // this.$emit('save-success');
        this.$refs.dialog.hide();
        this.$message.success('添加成功');
        // this.$ajax
        //   .post(this.$apiUrl.USERMANAGE.SAVE, this.form)
        //   .then(r => {
        //     if (r.res.resultCode == 200) {
        //       this.$emit('save-success');
        //       this.$refs.dialog.hide();
        //     } else {
        //     }
        //   })
        //   .catch(() => {});
      }
      callback(); //处理loading
    },
    init() {
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '编辑';
      this.form.accountType = data.accountType || '';
      this.form.accountName = data.accountName || '';
      this.form.mobile = data.mobile || '';
      this.form.password = data.password || '';
      this.form.contact = data.contact || '';
      this.form.iDNumber = data.iDNumber || '';
      this.form.accountID = data.accountID || '';
      this.form.userID = data.userID || '';
      this.form.status = data.status || '';
    },
    show(data) {
      this.init();
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>

</style>
