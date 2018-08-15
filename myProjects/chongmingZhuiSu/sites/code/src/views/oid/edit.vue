<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="中国OID码" required>
      <cjm-input value="1.2.156" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="商务部OID码" required>
      <cjm-input value="366" :disabled="true"></cjm-input>
    </cjm-form-item>
    <cjm-form-item label="行业分配码" prop="distributionCode" required>
      <cjm-enum-select v-model="form.distributionCode" enum-name="OID行业分配码" enum-namespace="code"></cjm-enum-select>
    </cjm-form-item>
    <cjm-form-item label="追溯方式码" prop="tracePurposeCode" required class="cjm-form-item-long">
      <cjm-input v-model="form.tracePurposeCode" :disabled="true" style="width:220px;"></cjm-input>
      <p class="zsmGeShiWei-title">百位数字</p>
      <cjm-radio-group v-model="zsmBaiWei">
        <cjm-radio :label="value" v-for="(value,key) in zsmBaiWeiEnums" :key="value">{{key}}</cjm-radio>
      </cjm-radio-group>
      <p class="zsmGeShiWei-title">十位与个位数字</p>
      <div class="clear">
        <cjm-radio-group class="zsmGeShiWei-radio" v-model="zsmGeShiWei">
          <cjm-radio v-for="key in Object.keys(zsmGeShiWeiEnums).slice(0,5)" :label="zsmGeShiWeiEnums[key]" :key="zsmGeShiWeiEnums[key]">{{key}}</cjm-radio>
        </cjm-radio-group>
        <cjm-radio-group class="zsmGeShiWei-radio" v-model="zsmGeShiWei">
          <cjm-radio v-for="key in Object.keys(zsmGeShiWeiEnums).slice(5,10)" :label="zsmGeShiWeiEnums[key]" :key="zsmGeShiWeiEnums[key]">{{key}}</cjm-radio>
        </cjm-radio-group>
        <cjm-radio-group class="zsmGeShiWei-radio" v-model="zsmGeShiWei">
          <cjm-radio v-for="key in Object.keys(zsmGeShiWeiEnums).slice(10,15)" :label="zsmGeShiWeiEnums[key]" :key="zsmGeShiWeiEnums[key]">{{key}}</cjm-radio>
        </cjm-radio-group>
      </div>
    </cjm-form-item>
    <cjm-form-item label="OID码预览" class="cjm-form-item-long">
      <cjm-input :value="'1.2.156.366.'+form.distributionCode+ '.'+form.tracePurposeCode" :disabled="true"></cjm-input>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      form: {},
      rules: {
        distributionCode: [this.$formRules.required],
        tracePurposeCode: [this.$formRules.required]
      }
    };
  },
  computed: {
    zsmBaiWei: {
      get() {
        return this.form.tracePurposeCode.substr(0, 1);
      },
      set(val) {
        this.form.tracePurposeCode = val + this.form.tracePurposeCode.substr(1, 2);
      }
    },
    zsmGeShiWei: {
      get() {
        return this.form.tracePurposeCode.substr(1, 2);
      },
      set(val) {
        this.form.tracePurposeCode = this.form.tracePurposeCode.substr(0, 1) + val;
      }
    },
    zsmBaiWeiEnums() {
      return this.enums['OID追溯方式码百位'];
    },
    zsmGeShiWeiEnums() {
      return this.enums['OID追溯方式码十位个位'];
    }
  },
  methods: {
    editForm(productIDs) {
      this.reset();
      this.form.productIDs = productIDs;
      if (productIDs.length >= 1) {
        this.$ajax
          .get(this.apiUrl.oid.GET, { productID: productIDs[0] })
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
      }
    },
    reset() {
      this.form = {
        productIDs: [],
        distributionType: '0',
        distributionCode: '10001',
        tracePurposeCode: '206',
        isUseRegionCode: '0',
        isUsedomainCode: '0'
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.apiUrl.oid.SAVE, this.form).then(r => {
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
.zsmGeShiWei-title {
  color: #999;
}
.zsmGeShiWei-radio {
  float: left;
  margin-right: 15px;

  & > label {
    display: block;
    line-height: 28px;
  }
}
</style>
