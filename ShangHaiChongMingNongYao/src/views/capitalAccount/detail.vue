<template>
  <div class="tpllctout" v-tab-title="'查询资金明细'" v-hide-menu="true">
    <div class="toppp">
      <div class="shouzhi">
        <div class="shou">收:+{{accountInfo.TotalIncome || 0}}</div>
        <div class="jian">支:-{{accountInfo.TotalPay || 0}}</div>
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
    <div class="tablepart" v-if="accountReady">
      <nz-list :requestUrl="$apiUrl.FUNDACCOUNT.DETAILLIST" ref="list" :beforeSearch="setParam" :needAdvancedSearch="false" :needBaseSearch="false" baseSearchPlaceholder="请输入关键字">
        <template slot="tableColumns">
          <nz-table-column prop="CreateTime" min-width="120" label="日期" sortable="custom"></nz-table-column>
          <nz-table-column prop="BusiBillCode" min-width="120" label="交易单号" sortable="custom"></nz-table-column>
          <nz-table-column prop="BusiType" min-width="120" label="类型" sortable="custom">
            <template slot-scope="scope">
              <div class="ll">{{typeFn(scope.row.BusiType)}}</div>
            </template>
          </nz-table-column>
          <nz-table-column prop="BusiPlace" min-width="120" label="交易场所" sortable="custom"></nz-table-column>
          <nz-table-column prop="BusiMoney" min-width="120" label="交易金额" sortable="custom"></nz-table-column>
          <nz-table-column prop="OppositeName" min-width="120" label="对方户名" sortable="custom"></nz-table-column>
          <nz-table-column prop="OppositeAccount" min-width="120" label="对方账号" sortable="custom"></nz-table-column>
          <nz-table-column prop="BusiTime" min-width="120" label="交易时间" sortable="custom"></nz-table-column>
        </template>
      </nz-list>
      <!-- <div class="ttop">
        <div class="titem" v-for="(item,index)"></div>
      </div> -->
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
        search: {AccountNumber: '', MainPartName: '', RelationPerson: '', RelationPersonPhoneNum: ''},
        accountReady: false,
        contentHeight: 500
      };
    },

    computed: {
      contentLeft() {
        // return 170 + 'px';
      }
    },
    methods: {
      setParam(cod){
        return {FundAccountId: this.accountInfo.Id, status: this.accountInfo.Status, ...cod};
      },
      typeFn(st) {
        let str = '';
        switch (parseInt(st)) {
          case 1:
            str = '农资店进货';
            break;
          case 2:
            str = '农户购买药品';
            break;
          case 3:
            str = '补贴';
            break;
          default:
            break;
        }
        return str;
      },
      async listInfo(id, status) {
        console.log(id, status);
        let {err, res} = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.DETAILLIST, {status: status, FundAccountId: id});
        console.log(err, res);
      },
      async setViewPage() {
        const {id} = this.$route.query;

        let {err, res} = await this.$ajax.post(this.$apiUrl.FUNDACCOUNT.ACCOUNT, {FundAccountId: id});
        console.log(err, res);
        if (err) {
        } else {
          this.accountInfo = res.data;
          //this.listInfo(res.data.Id, res.data.Status);
          this.accountReady = true;
        }
      }
    },
    mounted() {
      this.setViewPage();
    },
    beforeDestroy() {
      // window.removeEventListener("resize", this.resize);
    },
    created() {
    }
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
