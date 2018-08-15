<template>
  <div class="cjm-edit-page">
    <cjm-form ref="form" :model="form" :rules="rules">
      <div class="smt">
       
      </div>
      <div class="clear">
        <cjm-form-item label="组织" prop="checkedCorpID" required>
          <cjm-remote-select v-model="form.checkedCorpID" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.CORPEX" :label="checkedCorpName" :disabled="disabled"></cjm-remote-select>
        </cjm-form-item>
         <cjm-form-item label="所属镇" prop="standard" required>
          <!-- <cjm-select v-model="form.xz" placeholder="请选择" :disabled="disabled">
            <cjm-option v-for="item in optionsType" :key="item.value" :label="item.text" :value="item.value">
            </cjm-option>
          </cjm-select> -->
          <cjm-enum-select v-model="form.town" enum-name="崇明乡镇" enum-namespace="trace" :clearable="true"></cjm-enum-select>
        </cjm-form-item>
        <cjm-form-item label="机构" prop="orgID" required>
          <cjm-remote-select v-model="form.orgID" :remote-url="$globalData.get('trace', 'apiUrl').Law.TOWNORG" :params="checkOrgParams" :label="orgName" :disabled="disabled"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="产品" prop="productID" required>
          <cjm-remote-select v-model="form.productID" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.CHECK_PRODUCT" :params="checkProductParams" :label="productName" :disabled="disabled"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="产品批次">
          <cjm-remote-select v-model="form.productBatchID" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH_EX" :params="checkProductBatchParams" :label="productBatchCode" :disabled="disabled"></cjm-remote-select>
        </cjm-form-item>
      </div>
      <test-items :items="form.items" :edit="true" :disabled="disabled" :testingRecordID="form.id" v-on:resetTestItems="resetTestItems" ref="items"></test-items>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="default" @click="returnList" :disabled="submitLoading">
        <i class="cjm-icon-reset"></i>返回
      </cjm-button>
      <cjm-button type="primary" @click="submit" :loading="submitLoading" v-if="!disabled">
        <i class="cjm-icon-confirm"></i>确定
      </cjm-button>
    </div>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import testItems from '../testItems-add.vue';
export default {
  components: {
    'test-items': testItems
  },
  mixins: [pageSwitch],
  data() {
    return {
      optionsType: [
        { value: 1, text: '城桥镇' },
        { value: 2, text: '堡镇' },
        { value: 3, text: '新河镇' },
        { value: 4, text: '庙镇' },
        { value: 5, text: '竖新镇' },
        { value: 6, text: '向化镇' },
        { value: 7, text: '三星镇' },
        { value: 9, text: '中兴镇' },
        { value: 10, text: '陈家镇' },
        { value: 11, text: '绿华镇' },
        { value: 12, text: '港西镇' },
        { value: 13, text: '建设镇' },
        { value: 14, text: '新海镇' },
        { value: 15, text: '东平镇' },
        { value: 16, text: '长兴镇' },
        { value: 17, text: '新村乡' },
        { value: 18, text: '横沙乡' }
      ],
      form: {
        id: '',
        checkedCorpID: '',
        orgID: '',
        productID: '',
        productBatchID: '',
        items: [],
        town: ''
      },
      checkedCorpName: '',
      orgName: '',
      productName: '',
      productBatchCode: '',
      loaded: false,
      disabled: false,
      rules: {
        checkedCorpID: [this.$formRules.required],
        orgID: [this.$formRules.required],
        productID: [this.$formRules.required]
      },
      checkOrgParams: {
        Type: '',
        CorpID: ''
      },
      checkProductParams: {
        object: 2,
        orgID: ''
      },
      checkProductBatchParams: {
        productID: '',
        orgID: ''
      },
      submitLoading: false
    };
  },
  watch: {
    'form.town'(val) {
      console.log(val);
      this.checkOrgParams['Type'] = val;
    },
    'form.checkedCorpID'(val) {
      this.checkOrgParams['CorpID'] = val;
      if (this.loaded) {
        this.form.orgID = '';
      }
    },
    'form.orgID'() {
      this.checkProductParams['orgID'] = this.form.orgID;
      if (this.loaded) {
        this.form.productID = '';
      }
    },
    'form.productID'() {
      this.checkProductBatchParams['productID'] = this.form.productID;
      this.checkProductBatchParams['orgID'] = this.form.orgID;
      if (this.loaded) {
        this.form.productBatchID = '';
      } else {
        this.loaded = true;
      }
    }
  },
  methods: {
    //重新设置检测项
    resetTestItems(items) {
      this.form.items = items;
    },
    //返回列表页面
    returnList() {
      this.popPage();
    },
    //提交
    submit() {
      let self = this;
      this.$refs.form.validate((val) => {
        let successCallback = val ? function () {
          self.form.object = 2;
          self.submitLoading = true;
          self.$ajax.post(self.$globalData.get('trace', 'apiUrl').productTesting.ADD_OR_EDIT, self.form).then((r) => {
            if (r.resultCode == 200) {
              self.$message.success('添加成功');
              self.returnList();
            } else {
              self.$message.error(r.msg);
            }
            self.submitLoading = false;
          }).catch(() => {
            self.submitLoading = false;
          });
        } : null;
        this.$refs.items.checkData(successCallback);
      });
    }
  },
  created() {
    this.form.id = this.getPageParams('edit').id;
    this.disabled = this.getPageParams('edit').view;
    if (this.form.id) {
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').productTesting.GET_PRODCUT_TEST, { id: this.form.id }).then(r => {
        if (r.resultCode == '200' && r.data) {
          this.form = {
            id: r.data.id,
            checkedCorpID: r.data.checkedCorpID,
            orgID: r.data.orgID,
            productID: r.data.productID,
            productBatchID: r.data.productBatchID,
            items: r.data.items,
            town: r.data.town
          };
          console.log(r.data.items);
          this.checkedCorpName = r.data.checkedCorpName;
          this.orgName = r.data.orgName;
          this.productName = r.data.productName;
          this.productBatchCode = r.data.productBatchCode;
        }
      });
    } else {
      this.loaded = true;
    }
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.is-loading {
  .cjm-icon-confirm {
    display: none;
  }
}
</style>
