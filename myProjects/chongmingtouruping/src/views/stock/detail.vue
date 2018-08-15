<template>
  <div class="listwrap" v-tab-title="'详情列表'" v-hide-menu="true">
    <dialog-code ref="dialog" @save-success="refresh"></dialog-code>
    <nz-list :requestUrl="$apiUrl.STOCK.STOCKDETAILLIST" :beforeSearch="beforeSearch" ref="list" :needAdvancedSearch="false" :needBaseSearch="false">
      <div slot="search">
        <nz-search-item label="登录账号" search-key="mobile" v-model="search.mobile">
          <nz-input v-model="search.mobile"></nz-input>
        </nz-search-item>
        <nz-search-item label="主体名称" search-key="accountName" v-model="search.accountName">
          <nz-input v-model="search.accountName"></nz-input>
        </nz-search-item>
        <nz-search-item label="联系人" search-key="contact" v-model="search.contact">
          <nz-input v-model="search.contact"></nz-input>
        </nz-search-item>
        <nz-search-item label="身份证号" search-key="iDNumber" v-model="search.iDNumber">
          <nz-input v-model="search.iDNumber"></nz-input>
        </nz-search-item>
        <nz-search-item label="用户类型" search-key="accountType" v-model="search.accountType">
          <nz-input v-model="search.accountType"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="SupplierName" min-width="120" label="供应商" sortable="custom"></nz-table-column>
        <nz-table-column prop="RegisteCode" min-width="120" label="农药登记号" sortable="custom"></nz-table-column>
        <nz-table-column prop="ProductName" min-width="120" label="农药名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="TraderMark" min-width="120" label="注册商标" sortable="custom"></nz-table-column>
        <nz-table-column prop="SpecQuantity" min-width="120" label="规格" sortable="custom">
           <template slot-scope="scope">
            <div>{{scope.row.SpecQuantity+'g/'+scope.row.SpecUnit}}</div>
          </template>
        </nz-table-column>
        <nz-table-column prop="Batch" min-width="120" label="批次" sortable="custom"></nz-table-column>
        <nz-table-column prop="ProductionDate" min-width="120" label="生产日期" sortable="custom"></nz-table-column>
        <nz-table-column prop="Count" min-width="120" label="数量" sortable="custom"></nz-table-column>
        <nz-table-column prop="SpecUnit" min-width="120" label="计量单位" sortable="custom"></nz-table-column>
        <nz-table-column prop="ProductionEnterprise" min-width="120" label="生产厂家" sortable="custom"></nz-table-column>
        <nz-table-column prop="StockInTime" min-width="120" label="入库日期" sortable="custom"></nz-table-column>
        <nz-table-column prop="StockInType" min-width="120" label="入库类型" sortable="custom">
          <template slot-scope="scope">
            <div>
              <span></span>{{statusFn(scope.row.StockInType)}}</div>
          </template>
        </nz-table-column>
        <nz-table-column prop="StockName" min-width="120" label="存放仓位" sortable="custom"></nz-table-column>
        <nz-table-column prop="HandPerson" min-width="120" label="经手人" sortable="custom"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="120" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" label="操作" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="lookCode(scope.row)">农药码</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
import dialogCode from './dialogcode';
export default {
  data() {
    return {
      dialogflag: false,
      search: { key1: '', key2: '', key3: '', key4: '', key5: '', key6: '' },
      contentHeight: 500
    };
  },
  components: { dialogCode },
  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  methods: {
    statusFn(type) {
      let str = '';
      if (type == 0) {
        // str = '进货入库';
        str = '标识进货入库';
      }
      return str;
    },
    beforeSearch(obj) {
      return { ...obj, StockId: this.$route.query.id };
    },
    lookCode(data) {
      this.$refs.dialog.show(data);
    },
    lookmore(data) {
      // this.$refs.dialog.show(data);
      // console.log(window.location.origin);
      window.open(`${window.location.origin}/#/main/purchase`);
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
.distributionout {
  position: relative;
}
.p20 {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 4;
}
.ustatus {
  color: #128f40;
  span {
    margin-right: 5px;
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    vertical-align: middle;
    background: #128f40;
  }
}
.status0,
.status2 {
  color: #fe5500;
  span {
    background: #fe5500;
  }
}
</style>
