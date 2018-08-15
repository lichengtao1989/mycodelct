<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="选择模板" prop="templetID" required class="cjm-form-item-long">
        <cjm-select v-model="templetID" placeholder="请选择">
          <cjm-option v-for="item in templetItems" :key="item.templetID" :label="item.templetName" :value="item.templetID"></cjm-option>
        </cjm-select>
      </cjm-form-item>
      <cjm-form-item label="打印数量" prop="printNumber" required style="clear: both;">
        <cjm-input v-model="form.printNumber"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="产品名称" prop="productName">
        <cjm-input v-model="form.productName" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="品种" prop="classifyName">
        <cjm-input v-model="form.classifyName" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="重量" prop="weight">
        <cjm-input v-model="form.weight" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="安全保障方式" prop="certificateTypes" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="form.certificateTypes">
          <cjm-checkbox :label="value" v-for="(value,key) in certificateType" :key="value" disabled>{{key}}
          </cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
      <cjm-form-item label="生产日期" prop="dateManufacture">
        <cjm-input v-model="form.dateManufacture" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="生产单位签名" prop="signName">
        <cjm-input v-model="form.signName" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="企业名称" prop="orgName">
        <cjm-input v-model="form.orgName" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="法人" prop="legalPepole">
        <cjm-input v-model="form.legalPepole" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="联系电话" prop="phone">
        <cjm-input v-model="form.phone" disabled></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="联系地址" prop="address">
        <cjm-input v-model="form.address" disabled></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {},
      templetID: '',
      templetItems: [],
      backgroundHeight: '',
      backgroundWidth: '',
      rules: {
        printNumber: [this.$formRules.required, this.$formRules.number]
      }
    };
  },
  computed: {
    certificateType() {
      return this.$globalData.get('trace', 'enums')['安全保障方式'];
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        if (this.templetID == '') {
          throw new Error('请选择打印模板');
        }
        this.form.templetID = this.templetID;
        return this.$ajax.post(this.$globalData.get('trace', 'apiUrl').certificate.SAVE, this.form).then(data => {
          if (data.resultCode != '200') {
            throw new Error(data.msg);
          }
        });
      });
    },
    reset() {
      this.form = {
        printNumber: ''
      };
      this.templetItems = [];
      this.templetID = '';
      this.$nextTick(function() {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
    },
    editForm(id) {
      this.reset();
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').certificate.GET, {
          id: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data;
            this.getTempletList();
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    },
    printView() {
      return new Promise((resolve, reject) => {
        if (this.templetID != '') {
          this.$ajax
            .get(this.$globalData.get('trace', 'apiUrl').certificate.GET_TEMPLTE, {
              templetID: this.templetID
            })
            .then(r => {
              console.log(r);
              if (r.resultCode == 200) {
                var newDatas = r.data;
                //                this.backgroundHeight = r.data.backgroundHeight;
                //                this.backgroundWidth = r.data.backgroundWidth;
                resolve(newDatas);
              } else {
                this.$message.error(r.msg);
              }
            })
            .catch();
        } else {
          this.$message.error('请选择打印模板');
        }
      });
    },
    getTempletList() {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').certificate.GET_TEMPLTE_LIST, {
          pageSize: 1000
        })
        .then(r => {
          if (r.resultCode == 200) {
            for (let i = 0; i < r.data.rows.length; i++) {
              let obj = r.data.rows[i];
              this.templetItems.push({
                templetName: obj.templetName,
                templetID: obj.templetID
              });
            }
            this.backgroundHeight = r.backgroundHeight;
            this.backgroundWidth = r.backgroundWidth;
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    }
  }
};
</script>

<style scoped>
.only-for-print {
  display: none;
}
</style>
