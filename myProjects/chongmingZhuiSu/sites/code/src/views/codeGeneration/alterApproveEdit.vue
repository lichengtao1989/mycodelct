<template>
  <cjm-form ref="form" :model="form" :rules="rules" class="alter-approve-form">
    <cjm-form-item label="生码组织" required>
      <cjm-input v-model="form.corpName" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="生码批次" required>
      <cjm-input v-model="form.batchID" :disabled="true"></cjm-input>
    </cjm-form-item>

    <h1 class="cjm-h1">防伪查询结果配置</h1>
    <cjm-form-item label="网站查询结果" class="cjm-form-item-long" required>
      <cjm-input type="textarea" v-model="form.internetQueryText" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldInternetQueryText" v-if="form.oldInternetQueryText!=form.internetQueryText">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>
    <cjm-form-item label="短信查询结果" class="cjm-form-item-long" required>
      <cjm-input type="textarea" v-model="form.smsQueryText" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldSmsQueryText" v-if="form.oldSmsQueryText!=form.smsQueryText">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>

    <h1 class="cjm-h1">防伪卡片配置</h1>
    <cjm-form-item label="企业名称" prop="userCorpName" class="cjm-form-item-long">
      <cjm-input v-model="form.userCorpName" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldUserCorpName" v-if="form.oldUserCorpName!=form.userCorpName">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>
    <cjm-form-item label="品牌名称" prop="brandName" class="cjm-form-item-long">
      <cjm-input v-model="form.brandName" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldBrandName" v-if="form.oldBrandName!=form.brandName">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>
    <cjm-form-item label="产品名称" prop="productName" class="cjm-form-item-long">
      <cjm-input v-model="form.productName" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldProductName" v-if="form.oldProductName!=form.productName">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>
    <cjm-form-item label="产品价格" prop="productPrice" class="cjm-form-item-long">
      <cjm-input v-model="form.productPrice" :disabled="true"></cjm-input>
      <cjm-tooltip :content="'修改前：' + form.oldProductPrice" v-if="form.oldProductPrice!=form.productPrice">
        <cjm-button class="alter-record-button" type="text"></cjm-button>
      </cjm-tooltip>
    </cjm-form-item>

    <h1 class="cjm-h1">审核结果</h1>
    <cjm-form-item label="审核结果" prop="isAlterApproved" required>
      <cjm-radio-group v-model="form.isAlterApproved">
        <cjm-radio :label="value" v-for="(value,key) in codeAlterApproveStatus" :key="value">{{key}}
        </cjm-radio>
      </cjm-radio-group>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      form: {},
      rules: {}
    };
  },
  computed: {
    codeAlterApproveStatus() {
      const result = {};
      for (let key in this.enums['生码变更审核状态']) {
        if (this.enums['生码变更审核状态'][key] !== this.enums.codeAlterApproveStatus.NONE) {
          result[key] = this.enums['生码变更审核状态'][key];
        }
      }
      return result;
    }
  },
  methods: {
    initForm(id) {
      this.reset();

      this.$ajax
        .get(this.apiUrl.codeGeneration.GET_ALTERATION, { id: id })
        .then(r => {
          if (r.resultCode == '200') {
            Object.transfer(r.data, this.form);
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    //重置表单
    reset() {
      this.form = {
        id: '',
        corpName: '',
        batchID: '',
        internetQueryText: '',
        oldInternetQueryText: '',
        smsQueryText: '',
        oldSmsQueryText: '',
        userCorpName: '',
        oldUserCorpName: '',
        brandName: '',
        oldBrandName: '',
        productName: '',
        oldProductName: '',
        productPrice: '',
        oldProductPrice: '',
        isAlterApproved: this.enums.codeAlterApproveStatus.FAILED
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    //提交
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax
          .post(this.apiUrl.codeGeneration.ALTER_APPROVE, {
            id: this.form.id,
            isAlterApproved: this.form.isAlterApproved
          })
          .then(r => {
            if (r.resultCode != 200) {
              throw new Error(r.msg);
            }
          });
      });
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.alter-approve-form {
  .cjm-form-item-long {
    width: 90%;
  }
  .alter-record-button {
    position: absolute;
    top: 0;
    right: -38px;

    &:before {
      content: '比对';
    }
  }
}
</style>
