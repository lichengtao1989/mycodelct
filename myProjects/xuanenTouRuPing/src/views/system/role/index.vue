<template>
  <div>
    <nz-list v-if="requestUrl" :request-url="requestUrl" :need-advanced-search="false" :need-base-search="true" base-search-placeholder="请输入角色名称" ref="list">
      <div slot="operate">
        <nz-button type="primary" @click="addDialogShow">
          <i class="nz-icon-add"></i>新建
        </nz-button>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="roleName" min-width="120" label="角色姓名" sortable="custom"></nz-table-column>
        <nz-table-column prop="roleType" min-width="120" label="角色类型" enumName="角色类型" sortable="custom"></nz-table-column>
        <nz-table-column prop="createTime" min-width="120" label="创建时间" sortable="custom"></nz-table-column>
        <nz-table-column prop="name" min-width="120" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="editDialogShow(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="viewDialogShow(scope.row)">查看</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <role-add ref="addDialog" @save-success="refresh"></role-add>
    <role-edit ref="editDialog" @save-success="refresh"></role-edit>
    <role-view ref="viewDialog"></role-view>
  </div>
</template>
<script>
import roleAdd from './add.vue';
import roleEdit from './edit.vue';
import roleView from './view.vue';
export default {
  components: { roleAdd, roleEdit, roleView },
  data() {
    return {};
  },
  computed: {
    requestUrl() {
      const userInfo = this.$storage.get('userInfo');
      if (userInfo && userInfo.role) {
        return ['', this.$apiUrl.ROLE.GET_LIST_TYPE1, this.$apiUrl.ROLE.GET_LIST_TYPE2, this.$apiUrl.ROLE.GET_LIST_TYPE3][userInfo.role] || '';
      }
      return '';
    }
  },
  methods: {
    refresh() {
      this.$refs.list.refresh();
    },
    addDialogShow() {
      this.$refs.addDialog.show();
    },
    editDialogShow(row) {
      this.$refs.editDialog.show(row);
    },
    viewDialogShow(row) {
      this.$refs.viewDialog.show(row);
    }
  }
};
</script>
