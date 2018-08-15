<template>
  <div>
      <cjm-list :request-url="requestUrl" :need-base-search="needBaseSearch" :need-advanced-search="needAdvancedSearch" ref="list">
        <div slot="operate">
          <cjm-button @click="add" type="primary"><i class="cjm-icon-add"></i>新增气象站</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="所属企业" search-key="corpName" v-model="search.corpName">
            <cjm-input v-model="search.corpName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="气象站名称" search-key="stationName" v-model="search.stationName">
            <cjm-input v-model="search.stationName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="设备编号" search-key="stationCode" v-model="search.stationCode">
            <cjm-input v-model="search.stationCode"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column prop="corpName" label="所属企业" width="150"  sortable="custom"></cjm-table-column>
          <cjm-table-column prop="type" label="气象类型" enum-name="气象类型" enum-namespace="trace"  width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="stationName" label="气象站名称"   width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="iP" label="IP" width="150"  sortable="custom"></cjm-table-column>
          <cjm-table-column prop="port" label="端口"  width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="stationCode" label="设备编号"  min-width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="areaName" label="区域"  width="100" sortable="custom"></cjm-table-column>
          <cjm-table-column prop="plotsName" label="区块"  width="150" sortable="custom"></cjm-table-column>
          <cjm-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" @click="edit(scope.row.stationID,'0')">编辑</cjm-button>
              <cjm-button type="text" @click="deleteStation(scope.row.stationID)">删除</cjm-button>
              <cjm-button type="text" v-if="scope.row.status=='0'" style="color:#4c4c4c;" @click="disabledOrEnabled(scope.row.stationID,'1')">禁用</cjm-button>
              <cjm-button type="text" v-if="scope.row.status=='1'"
                          @click="disabledOrEnabled(scope.row.stationID,'0')">启用
              </cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
      <cjm-dialog :visible.sync="dialogVisible" type="step" :height="750">
        <weather-edit ref="weatherEdit"></weather-edit>
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
  import weatherEdit from './edit.vue'
  export default{
    components: {
      weatherEdit
    },
    data(){
      return {
        requestUrl: this.$globalData.get('trace', 'apiUrl').weather.GET_LIST,
        needBaseSearch: true,
        needAdvancedSearch: true,
        search: {
          corpName: '',
          stationName: '',
          stationCode: ''
        },
        activeStep: 0,
        stepNum: 3,
        dialogVisible: false
      }
    },
    methods: {
      //添加设备
      add(){
        this.dialogVisible = true;
        this.activeStep = 0;
        this.$nextTick(function () {
          this.$refs.weatherEdit.addForm();
        });
      },
      //编辑设备
      edit(stationID){
        this.dialogVisible = true;
        this.activeStep = 0;
        this.$nextTick(function () {
          this.$refs.weatherEdit.editForm(stationID);
        });
      },
      //删除气象站
      deleteStation(stationID){
        this.$confirm('确认删除？', '提示').then(_ => {
          this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.DELETE, {
            stationID: [stationID]
          }).then((r) => {
            if (r.resultCode == 200) {
              this.$refs.list.refresh();
            } else {
              this.$message.error(r.msg);
            }
          });
        }).catch(_ => {});
      },
      //启用禁用气象站
      disabledOrEnabled(stationID, status) {
        if (status == 0) {
          this.$confirm('确认禁用？', '提示', {type: 'warning'}).then(_ => {
            this.sendStatus(stationID, status);
          }).catch(_ => {});
        }else{
          this.sendStatus(stationID, status);
        }
      },
      sendStatus(stationID, status) {
        this.$ajax.post(this.$globalData.get('trace', 'apiUrl').weather.SET_STATUS, {
          stationID: stationID,
          status: status
        }).then((r) => {
          if (r.resultCode == 200) {
            this.$refs.list.refresh();
          } else {
            this.$message.error(r.msg);
          }
        });
      },
      confirm(){
        this.$refs.weatherEdit.submit().then(() => {
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.$refs.list.refresh();
        }).catch((error) => {
          if(error.message != ''){
            this.$message.error(error.message);
          }
        });
      },
      preStep(){
        if (this.$refs.weatherEdit.form.type == 1) {
          this.stepNum = 2;
        }else{
          this.stepNum = 3;
        }
        this.$refs.weatherEdit.active = this.$refs.weatherEdit.active - 1;
        this.activeStep--;
      },
      nextStep(){
        this.$refs.weatherEdit.$refs.form.validate((valid) => {
          if (valid) {
            if (this.$refs.weatherEdit.form.type == 1) {
              this.stepNum = 2;
            }else{
              this.stepNum = 3;
            }
            this.$refs.weatherEdit.active = this.$refs.weatherEdit.active + 1;
            this.activeStep++;
          }
        })
      },
      cancel(){
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>
</style>
