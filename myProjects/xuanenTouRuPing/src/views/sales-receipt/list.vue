<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true" base-search-placeholder="购买人、销售单号" ref="list">
      <div slot="search">
        <nz-search-item label="销售单号" search-key="salesReceiptCode" v-model="search.salesReceiptCode">
          <nz-input v-model="search.salesReceiptCode"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品名称" search-key="productNameList" v-model="search.productNameList">
          <nz-input v-model="search.productNameList"></nz-input>
        </nz-search-item>
        <nz-search-item label="购买人" search-key="customerName" v-model="search.customerName">
          <nz-input v-model="search.customerName"></nz-input>
        </nz-search-item>
        <nz-search-item label="毒性" search-key="hasToxicity" v-model="search.hasToxicity">
          <nz-enum-select v-model="search.hasToxicity" :options="$enum('毒性').values"></nz-enum-select>
        </nz-search-item>
        <nz-search-item label="销售时间" search-key="createTime" v-model="search.createTime">
          <nz-datepicker v-model="search.createTime" type="datetimerange"></nz-datepicker>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="salesReceiptCode" width="220" label="销售单号" sortable="custom"></nz-table-column>
        <nz-table-column prop="waitPaid" width="200" label="订单金额" sortable="custom">
          <template slot-scope="scope">{{`¥${scope.row.waitPaid}`}}</template>
        </nz-table-column>
        <nz-table-column prop="customerName" width="100" label="购买人" sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.customerName == '' || scope.row.customerName == null">匿名</span>
            <span v-else>{{scope.row.customerName}}</span>
          </template>
        </nz-table-column>
        <nz-table-column prop="identityNumber" width="200" label="身份证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="hasToxicity" width="180" label="含高毒农药" enum-name="是否" sortable="custom"></nz-table-column>
        <nz-table-column prop="createByName" width="180" label="业务员" sortable="custom"></nz-table-column>
        <nz-table-column prop="createTime" min-width="180" label="销售时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="detailOrder(scope.row)">详情</nz-button>
            <nz-button v-if="scope.row.status == 1" type="text" @click="canceOrder(scope.row)">撤消订单</nz-button>
            <nz-button v-if="scope.row.prescriptionOrderID != null" type="text" @click="viewPrescription(scope.row.prescriptionOrderID)">查看处方单</nz-button>
            <nz-button type="text" @click="changeReceipt(scope.row)">打印</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog title="销售单详情信息" ref="orderDialog" :height="800">
      <order-detail ref="orderDetail">
      </order-detail>
      <div slot="footer">
        <nz-button type="primary" @click="orderConfirm">
          确定
        </nz-button>
      </div>
    </nz-dialog>
    <nz-dialog title="处方单" ref="prescriptionDialog" :okHandler="prescriptionConFirm" :height="500">
      <prescription ref="prescription"></prescription>
    </nz-dialog>
  </div>
</template>
<script>
import orderDetail from './order-detail';
import prescription from './prescription.vue';
import lodopFuncs from '../../../static/print/lodopFuncs';
export default {
  components: {
    orderDetail,
    prescription
  },
  data() {
    let apiUrl = this.$apiUrl.SALESRECEIPT;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST,
      search: {
        salesReceiptCode: '',
        productNameList: '',
        customerName: '',
        hasToxicity: '',
        createTime: ''
      },
      dialogVisible: false,
      isPrint: false,
      printTemplet: [],
      LODOP: '',
      form: [],
      //是否打印处方单
      prescriptionReceiptChecked: false,
      //驱动信息
      driveList: [],
      //处方单列表
      prescriptionList: []
    };
  },
  watch: {},
  methods: {
    async canceOrder(row) {
      const result = await this.$message.confirm('撤消后将无法查询该订单信息，你还要继续吗？', '是否确认撤消该订单');
      if (result) {
        let data = {
          orderId: row.salesReceiptID
        };
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SET_STATUS, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
          this.$message.success(res.msg);
        } else {
          this.$message.showError(err);
        }
      }
    },
    async detailOrder(row) {
      this.$refs.orderDialog.show();
      await this.$nextTick();
      this.$refs.orderDetail.addForm(row.salesReceiptID);
    },
    async orderConfirm() {
      this.$refs.orderDialog.hide();
    },
    //查看处方单
    async viewPrescription(prescriptionOrderID) {
      this.$refs.prescriptionDialog.show();
      await this.$nextTick();
      this.$refs.prescription.editForm(prescriptionOrderID, 'view');
    },
    async prescriptionConFirm(callback) {
      let { valid } = await this.$refs.prescription.submit();
      if (valid) {
        callback();
        this.$refs.prescriptionDialog.hide();
      }
    },
    async getPrint(prescriptionOrderID, salesReceiptID) {
      this.printTemplet = [];
      let data = {
        type: 1
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.DEFAULT_PRINT_CONFIG, data);
      if (res.resultCode == 200) {
        this.printTemplet = res.data;
        //获取销售订单
        this.getPurchaseReceipt(salesReceiptID, prescriptionOrderID);
      } else {
        this.$message.showError(err);
      }
    },
    setPrintReceipt() {
      if (this.driveList.printModel == '2') {
        for (let index = 0; index < parseInt(this.printTemplet.details.printNum); index++) {
          this.printReceipt();
        }
      } else {
        this.printReceipt();
      }
    },
    //获取销售订单
    async getPurchaseReceipt(salesReceiptID, prescriptionOrderID) {
      let data = {
        orderId: salesReceiptID
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.SALESRECEIPT.GET, data);
      if (res.resultCode == 200) {
        this.form = res.data[0];
        this.prescriptionList = [];
        if (this.printTemplet.details.prescriptionOrder && prescriptionOrderID != null) {
          this.getPrescription(prescriptionOrderID);
        } else {
          this.setPrintReceipt();
        }
        //this.form.detail = res.data[0].detail;
      } else {
        this.$message.showError(err);
      }
    },
    //获取处方单
    async getPrescription(prescriptionOrderID) {
      let data = {
        id: prescriptionOrderID
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.$apiUrl.SALESRECEIPT.PRESCRIPTION_GET, data);
      if (res.resultCode == 200) {
        this.prescriptionList = res.data.details;
        if (res.data.isPrint == 0) {
          this.prescriptionReceiptChecked = false;
        } else {
          this.prescriptionReceiptChecked = true;
        }
        await this.$nextTick();
        this.setPrintReceipt();
      } else {
        this.$message.showError(err);
      }
    },
    //打印
    async changeReceipt(row) {
      //获取驱动
      this.createPrinterList();
      await this.$nextTick();
      //获取打印设置
      this.getPrint(row.prescriptionOrderID, row.salesReceiptID);
    },
    async createPrinterList() {
      await this.$nextTick();
      let { err, res } = await this.$model('dataManagement').commonfn2(this.$apiUrl.USER.GET_USER_PRINT_CONFIG);
      if (res.resultCode == 200) {
        if (res.data == null) {
          this.receiptdisabled = true;
        } else {
          res.data.deviceID = parseInt(res.data.deviceID);
          this.driveList = res.data;
        }
      } else {
        this.$message.showError(err);
      }
    },
    printReceipt() {
      this.LODOP = lodopFuncs.getLodop();
      this.LODOP.PRINT_INIT('');
      this.LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER');
      let l = '<style> table,td,th {border-collapse: collapse;font-size:9pt;font-family:"\u5b8b\u4f53"}</style>';
      l += '<table>';
      l += '<tr><td align="center" style="font-weight:bold; white-space:normal;text-align:center;">' + this.printTemplet.title + '</td></tr>';
      if (this.printTemplet.details.orderType) {
        l += '<tr><td>单据类型：销售</td></tr>';
      }
      if (this.printTemplet.details.orderCode) {
        l += '<tr><td>销售单号：' + this.form.salesReceiptCode + '</td></tr>';
      }
      if (this.printTemplet.details.customerName) {
        let customerName = this.form.customerName != '' && this.form.customerName != null ? this.form.customerName : '匿名';
        l += '<tr><td>客户姓名：' + customerName + '</td></tr>';
      }
      if (this.printTemplet.details.orderDate) {
        l += '<tr><td>单据日期：' + this.form.lastUpdateTime + '</td></tr>';
      }
      l += '<tr>';
      let r = '<table style="border-top:solid 1pt black;border-bottom:solid 1pt black;border-collapse: separate;border-spacing: 1pt 0;margin-left:-2pt">';

      r += '<tr style="white-space: nowrap;"><td style="min-width:30pt">商品</td><td style="min-width:30pt">数量</td><td style="min-width:30pt">单价</td><td>小计(元)</td></tr>';
      for (var o = 0; o < this.form.detail.length; o++) {
        r += '<tr><td colspan=4 style="word-wrap:break-word;word-break:break-all;">' + this.form.detail[o].productName + '</td></tr>';
        if (this.printTemplet.details.manufacturer && this.form.detail[o].productionEnterprises != null) {
          r += '<tr><td colspan=4 style="word-wrap:break-word;word-break:break-all;">(' + this.form.detail[o].productionEnterprises + ')</td></tr>';
        }
        r += '<tr style="word-wrap:break-word;word-break:break-all;"><td></td>';
        r += '<td>' + this.form.detail[o].quantity + '</td>';
        r += '<td>' + this.form.detail[o].unitPrice + '</td>';
        r += '<td>' + this.form.detail[o].subtotal + '</td>';
        r += '</tr>';
      }
      r += '</table>';
      l += '<td>' + r + '</td>';
      l += '</tr>';
      if (this.printTemplet.details.waitPaid) {
        l += '<tr><td>原价总计(元)：' + this.form.waitPaid + '</td></tr>';
      }
      if (this.printTemplet.details.discount) {
        l += '<tr><td>优惠金额(元)：' + this.form.discount + '</td></tr>';
      }
      if (this.printTemplet.details.payment) {
        l += '<tr><td>实付金额(元)：' + this.form.payment + '</td></tr>';
      }
      if (this.printTemplet.details.change) {
        l += '<tr><td>找零/欠款(元)：' + this.form.change + '</td></tr>';
      }

      if (this.printTemplet.details.prescriptionOrder && this.prescriptionReceiptChecked) {
        if (this.prescriptionList.length > 0) {
          l += '<tr><td style="font-weight:bold;padding-top:15pt;">处方单</td></tr>';
        }
        l += '<tr>';
        let r = '<table style="border-collapse: separate;border-spacing: 1pt 0;margin-left:-2pt">';
        for (var i = 0; i < this.prescriptionList.length; i++) {
          let paddStyle = 'padding-top:10pt';
          if (i == 0) {
            paddStyle = 'padding-top:0pt';
          }
          r += '<tr><td style="' + paddStyle + '">针对作物：' + this.prescriptionList[i].forCrops + '</td></tr>';
          r += '<tr><td >生长阶段：' + this.prescriptionList[i].growthStage + '</td></tr>';
          r += '<tr><td >病/虫/草害：' + this.prescriptionList[i].diseasesAndPests + '</td></tr>';
          for (var j = 0; j < this.prescriptionList[i].medicateList.length; j++) {
            let itemMedicateList = this.prescriptionList[i].medicateList[j];
            r += '<tr><td style="padding-top:5px">商品名称：' + itemMedicateList.productId + '</td></tr>';
            let properties = itemMedicateList.properties != null ? itemMedicateList.properties : '';
            r += '<tr><td>农药药性：' + properties + '</td></tr>';
            r += '<tr><td>安全间隔期（天）:' + itemMedicateList.safetyInterval + '</td></tr>';
            r += '<tr><td>用药量（亩）：' + itemMedicateList.templeUsage + '</td></tr>';
            r += '<tr><td>使用方法：' + itemMedicateList.instruction.join(',') + '</td></tr>';
          }
          r += '<tr><td>注意事项：' + this.prescriptionList[i].note + '</td></tr>';
        }
        r += '</table>';
        l += '<td>' + r + '</td>';
        l += '</tr>';
      }
      if (this.printTemplet.details.footer1Check) {
        l += '<tr><td align="center" style="padding-top:5pt">' + this.printTemplet.details.footer1 + '</td></tr>';
      }
      if (this.printTemplet.details.footer2Check) {
        l += '<tr><td align="center" >' + this.printTemplet.details.footer2 + '</td></tr>';
      }
      l += '</table>';
      this.LODOP.ADD_PRINT_HTM(7, 0, '100%', '100%', l);
      this.LODOP.SET_PRINT_PAGESIZE(3, '60mm', 45, '');
      if (this.driveList.printModel == '1') {
        this.LODOP.PREVIEW();
      } else {
        if (this.LODOP.SET_PRINTER_INDEX(this.driveList.deviceID)) {
          this.LODOP.PRINT();
        }
      }
    }
  },
  created() {
    let self = this;
    setTimeout(function() {
      self.LODOP = lodopFuncs.getLodop();
      if (self.LODOP == null || typeof self.LODOP.VERSION == 'undefined') {
        self.isPrint = false;
      } else {
        self.isPrint = true;
      }
    }, 1000);
  }
};
</script>
