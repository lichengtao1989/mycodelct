<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-advanced-search="true" ref="list">
      <div slot="search">
        <cjm-search-item label="组织ID" search-key="corpID" v-model="search.corpID">
          <cjm-input v-model="search.corpID"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="组织名称" search-key="corpName" v-model="search.corpName">
          <cjm-input v-model="search.corpName"></cjm-input>
        </cjm-search-item>        
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="corpID" min-width="120" label="组织ID"></cjm-table-column>
        <cjm-table-column prop="corpName" min-width="120" label="组织名称"></cjm-table-column>
        <cjm-table-column prop="industryTypeName" min-width="120" label="行业类型"></cjm-table-column>
        <cjm-table-column prop="corpType" width="120" enum-name="组织类型" label="组织类型" enum-namespace="base" ></cjm-table-column>
        <cjm-table-column prop="createTime" width="250" label="注册时间" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="expiryDate" width="250" label="有效期至"></cjm-table-column>
        <cjm-table-column label="操作" align="center" width="250" fixed="right">
          <template slot-scope="scope">
            <cjm-button type="text" @click="edit(scope.row.corpID)">编辑</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" type="tab" :height="600" :okHandler="confirm">
      <insurance-edit ref="insuranceEdit"></insurance-edit>
    </cjm-dialog>
  </div>
</template>

<script>
import insuranceEdit from './insurance-edit.vue';
export default {
  components: {
    insuranceEdit
  },
  data() {
    return {
      search: {
        corpName: '',
        corpID: ''
      },
      requestUrl: this.$globalData.get('base', 'apiUrl').corp.GET_INSURE_LIST,
      dialogTitle: '',
      dialogVisible: false
    };
  },
  methods: {
    //提交保存
    confirm(callback) {
      this.$refs.insuranceEdit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    edit(id) {
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.insuranceEdit.editForm(id);
      });
    }
  }
};
</script>
<style scoped>

</style>
