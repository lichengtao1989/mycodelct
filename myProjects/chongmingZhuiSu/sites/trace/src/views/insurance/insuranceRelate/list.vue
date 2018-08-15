<template>
  <div>
    <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true" :need-base-search="false">
      <div slot="operate">
        <cjm-button @click="relateInsureDialog" type="primary">
          <i class="cjm-icon-relation"></i>关联保险</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="险种" search-key="insureType" v-model="search.insureType">
          <cjm-enum-select v-model="search.insureType" enum-name="保险类型" enum-namespace="trace" :clearable="true"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="产品" search-key="productID" v-model="search.productID">
          <cjm-select v-model="search.productID">
            <cjm-option v-for="item in searchProductArray" :key="item.id" :label="item.name" :value="item.id">
              {{item.name}}
            </cjm-option>
          </cjm-select>
        </cjm-search-item>
        <!-- <cjm-search-item label="批次" search-key="productBatchID" v-model="search.productBatchID">
          <cjm-select v-model="search.productBatchID" placeholder="请选择">
            <cjm-option
              v-for="item in searchProductBatchArray"
              :key="item.productBatchID"
              :label="item.productBatchCode"
              :value="item.productBatchID">
            </cjm-option>
          </cjm-select>
        </cjm-search-item> -->
        <cjm-search-item label="关联时间" search-key="createTime" v-model="search.createTime">
          <cjm-date-picker v-model="search.createTime" range-separator="~" type="daterange"></cjm-date-picker>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="insureTypeName" label="选择险种" width="160"></cjm-table-column>
        <cjm-table-column prop="productName" label="选择产品" width="220"></cjm-table-column>
        <!-- <cjm-table-column prop="productBatchCode" label="选择批次" width="260"></cjm-table-column> -->
        <cjm-table-column prop="relateCount" label="关联份数" width=""></cjm-table-column>
        <cjm-table-column prop="remainCount" label="剩余份数" width=""></cjm-table-column>
        <cjm-table-column prop="createTime" label="关联时间" width="200"></cjm-table-column>
        <cjm-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <cjm-tooltip content="查看">
              <cjm-button type="text" @click="showRelateInsureDialog(scope.row)">查看</cjm-button>
            </cjm-tooltip>
            <cjm-tooltip content="导出已上保的码">
              <cjm-button type="text" @click="codeRelateInsureExport(scope.row.relateID)">导出已上保的码</cjm-button>
            </cjm-tooltip>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog title="关联险种" :visible.sync="relateTnsureDialog" :okHandler="dialogConfirm">
      <relate-edit ref="relateInsureForm" v-if="relateTnsureDialog" @refreshList="refreshList"></relate-edit>
      <div slot='footer' v-if="!dialogEdit">
        <cjm-button type="default" @click="relateTnsureDialog=false">
          <i class="cjm-icon-close"></i>取消</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
import relateEdit from './edit.vue';
import fileDownload from 'framework/utils/fileDownload';
export default {
  components: {
    'relate-edit': relateEdit
  },
  data() {
    return {
      search: {
        insureType: '',
        productID: '',
        productBatchID: '',
        createTime: ''
      },
      requestUrl: this.$globalData.get('trace', 'apiUrl').insurance.relate.GET_LIST,
      searchProductArray: [],
      searchProductBatchArray: [],
      relateTnsureDialog: false,
      dialogEdit: false
    };
  },
  methods: {
    showRelateInsureDialog(row) {
      this.dialogEdit = false;
      this.relateTnsureDialog = true;
      this.$nextTick(() => {
        this.$refs.relateInsureForm.init(row);
      });
    },
    relateInsureDialog() {
      this.dialogEdit = true;
      this.relateTnsureDialog = true;
      this.$nextTick(() => {
        this.$refs.relateInsureForm.init(null);
      });
    },
    codeRelateInsureExport(relateID) {
      fileDownload(this.$globalData.get('trace', 'apiUrl').insurance.relate.GET_RELATE_CODE_EXPORT, { relateID });
    },
    dialogConfirm(callback) {
      this.$refs.relateInsureForm
        .submit()
        .then(() => {
          this.$nextTick(() => {
            this.$refs.list.refresh();
          });
          this.relateTnsureDialog = false;
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    //刷新列表
    refreshList() {
      this.$refs.list.refresh();
      console.log('sss');
    }
  },
  created() {
    this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.relate.QUERY_PRODUCT_LIST).then(r => {
      if (r.resultCode == 200) {
        this.searchProductArray = r.data;
      }
    });
    // this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.relate.QUERY_PRODUCT_BATCH_LIST).then((r) => {
    //   if (r.resultCode == 200) {
    //     this.searchProductBatchArray = r.data;
    //   }
    // });
  }
};
</script>
<style scoped>
</style>
