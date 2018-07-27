<template>
  <div class="newsindexout">
    <nz-list :requestUrl="$apiUrl.SLIDE.LIST" ref="list" :beforeSearch="beforeSearchFn" :needAdvancedSearch="false" :needBaseSearch="false">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addArticle">
          <i class="nz-icon-add"></i>新建
        </nz-button>

      </div>
      <template slot="tableColumns">
        <nz-table-column type="index" label="顺序" min-width="120" width="150"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="120" label="上传时间"></nz-table-column>
        <nz-table-column prop="ImagePath" min-width="120" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.ImgPath" class="tpsm">
          </template>
        </nz-table-column>
        <nz-table-column prop="Note" min-width="120" label="说明">
        </nz-table-column>
        <nz-table-column min-width="120" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="eitDialog(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="deleteFn(scope.row)">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <dialog-add ref="dialog" @save-success="refresh"></dialog-add>
    <dialog-url ref="dialogUrl" @save-success="refresh"></dialog-url>

  </div>
</template>
<script>
import dialogAdd from './dialog.vue';
import dialogUrl from './dialogurl.vue';
export default {
  data() {
    return {};
  },
  components: {
    dialogAdd,
    dialogUrl
  },
  methods: {
    jumpUrl(url) {
      window.open(url);
    },
    async deleteFn(row) {
      const result = await this.$message.confirm('真的要删除吗?');
      if (result) {
        const { err, res } = await this.$ajax.get(this.$apiUrl.SLIDE.DELETE, { SlideID: row.SlideID });
        console.log(err, res);
        if (err) {
          this.$message.showError('删除失败');
        } else {
          this.$message.success('删除成功');
          this.refresh();
        }
      }
    },
    refresh() {
      this.$refs.list.refresh();
    },
    addArticle() {
      this.$refs.dialog.show();
    },
    addLink() {
      this.$refs.dialogUrl.show();
    },
    async eitDialog(row) {
      this.$refs.dialog.show(row);
    },
    beforeSearchFn() {
      return {};
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.tpsm {
  max-width: 100px;
  margin: 20px 0;
  display: block;
  max-height: 100px;
}
</style>
