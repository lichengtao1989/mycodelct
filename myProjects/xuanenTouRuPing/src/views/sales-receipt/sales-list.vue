<template>
  <div>
    <div class="nz-page">
      <div class="delete-batch">
        <nz-button @click="deleteBatch">
          <i class="nz-icon-delete"></i>批量删除</nz-button>
        <nz-button type="primary" style="margin-bottom: 10px;" @click="customerAdd('1')">
          <span>识读身份证</span>
        </nz-button>
      </div>
      <nz-form ref="form" :model="form" label-width="150px" :rules="rules">
        <nz-form-item label="购买人" prop="customerID">
          <nz-remote-select v-model="form.customerID" :label="form.customerName" class="cusotmer-input" value-key="customerID" label-key="name" placeholder="匿名" :remote-url="$apiUrl.DATAMANAGEMENT.GET_LIST_CUSTOMER" @select="selectCustomer" :params="{status: 1}"></nz-remote-select>
          <nz-button type="text" @click="customerAdd('2')">
            <i class="nz-icon-add2 add-icon"></i>新增客户</nz-button>
        </nz-form-item>
        <nz-form-item label="身份证号" prop="identityNumber">
          <nz-input v-model="form.identityNumber" disabled="true" class="cusotmer-input"></nz-input>
        </nz-form-item>
        <nz-form-item label="联系电话" prop="mobile">
          <nz-input v-model="form.mobile" disabled="true" class="cusotmer-input"></nz-input>
        </nz-form-item>
        <nz-form-item label="搜索商品" v-if="!productModel" prop="productId">
          <nz-remote-select v-model="form.productId" value-key="productId" label-key="productName" item-vlaue="itemVlaue" class="cusotmer-input" :remote-url="$apiUrl.DATAMANAGEMENT.GET_LIST_PRODUCT" :params="{status: 1, restrictedStaus:0}" placeholder="请选择商品" @select="clickItem">
            <template slot-scope="scope">{{scope.item.productName}}
              <span class="nz-option-subtitle">(商品条码:{{scope.item.productBarCode}})</span>
            </template>
          </nz-remote-select>
          <nz-button @click="switching" type="text" class="input-mode">
            <i class="nz-icon-switching count-span"></i>输入模式</nz-button>
        </nz-form-item>
        <nz-form-item label="搜索商品" v-else prop="productBarCode" ref="scanProduct" class="scan-code">
          <nz-input v-model="productBarCode" :autofocus="productModel" placeholder="请扫描商品" class="cusotmer-input" @keyup.enter.native="clickItem2"></nz-input>
          <nz-button @click="switching" type="text" class="input-mode">
            <i class="nz-icon-switching count-span"></i>扫码模式</nz-button>
        </nz-form-item>

        <!--列表-->
        <nz-table style="margin-top:10px;" :data="form.detail" class="nz-table nz-editableTable" border="true" @selection-change="handleSelectionChange">
          <nz-table-column type="selection" label="全选" width="55" fixed="left">
          </nz-table-column>
          <nz-table-column prop="productBarCode" label="商品条码" width="170">
          </nz-table-column>
          <nz-table-column prop="productName" label="商品名称" min-width="170">
          </nz-table-column>
          <nz-table-column prop="packingSpecifications" label="规格/包装" width="180">
            <template slot-scope="scope">
              {{scope.row.packingSpecifications}}{{scope.row.packagingUnit}}/{{scope.row.packagingType}}
            </template>
          </nz-table-column>
          <nz-table-column prop="unitPrice" label="销售单价" width="180">
            <template slot-scope="scope">
              ¥
              <nz-input v-model="scope.row.unitPrice" @input="setSales(scope.row)" @blur="calculatedPremium(scope.row)" style="width:80px;"></nz-input>
              <span>元</span>/{{scope.row.packagingType}}
            </template>
          </nz-table-column>
          <nz-table-column prop="quantity" label="数量" width="150">
            <template slot-scope="scope">
              <nz-input v-model="scope.row.quantity" @input="setSubtotal(scope.row)" style="width:80px;" @blur="calculatedPremium(scope.row)"></nz-input>
              <span>{{scope.row.packagingType}}</span>
            </template>
          </nz-table-column>
          <nz-table-column prop="subtotal" label="小计" width="130">
            <template slot-scope="scope">
              ¥{{scope.row.subtotal}} 元
            </template>
          </nz-table-column>
          <nz-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <nz-button type="text" @click="deleteDetail(scope.row)">删除</nz-button>
            </template>
          </nz-table-column>
        </nz-table>
        <div class="total-count">
          <div class="total-info">
            <div class="total-count-span">清单共
              <span class="count-span">{{form.detail.length}}</span>条</div>
            <div class="total-count-val">总计
              <span class="count-span">{{form.amount}}</span>元</div>
          </div>
          <div class="discount-info">
            <nz-form-item label="优惠金额" prop="discount">
              <nz-input v-model="form.discount" @blur="setDisCount" style="width:100px;"></nz-input>
              <span>元</span>
            </nz-form-item>
            <nz-form-item label="待付金额" prop="waitPaid">
              <span class="waitPaid">¥{{form.waitPaid}}</span>
            </nz-form-item>
            <nz-form-item label="实付金额" prop="payment" required>
              <nz-input v-model="form.payment" @blur="setPayment" style="width:100px;"></nz-input>
              <span>元</span>
            </nz-form-item>
            <nz-form-item label="找零" prop="change">
              <span class="waitPaid">¥{{form.change}}</span>
            </nz-form-item>
          </div>
        </div>
        <nz-form-item label="订单备注" prop="supplierID">
          <nz-input v-model="form.note" type="textarea" maxlength=200 :autosize="{ minRows: 2, maxRows: 6}"></nz-input>
        </nz-form-item>
        <div style="width:100%;text-align: center;" v-if="form.prescriptionOrderID == ''">
          <nz-button type="text" @click="prescriptionAdd">
            <i class="nz-icon-add2 add-icon"></i>处方单</nz-button>
        </div>
        <div class="prescription-list" v-if="form.prescriptionOrderID != ''">
          <div class="prescription-title">
            <div class="prescription-name">处方单</div>
            <div class="prescription-operating">
              <i class="nz-icon-edit prescription-edit" @click="prescriptionAdd"></i>
              <i class="nz-icon-close prescription-delete" @click="prescriptionDelete"></i>
            </div>
          </div>
          <template v-for="receiptItem in prescriptionList">
            <ul class="prescription-receipt">
              <li>
                <div :style="'width:'+receiptWidth+'px;'">针对作物：{{receiptItem.forCrops}}</div>
                <div :style="'width:'+receiptWidth+'px;'">生长阶段：{{receiptItem.growthStage}}</div>
                <div :style="'width:'+receiptWidth+'px;'">针对病虫害：{{receiptItem.diseasesAndPests}}</div>
              </li>
              <template v-for="(medicateItem, medicatekey) in receiptItem.medicateList">
                <li>
                  <div>商品名称: {{medicateItem.productId}}</div>
                </li>
                <li>
                  <div :style="'width:'+receiptWidth+'px;'">亩用量：{{medicateItem.templeUsage}}</div>
                  <div :style="'width:'+receiptWidth+'px;'">安全间隔期（天）：{{medicateItem.safetyInterval}}</div>
                  <div :style="'width:'+receiptWidth+'px;'">农药药性：{{medicateItem.properties}}</div>
                  <div>使用方法：{{medicateItem.instruction.join(',')}}</div>
                </li>
              </template>
              <li>用药注意事项：{{receiptItem.note}}</li>
            </ul>
          </template>
        </div>
      </nz-form>
      <div class="nz-page-bottom-holder"></div>
      <div class="nz-page-bottom">
        <nz-checkbox v-model="receiptChecked" :disabled="receiptdisabled" @change="changeReceipt">打印小票</nz-checkbox>
        <nz-button type="primary" @click="submit" :loading="isRegister">
          <i class="nz-icon-confirm"></i>生成销售单
        </nz-button>
        <nz-button @click="cancel">
          <i class="nz-icon-close"></i>取消</nz-button>
      </div>
    </div>
    <nz-dialog :title="titleName" ref="editCustomerDialog" :okHandler="editCustomerFirm" height="500">
      <edit-customer ref="editCustomer"></edit-customer>
    </nz-dialog>
    <nz-dialog title="处方单" ref="prescriptionDialog" :okHandler="prescriptionConFirm" :height="500">
      <prescription ref="prescription" @getPrescription="getPrescription" :productList="productList" :receiptdisabled="receiptdisabled"></prescription>
    </nz-dialog>
  </div>
</template>
<script>
import editCustomer from '../data-management/customer/edit.vue';
import prescription from './prescription.vue';
import lodopFuncs from '../../../static/print/lodopFuncs';
export default {
  components: {
    editCustomer,
    prescription
  },
  data() {
    let apiUrl = this.$apiUrl.SALESRECEIPT;
    return {
      apiUrl: apiUrl,
      titleName: '添加客户',
      isRegister: false,
      productBarCode: '',
      requestUrl: apiUrl.GET_LIST,
      //是否打印小票
      receiptChecked: false,
      //是否打印处方单
      prescriptionReceiptChecked: false,
      receiptdisabled: false,
      productList: [],
      form: {
        customerID: '',
        salesReceiptID: '',
        identityNumber: '',
        mobile: '',
        customerName: '',
        amount: 0,
        productId: '',
        discount: 0,
        waitPaid: 0,
        change: 0,
        payment: '',
        detail: [],
        prescriptionOrderID: ''
      },
      //选中的行
      selectedRows: [],
      //打印模板
      printTemplet: '',
      rules: {
        payment: [this.$formRules.required],
        note: [this.$formRules.maxLength(200)]
      },
      dialogVisible: false,
      productModel: false,
      //打印处方单列表
      prescriptionList: [],
      //驱动列表
      driveList: [],
      boxWidth: 0
    };
  },
  watch: {
    //实付金额修改
    'form.payment': function() {
      if (!isNaN(this.form.payment) && this.form.payment > 0) {
        if (!isNaN(this.form.payment) && this.form.payment < 99999999) {
          this.form.change = (parseFloat(this.form.payment) - parseFloat(this.form.waitPaid)).toFixed(2);
        } else {
          this.$message.showError('实付金额必须为大于0的数字，且小于1000w');
        }
      } else {
        this.$message.showError('实付金额必须为大于0的数字，且小于1000w');
      }
    },
    //优惠金额
    'form.discount': function() {
      if (this.form.discount != '' && isNaN(this.form.discount)) {
        this.$message.showError('优惠金额必须为大于0的数字，且小于1000w');
        return false;
      }
      if (this.form.discount > 0) {
        if (!isNaN(this.form.discount) && this.form.discount < 99999999) {
          if (parseFloat(this.form.discount) > parseFloat(this.form.amount)) {
            this.$message.showError('优惠金额不能大于总计金额');
          } else {
            this.form.waitPaid = (parseFloat(this.form.amount) - parseFloat(this.form.discount)).toFixed(2);
            if (this.form.change != 0 || this.form.payment > 0) {
              this.form.change = (parseFloat(this.form.payment) - parseFloat(this.form.waitPaid)).toFixed(2);
            }
          }
        } else {
          this.$message.showError('优惠金额必须为大于0的数字，且小于1000w');
        }
      } else {
        this.form.discount = 0;
        this.form.waitPaid = (parseFloat(this.form.amount) - parseFloat(this.form.discount)).toFixed(2);
      }
    },
    'form.customerID': function() {
      if (this.form.customerID == '') {
        this.form.identityNumber = '';
        this.form.mobile = '';
      }
    },
    'form.waitPaid': function() {
      if (this.form.change != 0 && this.form.payment > 0) {
        this.form.change = (parseFloat(this.form.payment) - parseFloat(this.form.waitPaid)).toFixed(2);
      }
    }
  },
  methods: {
    setDisCount() {
      this.form.discount = parseFloat(this.form.discount).toFixed(2);
    },
    setPayment() {
      if (this.form.payment > 0) {
        this.form.payment = parseFloat(this.form.payment).toFixed(2);
      }
    },
    setSubtotal(row) {
      let detail = row;
      if (/^\d+?$/.test(detail.quantity) && detail.quantity > 0) {
        if (parseInt(detail.stockCount) < parseInt(detail.quantity)) {
          this.$message.showError('该商品库存不足');
          return false;
        }
        if (/^\d+?$/.test(detail.quantity) && detail.quantity < 100000000) {
          detail.subtotal = (detail.quantity * detail.unitPrice).toFixed(2);
        } else {
          // detail.quantity = '';
          // detail.subtotal = '';
          this.$message.showError('数量必须为大于0的整数，且最大为8位');
        }
      } else {
        this.$message.showError('数量必须为大于0的整数，且最大为8位');
        detail.subtotal = (detail.quantity * detail.unitPrice).toFixed(2);
      }
    },
    setSales(row) {
      let detail = row;
      if (detail.unitPrice != '') {
        if (!isNaN(detail.unitPrice) && detail.unitPrice < 10000000) {
          detail.subtotal = (detail.quantity * detail.unitPrice).toFixed(2);
        } else {
          this.$message.showError('单价必须为大于0的数字，且小于1000w');
        }
      } else {
        this.$message.showError('单价必须为大于0的数字，且小于1000w');
      }
    },
    //删除商品
    async deleteDetail(row) {
      this.form.detail.remove(row);
      this.calculatedPremium(row);
      this.productList.forEach(v => {
        if (v.id == row.productId) {
          this.productList.remove(v);
        }
      });
    },
    async deleteBatch() {
      let self = this;
      this.selectedRows.map(r => {
        self.form.detail.remove(r);
        this.calculatedPremium(r);
      });
      this.productList = [];
    },
    //列表项选择
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    async clickItem2() {
      let self = this;
      let isProductBarCode = true;
      let data = {
        keyWord: this.productBarCode
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAMANAGEMENT.GET_LIST_PRODUCT, data);
      if (res.resultCode == 200) {
        if (res.data.total == 0) {
          this.productBarCode = '';
          this.$message.showError('该商品条码不存在');
          return false;
        }
        let val = res.data.rows[0];
        if (val.status != 1) {
          this.productBarCode = '';
          this.$message.showError('该商品已禁用');
          return false;
        }
        if (val.forbiddenStatus == 1) {
          this.productBarCode = '';
          this.$message.showError('该商品名称已被列入国家禁用农药，请勿流通使用！');
          return false;
        }

        if (this.form.detail.length > 0) {
          this.form.detail.map(function(x) {
            if (x.productId == val.productId) {
              isProductBarCode = false;
              if (parseInt(x.stockCount) < parseInt(parseInt(x.quantity) + 1)) {
                self.$message.showError('该商品库存不足');
                return false;
              }
              x.quantity = parseInt(x.quantity) + 1;
              self.calculatedPremium(x);
            }
          });
        }
        if (this.form.detail.length == 0 || isProductBarCode) {
          val.quantity = 1;
          let newDetail = {
            productId: val.productId,
            productName: val.productName,
            productBarCode: val.productBarCode,
            quantity: val.quantity,
            unitPrice: val.retailPrice,
            packingSpecifications: val.packingSpecifications,
            packagingUnit: val.packagingUnit,
            packagingType: val.packagingType,
            subtotal: val.subtotal,
            stockCount: val.stockCount,
            productionEnterprises: val.productionEnterprises
          };
          if (parseInt(val.stockCount) < parseInt(val.quantity)) {
            this.$message.showError('该商品库存不足');
            return false;
          }
          self.form.detail.push(newDetail);
          self.calculatedPremium(newDetail);
          if (val.category == 1) {
            this.productList.push({
              name: val.productName,
              id: val.productId,
              toxicity: val.toxicity
            });
          }
        }
        this.productBarCode = '';
      } else {
        this.$message.showError(err);
      }
    },
    async clickItem(val) {
      let self = this;
      let isProductBarCode = true;
      if (val) {
        if (val.forbiddenStatus == 1) {
          this.form.productId = '';
          this.$message.showError('该商品名称已被列入国家禁用农药，请勿流通使用！');
          return false;
        }
        if (this.form.detail.length > 0) {
          this.form.detail.map(function(x) {
            if (x.productId == val.productId) {
              isProductBarCode = false;
              if (parseInt(x.stockCount) < parseInt(parseInt(x.quantity) + 1)) {
                self.$message.showError('该商品库存不足');
                return false;
              }
              x.quantity = parseInt(x.quantity) + 1;
              self.calculatedPremium(x);
            }
          });
        }
        if (this.form.detail.length == 0 || isProductBarCode) {
          val.quantity = 1;
          let newDetail = {
            productId: val.productId,
            productName: val.productName,
            productBarCode: val.productBarCode,
            quantity: val.quantity,
            unitPrice: val.retailPrice,
            packingSpecifications: val.packingSpecifications,
            packagingUnit: val.packagingUnit,
            packagingType: val.packagingType,
            subtotal: val.subtotal,
            stockCount: val.stockCount,
            productionEnterprises: val.productionEnterprises
          };
          if (parseInt(val.stockCount) < val.quantity) {
            this.$message.showError('该商品库存不足');
            return false;
          }
          this.form.detail.push(newDetail);
          this.calculatedPremium(newDetail);
          if (val.category == 1) {
            this.productList.push({
              name: val.productName,
              id: val.productId,
              toxicity: val.toxicity
            });
          }
        }
        await this.$nextTick();
        this.form.productId = '';
      }
    },
    //总计算
    calculatedPremium(row) {
      if (this.form.discount == '' || this.form.discount == null) {
        this.form.discount = 0;
      }
      if (row.unitPrice != undefined && !isNaN(row.unitPrice) && row.quantity > 0 && row.quantity % 1 === 0) {
        row.unitPrice = parseFloat(row.unitPrice).toFixed(2);
        row.subtotal = (row.quantity * row.unitPrice).toFixed(2);
        let self = this;
        self.form.amount = 0;
        self.form.waitPaid = 0;
        this.form.detail.map(function(x) {
          if (x.subtotal != '') {
            self.form.amount += parseFloat(x.subtotal);
          }
        });
        self.form.amount = parseFloat(self.form.amount).toFixed(2);
        self.form.waitPaid = self.form.amount - self.form.discount;
      }
    },
    selectCustomer(item) {
      this.form.identityNumber = item.identityNumber;
      this.form.mobile = item.mobile;
      this.form.customerName = item.name;
    },
    //提交生产订单
    async submit() {
      const valid = await this.$refs.form.validate();
      if (this.form.detail.length == 0) {
        this.$message.showError('请先添加商品');
        return false;
      }
      let params = Object.deepClone(this.form);
      //验证表格内的数据
      if (!this.checkSales(params.detail)) {
        this.submitLoading = false;
        return;
      }
      if (parseFloat(this.form.discount) > parseFloat(this.form.amount)) {
        this.$message.showError('优惠金额不能大于总计金额');
        return;
      }
      if (this.form.discount != '' && parseFloat(this.form.discount) < 0) {
        this.$message.showError('优惠金额必须为大于0的数字，且小于1000w');
        return false;
      }
      if (isNaN(this.form.discount) || this.form.discount > 10000000) {
        this.$message.showError('优惠金额必须为大于0的数字，且小于1000w');
        return false;
      }
      if (isNaN(this.form.payment) || this.form.payment > 10000000) {
        this.$message.showError('实付金额必须为大于0的数字，且小于1000w');
        return false;
      }
      if (valid) {
        this.isRegister = true;
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE, this.form);
        if (res.resultCode == 200) {
          await this.$eventBus.$emit('getRouteJump', 'salesAccount');
          await this.$nextTick();
          this.form.salesReceiptID = res.data;
          if (this.receiptChecked) {
            if (this.driveList.printModel == '2') {
              for (let index = 0; index < parseInt(this.printTemplet.details.printNum); index++) {
                this.printReceipt();
              }
            } else {
              this.printReceipt();
            }
          }
          this.$router.push('/main/salesAccount');
        } else {
          this.$message.showError(err);
          this.isRegister = false;
        }
      }
    },
    //校验进货表格内的数据
    checkSales(details) {
      details.map(detail => {
        detail.index = details.indexOf(detail) + 1;
      });
      let emptyItems = details.filter(item => {
        return !item.productionBatch && !item.productionDate && !item.quantity && !item.unitPrice;
      });
      for (let item of emptyItems) {
        details.remove(item);
      }
      for (let item of details) {
        if (!item.unitPrice) {
          this.$message.warning(`第${item.index}行销售数据验证失败，请填写单价`);
          return false;
        }
        if (item.unitPrice < 0) {
          this.$message.warning(`第${item.index}行销售数据验证失败，单价金额必须为大于0的数字，且小于1000w`);
          return false;
        }
        if (isNaN(item.unitPrice) || item.unitPrice > 10000000) {
          this.$message.warning(`第${item.index}行销售数据验证失败，单价金额必须为大于0的数字，且小于1000w`);
          return false;
        }
        if (!item.quantity) {
          this.$message.warning(`第${item.index}行销售数据验证失败，请填写数量`);
          return false;
        }
        if (!/^\d+?$/.test(item.quantity) || item.quantity > 100000000) {
          this.$message.warning(`第${item.index}行销售数据验证失败，数量必须为大于0的整数，且最大为8位`);
          return false;
        }
        if (item.quantity <= 0) {
          this.$message.warning(`第${item.index}行销售数据验证失败，数量必须为大于0的整数，且最大为8位`);
          return false;
        }
      }
      return true;
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
    //取消返回首页
    async cancel() {
      await this.$eventBus.$emit('getRouteJump', 'index');
      await this.$nextTick();
      this.$router.push('/main/index');
    },
    async editFrom(customerId) {
      let data = {
        customerId: customerId
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.DATAMANAGEMENT.GET_CUSTOMER, data);
      if (res.resultCode == 200) {
        this.form.identityNumber = res.data.identityNumber;
        this.form.mobile = res.data.mobile;
        this.form.customerName = res.data.name;
        this.form.customerID = res.data.customerID;
      } else {
        this.$message.showError(err);
      }
    },
    //添加客户
    async customerAdd(source) {
      if (source == 1) {
        this.titleName = '识读身份证';
      } else {
        this.titleName = '添加客户';
      }
      this.$refs.editCustomerDialog.show();
      await this.$nextTick();
      this.$refs.editCustomer.addFrom();
      if (source == 1) {
        this.$refs.editCustomer.startFun();
      }
    },
    async editCustomerFirm(callback) {
      let { valid, err, res } = await this.$refs.editCustomer.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editCustomerDialog.hide();
          //this.form.customerID = res.data;
          this.editFrom(res.data);
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    //新增处方单
    async prescriptionAdd() {
      this.$refs.prescriptionDialog.show();
      await this.$nextTick();
      if (this.form.prescriptionOrderID != '') {
        this.$refs.prescription.editForm(this.form.prescriptionOrderID, 'edit');
      } else {
        this.$refs.prescription.addForm();
      }
    },
    //删除处方单
    async prescriptionDelete() {
      const result = await this.$message.confirm('确定要删除该处方单吗？');
      if (result) {
        let data = {
          id: this.form.prescriptionOrderID
        };
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.PRESCRIPTION_DELETE, data);
        if (res.resultCode == 200) {
          this.$message.success(res.msg);
          this.form.prescriptionOrderID = '';
        } else {
          this.$message.showError(err);
        }
      }
    },
    async prescriptionConFirm(callback) {
      let { valid, err, res } = await this.$refs.prescription.submit();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.prescriptionDialog.hide();
          if (res.msg == '保存成功') {
            this.form.prescriptionOrderID = res.data;
          }
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    },
    getPrescription(prescriptionList, prescriptionReceiptChecked) {
      this.prescriptionList = prescriptionList;
      this.prescriptionReceiptChecked = prescriptionReceiptChecked;
    },
    async getPrint() {
      this.printTemplet = [];
      let data = {
        type: 1
      };
      let { err, res } = await this.$model('dataManagement').commonfn(this.$apiUrl.USER.DEFAULT_PRINT_CONFIG, data);
      if (res.resultCode == 200) {
        this.printTemplet = res.data;
      } else {
        this.$message.showError(err);
      }
    },
    //选择打印小票获取小票信息
    async changeReceipt(val) {
      if (val) {
        this.getPrint();
      }
    },
    //打印小票
    printReceipt() {
      this.LODOP = lodopFuncs.getLodop();
      this.LODOP.PRINT_INIT('');
      this.LODOP.SET_PRINT_MODE('WINDOW_DEFPRINTER');
      var date = new Date();
      var seperator1 = '/';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      month = month >= 1 && month < 10 ? '0' + month : month;
      strDate = strDate >= 0 && strDate < 10 ? '0' + strDate : strDate;
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      m = m >= 1 && m < 10 ? '0' + m : m;
      s = s >= 0 && s < 10 ? '0' + s : s;
      var currentdate = year + seperator1 + month + seperator1 + strDate + '&nbsp;' + h + m + s;
      let l = '<style> table,td,th {border-collapse: collapse;font-size:9pt;font-family:"\u5b8b\u4f53"}</style>';
      l += '<table>';
      l += '<tr><td align="center" style="font-weight:bold; white-space:normal;text-align:center;">' + this.printTemplet.title + '</td></tr>';
      if (this.printTemplet.details.orderType) {
        l += '<tr><td>单据类型：销售</td></tr>';
      }
      if (this.printTemplet.details.orderCode) {
        l += '<tr><td>销售单号：' + this.form.salesReceiptID + '</td></tr>';
      }
      if (this.printTemplet.details.customerName) {
        let customerName = this.form.customerName != '' && this.form.customerName != null ? this.form.customerName : '匿名';
        l += '<tr><td>客户姓名：' + customerName + '</td></tr>';
      }
      if (this.printTemplet.details.orderDate) {
        l += '<tr><td>单据日期：' + currentdate + '</td></tr>';
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
            r += '<tr><td >农药药性：' + properties + '</td></tr>';
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
    bindResize() {
      window.addEventListener('resize', this.onResize);
    },
    unBindResize() {
      window.removeEventListener('resize', this.onResize);
    },
    onResize() {
      if (this.$el) {
        this.boxWidth = this.$el.offsetWidth;
      }
    }
  },
  mounted() {
    this.bindResize();
    this.onResize();
    let self = this;
    setTimeout(function() {
      self.LODOP = lodopFuncs.getLodop();
      if (self.LODOP == null || typeof self.LODOP.VERSION == 'undefined') {
        self.receiptdisabled = true;
      }
    }, 1000);
  },
  computed: {
    //设置针对宽度
    receiptWidth() {
      let fz = 70;
      fz = fz * (this.boxWidth / 400);
      fz = parseInt(fz);
      return fz;
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.form.resetFields();
    });
    this.createPrinterList();
  },
  beforeDestroy() {
    this.unBindResize();
  }
};
</script>
<style scoped rel='stylesheet/less' lang='less'>
span {
  margin: 0px 3px;
}
.nz-page {
  background-color: #fff;
  padding: 20px;
}
.nz-page-bottom-holder {
  height: 25px;
  width: 100%;
}

.cusotmer-input {
  width: 500px;
}
.nz-page-bottom {
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
  .el-button {
    padding: 10px 22px;
  }
}
.delete-batch {
  padding: 20px 20px 20px 0px;
}
.total-count {
  width: 100%;
  height: 192px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
  margin-bottom: 30px;
  box-sizing: border-box;
}
.total-count-span {
  font-size: 14px;
  width: 150px;
  text-align: center;
  float: left;
}
.total-count-val {
  padding-left: 12px;
  float: left;
  font-size: 13px;
}
.input-mode {
  font-size: 14px;
  color: #03a78c;
  cursor: pointer;
}
.count-span {
  font-size: 16px;
  color: #03a78c;
  cursor: pointer;
}
.total-info {
  float: left;
}
.discount-info {
  float: right;
  font-size: 14px;
  padding: 20px 0;
  width: 300px;
}
.waitPaid {
  color: red;
}
.prescription-list {
  width: 100%;
  float: left;
}
.prescription-title {
  width: 100%;
  float: left;
  line-height: 40px;
  border: 1px solid #dfe6ec;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
}
.prescription-name {
  float: left;
  margin-left: 15px;
}
.prescription-operating {
  float: right;
  margin-right: 20px;
}
.prescription-receipt {
  margin: 0;
  float: left;
  width: 100%;
  box-sizing: border-box;
  border-left: 1px solid #dfe6ec;
  border-bottom: 1px solid #dfe6ec;
  border-right: 1px solid #dfe6ec;
  margin-bottom: 20px;
  li {
    list-style-type: none;
    font-size: 14px;
    line-height: 40px;
    float: left;
    width: 100%;
    div {
      float: left;
    }
  }
}
.prescription-edit {
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
}
.prescription-delete {
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
<style rel='stylesheet/less' lang='less'>
.discount-info .el-form-item {
  margin-bottom: 5px;
}
.scan-code {
  input::-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: red;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: red;
  }
  input::-ms-input-placeholder {
    color: red;
  }
  input::-webkit-input-placeholder {
    color: red;
  }
}
</style>