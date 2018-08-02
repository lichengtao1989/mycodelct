<template>
  <div class="tpllctout" v-tab-title="'查询资金明细'" v-hide-menu="true">
    <div class="toppp">
      <div class="shouzhi">
        <div class="shou">收:+{{accountInfo.TotalIncome||0}}</div>
        <div class="jian">支:-{{accountInfo.TotalPay||0}}</div>
      </div>
      <div class="pp">
        <span class="d">主体名称:</span>
        <span class="spv">{{accountInfo.MainPartName}}</span>
      </div>
      <div class="pp">
        <span class="d">账户类型:</span>
        <span class="spv">{{typeFn(accountInfo.AccountType)}}</span>
      </div>
      <div class="pp">
        <span class="d">资金账户:</span>
        <span class="spv">{{accountInfo.Balance}}</span>
      </div>
    </div>
    <div class="tablepart">
      <el-table :data="tableData6" :span-method="arraySpanMethod" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="amount1" sortable label="数值 1">
        </el-table-column>
        <el-table-column prop="amount2" sortable label="数值 2">
        </el-table-column>
        <el-table-column prop="amount3" sortable label="数值 3">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountInfo: {},
      type: '',
      dialogflag: false,
      search: { AccountNumber: '', MainPartName: '', RelationPerson: '', RelationPersonPhoneNum: '' },
      contentHeight: 500,
      tableData6: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ]
    };
  },

  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(rowIndex);

      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 5];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },
    typeFn(st) {
      let str = '';
      switch (parseInt(st)) {
        case 5:
          str = '总经销';
          break;
        case 3:
          str = '农资店';
          break;
        case 2:
          str = '农户';
          break;
        default:
          break;
      }
      return str;
    },
    async listInfo(id, status) {
      console.log(id, status);
      let { err, res } = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.DETAILLIST, { status: status, FundAccountId: id });
      console.log(err, res);
    },
    async setViewPage() {
      const { id } = this.$route.query;

      let { err, res } = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.ACCOUNT, { FundAccountId: id });
      console.log(err, res);
      if (err) {
      } else {
        this.accountInfo = res.data;
        this.listInfo(res.data.Id, res.data.Status);
      }
    }
  },
  mounted() {
    this.setViewPage();
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.toppp {
  position: relative;
  padding-top: 30px;
  padding-left: 30px;
  line-height: 2;
  .shouzhi {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 2;

    .shou {
      color: #008000;
    }
    .jian {
      color: #ff6600;
    }
  }
}
</style>
