<template>
  <div class="clear commonbom" v-if="currentPageInfo.isInsureLogin != 1">
    <cjm-form-item label="投保产品" prop="productID" required class="cjm-form-item-long">
      <cjm-select-multiple v-model="form.insureApplicationDetail.productID" :options="productSelectList" :disabled="currentPageInfo.isInsureLogin == '1' ||currentPageInfo.pageType==='view'" :placeholder="placeholder">
        <!-- <cjm-option v-for="value in productSelectList" :key="value.id" :label="value.name" :value="value.id">{{value.name}}</cjm-option> -->
      </cjm-select-multiple>
    </cjm-form-item>
    <cjm-form-item label="险种" prop="insureType">
      <cjm-input v-model="form.insureApplicationDetail.insureType" disabled></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="码的单价" prop="productSell">
      <cjm-input v-model="form.insureApplicationDetail.productSell" disabled></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="投保数量" prop="productNumber" required>
      <cjm-input v-model="form.insureApplicationDetail.productNumber" :disabled="currentPageInfo.pageType==='view' || currentPageInfo.isInsureLogin == 1"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="保费计算" prop="premium">
      <cjm-input v-model="form.insureApplicationDetail.premium" disabled></cjm-input>
    </cjm-form-item>
  </div>
  <div class="clear commonbom" v-else>
    <cjm-form-item label="投保产品" prop="productID" required class="cjm-form-item-long">
      <ul class="product-name">
        <li v-for="(item,key) in form.insureApplicationDetail.productName" :key="key">{{item}}
          <div class="back-slash" v-if="key > 0">/</div>
        </li>
      </ul>
    </cjm-form-item>
    <cjm-form-item label="险种" prop="insureType">
      {{form.insureApplicationDetail.insureType}}
    </cjm-form-item>
    <cjm-form-item label="码的单价" prop="productSell">
      {{form.insureApplicationDetail.productSell}}
    </cjm-form-item>
    <cjm-form-item label="投保数量" prop="productNumber">
      {{form.insureApplicationDetail.productNumber}}
    </cjm-form-item>
    <cjm-form-item label="保费计算" prop="premium">
      {{form.insureApplicationDetail.premium}}
    </cjm-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      pageType: 'edit',
      placeholder: '仅显示经三方检测的产品',
      productID: []
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    },
    productSelectList: {
      type: Array
    }
  },
  watch: {
    'form.insureType': function() {
      if (this.form.insureType == '1') {
        this.placeholder = '仅显示经三方检测的产品';
      } else {
        this.placeholder = '请选择产品';
      }
    },
    'form.insureApplicationDetail.productNumber': function() {
      let insureApplicationDetail = this.form.insureApplicationDetail;
      if (insureApplicationDetail.productNumber > 0 && insureApplicationDetail.productNumber.length < 15) {
        if (insureApplicationDetail.productNumber % 1 === 0) {
          insureApplicationDetail.premium = (insureApplicationDetail.productNumber * insureApplicationDetail.productSell).toFixed(2);
        } else {
          insureApplicationDetail.productNumber = '';
          insureApplicationDetail.premium = '';
          this.$message('请输入正确的投保数量');
        }
      } else {
        insureApplicationDetail.productNumber = '';
        insureApplicationDetail.premium = '';
        this.$message('请输入正确的投保数量');
      }
    }
  },
  computed: {
    insurance() {
      return this.$globalData.get('trace', 'enums')['保险类型'];
    }
  },
  methods: {},
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../../assets/css/config';

.add-application-wrap {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2px;
}

.add-application {
  text-align: center;
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
}
.total-count {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
  margin-bottom: 30px;
  box-sizing: border-box;
}
.total-count-span {
  font-size: 14px;
  width: 60px;
  text-align: center;
  float: left;
}
.total-count-val {
  padding-left: 12px;
  float: left;
  font-size: 13px;
}
.commonbom {
  margin-bottom: 20px;
}
.product-name li {
  float: left;
  padding-right: 5px;
}
.back-slash {
  float: left;
  padding-right: 5px;
}
</style>
