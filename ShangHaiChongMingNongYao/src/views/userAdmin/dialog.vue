<template>
  <nz-dialog ref="dialog" customClass="width-500" :title="title" :okHandler="submit">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="主体类型" required>
        <nz-select v-model="form.accountType" placeholder="请选择主体类型" @change="changeFn">
          <nz-option label="农户" value="2"></nz-option>
          <nz-option label="农资店" value="3"></nz-option>
          <nz-option label="总经销商" value="5"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item label="主体名称" prop="accountName">
        <nz-select v-model="form.accountName" placeholder="请选择主体类型" @change="changeItemFn">
          <nz-option :label="item.name" :value="item.name" :data-id="item.id" v-for="item in selectAry" :key="item.id"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item label="用户账号" prop="mobile" required>
        <nz-input v-model="form.mobile" placeholder="请输入用户账号（手机号）"></nz-input>
      </nz-form-item>
      <nz-form-item label="初始密码" prop="password" required>
        <nz-input v-model="form.password" placeholder="请输入初始密码"></nz-input>
      </nz-form-item>
      <nz-form-item label="联系人" prop="contact" required>
        <nz-input v-model="form.contact" placeholder="请输入联系人"></nz-input>
      </nz-form-item>
      <nz-form-item label="身份证号" prop="iDNumber" required>
        <nz-input v-model="form.iDNumber" placeholder="请输入身份证号"></nz-input>
      </nz-form-item>
    </nz-form>
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
    changeFn(val) {
      console.log(val)
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
        this.$ajax
          .post(this.$apiUrl.USERMANAGE.SAVE, this.form)
          .then(r => {
            if (r.res.resultCode == 200) {
              this.$emit('save-success');
              this.$refs.dialog.hide();
            } else {
            }
          })
          .catch(() => {});
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
