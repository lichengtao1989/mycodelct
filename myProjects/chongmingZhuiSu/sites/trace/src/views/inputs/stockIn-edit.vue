<template>
  <div>
    <div class="cjm-edit-page">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="入库机构" prop="stockInOrgID" required>
          <cjm-remote-select v-model="form.stockInOrgID"
                             :label="stockInOrgName"
                             :disabled="stockInOrgDisabled"
                             :remote-url="$globalData.get('trace','apiUrl').autoComplete.ORG"
                             :params="{scene:'inputsStockIn'}"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="入库类型" prop="billType" required>
          <cjm-enum-select v-model="form.billType" enum-name="投入品入库类型" enum-namespace="trace"></cjm-enum-select>
        </cjm-form-item>
        <cjm-form-item label="入库时间" prop="stockInTime" required>
          <cjm-date-picker v-model="form.stockInTime" type="datetime" format="yyyy/MM/dd HH:mm:ss"></cjm-date-picker>
        </cjm-form-item>
        <cjm-form-item label="供应商" prop="supplierID" required>
          <cjm-remote-select v-model="form.supplierID" ref="supplier"
                             :remote-url="$globalData.get('trace','apiUrl').autoComplete.SUPPLIER"></cjm-remote-select>
          <cjm-button type="text" class="button-create" @click="addSupplier">创建</cjm-button>
        </cjm-form-item>
        <cjm-form-item label="仓管员" prop="employeeID">
          <cjm-remote-select v-model="form.employeeID" ref="employee"
                             :remote-url="$globalData.get('trace','apiUrl').autoComplete.EMPLOYEE"></cjm-remote-select>
          <cjm-button type="text" class="button-create" @click="addEmployee">创建</cjm-button>
        </cjm-form-item>
        <cjm-form-item label="附件图片" prop="images" class="cjm-form-item-long">
          <cjm-image-upload v-model="form.images" :multiple="true" :maxNumber="5"
                            tips="建议上传入库单或入库登记表图片，最多支持上传5张图片"></cjm-image-upload>
        </cjm-form-item>
      </cjm-form>

      <!--列表-->
      <cjm-table style="margin-top:10px;"
                 :data="form.inputs"
                 class="cjm-table cjm-editableTable"
                 :stripe="true"
                 border>
        <cjm-table-column prop="index" label="序号" width="60">
          <template slot-scope="scope">
            {{form.inputs.indexOf(scope.row)+1}}
          </template>
        </cjm-table-column>
        <cjm-table-column prop="type" label="投入品类型" width="130">
          <template slot-scope="scope">
            <cjm-enum-select v-model="scope.row.type"
                             enum-name="投入品类型"
                             enum-namespace="trace"
                             :clearable="true"
                             @change="inputsTypeChange(arguments[0], scope.row)"></cjm-enum-select>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="name" label="投入品名称" width="170">
          <template slot-scope="scope">
            <cjm-remote-select :value="scope.row.id"
                               :remote-url="$globalData.get('trace','apiUrl').autoComplete.INPUTS"
                               :params="{type:scope.row.type}"
                               @select="inputsSelect(arguments[0], scope.row)"></cjm-remote-select>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="spec" label="规格"></cjm-table-column>
        <cjm-table-column prop="quantity" label="数量" width="100">
          <template slot-scope="scope">
            <cjm-input v-model="scope.row.quantity"></cjm-input>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="measurementUnit" label="单位" width="60"></cjm-table-column>
        <cjm-table-column prop="productionBatch" label="生产批次" width="150">
          <template slot-scope="scope">
            <cjm-input v-model="scope.row.productionBatch"></cjm-input>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="productionTime" label="生产日期" width="160">
          <template slot-scope="scope">
            <cjm-date-picker v-model="scope.row.productionTime"></cjm-date-picker>
          </template>
        </cjm-table-column>
        <cjm-table-column prop="validTime" label="有效期" width="160">
          <template slot-scope="scope">
            <cjm-date-picker v-model="scope.row.validTime" :choose-future="true"></cjm-date-picker>
          </template>
        </cjm-table-column>
        <cjm-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="relateCode(scope.row)">关联码</cjm-button>
            <cjm-button type="text" @click="deleteInputs(scope.row)">删除</cjm-button>
          </template>
        </cjm-table-column>
      </cjm-table>
      <div class="add-inputs-wrap" v-show="form.inputs.length<20">
        <div class="add-inputs">
          <cjm-button type="text" @click="addInputs"><i class="cjm-icon-add2"></i>添加投入品</cjm-button>
        </div>
      </div>

      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="popPage"><i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
        <cjm-button type="primary" @click="submit" :loading="submitLoading"><i class="cjm-icon-confirm"></i>入库
        </cjm-button>
      </div>
    </div>
    <!--追溯码关联弹框-->
    <cjm-dialog :visible.sync="relateCodeDialogVisible" title="追溯码关联" :height="700" :okHandler="relateCodeConfirm">
      <stockIn-codeRelate ref="codeRelateForm"></stockIn-codeRelate>
    </cjm-dialog>
    <!--新建仓管员-->
    <cjm-dialog :visible.sync="employeeDialogVisible" title="添加员工" :okHandler="employeeEditConfirm">
      <employee-edit ref="employeeEdit"></employee-edit>
    </cjm-dialog>
    <!--新建供应商-->
    <cjm-dialog :visible.sync="supplierDialogVisible" title="添加供应商" :okHandler="supplierEditConfirm">
      <supplier-edit ref="supplierEdit"></supplier-edit>
    </cjm-dialog>
  </div>
</template>

<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  import StockInCodeRelate from './stockIn-codeRelate.vue'
  import EmployeeEdit from 'base/views/employee/edit.vue'
  import SupplierEdit from 'base/views/supplier/edit.vue'
  export default{
    mixins: [pageSwitch],
    components: {
      'stockIn-codeRelate': StockInCodeRelate,
      EmployeeEdit,
      SupplierEdit
    },
    data: function () {
      return {
        form: {
          stockInOrgID: '',
          billType: '',
          supplierID: '',
          employeeID: '',
          stockInTime: '',
          images: [],
          inputs: [{
            id: '',
            name: '',
            type: '',
            spec: '',
            quantity: '',
            productionTime: '',
            validTime: '',
            measurementUnit: '',
            productionBatch: '',
            relationCodeType: '1',
            relationCode: [],
            relationCodeStart: '',
            relationCodeEnd: ''
          }]
        },
        rules: {
          stockInOrgID: [
            this.$formRules.required
          ],
          billType: [
            this.$formRules.required
          ],
          stockInTime: [
            this.$formRules.required
          ],
          supplierID: [
            this.$formRules.required
          ]
        },
        relateCodeDialogVisible: false,
        //正在编辑的投入品对象
        editInputsItem: {},
        submitLoading: false,
        stockInOrgName: '',
        stockInOrgDisabled: false,
        employeeDialogVisible: false,
        supplierDialogVisible: false
      }
    },
    methods: {
      inputsTypeChange(type, row){
        row.id = '';
        row.name = '';
        row.spec = '';
        row.measurementUnit = '';
      },
      //投入品选择
      inputsSelect(item, row){
        if(item && item.type != row.type){
          row.type = item.type;
        }
        this.$nextTick(()=> {
          row.id = item ? item.id : '';
          row.name = item ? item.name : '';
          row.spec = item ? item.spec : '';
          row.measurementUnit = item ? item.measurementUnit : '';
        })
      },
      //添加投入品
      addInputs(){
        this.form.inputs.push({
          id: '',
          name: '',
          type: '',
          spec: '',
          quantity: '',
          productionTime: '',
          validTime: '',
          measurementUnit: '',
          productionBatch: '',
          relationCodeType: '1',
          relationCode: [],
          relationCodeStart: '',
          relationCodeEnd: ''
        });
      },
      //删除投入品
      deleteInputs(row){
        this.form.inputs.remove(row);
      },
      //投入品关联溯源码
      relateCode(row){
        if (!row.id || !row.quantity) {
          this.$message.warning('请选择投入品，填写数量，再进行关联');
          return;
        }
        if (!/^\d+?$/.test(row.quantity) || row.quantity > 99999999) {
          this.$message.warning('请正确填写数量，再进行关联');
          return;
        }
        this.editInputsItem = row;
        this.relateCodeDialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.codeRelateForm.editForm(row);
        });
      },
      relateCodeConfirm(callback){
        this.$refs.codeRelateForm.submit().then((data)=> {
          this.relateCodeDialogVisible = false;
          this.editInputsItem.relationCodeType = data.relationCodeType;
          this.editInputsItem.relationCodeStart = data.relationCodeStart;
          this.editInputsItem.relationCodeEnd = data.relationCodeEnd;
          this.editInputsItem.relationCode = data.relationCode;
          callback();
        }).catch((error)=> {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
      },
      //校验投入品表格内的数据
      checkInputs(inputs){
        inputs.map((input)=> {
          input.index = inputs.indexOf(input) + 1;
        });
        let emptyItems = inputs.filter((item)=> {
          return !item.type && !item.id && !item.quantity && !item.productionBatch && !item.validTime && !item.productionTime;
        });
        for (let item of emptyItems) {
          inputs.remove(item);
        }
        for (let item of inputs) {
          if (!item.id) {
            this.$message.warning(`第${item.index}行投入品数据验证失败，请选择投入品`);
            return false;
          }
          if (!item.productionBatch) {
            this.$message.warning(`第${item.index}行投入品数据验证失败，请填写生产批次`);
            return false;
          }
          if (!item.quantity) {
            this.$message.warning(`第${item.index}行投入品数据验证失败，请填写数量`);
            return false;
          }
          if (!/^\d+?$/.test(item.quantity) || item.quantity > 99999999) {
            this.$message.warning(`第${item.index}行投入品数据验证失败，数量必须为数字，且最大为8位`);
            return false;
          }
        }
        return true;
      },
      //入库按钮点击事件
      submit(){
        this.submitLoading = true;
        //验证表单
        this.$refs.form.validate((val)=> {
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
          params.inputs.forEach((input)=> {
            if (input.relationCodeType == '1') { //按号段
              input.relationCode = [];
              if (input.relationCodeStart && input.relationCodeEnd) {
                input.relationCode.push(input.relationCodeStart);
                input.relationCode.push(input.relationCodeEnd);
              }
            }
          });
          //发送数据
          this.$ajax.post(this.$globalData.get('trace', 'apiUrl').inputs.STOCK_IN, params).then((r)=> {
            if (r.resultCode == '200') {
              this.$emit('submitSuccess');
              this.$message.success('入库成功');
              this.popPage();
            } else {
              this.$message.error(r.msg);
            }
            this.submitLoading = false;
          }).catch(()=> {
            this.submitLoading = false;
          });
        });
      },
      addEmployee(){
        this.employeeDialogVisible = true;
        this.$nextTick(function () {
          this.$refs.employeeEdit.addForm();
        });
      },
      addSupplier(){
        this.supplierDialogVisible = true;
        this.$nextTick(function () {
          this.$refs.supplierEdit.addForm();
        });
      },
      employeeEditConfirm(callback){
        this.$refs.employeeEdit.submit().then(() => {
          this.$message.success('添加成功');
          this.employeeDialogVisible = false;
          this.$refs.employee.clear();
          callback();
        }).catch((error) => {
          callback();
          if(error){
            this.$message.error(error);
          }
        });
      },
      supplierEditConfirm(callback){
        this.$refs.supplierEdit.submit().then(() => {
          this.$message.success('添加成功');
          this.supplierDialogVisible = false;
          this.$refs.supplier.clear();
          callback();
        }).catch((error) => {
          callback();
          if(error){
            this.$message.error(error);
          }
        });
      }
    },
    mounted(){
      let user = this.$globalData.get('currentUser');
      if (user.corpType != this.$globalData.get('trace', 'enums').corpType.GOVERNMENT || user.orgType != this.$globalData.get('trace', 'enums').orgType.HEAD) {
        this.stockInOrgName = user.orgName;
        this.form.stockInOrgID = user.orgID;
        this.stockInOrgDisabled = true;
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .el-form-item{
    padding-right: 50px;
    box-sizing: border-box;
  }

  .button-create{
    position:absolute;
    top:0;
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
