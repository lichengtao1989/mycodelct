<template>
  <div>
    <div>
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="模板名称" prop="name" required>
          <cjm-input v-model="form.name" :disabled="isPrint"></cjm-input>
        </cjm-form-item>
      </cjm-form>
      <svg id="traceTree_svg" class="traceTree-svg" :height="svgHeight" :class="{'print':isPrint}">
        <defs>
          <!--箭头-->
          <marker id="traceTree_arrow"
                  viewBox="0 -5 10 10"
                  refX="10"
                  refY="0"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                  style="fill:#999;">
            <path d="M0,-5L10,0L0,5"></path>
          </marker>
          <!--关闭按钮-->
          <g id="traceTree_node_delete">
            <circle cx="0" cy="0" r="12" class="traceTree-node-delete-def" style="opacity: 1"/>
            <line x1="-5" y1="-5" x2="5" y2="5" class="traceTree-node-delete-def-line"></line>
            <line x1="5" y1="-5" x2="-5" y2="5" class="traceTree-node-delete-def-line"></line>
          </g>
        </defs>

        <g id="traceTree_container">
          <!--连接线-->
          <polyline v-for="relation in relations"
                    :points="getRelationPoints(relation)"
                    class="traceTree-relation-line"></polyline>
          <!--产品节点-->
          <g v-for="node in nodes"
             class="traceTree-node"
             :transform="'translate('+node.x+','+node.y+')'"
             @mousedown.stop="draggingNode=node"
             @mouseup.stop="draggingNode=null">
            <rect :width="nodeWidth"
                  :height="nodeHeight"
                  rx="3"
                  ry="3"
                  class="traceTree-node-rect"/>
            <text x="0.8em" y="1.8em">{{getText(node.productName, isPrint ? 14 : 11)}}</text>
            <!--删除按钮-->
            <use @click.stop="delNode(node)"
                 @mousedown.prevent.stop=""
                 :transform="'translate('+nodeWidth+',0)'"
                 class="traceTree-node-delete"
                 xlink:href="#traceTree_node_delete"
                 v-show="nodes.length>1">
            </use>
            <!--上方的添加按钮-->
            <g @click.stop="addNode(node, -1)"
               @mousedown.prevent.stop=""
               :transform="'translate('+nodeWidth/2+',-2)'"
               class="traceTree-node-add">
              <circle cx="0" cy="0" r="10"></circle>
              <line x1="-6" y1="0" x2="6" y2="0"></line>
              <line x1="0" y1="-6" x2="0" y2="6"></line>
            </g>
            <!--下方的添加按钮-->
            <g @click.stop="addNode(node, 1)"
               @mousedown.prevent.stop=""
               :transform="'translate('+nodeWidth/2+','+(nodeHeight+2)+')'"
               class="traceTree-node-add">
              <circle cx="0" cy="0" r="10"></circle>
              <line x1="-6" y1="0" x2="6" y2="0"></line>
              <line x1="0" y1="-6" x2="0" y2="6"></line>
            </g>
            <!--编辑按钮-->
            <g @click.stop="editProduct(node)"
               @mousedown.prevent.stop=""
               :transform="'translate('+(nodeWidth-28)+',15)'"
               class="traceTree-node-edit">
              <rect width="18" height="14" y="-1"></rect>
              <line x1="0" y1="0" x2="18" y2="0"></line>
              <line x1="0" y1="6" x2="18" y2="6"></line>
              <line x1="0" y1="12" x2="18" y2="12"></line>
            </g>
          </g>
          <!--关系节点-->
          <g v-for="relationNode in relationNodes"
             :transform="'translate('+relationNode.x+','+relationNode.y+')'"
             class="traceTree-relation-node"
             @mousedown.stop="draggingRelationNode=relationNode"
             @mouseup.stop="draggingRelationNode=null">
            <rect :width="relationWidth" :height="relationHeight" rx="3" ry="3"/>
            <text :x="getRelationNameX(relationNode.name)" y="1.8em">{{getText(relationNode.name, isPrint ? 20 : 5)}}</text>
            <!--编辑按钮-->
            <g :transform="'translate('+(relationWidth-28)+',15)'"
               class="traceTree-node-edit"
               @click.stop="editRelation(relationNode)"
               @mousedown.prevent.stop="">
              <rect width="18" height="14" y="-1"></rect>
              <line x1="0" y1="0" x2="18" y2="0"></line>
              <line x1="0" y1="6" x2="18" y2="6"></line>
              <line x1="0" y1="12" x2="18" y2="12"></line>
            </g>
          </g>
        </g>
      </svg>
      <p class="tips" v-if="isPrint">温馨提示：您可以通过拖动和鼠标滚轮缩放来调整打印的位置和大小</p>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="popPage"><i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
        <cjm-button type="primary" @click="submit" v-if="!isPrint"><i class="cjm-icon-confirm"></i>确定</cjm-button>
        <cjm-button type="primary" @click="print" v-if="isPrint"><i class="cjm-icon-print"></i>打印</cjm-button>
      </div>
    </div>
    <!--更改产品弹框-->
    <cjm-dialog :visible.sync="productDialogVisible" title="选择产品" :okHandler="productDialogConfirm">
      <templet-edit-product ref="templateEditProduct"></templet-edit-product>
    </cjm-dialog>
    <!--更改关系弹框-->
    <cjm-dialog :visible.sync="relationDialogVisible" title="设置关系" :okHandler="relationDialogConfirm">
      <templet-edit-relation ref="templateEditRelation"></templet-edit-relation>
    </cjm-dialog>
    <!--添加节点弹框-->
    <cjm-dialog :visible.sync="addNodeDialogVisible" title="添加节点" :okHandler="addNodeDialogConfirm">
      <templet-edit-node ref="templateEditNode"></templet-edit-node>
    </cjm-dialog>
  </div>
</template>

<script>
  import TempletEditProduct from './templet-edit-product-change.vue'
  import TempletEditNode from './templet-edit-node-add.vue'
  import TempletEditRelation from './templet-edit-relation-change.vue'
  import pageSwitch from 'framework/mixins/pageSwitch'
  import util from './util'
  let d3 = require('d3');
  export default{
    components: {
      TempletEditProduct,
      TempletEditNode,
      TempletEditRelation
    },
    mixins: [
      pageSwitch
    ],
    data(){
      return {
        form: {
          id: '',
          name: '',
          nodes: [],
          relations: []
        },
        rules: {
          name: [
            this.$formRules.required,
            this.$formRules.maxLength(20)
          ]
        },
        productDialogVisible: false,
        addNodeDialogVisible: false,
        relationDialogVisible: false,
        //正在编辑的产品节点
        editingNode: null,
        //正在编辑的关系节点
        editingRelation: null,
        //节点宽度
        nodeWidth: 220,
        //节点高度
        nodeHeight: 40,
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
        //拖动偏移量
        draggingFx: 0,
        //页面编码
        pageCode: '',
        //是否是打印
        isPrint: false
      }
    },
    computed: {
      svgHeight(){
        return window.innerHeight - (this.isPrint ? 320 : 280);
      }
    },
    methods: {
      print(){
        let printEl = document.getElementById('print');
        printEl.innerHTML = document.getElementById('traceTree_svg').outerHTML;
        window.print();
      },
      //得到长度最大为length的文本
      getText(text, length) {
        return util.getText(text, length);
      },
      //得到关系节点文字的X坐标
      getRelationNameX(text){
        let len = text.length;
        len = len > 5 ? 5 : len;
        return 0.6 + (5 - len) * 0.9 + 'em';
      },
      //格式化节点关系
      setRelationNodes(){
        this.relationNodes = util.getRelationNodes(this.relations, this.relationNodes);
        this.relationNodes.forEach(relationNode=> {
          relationNode.x = relationNode.x ||
            relationNode.parents.reduce((sum, item)=> {
              return sum + item.x + this.nodeWidth / 2;
            }, 0) / relationNode.parents.length - this.relationWidth / 2;
          relationNode.y = (relationNode.level + 1) * this.nodeHeight + relationNode.level * this.levelSpace + this.nodeRelationSpace + 100
        });
      },
      //格式化节点
      setNodes(){
        //计算level
        util.computeNodeLevel(this.nodes, this.relations);
        this.nodes.forEach((node)=> {
          node.y = node.level * (this.nodeHeight + this.levelSpace) + 100;
        });
      },
      //得到关系连接线的坐标
      getRelationPoints(relation){
        let points = [];
        let centerX = this.relationNodes.find((item)=> {
          return item.parents.includes(relation.source) && item.children.includes(relation.target) && item.name === relation.name;
        }).x + this.relationWidth / 2;
        points.push(`${relation.source.x + this.nodeWidth / 2},${relation.source.y + this.nodeHeight}`);
        points.push(`${centerX},${relation.source.y + this.nodeHeight + this.nodeRelationSpace}`);
        points.push(`${centerX},${relation.source.y + this.nodeHeight + this.nodeRelationSpace + this.relationHeight}`);
        points.push(`${relation.target.x + this.nodeWidth / 2},${relation.target.y}`);
        return points.join(' ');
      },
      reset(){
        this.setNodes();
        this.setRelationNodes();
        this.$nextTick(()=> {
          d3.select('#traceTree_svg').selectAll('.traceTree-node').call(d3.drag()
            .on('start', this.dragNodeStart)
            .on('drag', this.dragNode));
          d3.select('#traceTree_svg').selectAll('.traceTree-relation-node').call(d3.drag()
            .on('start', this.dragRelationNodeStart)
            .on('drag', this.dragRelationNode));
        });
      },
      zoomed(){
        d3.select('#traceTree_container').attr('transform',
          `translate(${d3.event.transform.x},${d3.event.transform.y}) scale(${d3.event.transform.k})`);
      },
      //添加节点
      addNode(node, level){
        if(!node.productID){
          this.$message.warning('请先选择产品');
          return;
        }
        this.addNodeDialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.templateEditNode.addForm(node, level);
        });
      },
      //删除节点
      delNode(node){
        //删除自身
        this.nodes.remove(node);
        //删除该节点的关系
        this.relations.filter((relation)=> {
          return relation.source === node || relation.target === node;
        }).forEach((relation)=> {
          this.relations.remove(relation);
        });
        //删除没有关系的节点
        this.nodes.filter((n)=> {
          let matchs = this.relations.find(relation=> {
            return relation.source === n || relation.target === n;
          });
          return matchs == null;
        }).forEach((n)=> {
          this.nodes.remove(n);
        });
        if(this.nodes.length === 0){
          this.nodes.push({
            id: '1',
            productID: '',
            productName: '请选择产品',
            x: this.$el.clientWidth / 2 - this.nodeWidth / 2,
            y: 0
          });
        }
        this.reset();
      },
      //编辑产品
      editProduct(node){
        this.editingNode = node;
        this.productDialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.templateEditProduct.editForm(node);
        });
      },
      //编辑关系
      editRelation(relation){
        this.editingRelation = relation;
        this.relationDialogVisible = true;
        this.$nextTick(()=> {
          this.$refs.templateEditRelation.editForm(relation);
        });
      },
      //更改产品确认
      productDialogConfirm(callback){
        this.$refs.templateEditProduct.submit().then((data)=> {
          this.editingNode.productID = data.productID;
          this.editingNode.productName = data.productName;
          this.productDialogVisible = false;
          callback();
        }).catch(()=> {
          callback();
        });
      },
      //更改关联关系确认
      relationDialogConfirm(callback){
        this.$refs.templateEditRelation.submit().then((data)=> {
          this.relations.filter(relation=> {
            let matchParent = this.editingRelation.parents.find(item=>{
              return item === relation.source;
            });
            let matchChild = this.editingRelation.children.find(item=>{
              return item === relation.target;
            });
            return matchParent && matchChild;
          }).forEach(relation=> {
            relation.name = data.relation;
          });
          this.editingRelation.name = data.relation;
          this.relationDialogVisible = false;
          callback();
        }).catch(()=> {
          callback();
        });
      },
      //添加节点确认
      addNodeDialogConfirm(callback){
        this.$refs.templateEditNode.submit().then((data)=> {
          let newNode;
          let isNew = false;
          if(data.type == 1){ //使用现有节点
            newNode = this.nodes.find(node=> {
              return node.productID.toLowerCase() === data.productID.toLowerCase() && node.level === data.node.level + data.level;
            });
          }
          if(!newNode){
            let id = Math.max(...this.nodes.map(node=>{
              return parseInt(node.id)
            })) + 1 + '';
            newNode = {
              id: id,
              productID: data.productID,
              productName: data.productName,
              x: data.node.x,
              y: 0
            };
            this.nodes.push(newNode);
            isNew = true;
          }
          if (data.level > 0) { //往下
            let sameNameRelationNode = this.relationNodes.find(relationNode => {
              return relationNode.name === data.relation && relationNode.parents.includes(data.node);
            });
            //如果添加了一个同名的关系节点
            if(sameNameRelationNode){
              sameNameRelationNode.parents.forEach(node => {
                this.relations.push({
                  source: node,
                  target: newNode,
                  name: data.relation
                });
              });
              if(isNew){
                newNode.x =
                  Math.max(...sameNameRelationNode.children.map(item=> {
                    return item.x;
                  })) + this.nodeWidth + 20;
              }
            } else {
              let sameLevelRelationNodeX =
                this.relationNodes.filter(relationNode=> {
                  return relationNode.parents.includes(data.node);
                }).map(relationNode=> {
                  return relationNode.x;
                });
              let x = 0;
              if(sameLevelRelationNodeX && sameLevelRelationNodeX.length > 0){
                x = Math.max(...sameLevelRelationNodeX) + this.relationWidth + 20;
              }
              this.relations.push({
                source: data.node,
                target: newNode,
                name: data.relation,
                x: x
              });
              if(isNew){
                let nodeLevelX = this.nodes.filter(node=> {
                  return node.level === data.node.level + data.level;
                }).map(node=> {
                  return node.x;
                });
                if(nodeLevelX && nodeLevelX.length > 0){
                  newNode.x = Math.max(...nodeLevelX) + this.nodeWidth + 20;
                }
              }
            }
          } else { //往上
            let sameNameRelationNode = this.relationNodes.find(relationNode => {
              return relationNode.name === data.relation && relationNode.children.includes(data.node);
            });
            //如果添加了一个同名的关系节点
            if(sameNameRelationNode){
              sameNameRelationNode.children.forEach(node => {
                this.relations.push({
                  source: newNode,
                  target: node,
                  name: data.relation
                });
              });
              if(isNew){
                newNode.x =
                  Math.max(...sameNameRelationNode.parents.map(item=> {
                    return item.x;
                  })) + this.nodeWidth + 20;
              }
            }else {
              let sameLevelRelationNodeX =
                this.relationNodes.filter(relationNode=> {
                  return relationNode.children.includes(data.node);
                }).map(relationNode=> {
                  return relationNode.x;
                });
              let x = 0;
              if(sameLevelRelationNodeX && sameLevelRelationNodeX.length > 0){
                x = Math.max(...sameLevelRelationNodeX) + this.relationWidth + 20;
              }
              this.relations.push({
                source: newNode,
                target: data.node,
                name: data.relation,
                x: x
              });
              if(isNew){
                let nodeLevelX = this.nodes.filter(node=> {
                  return node.level === data.node.level + data.level;
                }).map(node=> {
                  return node.x;
                });
                if(nodeLevelX && nodeLevelX.length > 0){
                  newNode.x = Math.max(...nodeLevelX) + this.nodeWidth + 20;
                }
              }
            }
          }
          this.reset();
          callback();
          this.addNodeDialogVisible = false;
        }).catch(()=> {
          callback();
        });
      },
      //提交
      submit(){
        if(!this.relations || this.relations.length === 0){
          this.$message.warning('请至少添加两个节点');
          return;
        }
        this.form.nodes = [];
        for(let node of this.nodes){
          if(!node.productID){
            this.$message.warning('有节点未选择产品，请检查后再提交');
            return;
          }
          this.form.nodes.push({
            id: node.id,
            productID: node.productID,
            x: node.x.toFixed(2),
            y: node.y.toFixed(2)
          })
        }
        this.form.relations = [];
        for(let relation of this.relations){
          let relationNode = this.relationNodes.find(r=> {
            return r.parents.includes(relation.source) && r.children.includes(relation.target) && r.name === relation.name;
          });
          this.form.relations.push({
            source: relation.source.id,
            target: relation.target.id,
            name: relation.name,
            x: relationNode.x.toFixed(2),
            y: relationNode.y.toFixed(2)
          })
        }
        this.$refs.form.validate((val)=> {
          if(!val) {
            return
          }
          this.$ajax.post(this.$globalData.get('trace', 'apiUrl').traceTree.SAVE_TEMPLET, this.form).then(r => {
            if(r.resultCode == 200) {
              this.$emit('submitSuccess');
              this.$message.success('保存成功');
              this.popPage();
            }else {
              this.$message.error(r.msg);
            }
          })
        })
      },
      dragNodeStart(){
        this.draggingFx = d3.event.x - this.draggingNode.x;
      },
      dragNode(){
        this.draggingNode.x = d3.event.x - this.draggingFx;
      },
      dragRelationNodeStart(){
        this.draggingFx = d3.event.x - this.draggingRelationNode.x;
      },
      dragRelationNode(){
        this.draggingRelationNode.x = d3.event.x - this.draggingFx;
      }
    },
    created(){
      let params = this.getPageParams('edit');
      if(params.id){
        this.pageCode = 'edit';
        this.form.id = params.id;
        this.isPrint = params.print;
      }else{
        this.pageCode = 'add';
      }
    },
    mounted(){
      d3.select('#traceTree_svg').call(d3.zoom().scaleExtent([0.3, 1]).on('zoom', this.zoomed));
      if(this.pageCode === 'add'){
        this.nodes.push({
          id: '1',
          productID: '',
          productName: '请选择产品',
          x: this.$el.clientWidth / 2 - this.nodeWidth / 2,
          y: 0
        });
        this.reset();
      } else {
        this.$ajax.get(this.$globalData.get('trace', 'apiUrl').traceTree.GET_TEMPLET, {id: this.form.id}).then(r=> {
          if(r.resultCode == 200){
            this.nodes = r.data.nodes;
            this.relations = util.formatRelations(r.data.nodes, r.data.relations);
            this.form.name = r.data.name;
            this.form.id = r.data.id;
            this.reset();
          }else {
            this.$message.error(r.msg);
          }
        });
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  @import "../../assets/css/config";
  @mainColor: #5ebbff;

  .tips{
    color: @Silver;
    font-size: 13px;
    margin: 10px;
  }

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
      line, circle {
        stroke: #5ebbff;
      }
    }
  }

  .traceTree-node{
    text{
      fill: #fff;
      cursor: default;
    }
  }

  .traceTree-node-rect {
    fill: @mainColor;
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
    &, circle, line {
      cursor: pointer;
    }
  }

  .traceTree-node-edit{
    cursor: pointer;

    rect{
      fill: @mainColor;
    }
    line{
      stroke: #fff;
      stroke-width: 2;
      stroke-dasharray: 2, 4, 100;
    }
  }

  .traceTree-relation-node .traceTree-node-edit{
    rect{
      fill: #fff;
    }
    line{
      stroke: @Silver;
    }
  }

  .traceTree-relation-line {
    fill: none;
    stroke: @Silver;
    stroke-width: 1;
    stroke-dasharray: 4, 5;
  }

  .traceTree-relation-node {

    & > rect {
      stroke: @Silver;
      stroke-dasharray: 5, 3;
      fill: #fff;
    }

    &:hover > rect {
      stroke: @mainColor;
    }
  }

  .print{
    .traceTree-node-add, .traceTree-node-edit, .traceTree-node-delete{
      display: none;
    }
    .traceTree-relation-node > rect{
      stroke-width: 0;
      fill: @DarkWhite;
    }
  }

  @media print {
    .print{
      .traceTree-svg{
        border: none;
        background: #fff;
      }
      .traceTree-node-rect{
        fill: #f3f3f3;
        stroke-width: 1;
        stroke: @Silver;
      }
      .traceTree-node text{
        fill: #333;
      }
      .traceTree-relation-node > rect{
        fill: #fff;
      }
    }
  }
</style>
