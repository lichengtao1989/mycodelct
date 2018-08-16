<template>
  <div v-tab-title="'农技知识'">
    <nz-list :request-url="requestUrl" :need-advanced-search="false" :need-base-search="false" ref="list">
      <div slot="operate">
        <nz-button @click="add" type="primary">
          <i class="nz-icon-add"></i>添加</nz-button>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="type" width="180" label="资讯类别" enum-name="资讯类别" sortable="custom"></nz-table-column>
        <nz-table-column prop="title" min-width="100" label="标题" sortable="custom"></nz-table-column>
        <nz-table-column prop="lastUpdateTime" width="250" label="发布时间" sortable="custom"></nz-table-column>
        <nz-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <nz-button type="text" @click="detailsBnt(scope.row.newID)">查看</nz-button>
            <nz-button type="text" @click="editBnt(scope.row.newID)">编辑</nz-button>
            <nz-button type="text" @click="deleteStatus(scope.row.newID)">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <nz-dialog :title="titleName" ref="editDialog" :okHandler="editFirm" height="500">
      <edit ref="edit"></edit>
    </nz-dialog>
  </div>
</template>
<script>
import edit from './edit.vue';
export default {
  components: {
    edit
  },
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      titleName: '添加农技知识',
      requestUrl: apiUrl.GET_LIST + '?module=2'
    };
  },
  watch: {},
  methods: {
    async editBnt(Id) {
      this.titleName = '编辑农技知识';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.editFrom(Id);
    },
    async detailsBnt(id) {
      window.open(`index.html#/details?id=${id}&module=2`);
    },
    async deleteStatus(row) {
      let data = {
        Id: row
      };
      let msg = await this.$message.confirm('确定要删除吗');
      if (msg) {
        let { err, res } = await this.$model('dataManagement').commonfn(this.apiUrl.DELETE, data);
        if (res.resultCode == 200) {
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
        }
      }
    },
    //添加农技知识
    async add() {
      this.titleName = '添加农技知识';
      this.$refs.editDialog.show();
      await this.$nextTick();
      this.$refs.edit.addFrom();
    },
    async editFirm(callback) {
      let { valid, err, res } = await this.$refs.edit.save();
      if (valid) {
        if (res.resultCode == 200) {
          this.$refs.editDialog.hide();
          this.$refs.list.refresh();
        } else {
          this.$message.showError(err);
          await this.$sleep(500);
        }
      }
      callback();
    }
  },
  created() {}
};
</script>
