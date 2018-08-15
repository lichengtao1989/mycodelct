<template>
  <div>
    <div class="node-details node-details-list">
      <div class="node-detail-item" v-for="(item, index) in nodesInfo" :key="item.traceNodeID">
        <div class="item-title">
          <div class="title-name">
            <span>{{index + 1}}</span>
            <span>{{item.nodeName}}</span>
          </div>
          <div class="item-operates clearfix">
            <div class="fr">
              <span class="rt-box" @click="editNodeConfig(item)">
                <i class="cjm-icon-edit" title="编辑"></i>
                <span class="icon-text">编辑</span>
              </span>
              <span class="rt-box" @click="delNodeConfig(item,index)">
                <i class="cjm-icon-delete" title="删除"></i>
                <span class="icon-text">删除</span>
              </span>
              <span class="switch-toggle" @click="toggleInfoShow(item)">
                <i :class="item.isShow?'cjm-icon-caret-down cjm-icon-rotate-180':'cjm-icon-caret-down'" :title="item.isShow?'收起':'展开'"></i>
              </span>
            </div>
            <div class="fr">
              <cjm-button type="text" style="margin-right: 20px" v-if="nodeCodeStatus[item.traceNodeID] ==1 || nodeCodeStatus[item.traceNodeID] ==0" @click.stop.prevent="blockChainView(item.traceNodeID)" class="block-button">
                <i class="cjm-icon-warn icon-error" v-if="nodeCodeStatus[item.traceNodeID] == 0"></i>
                <i class="cjm-icon-confirm icon-passed" v-if="nodeCodeStatus[item.traceNodeID] == 1"></i>
                区块链
              </cjm-button>
              <span @click.stop.prevent="triggerH5(item)" style="margin-right: 20px">
                <cjm-radio v-model="item.showHidden" :label="'0'">H5隐藏</cjm-radio>
              </span>
              <!--<span>{{item.lastUpdateTime}}</span>-->
            </div>
          </div>
        </div>
        <div class="item-info" v-show="item.isShow">
          <ul>
            <li>
              <label>{{item.operateTimeName}}</label>
              <span class="field-value">{{item.operateTime}}{{item.operateTimeEnd ? (' ~ ' + item.operateTimeEnd) : ''}}</span>
            </li>
            <li v-for="(info, i) in item.nodeExt" :key="info.extID" v-show="isShowExt(info)">
              <label>{{info.fieldName}}</label>
              <div class="imgs-box" v-html="imgDataFormatter(info.fieldValue)" v-if="info.fieldType==2"></div>
              <span class="field-value" v-if="info.fieldType!=2">{{info.fieldValue}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <cjm-dialog :height="700" :ok-handler="editNodeConfirm" :visible.sync="dialogVisible" :title="dialogTitle">
      <trace-record-edit @configNull="configNull" :remote-url="configUrl" v-if="dialogVisible" :params="paramsForConfig" :no-btns=true ref="editNodePage"></trace-record-edit>
    </cjm-dialog>
  </div>
</template>


<script>
  import traceRecordEdit from './traceRecord-edit.vue';
  //  import enums from 'static/data/enums.json';

  export default {
    name: 'trace-record-detail-list',
    components: {
      traceRecordEdit
    },
    props: {
      /**
       *远程请求地址
       */
      remoteUrl: {
        type: String
      },
      /**
       *远程请求参数,默认请求url传参batchID即可
       */
      params: Object,
      /**
       *传入数据，不需远程请求
       */
      datasList: Array
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        configUrl: traceApiUrl.traceRecord.GET_NODE_CONFIG_SIGLE,
        paramsForConfig: {},
        nodesInfo: [],
        dialogVisible: false,
        dialogTitle: '编辑溯源记录信息',
        getNodeCodeStatusParams: {
          traceNodeIDs: [],
          productBatchID: ''
        }, //'用于获取状态的节点集合和批次id'
        nodeCodeStatus: []
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.getDetailsList();
      });
    },
    methods: {
      showAll() {
        this.toggleInfoShow(true);
      },
      hideAll() {
        this.toggleInfoShow(false);
      },
      configNull() {
        this.$message.error('该数据的溯源节点配置不存在');
        this.dialogVisible = false;
      },
      triggerH5(node) {
        node.showHidden = node.showHidden > 0 ? '0' : '1';
        this.setH5Hidden(node);
      },
      editNodeConfig(node) {
        this.dialogVisible = true;
        this.dialogTitle = node.nodeName;
        this.$nextTick(() => {
          this.paramsForConfig = {
            nodeID: node.nodeID,
            nodeName: node.nodeName,
            batchID: node.batchID,
            traceNodeID: node.traceNodeID,
            isEdit: true
          };
        });
      },
      editNodeConfirm(callback) {
        this.$refs.editNodePage
          .submit()
          .then(() => {
            callback();
            this.getDetailsList();
            this.dialogVisible = false;
          })
          .catch(err => {
            if (err && err.message) {
              this.$message.error(err.message);
            }
            callback();
          });
      },
      delNodeConfig(node, i) {
        this.$confirm('确认删除？', '提示', {type: 'warning'})
          .then(() => {
            let param = {traceNodeID: node.traceNodeID};
            this.$ajax
              .post(this.traceApiUrl.traceRecord.DELETE_NODE_CONFIG, param)
              .then(res => {
                if (res.resultCode === '200') {
                  this.$message(res.msg);
                  //this.nodesInfo.splice(i, 1);
                  this.getDetailsList();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(error => {
                if (error) {
                  this.$message.error(error);
                }
              });
          })
          .catch(() => {
          });
      },
      isUUID(text){
        return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/.test(text);
      },
      extAppend(node, ext, name, value, type = 3){
        const newNodeExt = [];
        node.nodeExt.forEach(item => {
          newNodeExt.push(item);
          if (item === ext) {
            newNodeExt.push({
              extID: Date.now() + '' + Math.floor(Math.random() * 89999 + 10000),
              fieldName: name,
              fieldValue: value,
              fieldType: type
            });
          }
        });
        node.nodeExt = newNodeExt;
      },
      async loadEmployeeInfo(){
        this.nodesInfo.forEach(node => {
          if (node.nodeExt && node.nodeExt.length) {
            node.nodeExt.forEach(async ext => {
              if (ext.optionType == 8) {
                const employeeId = ext.fieldContant;
                const {err, res} = await this.$ajaxSync.get(this.traceApiUrl.traceRecord.GET_EMPLOYEE_INFO, {employeeId});
                if (err) {
                  console.error(err);
                } else if (!err && res && res.resultCode == 200) {
                  //所属机构、性别、员工编号、岗位、照片信息
                  //
                  const pics = res.data.employeePic ? JSON.stringify(res.data.employeePic.split(',').map(src => ({url: src}))) : '[]';
                  this.extAppend(node, ext, '照片信息', pics, 2);
                  this.extAppend(node, ext, '岗位', res.data.position);
                  this.extAppend(node, ext, '员工编号', res.data.employeeNumber);
                  //
                  const sexEnum = this.$globalData.get('trace', 'enums')['性别'];
                  const sexText = Object.keys(sexEnum).find(key => sexEnum[key] == res.data.sex) || '';
                  this.extAppend(node, ext, '性别', sexText);
                  this.extAppend(node, ext, '所属机构', res.data.orgName);
                  //this.extAppend(node, ext, '员工姓名', res.data.employeeName);
                }
              }
            });
          }
        });
      },
      nodesInfoSetting(nodesInfo) {
        nodesInfo.forEach(item => {
          let infos = item.nodeExt;
          item.operateTime && (item.operateTime = item.operateTime.replace(/\-/g, '/'));
          item.operateTimeEnd && (item.operateTimeEnd = item.operateTimeEnd.replace(/\-/g, '/'));
          if (infos && infos.length) {
            infos.forEach(info => {
              if (info.isSysDefine == 1) {
                info.fieldValue = item.operateTime;
                if (item.operateTimeEnd) {
                  info.fieldValue = item.operateTime + ' ~ ' + item.operateTimeEnd;
                }
              } else {
                if (info.fieldText && info.fieldValue && info.fieldType != 3 && info.fieldType != 2) {
                  info.fieldValue = info.fieldValue + info.fieldText;
                } else if ((info.fieldText && !info.fieldValue) || (info.fieldText && !this.isUUID(info.fieldText) && info.fieldType == 3)) {
                  info.fieldValue = info.fieldText;
                }
                if (info.fieldType == 4 && info.fieldValue) {
                  info.fieldValue = info.fieldValue.split(',').join(' ~ ').replace(/\-/g, '/');
                }
              }
            });
          }
        });
        //console.log(nodesInfo);
        return nodesInfo;
      },
      //加载溯源记录
      async getDetailsList() {
        if (this.datasList) {
          this.nodesInfo = this.datasList;
          return;
        }
        const url = this.remoteUrl || this.traceApiUrl.traceRecord.GET_DETAIL_LIST;
        const params = this.params;
        const {err, res} = await this.$ajaxSync.get(url, params);
        if (err) {
          this.$message.error(err.message);
        } else if (res.resultCode === '200') {
          let nodesInfo = res.data.rows || [];
          this.getNodeCodeStatusParams['traceNodeIDs'] = nodesInfo.map(item => item.traceNodeID);
          this.getNodeCodeStatusParams['productBatchID'] = this.params.productBatchID;
          const nodeVerify = await this.getNodeVerify(this.getNodeCodeStatusParams);
          await this.$nextTick();
          this.nodeCodeStatus = nodeVerify;
          this.nodesInfo = this.nodesInfoSetting(nodesInfo);
          this.toggleInfoShow(true);
          this.$emit('setNoData', this.nodesInfo.length === 0);
          await this.$nextTick();
          await this.loadEmployeeInfo();
        }
      },
      //验证节点
      getNodeVerify: function (getNodeCodeStatusParams) {
        return new Promise(resolve => {
          this.$ajax
            .post(this.traceApiUrl.traceRecord.TRACE_NODE_VERIFY, getNodeCodeStatusParams)
            .then(res => {
              if (res.resultCode === '200') {
                let nodeCodeStatus = res.data;
                resolve(nodeCodeStatus);
              }
            })
            .catch(error => {
              if (error) {
                this.$message.error(error);
              }
            });
        });
      },
      //查看区块链
      blockChainView(traceNodeID) {
        this.$parent.blockChainView({
          productBatchID: this.params.productBatchID,
          traceNodeID: traceNodeID
        });
      },
      isShowExt(info){
        const conditions = [info.fieldValue, info.fieldValue.length > 0];
        if (info.fieldType == 2) {
          conditions.push(this.getImageInfo(info.fieldValue).length > 0);
        }
        return conditions.filter(cond => !cond).length === 0;
      },
      getImageInfo(val){
        let imgs = [];
        try {
          imgs = JSON.parse(val || '[]');
        } catch (err) {
          console.error(err);
        }
        return imgs;
      },
      imgDataFormatter: function (val) {
        let htl = '<ul>';
        try {
          let imgs = this.getImageInfo(val);
          for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].url) {
              htl = htl + '<li>';
              htl = htl + '<img src="' + imgs[i].url + '"/>';

              if (imgs[i].title) {
                htl = htl + '<p>' + imgs[i].title + '</p>';
              }
              htl = htl + '</li>';
            }
          }
        } catch (err) {
          console.error(err);
        }
        htl = htl + '</ul>';
        return htl;
      },
      toggleInfoShow(data) {
        if (typeof data === 'boolean') {
          for (let i = 0; i < this.nodesInfo.length; i++) {
            this.$set(this.nodesInfo[i], 'isShow', data);
          }
        } else {
          data.isShow = !data.isShow;
        }
        this.setShowHideAllowStatus();
      },
      setShowHideAllowStatus() {
        let isAllowShowAll = false;
        let isAllowHideAll = false;
        this.nodesInfo.forEach(item => {
          if (item.isShow) {
            isAllowHideAll = true;
          } else {
            isAllowShowAll = true;
          }
        });
        this.$emit('setShowHideAllowStatus', [isAllowShowAll, isAllowHideAll]);
      },
      setH5Hidden(node) {
        let param = {
          traceNodeID: node.traceNodeID,
          showHidden: node.showHidden
        };
        //保存勾选结果
        this.$ajax.get(this.traceApiUrl.traceRecord.SAVE_NODE_H5_HIDE, param).then(res => {
          if (res.resultCode === '200') {
            this.$message(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
      }
    }
  };
</script>


<style lang="less" rel="stylesheet/less">
  @import '../../../assets/css/config';

  .node-details.node-details-list {
    max-width: 800px;
    min-width: 640px;
    .fl {
      float: left;
    }

    .fr {
      float: right;
    }

    .clearfix:after {
      display: block;
      content: '.';
      clear: both;
      height: 0;
      visibility: hidden;
    }
    .node-detail-item {
      background: @DarkWhite;
      border: 1px @LightGray solid;
      margin-bottom: 20px;
      font-size: 14px;
      color: @Silver;
      .item-title {
        .block-button .icon-passed {
          color: #057748;
        }
        .block-button .icon-error {
          color: #f44336;
        }
        border-bottom: 1px @ExtraLightGray solid;
        height: 45px;
        line-height: 45px;
        .title-name {
          /*margin-right: 520px;*/
          & :first-child {
            display: inline-block;
            padding: 0px 20px;
            height: 26px;
            border-right: 1px @LightGray solid;
            line-height: 26px;
            margin-right: 15px;
          }
        }
        .item-operates {
          float: right;
          /*width: 515px;*/
          margin: -45px 0 0 0;
          i {
            cursor: pointer;
            color: @primaryColor;
          }
          .icon-text {
            font-size: 14px;
            color: @primaryColor;
          }
          .cjm-icon-caret-down {
            color: #bfcbd9;
            margin: 0 15px;
          }
          .switch-toggle {
            border-left: 1px solid #f0f0f0;
            line-height: 35px;
            display: inline-block;
            cursor: pointer;
          }
          .rt-box {
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
      .item-info {
        margin: 20px 20px 0 20px;
        & > ul > li {
          margin-bottom: 20px;
        }
        label {
          display: inline-block;
          width: 135px;
          text-align: right;
          margin-right: 25px;
          vertical-align: top;
        }
        .imgs-box {
          display: inline-block;
          width: ~'calc(100% - 170px)';
        }
        .field-value {
          white-space: nowrap;
          max-width: 420px;
          overflow: hidden;
          display: inline-block;
          text-overflow: ellipsis;
        }
      }
    }

    .item-operates .el-radio {
      color: @Silver;
    }

    .imgs-box {
      margin-bottom: -10px;
      li {
        position: relative;
        margin: 0 10px 10px 0;
        float: left;
        width: 130px;
        height: 130px;
        line-height: 130px;
        text-align: center;
        border: 1px solid #c2c2c2;
        background-color: #fff;
        overflow: hidden;
        img {
          max-width: 130px;
          max-height: 130px;
          width: 130px;
          vertical-align: middle;
        }
        p {
          position: absolute;
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-size: 17px;
          bottom: 0;
          left: 0;
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          text-indent: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
    }
  }
</style>
