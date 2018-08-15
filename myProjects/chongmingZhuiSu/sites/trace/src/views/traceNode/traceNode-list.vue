<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true" baseSearchPlaceholder="输入产品编号、名称" ref="list">
        <div slot="operate">
          <cjm-button type="primary" power-code="traceNodeListNewBuild" @click="openNewBuild"><i
            class="cjm-icon-add"></i>新建节点
          </cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="产品编号" search-key="productCode" v-model="search.productCode">
            <cjm-input v-model="search.productCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="产品名称" search-key="productName" v-model="search.productName">
            <cjm-input v-model="search.productName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <!--<cjm-table-column type="selection" align="center" label="全选" min-width="55"></cjm-table-column>-->
          <!--<cjm-table-column label="图片" sortable="custom" min-width="100">-->
          <!--<template scope="scope">-->
          <!--<img class="img" :src="scope.row.thumbnail1" alt="">-->
          <!--</template>-->
          <!--</cjm-table-column>-->
          <cjm-table-column label="产品编号" sortable="custom" prop="productCode" min-width="180"></cjm-table-column>
          <cjm-table-column label="产品名称" sortable="custom" prop="productName" min-width="180"></cjm-table-column>
          <cjm-table-column label="所属机构" sortable="custom" prop="orgName" min-width="150"></cjm-table-column>
          <cjm-table-column label="创建时间" sortable="custom" prop="createTime" min-width="180"></cjm-table-column>
          <cjm-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="traceNodeListEdit" @click="edit(scope.row)">编辑</cjm-button>
              <cjm-button type="text" power-code="traceNodeListDelete" @click="deleteProductNode(scope.row)">删除
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'node'">
      <new-build></new-build>
    </div>
    <div v-if="currentPage == 'edit'" class="cjm-edit-page">
      <add-node :editType="0"></add-node>
    </div>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import newBuild from './traceNode-edit.vue';
import addNode from './traceNode-edit-add.vue';
export default {
  components: {
    newBuild,
    addNode
  },
  mixins: [pageSwitch],
  data() {
    let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
    return {
      traceApiUrl: traceApiUrl,
      requestUrl: traceApiUrl.traceNode.TRACE_NODE_PRODUCT_LIST,
      currentPage: 'build',
      search: {
        productCode: '',
        productName: '',
        createTime: '',
        orgName: ''
      },
      productInfo: {},
      deleteBatchArr: [],
      params: ''
    };
  },
  methods: {
    openNewBuild() {
      this.pushPage('node', '新建节点', { id: 'build' });
    },
    edit(row) {
      this.productInfo.id = row.productID;
      this.productInfo.name = row.productName;
      this.pushPage('edit', '编辑', { id: row.productID, name: row.productName });
    },
    deleteProductNode(row) {
      if (row) {
        this.$confirm('真的要删除产品所有节点吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let params = {
              productID: []
            };
            //判断批量删除还是单个删除(这里只有单个删除)
            if (this.deleteBatchArr.length === 0) {
              params.productID[0] = row.productID;
            } else {
              params.productID = this.deleteBatchArr;
            }
            this.$ajax
              .post(this.traceApiUrl.traceNode.DELETE_CONFIG_BY_PRODUCT, params)
              .then(res => {
                this.$message('已完成操作！');
                this.deleteBatchArr = [];
                this.$refs.list.refresh();
              });
          })
          .catch(() => {
            return false;
          });
      }
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    }
  },
  mounted() {
    //      this.params = this.getPageParams('edit');
  }
};
</script>
<style lang="less" scoped>
.el-tooltip img {
  width: 50px;
  height: 50px;
  margin-top: 5px;
}

.prev {
  text-align: center;
  margin-top: 20px;
}
</style>
