<template>
  <div class="cjm-edit-page">
    <div class="node-steps">
      <cjm-steps :active="active">
        <cjm-step title="基本信息"></cjm-step>
        <cjm-step title="审批内容"></cjm-step>
      </cjm-steps>
    </div>
    <cjm-form class="product-select" :model="form" :rules="rules">
      <div v-show="active == 0">
        <cjm-form-item label="申请人" class="cjm-form-item-long" prop="applyByName" required>
          <cjm-input v-model="form.applyByName" disabled></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="申请企业" class="cjm-form-item-long" prop="applyCorpName" required>
          <cjm-input v-model="form.applyCorpName" disabled></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="审批模块" class="cjm-form-item-long" prop="reviewModule" required>
          <cjm-radio-group v-model="form.reviewModule" :disabled="disabled">
            <cjm-radio :label="value" v-for="(value,key) in approvalModule" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="优先级" class="cjm-form-item-long" prop="level" required>
          <cjm-radio-group v-model="form.level" :disabled="disabled">
            <cjm-radio :label="value" v-for="(value,key) in levelItem" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
          <cjm-input type="textarea" :rows="3" v-model="form.note" :disabled="disabled">
          </cjm-input>
        </cjm-form-item>

        <div class="cjm-page-bottom-holder" style="float: left;"></div>
        <div class="cjm-page-bottom-bar">
          <cjm-button @click="next" type="primary">下一步
            <i class="cjm-icon-chevron-down cjm-icon-rotate-n90"></i>
          </cjm-button>
          <cjm-button @click="cancel">取消</cjm-button>
        </div>
      </div>
      <div v-if="active == 1">
        <div v-if="!disabled">
          <cjm-form-item label="产品名称" class="cjm-form-item-long" prop="productID">
            <cjm-remote-select :value="productInfo.id" v-model="form.productID" :label="productInfo.name" :remote-url="productListUrl" @select="selectHandlerProduct">
              <template slot-scope="scope" class="selectName">
                {{scope.item.name}}
                <span class="cjm-option-subtitle">（编号：{{scope.item.productCode}}）</span>
              </template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="产品批次" prop="reviewEntityID" class="cjm-form-item-long" required>
            <cjm-remote-select :fetch-data="fetchDataProductBatch" :value="productBatchInfo.id" :label="productBatchInfo.name" v-model="form.reviewEntityID" @select="selectHandler"></cjm-remote-select>
          </cjm-form-item>
          <div class="cjm-page-bottom-holder" style="float: left;"></div>
        </div>
        <div v-if="disabled">
          <cjm-form-item label="产品名称" class="cjm-form-item-long" prop="productName">
            <cjm-input v-model="form.productName" disabled></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="产品批次" prop="productBatchCode" class="cjm-form-item-long" required>
            <cjm-input v-model="form.productBatchCode" disabled></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="审批结果" class="cjm-form-item-long" prop="reviewResult">
            <cjm-radio-group v-model="form.reviewResult">
              <cjm-radio :label="value" v-for="(value,key) in approvalResultsItem" disabled :key="value">{{key}}</cjm-radio>
            </cjm-radio-group>
          </cjm-form-item>
          <cjm-form-item label="审批意见" class="cjm-form-item-long" prop="reviewOpinion">
            <cjm-input type="textarea" :rows="3" v-model="form.reviewOpinion" disabled></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="审批人" class="cjm-form-item-long" prop="reviewByName">
            <cjm-input v-model="form.reviewByName" disabled></cjm-input>
          </cjm-form-item>
          <cjm-form-item label="审批时间" class="cjm-form-item-long" prop="reviewTime">
            <cjm-input v-model="form.reviewTime" disabled></cjm-input>
          </cjm-form-item>
        </div>
        <div class="cjm-page-bottom-holder" style="float: left;"></div>
        <div class="cjm-page-bottom-bar">
          <cjm-button type="primary" @click="prev">
            <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>上一步</cjm-button>
          <cjm-button @click="cancel" v-if="disabled">
            <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
          <cjm-button v-if="!disabled" @click="saveApproval" :loading="submitLoading" type="primary">
            <i class="cjm-icon-confirm"></i>确定</cjm-button>
          <cjm-button v-if="!disabled" @click="cancel">取消</cjm-button>
        </div>
      </div>
    </cjm-form>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      active: 0,
      submitLoading: false,
      disabled: false,
      productListUrl: this.$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_ORG,
      productInfo: {
        id: '',
        name: ''
      },
      productBatchInfo: {
        id: '',
        name: ''
      },
      form: {
        reviewApplyID: '',
        applyBy: '',
        applyByName: '',
        applyCorp: '',
        applyCorpName: '',
        reviewModule: '1',
        reviewEntityID: '',
        productID: '',
        level: '1',
        note: '',
        reviewResult: '',
        reviewOpinion: '',
        reviewBy: '',
        reviewByName: '',
        reviewTime: '',
        reviewConfigID: ''
      },
      rules: {
        note: [this.$formRules.maxLength(60)],
        reviewEntityID: [this.$formRules.required]
      }
    };
  },
  computed: {
    approvalModule() {
      return this.$globalData.get('trace', 'enums')['审批模块'];
    },
    approvalResultsItem() {
      return this.$globalData.get('trace', 'enums')['审批结果'];
    },
    levelItem() {
      return this.$globalData.get('trace', 'enums')['优先级'];
    }
  },
  methods: {
    selectHandler(val) {
      if (val) {
        this.productBatchInfo.id = val.id;
        this.productBatchInfo.name = val.name;
      } else {
        this.productBatchInfo.id = '';
        this.productBatchInfo.name = '';
      }
    },
    selectHandlerProduct(val) {
      if (val) {
        this.productInfo.id = val.id;
        this.productInfo.name = val.name;
      } else {
        this.productInfo.id = '';
        this.productInfo.name = '';
      }
    },
    next() {
      this.active = 1;
    },
    cancel() {
      this.popPage();
    },
    prev() {
      this.active = 0;
    },
    fetchDataProductBatch(query, callback) {
      this.$ajax
        .post(this.$globalData.get('trace', 'apiUrl').autoComplete.PRODUCT_BATCH_ORG, {
          pageSize: 50,
          keyWord: query,
          productid: this.form.productID
        })
        .then(r => {
          if (r.resultCode == '200') {
            callback(r.data);
          }
        });
    },
    saveApproval() {
      if (this.form.note != '' && this.form.note.length > 60) {
        this.$message.error('请输入小于60字符的描述');
        return;
      }
      if (this.form.reviewEntityID == '') {
        this.$message.error('请选择产品批次');
        return;
      }
      this.submitLoading = true;
      this.$ajax.post(this.$globalData.get('trace', 'apiUrl').approval.SAVE_APPLY, this.form).then(data => {
        if (data.resultCode != 200) {
          this.submitLoading = false;
          this.$message.error(data.msg);
        } else {
          this.popPage();
        }
      });
    },
    //审批申请详细信息
    getApply(reviewApplyID) {
      this.$ajax.post(this.$globalData.get('trace', 'apiUrl').approval.GET_APPLY, { reviewApplyID: reviewApplyID }).then(data => {
        if (data.resultCode == 200) {
          this.form = data.data;
        }
        this.form.applyBy = this.$globalData.get('currentUser').userID;
        this.form.applyByName = this.$globalData.get('currentUser').userName;
        this.form.applyCorpName = this.$globalData.get('currentUser').corpName;
        this.form.applyCorp = this.$globalData.get('currentUser').corpID;
      });
    }
  },
  created() {
    if (this.getPageParams('addApproval') && this.getPageParams('addApproval').type == 'view') {
      this.disabled = true;
      this.getApply(this.getPageParams('addApproval').reviewApplyID);
    }
    this.form.applyBy = this.$globalData.get('currentUser').userID;
    this.form.applyByName = this.$globalData.get('currentUser').userName;
    this.form.applyCorpName = this.$globalData.get('currentUser').corpName;
    this.form.applyCorp = this.$globalData.get('currentUser').corpID;
    this.$ajax.post(this.$globalData.get('trace', 'apiUrl').approval.GET_REVIEW_CONFIGID).then(r => {
      if (r.resultCode == 200) {
        this.form.reviewConfigID = r.data.reviewConfigID;
      } else {
        this.$message.error(r.msg);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.node-steps {
  margin-bottom: 20px;
}

.product-select {
  width: 500px;
  margin: 100px auto 80px;
  position: relative;
  left: -30px;
}
</style>
