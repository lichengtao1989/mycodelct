<template>
  <div style="background-color: #fff;">
    <nz-scrollbar style="min-height:700px;">
      <div class="nz-list">
        <div class="drive-settings">
          <nz-enum-select v-model="driveSettings" isRadioBtn :options="$enum('驱动设置').values"></nz-enum-select>
        </div>
        <div v-if="driveSettings == 1">
          <div class="delete-batch">
            <nz-button @click="downloadPrint" class="nz-bottom-border">
              <i class="nz-icon-download"></i>下载驱动</nz-button>
          </div>
          <div>
            <nz-form label-width="150px" ref="form" style="width:600px;" :model="form" :rules="rules">
              <nz-form-item label="小票打印驱动" prop="deviceID" required>
                <nz-select v-model="form.deviceID" filterable clearable placeholder="请选择打印驱动" @change="getDeviceName">
                  <nz-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id"></nz-option>
                </nz-select>
              </nz-form-item>
              <nz-form-item label="打印模式" prop="printModel">
                <nz-enum-select v-model="form.printModel" is-radio :options="$enum('打印模式').values"></nz-enum-select>
              </nz-form-item>
              <nz-form-item style="text-align: center;margin-top: 30px;">
                <nz-button type="primary" :loading="isRegister" @click="save">确 定</nz-button>
              </nz-form-item>
            </nz-form>
          </div>
        </div>
        <div v-if="driveSettings == 2">
          <div class="delete-batch">
            <nz-button @click="downloadIDCard" class="nz-bottom-border">
              <i class="nz-icon-download"></i>下载识读驱动</nz-button>
            <idcard-details></idcard-details>
          </div>
        </div>
      </div>
    </nz-scrollbar>
  </div>
</template>
<script>
import lodopFuncs from '../../../../static/print/lodopFuncs';
import idcardDetails from './details.vue';
export default {
  components: {
    idcardDetails
  },
  data() {
    let apiUrl = this.$apiUrl.USER;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      deviceList: [],
      driveSettings: '1',
      LODOP: '',
      form: {
        userPrintConfigID: '',
        deviceID: '',
        deviceName: '',
        printModel: '1'
      },
      rules: {
        deviceID: [this.$formRules.required]
      }
    };
  },
  methods: {
    async save() {
      this.LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER', this.form.deviceID);
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE_USER_PRINT_CONFIG, this.form);
        if (res.resultCode == 200) {
          this.$message.success('保存成功');
          if (res.msg == '保存成功') {
            this.form.userPrintConfigID = res.data;
          }
        } else {
          this.$message.showError(err);
        }
      }
    },
    getDeviceName(item) {
      this.deviceList.forEach(v => {
        if (v.id == item) {
          this.form.deviceName = v.name;
        }
      });
    },
    //下载打印控件
    async downloadPrint() {
      if (window.attachEvent) {
        window.open('../../../../static/print/install_lodop32.zip');
      } else {
        window.open('../../../../static/print/CLodop_Setup_for_Win32NT.zip');
      }
    },
    //下载身份证驱动
    async downloadIDCard() {
      window.open('../../../../static/idcard/IDCard.zip');
    },
    async createPrinterList() {
      let iPrinterCount = this.LODOP.GET_PRINTER_COUNT();
      for (let index = 0; index < iPrinterCount; index++) {
        let printerName = this.LODOP.GET_PRINTER_NAME(index);
        this.deviceList.push({
          id: index,
          name: printerName
        });
      }
      await this.$nextTick();
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET_USER_PRINT_CONFIG);
      if (res.resultCode == 200) {
        if (res.data != null) {
          res.data.deviceID = parseInt(res.data.deviceID);
          this.form = res.data;
        }
      } else {
        this.$message.showError(err);
      }
    }
  },
  async mounted() {},
  async created() {
    let self = this;
    setTimeout(function() {
      self.LODOP = lodopFuncs.getLodop();
      if (self.LODOP == null || typeof self.LODOP.VERSION == 'undefined') {
        self.download = false;
      } else {
        self.createPrinterList();
      }
    }, 1000);
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
  width: 500px;
  display: inline-block;
  margin-top: 40px;
}
.register-wrap {
  text-align: center;
}
.register-main {
}
.nz-list {
  min-height: 700px;
  padding: 40px 20px;
  background-color: #fff;
}
.drive-settings {
  margin-bottom: 40px;
}
</style>