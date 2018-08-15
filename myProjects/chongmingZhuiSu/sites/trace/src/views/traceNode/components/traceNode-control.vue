<template>
  <div :style="traceNodeHeight" style="overflow: hidden;min-height: 557px">
    <cjm-scrollbar ref="scrollBar" viewStyle="width:99%">
      <cjm-form>
        <cjm-form-item label="批次控制" class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="nodeData.isBatchCreate" label="1">启用</cjm-radio>
          <cjm-radio class="radio" v-model="nodeData.isBatchCreate" label="0">禁用</cjm-radio>
        </cjm-form-item>
        <div v-if="nodeData.isBatchCreate == 1">

          <cjm-form-item label="控制类型" class="cjm-form-item-long">
            <cjm-radio @input="chooseControlType" v-model="controlType" key="controlType1" :label="0" title="产品批次入口采集溯源信息">产品批次入口采集溯源信息</cjm-radio>
            <br/>
            <cjm-radio @input="chooseControlType" v-model="controlType" key="controlType2" :label="1" title="产品入口采集溯源信息">产品入口采集溯源信息</cjm-radio>
          </cjm-form-item>

          <cjm-form-item label="选择场景" v-if="controlType===0" class="cjm-form-item-long">
            <cjm-radio @input="chooseScence" v-model="scence" key="scence1" :label="1" title="节点发生时，自动创建关联批次">节点发生时，自动创建关联批次</cjm-radio>
            <br/>
            <cjm-radio @input="chooseScence" v-model="scence" key="scence2" :label="2" title="节点发生时，自动创建关联批次并继承原批次的溯源信息，且不关联原批次">节点发生时，自动创建关联批次并继承原批次的溯源信息，且不关联原批次</cjm-radio>
          </cjm-form-item>
          <cjm-form-item label="选择场景" v-if="controlType===1" class="cjm-form-item-long">
            <cjm-radio @input="chooseScence" v-model="scence" key="scence3" :label="3" title="节点发生时，当前节点溯源信息保存至自动创建的关联批次上">节点发生时，当前节点溯源信息保存至自动创建的关联批次上</cjm-radio>
          </cjm-form-item>

          <span class="new-rule-titel">新建规则设置</span>
          <ul class="new-rule-list">
            <li class="clear" v-for="(item,index) in nodeData.configCreateSet">
              <div class="delete" @click="deleteRule(index)">
                <i class="cjm-icon-close"></i>
              </div>
              <cjm-form-item label="新建批次来源于" class="cjm-form-item-long">
                <cjm-radio v-model="item.dataSource" label="0">本次关联产品</cjm-radio>
                <br>
                <cjm-radio v-model="item.dataSource" label="1" v-if="scence==1">
                  <cjm-remote-select :disabled="item.dataSource == 0" :label="item.dataSource == 1 ? item.productName : productInfo.name" v-model="item.productID" :remote-url="productUrl" @select="selectHandler(arguments[0], item)"></cjm-remote-select>
                </cjm-radio>
              </cjm-form-item>
              <div class="cjm-rule-title">
                <span>批次命名规则:</span>
              </div>
              <cjm-form-item label="链接符">
                <cjm-select v-model="item.optionValue.linkString">
                  <cjm-option v-for="opt in linkStringArr" :key="opt.value" :label="opt.label" :value="opt.value"></cjm-option>
                </cjm-select>
              </cjm-form-item>
              <!--可用信息-->
              <choose-item :options="item.tabLabel" :item="item" @createOption="getOptions(arguments[0],index,item)"></choose-item>

              <cjm-form-item label="结果预览:" class="cjm-form-item-long">
                <div class="tab-label-block" :class="{'inline':tab.tabType == 1||tab.tabType ==4}" v-for="(tab,index) in computedSortID(item.tabLabel)" v-if="tab.required == '1'">
                  <span v-if="tab.tabType == 1">产品名称</span>
                  <cjm-select v-if="tab.tabType == 2" clearable v-model="item.optionValue.dateRuleType">
                    <cjm-option v-for="(opt,index) in newBuildDateFormat" :key="opt.value" :value="opt.value" :label="opt.label"></cjm-option>
                  </cjm-select>
                  <cjm-select v-if="tab.tabType == 3" clearable v-model="item.optionValue.numberRule">
                    <cjm-option v-for="(opt,index) in numberRuleFormat" :key="opt.value" :value="opt.value" :label="opt.label"></cjm-option>
                  </cjm-select>
                  <span v-if="tab.tabType == 4">节点名称</span>
                  <cjm-input v-if="tab.tabType == 5" v-model="tab.tabValue"></cjm-input>
                  <span class="linkString" v-if="index<computedSortID(item.tabLabel).length-1">{{item.optionValue.linkString}}</span>
                </div>
                <div class="tab-label-result">
                  如：{{tabLabelResultRender(item)}}
                </div>
              </cjm-form-item>
            </li>
          </ul>
          <div class="new-rule-add" v-if="isAllowAddNewRule">
            <span @click="addNewRules">+添加一条规则</span>
          </div>
        </div>
      </cjm-form>
    </cjm-scrollbar>
  </div>
</template>
<script>
import chooseItem from './choose-item.vue';
import util from '../util';
import { on, off } from 'framework/utils/dom';

export default {
  components: {
    chooseItem
  },
  data() {
    return {
      checked: true,
      controlType: 0,
      scence: 1,
      productID: '',
      productUrl: '/Ashx/AutoComplete.ashx?function=LookupProductEx',
      sortID: '',
      linkStringArr: [
        {
          value: '-',
          label: '_'
        },
        {
          value: '+',
          label: '+'
        },
        {
          value: '/',
          label: '/'
        },
        {
          value: '',
          label: '无连接符'
        }
      ],
      newBuildDateFormat: [
        {
          value: 'yyyy年MM月dd日',
          label: 'yyyy年MM月dd日'
        },
        {
          value: 'yyyyMMdd',
          label: 'YMD'
        },
        {
          value: 'yyyy/MM/dd',
          label: 'Y/M/D'
        },
        {
          value: 'yyyy.MM.dd',
          label: 'Y.M.D'
        }
      ],
      numberRuleFormat: [
        {
          value: '001',
          label: '3位流水号'
        },
        {
          value: '0001',
          label: '4位流水号'
        },
        {
          value: '00001',
          label: '5位流水号'
        }
      ],
      newRuleModel: {
        applyName: '',
        applyType: '',
        corpID: '',
        dataRule: '{PN}_{PD}_{SN}_{NN}',
        dataSource: '0', //
        fieldID: '0', //
        //          nodeID: '',
        optionType: '0',
        optionValue: {
          addDay: '0',
          dateRuleType: 'yyyy年MM月dd日',
          linkString: '_',
          numberRule: '001',
          productCode: null,
          productID: null
        },
        productCode: '', //
        productName: '', //
        productID: '',
        sortID: '',
        srcType: 'ConfigCreateSet',
        tabLabel: [
          {
            required: '1',
            sortID: 0,
            tabType: 1,
            tabValue: ''
          },
          {
            required: '1',
            sortID: 1,
            tabType: 2,
            tabValue: ''
          },
          {
            required: '1',
            sortID: 2,
            tabType: 3,
            tabValue: ''
          },
          {
            required: '1',
            sortID: 3,
            tabType: 4,
            tabValue: ''
          }
        ]
      },
      traceNodeHeight: {},
      dateType: '0',
      scroll: {
        scrollObj: null,
        init: true
      }
    };
  },
  props: ['nodeData', 'productInfo', 'from'],
  methods: {
    selectHandler(val, item) {
      if (val) {
        item.productName = val.name;
      }
    },
    radioValue(val, type) {
      if (type) {
        return val;
      }
      if (val == 0) {
        return ' ';
      } else {
        return String(val);
      }
    },
    getOptions(tabLabel, index, item) {
      item.tabLabel = tabLabel;
    },
    /*渲染结果预览*/
    tabLabelResultRender(item) {
      let str = '';
      let linkString = '';
      if (item.optionValue.linkString === '无连接符') {
        linkString = '';
      } else if (item.optionValue.linkString == undefined) {
        linkString = '';
      } else {
        linkString = item.optionValue.linkString;
      }
      let renderArr = this.computedSortID(item.tabLabel);
      for (let i = 0; i < renderArr.length; i++) {
        switch (renderArr[i].tabType) {
          case 1:
            if (item.dataSource == 0) {
              str += this.productInfo.name;
            } else {
              if (item.productName) {
                str += item.productName;
              } else {
                str += this.productInfo.name;
              }
            }
            break;
          case 4:
          case 5:
            str += renderArr[i].tabValue;
            break;
          case 2:
            str += util.createDateFormat(item);
            break;
          case 3:
            str += util.createSerialNumber(item);
            break;
        }
        if (i != renderArr.length - 1) {
          str += linkString;
        } else {
          str += '';
        }
      }
      return str;
    },
    /*添加一条新规则按钮点击*/
    addNewRules() {
      let nowDate = new Date(); //创建时间
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let day = nowDate.getDate();
      let newRule = Object.deepClone(this.newRuleModel);
      newRule.corpID = this.$globalData.get('currentUser').corpID;
      newRule.productID = this.productInfo.id;
      newRule.productName = this.productInfo.name;
      newRule.productCode = this.productInfo.productCode;
      newRule.sortID = this.nodeData.configCreateSet.length + 1;
      newRule.applyType = this.nodeData.applyType ? this.nodeData.applyType : '0';
      newRule.tabLabel[0].tabValue = this.productInfo.name;
      newRule.tabLabel[1].tabValue = year + '年' + month + '月' + day + '日';
      newRule.tabLabel[2].tabValue = '001';
      newRule.tabLabel[3].tabValue = this.nodeData.nodeName ? this.nodeData.nodeName : '';
      this.nodeData.configCreateSet.push(newRule);
      setTimeout(() => {
        this.$refs.scrollBar.scrollTo(false, 'bottom');
      }, 100);
    },
    /**/
    chooseScence() {
      this.nodeData.batchCreateType = this.scence;
      this.nodeData.controlType = this.controlType;
      if (this.scence == 3 && this.nodeData.configCreateSet.length > 1) {
        this.nodeData.configCreateSet = [this.nodeData.configCreateSet[0]];
      }
    },
    /**/
    chooseControlType() {
      this.$nextTick(() => {
        if (this.controlType === 0) {
          this.scence = 1;
        } else {
          this.scence = 3;
        }
        this.chooseScence();
      });
    },
    computedSortID(tabLabel) {
      return util.createSortID(tabLabel.filter(requiredElement));
    },
    /*删除规则*/
    deleteRule(index) {
      this.nodeData.configCreateSet.splice(index, 1);
    },
    /*处理屏幕高度*/
    handleHeight() {
      let windowHeight = document.documentElement.clientHeight;
      if (this.from === 'newBuild') {
        this.traceNodeHeight = {
          height: windowHeight - 440 + 'px'
        };
      } else {
        this.traceNodeHeight = {
          height: windowHeight - 340 + 'px'
        };
      }
      this.$nextTick(() => {
        this.$refs.scrollBar.update();
      });
    }
  },
  mounted() {
    //设置初始排序值
    this.sortID = this.nodeData.configCreateSet.length;
    this.scence = this.nodeData.batchCreateType * 1;
    this.controlType = this.nodeData.controlType * 1;
    if (this.scence === 3) {
      this.controlType = 1;
      if (this.nodeData.configCreateSet.length > 1) {
        this.nodeData.configCreateSet = [this.nodeData.configCreateSet[0]];
      }
    } else if (this.scence === 1 || this.scence === 2) {
      this.controlType = 0;
    }
    this.handleHeight();
    on(window, 'resize', this.handleHeight);
  },
  computed: {
    isAllowAddNewRule() {
      if (this.scence == 3 && this.nodeData.configCreateSet.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  destroyed() {
    off(window, 'resize', this.handleHeight);
  }
};
function requiredElement(isrequired) {
  return isrequired.required === '1';
}
</script>
<style lang="less" scoped>
.inline {
  width: 60px !important;
}

.new-rule-titel {
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  width: 98px;
  padding-right: 12px;
  text-align: right;
}

.new-rule-list li {
  border: 1px solid #ededed;
  border-radius: 5px;
  margin: 20px 0;
  padding: 10px;
  position: relative;
}

.delete {
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
  z-index: 1;
}

.cjm-rule-title > .el-form-item__label,
.cjm-rule-title > span {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tab-label-block {
  width: 170px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  position: relative;
  margin-right: 20px;
  margin-bottom: 10px;
}

.linkString {
  position: absolute;
  right: -15px;
  bottom: 0;
}

.new-rule-add {
  text-align: right;
}

.new-rule-add span {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

form.el-form.cjm-form {
  overflow-x: hidden !important;
}
</style>
