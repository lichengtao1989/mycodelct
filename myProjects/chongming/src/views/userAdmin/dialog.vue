<template>
  <nz-dialog ref="dialog" customClass="width-500" :title="title" :okHandler="submit">
    <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="主体类型" prop="accountType">
        <nz-select v-model="accountType" placeholder="请选择主体类型" @change="changeFn">
          <nz-option label="农户" value="2"></nz-option>
          <nz-option label="农资店" value="3"></nz-option>
          <nz-option label="总经销商" value="5"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item label="主体名称" prop="accountName">
        <nz-remote-select v-model="form.accountName" :remoteUrl="$apiUrl.USERMANAGE.DROPDOWNDATA" :params="params" valueKey="name" @select="selectFn"></nz-remote-select>
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
      v1: '',
      accountType: '',
      accountName: '',
      selectAry: '',
      remoteUrl: this.$apiUrl.USERMANAGE.DROPDOWNDATA,
      accountID: '',
      title: '',
      params: { pageNum: '1', pageSize: '100' },
      formModel: {},
      form: { accountName: '' },
      rules: {
        accountName: [{ required: true, message: 'accountName is requied', trigger: 'blur' }],
        accountType: [{ required: true, message: 'accountType is requied', trigger: 'blur' }]
        // [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ]
      }
    };
  },
  mounted() {},
  methods: {
    selectFn(val) {
      // console.log(val);
      this.form.accountID = val.id;
    },
    changeItemFn(value) {
      let obj = {};
      obj = this.selectAry.find(item => {
        return item.name === value;
      });
      this.accountID = obj.id;
      this.form.accountID = obj.id;
    },
    changeFn2(val) {
      // console.log(val);
    },
    changeFn(val) {
      if (val == 2) {
        this.params.function = 'Farmer';
      } else if (val == 3) {
        this.params.function = 'AgriculturalMaterials';
      } else if (val == 5) {
        this.params.function = 'Distributor';
      }
      this.form.accountName = '';
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
      // console.log(this.form);
      this.form.accountType = this.accountType;

      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        this.$ajax
          .post(this.$apiUrl.USERMANAGE.SAVE, this.form)
          .then(r => {
            if (r.res.resultCode == 200) {
              this.$emit('save-success');
              this.$refs.dialog.hide();
            } else {
              this.$message.showError(r.res.msg);
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
      // console.log(data);
      if (parseInt(data.accountType) == 2) {
        this.params.function = 'Farmer';
      } else if (parseInt(data.accountType) == 3) {
        this.params.function = 'AgriculturalMaterials';
      } else if (parseInt(data.accountType) == 5) {
        this.params.function = 'Distributor';
      }
      this.accountType = data.accountType;
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
      this.accountType = '';
      this.init();
      // console.log(data);
      if (data) {
        this.initEdit(data);
      }
      this.$refs.dialog.show();
    }
  }
};
</script>
