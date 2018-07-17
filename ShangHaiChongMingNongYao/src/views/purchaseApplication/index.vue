<template>
  <div style="padding: 30px">
    <nz-form v-if="form" :validateOnRuleChange="false" label-width="80px" ref="form" :model="form" :rules="rules">
      <div class="left-group" style="width: 580px">
        <nz-form-item label="总经销商" required prop="Suppliers">
          <nz-remote-select v-model="form.Suppliers" :remoteUrl="$apiUrl.COMMON.DROP_DOWN.DISTRIBUTOR" placeholder="请选择总经销商"></nz-remote-select>
        </nz-form-item>
        <nz-form-item label="紧急程度" prop="PriorityDescription">
          <nz-enum-select v-model="form.PriorityDescription" :options="$enum('进货申请紧急程度').values" isRadioBtn></nz-enum-select>
        </nz-form-item>
        <nz-form-item label="备注" prop="Note">
          <nz-input v-model="form.Note" type="textarea" rows="5" resize="none"></nz-input>
        </nz-form-item>
        <nz-form-item label="搜索商品">
          <div style="width: 400px;display: inline-block">
            <nz-input v-model="goodsCode" @keyup.enter.native="enterCode" ref="scanInput" v-if="isScanType" placeholder="请扫描商品条形码"></nz-input>
            <nz-remote-select @select="onGoodsSelected" :remoteUrl="$apiUrl.COMMON.DROP_DOWN.PESTICIDEINFO" v-model="goodsId" v-if="!isScanType" placeholder="请选择商品"></nz-remote-select>
          </div>
          <nz-button @click="toggleInputType" type="text" class="input-mode">
            <i class="nz-icon-switching count-span"></i>
            <span v-if="isScanType">扫码模式</span>
            <span v-if="!isScanType">输入模式</span>
          </nz-button>
        </nz-form-item>
      </div>
      <nz-table :data="form.sonList" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column prop="RegisteCode" label="农药登记号"></nz-table-column>
        <nz-table-column prop="ProductName" label="农药名称"></nz-table-column>
        <nz-table-column label="规格">
          <template slot-scope="scope"><span>{{spec(scope.row)}}</span></template>
        </nz-table-column>
        <nz-table-column prop="Count" label="数量">
          <template slot-scope="scope">
            <nz-form-item style="margin-bottom: 0" :prop="'Count_'+scope.$index" label-width="0">
              <nz-input v-model="scope.row.Count"></nz-input>
            </nz-form-item>
          </template>
        </nz-table-column>
        <nz-table-column prop="SpecUnit" label="单位"></nz-table-column>
        <nz-table-column prop="SaleUnitPrice" label="单价（元）"></nz-table-column>
        <nz-table-column label="小计（元）">
          <template slot-scope="scope"><span>{{ smallCalc(scope.row) }}</span></template>
        </nz-table-column>
        <nz-table-column label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="delGoods(scope.row)">删除</nz-button>
          </template>
        </nz-table-column>
      </nz-table>
      <div class="bill">清单共<span class="num">{{ form.sonList.length }}</span>项，共计<span class="num">{{ totalCalc }}</span>元</div>
      <nz-form-item prop="sonList" label-width="0"></nz-form-item>
    </nz-form>
    <div style="text-align: center;margin-top: 30px">
      <nz-button type="primary" @click="submit" :loading="isSubmiting"><i class="nz-icon-confirm"></i>提交</nz-button>
      <nz-button @click="cancel"><i class="nz-icon-close"></i>取消</nz-button>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        formModel: {Suppliers: '', PriorityDescription: '0', Note: '', sonList: []},
        form: null,
        goodsId: '', //搜索商品 输入模式
        goodsCode: '', //搜索商品 扫码模式
        isSubmiting: false,
        isScanType: false
      };
    },
    computed: {
      rules(){
        const res = {
          Suppliers: [this.$formRules.required],
          sonList: [this.sonValid()]
        };
        this.form.sonList.forEach((item, index) => {
          res['Count_' + index] = [this.countValid(index)];
        });
        return res;
      },
      totalCalc(){
        if (this.form) {
          let res = 0;
          this.form.sonList.forEach(item => {
            res += this.smallCalc(item);
          });
          return res;
        }
        return 0;
      }
    },
    methods: {
      spec(row){
        const {SpecQuantity, SpecUnit, SpecType} = row;
        if (SpecQuantity && SpecUnit && SpecType) {
          return `${SpecQuantity}${SpecUnit}/${SpecType}`;
        }
        return '';
      },
      countValid(index){
        return {
          validator: async (rule, value, callback) => {
            let err = '';
            const Count = this.form.sonList[index].Count;
            if (!Count) {
              err = '请输入数量';
            } else if (isNaN(Count)) {
              err = '数量只能输入数字!';
            }
            if (err) {
              callback(new Error(err));
            } else {
              callback();
            }
            await this.$nextTick();
            this.$refs.form.validateField('sonList');
          }, trigger: 'change'
        };
      },
      sonValid(){
        return {
          validator: (rule, value, callback) => {
            let err = '';
            if (this.form.sonList.length > 0) {
              this.form.sonList.forEach(item => {
                if (!item.Count) {
                  err = '请输入数量!';
                } else if (isNaN(item.Count)) {
                  err = '数量只能输入数字!';
                }
              });
            } else {
              err = '请选择商品';
            }
            if (err) {
              callback(new Error(err));
            } else {
              callback();
            }
          }, trigger: 'none'
        };
      },
      async submit(){
        const valid = await this.$validForm(this.$refs.form);
        if (valid) {
          this.isSubmiting = true;
          let {Suppliers, PriorityDescription, Note, sonList} = this.form;
          const MoneyCount = this.totalCalc;
          sonList = sonList.map(item => {
            const PesticideID = item.Id;
            const Count = item.Count;
            return {PesticideID, Count}
          });
          const isSuccess = await this.$model('purchase').add(Suppliers, PriorityDescription, Note, MoneyCount, sonList);
          this.isSubmiting = false;
          if (isSuccess) {
            this.$message.success('提交成功');
            this.$router.replace('/main/index');
          }
        }
      },
      cancel(){
        this.$router.replace('/main/index');
      },
      smallCalc(row){
        return row.Count > 0 ? (row.SaleUnitPrice * row.Count) : (0);
      },
      async onGoodsSelected(item){
        if (item) {
          const {id} = item;
          await this.addGoods(id);
          await this.$nextTick();
          this.goodsId = '';
        }
      },
      async addGoods(id){
        let data = await this.$model('greenPesticide').getInfo(id);
        data.Count = '1';
        this.sonAdd(data);
      },
      sonAdd(data){
        const matchSon = this.form.sonList.find(item => item.Id === data.Id);
        if (matchSon) {
          let Count = (matchSon.Count * 1 + 1) + '';
          if (isNaN(Count)) {
            Count = '1';
          }
          matchSon.Count = Count;
        } else {
          this.form.sonList.push(data);
        }
      },
      async enterCode(){
        const ProductBarCode = this.goodsCode;
        if (ProductBarCode) {
          const data = await this.$model('greenPesticide').getInfoByProductBarCode(ProductBarCode);
          if (data) {
            data.Count = '1';
            this.sonAdd(data);
          }
          await this.$nextTick();
          this.goodsCode = '';
        }
      },
      async toggleInputType(){
        this.isScanType = !this.isScanType;
        await this.$nextTick();
        const scanInput = this.$refs.scanInput;
        if (scanInput) {
          scanInput.focus();
        }
      },
      delGoods(row){
        this.form.sonList = Object.jsonClone(this.form.sonList.filter(item => item !== row));
      }
    },
    async mounted(){
      this.form = Object.jsonClone(this.formModel);
      await this.$nextTick();
      this.$refs.form.clearValidate();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/assets/css/config";

  .bill {
    color: #606266;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ebeef5;
    border-top: 0;
    text-indent: 20px;
    .num {
      color: @primaryColor;
      margin: 0 3px;
    }
  }
</style>
