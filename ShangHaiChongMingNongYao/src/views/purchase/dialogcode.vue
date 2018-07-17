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
        <!-- <nz-form-item label="生产批次" prop="ProductionBatch">
          <nz-input v-model="form.ProductionBatch" placeholder="生产批次" readonly="true"></nz-input>
        </nz-form-item> -->
        <nz-form-item label="应扫描数量" prop="Amount">
          <nz-input v-model="form.Amount" placeholder="应扫描数量" readonly="true"></nz-input>
        </nz-form-item>
        <nz-form-item label="入库方式" prop="iDNumber">
          <!-- <nz-button class="dange btnl" :class="{activeclass:idx}">单个</nz-button>
          <nz-button class="xiang btnl" >整箱</nz-button> -->
          <nz-button @click="idxFn(idx)" class="btnl" v-for="(item,idx) in typeAry" :key="item" :class="{active:idx==deidx?true:false}">{{item.text}}</nz-button>
        </nz-form-item>
        <nz-form-item label="农药码" prop="BarCode">
          <nz-input @blur="blurFn" @keyup.enter.native="inputCodeFn" v-model="form.BarCode" placeholder="请扫码/或手动输入" type="textarea" :rows="10"></nz-input>
        </nz-form-item>
        <nz-form-item label="已扫" prop="iDNumber">
          <nz-input v-model="codeNum" placeholder="已扫" readonly="true"></nz-input>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </nz-dialog>
</template>
<script>
export default {
  data() {
    return {
      typeAry: [{ text: '单个' }, { text: '整箱' }],
      deidx: 0,
      selectAry: '',
      remoteUrl: this.$apiUrl.USERMANAGE.DROPDOWNDATA,
      accountID: '',
      title: '',
      formModel: {},
      form: {},
      codeNum: '',
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
    idxFn(idx) {
      this.deidx = idx;
      console.log(this.deidx);
      this.form.deidx = idx;
    },
    blurFn(event) {
      let valIn = event.target.value;
      if (valIn.indexOf('\n') > -1) {
        //有回车键
        console.log();
        let ary = this.form.BarCode.split('\n');
        let numVal = '';
        for (let i = 0; i < ary.length; i++) {
          if (ary[i]) {
            numVal++;
          }
        }
        this.codeNum = numVal;
      } else {
      }
    },
    inputCodeFn(event) {
      let valIn = event.target.value;
      if (valIn.indexOf('\n') > -1) {
        //有回车键
        console.log();
        let ary = this.form.BarCode.split('\n');
        let numVal = '';
        for (let i = 0; i < ary.length; i++) {
          if (ary[i]) {
            numVal++;
          }
        }
        this.codeNum = numVal;
      } else {
      }
    },
    // inputCodeFnEnter(event) {
    //   console.log(event);
    //   let nowCode = this.form.BarCode.replace(/[\r\n]/g, ',');
    //   console.log(nowCode);
    // },
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
      console.log(this.form.BarCode);
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let nowCode = this.form.BarCode.replace(/[\r\n]/g, ',');
        this.form.BarCode = nowCode;
        this.form.InstockWay = this.deidx;

        this.$emit('postData', this.form);
        this.$refs.dialog.hide();
        this.$message.success('添加成功');
      }
      callback(); //处理loading
    },
    init() {
      this.title = '添加';
      this.form = Object.jsonClone(this.formModel);
    },
    initEdit(data) {
      this.title = '编辑';
      console.log(data.BarCode);
      if (data.BarCode) {
        let ary = data.BarCode.split(',');
        let numVal = '';
        for (let i = 0; i < ary.length; i++) {
          if (ary[i]) {
            numVal++;
          }
        }
        this.codeNum = numVal;
      } else {
        this.codeNum = 0;
      }
      if (data.deidx) {
        this.deidx = data.deidx;
      } else {
        this.deidx = 0;
      }
      let bcode = data.BarCode.replace(/[,]/g, '\n');

      this.form.BarCode = bcode || '';
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
      this.form.SpecType = data.SpecType || '';
      this.form.SpecQuantity = data.SpecQuantity || '';
      this.form.spec = `${data.SpecQuantity}${data.SpecUnit}/${data.SpecType}`;
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
.heg {
  .active {
    background: #00a88a;
    color: #fff;
  }
}
</style>
