<template>
  <div>
    <div class="cjm-edit-page" v-show="currentPage==='list'">
      <div class="head-operate">
        <cjm-button @click="addOrEditCategory()" type="text" class="add-category">
          <i class="cjm-icon-add2"></i>添加类目
        </cjm-button>
      </div>
      <div class="fl category-list" :style="{height:treeHeight+'px'}">
        <cjm-scrollbar>
          <cjm-tree :data="categoryList" :props="defaultProps" node-key="id" default-expand-all :render-content="renderContent" :style="{border:'none'}" :class="{'active':categoryList.isActive}" @node-click="configTraceNode">
          </cjm-tree>
        </cjm-scrollbar>
      </div>
      <template>
        <cjm-tabs class="category-model-list" :style="{height:treeHeight+'px'}" type="border-card" id="modelListTab" value="0" v-show="this.productName!=''" @tab-click="handleClick">
          <cjm-tab-pane label="通用模板" name="0" style="overflow: hidden;" :style="{height:treeHeight-82+'px'}">
            <cjm-scrollbar>
              <div class="tracenode-list-title">
                <span>溯源节点</span>
                <p class="product-name">
                  <span>{{productName}}</span>
                </p>
              </div>
              <div class="tracenode-list-operate clear">
                <cjm-button @click="editTraceNode" type="primary" v-if="powerCode('ProductCategoryEdit')">
                  <i class="cjm-icon-edit"></i>编辑
                </cjm-button>
              </div>
              <div class="no-tracenode" v-show="noTraceNode">还没有设置溯源节点，点击编辑按钮开始配置。</div>
              <trace-node-list :remote-url="baseApiUrl.productCategory.GET_TRACE_NODE" :params="nodeParams" v-on:setNoData="setNoNodeData">
              </trace-node-list>
            </cjm-scrollbar>
          </cjm-tab-pane>
          <cjm-tab-pane label="GAP 模板" name="1" style="overflow: hidden;" :style="{height:treeHeight-82+'px'}">
            <cjm-scrollbar>
              <div class="tracenode-list-title">
                <span>溯源节点</span>
                <p class="product-name">
                  <span>{{productName}}</span>
                </p>
              </div>
              <div class="tracenode-list-operate clear">
                <cjm-button @click="editTraceNode" type="primary">
                  <i class="cjm-icon-edit"></i>编辑</cjm-button>
              </div>
              <div class="no-tracenode" v-show="noGapTraceNode">还没有设置溯源节点，点击编辑按钮开始配置。</div>
              <trace-node-list :remote-url="baseApiUrl.productCategory.GET_TRACE_NODE" :params="gapNodeParams" v-on:setNoData="setNoGNodeData">
              </trace-node-list>
            </cjm-scrollbar>
          </cjm-tab-pane>
          <cjm-tab-pane label="HACCP 模板" name="2" style="overflow: hidden;" :style="{height:treeHeight-82+'px'}">
            <cjm-scrollbar>
              <div class="tracenode-list-title">
                <span>溯源节点</span>
                <p class="product-name">
                  <span>{{productName}}</span>
                </p>
              </div>
              <div class="tracenode-list-operate clear">
                <cjm-button @click="editTraceNode" type="primary" power-code="ProductCategoryEdit">
                  <i class="cjm-icon-edit"></i>编辑</cjm-button>
              </div>
              <div class="no-tracenode" v-show="noHaccpTraceNode">还没有设置溯源节点，点击编辑按钮开始配置。</div>
              <trace-node-list :remote-url="baseApiUrl.productCategory.GET_TRACE_NODE" :params="haccpNodeParams" v-on:setNoData="setNoHNodeData">
              </trace-node-list>
            </cjm-scrollbar>
          </cjm-tab-pane>
        </cjm-tabs>
      </template>
      <!--添加类目弹窗-->
      <cjm-dialog :height="700" :ok-handler="addCategoryComfirm" :visible.sync="dialogVisible" title="添加类目">
        <product-category-add ref="editPage"></product-category-add>
      </cjm-dialog>
    </div>
    <!--编辑溯源节点页面-->
    <div class="cjm-edit-page" v-if="currentPage==='edit'">
      <trace-node-edit-add :edit-type="1" :template-type="tempType"></trace-node-edit-add>
    </div>
  </div>
</template>

<script>
import TraceNodeList from '../../../../trace/src/views/traceNode/components/traceNode-list.vue';
import ProductCategoryAdd from './product-category-add.vue';
import traceNodeEditAdd from '../../../../trace/src/views/traceNode/traceNode-edit-add.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
import { on, off } from 'framework/utils/dom';
import { Tree } from 'element-ui';
export default {
  mixins: [pageSwitch],
  components: {
    'cjm-tree': Tree,
    traceNodeEditAdd,
    TraceNodeList,
    ProductCategoryAdd
  },
  data() {
    let baseApiUrl = this.$globalData.get('base', 'apiUrl');
    //console.log(baseApiUrl);
    return {
      baseApiUrl: baseApiUrl,
      tempType: 0,
      noTraceNode: false,
      noGapTraceNode: false,
      noHaccpTraceNode: false,
      categoryInfo: {},
      productName: '', //产品名称
      nodeParams: {}, //获取溯源节点参数
      gapNodeParams: {},
      haccpNodeParams: {},
      sortDataObj: [], //用于保存类目排序的json对象
      categoryList: [], //类目列表
      defaultProps: {
        //类目树默认配置
        children: 'subItems',
        label: 'categoryName'
      },
      treeHeight: 200, //类目列表高度
      dialogVisible: false,
      currentPage: 'list'
    };
  },
  mounted() {
    //高度计算
    this.resize();
    on(window, 'resize', this.resize);
    //获取类目列表
    this.getCategory();
  },
  destroyed() {
    off(window, 'resize', this.resize);
  },
  methods: {
    hasPower(powerCode) {
      let powerCodes = this.$globalData.get('powerCodes');
      if (!powerCodes || powerCodes.length === 0) {
        return false;
      }
      return powerCodes.includes(powerCode.toLowerCase());
    },
    resize() {
      this.treeHeight = document.documentElement.clientHeight - 215;
    },
    handleClick(tab, event) {
      this.tempType = tab.name;
    },
    editTraceNode() {
      this.pushPage('edit', '溯源节点配置', this.categoryInfo);
    },
    setNoNodeData(type) {
      this.noTraceNode = true;
    },
    setNoGNodeData(type) {
      this.noGapTraceNode = true;
    },
    setNoHNodeData(type) {
      this.noHaccpTraceNode = true;
    },
    saveCategorySort() {
      var param = JSON.stringify(this.sortDataObj);
      this.$ajax
        .post(this.baseApiUrl.productCategory.SAVE_CATEGORY_SORT, { categorys: param })
        .then(res => {
          if (res.resultCode == '200') {
            this.$message(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
    },
    getCategory() {
      this.$ajax
        .get(this.baseApiUrl.productCategory.GET_LIST)
        .then(res => {
          if (res.resultCode == '200') {
            this.categoryList = res.data.rows;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
    },
    addOrEditCategory(data, parentId) {
      //打开弹窗并清空内容
      this.dialogVisible = true;
      //打开编辑类目弹窗
      if (data) {
        this.$nextTick(() => {
          data.systemCode = data.systemCode.split(','); //控件需要数组类型值
          this.$refs.editPage.reset(data);
        });
      } else {
        this.$nextTick(() => {
          //添加跟类目
          this.$refs.editPage.reset();
          if (parentId) {
            //添加子类目
            this.$refs.editPage.$data.form.parentID = parentId;
          }
        });
      }
    },
    addCategoryComfirm(callback) {
      this.$refs.editPage
        .submit()
        .then(res => {
          this.dialogVisible = false;
          this.$message('成功添加');
          this.getCategory();
          callback();
        })
        .catch(error => {
          callback();
          if (error) {
            this.$message.error(error.message);
          }
        });
    },
    getNodeIndex(node, parentID) {
      //获取当前节点的index
      var index = -1;
      if (parentID) {
        //二级类目
        for (var i = 0; i < this.categoryList.length; i++) {
          if (parentID === this.categoryList[i].categoryID) {
            for (let j = 0; j < this.categoryList[i].subItems.length; j++) {
              if (node.categoryID === this.categoryList[i].subItems[j].categoryID) {
                index = [i, j];
                break;
              }
            }
            break;
          }
        }
      } else {
        for (var n = 0; n < this.categoryList.length; n++) {
          if (node.categoryID === this.categoryList[n].categoryID) {
            index = n;
            break;
          }
        }
      }
      return index;
    },
    categorySortEvent(node, data, sort) {
      var self = this;
      var order = data.itemOrder;
      if (node.level == 1) {
        let index = self.getNodeIndex(data); //节点当前的顺序
        //排序时传递的参数
        self.sortDataObj = [
          {
            categoryID: data.categoryID,
            itemOrder: self.categoryList[index - 0 + sort].itemOrder
          },
          {
            categoryID: self.categoryList[index - 0 + sort].categoryID,
            itemOrder: order
          }
        ];
        //互换节点位置
        self.categoryList[index].itemOrder = self.categoryList[index - 0 + sort].itemOrder;
        self.categoryList[index - 0 + sort].itemOrder = order;
        self.categoryList.splice(index, 1);
        self.categoryList.splice(index - 0 + sort, 0, data);
      } else {
        let index = self.getNodeIndex(data, node.parent.data.categoryID);
        let relateNode = self.categoryList[index[0]].subItems[index[1] - 0 + sort];
        //排序时传递的参数
        self.sortDataObj = [
          {
            categoryID: data.categoryID,
            itemOrder: relateNode.itemOrder
          },
          {
            categoryID: relateNode.categoryID,
            itemOrder: order
          }
        ];
        let temp = {
          categoryID: data.categoryID,
          categoryName: data.categoryName,
          itemOrder: relateNode.itemOrder,
          subItems: []
        };
        //互换节点位置
        self.categoryList[index[0]].subItems[index[1]].itemOrder = relateNode.itemOrder;
        relateNode.itemOrder = order;
        self.categoryList[index[0]].subItems.splice(index[1] - 0, 1);
        self.categoryList[index[0]].subItems.splice(index[1] - 0 + sort, 0, temp);
      }
      self.saveCategorySort();
    },
    renderContent(createElement, { node, data, store }) {
      //类目操作按钮
      //        var selected = false;
      var self = this;
      var isRoot = node.level == 1;
      var isFirst = data.categoryID == self.categoryList[0].categoryID;
      var isLast = data.categoryID == self.categoryList[self.categoryList.length - 1].categoryID;
      if (node.level != 1) {
        let sub = node.parent.data.subItems;
        isFirst = data.categoryID == sub[0].categoryID;
        isLast = data.categoryID == sub[sub.length - 1].categoryID;
      }
      let createElementConfig = {
        ProductCategorySort: [
          createElement('i', {
            attrs: {
              class: 'cjm-icon-chevron-down cjm-icon-rotate-180 move-up',
              style: isFirst ? 'display:none;' : '',
              title: '上移'
            },
            on: {
              click: function(event) {
                event.cancelBubble = true;
                self.categorySortEvent(node, data, -1);
              }
            }
          }),
          createElement('i', {
            attrs: {
              class: 'cjm-icon-chevron-down',
              style: isLast ? 'display:none;' : '',
              title: '下移'
            },
            on: {
              click: function(event) {
                event.cancelBubble = true;
                self.categorySortEvent(node, data, 1);
              }
            }
          })
        ],
        ProductCategoryAdd: [
          createElement('i', {
            attrs: {
              class: isRoot ? 'cjm-icon-add' : '',
              title: isRoot ? '添加类目' : ''
            },
            on: {
              click: function(event) {
                event.cancelBubble = true;
                if (isRoot) {
                  self.addOrEditCategory(undefined, data.categoryID);
                }
              }
            }
          })
        ],
        ProductCategoryDelete: [
          createElement('i', {
            attrs: {
              class: 'cjm-icon-close',
              title: '删除'
            },
            on: {
              click: function(event) {
                event.cancelBubble = true;
                self
                  .$confirm('确定要删除该类目吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                  .then(() => {
                    self.$ajax
                      .post(self.baseApiUrl.productCategory.DELELE, { categoryID: data.categoryID })
                      .then(res => {
                        if (res.resultCode == '200') {
                          /*if(node.level == 1){
                       self.categoryList.splice((data.itemOrder - 1), 1);
                       }else{
                       let subIndex = node.parent.data.itemOrder - 1;
                       self.categoryList[subIndex].subItems.splice(data.itemOrder - 1, 1);
                       }*/
                          if (node.level == 1) {
                            let index = self.getNodeIndex(data); //节点当前的顺序
                            self.categoryList.splice(index, 1);
                          } else {
                            let index = self.getNodeIndex(data, node.parent.data.categoryID);
                            self.categoryList[index[0]].subItems.splice(index[1] - 0, 1);
                          }
                          self.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                        } else {
                          self.$message.error(res.msg);
                        }
                      })
                      .catch(error => {
                        if (error) {
                          self.$message.error(error);
                        }
                      });
                  })
                  .catch(() => {});
              }
            }
          })
        ]
      };
      let createElementArr = [
        createElement('i', {
          attrs: {
            class: 'cjm-icon-edit',
            title: '编辑'
          },
          on: {
            click: function(event) {
              event.cancelBubble = true;
              self.$ajax
                .get(self.baseApiUrl.productCategory.GET_CATEGORY_INFO, {
                  categoryId: data.categoryID
                })
                .then(res => {
                  if (res.resultCode == '200') {
                    self.addOrEditCategory(res.data);
                  } else {
                    self.$message(res.msg);
                  }
                })
                .catch(error => {
                  self.$message.error(error);
                });
            }
          }
        })
      ];
      for (let key in createElementConfig) {
        if (!this.hasPower(key)) {
          delete createElementConfig[key];
        }
      }
      for (let o in createElementConfig) {
        for (let i = 0; i < createElementConfig[o].length; i++) {
          createElementArr.push(createElementConfig[o][i]);
        }
      }
      return createElement('span', [
        createElement('span', node.label),
        createElement(
          'span',
          {
            attrs: {
              class: 'tree-operate'
            }
          },
          createElementArr
        )
      ]);
    },
    configTraceNode(data, node, nodeSelf) {
      let self = this;
      self.productName = data.categoryName;
      self.categoryInfo = { id: data.categoryID, name: data.categoryName };
      self.nodeParams = { categoryID: data.categoryID, templateType: 0 };
      self.gapNodeParams = { categoryID: data.categoryID, templateType: 1 };
      self.haccpNodeParams = { categoryID: data.categoryID, templateType: 2 };
      self.noHaccpTraceNode = false;
      self.noGapTraceNode = false;
      self.noTraceNode = false;
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    powerCode(code) {
      return this.hasPower(code);
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less'>
@import '../../assets/css/config';

.category-list {
  .el-tree-node__content {
    position: relative;
    height: 36px;

    .tree-operate {
      position: absolute;
      top: 10px;
      right: 10px;
      display: none;

      i {
        color: @primaryColor;
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }

  .el-tree-node__content:hover .tree-operate {
    display: inline-block !important;
  }
}

.category-list .is-current {
  background-color: @ExtraLightGray;
}
</style>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

* {
  font-size: 14px;
}

.no-tracenode {
  text-align: center;
  color: @LightBlack;
  margin-top: 88px;
}

.tracenode-list-title {
  font-weight: normal;
  text-align: center;

  & > span {
    color: @primaryColor;
    font-size: 16px;
  }

  .product-name {
    margin-top: 10px;
    color: @ExtraLightBlack;
  }
}

.tracenode-list-operate {
  margin-bottom: 10px;

  .el-button {
    float: right;
  }
}

.head-operate {
  margin-bottom: 10px;
}

.category-list {
  width: 340px;
  overflow: hidden;
  float: left;
  border: 1px @LightGray solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
}

.category-model-list {
  margin-left: 360px;
  min-width: 270px;
  overflow: hidden;
}

@media (max-width: 1100px) {
  .category-list {
    width: 250px;
  }

  .category-model-list {
    margin-left: 270px;
  }
}
</style>
