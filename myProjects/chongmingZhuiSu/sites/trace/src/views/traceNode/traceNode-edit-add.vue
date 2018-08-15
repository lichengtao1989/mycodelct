<template>
  <div class="trace-node" :style="traceNodeHeight" style="min-height: 685px">
    <div class="trace-node-add clear">
      <div class="trace-node-list">
        <div class="title">溯源节点</div>
        <!--产品名称-->
        <div class="second-title">{{productInfo.name}}</div>
        <!--左侧-节点列表-->
        <div class="node-list" :style="nodeContentHeight" style="min-height: 537px">
          <cjm-scrollbar ref="scrollBar" v-show="nodeList.length > 0">
            <trace-node-list :nodeListData="nodeList" :params="{productID: this.productInfo.id}" :sortable="true" :deleteable="true" :copyable="true" :editNode="showNodeDetail" :nodeData="nodeData" :isLongInput="isLongInput" :isModify="isModify" :isAddNodeList="isAddNodeList" @getEditNodeList="getEditNodeList" @copyObject="copyObject" @cancelCopy="cancelEdit" ref="nodeListForDetail"></trace-node-list>
          </cjm-scrollbar>
          <!--没有节点的时候提示文案-->
          <p v-show="nodeList.length == 0">尚未设置溯源节点，请选择“添加节点”
            <span v-if="editType != 1">或“从模板添加”</span>。</p>
        </div>
        <!--左侧-节点添加按钮-->
        <div class="add-node-btn" :class="{'edit-node-btn':editType == 0 || editType == 2 || editType == 4}">
          <cjm-button type="primary" size="small" @click="addNodeList">
            <i class="cjm-icon-add"></i>添加节点</cjm-button>
        </div>
        <!--左侧-从模板添加按钮-->
        <div class="add-node-btn" v-if="editType == 0 || editType == 2 || editType == 4" :class="{'edit-node-btn2':editType == 0 || editType == 2 ||editType == 4 }">
          <cjm-button type="primary" size="small" @click="addNodeFromModel">
            <i class="cjm-icon-add"></i>从模板添加</cjm-button>
        </div>
      </div>
      <!--右侧-配置溯源节点没有信息时-->
      <div class="trace-node-detail" v-if="!nodeData">
        <div class="prompt-img">
          <img src="static/images/trace-icon-init.png" alt="">
          <span v-if="nodeList.length == 0">请在左侧添加溯源节点开始编辑</span>
          <span v-if="nodeList.length > 0">请在左侧选择一个溯源节点或添加节点开始编辑</span>
        </div>
      </div>
      <!--右侧-配置溯源节点页面-->
      <div class="trace-node-detail" v-if="nodeData || isAddNodeList">
        <!--节点配置-编辑内容tab页面-->
        <cjm-tabs v-model="activeName" type="border-card" @tab-click="tabClickHandle">
          <cjm-tab-pane label="节点信息" name="1">
            <node-info ref="nodeInfo" :nodeData="nodeData" :from="from" :isAddNodeList="isAddNodeList" :editType="editType" :key="nodeData.nodeID"></node-info>
          </cjm-tab-pane>
          <cjm-tab-pane label="节点内容" name="2">
            <node-content ref="nodeContent" :nodeData="nodeData" :key="nodeData.nodeID" :from="from" @changeModify="changeModify" :isLongInput="isLongInput" :isAddNodeList="isAddNodeList"></node-content>
          </cjm-tab-pane>
          <cjm-tab-pane label="批次控制" name="3" v-if="editType == 0 || editType == 1">
            <bantch-control :productInfo="productInfo" :from="from" :nodeData="nodeData" :key="nodeData.nodeID"></bantch-control>
          </cjm-tab-pane>
        </cjm-tabs>
        <!--节点内容 - 添加内容按钮 (增加单选、增加时间、增加文字、增加图片)-->
        <div class="node-add-btn" v-if="activeName == '2'">
          <ul class="clear">
            <li @click="addNode('configOption')">
              <div class="add-font-icon">
                <i class="cjm-icon-code-view"></i>
              </div>
              <span>增加单选</span>
            </li>
            <li @click="addNode('configDatetime')">
              <div class="add-font-icon">
                <i class="cjm-icon-time"></i>
              </div>
              <span>增加时间</span>
            </li>
            <li @click="addNode('configText')">
              <div class="add-font-icon">
                <i class="cjm-icon-input"></i>
              </div>
              <span>增加文字</span>
            </li>
            <li @click="addNode('configImage')">
              <div class="add-font-icon">
                <i class="cjm-icon-image"></i>
              </div>
              <span>增加图片</span>
            </li>
          </ul>
        </div>
        <!--编辑按钮 - (取消编辑、节点预览、下一步)-->
        <div class="trace-node-detail-btn">
          <cjm-button @click="cancelEdit">
            <i class="cjm-icon-close"></i>取消编辑</cjm-button>
          <cjm-button type="primary" @click="nodePreview">
            <i class="cjm-icon-preview"></i>
            <span>节点预览</span>
          </cjm-button>
          <cjm-button type="primary" @click="nextStep" v-if="activeName < stepBarNumber">
            <span>下一步</span>
            <i class="cjm-icon-chevron-down cjm-icon-rotate-n90"></i>
          </cjm-button>
          <cjm-button type="primary" @click="saveData" v-if="activeName == stepBarNumber">
            <i class="cjm-icon-save"></i>保存</cjm-button>
        </div>
      </div>
    </div>
    <!--节点预览-->
    <cjm-dialog title="节点预览" :visible.sync="dialogVisible" :okHandler="confirm">
      <div class="preview-dialog">
        <trace-node-preview ref="nodePreviewComponent" :fieldConfig="nodeData.fieldConfig"></trace-node-preview>
      </div>
    </cjm-dialog>
    <!--从模板添加-->
    <cjm-dialog type="tab" :visible.sync="modelDialogVisible" v-if="editType == 0 || editType == 2 || editType == 4">
      <cjm-tabs v-model="activeModelName" @tab-click="handleModelClick">
        <cjm-tab-pane label="类目模板" name="cateModel">
          <category-model ref="cateModel" :templateType="0" :editType="editType" :nodeList="nodeList" :productInfo="productInfo"></category-model>
        </cjm-tab-pane>
        <cjm-tab-pane label="我的模板" name="myModel">
          <my-model ref="myModel" :editType="editType" :nodeList="nodeList" :productInfo="productInfo"></my-model>
        </cjm-tab-pane>
        <cjm-tab-pane label="GAP模板" name="gapModel">
          <category-model ref="gapModel" :editType="editType" :productInfo="productInfo" :nodeList="nodeList" :templateType="1"></category-model>
        </cjm-tab-pane>
        <cjm-tab-pane label="HACCP模板" name="haccpModel">
          <category-model ref="haccpModel" :editType="editType" :productInfo="productInfo" :nodeList="nodeList" :templateType="2"></category-model>
        </cjm-tab-pane>
      </cjm-tabs>
      <div slot='footer'>
        <cjm-button type="primary" @click="modelConfirm">
          <i class="cjm-icon-add"></i>添加勾选</cjm-button>
        <cjm-button type="default" @click="cancelModelDialog">
          <i class="cjm-icon-close"></i>取消</cjm-button>
      </div>
    </cjm-dialog>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
import nodeInfo from './components/traceNode-information.vue';
import nodeContent from './components/traceNode-content.vue';
//  import nodeContent from './components/traceNode-content-test.vue'
import bantchControl from './components/traceNode-control.vue';
import categoryModel from './components/traceNode-model-category.vue';
import myModel from './components/traceNode-model-mine.vue';
import traceNodeList from './components/traceNode-list.vue';
import traceNodePreview from './components/traceNode-preview.vue';
import util from './util';
import { on, off } from 'framework/utils/dom';

export default {
  components: {
    nodeInfo,
    nodeContent,
    bantchControl,
    categoryModel,
    myModel,
    traceNodeList,
    traceNodePreview
  },
  mixins: [pageSwitch],
  data() {
    let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
    return {
      traceApiUrl: traceApiUrl,
      productInfo: {},
      params: '',
      nodeID: '', //节点ID
      image: [], //存放节点预览中 图片组件的值-没什么实际的用处
      selectValue: '', //放在节点预览中 select 的值 - 没什么实际用处
      nodeList: [], //左侧获取的列表
      nodeListModel: {
        categoryID: '', //类目ID
        productID: '', //产品ID
        plotsID: '', //地块ID
        applyName: '', //没用的字段
        controlType: 0, //控制类型
        batchCreateType: '1', //选择场景
        inputTimes: '2', //可录入的次数
        isBatchCreate: '0', //是否开启控制批次
        nodeName: '', //节点名称
        nodeType: '1', //节点类型
        roleList: [], //角色权限名称列表
        showHidden: '1', //是否很H5下显示
        visibleControl: '1', //查看权限
        isBatchEdit: '0',
        isRequired: '1',
        templateType: '0',
        sortID: '',
        fieldConfig: [
          {
            fieldID: '0',
            fieldKey: '',
            applyName: '',
            applyType: '0',
            nodeID: '',
            fieldName: '操作时间',
            isRequired: 1,
            sortID: 1,
            showHidden: 0,
            type: 4,
            fieldExt: [
              {
                itemName: 'dataType',
                itemValue: '1'
              },
              {
                itemName: 'dataSource',
                itemValue: '2'
              },
              {
                itemName: 'dataFormat',
                itemValue: 'yyyy,MM,dd,HH,mm,ss'
              },
              {
                itemName: 'isSysDefine',
                itemValue: '1'
              }
            ]
          }
        ],
        configCreateSet: []
      }, //单个节点的节点模板
      nodeData: '', //单个节点的节点数据
      isAddNodeList: false, //判断是否是新增节点（区分编辑和新增）
      nodeModel: {
        configCommon: {
          fieldID: '0',
          fieldKey: '',
          applyName: '',
          applyType: '0',
          fieldName: '',
          isRequired: 0,
          showHidden: 1,
          type: '',
          fieldExt: ''
        },
        configDatetime: [
          {
            itemName: 'dataType',
            itemValue: '1'
          },
          {
            itemName: 'dataSource',
            itemValue: '1'
          },
          {
            itemName: 'dataFormat',
            itemValue: 'yyyy,MM,dd,HH,mm,ss'
          },
          {
            itemName: 'isSysDefine',
            itemValue: '0'
          }
        ],
        configText: [
          {
            itemName: 'defaultValue',
            itemValue: ''
          },
          {
            itemName: 'unitValue',
            itemValue: '无单位'
          },
          {
            itemName: 'valiateFormat',
            itemValue: ''
          },
          {
            itemName: 'maxSize',
            itemValue: ''
          },
          {
            itemName: 'minSize',
            itemValue: ''
          }
        ],
        configImage: [
          {
            itemName: 'requiredNumber',
            itemValue: '1'
          },
          {
            itemName: 'minNumber',
            itemValue: ''
          },
          {
            itemName: 'maxNumber',
            itemValue: ''
          },
          {
            itemName: 'isRemarkEnable',
            itemValue: '0'
          }
        ],
        configOption: [
          {
            itemName: 'dataType',
            itemValue: '1'
          },
          {
            itemName: 'dataValue',
            itemValue: ''
          }
        ]
      }, //节点内容的节点模板
      activeName: '1', //编辑页面 tab activeName
      activeModelName: '1', //从模板添加 tab activeName
      dialogVisible: false, //节点预览 dialogVisible
      modelDialogVisible: false, //从模板添加 dialogVisible
      modelTableType: 'cateModel', //cateModel 类目模板，myModel 我的模板，gapModel GAP模板，haccpModel HACCP模板
      isLongInput: false, //判断是否使用长的input
      copyNodeModel: '',
      traceNodeHeight: {},
      nodeContentHeight: {},
      scroll: {
        scrollObj: null,
        init: true
      },
      isModify: true,
      stepBarNumber: 3
    };
  },
  methods: {
    /*检索itemValue的方法*/
    dataModel(fieldExt, type) {
      return util.findItemValue(fieldExt, type);
    },
    /*复制节点*/
    copyObject(val) {
      this.copyNodeModel = val;
      this.activeName = '1';
      this.nodeData = this.nodeListModel;
      this.isAddNodeList = true;
      for (let key in this.nodeData) {
        this.nodeData[key] = this.copyNodeModel[key] ? this.copyNodeModel[key] : this.nodeData[key];
      }
      this.nodeData.nodeName = '';
      this.nodeData.unSaved = true; //标记未保存
      this.nodeList.push(this.nodeData);
      this.$nextTick(() => {
        this.$refs.scrollBar.scrollTo(false, 'bottom');
      });
    },
    /*编辑单个节内容*/
    showNodeDetail(item) {
      this.$refs.nodeListForDetail.setSelectedStatus(item);
      if ((!this.nodeData && !this.isAddNodeList) || this.isModify) {
        this.activeName = '1';
        this.nodeID = item.nodeID;
        if (!this.isAddNodeList) {
          if (this.nodeID) {
            /*编辑节点*/
            this.$ajax.get(this.traceApiUrl.traceNode.GET_CONFIG_SINGLE, { NodeID: this.nodeID }, { async: false }).then(res => {
              this.nodeData = res.data[0];
              this.nodeData.templateType = this.nodeData.templateType ? this.nodeData.templateType : 0;
            });
          }
        } else {
          /*添加节点*/
          this.nodeData = this.nodeListModel;
        }
      } else {
        this.$message('请先保存当前编辑的节点信息！');
      }
    },
    /*添加节点内容的4个元素*/
    addNode(type) {
      let commonObj = JSON.parse(JSON.stringify(this.nodeModel.configCommon));
      let addObj = Object.deepClone(commonObj);
      addObj.nodeID = this.nodeID;
      addObj.fieldExt = Object.deepClone(this.nodeModel[type]);
      addObj.sortID = this.nodeData.fieldConfig.length + 1;
      switch (type) {
        case 'configText':
          addObj.type = 1;
          break;
        case 'configImage':
          addObj.type = 2;
          break;
        case 'configOption':
          addObj.type = 3;
          break;
        case 'configDatetime':
          addObj.type = 4;
          break;
      }
      this.nodeData.fieldConfig.push(addObj);
      this.nodeData.fieldConfig = util.createSortID(this.nodeData.fieldConfig);
      this.$refs.nodeContent.scrollBottom();
    },
    /*添加节点按钮点击事件*/
    addNodeList() {
      if ((this.nodeData && !this.isModify) || this.isAddNodeList) {
        this.$message('请先保存当前编辑的节点信息！');
        return false;
      }
      this.resetNewNode();
      this.activeName = '1';
      this.isAddNodeList = true; //为true 是添加节点状态
      this.nodeData = Object.deepClone(this.nodeListModel); //复制 模板节点
      this.nodeData.sortID = util.createMaxID(this.nodeList, 'sortID') ? parseInt(util.createMaxID(this.nodeList, 'sortID').sortID) + 1 : 0; //添加排序值
      this.nodeData.unSaved = true; //标记未保存
      this.nodeList.push(this.nodeData); //push 进去
      //滚动条滚动到底部
      this.$nextTick(() => {
        this.$refs.scrollBar.scrollTo(false, 'bottom');
      });
    },
    /*下一步*/
    nextStep() {
      if (!this.nodeData.nodeName) {
        this.$message('节点名称不能为空，请填写完整！');
        this.activeName = '1';
        return false;
      }
      if (this.activeName < 3) {
        this.activeName = String(++this.activeName);
      } else {
        this.activeName = '3';
      }
    },
    /*取消编辑按钮*/
    cancelEdit() {
      this.nodeData = '';
      this.isModify = true;
      if (this.isAddNodeList) {
        this.nodeList.pop();
        this.isAddNodeList = false;
      }
    },
    /*验证提交的数据*/
    saveDataRules(data) {
      let rule = false;
      //验证节点名称
      if (!data.nodeName) {
        this.$message('节点名称不能为空，请填写完整！');
        this.activeName = '1';
        return rule;
      }
      //循环节点内容字段
      for (let i = 0; i < data.fieldConfig.length; i++) {
        data.fieldConfig[i].fieldKey = '';
        let type = data.fieldConfig[i].type;
        //验证节点内容中字段名称
        switch (type) {
          //字段内容验证
          case 1:
            if (data.fieldConfig[i].fieldName === '') {
              this.$message('字段节点内容名称不能为空，请填写完整！');
              this.activeName = '2';
              return rule;
            }
            //验证节点内容中位数限制
            let minSize = util.findItemValue(data.fieldConfig[i].fieldExt, 'minSize').itemValue;
            let maxSize = util.findItemValue(data.fieldConfig[i].fieldExt, 'maxSize').itemValue;
            if (parseInt(maxSize) < parseInt(minSize)) {
              this.$message('位数最大值不能小于最小值！');
              this.activeName = '2';
              return rule;
            }
            break;
          //图片内容验证
          case 2:
            if (data.fieldConfig[i].fieldName === '') {
              this.$message('图片节点内容名称不能为空，请填写完整！');
              this.activeName = '2';
              return rule;
            }
            //验证节点内容中图片数量
            let min = util.findItemValue(data.fieldConfig[i].fieldExt, 'minNumber').itemValue;
            let max = util.findItemValue(data.fieldConfig[i].fieldExt, 'maxNumber').itemValue;
            if (parseInt(max) < parseInt(min)) {
              this.$message('图片数量最大值不能小于最小值！');
              this.activeName = '2';
              return rule;
            }
            break;
          //单选内容验证
          case 3:
            if (data.fieldConfig[i].fieldName === '') {
              this.$message('单选节点内容名称不能为空，请填写完整！');
              this.activeName = '2';
              return rule;
            }
            //拼接手动设置的选项
            let target = util.findItemValue(data.fieldConfig[i].fieldExt, 'dataValue').itemValue.split('\n');
            for (let i = 0; i < target.length; i++) {
              if (target[i].length > 15) {
                this.$message('每个单选最多只能输入15个字');
                this.activeName = '2';
                return rule;
              }
            }
            util
              .findItemValue(data.fieldConfig[i].fieldExt, 'dataValue')
              .itemValue.split('\n')
              .join(',');
            break;
          //时间内容验证
          case 4:
            if (data.fieldConfig[i].fieldName === '') {
              this.$message('时间节点内容名称不能为空，请填写完整！');
              this.activeName = '2';
              return rule;
            }
            break;
        }
      }
      //验证批次控制中新建规则
      if (data.configCreateSet.length === 0 && data.isBatchCreate === '1') {
        this.$message('启用后至少要新建一条规则！');
        return rule;
      }
      //验证流水号必填
      if (data.configCreateSet.length > 0) {
        data.configCreateSet.forEach((value, index, array) => {
          value.tabLabel.forEach((val, i, arr) => {
            if (val.tabType === 3 && val.required === '0') {
              this.$message('流水号必填哦!');
              rule = true;
            }
          });
        });
      }
      return !rule;
    },
    //提交按钮
    saveData() {
      if (!this.saveDataRules(this.nodeData)) {
        return false;
      }
      if (!this.nodeData.controlType) {
        this.nodeData.controlType = 0;
      }
      if (!this.nodeData.visibleControl) {
        this.nodeData.visibleControl = '0';
      }
      if (!this.nodeData.batchCreateType) {
        this.nodeData.batchCreateType = '1';
      }
      //-----
      const nodeClone = Object.deepClone(this.nodeData);
      nodeClone.fieldConfig.forEach(citem => {
        let isOptionNode = false;
        citem.fieldExt.forEach(eitem => {
          if (eitem.itemName === 'dataType' && eitem.itemValue == 0) {
            isOptionNode = true;
          }
        });
        if (isOptionNode) {
          citem.fieldExt.forEach(eitem => {
            if (eitem.itemName === 'dataValue') {
              eitem.itemValue = eitem.itemValue.split('\n').join(',');
            }
          });
        }
      });
      //-----
      if (!this.nodeData.nodeID) {
        //添加节点 - 提交
        this.$ajax.post(this.traceApiUrl.traceNode.ADD_CONFIG, nodeClone).then(res => {
          if (res.resultCode === '200') {
            this.getEditNodeList();
            this.$message.success(res.msg); //提示信息
            this.nodeData = ''; //nodeData 数据清空
            this.isModify = true;
            this.isAddNodeList = false; //添加节点后切换回 false的状态
          } else {
            this.$message(res.msg);
            this.messageError(res.msg);
          }
        });
      } else {
        //编辑节点 - 提交
        this.$ajax.post(this.traceApiUrl.traceNode.SAVE_CONFIG, nodeClone).then(res => {
          if (res.resultCode === '200') {
            this.getEditNodeList();
            this.$message(res.msg); //提示信息
            this.nodeData = ''; //nodeData 数据清空
            this.isModify = true;
            this.isAddNodeList = false; //添加节点后切换回 false的状态
          } else {
            this.$message(res.msg);
            this.messageError(res.msg);
          }
        });
      }
    },
    //错误信息提示
    messageError(msg) {
      if (msg === '卡片名称不能重复') {
        this.activeName = '2';
        return false;
      }
    },
    //初始化nodeList
    getEditNodeList() {
      let url, params;
      switch (this.editType) {
        case 0:
          url = this.traceApiUrl.traceNode.GET_TRACENODE_CONFIG_LIST;
          params = { productID: this.productInfo.id };
          break;
        case 1:
          url = this.traceApiUrl.traceNode.GET_LIST_BY_CATE;
          params = { categoryID: this.productInfo.id, templateType: this.templateType };
          break;
        case 2:
          url = this.traceApiUrl.traceNode.GET_LIST_BY_PLOTS;
          params = { plotsID: this.productInfo.id, templateType: this.templateType };
          break;
        case 3:
          url = this.traceApiUrl.traceNode.GET_LIST_BY_BASE;
          params = { baseID: this.productInfo.id, templateType: this.templateType };
          break;
        case 4:
          url = this.traceApiUrl.traceNode.GET_LIST_BY_BASE;
          params = { baseAreaID: this.productInfo.id, templateType: this.templateType };
          break;
      }

      this.$ajax.post(url, params).then(res => {
        if (res.resultCode === '200') {
          this.nodeList = res.data.rows;
          //this.nodeList = util.createSortID(this.nodeList);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /*打开节点预览*/
    nodePreview() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.nodePreviewComponent.addForm();
      });
    },
    /*节点预览确认按钮*/
    confirm(callback) {
      callback();
      this.dialogVisible = false;
    },
    /*模板窗口tab切换*/
    handleModelClick(tab, event) {
      this.modelTableType = tab.name;
      switch (tab.name) {
        case 'cateModel':
          this.$nextTick(() => {
            this.$refs.cateModel.addForm();
          });
          break;
        case 'myModel':
          this.$nextTick(() => {
            this.$refs.myModel.addForm();
          });
          break;
        case 'gapModel':
          this.$nextTick(() => {
            this.$refs.gapModel.addForm();
          });
          break;
        case 'haccpModel':
          this.$nextTick(() => {
            this.$refs.haccpModel.addForm();
          });
          break;
      }
    },
    /*模板弹窗 添加勾选*/
    modelConfirm(callback) {
      this.$refs[this.modelTableType]
        .submit()
        .then(res => {
          this.$message(res.msg);
          this.getEditNodeList();
          this.modelDialogVisible = false;
        })
        .catch(res => {
          this.$message(res.msg);
        });
    },
    /*从模板添加 按钮*/
    addNodeFromModel() {
      if ((this.nodeData && !this.isModify) || this.isAddNodeList) {
        this.$message('请先保存当前编辑的节点信息！');
        return false;
      }
      this.activeModelName = 'cateModel';
      this.$nextTick(() => {
        this.$refs.cateModel.addForm();
        this.$refs.gapModel.addForm();
        this.$refs.haccpModel.addForm();
      });
      this.modelDialogVisible = true;
    },
    /*模板取消按钮*/
    cancelModelDialog() {
      this.modelDialogVisible = false;
    },
    /*切换编辑节点内容的tabs*/
    tabClickHandle(val) {
      this.activeName = val.name;
    },
    /*处理屏幕宽度*/
    handleResize() {
      let windowWidth = document.documentElement.clientWidth;
      if (windowWidth < 1220) {
        this.isLongInput = true;
      } else {
        this.isLongInput = false;
      }
    },
    /*处理屏幕高度*/
    handleHeight() {
      let windowHeight = document.documentElement.clientHeight;
      if (this.from === 'newBuild') {
        this.traceNodeHeight = {
          height: windowHeight - 322 + 'px'
        };
        if (this.editType == 0) {
          this.traceNodeHeight = {
            height: windowHeight - 297 + 'px'
          };
          this.nodeContentHeight = {
            height: windowHeight - 445 + 'px'
          };
        } else {
          this.traceNodeHeight = {
            height: windowHeight - 322 + 'px'
          };
          this.nodeContentHeight = {
            height: windowHeight - 520 + 'px'
          };
        }
      } else {
        this.traceNodeHeight = {
          height: windowHeight - 172 + 'px'
        };
        this.nodeContentHeight = {
          height: windowHeight - 320 + 'px'
        };
      }
      this.$refs.scrollBar.update();
    },
    /*数据重置*/
    changeModify(val) {
      this.isModify = val;
    },
    /*
       * 重置添加节点数据
       * (解决复制后改变了model中的值)
       * */
    resetNewNode() {
      this.nodeListModel = {
        categoryID: '', //类目ID
        productID: '', //产品ID
        plotsID: '', //地块ID
        baseID: '', //基地ID
        baseAreaID: '', //基地分区ID
        applyName: '', //没用的字段
        controlType: 0, //控制类型
        batchCreateType: '1', //选择场景
        inputTimes: '2', //可录入的次数
        isBatchCreate: '0', //是否开启控制批次
        nodeName: '', //节点名称
        nodeType: '1', //节点类型
        roleList: [], //角色权限名称列表
        showHidden: '1', //是否很H5下显示
        visibleControl: '1', //查看权限
        isBatchEdit: '0',
        isRequired: '1',
        templateType: '0',
        sortID: '',
        fieldConfig: [
          {
            fieldID: '0',
            fieldKey: '',
            applyName: '',
            applyType: '0',
            nodeID: '',
            fieldName: '操作时间',
            isRequired: 1,
            sortID: 1,
            showHidden: 0,
            type: 4,
            fieldExt: [
              {
                itemName: 'dataType',
                itemValue: '1'
              },
              {
                itemName: 'dataSource',
                itemValue: '2'
              },
              {
                itemName: 'dataFormat',
                itemValue: 'yyyy,MM,dd,HH,mm,ss'
              },
              {
                itemName: 'isSysDefine',
                itemValue: '1'
              }
            ]
          }
        ],
        configCreateSet: []
      };
      if (this.productInfo) {
        switch (this.editType) {
          case 0:
            this.nodeListModel.productID = this.productInfo.id;
            this.nodeListModel.applyType = '0';
            break;
          case 1:
            this.nodeListModel.categoryID = this.productInfo.id;
            this.nodeListModel.applyType = '1';
            break;
          case 2:
            this.nodeListModel.plotsID = this.productInfo.id;
            this.nodeListModel.applyType = '2';
            break;
          case 3:
            this.nodeListModel.baseID = this.productInfo.id;
            this.nodeListModel.applyType = '3';
            break;
          case 4:
            this.nodeListModel.baseAreaID = this.productInfo.id;
            this.nodeListModel.applyType = '4';
            break;
        }
      }
      this.nodeListModel.templateType = this.templateType;
      this.nodeListModel.sortID = this.nodeList.length + 1;
    }
  },
  /*
     * productInfo 中 产品入口进来的 放了 productID 和 productName
     *                类目入口进来的 放了 类目ID 和 名称
     *                地块进入同理 （目前没有地块入口）
     * editType 0: 产品 1: 类目 2: 地块
     * */
  props: ['productObj', 'editType', 'templateType', 'from'],
  created() {
    if (this.getPageParams('edit').id) {
      this.productInfo = this.getPageParams('edit');
    } else {
      this.productInfo = this.productObj;
    }
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    if (this.productInfo) {
      switch (this.editType) {
        case 0:
          this.nodeListModel.productID = this.productInfo.id;
          this.nodeListModel.applyType = '0';
          break;
        case 1:
          this.nodeListModel.categoryID = this.productInfo.id;
          this.nodeListModel.applyType = '1';
          break;
        case 2:
          this.nodeListModel.plotsID = this.productInfo.id;
          this.nodeListModel.applyType = '2';
          this.stepBarNumber = 2;
          break;
        case 3:
          this.nodeListModel.baseID = this.productInfo.id;
          this.nodeListModel.applyType = '3';
          this.stepBarNumber = 2;
          break;
        case 4:
          this.nodeListModel.baseAreaID = this.productInfo.id;
          this.nodeListModel.applyType = '4';
          this.stepBarNumber = 2;
          break;
      }
    }
    this.getEditNodeList();
    on(window, 'resize', this.handleResize);
    on(window, 'resize', this.handleHeight);
    this.$nextTick(() => {
      this.handleResize();
      this.handleHeight();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  destroyed() {
    off(window, 'resize', this.handleResize);
    off(window, 'resize', this.handleHeight);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.trace-node {
  height: 80%;
  /*min-width: 1200px;*/
}

.trace-node-add {
  background: #fff;
  height: 100%;
}

/*上下 padding 24 *2 + height 650 + 2px 边框  保证左边添加节点模块 高度700px*/
.trace-node-list {
  width: 28%;
  height: 100%;
  margin-right: 1.5%;
  float: left;
  padding: 1% 1% 3%;
  background: @DarkWhite;
  border: 1px solid #ededed;
  box-sizing: border-box;
}

.trace-node-list li {
  cursor: pointer;
}

.trace-node-detail {
  width: 66%;
  height: 100%;
  float: left;
  position: relative;
  overflow: hidden;
  padding-bottom: 4%;
  box-sizing: border-box;
}

.trace-node-detail .el-tabs {
  position: absolute;
  top: 0;
  left: 0;
  width: 99%;
  z-index: 1;
  height: 100%;
  box-sizing: border-box;
}

.trace-node-detail .el-tabs--border-card {
  background: #fff;
  border: 1px solid #ededed;
  box-shadow: none;
}

.tabs-content {
  overflow: hidden;
}

.title {
  color: @primaryColor;
  font-size: 16px;
  text-align: center;
}

.second-title {
  font-size: 14px;
  color: #323232;
  text-align: center;
  margin-top: 15px;
}

.node-list {
  margin: 15px 0;
  height: 300px;
  overflow: hidden;
  /*min-height: 300px;*/
}

.node-list p {
  text-align: center;
  font-size: 14px;
}

.node-list li {
  margin: 20px 0;
  border: 1px solid #c3c3c3;
  padding: 6px 0;
  background: #fff;
  font-size: 12px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.node-list li:after {
  content: '';
  display: block;
  clear: both;
}

.node-list-index {
  display: inline-block;
  width: 34px;
  border-right: 1px solid #e1e1e1;
  text-align: center;
}

.node-list-name {
  text-indent: 11px;
  display: inline-block;
}

.node-list-opreate {
  float: right;
  margin-right: 10px;
}

.node-list-opreate i {
  margin: 0 5px;
}

.trace-node-detail-btn {
  position: absolute;
  bottom: 14px;
  right: 23px;
  z-index: 1;
}

.prompt-img {
  position: absolute;
  top: -10%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 150px;
}

.prompt-img span {
  position: absolute;
  bottom: -30px;
  left: -70px;
  width: 240px;
  text-align: center;
  font-size: 14px;
}

.node-add-btn {
  position: absolute;
  bottom: 64px;
  left: 2%;
  z-index: 1;
  width: 94%;
  border: 1px solid #ededed;
  padding: 5px 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.node-add-btn ul li {
  float: left;
  width: 25%;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.node-add-btn ul li:after {
  content: '';
  display: block;
  width: 1px;
  height: 32px;
  background: #dedede;
  position: absolute;
  top: 20px;
  right: 0;
}

.node-add-btn ul li:last-child:after {
  width: 0;
}

.add-font-icon {
  color: #20a0ff;
  font-size: 40px;
}

.add-font-icon + span {
  color: #4b4b4b;
  font-size: 12px;
  font-weight: bold;
}

.add-node-btn {
  margin-bottom: 10px;
  float: left;
  width: 100%;
}

.add-node-btn.edit-node-btn {
  width: 46%;
}

.add-node-btn.edit-node-btn2 {
  width: 46%;
  float: right;
}

.add-node-btn .el-button--small {
  padding: 12px 5px;
}

.add-node-btn button {
  width: 100%;
}

.preview-dialog {
  height: 600px;
  overflow: hidden;
}
</style>
