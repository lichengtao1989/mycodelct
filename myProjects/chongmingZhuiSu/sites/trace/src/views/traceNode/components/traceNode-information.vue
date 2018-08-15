<template>
  <div style="overflow: hidden;min-height: 560px" :style="nodeInfoHeight">
    <cjm-scrollbar ref="scrollBar" viewStyle="width:99%">
      <cjm-form ref="form" :model="nodeData" :rules="rules">
        <cjm-form-item label="节点名称" class="cjm-form-item-long" prop="nodeName">
          <cjm-input v-model="nodeData.nodeName" :maxlength="8"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="节点类型" v-if="editType != 2 && editType != 4" class="cjm-form-item-long">
          <cjm-enum-select v-model="nodeData.nodeType" enum-namespace="trace" enum-name="溯源节点类型" :clearable="true"></cjm-enum-select>
        </cjm-form-item>
        <cjm-form-item label="录入限制" class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="nodeData.inputTimes" label="2">多次录入</cjm-radio>
          <cjm-radio class="radio" v-model="nodeData.inputTimes" label="1">单次录入</cjm-radio>
          <cjm-button type="text" class="explain-btn" @click="explainInputTimes">说明</cjm-button>
          <p v-if="nodeData.inputTimes == 1 && isExplainInputTimes" class="explain">{{inputTimesSinglePrompt}}</p>
          <p v-if="nodeData.inputTimes == 2 && isExplainInputTimes" class="explain">{{inputTimesTimesPrompt}}</p>
        </cjm-form-item>
        <cjm-form-item label="H5控制" class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="nodeData.showHidden" label="1">显示</cjm-radio>
          <cjm-radio class="radio" v-model="nodeData.showHidden" label="0">隐藏</cjm-radio>
          <cjm-button type="text" class="explain-btn" @click="explainShowHidden">说明</cjm-button>
          <p v-if="nodeData.showHidden == 1 && isExplainShowHidden" class="explain">{{showHiddenShowPrompt}}</p>
          <p v-if="nodeData.showHidden == 0 && isExplainShowHidden" class="explain">{{showHiddenHidePrompt}}</p>
        </cjm-form-item>
        <cjm-form-item label="修改权限" class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="nodeData.isRequired" label="1">允许所有人修改 </cjm-radio>
          <cjm-radio class="radio" v-model="nodeData.isRequired" label="0">只允许有权限的人修改</cjm-radio>
        </cjm-form-item>
        <cjm-form-item label="查看权限" class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="nodeData.visibleControl" label="1">允许所有人查看 </cjm-radio>
          <cjm-radio class="radio" v-model="nodeData.visibleControl" label="0">只允许有权限的人查看</cjm-radio>
        </cjm-form-item>
        <cjm-form-item label="选择用户权限" v-if="nodeData.visibleControl == 0">
          <cjm-select v-model="nodeData.roleList" multiple placeholder="请选择用户权限">
            <cjm-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></cjm-option>
          </cjm-select>
        </cjm-form-item>
      </cjm-form>
    </cjm-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
    return {
      traceApiUrl: traceApiUrl,
      rules: {
        nodeName: [this.$formRules.required, this.$formRules.maxLength(8)]
      },
      isExplainInputTimes: false,
      isExplainShowHidden: false,
      inputTimesSinglePrompt: '选择单次录入将使单个产品批次仅允许录入一次该节点信息。通常使用在“播种”、“屠宰”、“进口”等仅发生一次的节点上。',
      inputTimesTimesPrompt: '选择多次录入将使单个产品批次允许录入多次该节点信息。通常使用在“施肥”、“检测”、可发生多次的节点上。',
      showHiddenShowPrompt: '该节点的溯源信息将默认在H5中显示',
      showHiddenHidePrompt: '该节点的溯源信息将默认在H5中隐藏',
      userRules: [], //选择用户权限
      options: [], //配置用户权限的 角色列表
      scroll: {
        scrollObj: null,
        init: true
      },
      nodeInfoHeight: {}
    };
  },
  props: ['nodeData', 'editType', 'isAddNodeList', 'from'],
  methods: {
    explainInputTimes() {
      this.isExplainInputTimes = !this.isExplainInputTimes;
    },
    explainShowHidden() {
      this.isExplainShowHidden = !this.isExplainShowHidden;
    },
    handleHeight() {
      let windowHeight = document.documentElement.clientHeight;
      if (this.from == 'newBuild') {
        this.nodeInfoHeight = {
          height: windowHeight - 400 + 'px'
        };
      } else {
        this.nodeInfoHeight = {
          height: windowHeight - 300 + 'px'
        };
      }
      this.$nextTick(() => {
        this.$refs.scrollBar.update();
      });
    }
  },
  created() {
    window.addEventListener('resize', this.handleHeight);
  },
  mounted() {
    /*获取角色列表*/
    this.$ajax.get(this.traceApiUrl.traceNode.GET_USER_RULE_LIST).then(res => {
      if (res.resultCode === '200') {
        this.options = res.data.map(p => {
          return {
            value: p.id,
            label: p.name
          };
        });
      }
    });
    this.$nextTick(() => {
      this.handleHeight();
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.handleHeight);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../assets/css/config';

.explain-btn {
  position: absolute;
  right: 0;
}

.explain {
  font-size: 12px;
  color: @LightSilver;
}

form.el-form.cjm-form {
  overflow-x: hidden !important;
}
</style>
