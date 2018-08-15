<template>
  <div class="distributionout">

    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
    <div class="listwrap">
      <nz-list :requestUrl="$apiUrl.STOCK.GETLLIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入关键字">
        <!-- <div slot="operate">
          <nz-button type="primary" @click="addDialog">
            <i class="nz-icon-add"></i>新建
          </nz-button>
        </div> -->
        <div slot="search">
          <nz-search-item label="农药名称" search-key="ProductName" v-model="search.ProductName">
            <nz-input v-model="search.ProductName"></nz-input>
          </nz-search-item>
          <nz-search-item label="入库类型" search-key="InStockType" v-model="search.InStockType">
            <nz-input v-model="search.InStockType"></nz-input>
          </nz-search-item>
          <nz-search-item label="供应商" search-key="SupplierName" v-model="search.SupplierName">
            <nz-input v-model="search.SupplierName"></nz-input>
          </nz-search-item>
          <nz-search-item label="注册商标" search-key="TraderMark" v-model="search.TraderMark">
            <nz-input v-model="search.TraderMark"></nz-input>
          </nz-search-item>
          <nz-search-item label="经手人" search-key="HandPerson" v-model="search.HandPerson">
            <nz-input v-model="search.HandPerson"></nz-input>
          </nz-search-item>
          <nz-search-item label="入库时间" search-key="InStockTime" v-model="search.InStockTime">
            <nz-datepicker placeholder="日期选择" type="date" v-model="search.InStockTime"></nz-datepicker>
            <!-- :chooseFuture="true" -->
          </nz-search-item>
        </div>
        <template slot="tableColumns">
          <nz-table-column prop="BillCode" min-width="120" label="入库单据" sortable="custom"></nz-table-column>
          <nz-table-column prop="SupplierName" min-width="120" label="供应商名称" sortable="custom"></nz-table-column>
          <nz-table-column prop="HandPerson" min-width="120" label="经手人" sortable="custom"></nz-table-column>
          <nz-table-column prop="InStockTime" min-width="120" label="入库时间" sortable="custom"></nz-table-column>
          <nz-table-column prop="CreateTime" min-width="120" label="操作时间" sortable="custom"></nz-table-column>
          <nz-table-column min-width="120" label="操作">
            <template slot-scope="scope">
              <nz-button type="text" @click="lookmore(scope.row)">详情</nz-button>
            </template>
          </nz-table-column>
        </template>
      </nz-list>
    </div>
  </div>
</template>
<script>
import addEditDialog from './dialog';
export default {
  data() {
    return {
      dialogflag: false,
      search: { ProductName: '', InStockType: '', SupplierName: '', TraderMark: '', HandPerson: '', InStockTime: '' },
      contentHeight: 500
    };
  },
  components: { addEditDialog },
  computed: {
    contentLeft() {
      // return 170 + 'px';
    }
  },
  methods: {
    addDialog() {
      this.$refs.dialog.show();
    },
    lookmore(data) {
      // console.log(data.Id);
      window.open(`${window.location.origin}/#/main/warehousRecord?id=${data.Id}`);
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
