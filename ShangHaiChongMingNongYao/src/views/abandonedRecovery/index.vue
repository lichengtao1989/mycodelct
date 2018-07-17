<template>
  <div>
    <nz-list :requestUrl="$apiUrl.RECYCLING.LIST" ref="list" :needAdvancedSearch="true" baseSearchPlaceholder="来源或回收点">
      <div slot="operate">
        <nz-button type="primary" size="small" @click="addDialog">
          <i class="nz-icon-add"></i>新建
        </nz-button>
        <!-- <nz-button type="primary" size="small" @click="showDialog">
          <i class="nz-icon-add"></i>固定宽度2列
        </nz-button> -->
      </div>
      <div slot="search">
        <nz-search-item label="来源者" search-key="farmer" v-model="search.farmer">
          <nz-input v-model="search.farmer"></nz-input>
        </nz-search-item>
        <nz-search-item label="回收点" search-key="farmCapitalStore" v-model="search.farmCapitalStore">
          <nz-input v-model="search.farmCapitalStore"></nz-input>
        </nz-search-item>
        <nz-search-item label="日期" search-key="createTime" v-model="search.createTime">
          <nz-input v-model="search.createTime"></nz-input>
        </nz-search-item>
        <nz-search-item label="预警类型" search-key="earlyWarningType" v-model="search.earlyWarningType">
          <nz-input v-model="search.earlyWarningType"></nz-input>
        </nz-search-item>
      </div>
      <template slot="tableColumns">
        <nz-table-column prop="ID" min-width="120" label="序号" sortable="custom"></nz-table-column>
        <nz-table-column prop="EarlyWarningType" min-width="120" label="预警类型" sortable="custom">
          <template slot-scope="scope">
            {{typeFn(scope.row.EarlyWarningType)}}
          </template>
        </nz-table-column>
        <nz-table-column prop="Farmer" min-width="120" label="来源者" sortable="custom"></nz-table-column>
        <nz-table-column prop="FarmCapitalStore" min-width="120" label="回收点" sortable="custom"></nz-table-column>
        <nz-table-column prop="CreateTime" min-width="120" label="日期" sortable="custom"></nz-table-column>
        <nz-table-column min-width="120" fixed="right" label="操作">
          <template slot-scope="scope">
            <nz-button type="text" @click="viewDetail(scope.row)">查看详情</nz-button>
          </template>
        </nz-table-column>
      </template>
    </nz-list>
    <detail-dialog ref="dialog" @save-success="refresh"></detail-dialog>
    <detail-edit ref="dialogedit" @save-success="refresh"></detail-edit>

  </div>
</template>
<script>
  import detailDialog from './dialog.vue';
  import detailEdit from './dialogedit.vue';

  export default {
    components: {detailDialog, detailEdit},
    data() {
      return {
        search: {farmer: '', farmCapitalStore: '', earlyWarningType: '', createTime: ''}
      };
    },
    methods: {
      typeFn(type) {
        let str = '';
        if (parseInt(type) == 0) {
          str = '无';
        } else if (parseInt(type) == 1) {
          str = '含违禁药品包装';
        } else if (parseInt(type) == 2) {
          str = '含非绿色农药包装';
        }
        return str;
      },
      addDialog() {
        this.$refs.dialogedit.show();
      },
      print(row) {
      },
      async viewDetail(row) {
        let {err, res} = await this.$ajax.post(this.$apiUrl.RECYCLING.DETAIL, {id: row.ID});
        if (err) {
          this.$message.showError(err);
          return;
        }
        if (res.resultCode == 200) {
          this.$refs.dialog.show(res.data);
        }
        // console.log(row);
        // this.$refs.dialog.show(row);
      },
      async cancel(row) {
        const result = await this.$message.confirm('真的要撤销该订单吗?');
        if (result) {
          //
          this.refresh();
        }
      },
      async cancelGoods(row) {
        const result = await this.$message.confirm('真的要确认收货吗?');
        if (result) {
          //
          this.refresh();
        }
      },
      refresh() {
        this.$refs.list.refresh();
      }
    }
  };
</script>
