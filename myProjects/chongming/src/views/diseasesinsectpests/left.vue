<template>
  <div class="leftlct">
    <div class="sb">作物信息(281)</div>
    <div class="itemlist">
      <itempart :datalist="datalist" @changeId='rightList'></itempart>
    </div>
    <div class="nz-list-bottom" v-if="totalPage">
      <!--分页器-->
      <nz-pagination @current-change="currentPageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-sizes="[28, 56, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" class="nz-pagination">
      </nz-pagination>
      <i class="nz-icon-update" @click="refresh"></i>
    </div>
  </div>
</template>
<script>
import itempart from './itempart.vue';
export default {
  data() {
    return {
      datalist: [],
      currentPage: 1,
      totalPage: null,
      pageSize: 28
    };
  },
  components: { itempart },
  computed: {},
  methods: {
    refresh() {
      this.getTabledata();
    },
    async rightList(id) {
      let url = this.$apiUrl.COMMONAPI.GetPestinfosList + '/' + id;
      let { res } = await this.$ajax.post(url);
      this.$emit('listInfo', res.data);
      // console.log(res);
    },
    async getTabledata() {
      // console.log(this.currentPage);
      let obj = {
        PageNum: this.currentPage,
        PageSize: this.pageSize,
        OrderField: '',
        OrderType: '',
        KeyWord: ''
      };
      let { res } = await this.$ajax.post(this.$apiUrl.COMMONAPI.GetCropInfosList, obj);
      this.datalist = res.data;
      this.rightList(res.data[0].id);
      this.totalPage = 283;
      // console.log(err, res);
      // if (err) {
      //   // this.$message.showError(err);
      // } else {
      //   if (res.StatusCode == 200) {
      //     this.datalist = res.data;
      //   }
      // }
    },
    currentPageChange(val) {
      this.currentPage = val;
      this.getTabledata();
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getTabledata();
    }
  },
  mounted() {
    this.getTabledata();
    // window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.resize);
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.leftlct {
  width: 45.2%;
  // display: inline-block;
  float: left;
  // vertical-align: top;
}
.sb {
  height: 46px;
  line-height: 46px;
  color: #676767;

  width: 96%;
}
.itemlist {
  padding-top: 19px;
  border-top: 1px solid #dddddd;
}
</style>
