<template>
  <div class="tracenode-list-style" :style="traceNodeHeight">
    <cjm-scrollbar viewStyle="width:99%" ref="scrollBar">
      <div class="tracenode-list-content">
        <cjm-form ref="form">
          <div v-for="(item,index) in nodeData.fieldConfig" :key="maxFieldID + 1 + index">
            <!--字段节点-->
            <div class="text-template" v-if="item.type == '1'">
              <template-text :item="item" :index="nodeData.fieldConfig.length"
                             @deleteEvent="deleteTemplate(index)"
                             :isLongInput="isLongInput"
                             @sortList="sortList"></template-text>
            </div>
            <!--图片节点-->
            <div class="image-template" v-if="item.type == '2'">
              <template-image :item="item" :index="nodeData.fieldConfig.length"
                              @deleteEvent="deleteTemplate(index)"
                              :isLongInput="isLongInput"
                              @sortList="sortList"></template-image>
            </div>
            <!--单选节点-->
            <div class="option-template" v-if="item.type == '3'">
              <template-option :item="item" :index="nodeData.fieldConfig.length"
                               @deleteEvent="deleteTemplate(index)"
                               :isLongInput="isLongInput"
                               @sortList="sortList"></template-option>
            </div>
            <!--时间节点-->
            <div class="dateTime-template" v-if="item.type == '4'">
              <template-date-time :item="item" :index="nodeData.fieldConfig.length"
                                  @deleteEvent="deleteTemplate(index)"
                                  :isLongInput="isLongInput"
                                  :isAddNodeList="isAddNodeList"
                                  @sortList="sortList"></template-date-time>
            </div>
          </div>
        </cjm-form>
      </div>
    </cjm-scrollbar>
  </div>
</template>
<script>
  import templateImage from './traceNode-template-image.vue';
  import templateText from './traceNode-template-text.vue';
  import templateOption from './traceNode-template-option.vue';
  import templateDateTime from './traceNode-template-datetime.vue';
  import util from '../util';
  import {on, off} from 'framework/utils/dom';

  export default{
    components: {
      templateImage,
      templateText,
      templateOption,
      templateDateTime
    },
    data(){
      return {
        templateState: [],
        maxFieldID: 0,
        traceNodeHeight: {},
        startEdit: false,
        scroll: {
          scrollObj: null,
          init: true
        }
      }
    },
    props: ['nodeData', 'isLongInput', 'isAddNodeList', 'from', 'isModify'],
    methods: {
      deleteTemplate(index){
        this.nodeData.fieldConfig.splice(index, 1);
        this.nodeData.fieldConfig = util.createSortID(this.nodeData.fieldConfig);
      },
      sortList(){
        this.nodeData.fieldConfig = util.createSortID(this.nodeData.fieldConfig);
      },
      /*处理屏幕高度*/
      handleHeight(){
        let windowHeight = document.documentElement.clientHeight;
        if (this.from === 'newBuild') {
          this.traceNodeHeight = {
            height: windowHeight - 522 + 'px'
          }
        } else {
          this.traceNodeHeight = {
            height: windowHeight - 422 + 'px'
          }
        }
        this.$nextTick(() => {
          this.$refs.scrollBar.update();
        });
      },
      scrollBottom(){
        setTimeout(() => {
          //this.scroll.scrollObj.scrollTo(true, 'bottom');
          this.$refs.scrollBar.scrollTo(false, 'bottom');
        }, 100)
      }
    },
    computed: {
      nodeDataJson(){
        return JSON.stringify(this.nodeData);
      }
    },
    mounted(){
      this.nodeData.fieldConfig = util.createSortID(this.nodeData.fieldConfig);
      this.maxFieldID = util.createMaxID(this.nodeData.fieldConfig, 'fieldID');
      this.handleHeight();
      on(window, 'resize', this.handleHeight);
      this.$nextTick(() => {
        this.startEdit = true;
      });
    },
    watch: {
      nodeDataJson(newVal, oldVal){
        if (this.isAddNodeList) {
          this.$emit('changeModify', false);
          return false;
        }
        if (!this.startEdit) {
          this.startEdit = false;
          return false;
        }
        let newValueId = JSON.parse(newVal).nodeID;
        let oldValueId = JSON.parse(oldVal).nodeID;
        if (newValueId === oldValueId && newValueId != undefined && oldValueId != undefined) {
          if (newVal != oldVal) {
            this.$emit('changeModify', false);
          }
        }
      }
    },
    destroyed () {
      off(window, 'resize', this.handleHeight);
    }
  }
</script>
<style lang="less" scoped>
  .tracenode-list-style {
    overflow: hidden;
    min-height: 435px;
  }
</style>
<style lang="less">
  .tracenode-list-style .tracenode-list-content {
    .el-input__inner {
      padding: 0 5px;
    }
  }
</style>
