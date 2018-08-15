<template>
  <div>
    <div>
      <cjm-form ref="form" :model="form">
        <cjm-form-item label="选择模板" prop="templetID">
          <cjm-remote-select :value="form.templetID" :label="form.templetName" :disabled="pageCode == 'edit'" :remote-url="$globalData.get('trace', 'apiUrl').autoComplete.TRACE_TREE_TEMPLET" @select="templetSelectHandler"></cjm-remote-select>
        </cjm-form-item>
      </cjm-form>
      <svg id="traceTree_svg" class="traceTree-svg" :height="svgHeight">
        <defs>
          <!--关闭按钮-->
          <g id="traceTree_node_delete">
            <circle cx="0" cy="0" r="12" class="traceTree-node-delete-def" style="opacity: 1" />
            <line x1="-5" y1="-5" x2="5" y2="5" class="traceTree-node-delete-def-line"></line>
            <line x1="5" y1="-5" x2="-5" y2="5" class="traceTree-node-delete-def-line"></line>
          </g>
        </defs>
        <g id="traceTree_container">
          <!--连接线-->
          <polyline v-for="relation in relations" :points="getRelationPoints(relation)" class="traceTree-relation-line"></polyline>
          <!--批次节点-->
          <g v-for="node in nodes" class="traceTree-node" :transform="'translate('+node.x+','+node.y+')'" @mousedown.stop="draggingNode=node" @mouseup.stop="draggingNode=null">
            <rect :width="nodeWidth" :height="nodeHeight/2" class="traceTree-node-rect" />
            <rect :y="nodeHeight/2" :width="nodeWidth" :height="nodeHeight/2" class="traceTree-node-rect2" />
            <text x="0.8em" y="1.8em">{{getText(node.productName, 11)}}</text>
            <text x="0.8em" y="4.6em" style="fill:#666">{{getText(node.productBatchName, 11)}}</text>
            <!--删除按钮-->
            <use @click.stop="delNode(node)" @mousedown.prevent.stop="" :transform="'translate('+nodeWidth+',0)'" class="traceTree-node-delete" xlink:href="#traceTree_node_delete" v-show="!form.templetID">
            </use>
            <!--上方的添加按钮-->
            <g @click.stop="addNode(node, -1)" @mousedown.prevent.stop="" :transform="'translate('+nodeWidth/2+',-2)'" class="traceTree-node-add" v-show="!form.templetID">
              <circle cx="0" cy="0" r="10"></circle>
              <line x1="-6" y1="0" x2="6" y2="0"></line>
              <line x1="0" y1="-6" x2="0" y2="6"></line>
            </g>
            <!--下方的添加按钮-->
            <g @click.stop="addNode(node, 1)" @mousedown.prevent.stop="" :transform="'translate('+nodeWidth/2+','+(nodeHeight+2)+')'" class="traceTree-node-add" v-show="!form.templetID">
              <circle cx="0" cy="0" r="10"></circle>
              <line x1="-6" y1="0" x2="6" y2="0"></line>
              <line x1="0" y1="-6" x2="0" y2="6"></line>
            </g>
            <!--编辑按钮-->
            <g @click.stop="editProductBatch(node)" @mousedown.prevent.stop="" :transform="'translate('+(nodeWidth-28)+','+(nodeHeight/2+15)+')'" class="traceTree-node-edit">
              <rect width="18" height="14" y="-1"></rect>
              <line x1="0" y1="0" x2="18" y2="0"></line>
              <line x1="0" y1="6" x2="18" y2="6"></line>
              <line x1="0" y1="12" x2="18" y2="12"></line>
            </g>
          </g>
          <!--关系节点-->
          <g v-for="relationNode in relationNodes" :transform="'translate('+relationNode.x+','+relationNode.y+')'" class="traceTree-relation-node" @mousedown.stop="draggingRelationNode=relationNode" @mouseup.stop="draggingRelationNode=null">
            <rect :width="relationWidth" :height="relationHeight" rx="3" ry="3" />
            <text x="0.6em" y="1.8em">{{getText(relationNode.name, 5)}}</text>
            <!--编辑按钮-->
            <g :transform="'translate('+(relationWidth-28)+',15)'" class="traceTree-node-edit" @click.stop="editRelation(relationNode)" v-show="!form.templetID" @mousedown.prevent.stop="">
              <rect width="18" height="14" y="-1"></rect>
              <line x1="0" y1="0" x2="18" y2="0"></line>
              <line x1="0" y1="6" x2="18" y2="6"></line>
              <line x1="0" y1="12" x2="18" y2="12"></line>
            </g>
          </g>
        </g>
      </svg>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="popPage">
          <i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
        <cjm-button type="primary" @click="submit">
          <i class="cjm-icon-confirm"></i>确定</cjm-button>
      </div>
    </div>
    <!--更改产品批次弹框-->
    <cjm-dialog :visible.sync="productBatchDialogVisible" title="选择产品批次" :okHandler="productBatchDialogConfirm">
      <edit-productBatch ref="editProductBatch"></edit-productBatch>
    </cjm-dialog>
    <!--更改关系弹框-->
    <cjm-dialog :visible.sync="relationDialogVisible" title="设置关系" :okHandler="relationDialogConfirm">
      <edit-relation ref="editRelation"></edit-relation>
    </cjm-dialog>
    <!--添加节点弹框-->
    <cjm-dialog :visible.sync="addNodeDialogVisible" title="添加节点" :okHandler="addNodeDialogConfirm">
      <edit-node ref="editNode"></edit-node>
    </cjm-dialog>
  </div>
</template>

<script>
import EditNode from './edit-node-add.vue';
import EditProductBatch from './edit-productBatch-change.vue';
import EditRelation from './templet-edit-relation-change.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
import util from './util';
let d3 = require('d3');
export default {
  components: {
    EditNode,
    EditProductBatch,
    EditRelation
  },
  mixins: [pageSwitch],
  data() {
    return {
      form: {
        id: '',
        templetID: '',
        templetName: '',
        nodes: [],
        relations: []
      },
      productBatchDialogVisible: false,
      addNodeDialogVisible: false,
      relationDialogVisible: false,
      //正在编辑的产品节点
      editingNode: null,
      //正在编辑的关系节点
      editingRelation: null,
      //节点宽度
      nodeWidth: 220,
      //节点高度
      nodeHeight: 80,
      //关系节点宽度
      relationWidth: 120,
      //关系节点高度
      relationHeight: 38,
      //上下两层之间的间隔
      levelSpace: 140,
      //上级节点和关系之间的间隔
      nodeRelationSpace: 50,
      simulation: null,
      //节点
      nodes: [],
      //关系
      relations: [],
      //关系节点
      relationNodes: [],
      //正在拖动的节点
      draggingNode: null,
      //正在拖动的关系节点
      draggingRelationNode: null,
      //页面编码
      pageCode: ''
    };
  },
  computed: {
    svgHeight() {
      return window.innerHeight - 280;
    }
  },
  methods: {
    //模板更改
    templetSelectHandler(val) {
      if (val && val.id === this.form.templetID) {
        return;
      }
      let notEmptyNodes = this.nodes.find(node => {
        return node.productBatchID != '';
      });
      if (notEmptyNodes) {
        this.$confirm('此操作将重置正在编辑的溯源树, 是否继续?', '提示', { type: 'warning' })
          .then(() => {
            this.form.templetID = val ? val.id : '';
            this.form.templetName = val ? val.name : '';
            this.resetData().then(() => {
              this.reset();
            });
          })
          .catch(() => {});
      } else {
        this.form.templetID = val ? val.id : '';
        this.form.templetName = val ? val.name : '';
        this.resetData().then(() => {
          this.reset();
        });
      }
    },
    //得到长度最大为length的文本
    getText(text, length) {
      return util.getText(text, length);
    },
    //格式化节点关系
    setRelationNodes() {
      this.relationNodes = util.getRelationNodes(this.relations, this.relationNodes);
      this.relationNodes.forEach(relationNode => {
        relationNode.x =
          relationNode.x ||
          relationNode.parents.reduce((sum, item) => {
            return sum + item.x + this.nodeWidth / 2;
          }, 0) /
            relationNode.parents.length -
            this.relationWidth / 2;
        relationNode.y =
          (relationNode.level + 1) * this.nodeHeight +
          relationNode.level * this.levelSpace +
          this.nodeRelationSpace +
          100;
      });
    },
    //格式化节点
    setNodes() {
      //计算level
      util.computeNodeLevel(this.nodes, this.relations);
      this.nodes.forEach(node => {
        node.y = node.level * (this.nodeHeight + this.levelSpace) + 100;
      });
    },
    //得到关系连接线的坐标
    getRelationPoints(relation) {
      if (!this.relationNodes || this.relationNodes.length === 0) {
        return '';
      }
      let points = [];
      let centerX =
        this.relationNodes.find(item => {
          return (
            item.parents.includes(relation.source) &&
            item.children.includes(relation.target) &&
            item.name === relation.name
          );
        }).x +
        this.relationWidth / 2;
      points.push(
        `${relation.source.x + this.nodeWidth / 2},${relation.source.y + this.nodeHeight}`
      );
      points.push(`${centerX},${relation.source.y + this.nodeHeight + this.nodeRelationSpace}`);
      points.push(
        `${centerX},${relation.source.y +
          this.nodeHeight +
          this.nodeRelationSpace +
          this.relationHeight}`
      );
      points.push(`${relation.target.x + this.nodeWidth / 2},${relation.target.y}`);
      return points.join(' ');
    },
    //重置数据
    resetData() {
      if (this.form.templetID) {
        return this.$ajax
          .get(this.$globalData.get('trace', 'apiUrl').traceTree.GET_TEMPLET, {
            id: this.form.templetID
          })
          .then(r => {
            if (r.resultCode == 200) {
              r.data.nodes.forEach(node => {
                node.productBatchID = '';
                node.productBatchName = '';
              });
              this.nodes = r.data.nodes;
              this.relations = util.formatRelations(r.data.nodes, r.data.relations);
            } else {
              throw new Error(r.msg);
            }
          });
      } else {
        this.nodes = [
          {
            id: '1',
            productID: '',
            productName: '',
            productBatchID: '',
            productBatchName: '请选择批次',
            x: this.$el.clientWidth / 2 - this.nodeWidth / 2,
            y: 0
          }
        ];
        this.relations = [];
        return Promise.resolve();
      }
    },
    reset() {
      this.setNodes();
      this.setRelationNodes();
      this.$nextTick(() => {
        d3
          .select('#traceTree_svg')
          .selectAll('.traceTree-node')
          .call(d3.drag().on('drag', this.dragNode));
        d3
          .select('#traceTree_svg')
          .selectAll('.traceTree-relation-node')
          .call(d3.drag().on('drag', this.dragRelationNode));
      });
    },
    zoomed() {
      d3
        .select('#traceTree_container')
        .attr(
          'transform',
          `translate(${d3.event.transform.x},${d3.event.transform.y}) scale(${
            d3.event.transform.k
          })`
        );
    },
    //添加节点
    addNode(node, level) {
      if (!node.productBatchID) {
        this.$message.warning('请先选择产品批次');
        return;
      }
      this.addNodeDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editNode.addForm(node, level, this.form.templetID == '');
      });
    },
    //删除节点
    delNode(node) {
      //删除自身
      this.nodes.remove(node);
      //删除该节点的关系
      this.relations
        .filter(relation => {
          return relation.source === node || relation.target === node;
        })
        .forEach(relation => {
          this.relations.remove(relation);
        });
      //删除没有关系的节点
      this.nodes
        .filter(n => {
          let matchs = this.relations.find(relation => {
            return relation.source === n || relation.target === n;
          });
          return matchs == null;
        })
        .forEach(n => {
          this.nodes.remove(n);
        });
      if (this.nodes.length === 0) {
        this.nodes.push({
          id: '1',
          productID: '',
          productName: '',
          productBatchID: '',
          productBatchName: '请选择批次',
          x: this.$el.clientWidth / 2 - this.nodeWidth / 2,
          y: 0
        });
      }
      this.reset();
    },
    //编辑产品批次
    editProductBatch(node) {
      this.editingNode = node;
      this.productBatchDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editProductBatch.editForm(node, this.form.templetID == '');
      });
    },
    //编辑关系
    editRelation(relation) {
      this.editingRelation = relation;
      this.relationDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.editRelation.editForm(relation);
      });
    },
    //更改产品批次确认
    productBatchDialogConfirm(callback) {
      this.$refs.editProductBatch
        .submit()
        .then(data => {
          if (
            this.nodes.find(node => {
              return (
                node != this.editingNode &&
                node.productBatchID.toLowerCase() === data.productBatchID.toLowerCase()
              );
            })
          ) {
            this.$message.warning('同一个批次不允许重复添加');
            callback();
            return;
          }

          this.editingNode.productID = data.productID;
          this.editingNode.productName = data.productName;
          this.editingNode.productBatchID = data.productBatchID;
          this.editingNode.productBatchName = data.productBatchName;
          this.productBatchDialogVisible = false;
          callback();
        })
        .catch(() => {
          callback();
        });
    },
    //更改关联关系确认
    relationDialogConfirm(callback) {
      this.$refs.editRelation
        .submit()
        .then(data => {
          this.relations
            .filter(relation => {
              let matchParent = this.editingRelation.parents.find(item => {
                return item === relation.source;
              });
              let matchChild = this.editingRelation.children.find(item => {
                return item === relation.target;
              });
              return matchParent && matchChild;
            })
            .forEach(relation => {
              relation.name = data.relation;
            });
          this.editingRelation.name = data.relation;
          this.relationDialogVisible = false;
          callback();
        })
        .catch(() => {
          callback();
        });
    },
    //添加节点确认
    addNodeDialogConfirm(callback) {
      this.$refs.editNode
        .submit()
        .then(data => {
          //判断产品批次是否存在
          if (
            this.nodes.find(node => {
              return node.productBatchID.toLowerCase() === data.productBatchID.toLowerCase();
            })
          ) {
            this.$message.warning('同一个批次不允许重复添加');
            callback();
            return;
          }

          let newNode = this.nodes.find(node => {
            return (
              node.productBatchID.toLowerCase() === data.productBatchID.toLowerCase() &&
              node.level === data.node.level + data.level
            );
          });
          let isNew = false;
          if (!newNode) {
            let id =
              Math.max(
                ...this.nodes.map(node => {
                  return parseInt(node.id);
                })
              ) +
              1 +
              '';
            newNode = {
              id: id,
              productID: data.productID,
              productName: data.productName,
              productBatchID: data.productBatchID,
              productBatchName: data.productBatchName,
              x: data.node.x,
              y: 0
            };
            this.nodes.push(newNode);
            isNew = true;
          }
          if (data.level > 0) {
            //往下
            let sameNameRelationNode = this.relationNodes.find(relationNode => {
              return (
                relationNode.name === data.relation && relationNode.parents.includes(data.node)
              );
            });
            //如果添加了一个同名的关系节点
            if (sameNameRelationNode) {
              sameNameRelationNode.parents.forEach(node => {
                this.relations.push({
                  source: node,
                  target: newNode,
                  name: data.relation
                });
              });
              if (isNew) {
                newNode.x =
                  Math.max(
                    ...sameNameRelationNode.children.map(item => {
                      return item.x;
                    })
                  ) +
                  this.nodeWidth +
                  20;
              }
            } else {
              let sameLevelRelationNodeX = this.relationNodes
                .filter(relationNode => {
                  return relationNode.parents.includes(data.node);
                })
                .map(relationNode => {
                  return relationNode.x;
                });
              let x = 0;
              if (sameLevelRelationNodeX && sameLevelRelationNodeX.length > 0) {
                x = Math.max(...sameLevelRelationNodeX) + this.relationWidth + 20;
              }
              this.relations.push({
                source: data.node,
                target: newNode,
                name: data.relation,
                x: x
              });
              if (isNew) {
                let nodeLevelX = this.nodes
                  .filter(node => {
                    return node.level === data.node.level + data.level;
                  })
                  .map(node => {
                    return node.x;
                  });
                if (nodeLevelX && nodeLevelX.length > 0) {
                  newNode.x = Math.max(...nodeLevelX) + this.nodeWidth + 20;
                }
              }
            }
          } else {
            //往上
            let sameNameRelationNode = this.relationNodes.find(relationNode => {
              return (
                relationNode.name === data.relation && relationNode.children.includes(data.node)
              );
            });
            //如果添加了一个同名的关系节点
            if (sameNameRelationNode) {
              sameNameRelationNode.children.forEach(node => {
                this.relations.push({
                  source: newNode,
                  target: node,
                  name: data.relation
                });
              });
              if (isNew) {
                newNode.x =
                  Math.max(
                    ...sameNameRelationNode.parents.map(item => {
                      return item.x;
                    })
                  ) +
                  this.nodeWidth +
                  20;
              }
            } else {
              let sameLevelRelationNodeX = this.relationNodes
                .filter(relationNode => {
                  return relationNode.children.includes(data.node);
                })
                .map(relationNode => {
                  return relationNode.x;
                });
              let x = 0;
              if (sameLevelRelationNodeX && sameLevelRelationNodeX.length > 0) {
                x = Math.max(...sameLevelRelationNodeX) + this.relationWidth + 20;
              }
              this.relations.push({
                source: newNode,
                target: data.node,
                name: data.relation,
                x: x
              });
              if (isNew) {
                let nodeLevelX = this.nodes
                  .filter(node => {
                    return node.level === data.node.level + data.level;
                  })
                  .map(node => {
                    return node.x;
                  });
                if (nodeLevelX && nodeLevelX.length > 0) {
                  newNode.x = Math.max(...nodeLevelX) + this.nodeWidth + 20;
                }
              }
            }
          }
          this.reset();
          this.addNodeDialogVisible = false;
          callback();
        })
        .catch(() => {
          callback();
        });
    },
    //提交
    submit() {
      if (!this.relations || this.relations.length === 0) {
        this.$message.warning('请至少添加两个节点');
        return;
      }
      this.form.nodes = [];
      for (let node of this.nodes) {
        if (!node.productBatchID) {
          this.$message.warning('有节点未选择产品批次，请检查后再提交');
          return;
        }
        this.form.nodes.push({
          id: node.id,
          productBatchID: node.productBatchID,
          x: node.x.toFixed(2),
          y: node.y.toFixed(2)
        });
      }
      this.form.relations = [];
      for (let relation of this.relations) {
        let relationNode = this.relationNodes.find(r => {
          return (
            r.parents.includes(relation.source) &&
            r.children.includes(relation.target) &&
            r.name === relation.name
          );
        });
        this.form.relations.push({
          source: relation.source.id,
          target: relation.target.id,
          name: relation.name,
          x: relationNode.x.toFixed(2),
          y: relationNode.y.toFixed(2)
        });
      }
      this.$refs.form.validate(val => {
        if (!val) {
          return;
        }
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').traceTree.SAVE, this.form)
          .then(r => {
            if (r.resultCode == 200) {
              this.$emit('submitSuccess');
              this.$message.success('保存成功');
              this.popPage();
            } else {
              this.$message.error(r.msg);
            }
          });
      });
    },
    dragNode() {
      this.draggingNode.x = d3.event.x - this.nodeWidth / 2;
    },
    dragRelationNode() {
      this.draggingRelationNode.x = d3.event.x - this.relationWidth / 2;
    }
  },
  created() {
    let params = this.getPageParams('edit');
    if (params.id) {
      this.pageCode = 'edit';
      this.form.id = params.id;
    } else {
      this.pageCode = 'add';
    }
  },
  mounted() {
    d3.select('#traceTree_svg').call(
      d3
        .zoom()
        .scaleExtent([0.3, 1])
        .on('zoom', this.zoomed)
    );
    if (this.pageCode === 'add') {
      this.nodes.push({
        id: '1',
        productID: '',
        productName: '',
        productBatchID: '',
        productBatchName: '请选择批次',
        x: this.$el.clientWidth / 2 - this.nodeWidth / 2,
        y: 0
      });
      this.reset();
    } else {
      this.$ajax
        .get(this.$globalData.get('trace', 'apiUrl').traceTree.GET, { id: this.form.id })
        .then(r => {
          if (r.resultCode == 200) {
            this.nodes = r.data.nodes;
            this.relations = util.formatRelations(r.data.nodes, r.data.relations);
            this.form.templetID = r.data.templetID || '';
            this.form.templetName = r.data.templetName;
            this.form.id = r.data.id;
            this.reset();
          } else {
            this.$message.error(r.msg);
          }
        });
    }
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

@mainColor: #5ebbff;

.traceTree-svg {
  width: 100%;
  background: @DarkWhite;
  border: 1px solid @ExtraLightGray;
  font-size: 14px;
  margin-top: 20px;
}

.traceTree-node:hover {
  .traceTree-node-delete {
    opacity: 1;
  }
  .traceTree-node-add {
    line,
    circle {
      stroke: #5ebbff;
    }
  }
}

.traceTree-node {
  text {
    fill: #fff;
    cursor: default;
  }
}

.traceTree-node-rect {
  fill: @mainColor;
  stroke: @ExtraLightSilver;
  stroke-width: 1;
}

.traceTree-node-rect2 {
  fill: #fff;
  stroke: @ExtraLightSilver;
  stroke-width: 1;
}

.traceTree-node-delete-def {
  fill: #333;
}

.traceTree-node-delete-def-line {
  stroke: #fff;
  stroke-width: 2;
}

.traceTree-node-delete {
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.traceTree-node-add {
  circle {
    stroke: @ExtraLightSilver;
    stroke-width: 1;
    stroke-dasharray: 5, 3;
    fill: #fff;
  }
  line {
    stroke: @ExtraLightSilver;
    stroke-width: 2;
  }
  &,
  circle,
  line {
    cursor: pointer;
  }
}

.traceTree-node-edit {
  cursor: pointer;

  rect {
    fill: #fff;
  }
  line {
    stroke: @Silver;
    stroke-width: 2;
    stroke-dasharray: 2, 4, 100;
  }
}

.traceTree-relation-line {
  fill: none;
  stroke: @Silver;
  stroke-width: 1;
  stroke-dasharray: 4, 5;
}

.traceTree-relation-node {
  cursor: default;

  & > rect {
    stroke-width: 1;
    stroke: @Silver;
    stroke-dasharray: 5, 3;
    fill: #fff;
  }

  &:hover > rect {
    stroke: @mainColor;
  }
}
</style>
