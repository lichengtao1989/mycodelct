<template>
  <div>
    <nz-form label-width="150px" ref="form" :model="form" :rules="rules">
      <nz-form-item label="小票标题" prop="title">
        <nz-input v-model="form.title"></nz-input>
      </nz-form-item>
      <nz-form-item label="内容设置" prop="checkAll">
        <nz-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</nz-checkbox>
        <div class="config-div">
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.orderType" class="config-check" @change="handleCheckChange">单据类型</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.orderCode" class="config-check" @change="handleCheckChange">销售单号</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.orderDate" class="config-check" @change="handleCheckChange">单据日期</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.customerName" class="config-check" @change="handleCheckChange">客户姓名</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.manufacturer" class="config-check" @change="handleCheckChange">生产厂家</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.waitPaid" class="config-check" @change="handleCheckChange">原价总计(元)</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.discount" class="config-check" @change="handleCheckChange">优惠后金额(元)</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.payment" class="config-check" @change="handleCheckChange">实付金额(元)</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.change" class="config-check" @change="handleCheckChange">找零/欠款(元)</nz-checkbox>
          </div>
          <div class="config-check-div">
            <nz-checkbox v-model="form.details.prescriptionOrder" class="config-check" @change="handleCheckChange">处方信息</nz-checkbox>
          </div>
          <div class="config-check-div-long">
            <nz-checkbox v-model="form.details.footer1Check" class="config-check-long" @change="handleCheckChange">
              <nz-input v-model="form.details.footer1" class="print-footer"></nz-input>
            </nz-checkbox>
          </div>
          <div class="config-check-div-long">
            <nz-checkbox v-model="form.details.footer2Check" class="config-check-long" @change="handleCheckChange">
              <nz-input v-model="form.details.footer2" class="print-footer"></nz-input>
            </nz-checkbox>
          </div>
          <div class="config-check-div-long">
            <nz-checkbox v-model="form.details.print" class="config-check-long" @change="handleCheckChange">
              打印小票数量(欠款的时候打印的小票数)：
              <nz-input v-model="form.details.printNum" class="printNum"></nz-input>
            </nz-checkbox>
          </div>
        </div>
      </nz-form-item>
    </nz-form>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.USER;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      loadData: false,
      checkAll: true,
      form: {
        title: '',
        smallTicketConfigID: '',
        details: {
          orderType: true,
          orderCode: true,
          orderDate: true,
          customerName: true,
          waitPaid: true,
          discount: true,
          payment: true,
          change: true,
          manufacturer: false,
          prescriptionOrder: true,
          footer1Check: true,
          footer2Check: true,
          footer1: '谢谢光顾，欢迎下次光临！',
          footer2: '服务电话：18888888888',
          print: true,
          printNum: 2
        }
      }
    };
  },
  watch: {},
  methods: {
    validatorCode(t, e, callback) {
      let patrn = /^[0-9A-Za-z]+$/;
      if (e != null && e.length > 0) {
        if (e.length != 18 || patrn.test(e) == false) {
          return callback(new Error('请输入正确的身份证号'));
        }
      }
      return callback();
    },
    async save() {
      const valid = await this.$validForm(this.$refs.form);
      if (valid) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE_PRINT_TEMPLET, this.form);
        return { valid, err, res };
      } else {
        return { valid };
      }
    },
    handleCheckAllChange(val) {
      if (val) {
        for (let i in this.form.details) {
          if (typeof this.form.details[i] == 'boolean') {
            this.form.details[i] = true;
          }
        }
      } else {
        for (let i in this.form.details) {
          if (typeof this.form.details[i] == 'boolean') {
            this.form.details[i] = false;
          }
        }
      }
    },
    handleCheckChange(val) {
      let isCheckAll = true;
      if (!val) {
        this.checkAll = false;
      }
      for (let i in this.form.details) {
        if (!this.form.details[i]) {
          this.checkAll = false;
          isCheckAll = false;
        }
      }
      if (isCheckAll) {
        this.checkAll = true;
      }
    },
    async addFrom(smallTicketConfigID) {
      this.form.smallTicketConfigID = smallTicketConfigID;
      let data = {
        smallTicketConfigID: smallTicketConfigID
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.GET_PRINT_TEMPLET, data);
      if (res.resultCode == 200) {
        this.form = res.data;
      } else {
        this.$message.showError(err);
      }
      let isCheckAll = true;
      for (let i in this.form.details) {
        if (!this.form.details[i]) {
          this.checkAll = false;
          isCheckAll = false;
        }
      }
      if (isCheckAll) {
        this.checkAll = true;
      }
    }
  },
  created() {}
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
}
.register-wrap {
  text-align: center;
}
.register-main {
}
h1 {
  color: #00a88a;
  font-size: 30px;
  font-weight: lighter;
  text-align: center;
  margin: 35px 0 80px;
}
.confirm-bottom {
  text-align: center;
  margin-top: 20px;
}
.config-div {
  width: 100%;
  box-sizing: border-box;
}
.config-check-div {
  width: 50%;
  float: left;
}
.config-check {
  float: left;
  margin-left: 0px;
}
.config-check-div-long {
  width: 100%;
  float: left;
}
.config-check-long {
  float: left;
  margin-left: 0px;
  margin-bottom: 10px;
}
.print-footer {
  width: 250px;
}
.printNum {
  width: 100px;
}
</style>
