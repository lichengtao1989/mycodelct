<template>
  <div class="purchaseoutlct">
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <div class="listwrap">
      <div class="topin">
        <nz-form label-width="80px" ref="form" :model="form" :rules="rules">
          <nz-form-item label="购买人" prop="customerID">
            <nz-select v-model="form.accountType" placeholder="请选择供应商" @change="changeFn">
              <nz-option label="农户" value="2"></nz-option>
              <nz-option label="农资店" value="3"></nz-option>
              <nz-option label="总经销商" value="5"></nz-option>
            </nz-select>
            <!-- <nz-button type="text" @click="addDialog">
              <i class="nz-icon-add2 add-icon"></i>创建</nz-button> -->
          </nz-form-item>

          <nz-form-item label="身份证号" prop="contact" required>
            <nz-input v-model="form.contact"></nz-input>
          </nz-form-item>
          <nz-form-item label="联系电话" prop="contact">
            <nz-input v-model="form.contact"></nz-input>
          </nz-form-item>
          <nz-form-item label="搜索商品" v-if="!productModel" prop="productId">
            <nz-remote-select v-model="form.productId" value-key="productId" label-key="productName" item-vlaue="itemVlaue" class="cusotmer-input" :remote-url="$apiUrl.DEMO.LISt" :params="{status: 1, restrictedStaus:0}" placeholder="请选择商品" @select="clickItem">
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
            <tr v-for="item in listAry" :key="item.name">
              <td>
                <span class="mc">{{item.name}}</span>
              </td>
              <td>
                <span class="guige">{{item.format}}</span>克/支</td>
              <td>
                <nz-input placeholder="数量" v-model="item.num"></nz-input>
              </td>
              <td>瓶</td>
              <td>
                <nz-input placeholder="生产批次" v-model="item.batch"></nz-input>
              </td>
              <td>
                <nz-datepicker placeholder="生产日期" :chooseFuture="true" type="date" v-model="item.date"></nz-datepicker>
              </td>
              <td>
                <nz-datepicker placeholder="有效期" :chooseFuture="true" type="date" v-model="item.validity"></nz-datepicker>
              </td>
              <td>
                <nz-input placeholder="存放库位" v-model="item.position"></nz-input>
              </td>
              <td>
                <span class="nztextbtn" @click="showDialogCode">农药码</span>
                <span class="nztextbtn">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="listvalout">
        <billsum></billsum>
      </div>
      <div class="prescriptionout">
        <prescription @lookPrescription="lookPrescription" v-for="item in prescriptionListAry" :key="item"></prescription>
      </div>
      <div class="nextbtn">
        <nz-checkbox class="bot3">打印小票</nz-checkbox>
        <nz-button type="primary" size="small" @click="putIn" class="bot3">
          <i class="nz-icon-confirm"></i>
          生产销售单
        </nz-button>
        <nz-button size="small" class="bot3">
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

export default {
  data() {
    return {
      prescriptionListAry: [],
      listAry: [],
      columns: [{ name: '农药登记号' }, { name: '投入品名称' }, { name: '规格' }, { name: '数量' }, { name: '单位' }, { name: '单价（元）' }, { name: '小计' }, { name: '操作' }],
      productModel: false,
      form: {},
      dialogflag: false,
      search: { key1: '', key2: '', key3: '', key4: '', key5: '', key6: '' },
      contentHeight: 500
    };
  },
  components: { addEditDialog, dialogCode, billsum, prescription },
  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  methods: {
    lookPrescription() {
      this.$refs.dialog.show();
    },
    async putIn() {
      console.log(this.listAry);
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
            unitPrice: val.costUnitPrice,
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
            unitPrice: val.costUnitPrice,
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
        console.log(this.form.detail);
      }
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
    showDialogCode() {
      this.$refs.dialogcode.show();
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
      console.log(msg);
      const result = await this.$message.confirm('确定要禁用吗?');
      if (result) {
        this.refresh();
      }
    },
    resize() {
      // this.contentHeight = window.innerHeight - 50;
    }
  },
  mounted() {
    // this.resize();
    // window.addEventListener("resize", this.resize);
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
  padding-top:50px;
  text-align: center;
  .bot3 {
    margin-right: 10px;
  }
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
