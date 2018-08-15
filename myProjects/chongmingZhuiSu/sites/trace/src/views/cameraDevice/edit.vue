<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-tabs v-model="activeName" @tab-click="handleClick">
      <cjm-tab-pane :label="labelName" name="1">
        <cjm-form-item label="设备名称" prop="deviceName" required>
          <cjm-input v-model="form.deviceName" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="所属企业" prop="orgID" v-model="form.orgID" required>
          <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.ORG" :label="form.orgName" v-model="form.orgID">
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="设备类型" prop="typeID" v-model="form.typeID">
          <cjm-remote-select :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.DEVICE" :label="form.inputsName" v-model="form.typeID">
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="负责人" prop="manager">
          <cjm-input v-model="form.manager" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="生产厂商" prop="productionBy">
          <cjm-input v-model="form.productionBy" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="手机号" prop="tel">
          <cjm-input v-model="form.tel"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="生产日期" prop="productionDate">
          <cjm-date-picker v-model="form.productionDate"></cjm-date-picker>
        </cjm-form-item>
        <cjm-form-item label="备注" prop="note" class="cjm-form-item-long">
          <cjm-input type="textarea" :rows="3" v-model="form.note">
          </cjm-input>
        </cjm-form-item>
      </cjm-tab-pane>
      <cjm-tab-pane label="设备参数" name="2">
        <cjm-form-item label="塞尚编号" prop="saiShangCode">
          <cjm-input v-model="form.saiShangCode" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="设备编号" prop="deviceCode" required>
          <cjm-input v-model="form.deviceCode" :maxlength="50"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="设备状态" prop="status" required>
          <cjm-radio-group v-model="form.status">
            <cjm-radio :label="value" v-for="(value,key) in enabledOrDisabled" :key="value">{{key}}</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
        <cjm-form-item label="H5推流地址" prop="h5Url" class="cjm-form-item-long">
          <cjm-input v-model="form.h5Url"></cjm-input>
        </cjm-form-item>
      </cjm-tab-pane>
    </cjm-tabs>
  </cjm-form>
</template>

<script>
export default {
  data: function() {
    return {
      form: {},
      activeName: '1',
      labelName: '新增设备',
      rules: {
        deviceName: [this.$formRules.required, this.$formRules.maxLength(50)],
        orgID: [this.$formRules.required],
        manager: [this.$formRules.maxLength(50)],
        productionBy: [this.$formRules.maxLength(50)],
        tel: [this.$formRules.mobile],
        saiShangCode: [this.$formRules.maxLength(50)],
        deviceCode: [this.$formRules.required, this.$formRules.maxLength(50)],
        h5Url: [this.$formRules.url]
      }
    };
  },
  computed: {
    enabledOrDisabled() {
      return this.$globalData.get('base', 'enums')['启用禁用'];
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$ajax.post(this.$globalData.get('trace', 'apiUrl').cameraDevice.SAVE, this.form).then(data => {
          if (data.resultCode != 200) {
            throw new Error(data.msg);
          }
        });
      });
    },
    reset() {
      this.form = {
        deviceName: '',
        deviceID: '',
        orgID: '',
        orgName: '',
        typeID: '',
        inputsName: '',
        manager: '',
        productionBy: '',
        tel: '',
        productionDate: '',
        note: '',
        saiShangCode: '',
        deviceCode: '',
        status: '1',
        h5Url: ''
      };
      this.activeName = '1';
      this.$nextTick(function() {
        this.$refs.form.resetFields();
      });
    },
    addForm() {
      this.reset();
    },
    editForm(deviceID, isCopy) {
      this.reset();
      this.labelName = '编辑设备';
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').cameraDevice.GET_LIST, {
          deviceID: deviceID
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.form = r.data.rows[0];
            if (isCopy == 1) {
              this.form.deviceID = '';
              this.form.deviceCode = '';
            }
          } else {
            this.$message.error(r.data.msg);
          }
        })
        .catch();
    },
    handleClick() {
      if (this.form.deviceName == '') {
        this.$message.error('请输入设备名称');
        this.$nextTick(() => {
          this.activeName = '1';
        });
        return;
      } else if (this.form.orgID == '') {
        this.$message.error('请选择所属企业');
        this.$nextTick(() => {
          this.activeName = '1';
        });
        return;
      }
      this.$emit('step', this.activeName);
    }
  },
  created() {
    this.reset();
  }
};
</script>

<style scoped>

</style>
