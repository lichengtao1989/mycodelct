<template>
  <div>
    <cjm-list ref="list"
              :request-url="apiUrl.oid.GET_LIST"
              :need-advanced-search="true"
              base-search-placeholder="输入产品编号/名称、OID搜索"
              @selection-change="handleSelectionChange">
      <div slot="operate">
        <cjm-button type="primary" @click="batchSetOID" :disabled="selectedRows.length===0"><i class="cjm-icon-setting"></i>批量设置</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="产品" search-key="productID" v-model="search.productID">
          <cjm-remote-select v-model="search.productID"
                             :remote-url="apiUrl.autoComplete.PRODUCT"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="所属机构" search-key="orgID" v-model="search.orgID">
          <cjm-remote-select v-model="search.orgID"
                             :remote-url="apiUrl.autoComplete.ORG"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="OID码" search-key="oid" v-model="search.oid">
          <cjm-input v-model="search.oid"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column type="selection" label="全选" width="55" fixed="left"></cjm-table-column>
        <cjm-table-column prop="productCode" min-width="120" label="产品编号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="productName" min-width="160" label="产品名称" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="classifyName" width="120" label="分类" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="orgName" min-width="160" label="所属机构" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="oid" min-width="150" label="OID码" sortable="custom"></cjm-table-column>        
        <cjm-table-column width="90" label="操作" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="setOID([scope.row.productID])">设置OID</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog ref="dialog"
                title="设置OID"
                :visible.sync="dialogVisible"
                :okHandler="confirm">
      <edit ref="edit"></edit>
    </cjm-dialog>
  </div>
</template>

<script>
import Edit from './edit.vue';
export default {
  components: {
    Edit
  },
  props: {},
  data() {
    return {
      enums: this.$globalData.get('code', 'enums'),
      apiUrl: this.$globalData.get('code', 'apiUrl'),
      search: {
        productID: '',
        orgID: '',
        oid: ''
      },
      //选中的行
      selectedRows: [],
      dialogVisible: false
    };
  },
  methods: {
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    //批量设置OID
    batchSetOID() {
      const ids = this.selectedRows.map(item => {
        return item.productID;
      });
      this.setOID(ids);
    },
    setOID(productIDs) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.edit.editForm(productIDs);
      });
    },
    confirm(callback) {
      this.$refs.edit.submit().then(() => {
        this.$message.success('保存成功');
        this.dialogVisible = false;
        this.$refs.list.refresh();
        callback();
      }).catch(error => {
        if (error) {
          this.$message.error(error.message);
        }
        callback();
      });
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
