<template>
  <div>
    <!--
      1.溯源预览 弹出时被阻拦(在ajax中返回时)
      2.pageSwitch 切换页面后只能通过面包屑返回，不能通过浏览器的返回
      3.微页面的配置地址
    -->
    <div v-if="currentPage == 'list'">
      <cjm-list :requestUrl="requestUrl" :need-base-search="true" :need-advanced-search="true" @selection-change="handleSelectionChange" ref="list">
        <div slot="operate">
          <cjm-button class="cjm-icon-add" power-code="LogisticsProductBatchAdd" type="primary" @click="addBatch">添加
          </cjm-button>
          <cjm-button class="cjm-icon-delete" @click="deleteBatch">删除</cjm-button>
          <cjm-button class="cjm-icon-export" @click="exportData">导出</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="批次名称" search-key="productBatchCode" v-model="search.productBatchCode">
            <cjm-input v-model="search.productBatchCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="产品名称" search-key="productName" v-model="search.productName">
            <cjm-input v-model="search.productName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="地块" search-key="plotsName" v-model="search.plotsName">
            <cjm-remote-select v-model="search.plotsName" :remote-url="$globalData.get('base', 'apiUrl').autoComplete.PLOTS">
            </cjm-remote-select>
          </cjm-search-item>
          <cjm-search-item label="创建时间" search-key="createTime" v-model="search.createTime">
            <cjm-date-picker v-model="search.createTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="展示类型" search-key="traceType" v-model="search.traceType">
            <cjm-enum-select v-model="search.traceType" enum-name="产品批次展示类型" enum-namespace="base" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
          <cjm-search-item label="所属机构" search-key="orgName" v-model="search.orgName">
            <cjm-input v-model="search.orgName"></cjm-input>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column type="selection" label="全选" width="55" fixed="left"></cjm-table-column>
          <cjm-table-column prop="productBatchCode" sortable="custom" label="批次名称" min-width="150"></cjm-table-column>
          <cjm-table-column prop="productName" sortable="custom" label="产品" min-width="150"></cjm-table-column>
          <!--<cjm-table-column label="区块链验证" sortable="custom" min-width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.blockChainStatus != -2 && scope.row.blockChainStatus != 1 && scope.row.blockChainStatus != 0 && scope.row.blockChainStatus != -1">区块链校验中<span class="cjm-check-loading"><i></i><i></i><i></i></span></span>-->
          <!--<span v-if="scope.row.blockChainStatus == -1">未上链</span>-->
          <!--<div v-if="scope.row.blockChainStatus == 0">-->
          <!--<i class="cjm-icon-warn icon-error"></i>-->
          <!--<cjm-tooltip class="item" effect="light" content="数据与区块链上信息不符，点击可查看" placement="right-start">-->
          <!--<cjm-button type="text" @click="blockChainView(scope.row)">验证未通过-->
          <!--</cjm-button>-->
          <!--</cjm-tooltip>-->
          <!--</div>-->
          <!--<div v-if="scope.row.blockChainStatus == 1">-->
          <!--<i class="cjm-icon-confirm icon-passed"></i>-->
          <!--<cjm-tooltip class="item" effect="light" content="数据与区块链上信息吻合，点击可查看" placement="right-start">-->
          <!--<cjm-button type="text" @click="blockChainView(scope.row)">验证通过</cjm-button>-->
          <!--</cjm-tooltip>-->
          <!--</div>-->
          <!--</template>-->
          <!--</cjm-table-column>-->
          <cjm-table-column prop="orgName" sortable="custom" label="机构" min-width="120"></cjm-table-column>
          <cjm-table-column prop="plotsName" sortable="custom" label="地块" min-width="120"></cjm-table-column>
          <cjm-table-column prop="traceType" sortable="custom" label="展示类型" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.traceType == 1" class="traceType">
                <span>微页面</span>
                <!--编辑微页面-->
                <cjm-tooltip :content="scope.row.microPageID?'修改微页面':'编辑微页面'">
                  <cjm-button type="text" power-code="LogisticsProductBatchMicroPageEdit" @click="microPageConfig(scope.row)">
                    <i class="cjm-icon-edit"></i>
                  </cjm-button>
                </cjm-tooltip>
                <cjm-tooltip content="切换到溯源节点">
                  <cjm-button type="text" @click="setTraceType(scope.row,'microPage')">
                    <i class="cjm-icon-switch"></i>
                  </cjm-button>
                </cjm-tooltip>
              </div>
              <div v-if="scope.row.traceType == 0" class="traceType">
                <span>溯源节点</span>
                <span :class="['pointer']" @click="traceRecondList(scope.row)" v-if="scope.row.traceNodeCount > 0" style="color: #20a0ff;">{{scope.row.traceNodeCount}}条</span>
                <cjm-tooltip content="编辑溯源节点" placement="top" v-if="scope.row.traceNodeCount == 0">
                  <cjm-button type="text" @click="traceRecondList(scope.row)">
                    <i class="cjm-icon-edit"></i>
                  </cjm-button>
                </cjm-tooltip>
                <cjm-tooltip content="切换到微页面">
                  <cjm-button type="text" @click="setTraceType(scope.row)">
                    <i class="cjm-icon-switch"></i>
                  </cjm-button>
                </cjm-tooltip>
              </div>
            </template>
          </cjm-table-column>
          <cjm-table-column prop="h5Mode" sortable="custom" label="H5溯源页" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.traceType == 0">{{scope.row.h5ModeName ? scope.row.h5ModeName : '模板一'}}</span>
              <cjm-tooltip content="切换模板">
                <cjm-button type="text" v-if="scope.row.traceType == 0" @click="updateH5Mode(scope.row)">
                  <i class="cjm-icon-switch"></i>
                </cjm-button>
              </cjm-tooltip>
            </template>
          </cjm-table-column>
          <cjm-table-column prop="createTime" sortable="custom" label="创建时间" width="180"></cjm-table-column>
          <cjm-table-column prop="createByName" sortable="custom" label="创建人" min-width="120"></cjm-table-column>
          <cjm-table-column prop="lastUpdateTime" sortable="custom" label="最新修改时间" width="180"></cjm-table-column>
          <cjm-table-column prop="note" label="备注" sortable="custom" min-width="120"></cjm-table-column>
          <cjm-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" power-code="LogisticsProductBatchEdit" @click="editBatch(scope.row, '0')">编辑
              </cjm-button>
              <cjm-button type="text" power-code="LogisticsProductBatchDelete" @click="deleteBatch(scope.row)">删除
              </cjm-button>
              <cjm-button type="text" power-code="LogisticsProductBatchCopy" @click="editBatch(scope.row, '1')">复制
              </cjm-button>
              <cjm-button type="text" @click="tracePreview(scope.row)">溯源预览</cjm-button>
              <cjm-button type="text" @click="h5Configure(scope.row)" v-if="scope.row.traceType == 0">H5配置</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'recordList'">
      <trace-record-edit ref="traceRecordEdit"></trace-record-edit>
    </div>
    <div v-if="currentPage == 'h5Configure'">
      <iframe :src="iframeUrl" frameborder="0" id="h5ConfigIframe" width="100%" height="600"></iframe>
    </div>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" type="tab" :okHandler="confirm" :height="700">
      <product-edit ref="productEdit"></product-edit>
    </cjm-dialog>
    <div v-if="currentPage == 'traceBlockChain'">
      <trace-block-chain-view></trace-block-chain-view>
    </div>
  </div>
</template>
<script>
import fileDownload from 'framework/utils/fileDownload';
import pageSwitch from 'framework/mixins/pageSwitch';
import traceRecordEdit from 'trace/views/traceRecord/traceRecord-edit.vue';
import productEdit from './edit.vue';
import traceBlockChainView from 'base/views/blockChain/trace-block-chain-view.vue';
export default {
  mixins: [pageSwitch],
  components: {
    traceRecordEdit,
    productEdit,
    traceBlockChainView
  },
  data() {
    return {
      requestUrl: this.$globalData.get('base', 'apiUrl').productBatch.GET_PRODUCT_LIST,
      search: {
        productBatchCode: '',
        productBatchNo: '',
        productName: '',
        plotsName: '',
        createTime: '',
        traceType: '',
        orgName: ''
      },
      deleteBatchArr: [], //批量删除的 批次ID
      showRecord: false,
      currentPage: 'list',
      iframeUrl: '',
      dialogTitle: '',
      dialogVisible: false,
      verifyChainBlockCount: 0 //验证区块请求计数
    };
  },
  methods: {
    //格式化列表数据
    formatListData(data) {
      let list = this.$refs.list;
      this.verifyChainBlockCount += 1;
      this.asynchronousRequest(list, data);
      return Object.deepClone(data);
    },
    //区块链验证开始异步请求
    asynchronousRequest(list, data) {
      let groupNumber = 5,
        count = Math.ceil(data.length / groupNumber);
      this.asynchronousRequestItem(this.verifyChainBlockCount, list, data, 1, count, groupNumber);
    },
    //区块链异步的单个请求
    asynchronousRequestItem(verifyChainBlockCount, list, data, index, count, groupNumber) {
      let param = data.slice((index - 1) * groupNumber, index * groupNumber);
      this.loadVerfiyResult(param)
        .then(traceVerifyData => {
          let nowData = Object.deepClone(list.tableData);
          for (var i = 0; i < nowData.length; i++) {
            let blockChainStatus = traceVerifyData[nowData[i].productBatchID];
            if (blockChainStatus) {
              nowData[i].blockChainStatus = blockChainStatus;
            }
          }
          this.$nextTick(() => {
            list.tableData = nowData;
          });
          if (index < count && verifyChainBlockCount == this.verifyChainBlockCount) {
            this.asynchronousRequestItem(verifyChainBlockCount, list, data, index + 1, count, groupNumber);
          }
        })
        .catch(() => {
          //当异常时继续执行下一步的请求
          if (index < count && verifyChainBlockCount == this.verifyChainBlockCount) {
            this.asynchronousRequestItem(verifyChainBlockCount, list, data, index + 1, count, groupNumber);
          }
        });
    },
    //加载区块链验证结果
    loadVerfiyResult(data) {
      let params = [];
      for (var i = 0; i < data.length; i++) {
        params.push(data[i].productBatchID);
      }
      return this.$ajax
        .post(this.$globalData.get('base', 'apiUrl').productBatch.TRACE_VERIFY, {
          productBatchIDs: params
        })
        .then(res => {
          if (res.resultCode == 200) {
            let traceVerifyData = res.data;
            return traceVerifyData;
          } else {
            throw new Error();
          }
        });
    },
    //导出
    exportData() {
      fileDownload(this.$globalData.get('base', 'apiUrl').productBatch.PRODUCT_BATCH_EXPORT, this.$refs.list.getConditions());
    },
    //勾选列表的行
    handleSelectionChange(val) {
      this.deleteBatchArr = val.map(p => {
        return p.productBatchID;
      });
    },
    //切换H5模板
    updateH5Mode(row) {
      if (row.h5ModeName === '模板二') {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').productBatch.GET_CAMERALS_VIDEO, {
            productBatchID: row.productBatchID
          })
          .then(res => {
            if (!res.data) {
              this.$confirm('请确保视频地址不为实时监控地址！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {
                  this.changeH5Mode(row);
                })
                .catch(() => {
                  return false;
                });
            } else {
              this.changeH5Mode(row);
            }
          });
      } else {
        this.changeH5Mode(row);
      }
    },
    //切换H5模板-切换操作
    changeH5Mode(row) {
      let params = {
        productBatchID: row.productBatchID,
        mode: row.h5ModeName === '模板一' ? 1 : 0
      };
      if (row) {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').productBatch.UPDATE_H5_MODE, params).then(res => {
          this.$message('已完成操作！');
          row.h5ModeName = row.h5ModeName === '模板一' ? '模板二' : '模板一';
          row.h5Mode = row.h5Mode == 1 ? '0' : '1';
        });
      }
    },
    //删除事件
    deleteBatch(row) {
      if (row) {
        this.$confirm('真的要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let params = {
              productBatchID: []
            };
            //判断批量删除还是单个删除
            if (this.deleteBatchArr.length === 0) {
              params.productBatchID[0] = row.productBatchID;
            } else {
              params.productBatchID = this.deleteBatchArr;
            }
            this.$ajax.post(this.$globalData.get('base', 'apiUrl').productBatch.DELETE, params).then(res => {
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
    //切换展示类型
    setTraceType(row, type) {
      if (row.traceNodeConfigCount == 0 && type === 'microPage') {
        this.$message('该产品尚未配置溯源节点');
        return false;
      }
      let params = {
        productBatchID: row.productBatchID
      };

      if (row) {
        this.$ajax.post(this.$globalData.get('base', 'apiUrl').productBatch.SET_TRACE_TYPE, params).then(res => {
          this.$message('已完成操作！');
          row.traceType = row.traceType == 1 ? 0 : 1;
          //            this.$refs.list.refresh();
        });
      }
    },
    //点击溯源预览
    tracePreview(row) {
      let url;
      if (row.h5Mode === '1') {
        url = this.$globalData.get('base', 'appConfig').agricultureWapHostV2 + '/TraceabilityPreview.html?batchid=' + row.productBatchID + '&MicroPageID=' + row.microPageID + '&TraceType=' + row.traceType;
      } else {
        url = this.$globalData.get('base', 'appConfig').agricultureWapHost + '/TraceabilityPreview.html?batchid=' + row.productBatchID + '&MicroPageID=' + row.microPageID + '&TraceType=' + row.traceType;
      }
      window.open(url);
    },
    //添加批次
    addBatch() {
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.productEdit.addForm();
      });
    },
    //编辑批次
    editBatch(row, isCopy) {
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.productEdit.editForm(row.productBatchID, isCopy);
      });
    },
    //H5配置
    h5Configure(row) {
      let gridobj = window.$('.easyuigrid');
      let dialogObj = parent.$('<div/>');
      let id = row.productBatchID;
      let title = '';
      let url = '../../Module/Logistics/ProductBatchCustomFunction.aspx';
      window.showFormDialog(
        dialogObj,
        title,
        url + '?ID=' + id + '&h5Mode=' + row.h5Mode,
        function() {
          let dataArr = [];
          let dataVideoArr = [];
          let btnNameArr = [];
          let videoNameArr = [];
          let flag;
          let flagVideo;
          let successmsg = '已完成操作！';
          if (id != '') {
            //保存自定义模块
            parent.$('#CustomizeContent >li').each(function(index, item) {
              let BatchIco = window
                .$(item)
                .find('.selectIcon')
                .val();
              flag = false;
              let btnName = window
                .$(item)
                .find('input[name="btnName"]')
                .val();
              let IcoNote = window
                .$(item)
                .find('input[name="IcoNote"]')
                .val();
              if (btnName.length > 100) {
                window.messager('名称不能超过100个字符');
                window
                  .$(item)
                  .find('input[name="btnName"]')
                  .focus();
                flag = true;
                return;
              }
              if (window.$.inArray(btnName, btnNameArr)) {
                btnNameArr.push(btnName);
              } else {
                window.messager('名称不能重复，请重新输入');
                window
                  .$(item)
                  .find('input[name="btnName"]')
                  .focus();
                flag = true;
                return;
              }

              if (IcoNote.length > 100) {
                window.messager('按钮介绍不能超过100个字符');
                window
                  .$(item)
                  .find('input[name="IcoNote"]')
                  .focus();
                flag = true;
                return;
              }

              let JumpLink = window
                .$(item)
                .find('input[name="JumpLink"]')
                .val();
              let row = {
                BatchID: id,
                DataUrl: JumpLink,
                IcoUrl: BatchIco,
                SortID: index + 1,
                IcoNote: IcoNote,
                IcoName: btnName
              };
              dataArr.push(row);
            });

            parent.$('#CustomizeVideoContent >li').each(function(index, item) {
              let CoverPic = window
                .$(item)
                .find('.hdnImg')
                .val();
              flagVideo = false;
              let VideoTitle = window
                .$(item)
                .find('input[name="VideoTitle"]')
                .val();
              let VideoUrl = window
                .$(item)
                .find('input[name="VideoUrl"]')
                .val();
              if (VideoTitle.length > 100) {
                window.messager('视频名称不能超过100个字符');
                window
                  .$(item)
                  .find('input[name="VideoTitle"]')
                  .focus();
                flagVideo = true;
                return false;
              }
              if (window.$.inArray(VideoTitle, videoNameArr)) {
                videoNameArr.push(VideoTitle);
              } else {
                window.messager('视频名称不能重复，请重新输入');
                window
                  .$(item)
                  .find('input[name="VideoTitle"]')
                  .focus();
                flagVideo = true;
                return false;
              }
              //              let VideoUrl = window.$(item).find('input[name="VideoUrl"]').val();
              let row = {
                BatchID: id,
                CoverPic: CoverPic,
                SortID: index + 1,
                VideoUrl: VideoUrl,
                VideoTitle: VideoTitle
              };
              dataVideoArr.push(row);
            });
            let CustomizePageTitle = parent.$('#CustomizePageTitle').val();
            if (CustomizePageTitle == '') {
              window.messager('页面标题不能为空');
              parent.$('#CustomizePageTitle').focus();
              return false;
            }
            let ShareTitle = parent.$('#ShareTitle').val();
            let ShareDescription = parent.$('#ShareDescription').val();
            let ShareIco = parent
              .$('#certificateImgUpload')
              .find('.hdnImg')
              .val();
            let rowCustomizePageTitle = {
              BatchID: id,
              PageTitle: CustomizePageTitle,
              ShareTitle: ShareTitle,
              ShareDescription: ShareDescription,
              ShareIco: ShareIco
            };
            if (!flag) {
              window.ajaxPost(url + '?response=json&function=save&BatchID=' + id, JSON.stringify(dataArr), 'post', function(d) {
                if (d.success) {
                  successmsg = d.msg;
                } else {
                  window.messager(d.msg);
                  return false;
                }
              });
            }
            if (!flag || !flagVideo) {
              window.ajaxPost(url + '?response=json&function=savevideo&BatchID=' + id, JSON.stringify(dataVideoArr), 'post', function(d) {
                if (d.success) {
                  successmsg = d.msg;
                } else {
                  window.messager(d.msg);
                  return false;
                }
                if (CustomizePageTitle != '' || ShareTitle != '' || ShareDescription != '' || ShareIco != undefined) {
                  window.ajaxPost(url + '?response=json&function=savetitle&BatchID=' + id, JSON.stringify(rowCustomizePageTitle), 'post', function(d) {
                    if (d.success) {
                      dialogObj.dialog('destroy');
                      gridobj.datagrid('reload');
                      window.messager(d.msg);
                    } else {
                      window.messager(d.msg);
                      return false;
                    }
                  });
                } else {
                  dialogObj.dialog('destroy');
                  gridobj.datagrid('reload');
                  window.messager(successmsg);
                }
              });
            } else {
              dialogObj.dialog('destroy');
              gridobj.datagrid('reload');
              window.messager(successmsg);
            }
          }
        },
        650,
        800
      );
    },
    //进入溯源记录
    traceRecondList(row) {
      this.pushPage('recordList', '溯源记录', {
        batchID: row.productBatchID,
        productID: row.productID,
        productName: row.productName,
        productBatchID: row.productBatchID,
        orderType: row.traceNodeOrderType || '1'
      });
    },
    //微页面
    microPageConfig(row) {
      if (row) {
        this.iframeUrl = '../../Module/WeixinManage/MicroPageEdit.aspx?AdhibitionType=1&ModuleID=' + row.productBatchID + '&MicroPageID=' + row.microPageID;
        this.pushPage('h5Configure', '微页面', { batchID: row.productBatchID });
      }
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },

    //查看区块链
    blockChainView(row) {
      this.pushPage('traceBlockChain', '溯源区块链', { productBatchID: row.productBatchID });
    },
    //表单提交
    confirm(callback) {
      this.$refs.productEdit
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
    }
  },
  mounted() {}
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
.pointer:hover {
  text-decoration: underline;
  cursor: pointer;
}

.el-button i {
  margin-right: 0;
}

.traceType .el-button + .el-button {
  margin-left: 0;
}

.icon-passed {
  color: #057748;
}

.icon-error {
  color: #f44336;
}

.cjm-check-loading {
  i {
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 2px;
    border-radius: 50%;
    opacity: 0;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    &:nth-child(1) {
      background-color: #88ceff;
      animation-name: cjmCheckLoading1;
    }
    &:nth-child(2) {
      background-color: #4bb5ff;
      animation-name: cjmCheckLoading2;
    }
    &:nth-child(3) {
      background-color: #009cff;
      animation-name: cjmCheckLoading3;
    }
  }
  @keyframes cjmCheckLoading1 {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
  }

  @keyframes cjmCheckLoading2 {
    33% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
  }

  @keyframes cjmCheckLoading3 {
    63% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
