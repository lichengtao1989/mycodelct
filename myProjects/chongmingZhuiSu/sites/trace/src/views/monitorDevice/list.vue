<template>
  <div>
    <div>
      <cjm-list ref="list" :request-url="requestUrl" :need-base-search="needBaseSearch">
        <div slot="operate">
          <cjm-button @click="baseAdd" power-code="baseAdd" type="primary">
            <i class="cjm-icon-add"></i>添加设备</cjm-button>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="plotsName" label="区域"></cjm-table-column>
          <cjm-table-column prop="baseAreaName" label="地块"></cjm-table-column>
          <cjm-table-column prop="deviceIDs" label="气象土壤水质设备"></cjm-table-column>
          <cjm-table-column prop="videoIDs" label="视频监控设备"></cjm-table-column>
          <cjm-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <cjm-tooltip content="编辑" power-code="baseEdit">
                <cjm-button type="text" @click="baseEdit(scope.row)">编辑</cjm-button>
              </cjm-tooltip>
              <cjm-tooltip content="删除" power-code="baseDelete">
                <cjm-button type="text" @click="updateStatus(scope.row,'0')">删除</cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="confirm">
       <editBase ref="editBase"></editBase>
    </cjm-dialog>
  </div>
</template>

<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import editBase from './edit';
export default {
  components: {
    editBase
  },
  mixins: [pageSwitch],
  data() {
    return {
      requestUrl: this.$globalData.get('trace', 'apiUrl').monitorDevice.GET_LIST,
      dialogVisible: false,
      needBaseSearch: false,
      dialogTitle: '添加设备'
    };
  },
  methods: {
    baseAdd() {
      this.dialogTitle = '添加设备'
      this.dialogVisible = true;
      this.$refs.editBase.reset();
    },
    confirm(callback) {
      callback();
      this.$refs.editBase
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
        });
    },
    setStatus(row, status) {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').monitorDevice.SAVE, {
          plotsDeviceID: row.plotsDeviceID,
          baseAreaID: row.baseAreaID,
          plotsID: row.plotsID,
          status
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    baseEdit(item) {
      this.dialogTitle = '编辑设备';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.editBase.editForm(item);
      });
    },
    updateStatus(row, status) {
      this.$confirm('确定要删除？', '提示', { type: 'warning' })
        .then(() => {
          this.setStatus(row, status);
        })
        .catch(() => {});
    }
  },
  created() {}
};
</script>
<style scoped>

</style>
