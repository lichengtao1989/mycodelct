<template>
  <nz-dialog ref="dialog" customClass="width-800" :title="title" :okHandler="submit" class="heg">
    <nz-scrollbar style="height:450px">
      <nz-form label-width="100px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="农药品名称" prop="ProductName">
          <nz-input v-model="form.ProductName" placeholder="农药品名称" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="注册商标" prop="TraderMark">
          <nz-input v-model="form.TraderMark" placeholder="注册商标" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="规格" prop="spec">
          <nz-input v-model="form.spec" placeholder="规格" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="生产批次" prop="ProductionBatch">
          <nz-input v-model="form.ProductionBatch" placeholder="生产批次" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="应扫描数量" prop="Amount">
          <nz-input v-model="form.Amount" placeholder="应扫描数量" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="入库方式" prop="iDNumber">
          <nz-button class="dange btnl">单个</nz-button>
          <nz-button class="xiang btnl">整箱</nz-button>
        </nz-form-item>
        <nz-form-item label="农药码" prop="BarCode">
          <nz-input @keyup.enter.native="inputCodeFn" v-model="form.BarCode" placeholder="请扫码/或手动输入" type="textarea" :rows="10"></nz-input>
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
    inputCodeFn(event) {
      // console.log(event);
    },
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
        let nowCode = this.form.BarCode.replace(/[\r\n]/g, ',');
        // console.log(nowCode);
        this.form.BarCode = nowCode;
        this.$emit('postData', this.form);
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
      this.form.BarCode = data.BarCode || '';
      this.form.PesticideId = data.PesticideId || '';
      this.form.ProductName = data.ProductName || '';
      this.form.format = data.format || '';
      this.form.Amount = data.Amount || '';
      this.form.SpecUnit = data.SpecUnit || '';
      this.form.ProductionBatch = data.ProductionBatch || '';
      this.form.ProductionTime = data.ProductionTime || '';
      this.form.ExpireTime = data.ExpireTime || '';
      this.form.position = data.position || '';
      this.form.TraderMark = data.TraderMark || '';
      this.form.position = data.position || '';
      this.form.spec = `${data.SpecQuantity}/${data.SpecUnit}`;
      //{ PesticideId: id, name: str, format: '20.00', Amount: '', unit: '瓶', ProductionBatch: '', ProductionTime: '', ExpireTime: '', position: '', BarCode: '' }
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
