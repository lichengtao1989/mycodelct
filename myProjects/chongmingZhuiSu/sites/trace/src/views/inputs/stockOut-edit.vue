<template>
  <div>
    <div class="cjm-edit-page">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="出库机构" prop="stockOutOrgID" required>
          <cjm-remote-select v-model="form.stockOutOrgID" :label="stockOutOrgName" :disabled="stockOutOrgDisabled" :remote-url="$globalData.get('trace','apiUrl').autoComplete.ORG" :params="{scene:'inputsStockOut'}"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="出库类型" prop="billType" required>
          <cjm-enum-select v-model="form.billType" enum-name="投入品出库类型" :disabled="!showBillType" enum-namespace="trace"></cjm-enum-select>
        </cjm-form-item>
        <cjm-form-item label="出库时间" prop="stockOutTime" required>
          <cjm-date-picker v-model="form.stockOutTime" type="datetime" format="yyyy/MM/dd HH:mm:ss"></cjm-date-picker>
        </cjm-form-item>
        <cjm-form-item label="领用人" prop="recipientID" required key="recipientID" v-if="form.billType!=12">
          <cjm-remote-select v-model="form.recipientID" ref="recipient" :remote-url="$globalData.get('trace','apiUrl').autoComplete.EMPLOYEE"></cjm-remote-select>
          <cjm-button type="text" class="button-create" @click="addEmployee">创建</cjm-button>
        </cjm-form-item>
        <cjm-form-item label="购买人" prop="purchaserID" required key="purchaserID" v-if="form.billType==12">
          <cjm-remote-select v-model="form.purchaserID" ref="purchaser" :remote-url="$globalData.get('trace','apiUrl').autoComplete.PURCHASER"></cjm-remote-select>
          <cjm-button type="text" class="button-create" @click="addPurchaser">创建</cjm-button>
        </cjm-form-item>
        <cjm-form-item label="技术员" prop="technicalID">
          <cjm-remote-select v-model="form.technicalID" ref="technical" :remote-url="$globalData.get('trace','apiUrl').autoComplete.EMPLOYEE"></cjm-remote-select>
          <cjm-button type="text" class="button-create" @click="addEmployee">创建</cjm-button>
        </cjm-form-item>
        <cjm-form-item label="附件图片" prop="images" class="cjm-form-item-long">
          <cjm-image-upload v-model="form.images" :multiple="true" :maxNumber="5" tips="建议上传出库单或出库登记表图片，最多支持上传5张图片"></cjm-image-upload>
        </cjm-form-item>
      </cjm-form>

      <!--列表-->
      <cjm-table style="margin-top:10px;" :data="form.inputs" class="cjm-table cjm-editableTable" :stripe="true" border>
        <cjm-table-column prop="index" label="序号" width="60">
          <template slot-scope="scope">
            {{form.inputs.indexOf(scope.row)+1}}
          </template>
        </cjm-table-column>
        <cjm-table-column prop="type" label="投入品类型" width="130">
          <template slot-scope="scope">
            <cjm-enum-select v-model="scope.row.type" enum-name="投入品类型" enum-namespace="trace" :clearable="true" @change="inputsTypeChange(arguments[0], scope.row)"></cjm-enum-select>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="name" label="投入品名称" width="170">
          <template slot-scope="scope">
            <cjm-remote-select :value="scope.row.id" :remote-url="$globalData.get('trace','apiUrl').autoComplete.INPUTS" :params="{type:scope.row.type}" @select="inputsSelect(arguments[0], scope.row)"></cjm-remote-select>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="spec" label="规格"></cjm-table-column>
        <cjm-table-column prop="productionBatch" label="生产批次" min-width="150">
          <template slot-scope="scope">
            <cjm-remote-select :value="scope.row.productionBatch" :fetch-data="getBatchStockQuantity" :params="{inputsID:scope.row.id, orgID: form.stockOutOrgID}" value-key="productionBatch" label-key="productionBatch" @select="productionBatchSelect(arguments[0], scope.row)"></cjm-remote-select>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="stockQuantity" label="库存数量" width="90"></cjm-table-column>
        <cjm-table-column prop="quantity" label="出库数量" width="100">
          <template slot-scope="scope">
            <cjm-input v-model="scope.row.quantity"></cjm-input>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="measurementUnit" label="单位" width="60"></cjm-table-column>
        <cjm-table-column prop="efficacyDay" label="安全间隔期/天" width="120">
        </cjm-table-column>
        <cjm-table-column label="操作" width="60" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="deleteInputs(scope.row)">删除</cjm-button>
          </template>
        </cjm-table-column>
      </cjm-table>
      <div class="add-inputs-wrap" v-show="form.inputs.length<20">
        <div class="add-inputs">
          <cjm-button type="text" @click="addInputs">
            <i class="cjm-icon-add2"></i>添加投入品</cjm-button>
        </div>
      </div>

      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="popPage">
          <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
        <cjm-button type="primary" @click="submit" :loading="submitLoading">
          <i class="cjm-icon-confirm"></i>出库</cjm-button>
      </div>
    </div>

    <!--新建领用人、技术员-->
    <cjm-dialog :visible.sync="employeeDialogVisible" title="添加员工" :okHandler="employeeEditConfirm">
      <employee-edit ref="employeeEdit"></employee-edit>
    </cjm-dialog>
    <!--新建购买人-->
    <cjm-dialog :visible.sync="purchaserDialogVisible" title="添加采购商" :okHandler="purchaserEditConfirm">
      <purchaser-edit ref="purchaserEdit"></purchaser-edit>
    </cjm-dialog>
  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import EmployeeEdit from 'base/views/employee/edit.vue';
import PurchaserEdit from 'base/views/purchaser/edit.vue';
export default {
  mixins: [pageSwitch],
  components: {
    EmployeeEdit,
    PurchaserEdit
  },
  data: function() {
    return {
      form: {
        stockOutOrgID: '',
        billType: '',
        stockOutTime: '',
        recipientID: '',
        purchaserID: '',
        technicalID: '',
        images: [],
        inputs: [
          {
            id: '',
            type: '',
            spec: '',
            productionBatch: '',
            stockQuantity: '',
            quantity: '',
            measurementUnit: '',
            efficacyDay: ''
          }
        ]
      },
      rules: {
        stockOutOrgID: [this.$formRules.required],
        billType: [this.$formRules.required],
        stockOutTime: [this.$formRules.required],
        recipientID: [this.$formRules.required],
        purchaserID: [this.$formRules.required]
      },
      //正在编辑的投入品对象
      editInputsItem: {},
      submitLoading: false,
      stockOutOrgName: '',
      stockOutOrgDisabled: false,
      employeeDialogVisible: false,
      purchaserDialogVisible: false
    };
  },
  computed: {
    showBillType() {
      let showType = true;
      if (this.$route.meta.code != 'inputsStockOutList') {
        showType = false;
      }
      this.form.billType = '12';
      return showType;
    }
  },
  watch: {
    'form.stockOutOrgID': function(val) {
      this.form.inputs.forEach(input => {
        input.productionBatch = '';
        input.stockQuantity = '';
      });
    }
  },
  methods: {
    getBatchStockQuantity(query, callback, params) {
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').inputs.GET_BATCH_STOCK_QUANTITY, { pageSize: 50, productionBatch: query, ...params }).then(r => {
        callback(r.data.rows);
      });
    },
    inputsTypeChange(type, row) {
      row.id = '';
      row.spec = '';
      row.productionBatch = '';
      row.stockQuantity = '';
      row.measurementUnit = '';
      row.efficacyDay = '';
    },
    //投入品选择
    inputsSelect(item, row) {
      if (item && item.type != row.type) {
        row.type = item.type;
      }
      this.$nextTick(() => {
        row.spec = item ? item.spec : '';
        row.id = item ? item.id : '';
        row.productionBatch = '';
        row.stockQuantity = '';
        row.measurementUnit = item ? item.measurementUnit : '';
        row.efficacyDay = item && item.type == 3 ? item.efficacyDay : '';
      });
    },
    //批次选择
    productionBatchSelect(item, row) {
      row.productionBatch = item ? item.productionBatch : '';
      row.stockQuantity = item ? item.quantity : '';
    },
    //添加投入品
    addInputs() {
      this.form.inputs.push({
        id: '',
        type: '',
        spec: '',
        productionBatch: '',
        stockQuantity: '',
        quantity: '',
        measurementUnit: '',
        efficacyDay: ''
      });
    },
    //删除投入品
    deleteInputs(row) {
      this.form.inputs.remove(row);
    },
    //校验投入品表格内的数据
    checkInputs(inputs) {
      inputs.map(input => {
        input.index = inputs.indexOf(input) + 1;
      });
      let emptyItems = inputs.filter(item => {
        return !item.type && !item.id && !item.quantity && !item.productionBatch;
      });
      for (let item of emptyItems) {
        inputs.remove(item);
      }
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].id) {
          this.$message.warning(`第${inputs[i].index}行投入品数据验证失败，请选择投入品`);
          return false;
        }
        if (!inputs[i].quantity) {
          this.$message.warning(`第${inputs[i].index}行投入品数据验证失败，请填写出库数量`);
          return false;
        }
        if (!/^\d+?$/.test(inputs[i].quantity) || parseInt(inputs[i].quantity) > parseInt(inputs[i].stockQuantity)) {
          this.$message.warning(`第${inputs[i].index}行投入品数据验证失败，出库数量必须为数字，且小于库存数量`);
          return false;
        }
      }
      return true;
    },
    //出库按钮点击事件
    submit() {
      this.submitLoading = true;
      //验证表单
      this.$refs.form.validate(val => {
        if (!val) {
          this.submitLoading = false;
          return;
        }
        let params = Object.deepClone(this.form);
        //验证表格内的数据
        if (!this.checkInputs(params.inputs)) {
          this.submitLoading = false;
          return;
        }
        if (this.form.images.length === 0 && params.inputs.length === 0) {
          this.$message.warning('请至少添加一个投入品');
          this.submitLoading = false;
          return;
        }
        //处理提交数据
        params.inputs.forEach(input => {
          delete input.type;
          delete input.stockQuantity;
          delete input.measurementUnit;
          delete input.efficacyDay;
          delete input.spec;
        });
        //发送数据
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').inputs.STOCK_OUT, params)
          .then(r => {
            if (r.resultCode == '200') {
              this.$emit('submitSuccess');
              this.$message.success('出库成功');
              this.popPage();
            } else {
              this.$message.error(r.msg);
            }
            this.submitLoading = false;
          })
          .catch(() => {
            this.submitLoading = false;
          });
      });
    },
    addEmployee() {
      this.employeeDialogVisible = true;
      this.$nextTick(function() {
        this.$refs.employeeEdit.addForm();
      });
    },
    addPurchaser() {
      this.purchaserDialogVisible = true;
      this.$nextTick(function() {
        this.$refs.purchaserEdit.addForm();
      });
    },
    employeeEditConfirm(callback) {
      this.$refs.employeeEdit
        .submit()
        .then(() => {
          this.$message.success('添加成功');
          this.employeeDialogVisible = false;
          this.$refs.recipient.clear();
          this.$refs.technical.clear();
          callback();
        })
        .catch(error => {
          callback();
          if (error) {
            this.$message.error(error.message);
          }
        });
    },
    purchaserEditConfirm(callback) {
      this.$refs.purchaserEdit
        .submit()
        .then(() => {
          this.$message.success('添加成功');
          this.purchaserDialogVisible = false;
          this.$refs.purchaser.clear();
          callback();
        })
        .catch(error => {
          callback();
          if (error) {
            this.$message.error(error.message);
          }
        });
    }
  },
  mounted() {
    let user = this.$globalData.get('currentUser');
    if (user.corpType != this.$globalData.get('trace', 'enums').corpType.GOVERNMENT || user.orgType != this.$globalData.get('trace', 'enums').orgType.HEAD) {
      this.stockOutOrgName = user.orgName;
      this.form.stockOutOrgID = user.orgID;
      this.stockOutOrgDisabled = true;
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
.el-form-item {
  padding-right: 50px;
  box-sizing: border-box;
}

.button-create {
  position: absolute;
  top: 0;
  right: -40px;
}

.add-inputs-wrap {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2px;
}

.add-inputs {
  text-align: center;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border: 1px solid #dfe6ec;
  border-top: none;
}
</style>
