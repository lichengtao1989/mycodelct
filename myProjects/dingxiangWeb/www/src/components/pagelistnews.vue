<template>
  <div class="newsindexout">
    <nz-list :requestUrl="$apiUrl.NEWS.LIST" ref="list" :beforeSearch="beforeSearchFn" :needAdvancedSearch="false" :needBaseSearch="false">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addArticle">
          <i class="nz-icon-add"></i>新建文章
        </nz-button>
        <!-- <nz-button type="primary" size="small" @click="addLink" v-if="computedIf">
          <i class="nz-icon-add"></i>新建链接 </nz-button> -->
      </div>
      <template slot="tableColumns">
        <nz-table-column type="index" label="序号" min-width="120" width="150"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="120" label="创建时间"></nz-table-column>
        <nz-table-column prop="Title" min-width="120" label="标题"></nz-table-column>
        <nz-table-column prop="ShortContent" min-width="120" label="内容摘要">
          <!-- <template slot-scope="scope">
            <div v-if="scope.row.Islink==1" @click="jumpUrl(scope.row.ArticleContent)">{{scope.row.ArticleContent}}</div>
            <div v-else>{{scope.row.Content}}</div>
          </template> -->
        </nz-table-column>
        <nz-table-column min-width="120" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="eitDialog(scope.row)">编辑</nz-button>
            <nz-button type="text" @click="deleteFn(scope.row)">删除</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <dialog-add ref="dialog" @save-success="refresh" :typeVal="typeVal"></dialog-add>
    <!-- <dialog-url ref="dialogUrl" @save-success="refresh" :typeVal="typeVal"></dialog-url> -->

  </div>
</template>
<script>
import dialogAdd from './dialognews.vue';
import dialogUrl from './dialogurlnews.vue';
export default {
  props: ['typeVal'],
  data() {
    return {};
  },
  computed: {
    computedIf: function() {
      let bol = true;
      if (this.typeVal == 5) {
        bol = false;
      }
      return bol;
    }
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
        const { err, res } = await this.$ajax.get(this.$apiUrl.NEWS.DELETE, { NewsID: row.NewID });
        // console.log(row.NewID);
        if (err) {
          this.$message.showError('删除失败');
        } else {
          if (res.ResultCode == 200) {
            this.$message.success('删除成功');
            this.refresh();
          }
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
      const { err, res } = await this.$ajax.get(this.$apiUrl.NEWS.GETSINGLE, { NewID: row.NewID });
      // console.log(err, res);
      if (err) {
      } else {
        let data = res.Data.List[0];
        if (data.Islink == 1) {
          this.$refs.dialogUrl.show(data);
        } else {
          this.$refs.dialog.show(data);
        }
      }
    },
    beforeSearchFn() {
      return { Type: this.typeVal };
    }
  },
  mounted() {
    // this.getList();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
</style>
