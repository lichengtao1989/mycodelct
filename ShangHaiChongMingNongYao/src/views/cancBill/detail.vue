<template>
  <div v-hide-menu="true" style="padding: 31px 33px">
    <!-- <nz-scrollbar style="height:500px"> -->
    <nz-form>
      <h3 class="title">销售单据信息</h3>
      <nz-table element-loading-text="拼命加载中" :data="orderData" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column label="销售单号" prop="BillCode"></nz-table-column>
        <nz-table-column label="订单金额" prop="NeedTotalMoney"></nz-table-column>
        <nz-table-column label="购买人" prop="FarmerName"></nz-table-column>
        <nz-table-column label="身份证号" prop="FarmerIDCode"></nz-table-column>
        <nz-table-column label="业务员" prop="SaleManName"></nz-table-column>
        <nz-table-column label="销售时间" prop="CreateTime"></nz-table-column>
        <nz-table-column label="状态" prop="">
          <template slot-scope="scope">
            完成
          </template>
        </nz-table-column>
      </nz-table>
      <div class="partinfo" v-if="urlType==1">
        <h3 class="title">订单商品</h3>
        <nz-form-item>
          <nz-table element-loading-text="拼命加载中" :data="goodsDetails" class="nz-table" :stripe="true" tooltip-effect="light" border>
            <nz-table-column label="农药名称" prop="PesticideName"></nz-table-column>
            <nz-table-column label="规格/包装" prop="PesticideSpec"></nz-table-column>
            <nz-table-column label="注册商标" prop="PesticideTraderMark"></nz-table-column>
            <nz-table-column label="数量" prop="Count"></nz-table-column>
            <nz-table-column label="单价" prop="UnitPrice"></nz-table-column>
            <nz-table-column label="小计" prop="TotalMoney"></nz-table-column>
            <nz-table-column label="操作" v-if="type!=2">
              <template slot-scope="scope">
                <nz-button type="text" @click="addAryItem(scope)">添加</nz-button>
              </template>
            </nz-table-column>
          </nz-table>
        </nz-form-item>
      </div>
      <h3 class="title">退货商品列表</h3>
      <!-- goodsDetails -->
      <nz-table element-loading-text="拼命加载中" :data="goodsDetailsReturn" class="nz-table" :stripe="true" tooltip-effect="light" border>
        <nz-table-column label="农药名称" prop="PesticideName"></nz-table-column>
        <nz-table-column label="规格/包装" prop="PesticideSpec"></nz-table-column>
        <nz-table-column label="注册商标" prop="PesticideTraderMark"></nz-table-column>
        <nz-table-column label="数量" prop="Count">
          <template slot-scope="scope">
            <nz-input type="text" v-model="scope.row.Count" readonly="true"></nz-input>
          </template>
        </nz-table-column>
        <nz-table-column label="单价" prop="UnitPrice">
        </nz-table-column>
        <nz-table-column label="小计" prop="TotalMoney"></nz-table-column>
        <nz-table-column label="操作" v-if="type!=2">
          <template slot-scope="scope">
            <nz-button type="text" @click="delFn(scope)">删除</nz-button>
          </template>
        </nz-table-column>
      </nz-table>
      <div class="xuanze">
        <span class="tkze">退款总额:
          <span class="spzt">{{totalval}}</span>元</span>
        <span class="xzdx">
          <nz-radio :disabled="type==2" v-model="radio" label="1" class="ras">现金退款</nz-radio>
          <nz-radio :disabled="type==2" v-model="radio" label="2" class="ras">账户预留</nz-radio>
        </span>
      </div>
      <nz-form-item label="订单备注" label-width="75px">
        <nz-input readonly type="textarea" rows="3" resize="none" placeholder="请输入备注"></nz-input>
      </nz-form-item>
      <div class="nzbtn2">
        <nz-button type="">取消</nz-button>
        <nz-button type="primary" v-if="type!=2" @click="submit">确定</nz-button>
      </div>
    </nz-form>
    <!-- </nz-scrollbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      urlType: '1',
      totalval: '',
      radio: '1',
      // orderData: [{}, {}, {}, {}, {}],
      // goodsDetails: [{}, {}, {}, {}, {}],
      orderData: [],
      goodsDetails: [],
      goodsDetailsReturn: [],
      type: 1
    };
  },
  methods: {
    delFn(val) {
      this.goodsDetailsReturn.splice(val.$index, 1);
      this.goodsDetails.push(val.row);
    },
    addAryItem(val) {
      this.goodsDetails.splice(val.$index, 1);
      this.goodsDetailsReturn.push(val.row);
    },
    async listInfo() {
      let { err, res } = await this.$ajax.post(this.$apiUrl.FARMSTORESALE.GETDETAILLIST, { FarmerStoreSaleId: this.$route.query.id });
      if (err) {
        console.log(err);
      } else {
        if (this.$route.query.type == 2) {
          this.goodsDetailsReturn = res.data.rows;
        } else {
          this.goodsDetails = res.data.rows;
        }
      }
    },
    async getOrderInfo() {
      this.orderData = [];
      const { id } = this.$route.query;
      let { err, res } = await this.$ajax.post(this.$apiUrl.FARMSTORESALE.DETAIL, { id: id });
      if (err) {
      } else {
        if (this.$route.query.type == 2) {
          this.urlType = 2;
        } else {
        }
        this.orderData.push(res.data);
        this.totalval = res.data.NeedTotalMoney;
        this.listInfo();
      }
    },

    async submit(callback) {
      if (this.$route.query.type == 2) {
        this.$router.push({ path: '/main/cancBill' });
      } else {
        if (this.goodsDetailsReturn.length < 1) {
          this.$message.showError('请添加退货商品');
        } else {
          let { err, res } = await this.$ajax.post(this.$apiUrl.FARMSTORESALE.RETURN, { FarmerStoreSaleId: this.$route.query.id });

          if (err) {
            console.log(err);
          } else {
            if (res.resultCode == 200) {
              this.$message.success('退货成功!');
              this.$router.push({ path: '/main/cancBill' });
            }
          }
        }
      }
    },
    init() {},
    show(data) {
      this.init(data);
      this.$refs.dialog.show();
    }
  },
  mounted() {
    this.getOrderInfo();
    const { type } = this.$route.query;
    if (type) {
      this.type = type;
    } else {
      this.type = 1;
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.partinfo {
  padding-top: 25px;
}
h3.title {
  font-size: 16px;
  color: #333333;
  padding: 0;
  margin: 0;
  margin-bottom: 13px;
  margin-top: 35px;
  &:first-child {
    margin-top: 0;
  }
}

.xuanze {
  font-size: 13px;
  padding-left: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
  .xzdx {
    margin-left: 150px;
  }
  .ras {
    margin-right: 70px;
  }
}

.nzbtn2 {
  text-align: right;
  padding-right: 25px;
  padding-bottom: 50px;
}
</style>
