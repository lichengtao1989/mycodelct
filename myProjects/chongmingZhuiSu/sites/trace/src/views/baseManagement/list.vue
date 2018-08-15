<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" base-search-placeholder="基地编号,基地名称">
        <div slot="operate">
          <cjm-button @click="baseAdd" power-code="baseAdd" type="primary">
            <i class="cjm-icon-add"></i>新建</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="基地编码" search-key="baseCode" v-model="search.baseCode">
            <cjm-input v-model="search.baseCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="基地名称" search-key="baseName" v-model="search.baseName">
            <cjm-input v-model="search.baseName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="baseCode" label="基地编号" width="180"></cjm-table-column>
          <cjm-table-column prop="baseName" label="基地名称" width="280"></cjm-table-column>
          <cjm-table-column prop="manager" label="负责人" width="220"></cjm-table-column>
          <cjm-table-column prop="orgName" label="所属机构" width="180"></cjm-table-column>
          <cjm-table-column prop="createTime" label="创建时间" min-width="150"></cjm-table-column>
          <cjm-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="详情" power-code="baseDetails" v-if="scope.row.status==1">
                <cjm-button type="text" @click="viewDetail(scope.row)">详情</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="编辑" power-code="baseEdit" v-if="scope.row.status==1">
                <cjm-button type="text" @click="baseEdit(scope.row)">编辑</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="溯源节点" v-if="scope.row.status==1">
                <cjm-button type="text" @click="setTraceNode(scope.row)">溯源节点</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="禁用" power-code="baseDisabled" v-if="scope.row.status==1">
                <cjm-button type="text" @click="updateStatus(scope.row,'0')">禁用</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="启用" power-code="baseDisabled" v-if="scope.row.status==0" style="color:#4c4c4c;">
                <cjm-button type="text" @click="updateStatus(scope.row,'1')">启用</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="删除" power-code="baseDelete" v-if="scope.row.status==1">
                <cjm-button type="text" @click="updateStatus(scope.row,'-1')">删除</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'editBase'" class="cjm-edit-page" style="max-width: 800px;">
      <editBase></editBase>
    </div>
    <div v-if="currentPage == 'edit'" class="cjm-edit-page">
      <add-node :editType="2"></add-node>
    </div>
  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import editBase from './edit';
import addNode from '../traceNode/traceNode-edit-add.vue';
export default {
  components: {
    editBase,
    addNode
  },
  mixins: [pageSwitch],
  data() {
    return {
      requestUrl: this.$globalData.get('trace', 'apiUrl').baseManagement.GET_LIST,
      currentPage: 'list',
      dialogVisible: false,
      needBaseSearch: true,
      needAdvancedSearch: true,
      search: {
        baseCode: '',
        orgName: '',
        createTime: '',
        baseName: ''
      }
    };
  },
  methods: {
    baseAdd() {
      this.pushPage('editBase', '新建基地', { pageType: 'add' });
    },
    baseEdit(row) {
      this.pushPage('editBase', '新建基地', { baseID: row.baseID, pageType: 'edit' });
    },
    viewDetail(row) {
      this.pushPage('editBase', '查看详情', { baseID: row.baseID, pageType: 'view' });
    },
    confirm(callback) {
      this.$refs.editConfig
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
          callback();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    approval(row) {},
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    setStatus(id, status) {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').baseManagement.UPDATE_STATUS, {
          baseID: id,
          status: status
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    updateStatus(row, status) {
      let msg = '';
      if (status == 1) {
        this.setStatus(row.baseID, status);
      } else {
        if (status == -1) {
          msg = '确定要删除？';
        } else if (status == 0) {
          msg = '确认要禁用？';
        }
        this.$confirm(msg, '提示', { type: 'warning' })
          .then(() => {
            this.setStatus(row.baseID, status);
          })
          .catch(() => {});
      }
    },
    //设置溯源节点
    setTraceNode(row) {
      this.pushPage('edit', '溯源节点', { id: row.baseID });
    }
  },
  created() {}
};
</script>
<style scoped>

</style>
