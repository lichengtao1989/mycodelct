<template>
  <div>
    <cjm-form ref="form" :model="form" :rules="rules">
      <cjm-form-item label="基地名称" required class="cjm-form-item-long" prop="plotsID">
        <cjm-remote-select :remote-url="$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE" v-model="form.plotsID"
          :label="form.baseName"
        >
        </cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="基地分区" class="cjm-form-item-long" v-show="isBaseArea" prop="baseAreaID">
        <cjm-remote-select :fetch-data="fetchData" v-model="form.baseAreaID" :label="form.baseAreaName">
        </cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="气象土壤水质"  required class="cjm-form-item-long" prop="deviceKey">
        <cjm-remote-select :fetch-data="queryDeviceList"
                           v-model="deviceKey"
                           :label="deviceName"
                           @select="seletDeviceIDs"
        >
        </cjm-remote-select>
      </cjm-form-item>
      <cjm-form-item label="视频监控" required class="cjm-form-item-long" prop="cameraId">
        <cjm-enum-select v-model="cameraId" enum-name="视频监控" enum-namespace="trace" :label="cameraName" @input="seletCamera"></cjm-enum-select>
      </cjm-form-item>
    </cjm-form>
  </div>
</template>

<script>
  export default {
    props: {},
    data () {
      return {
        apiUrl: this.$globalData.get('trace', 'apiUrl'),
        submitLoading: false,
        loadData: false,
        form: {
          deviceIDs: {},
          videoIDs: {}
        },
        rules: {
          cameraId: [this.$formRules.required],
          deviceKey: [this.$formRules.required],
          baseAreaID: [this.$formRules.required],
          plotsID: [this.$formRules.required]
        },
        deviceIDs: {},
        deviceName: '',
        deviceKey: '',
        cameraName: '',
        cameraId: '',
        currentPageInfo: {
          pageType: ''
        },
        isBaseArea: false,
        options: []
      }
    },
    computed: {},
    watch: {
      'form.plotsID': function () {
        if (this.form.plotsID != '') {
          this.getBaseArea()
        } else {
          this.isBaseArea = false
        }
      }
    },
    methods: {
      getBaseArea () {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE_AREA, {
          pageSize: 50,
          baseID: this.form.plotsID
        }).then(r => {
          if (r.resultCode == '200') {
            if (r.data.length > 0) {
              this.isBaseArea = true
            } else {
              this.isBaseArea = false
            }
          }
        })
      },
      fetchData (query, callback) {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').autoComplete.LOOK_BASE_AREA, {
          pageSize: 50,
          keyWord: query,
          baseID: this.form.plotsID
        }).then(r => {
          if (r.resultCode == '200') {
            if (r.data.length > 0) {
              this.isBaseArea = true
            }
            callback(r.data)
          }
        })
      },
      queryDeviceList(query, callback){
        this.$ajax.get(this.apiUrl.monitorDevice.GET_DEVICE_LIST).then(r => {
          if (r.resultCode == '200') {
            if (r.data.rows.length > 0) {
              const dealData = r.data.rows.map((item) => {
                return {'id': `${item.groupId},${item.areaId}`, 'name': `${item.groupName}(${item.areaName})`}
              })
              callback(dealData);
            }
          }
        })
      },
      seletDeviceIDs(item){
        const { id, name } = item;
        const idArr = id.split(',');
        const nameArr = name.replace('(', ',').replace(')', ',').split(',');

        this.deviceIDs.groupId = idArr[0];
        this.deviceIDs.areaId = idArr[1];
        this.deviceIDs.groupName = nameArr[0];
        this.deviceIDs.areaName = nameArr[1];
      },
      seletCamera(item) {
        const type = {
          '1000004': '新弘站',
          '1000005': '万禾站',
          '1000006': '北湖站',
          '1000007': '春润站',
          '1000008': '新平站'
        }

        this.cameraId = item;
        this.cameraName = type[item]
      },
      submit () {
        this.form.deviceIDs = this.deviceIDs;
        this.form.videoIDs = {
          cameraId: this.cameraId,
          ip: '112.25.210.130',
          port: '9090',
          cameraName: this.cameraName
        }
        if (this.cameraId === '' || this.deviceKey === '' || this.form.plotsID === ''){
          this.$message.error('请填写完整的信息进行提交')
          return;
        }
        return this.$ajax.post(this.apiUrl.monitorDevice.SAVE, this.form).then(data => {
          if (data.resultCode != 200) {
            // this.submitLoading = false
            this.$message.error(data.msg)
          }
        })
          .catch(() => {
          // this.submitLoading = false
          })
      },
      editForm (item) {
        this.$refs.form.resetFields()
        this.$ajax.get(this.apiUrl.monitorDevice.GET_DETAIL, {
          plotsDeviceID: item.plotsDeviceID
        }).then(r => {
          if (r.resultCode == 200) {
            let deviceIDs = r.data.deviceIDs;
            this.deviceIDs = {
              groupId: deviceIDs.groupId,
              areaId: deviceIDs.areaId,
              groupName: deviceIDs.groupName,
              areaName: deviceIDs.areaName
            }
            this.deviceName = `${deviceIDs.groupName}(${deviceIDs.areaName})`;
            this.deviceKey = `${deviceIDs.groupId},${deviceIDs.areaId}`
            this.cameraId = r.data.videoIDs.cameraId
            this.cameraName = r.data.videoIDs.cameraName
            this.form = r.data
          } else {
            this.$message.error(r.msg)
          }
        }).catch()
      },
      reset() {
        this.form = {
          plotsID: '',
          baseAreaID: '',
          deviceIDs: {},
          videoIDs: {}
        }
        this.cameraId = ''
        this.cameraName = ''
        this.deviceKey = ''
        this.deviceName = ''
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
    },
    created () {
      this.reset()
      // if (this.getPageParams('editBase') && this.getPageParams('editBase').pageType) {
      //   const pageParams = this.getPageParams('editBase');
      //   this.currentPageInfo.pageType = pageParams.pageType;
      //   if (pageParams.pageType != 'add') {
      //     this.form.baseID = pageParams.baseID;
      //     this.getDetailed(pageParams.baseID);
      //   } else {
      //     this.loadData = true;
      //   }
      // }
    }
  }
</script>

<style scoped>
  .only-for-print {
    display: none;
  }
</style>
