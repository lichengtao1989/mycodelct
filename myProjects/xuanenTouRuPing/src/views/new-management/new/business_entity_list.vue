<template>
  <div v-tab-title="'农技新闻'">
    <div class="listview">
      <business-entity ref="businessEntity" @listView="listView" :module="3"  :dataList="dataList" :pagination="pagination"></business-entity>
    </div>
  </div>
</template>
<script>
import businessEntity from '../information/business_entity.vue';
export default {
  components: {
    businessEntity
  },
  data() {
    let apiUrl = this.$apiUrl.NEWMANAGEMENT;
    return {
      apiUrl: apiUrl,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalPage: 1
      },
      dataList: []
    };
  },
  watch: {},
  methods: {
    async listView() {
      let data = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage
      };
      let { err, res } = await this.$model('dataManagement').commonfn2(this.apiUrl.GET_LIST + '?module=3', data);
      if (res.resultCode == 200) {
        this.dataList = res.data.rows;
        this.pagination.totalPage = res.data.total;
      } else {
        this.$message.showError(err);
      }
    },
    refresh() {
      this.listView();
    }
  },
  created() {
    this.listView();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.list-bottom {
  margin-top: 30px;
  text-align: center;
}
.listview {
  background: #fff;
  min-height: 780px;
  width: 100%;
  padding: 19px 0;
  font-size: 15px;
  color: #2b2b2b;
  position: relative;
  box-sizing: border-box;
  .listitem {
    .title-name {
      font-size: 18px;
      color: #666666;
      font-weight: bold;
      width: 100%;
      margin: 14px 0px;
      display: inline-block;
    }
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 28px;
    font-size: 13px;
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    .midt {
      box-sizing: border-box;
      display: inline-block;
      margin-bottom: 10px;
    }
    .righttime {
      position: absolute;
      right: 26px;
      bottom: 10px;
      color: #999999;
      font-size: 14px;
    }
  }
}
</style>
