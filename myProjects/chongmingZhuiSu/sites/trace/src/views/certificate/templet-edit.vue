<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item v-for="(templet,index) in form.datas" :label="templet.name" class="cjm-form-item-long" :key="index">
        <div class="templet-x">x</div>
        <cjm-input v-model="templet.x" class="templet-input"></cjm-input>
        <div class="templet-y">y</div>
        <cjm-input v-model="templet.y" class="templet-input"></cjm-input>
        <div class="templet-size">字号</div>
        <cjm-input v-model="templet.size" class="templet-input"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="安全保障方式" prop="type" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="type">
          <cjm-checkbox :label="value" v-for="(value,key) in certificateType" :key="value" @change="setCertificateType(value,key)">{{key}}
          </cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
      <cjm-form-item v-for="(certificateType,index) in certificateTypes" :label="certificateType.name" class="cjm-form-item-long" :key="index">
        <div class="templet-x">x</div>
        <cjm-input v-model="certificateType.x" class="templet-input"></cjm-input>
        <div class="templet-y">y</div>
        <cjm-input v-model="certificateType.y" class="templet-input"></cjm-input>
        <div class="templet-size">字号</div>
        <cjm-input v-model="certificateType.size" class="templet-input"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="标签宽高" required class="cjm-form-item-long">
        <div class="templet-x">宽</div>
        <cjm-input v-model="form.backgroundWidth" class="templet-input"></cjm-input>
        <div class="templet-y">高</div>
        <cjm-input v-model="form.backgroundHeight" class="templet-input"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="预览底图" required prop="backgroundUrl" class="cjm-form-item-long">
        <cjm-image-upload v-model="form.backgroundUrl" tips="建议上传图片无边框"></cjm-image-upload>
      </cjm-form-item>
      <cjm-form-item label="模板名称" prop="templetName" required>
        <cjm-input v-model="form.templetName" placeholder="请输入模板名称"></cjm-input>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {},
      type: [],
      certificateTypes: [],
      rules: {
        templetName: [this.$formRules.required, this.$formRules.maxLength(40)]
      },
      oldForm: {},
      oldCertificateTypes: {}
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
        var invalid = /^\d+(\.\d+)?$/;
        for (let i = 0; i < this.form.datas.length; i++) {
          let obj = this.form.datas[i];
          if (obj.x != '' || obj.y != '' || obj.size != '') {
            if (!invalid.test(obj.x) || !invalid.test(obj.y) || !invalid.test(obj.size)) {
              throw new Error('请输入正确数字');
            }
          }
        }
        for (let j = 0; j < this.certificateTypes.length; j++) {
          let obj = this.certificateTypes[j];
          if (obj.x != '' || obj.y != '' || obj.size != '') {
            if (!invalid.test(obj.x) || !invalid.test(obj.y) || !invalid.test(obj.size)) {
              throw new Error('请输入正确数字');
            }
          }
        }
        this.form.datas.push.apply(this.form.datas, this.certificateTypes);
        return this.$ajax.post(this.$globalData.get('trace', 'apiUrl').certificate.SAVE_TEMPLTE, this.form).then(data => {
          if (data.resultCode != '200') {
            throw new Error(data.msg);
          }
        });
      });
    },
    reset() {
      this.form = {
        templetID: '',
        templetName: '',
        datas: [
          { x: '', y: '', size: '', name: '产品名称', id: 'ProductName' },
          { x: '', y: '', size: '', name: '品种', id: 'ClassifyName' },
          { x: '', y: '', size: '', name: '重量', id: 'Weight' },
          { x: '', y: '', size: '', name: '生产日期', id: 'DateManufacture' },
          { x: '', y: '', size: '', name: '生产单位', id: 'SignName' },
          { x: '', y: '', size: '', name: '公司名称', id: 'OrgName' },
          { x: '', y: '', size: '', name: '法人代表', id: 'LegalPepole' },
          { x: '', y: '', size: '', name: '联系电话', id: 'Phone' },
          { x: '', y: '', size: '', name: '地址', id: 'Address' }
        ],
        backgroundHeight: '',
        backgroundWidth: '',
        backgroundUrl: ''
      };
      this.certificateTypes = [];
      this.type = [];
      this.$nextTick(function() {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
    },
    editForm(templetID) {
      this.reset();
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').certificate.GET_TEMPLTE, {
          templetID: templetID
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form.templetID = templetID;
            this.form.templetName = r.data.templetName;
            this.form.backgroundHeight = r.data.backgroundHeight;
            this.form.backgroundWidth = r.data.backgroundWidth;
            this.form.backgroundUrl = r.data.backgroundUrl;
            var self = this.form.datas;
            var securityType = this.certificateTypes;
            var type = this.type;
            r.data.rows.map(function(currentValue) {
              self.map(function(obj2) {
                if (obj2.id == currentValue.id) {
                  obj2.x = currentValue.x;
                  obj2.y = currentValue.y;
                  obj2.size = currentValue.size;
                }
              });
              var name = '';
              var id = '';
              if (currentValue.id == 'CertificateType0') {
                name = '自检合格';
                id = 'CertificateType0';
                type.push('0');
              } else if (currentValue.id == 'CertificateType1') {
                name = '委托检测合格';
                id = 'CertificateType1';
                type.push('1');
              } else if (currentValue.id == 'CertificateType2') {
                name = '质量控制合格';
                id = 'CertificateType2';
                type.push('2');
              } else if (currentValue.id == 'CertificateType3') {
                name = '自我承诺合格';
                id = 'CertificateType3';
                type.push('3');
              }
              if (name != '' && id != '') {
                securityType.push({
                  x: currentValue.x,
                  y: currentValue.y,
                  size: currentValue.size,
                  name: name,
                  id: id
                });
              }
            });
            this.oldForm = Object.deepClone(this.form);
            this.oldCertificateTypes = Object.deepClone(this.certificateTypes);
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch();
    },
    printView() {
      var newDatas = this.form.datas.concat(this.certificateTypes);
      return newDatas;
    },
    setCertificateType(value, key) {
      var self = this.certificateTypes;
      for (let i = 0; i < self.length; i++) {
        let obj = self[i];
        if (obj.name == key) {
          self.splice(parseInt(i), 1);
        }
      }
      this.type.map(function(t) {
        if (t == value) {
          self.push({ x: '', y: '', size: '', name: key, id: 'CertificateType' + value });
        }
      });
    }
  }
};
</script>

<style scoped>
.templet-x {
  float: left;
  text-align: right;
  padding-right: 5px;
}

.templet-y {
  float: left;
  width: 30px;
  text-align: right;
  padding-right: 5px;
}

.templet-size {
  float: left;
  width: 50px;
  text-align: right;
  padding-right: 5px;
}

.templet-input {
  width: 80px;
  float: left;
}

.only-for-print {
  display: none;
}
</style>
