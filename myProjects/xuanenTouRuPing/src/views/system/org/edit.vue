<template>
  <div class="content">
    <nz-scrollbar style="height:400px;">
      <nz-form style="padding-right: 10px" label-width="150px" ref="form" :model="form" :rules="rules">
        <nz-form-item label="组织名称" required prop="orgName">
          <nz-input placeholder="请输入组织名称" v-model="form.orgName"></nz-input>
        </nz-form-item>
        <nz-form-item label="上级组织" prop="parentOrgID">
          <nz-remote-select :remote-url="$apiUrl.ORG.GET_LIST" value-key="orgID" label-key="orgName" :label="form.parentOrgName" v-model="form.parentOrgID" :params="{status: 1}"></nz-remote-select>
        </nz-form-item>
        <nz-form-item label="所有区域" prop="regionCode">
          <nz-region-select v-model="form.regionCode" style="width:100%;" placeholder="请选择省市区"></nz-region-select>
        </nz-form-item>
        <nz-form-item label="登录账号" required prop="contactsMobile">
          <nz-input v-model="form.contactsMobile"></nz-input>
        </nz-form-item>
        <nz-form-item label="登录密码" v-if="form.orgID ==''" required prop="password">
          <nz-input v-model="form.password" type="password"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系人" prop="contactsBy">
          <nz-input v-model="form.contactsBy"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系手机" prop="loginMobile">
          <nz-input v-model="form.loginMobile"></nz-input>
        </nz-form-item>
        <nz-form-item label="登录页域名" prop="domainAddress">
          <nz-input v-model="form.domainAddress"></nz-input>
        </nz-form-item>
        <nz-form-item label="政府角色" prop="orgRoleID" required>
          <nz-remote-select :remote-url="$apiUrl.ROLE.GET_LIST_ORG_ROLE" :label="form.orgRoleName" v-model="form.orgRoleID"></nz-remote-select>
        </nz-form-item>
        <nz-form-item label="经营主体角色" prop="storeRoleID" required>
          <nz-remote-select :remote-url="$apiUrl.ROLE.GET_LIST_STORE_ROLE" :label="form.storeRoleName" v-model="form.storeRoleID"></nz-remote-select>
        </nz-form-item>
      </nz-form>
    </nz-scrollbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {},
        rules: {
          orgName: [this.$formRules.required],
          contactsMobile: [this.$formRules.required],
          password: [this.$formRules.required],
          loginMobile: [this.$formRules.mobile],
          storeRoleID: [this.$formRules.required],
          orgRoleID: [this.$formRules.required]
        }
      };
    },
    methods: {
      async save() {
        const valid = await this.$validForm(this.$refs.form);
        if (valid) {
          let {err, res} = await this.$model('dataManagement').commonfn(this.$apiUrl.ORG.SAVE, this.form);
          return {valid, err, res};
        } else {
          return {valid};
        }
      },
      async editFrom(orgId) {
        this.reset();
        let data = {
          orgId: orgId
        };
        let {err, res} = await this.$model('dataManagement').commonfn2(this.$apiUrl.ORG.GET, data);
        if (res.resultCode == 200) {
          this.form = res.data;
        } else {
          this.$message.showError(err);
        }
      },
      addFrom() {
        this.reset();
      },
      reset() {
        this.form = {
          orgID: '',
          orgName: '',
          parentOrgID: '',
          regionCode: '',
          contactsMobile: '',
          password: '',
          contactsBy: '',
          loginMobile: '',
          domainAddress: '',
          orgRoleID: '',
          storeRoleID: ''
        };
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
    created() {
      //this.reset();
    }
  };
</script>
<style rel='stylesheet/less' lang='less' scoped>
  body {
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    min-width: 1200px;
  }

  .content {
  }

  .register-wrap {
    text-align: center;
  }

  .register-main {
  }

  h1 {
    color: #00a88a;
    font-size: 30px;
    font-weight: lighter;
    text-align: center;
    margin: 35px 0 80px;
  }

  .form {
    width: 650px;
    display: inline-block;
    text-align: left;
  }

  .confirm-bottom {
    text-align: center;
    margin-top: 20px;
  }
</style>
