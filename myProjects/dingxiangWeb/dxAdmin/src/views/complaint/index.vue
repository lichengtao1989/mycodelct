<template>
  <div class="newsindexout">
    <nz-list :requestUrl="$apiUrl.COMMON.FEEDBACK" ref="list" :beforeSearch="beforeSearchFn" :needAdvancedSearch="false" :needBaseSearch="false">

      <template slot="tableColumns">
        <nz-table-column prop="CreateTime" min-width="120" label="提交时间"></nz-table-column>
        <nz-table-column prop="OperatePeople" min-width="120" label="姓名"></nz-table-column>
        <nz-table-column prop="OperateMobile" min-width="120" label="手机号码"></nz-table-column>
        <nz-table-column prop="CorpName" min-width="120" label="企业名称"></nz-table-column>
        <nz-table-column prop="ProductName" min-width="120" label="产品名称"></nz-table-column>
        <nz-table-column prop="AttatchImg" min-width="120" label="产品图片">
          <template slot-scope="scope" v-if="scope.row.AttatchImg">
            <img :src="scope.row.AttatchImg" alt="图片无法显示" class="cptp">
          </template>
        </nz-table-column>
        <nz-table-column prop="FeedbackContent" min-width="120" label="投诉内容"></nz-table-column>

      </template>
    </nz-list>

  </div>
</template>
<script>
export default {
  props: ['typeVal'],
  data() {
    return {};
  },
  components: {},
  methods: {
    refresh() {
      this.$refs.list.refresh();
    },
    addArticle() {
      this.$refs.dialog.show();
    },
    addLink() {
      this.$refs.dialogUrl.show();
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
.cptp {
  max-width: 100px;
  margin: 20px 0;
  display: block;
  max-height: 100px;
}
</style>
