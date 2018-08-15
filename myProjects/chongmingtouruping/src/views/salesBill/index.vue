<template>
  <div class="purchaseoutlct">
    <add-edit-dialog ref="dialog" @save="savePrescription" :infoVal="form.FarmStoreSale_PesticideList"></add-edit-dialog>
    <dialog-code ref="dialogcode" @save-success="refresh" @postData="refreshGetData"></dialog-code>
    <div class="listwrap">
      <div class="idcard">
        <nz-button type="primary" style="margin-bottom: 10px;" @click="startFun">
          <span>识读身份证</span>
        </nz-button>
      </div>
      <div class="topin">
        <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
          <nz-form-item label="购买人" prop="FarmerID">
            <nz-remote-select v-model="form.FarmerID" class="cusotmer-input" :label="form.ChargePerson" :remote-url="$apiUrl.COMMON.DROP_DOWN.FARMER" placeholder="请选择购买人" @select="clickItemFarmer">
            </nz-remote-select>
          </nz-form-item>
          <nz-form-item label="身份证号" prop="ChargePersonIDCode">
            <nz-input v-model="farmerInfo.ChargePersonIDCode" readonly="true"></nz-input>
          </nz-form-item>
          <nz-form-item label="联系电话" prop="PhoneNum">
            <nz-input v-model="farmerInfo.PhoneNum" readonly="true"></nz-input>
          </nz-form-item>
          <nz-form-item label="搜索商品" v-if="!productModel" prop="PesticideName">
            <!-- v-model="form.PesticideName" -->
            <nz-remote-select v-model="PesticideName" class="cusotmer-input" :remote-url="$apiUrl.COMMON.DROP_DOWN.PESTICIDEINFO" placeholder="请选择商品" @select="clickItem">
            </nz-remote-select>
            <nz-button @click="switching" type="text" class="input-mode">
              <i class="nz-icon-switching count-span"></i>输入模式
            </nz-button>
          </nz-form-item>
          <nz-form-item label="搜索商品" v-else prop="productBarCode" ref="scanProduct" class="scan-code">
            <nz-input v-model="productBarCode" :autofocus="productModel" placeholder="请扫描商品" class="cusotmer-input" @keyup.enter.native="clickItem2"></nz-input>
            <nz-button @click="switching" type="text" class="input-mode">
              <i class="nz-icon-switching count-span"></i>扫码模式
            </nz-button>
          </nz-form-item>
        </nz-form>
      </div>
      <div class="nexttable">
        <table class="index-list" style="width:100%;">
          <thead>
            <tr>
              <th v-for="(item,index) in columns" :key="index">{{item.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in form.FarmStoreSale_PesticideList" :key="item.PesticideId">
              <td>
                <span class="mc">{{item.RegisteCode}}</span>
              </td>
              <td>
                {{item.ProductName}}
              </td>
              <td>
                <!-- <nz-input placeholder="数量" v-model="item.num"></nz-input> -->
                {{item.SpecQuantity}}{{item.SpecUnit}}/{{item.SpecType}}
              </td>
              <td>
                <nz-input placeholder="数量" v-model="item.Amount"></nz-input>
              </td>
              <td>
                <!-- <nz-input placeholder="单位" v-model="item.SpecUnit"></nz-input> -->
                {{item.SpecUnit}}
              </td>
              <td>
                <!-- <nz-input placeholder="单价(元)" v-model="item.SaleUnitPrice"></nz-input> -->
                {{item.SaleUnitPrice}}
              </td>
              <td>
                {{sumFn(item.SaleUnitPrice, item.Amount)}}
                <!-- <nz-input placeholder="小计" v-model="item.total"></nz-input> -->
              </td>
              <td>
                <span class="nztextbtn" @click="showDialogCode(item,index)">农药码</span>
                <span class="nztextbtn" @click="delFn(index)">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="listvalout">
        <billsum :dataAry='form.FarmStoreSale_PesticideList' :subsidy="subsidy" ref="billsum"></billsum>
      </div>
      <div class="prescriptionout">
        <prescription @editPrescriptionList="editPrescriptionList" @lookPrescription="lookPrescription" @delPrescriptionList="delPrescriptionList" :infoAry="prescriptionList"></prescription>
      </div>
      <div class="nextbtn">
        <nz-checkbox class="bot3" v-model="isPrint">打印小票</nz-checkbox>
        <nz-button type="primary" size="small" @click="putIn" class="bot3">
          <i class="nz-icon-confirm"></i>
          生产销售单
        </nz-button>
        <nz-button size="small" class="bot3" @click="cancelJump">
          <i class="nz-icon-close"></i>
          取消
        </nz-button>
      </div>
    </div>
  </div>
</template>
<script>
import addEditDialog from './dialog';
import dialogCode from './dialogcode';
import billsum from './billsum';
import prescription from './prescription';
import lodopFuncs from '@static/print/lodopFuncs';
import ticketTpl from './ticket.ejs';
import _ from 'underscore';
export default {
  data() {
    return {
      rules: {
        customerID: [{ required: true, message: '请选择购买人', trigger: 'blur' }]
      },
      prescriptionList: {},
      myindex: '',
      farmerInfo: {
        RelationPersonIDCode: '',
        RelationPersonPhoneNum: ''
      },
      userInfo: {},
      subsidy: 0,
      PesticideName: '',
      productBarCode: '',
      listAry: [],
      columns: [{ name: '农药登记号' }, { name: '投入品名称' }, { name: '规格' }, { name: '数量' }, { name: '单位' }, { name: '单价（元）' }, { name: '小计' }, { name: '操作' }],
      productModel: false,
      form: { FarmerId: '', SubsidyMoney: '', ReadyMoney: '', ChargePerson: '', FarmStoreSale_PesticideList: [] },
      dialogflag: false,
      search: { key1: '', key2: '', key3: '', key4: '', key5: '', key6: '' },
      contentHeight: 500,
      prescriptionData: null,
      isPrint: false
    };
  },
  components: { addEditDialog, dialogCode, billsum, prescription },
  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  mounted() {
    this.userInfo = this.$storage.get('userInfo');
    // console.log(this.$storage.get('userInfo'));
    // this.print();
  },
  methods: {
    delPrescriptionList() {
      this.prescriptionList = {};
    },
    editPrescriptionList() {
      this.$refs.dialog.show(this.prescriptionList);
    },
    //保存处方单
    savePrescription(data) {
      this.prescriptionData = data;
      this.prescriptionList = data;
      console.log(data);
      this.$refs.dialog.hide();
    },
    cancelJump() {
      this.$router.push({ path: `${window.location.origin}/#/` });
    },
    delFn(idx) {
      this.form.FarmStoreSale_PesticideList.splice(idx, 1);
    },
    sumFn(a, b) {
      if (a) {
        return a * b;
      }
    },
    async clickItemFarmer(val) {
      if (!val) {
        return;
      }
      this.form.FarmerId = val.id;
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.FARMERINFO, { id: val.id });
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.farmerInfo = res.data;
        console.log(this.farmerInfo);
        //this.subsidy = parseFloat(res.data.SubsidyMoney);
        this.subsidy = await this.loadFundAccountMoney(res.data.FundAccountID);
      }
    },
    async clickItemFarmer2(val) {
      if (!val) {
        return;
      }
      this.form.FarmerId = val;
      let { err, res } = await this.$ajax.get(this.$apiUrl.COMMON.FARMERINFO, { id: val });
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.farmerInfo = res.data;
        console.log(this.farmerInfo);
        this.form.ChargePerson = res.data.ChargePerson;
        //this.subsidy = parseFloat(res.data.SubsidyMoney);
        this.subsidy = await this.loadFundAccountMoney(res.data.FundAccountID);
      }
    },
    //补贴账号可用金额
    async loadFundAccountMoney(FundAccountID) {
      let { err, res } = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.ACCOUNT, { FundAccountID });
      if (err) {
        this.$message.showError(err);
        return 0;
      } else {
        return res.data.Balance;
      }
    },
    pushItem(id, str) {
      let rest = this.getDetail(id);
      rest.then(result => {
        if (result.res.resultCode == 200) {
          let datainfo = result.res.data;

          this.pesticideListPush({
            SaleUnitPrice: datainfo.SaleUnitPrice || '',
            RegisteCode: datainfo.RegisteCode || '',
            PesticideId: datainfo.Id || '',
            ProductName: datainfo.ProductName || '',
            SpecQuantity: datainfo.SpecQuantity || '',
            SpecType: datainfo.SpecType || '',
            TraderMark: datainfo.TraderMark || '',
            Amount: '',
            SpecUnit: datainfo.SpecUnit || '',
            ProductionBatch: '',
            ProductionTime: '',
            ExpireTime: '',
            position: '',
            BarCode: '',
            total: '0',
            deidx: ''
          });
        }
      });
    },
    pesticideListPush(data) {
      const matchItem = this.form.FarmStoreSale_PesticideList.find(item => item.PesticideId === data.PesticideId);
      if (matchItem) {
        matchItem.Amount = matchItem.Amount * 1 + 1 + '';
      } else {
        const addData = Object.jsonClone(data);
        addData.Amount = '1';
        this.form.FarmStoreSale_PesticideList.push(addData);
      }
    },
    lookPrescription() {
      this.$refs.dialog.show();
    },
    printFn(info) {
      const LODOP = lodopFuncs.getLodop();
      LODOP.PRINT_INIT('');
      //LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER');
      // LODOP.ADD_PRINT_TEXT(50, 50, 260, 39, '细线样式打印：');
      const template = _.template(ticketTpl);
      const ticketContent = template(info);
      // LODOP.SET_PRINT_PAGESIZE(3, '58mm', '', ''); //设定纸张大小
      // // console.log(ticketContent);
      // LODOP.ADD_PRINT_HTM(10, 0, '58mm', '100%', ticketContent); //ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)
      LODOP.ADD_PRINT_HTM(3, 0, '100%', '100%', ticketContent);
      LODOP.SET_PRINT_PAGESIZE(3, '60mm', '', '');
      LODOP.PREVIEW(); //预览
      //LODOP.PRINT(); //打印
    },
    async putIn() {
      /*if (this.isPrint) {
         this.print();
         return;
         }*/
      this.form.SubsidyMoney = this.subsidy;
      let formChildInfo = this.$refs.billsum.$data;
      if (this.form.FarmerId == '' || formChildInfo.total == 0) {
        this.$message.showError('请填写完整信息');
      } else {
        if (formChildInfo.nowPay != formChildInfo.total) {
          this.$message.showError('实付金额与代付金额不相同，请修改输入');
        } else {
          this.form.ReadyMoney = this.$refs.billsum.$data.actualPayment || 0;
          this.form.SubsidyMoney = this.$refs.billsum.$data.subsidypay || 0;
          let { err, res } = await this.$ajax.post(this.$apiUrl.FARMSTORESALE.SAVE, this.form);
          if (err) {
            this.$message.showError(res.msg);
          }
          if (res.resultCode == 200) {
            this.$message.success('订单创建成功！');
            this.isPrint = true;
            let pObj = this.form;
            pObj.printInfo = res.data;
            this.printFn(pObj);
            setTimeout(() => {
              this.$router.push('/main/salesBillAdmin');
            }, 500);
          }
        }
      }

      // console.log(err, res);
    },
    async switching() {
      this.form.productId = '';
      this.productBarCode = '';

      if (this.productModel) {
        this.productModel = false;
      } else {
        this.productModel = true;
        await this.$nextTick();
        this.$refs.scanProduct.$el.querySelector('input').focus();
      }
    },
    async getDetail(id) {
      let { err, res } = await this.$ajax.post(this.$apiUrl.COMMON.PRODUCTPESTICIDEINFO, { id: id });
      this.PesticideName = '';
      return { err, res };
    },
    async clickItem2() {
      let pObj = { SearchType: 1, Keyword: this.productBarCode };
      this.productBarCode = '';
      // console.log(pObj);
      let { err, res } = await this.$ajax.post(this.$apiUrl.COMMON.DROP_DOWN.PESTICIDEINFO, pObj);
      if (err) {
      } else {
        let info = res.data;

        if (info.length > 0) {
          let id = info[0].id;
          this.pushItem(id);
          /*let {err, res} = await this.$ajax.post(this.$apiUrl.COMMON.PRODUCTPESTICIDEINFO, {id: id});
             // console.log(err, res);
             if (err) {
             } else {
             let datainfo = res.data;
             this.pesticideListPush({
             PesticideId: datainfo.Id || '',
             ProductName: datainfo.ProductName || '',
             SpecQuantity: datainfo.SpecQuantity || '',
             SpecType: datainfo.SpecType || '',
             TraderMark: datainfo.TraderMark || '',
             Amount: '',
             SpecUnit: datainfo.SpecUnit || '',
             ProductionBatch: '',
             ProductionTime: '',
             ExpireTime: '',
             position: '',
             BarCode: '',
             total: '0'
             });
             }*/
        } else {
          this.$message.showError('该商品条码不存在');
        }
      }
    },
    async clickItem(val) {
      this.PesticideName = '';
      this.pushItem(val.id, val.name);
    },
    statusFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 0:
          str = '禁用';
          break;
        case 1:
          str = '待审核';
          break;
        case 2:
          str = '审核不通过';
          break;
        case 3:
          str = '审核通过';
          break;
        default:
          break;
      }
      return str;
    },
    showDialogCode(data, idx) {
      this.myindex = idx;
      this.$refs.dialogcode.show(data);
    },
    refreshGetData(data) {
      // console.log(this.form.FarmStoreSale_PesticideList[this.myindex]);
      this.form.FarmStoreSale_PesticideList[this.myindex].deidx = data.deidx;
      const { PesticideId, BarCode } = data;
      const matchItem = this.form.FarmStoreSale_PesticideList.find(item => item.PesticideId == PesticideId);
      if (matchItem) {
        matchItem.BarCode = BarCode;
      }
      // console.log(this.form);
      // this.$set(this.form.FarmStoreSale_PesticideList, this.myindex, data);
    },
    addDialog() {
      this.$refs.dialog.show();
    },
    lookmore(data) {
      this.$refs.dialog.show(data);
    },
    refresh() {
      this.$refs.list.refresh();
    },
    async confirmFn(msg) {
      console.log(msg);
      const result = await this.$message.confirm('确定要启用吗?');
      if (result) {
        this.refresh();
      }
    },
    async disableFn(msg) {
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        this.refresh();
      }
    },
    resize() {
      // this.contentHeight = window.innerHeight - 50;
    },
    trim(string) {
      return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    },
    async startFun() {
      let url = 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4&REPEAT=1&common=1';
      //let { err, res } = await this.$model('dataManagement').commonfn2(url);
      let { err, res } = await this.$ajax.get(url);
      if (res.ret == 11) {
        this.$message.showError('请识读身份证');
        return;
      }
      let successRes = JSON.parse(res.replace(/\\/g, '/'));

      if (successRes.ret == 0) {
        let Certificate = successRes.Certificate;
        // this.form.name = this.trim(Certificate.Name);
        // this.form.sex = this.trim(Certificate.Sex);
        // this.form.address = this.trim(Certificate.Address);
        // this.form.identityNumber = this.trim(Certificate.IDNumber);
        let { err, res } = await this.$ajax.get(this.$apiUrl.FARMERSINFO.GET_FARMER_INFO, { chargePersonIDCode: this.trim(Certificate.IDNumber) });
        if (err) {
          this.$message.showError(err);
        } else {
          console.log(res);
          this.clickItemFarmer2(res.data.Id);
        }
      } else {
        this.$message.showError(err);
      }
    }
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.purchaseoutlct {
  .listwrap {
    width: 100%;
  }
  width: 100%;
  font-weight: normal;
  font-size: 14px;
  padding-top: 35px;

  .topin {
    padding-left: 60px;
    width: 800px;
  }
}

.listvalout,
.prescriptionout {
  padding-left: 60px;
  padding-right: 60px;
}

.nexttable {
  padding-left: 60px;
  padding-right: 60px;
  .nztextbtn {
    display: inline;
    color: #00a88a;
    cursor: pointer;
    margin-left: 6px;
  }
  table,
  table tr th,
  table tr td {
    border: 1px solid #ddd;
    min-width: 140px;
    padding-left: 10px;
    font-weight: normal;
  }
  table {
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    padding: 2px;
    width: 100%;
    text-align: left;
    font-size: 14px;
    table-layout: fixed;
    tr,
    td,
    th {
      height: 33px;
      border-bottom: 1px solid #ededed;
    }
    th {
      background: #e9f4f2;
      color: #333 !important;
    }
    td {
      color: #666666;
      height: 60px;
      padding-right: 10px;
      .el-input {
        width: 100%;
      }
    }
  }
}

.nextbtn {
  padding-top: 50px;
  text-align: center;
  padding-bottom: 50px;
  .bot3 {
    margin-right: 10px;
  }
}
.idcard {
  padding: 20px 20px 20px 20px;
}
</style>
<style lang="less" rel="stylesheet/less">
.topin {
  .el-select {
    width: 300px;
  }
  .el-form-item__content {
    width: 400px;
  }
  .el-input--prefix .el-input__inner,
  .el-input {
    width: 300px;
  }
}
</style>
