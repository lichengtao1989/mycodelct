<template>
  <div>
    <nz-list :requestUrl="$apiUrl.GREENPESTICIDE.GET_LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="请输入名称、商标、登记证号查询">
      <div slot="operate" v-if="userInfo.role!=3">
        <nz-button type="primary" size="small" @click="addDialog">
          <i class="nz-icon-add"></i>
          <span>添加</span>
        </nz-button>
        <nz-button type="primary" size="small">
          <i class="nz-icon-export"></i>
          <span>导入更新目录</span>
        </nz-button>
        <nz-button size="small">
          <i class="nz-icon-import"></i>
          <span>下载导入模版</span>
        </nz-button>
      </div>
      <div slot="search">
        <nz-search-item label="商品名称" search-key="ProductName" v-model="search.ProductName">
          <nz-input v-model="search.ProductName" placeholder="请输入商品名称"></nz-input>
        </nz-search-item>
        <nz-search-item label="注册商标" search-key="TraderMark" v-model="search.TraderMark">
          <nz-input v-model="search.TraderMark" placeholder="请输入商标品牌"></nz-input>
        </nz-search-item>
        <nz-search-item label="商品条码" search-key="ProductBarCode" v-model="search.ProductBarCode">
          <nz-input v-model="search.ProductBarCode" placeholder="请输入要查询的商品条码"></nz-input>
        </nz-search-item>
        <nz-search-item label="登记证号" search-key="RegisteCode" v-model="search.RegisteCode">
          <nz-input v-model="search.RegisteCode" placeholder="请输入农药登记证号"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="ProductName" min-width="120" label="商品名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="" min-width="120" label="商品条码" sortable="custom"></nz-table-column>
        <nz-table-column prop="" min-width="120" label="类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="TraderMark" min-width="120" label="注册商标" sortable="custom"></nz-table-column>
        <nz-table-column prop="" min-width="120" label="通用名" sortable="custom"></nz-table-column>
        <nz-table-column prop="RegisteCode" min-width="120" label="登记证号" sortable="custom"></nz-table-column>
        <nz-table-column prop="SpecQuantity" min-width="120" label="规格" sortable="custom">
          <template slot-scope="scope">
            <span>{{spec(scope.row)}}</span>
          </template>
        </nz-table-column>
        <nz-table-column prop="ProductionEnterprise" min-width="120" label="生产企业" sortable="custom"></nz-table-column>
        <nz-table-column prop="SaleUnitPrice" min-width="120" label="销售单价" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作" v-if="userInfo.role!=3">
          <template slot-scope="scope">
            <nz-button type="text" @click="editDialig(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="delConfirm">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <add-edit-dialog ref="dialog" @save-success="refresh"></add-edit-dialog>
  </div>
</template>
<script>
import addEditDialog from './dialog.vue';
export default {
  components: { addEditDialog },
  data() {
    const userInfo = this.$storage.get('userInfo');
    return {
      userInfo,
      search: { ProductName: '', TraderMark: '', ProductBarCode: '', RegisteCode: '' }
    };
  },
  methods: {
    spec(row) {
      const { SpecQuantity, SpecUnit, SpecType } = row;
      if (SpecQuantity && SpecUnit && SpecType) {
        return `${SpecQuantity}${SpecUnit}/${SpecType}`;
      }
      return '';
    },
    addDialog() {
      // this.$refs.dialog.show();
      this.$router.push({
        path: '/main/greenPesticide?type=1'
      });
    },
    editDialig(data) {
      this.$refs.dialog.show(data);
    },
    refresh() {
      this.$refs.list.refresh();
    },
    async delConfirm() {
      const result = await this.$message.confirm('真的要删除吗?');
      if (result) {
        this.refresh();
      }
    }
  }
};
</script>
