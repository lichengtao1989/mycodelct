<template>
  <div class="model clear">
    <div class="model-block product">
      <cjm-scrollbar>
        <h4>产品列表</h4>
        <ul class="model-list">
          <li v-for="(item,index) in model.modelListData"
              :class="{'active':index == model.active}"
              :key="item.id"
              @click="selectItem(item,index)">
            {{item.name}}
          </li>
        </ul>
      </cjm-scrollbar>
    </div>
    <div class="model-block node">
      <div class="node-title" v-if="model.nodeListData">
        <cjm-checkbox v-model="model.selectAll" @change="checkAll">
          全选
        </cjm-checkbox>
        <span @click="checkAll">溯源节点</span>
        <span>可多选</span>
      </div>
      <cjm-scrollbar class="choose-scrollbar">
        <cjm-checkbox-group v-model="model.checkNodes">
          <cjm-checkbox v-for="(opt,index) in model.nodeListData" :label="opt.nodeID" :key="opt.nodeID">
            <div class="item-node">
              <span class="item-node-index">{{index + 1}}</span>
              <span>{{opt.nodeName}}</span>
            </div>
          </cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-scrollbar>
    </div>
  </div>
</template>
<script>
  import util from '../util'
  export default{
    data(){
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        model: {
          modelListData: [],
          nodeListData: [],
          checkNodes: [],
          selectAll: false,
          active: 0
        }
      }
    },
    props: ['editType', 'productInfo', 'nodeList'],
    watch: {
      'model.checkNodes': {
        handler: function () {
          this.watchSelectAll();
        }, deep: true
      },
      'model.nodeListData': {
        handler: function () {
          this.watchSelectAll();
        }, deep: true
      }
    },
    methods: {
      submit(){
        let sortList = this.model.checkNodes.map((p, index) => {
          let maxSortID = util.createMaxID(this.nodeList, 'sortID') ? util.createMaxID(this.nodeList, 'sortID').sortID + index : 0 + index;
          return maxSortID;
        });
        let submitData = {
          nodeList: this.model.checkNodes,
          applyType: this.editType,
          applyID: this.productInfo.id,
          sortList: sortList
        };
        return new Promise((resolve, reject) => {
          if (submitData.nodeList.length === 0) {
            this.$message('未添加节点模板！');
            return false;
          }
          this.$ajax.post(this.traceApiUrl.traceNode.ADD_FROM_NODE_CONFIG, submitData).then((res) => {
            if (res.resultCode === '200') {
              resolve(res);
            } else {
              reject(res);
            }
          })
        })
      },
      selectItem(item, index){
        this.model.selectAll = false;
        this.$ajax.get(this.traceApiUrl.traceNode.GET_TRACENODE_CONFIG_LIST, {productID: item.id}).then((res) => {
          if (res.resultCode === '200') {
            this.model.nodeListData = res.data.rows;
          }
        });
        this.model.active = index;
      },
      watchSelectAll(){
        const nodeLength = this.model.nodeListData.length;
        const checkedLength = this.model.checkNodes.length;
        this.model.selectAll = nodeLength === checkedLength;
      },
      checkAll(event){
        this.$nextTick(() => {
          if (this.model.selectAll) {
            this.model.checkNodes = this.model.nodeListData.map((p) => {
              return p.nodeID;
            })
          } else {
            this.model.checkNodes = [];
          }
        });
      },
      addForm(){
        this.reset();
      },
      reset(){
        this.model.nodeListData = [];
        this.model.checkNodes = [];
        this.model.selectAll = false;
        this.model.active = 0;
      },
      getItemList(){
        this.$ajax.get(this.traceApiUrl.traceNode.TRACE_NODE_PRODUCT).then((res) => {
          this.model.modelListData = res.data;
        })
      }
    },
    mounted(){
      this.getItemList();
    }
  }
</script>
<style lang="less" scoped>
  .choose-scrollbar {
    height: 85%;
    height: ~'calc(100% - 43px)';
  }

  .model {
    height: 600px;
    overflow: hidden;
  }

  .model-block {
    float: left;
    height: 100%;
    overflow: hidden;
    margin-right: 10px;
  }

  .product {
    width: 30%;
  }

  .node {
    width: 60%;
  }

  .node .el-checkbox-group label {
    margin-left: 0;
    margin-bottom: 30px;
  }

  .model-block h4 {
    margin-bottom: 25px;
    font-size: 13px;
  }

  .model-list {
    padding-right: 15%;
    font-size: 14px;
    /*overflow: hidden;*/
  }

  .model-list li {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #dfdfdf;
    cursor: pointer;
  }

  .el-checkbox {
    width: 100%;
  }

  .item-node {
    display: inline-block;
    border: 1px solid #c3c3c3;
    width: 80%;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: 3px 10px;
  }

  .item-node-index {
    border-right: 1px solid #c3c3c3;
    padding-right: 10px;
  }

  .node-title {
    margin-bottom: 20px;
  }

  .node-title > label {
    display: inline;
    margin-right: 20px;
    color: #2e3b4a;
    font-weight: bold;
  }

  .node-title > span {
    margin-right: 20px;
    color: #2e3b4a;
    font-weight: bold;
  }

  .model-list .active {
    color: #3893e2;
  }
</style>
