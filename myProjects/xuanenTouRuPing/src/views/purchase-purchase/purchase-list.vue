<template>
  <div>
    <div class="nz-page">
      <div class="delete-batch">
        <nz-button @click="deleteBatch">
          <i class="nz-icon-delete"></i>批量删除</nz-button>
      </div>
      <nz-form ref="form" :model="form" label-width="150px" :rules="rules">
        <nz-form-item label="选择供应商" prop="supplierID" required>
          <nz-remote-select v-model="form.supplierID" value-key="supplierID" placeholder="请输入供应商名称或联系电话查找" label-key="supplierName" style="width:500px;" :remote-url="apiUrl.AUTO_GET_SUPPLIER" :params="{status: 1}">
            <template slot-scope="scope">{{scope.item.supplierName}}
              <span class="nz-option-subtitle">(手机号码:{{scope.item.mobile}})</span>
            </template>
          </nz-remote-select>
          <nz-button type="text" @click="supplierAdd">
            <i class="nz-icon-add2 add-icon"></i>新增供应商</nz-button>
        </nz-form-item>
        <nz-form-item label="搜索商品" v-if="!productModel" prop="productId">
          <nz-remote-select v-model="form.productId" value-key="productId" label-key="productName" item-vlaue="itemVlaue" style="width:500px;" :remote-url="$apiUrl.DATAMANAGEMENT.GET_LIST_PRODUCT" :params="{status: 1, restrictedStaus:0}" placeholder="请选择商品" @select="clickItem">
            <template slot-scope="scope">{{scope.item.productName}}
              <span class="nz-option-subtitle">(商品条码:{{scope.item.productBarCode}})</span>
            </template>
          </nz-remote-select>
          <nz-button @click="switching" type="text" class="input-mode">
            <i class="nz-icon-switching count-span"></i>输入模式</nz-button>
        </nz-form-item>
        <nz-form-item label="搜索商品" v-else prop="productBarCode" ref="scanProduct" class="scan-code">
          <nz-input v-model="productBarCode" :autofocus="productModel" style="width:500px;" @keyup.enter.native="clickItem2" placeholder="请扫描商品"></nz-input>
          <nz-button @click="switching" type="text" class="input-mode">
            <i class="nz-icon-switching count-span"></i>扫码模式</nz-button>
        </nz-form-item>

        <!--列表-->
        <nz-table style="margin-top:10px;" :data="form.detail" class="nz-table nz-editableTable" border @selection-change="handleSelectionChange">
          <nz-table-column type="selection" label="全选" width="55" fixed="left">
          </nz-table-column>
          <nz-table-column prop="productBarCode" label="商品条码" width="130">
          </nz-table-column>
          <nz-table-column prop="productName" label="商品名称" width="170">
          </nz-table-column>
          <nz-table-column prop="packingSpecifications" label="规格/包装" width="150">
            <template slot-scope="scope">
              {{scope.row.packingSpecifications}}{{scope.row.packagingUnit}}/{{scope.row.packagingType}}
            </template>
          </nz-table-column>
          <nz-table-column prop="productionBatch" label="生产批次" width="180">
            <template slot-scope="scope">
              <nz-input v-model="scope.row.productionBatch"></nz-input>
            </template>
          </nz-table-column>
          <nz-table-column prop="productionDate" label="生产日期" min-width="270">
            <template slot-scope="scope">
              <nz-datepicker v-model="scope.row.productionDate" type="date" width="160"></nz-datepicker>
            </template>
          </nz-table-column>
          <nz-table-column prop="unitPrice" label="进货单价" width="180">
            <template slot-scope="scope">
              ¥
              <nz-input v-model="scope.row.unitPrice" @input="setPriceSubtotal(scope.row)" @blur="calculatedPremium(scope.row)" style="width:80px;"></nz-input>
              <span>元/{{scope.row.packagingType}}</span>
            </template>
          </nz-table-column>
          <nz-table-column prop="quantity" label="数量" width="150">
            <template slot-scope="scope">
              <nz-input v-model="scope.row.quantity" @input="setSubtotal(scope.row)" style="width:80px;" @blur="calculatedPremium(scope.row)"></nz-input>
              <span>{{scope.row.packagingType}}</span>
            </template>
          </nz-table-column>
          <nz-table-column prop="subtotal" label="小计" width="170">
            <template slot-scope="scope">
              ¥{{scope.row.subtotal}}
              <span>元</span>
            </template>
          </nz-table-column>
          <nz-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <nz-button type="text" @click="deleteDetail(scope.row)">删除</nz-button>
            </template>
          </nz-table-column>
        </nz-table>
        <div class="total-count">
          <div class="total-count-span">清单共
            <span class="count-span">{{form.detail.length}}</span>条</div>
          <div class="total-count-val">总计
            <span class="count-span">{{form.amount}}</span>元</div>
        </div>
        <nz-form-item label="订单备注" prop="note">
          <nz-input v-model="form.note" type="textarea" maxlength=200 :autosize="{ minRows: 2, maxRows: 6}"></nz-input>
        </nz-form-item>
      </nz-form>
      <div class="nz-page-bottom-holder"></div>
      <div class="nz-page-bottom" style="margin-top: 60px;">
        <nz-button type="primary" @click="submit" :loading="isRegister">
          <i class="nz-icon-confirm"></i>生成进货单
        </nz-button>
        <nz-button @click="cancel">
          <i class="nz-icon-close"></i>取消</nz-button>
      </div>
    </div>
    <nz-dialog :title="titleName" ref="editSupplierDialog" :okHandler="editSupplierFirm" height="500">
      <edit-supplier ref="editSupplier"></edit-supplier>
    </nz-dialog>
  </div>
</template>
<script>
import editSupplier from '../data-management/supplier/edit.vue';
export default {
  components: {
    editSupplier
  },
  data() {
    let apiUrl = this.$apiUrl.PURCHASEPURCHASE;
    return {
      apiUrl: apiUrl,
      isRegister: false,
      productBarCode: '',
      titleName: '新增供应商',
      requestUrl: apiUrl.GET_LIST,
      form: {
        supplierID: '',
        total: 0,
        amount: 0,
        productId: '',
        detail: []
      },
      //选中的行
      selectedRows: [],
      rules: {
        supplierID: [this.$formRules.required],
        note: [this.$formRules.maxLength(200)]
      },
      dialogVisible: false,
      productModel: false
    };
  },
  watch: {
    'form.productId': function() {}
  },
  methods: {
    setSubtotal(row) {
      let detail = row;
      if (detail.quantity > 0) {
        if (/^\d+?$/.test(detail.quantity) && detail.quantity < 100000000) {
          detail.subtotal = (detail.quantity * detail.unitPrice).toFixed(2);
        } else {
          // detail.quantity = '';
          // detail.subtotal = '';
          this.$message.showError('数量必须为大于0的整数，且最大为8位');
        }
      } else {
        this.$message.showError('数量必须为大于0的整数，且最大为8位');
      }
    },
    setPriceSubtotal(row) {
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
    },
    async deleteBatch() {
      let self = this;
      this.selectedRows.map(r => {
        self.form.detail.remove(r);
        self.calculatedPremium(r);
      });
    },
    //列表项选择
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    async clickItem2() {
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
        this.form.detail.push({
          productId: val.productId,
          productName: val.productName,
          productBarCode: val.productBarCode,
          quantity: 1,
          unitPrice: val.costUnitPrice,
          productionBatch: '',
          productionDate: '',
          packingSpecifications: val.packingSpecifications,
          packagingUnit: val.packagingUnit,
          packagingType: val.packagingType,
          subtotal: val.costUnitPrice * 1
        });
        this.$nextTick();
        this.productBarCode = '';
      } else {
        this.$message.showError(err);
      }
    },
    async clickItem(val) {
      if (val) {
        let newDetail = {
          productId: val.productId,
          productName: val.productName,
          productBarCode: val.productBarCode,
          quantity: 1,
          unitPrice: val.costUnitPrice,
          productionBatch: '',
          productionDate: '',
          packingSpecifications: val.packingSpecifications,
          packagingUnit: val.packagingUnit,
          packagingType: val.packagingType,
          subtotal: val.costUnitPrice * 1
        };
        this.form.detail.push(newDetail);
        this.calculatedPremium(newDetail);
        this.$nextTick();
        this.form.productId = '';
      }
    },
    //总计算
    calculatedPremium(row) {
      if (row.unitPrice != undefined && !isNaN(row.unitPrice) && row.quantity > 0 && row.quantity % 1 === 0) {
        row.unitPrice = parseFloat(row.unitPrice).toFixed(2);
        row.subtotal = (row.quantity * row.unitPrice).toFixed(2);
        let self = this;
        self.form.amount = 0;
        this.form.detail.map(function(x) {
          if (x.subtotal != '') {
            self.form.amount += parseFloat(x.subtotal);
          }
        });
        self.form.amount = parseFloat(self.form.amount).toFixed(2);
      } else {
        // row.quantity = '';
        // row.subtotal = '';
        this.$message.showError('单价金额必须为大于0的数字，且小于1000w');
      }
    },
    //提交生成订单
    async submit() {
      const valid = await this.$refs.form.validate();
      if (this.form.detail.length == 0) {
        this.$message.showError('请先添加商品');
        return false;
      }
      let params = Object.deepClone(this.form);
      //验证表格内的数据
      if (!this.checkPurchases(params.detail)) {
        this.submitLoading = false;
        return;
      }
      if (valid) {
        this.isRegister = true;
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.SAVE, this.form);
        if (res.resultCode == 200) {
          await this.$eventBus.$emit('getRouteJump', 'purchaseAccount');
          await this.$nextTick();
          this.$router.push('/main/purchaseAccount');
        } else {
          this.$message.showError(err);
          this.isRegister = false;
        }
      }
    },
    //取消返回首页
    async cancel() {
      await this.$eventBus.$emit('getRouteJump', 'index');
      await this.$nextTick();
      this.$router.push('/main/index');
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
    //校验进货表格内的数据
    checkPurchases(details) {
      details.map(detail => {
        detail.index = details.indexOf(detail) + 1;
      });
      let emptyItems = details.filter(item => {
        return !item.productionBatch && !item.productionDate && !item.quantity && !item.costUnitPrice;
      });
      for (let item of emptyItems) {
        details.remove(item);
      }
      for (let item of details) {
        if (!item.productionBatch && item.productionBatch.length < 20) {
          this.$message.warning(`第${item.index}行进货数据验证失败，请填写生产批次`);
          return false;
        }
        if (item.productionBatch.length > 20) {
          this.$message.warning(`第${item.index}行进货数据验证失败，请填写小于20位的生产批次`);
          return false;
        }
        if (!item.productionDate) {
          this.$message.warning(`第${item.index}行进货数据验证失败，请选择生产日期`);
          return false;
        }
        if (!item.unitPrice) {
          this.$message.warning(`第${item.index}行进货数据验证失败，请填写单价`);
          return false;
        }
        if (item.unitPrice < 0) {
          this.$message.warning(`第${item.index}行进货数据验证失败，单价金额必须为大于0的数字，且小于1000w`);
          return false;
        }
        if (isNaN(item.unitPrice) || item.unitPrice > 10000000) {
          this.$message.warning(`第${item.index}行进货数据验证失败，单价金额必须为大于0的数字，且小于1000w`);
          return false;
        }
        if (!item.quantity) {
          this.$message.warning(`第${item.index}行进货数据验证失败，请填写数量`);
          return false;
        }
        if (!/^\d+?$/.test(item.quantity) || item.quantity > 100000000) {
          this.$message.warning(`第${item.index}行进货数据验证失败，数量必须大于0的整数，且最大为8位`);
          return false;
        }
        if (item.quantity <= 0) {
          this.$message.warning(`第${item.index}行进货数据验证失败，数量必须大于0的整数，且最大为8位`);
          return false;
        }
      }
      return true;
    },
    //添加供应商
    async supplierAdd() {
      this.$refs.editSupplierDialog.show();
      await this.$nextTick();
      this.$refs.editSupplier.addForm();
    },
    async editSupplierFirm(callback) {
      let { valid, err, res } = await this.$refs.editSupplier.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editSupplierDialog.hide();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }

      callback();
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.form.resetFields();
    });
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
  min-height: 740px;
}
.nz-page-bottom-holder {
  height: 57px;
  width: 100%;
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
  height: 42px;
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
.count-span {
  font-size: 16px;
  color: #03a78c;
  cursor: pointer;
}
.add-icon {
  font-size: 18px;
  color: #00a88a;
}
</style>
<style rel='stylesheet/less' lang='less'>
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