<template>
  <div class="model clear">

    <div class="model-block cate">
      <cjm-scrollbar>
        <h4>一级类目</h4>
        <ul class="model-list">
          <li v-for="(item,index) in model.modelListData" :key="item.categoryID" :class="{'active':index == model.active}"
              @click="selectItem(item,index)">
            {{item.categoryName}}
          </li>
        </ul>
      </cjm-scrollbar>
    </div>

    <div class="model-block cate">
      <h4>二级级类目</h4>
      <ul class="model-list">
        <li v-for="(item,index) in model.secondListData"
            :key="item.categoryID"
            :class="{'active':index == model.secondActive&&model.secondActive !== ''}"
            @click="selectSecondItem(item,index)">
          {{item.categoryName}}
        </li>
      </ul>
    </div>
    <div class="node-title" v-if="model.nodeListData.length > 0">
      <cjm-checkbox v-model="model.selectAll" @change="checkAll">
        全选
      </cjm-checkbox>
      <span @click="checkAll">溯源节点</span>
      <span>可多选</span>
    </div>
    <div class="model-block node">
      <cjm-scrollbar>
        <cjm-checkbox-group v-model="model.checkNodes">
          <cjm-checkbox v-for="(opt,index) in model.nodeListData" :key="opt.feildKey" :label="opt.nodeID">
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
          categoryID: '',
          active: 0,
          secondActive: 0
        },
        checkNodesModel: []
      }
    },
    props: ['productInfo', 'templateType', 'nodeList', 'editType'],
    methods: {
      selectItem(item, index){
        this.model.secondListData = item.subItems;
        this.model.active = index;
        this.model.nodeListData = '';
        this.model.checkNodes = [];
        this.model.secondActive = '';
      },
      /*点击二级类目*/
      selectSecondItem(item, index){
        this.model.categoryID = item.categoryID;
        this.model.checkNodes = [];
        let params = {
          categoryID: item.categoryID,
          templateType: this.templateType
        };
        this.$ajax.get(this.traceApiUrl.traceNode.GET_LIST_BY_CATE, params).then((res) => {
          if (res.resultCode === '200') {
            this.model.nodeListData = res.data.rows;
            this.checkNodesModel = this.model.nodeListData.map((p, index) => {
              return p.nodeID;
            })
          }
        });
        this.model.secondActive = index;
      },
      /*添加勾选按钮*/
      submit(){
        let sortList = this.model.checkNodes.map((p, index) => {
          let maxSortID = util.createMaxID(this.nodeList, 'sortID') ? parseInt(util.createMaxID(this.nodeList, 'sortID').sortID) + index + 1 : 0 + index + 1;
          return maxSortID;
        });
        let targetArr = [];
        this.checkNodesModel.map((p, index) => {
          if (util.contains(this.model.checkNodes, p)) {
            targetArr.push(p)
          }
        })
        let submitData = {
          nodeList: targetArr,
          applyType: this.editType, //入口类型
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
      reset(){
        this.model.secondListData = [];
        this.model.nodeListData = [];
        this.model.checkNodes = [];
        this.model.selectAll = false;
        this.model.categoryID = '';
        this.model.active = 0;
        this.model.secondActive = 0;
        this.checkNodesModel = [];
      },
      addForm(){
        this.reset();
      },
      /*筛选二级目录中是否有节点*/
      hasNodeConfig(val){
        if (val.subItems.length > 0) {
          return val;
        }
      },
      /*获取类目列表方法*/
      getItemList(){
        let params = {
          templateType: this.templateType,
          hasTraceNodeConfig: 1
        };
        this.$ajax.get(this.traceApiUrl.traceNode.GET_CATE_LIST, params).then((res) => {
          if (res.resultCode === '200') {
            this.model.modelListData = res.data.rows.filter(this.hasNodeConfig);
          }
        });
      }
    },
    created(){
      this.reset();
    },
    mounted(){
      this.getItemList();
    },
    watch: {
      'model.checkNodes': function (newVal, oldVal) {
        if (newVal.length === this.model.nodeListData.length) {
          this.model.selectAll = true;
        } else {
          this.model.selectAll = false;
        }
        if (newVal.length === 0) {
          this.model.selectAll = false;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
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

  .cate {
    width: 25%;
  }

  .node {
    width: 40%;
    height: 90%;
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
