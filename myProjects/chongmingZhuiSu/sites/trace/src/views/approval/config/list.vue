<template>
  <div>
    <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch" :formatData="formatData" base-search-placeholder="配置名称">
      <div slot="operate">
        <cjm-button @click="addConfig" power-code="reviewConfigAdd" type="primary" :disabled="disabled">
          <i class="cjm-icon-add"></i>添加</cjm-button>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="reviewConfigCode" label="配置编号" width="120"></cjm-table-column>
        <cjm-table-column prop="reviewConfigName" label="配置名称" width="120"></cjm-table-column>
        <cjm-table-column prop="reviewModule" label="审批模块" width="160" enum-name="审批模块" enum-namespace="trace"></cjm-table-column>
        <cjm-table-column prop="auditorName" label="审批人员" width="200"></cjm-table-column>
        <cjm-table-column prop="note" label="备注信息" width="180"></cjm-table-column>
        <cjm-table-column prop="createByName" label="创建人" width=""></cjm-table-column>
        <cjm-table-column prop="createTime" label="创建时间" width="120"></cjm-table-column>
        <cjm-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <cjm-tooltip content="编辑">
              <cjm-button type="text" @click="editConfig(scope.row)" power-code="reviewConfigEdit">编辑</cjm-button>
            </cjm-tooltip>
            <cjm-tooltip content="查看">
              <cjm-button type="text" @click="viewDetail(scope.row)">查看</cjm-button>
            </cjm-tooltip>
            <cjm-tooltip content="删除" power-code="reviewConfigDelete">
              <cjm-button type="text" @click="deleteConfig(scope.row)">删除</cjm-button>
            </cjm-tooltip>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :visible.sync="dialogVisible" :title="dialogTitle" :okHandler="confirm">
      <edit-config ref="editConfig"></edit-config>
    </cjm-dialog>
  </div>
</template>

<script>
import editConfig from './edit';
export default {
  components: {
    'edit-config': editConfig
  },
  data() {
    return {
      requestUrl: this.$globalData.get('trace', 'apiUrl').approval.GET_LIST,
      needBaseSearch: false,
      disabled: false,
      dialogTitle: '',
      dialogVisible: false
    };
  },
  methods: {
    editConfig(row) {
      this.dialogTitle = '编辑设置';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.editConfig.editForm(row.reviewConfigID);
      });
    },
    viewDetail(row) {
      this.dialogTitle = '查看设置';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.editConfig.editForm(row.reviewConfigID, 'view');
      });
    },
    deleteConfig(row) {
      this.$confirm('确认删除？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').approval.DELETE, {
              reviewConfigID: row.reviewConfigID
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
                this.disabled = false;
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(() => {});
    },
    confirm(callback) {
      this.$refs.editConfig
        .submit()
        .then(r => {
          if (r != 'view') {
            this.$message.success('保存成功');
          }
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
    addConfig() {
      this.dialogVisible = true;
      this.dialogTitle = '添加配置';
      this.$nextTick(function() {
        this.$refs.editConfig.addForm();
      });
    },
    formatData(data) {
      if (data.length > 0) {
        this.disabled = true;
      }
      return data;
    }
  },
  created() {}
};
</script>
<style scoped>

</style>
