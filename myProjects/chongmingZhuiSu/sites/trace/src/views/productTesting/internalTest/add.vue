<template>
  <div class="cjm-edit-page">
    <cjm-form ref="form" :model="form" :rules="rules">
      <div class="clear">
        <cjm-form-item label="机构" prop="orgID" required>
          <cjm-remote-select v-model="form.orgID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.ORG"
                             :label="orgName"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="产品" prop="productID" required>
          <cjm-remote-select v-model="form.productID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.CHECK_PRODUCT"
                             :params="checkProductParams"
                             :label="productName"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="产品批次">
          <cjm-remote-select v-model="form.productBatchID"
                             :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH_EX"
                             :params="checkProductBatchParams"
                             :label="productBatchCode"></cjm-remote-select>
        </cjm-form-item>
      </div>
      <test-items :items="form.items"
                  :edit="true"
                  v-on:resetTestItems="resetTestItems"
                  ref="items"></test-items>
    </cjm-form>
    <div class="cjm-page-bottom-holder"></div>
    <div class="cjm-page-bottom-bar">
      <cjm-button type="default" @click="returnList" :disabled="submitLoading"><i class="cjm-icon-reset"></i>返回
      </cjm-button>
      <cjm-button type="primary" @click="submit" :loading="submitLoading"><i class="cjm-icon-confirm"></i>确定
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
        form: {
          orgID: '',
          productID: '',
          productBatchID: '',
          items: []
        },
        orgName: '',
        productName: '',
        productBatchCode: '',
        loaded: false,
        rules: {
          orgID: [this.$formRules.required],
          productID: [this.$formRules.required]
        },
        checkProductParams: {
          orgID: ''
        },
        checkProductBatchParams: {
          productID: '',
          orgID: ''
        },
        submitLoading: false
      }
    },
    watch: {
      'form.orgID'(){
        this.checkProductParams['orgID'] = this.form.orgID;
        if (this.loaded) {
          this.form.productID = '';
        }
      },
      'form.productID'(){
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
      resetTestItems(items){
        this.form.items = items;
      },
      //返回列表页面
      returnList(){
        this.popPage();
      },
      //提交
      submit(){
        let self = this;
        this.$refs.form.validate((val) => {
          let successCallback = val ? function () {
            self.form.object = 1;
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
    created(){
      this.form.id = this.getPageParams('edit').id;
      if (this.form.id) {
        this.$ajax.get(this.$globalData.get('trace', 'apiUrl').productTesting.GET_PRODCUT_TEST, {id: this.form.id}).then((r) => {
          if (r.resultCode == '200' && r.data) {
            this.form = {
              id: r.data.id,
              corpID: r.data.checkedCorpID,
              orgID: r.data.orgID,
              productID: r.data.productID,
              productBatchID: r.data.productBatchID,
              items: r.data.items
            };
            this.orgName = r.data.orgName;
            this.productName = r.data.productName;
            this.productBatchCode = r.data.productBatchCode;
          }
        });
      } else {
        this.loaded = true;
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  .is-loading {
    .cjm-icon-confirm {
      display: none;
    }
  }
</style>
