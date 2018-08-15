<template>
  <div>
    <cjm-list :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" ref="list">
      <div slot="operate">
        <cjm-button @click="addDevice" type="primary">
          <i class="cjm-icon-add"></i>新增设备</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="设备名称" search-key="deviceName" v-model="search.deviceName">
          <cjm-input v-model="search.deviceName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="设备编号" search-key="deviceCode" v-model="search.deviceCode">
          <cjm-input v-model="search.deviceCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="所属企业" search-key="orgName" v-model="search.orgName">
          <cjm-input v-model="search.orgName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="塞尚编号" search-key="saiShangCode" v-model="search.saiShangCode">
          <cjm-input v-model="search.saiShangCode"></cjm-input>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column prop="deviceName" label="设备名称" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="orgName" label="所属企业" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="saiShangCode" label="塞尚编号" sortable="custom"></cjm-table-column>
        <cjm-table-column prop="deviceCode" label="设备编号" sortable="custom"></cjm-table-column>
        <cjm-table-column label="操作" width="150">
          <template slot-scope="scope">
            <cjm-button type="text" @click="editDevice(scope.row.deviceID,'0')">编辑</cjm-button>
            <cjm-button type="text" @click="editDevice(scope.row.deviceID,'1')">复制</cjm-button>
            <cjm-button type="text" @click="deleteDevice(scope.row.deviceID)">删除</cjm-button>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
    <cjm-dialog :visible.sync="dialogVisible" type="tab" :height="600">
      <device-edit ref="deviceEdit" @step="step"></device-edit>
      <div slot="footer">
        <cjm-button type="primary" v-show="activeStep>0" @click="preStep">上一步</cjm-button>
        <cjm-button type="primary" v-show="activeStep+1<stepNum" @click="nextStep">下一步</cjm-button>
        <cjm-button type="primary" v-show="activeStep+1==stepNum" @click="confirm">完成</cjm-button>
        <cjm-button @click="cancel">取消</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>

<script>
import deviceEdit from './edit.vue';
export default {
  components: {
    deviceEdit
  },
  data() {
    return {
      requestUrl: this.$globalData.get('trace', 'apiUrl').cameraDevice.GET_LIST,
      needBaseSearch: true,
      needAdvancedSearch: true,
      search: {
        deviceName: '',
        deviceCode: '',
        orgName: '',
        saiShangCode: ''
      },
      activeStep: 0,
      stepNum: 2,
      dialogVisible: false
    };
  },
  methods: {
    //添加设备
    addDevice() {
      this.dialogVisible = true;
      this.activeStep = 0;
      this.$nextTick(function() {
        this.$refs.deviceEdit.addForm();
      });
    },
    //编辑设备
    editDevice(deviceID, isCopy) {
      //是否复制 1:复制，0:编辑
      this.dialogVisible = true;
      this.activeStep = 0;
      this.$nextTick(function() {
        this.$refs.deviceEdit.editForm(deviceID, isCopy);
      });
    },
    step(val) {
      this.activeStep = val - 1;
    },
    //删除设备
    deleteDevice(deviceID) {
      this.$confirm('确认删除？', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .post(this.$globalData.get('trace', 'apiUrl').cameraDevice.DELETE, {
              deviceID: deviceID,
              status: 0
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$refs.list.refresh();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(() => {});
    },
    confirm() {
      this.$refs.deviceEdit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
        });
    },
    preStep() {
      this.$refs.deviceEdit.activeName = '1';
      this.activeStep--;
    },
    nextStep() {
      if (this.$refs.deviceEdit.form.deviceName == '') {
        this.$message.error('请输入设备名称');
        return;
      } else if (this.$refs.deviceEdit.form.orgID == '') {
        this.$message.error('请选择所属企业');
        return;
      }
      this.$refs.deviceEdit.activeName = '2';
      this.activeStep++;
    },
    cancel() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>

</style>
