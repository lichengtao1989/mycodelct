<template>
  <div class="choose-block">
    <div class="search-input">
      <cjm-input @input="searchKeywords" :value="search.keyWords" :placeholder="search.searchPlaceholder"></cjm-input>
      <cjm-input v-model="choosed.keyWords"
                 :placeholder="choosed.choosedPlaceholder" style="float: right"></cjm-input>
    </div>
    <div class="search-content clear">
      <div class="search-block">
        <ul class="search-list" @click="searchClick($event)">
          <cjm-scrollbar ref="scroll-search">
            <li v-for="(item,index) in search.list" v-if="item.searchShow">
              <i class="cjm-icon-chevron-down span-down"
                 v-if="fromType === 'product' && item.batchCount > 0"
                 :style="item.status ? up : down"
                 :data-index="index"></i>
              <span class="parent-item"
                    :data-index="index"
                    :style="fromType === 'product' && item.batchCount > 0 ? right : left">
              {{fromType == 'product' ? item.productName : item.orgName}}  <span class="code"
                                                                                 :data-index="index">({{fromType == 'product' ? item.productCode : item.orgCode}})</span>
            </span>
              <el-collapse-transition>
                <ul class="search-second-list"
                    v-show="item.status"
                    :data-productID="item.productID"
                    :data-productName="item.productName">
                  <li class="batch"
                      :data-index="index"
                      :data-batch-index="i"
                      v-for="(val,i) in item.batchList">
                    {{val.productBatchCode}}
                  </li>
                </ul>
              </el-collapse-transition>
            </li>
          </cjm-scrollbar>
        </ul>
        <div class="select-all-btn">
          <cjm-button type="text" @click="selectAll">全选</cjm-button>
        </div>
      </div>
      <div class="choosed-block">
        <ul class="choosed-list" @click="choosedClick($event)">
          <cjm-scrollbar ref="scroll-choosed">
            <li v-for="(item,index) in choosedSearchData">
              <i class="cjm-icon-chevron-down span-down"
                 v-if="fromType === 'product' && item.batchCount > 0"
                 :style="item.status ? up : down"
                 :data-index="index"></i>
              <span class="parent-item"
                    :data-index="index"
                    :data-id="fromType === 'org' ? item.orgID : item.productID"
                    :style="fromType === 'product' && item.batchCount > 0 ? right : left">
              {{fromType == 'product' ? item.productName : item.orgName}} <span class="code"
                                                                                :data-id="fromType === 'org' ? item.orgID : item.productID"
                                                                                :data-index="index">({{fromType == 'product' ? item.productCode : item.orgCode}})</span>
            </span>
              <el-collapse-transition>
                <ul class="search-second-list"
                    v-show="item.status"
                    :data-productID="item.productID"
                    :data-productName="item.productName">
                  <li class="batch"
                      :data-index="index"
                      :data-batch-index="i"
                      v-for="(val,i) in item.batchList">
                    {{val.productBatchCode}}
                  </li>
                </ul>
              </el-collapse-transition>
            </li>
          </cjm-scrollbar>
        </ul>
        <div class="remove-all-btn">
          <cjm-button type="text" @click="removeAll">清空</cjm-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import util from '../util';
  export default{
    components: {
      'el-collapse-transition': CollapseTransition
    },
    data(){
      return {
        search: {
          keyWords: '',
          list: [],
          searchPlaceholder: ''
        },
        choosed: {
          keyWords: '',
          list: [],
          choosedPlaceholder: ''
        },
        fromType: '',
        up: {
          'transform': 'rotate(0deg)'
        },
        down: {
          'transform': 'rotate(-90deg)'
        },
        left: {
          'margin-left': '18px'
        },
        right: {
          'margin-left': '0px'
        },
        batchIds: '',
        activityOrgArr: [],
        activityProduct: [],
        choosedListDataInit: false
      }
    },
    props: {
      searchUrl: { //获取列表数据
        type: String,
        required: true
      },
      hasSecondClass: { //是否有第二层级
        type: Boolean
      },
      formData: {
        type: Object
      },
      chooseType: {
        type: String
      },
      editData: {
        type: Array
      },
      activityID: {//活动ID
        type: String
      }
    },
    computed: {
      choosedSearchData(){
        let arr = [];
        this.choosed.list.forEach((val, index) => {
          if (this.fromType === 'org') {
            if (val.orgName && val.orgName.indexOf(this.choosed.keyWords) !== -1) {
              arr.push(val)
            }
          } else if (this.fromType === 'product') {
            if (val.productName && val.productName.indexOf(this.choosed.keyWords) !== -1) {
              arr.push(val)
            }
          }
        })
        return arr;
      }
    },
    methods: {
      //点击搜索框事件
      searchClick(event){
        let className = event.target.className; //获取点击当前元素的 class
        let index = event.target.getAttribute('data-index'); //获取 产品/机构的 index
        let batchIndex = event.target.getAttribute('data-batch-index'); // 获取批次 index
        if (className === 'parent-item' || className === 'code') {
          this.search.list[index].searchShow = false;
          this.renderChoosedList(this.search.list[index], 'parent', index);
        }
        if (className.indexOf('cjm-icon-chevron-down') !== -1) { //点击箭头的事件
          this.searchArrowEvent(index, 'search');
        }
        if (className === 'batch') {
          let product = Object.deepClone(this.search.list[index]);
          product.batchList = [];
          product.productBatchID = [];
          product.batchList.push(this.search.list[index].batchList[batchIndex]);
          product.productBatchID.push(this.search.list[index].productBatchID[batchIndex]);
          if (this.search.list[index].batchList.length === 1) {
            this.search.list[index].searchShow = false;
            this.search.list[index].batchList = [];
            this.search.list[index].productBatchID = [];
          } else {
            this.search.list[index].batchList.splice(batchIndex, 1);
            this.search.list[index].productBatchID.splice(batchIndex, 1);
          }
          this.renderChoosedList(product);
        }
      },
      //点击选中框事件
      choosedClick(event){
        let className = event.target.className; //获取点击当前元素的 class
        let index = event.target.getAttribute('data-index'); //获取 产品/机构的 index
        let id = event.target.getAttribute('data-id'); //获取id
        let batchIndex = event.target.getAttribute('data-batch-index'); // 获取批次 index
        if (className === 'parent-item' || className === 'code') {
          let choosedIndex;
          if (this.fromType === 'org') {
            choosedIndex = util.loopObject({orgID: id}, this.choosed.list, 'orgID');
          } else {
            choosedIndex = util.loopObject({productID: id}, this.choosed.list, 'productID');
          }
          this.renderSearchList(choosedIndex, 'parent');
        }
        if (className.indexOf('cjm-icon-chevron-down') !== -1) { //点击箭头的事件
          this.searchArrowEvent(index, 'choosed');
        }
        if (className === 'batch') {
          let searchIndex = util.loopObject(this.choosed.list[index], this.search.list, 'productID');
          let productBatchID = this.choosed.list[index].productBatchID[batchIndex];
          let productBatchCode = this.choosed.list[index].batchList[batchIndex].productBatchCode;
          if (this.choosed.list[index].batchList.length === 1) { //当前批次为最后一个批次
            this.choosed.list.splice(index, 1); //为最后一个批次的时候删除该批次对应的产品
          } else {
            this.choosed.list[index].batchList.splice(batchIndex, 1);
            if (this.choosed.list[index].productBatchID === '') {
              this.choosed.list[index].productBatchID = this.choosed.list[index].batchList.map((p, i) => {
                return p.productBatchID;
              })
            } else {
              this.choosed.list[index].productBatchID.splice(batchIndex, 1);
            }
          }
          if (this.search.list[searchIndex].batchList) {
            this.search.list[searchIndex].searchShow = true;
            this.search.list[searchIndex].batchList.push({
              productBatchCode: productBatchCode,
              productBatchID: productBatchID
            })
          } else {
            this.search.list[searchIndex].searchShow = true;
            this.search.list[searchIndex].batchList = [{
              productBatchCode: productBatchCode,
              productBatchID: productBatchID
            }]
          }
          this.dataTransmit();
        }
      },
      //点击箭头事件
      searchArrowEvent(index, type){
        let ids;
        this[type].list[index].status = !this[type].list[index].status;
        if (type === 'search') {
          let choosedIndex = util.loopObject(this[type].list[index], this.choosed.list, 'productID');
          if (choosedIndex === false) {
            ids = '';
          } else {
            ids = this.choosed.list[choosedIndex].productBatchID.join(',');
          }
        } else {
          if (this.choosed.list[index].productBatchID === '' || this.choosed.list[index].productBatchID === null) {
            ids = '';
          } else {
            ids = this.choosed.list[index].productBatchID.join(',');
          }
        }

        if (this[type].list[index].status) {
          let params = {
            productID: this[type].list[index].productID,
            keyWords: this.search.keyWords,
            type: type === 'search' ? 'l' : 'r',
            ids: ids
          };
          this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_PRODUCT_BATCH_LIST, params).then((res) => {
            if (res.resultCode === '200') {
              let arr = [];
              let arrID = [];
              for (let i = 0; i < res.data.length; i++) {
                arr.push(res.data[i]);
                arrID.push(res.data[i].productBatchID);
              }
              this.$set(this[type].list[index], 'batchList', arr);
              this.$set(this[type].list[index], 'productBatchID', arrID);
              this.dataTransmit();
            }
          })
        }
      },
      //搜索框输入事件
      searchKeywords(val){
        this.renderList({
          url: this.searchUrl,
          keyWords: val
        })
        this.search.keyWords = val;
      },
      //获取未选择列表
      renderList(obj){
        let url = obj.url ? obj.url : '';
        let keyWords = obj.keyWords ? obj.keyWords : '';
        let source = obj.source ? obj.source : '';
        let params = {
          keyWords: keyWords
        };
        this.$ajax.get(url, params).then((res) => {
          if (res.resultCode === '200') {
            if (res.data && res.data.length > 0) {
              this.editDataRender(this.editData, res.data);
              if (this.fromType === 'org') {
                // 机构 search 列表
                this.search.list = res.data.map((p, index) => {
                  p.searchShow = true;
                  for (let j = 0; j < this.choosed.list.length; j++) {
                    if (this.choosed.list[j].orgID === p.orgID) {
                      p.searchShow = false;
                    }
                  }
                  return p;
                })
              } else if (this.fromType === 'product') {
                //产品 search 列表
                this.search.list = res.data.map((p, index) => {
                  p.status = false;
                  p.searchShow = true;
                  for (let j = 0; j < this.choosed.list.length; j++) {
                    if (this.choosed.list[j].productID === p.productID) {
                      p.searchShow = false;
                      if (p.batchCount == this.choosed.list[j].batchCount || this.choosed.list[j].batchCount == 0) {
                        p.searchShow = false;
                      } else {
                        p.searchShow = true;
                      }
                    }
                  }
                  return p;
                })
              }
            } else {
              this.search.list = [];
            }
          }
        })
        //新建时获取参加活动的机构
        if ((!this.editData || this.editData.length === 0) && source === 'init' && this.fromType === 'org') {
          this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').activity.salesRedPack.GET_ATTENDED_ORG_LIST).then((res) => {
            if (res.resultCode === '200') {
              let data = res.data;
              for (let i = 0; i < data.length; i++) {
                let org = {
                  orgCode: data[i].orgCode,
                  orgID: data[i].orgID,
                  orgName: data[i].orgName,
                  searchShow: true
                }
                this.choosed.list.push(org);
              }
            }
            this.dataTransmit();
          })
        }
      },
      //渲染choosed列表
      renderChoosedList(obj, root, index){
        obj = Object.deepClone(obj);
        let choosedIndex;
        if (this.fromType === 'org') {
          choosedIndex = util.loopObject(obj, this.choosed.list, 'orgID'); //判断这个机构在被选中的列表中的位置
        } else {
          choosedIndex = util.loopObject(obj, this.choosed.list, 'productID'); //判断这个产品在被选中的列表中的位置
        }
        if (choosedIndex === false) { //说明choosed中还没有这个产品
          if (root === 'parent') { //点击的来源 - 点击产品/机构
            obj.productBatchID = ''; //全部的批次都选中 则 productBatchID = ''
            this.choosed.list.push(obj); //把对象push进choosed.list中
          } else { //点击批次
            obj.productBatchID = [obj.batchList[0].productBatchID]; //把这个批次放进productBatchID数组中
            this.choosed.list.push(obj); //对象push进choosed.list中
          }
        } else { //对面有这个产品
          if (root === 'parent') {
            this.choosed.list[choosedIndex].status = false;
            this.choosed.list[choosedIndex].productBatchID = '';
          } else {
            this.choosed.list[choosedIndex].batchList.push(obj.batchList[0]);
            if (this.choosed.list[choosedIndex].productBatchID === '') {
              this.choosed.list[choosedIndex].productBatchID = [];
            }
            this.choosed.list[choosedIndex].productBatchID.push(obj.productBatchID[0]);
          }
        }
        this.dataTransmit();
      },
      //渲染search列表
      renderSearchList(index, root, obj){
        let searchIndex;
        if (this.fromType === 'org') {
          searchIndex = util.loopObject(this.choosed.list[index], this.search.list, 'orgID');
        } else if (this.fromType === 'product') {
          searchIndex = util.loopObject(this.choosed.list[index], this.search.list, 'productID');
        }
        if (root === 'parent') {
          if (searchIndex || searchIndex === 0) {
            this.search.list[searchIndex].searchShow = true;
            this.search.list[searchIndex].status = false;
          }
          this.choosed.list.splice(index, 1);
        } else {
          if (!this.search.list[searchIndex].batchList) {
            this.search.list[searchIndex].batchList = [obj.batchList[0]]
          } else {
            this.search.list[searchIndex].batchList.push(obj.batchList[0]);
            if (this.search.list[searchIndex].productBatchID === '') {
              this.search.list[searchIndex].productBatchID = [];
            }
            this.search.list[searchIndex].productBatchID.push(obj.productBatchID[0]);
          }
        }
        this.dataTransmit();
      },
      //数据传递
      dataTransmit(){
        let arr = [];
        if (this.fromType === 'org') {
          arr = this.choosed.list.map((p, index) => {
            return p.orgID;
          })
          this.$emit('activityOrg', arr);
        } else if (this.fromType === 'product') {
          arr = this.choosed.list.map((p, index) => {
            return {
              productID: p.productID,
              productBatchID: p.productBatchID ? p.productBatchID : ''
            }
          })
          this.$emit('activityProduct', arr);
        }
      },
      //获取已选择列表
      editDataRender(data, listData){
        if (this.choosedListDataInit) {
          return false;
        } else {
          this.choosedListDataInit = !this.choosedListDataInit;
        }
        if (this.fromType === 'product') {
          for (let i = 0; i < data.length; i++) {
            let batchCount;
            if (data[i].productBatchID) {
              if (data[i].productBatchID[0] === '') {
                batchCount = 0;
              } else {
                batchCount = data[i].productBatchID.length;
              }
            } else {
              let searchIndex = util.loopObject(data[i], listData, 'productID');
              batchCount = listData[searchIndex].batchCount;
            }
            let product = {
              productCode: data[i].productCode,
              batchCount: batchCount,
              productID: data[i].productID,
              productName: data[i].productName,
              productBatchID: data[i].productBatchID,
              status: false,
              batchList: []
            };
            this.choosed.list.push(product)
          }
        } else if (this.fromType === 'org') {
          for (let i = 0; i < data.length; i++) {
            let org = {
              orgCode: data[i].orgCode,
              orgID: data[i].orgID,
              orgName: data[i].orgName,
              searchShow: false
            };
            this.choosed.list.push(org);
          }
        }
      },
      //全选事件
      selectAll(){
        //清空search列表
        this.search.list = this.search.list.map((p, index) => {
          p.searchShow = false;
          return p;
        })
        this.choosed.list = this.search.list.map((p, index) => {
          p.productBatchID = '';
          return p;
        })
        this.dataTransmit();
      },
      removeAll(){
        this.choosed.list = [];
        this.search.list = this.search.list.map((p, index) => {
          p.searchShow = true;
          return p;
        })
        this.dataTransmit();
      }
    },
    mounted(){
      //根据调用接口的地址判断 是机构列表还是产品列表
      this.fromType = this.searchUrl.indexOf('OrgList') === -1 ? 'product' : 'org';
      this.renderList({
        url: this.searchUrl,
        source: 'init'
      });
      this.dataTransmit();
      //placeholder
      if (this.fromType === 'product') {
        this.search.searchPlaceholder = '请输入或下方选择参加活动的产品';
        this.choosed.choosedPlaceholder = '请输入或从下方反选不参加的产品';
      } else if (this.fromType === 'org') {
        this.search.searchPlaceholder = '请输入或下方选择参加活动的机构';
        this.choosed.choosedPlaceholder = '请输入或从下方反选不参加的机构';
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .code {
    font-size: 12px;
    color: @ExtraLightBlack;
    display: inline !important;
  }

  .choose-block {
    .search-input {
      .el-input {
        width: 48%;
        &:first-child {
          margin-right: 2%;
        }
      }
    }
    .search-content {
      .search-block, .choosed-block {
        float: left;
        height: 420px;
        width: 48%;
        position: relative;
        margin-right: 4%;
        &:last-child {
          margin-right: 0;
        }
        .select-all-btn, .remove-all-btn {
          position: absolute;
          bottom: 5px;
          right: 40px;
          z-index: 10;
        }
        ul.search-list, .choosed-list {
          position: relative;
          height: 400px;
          margin-top: 5px;
          border: 1px solid #bfcbd9;
          border-radius: 4px;
          padding: 1% 0px;
          overflow: auto;
          width: 99.5%;
          li {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            color: @Black;
            font-size: 14px;
            position: relative;
            padding-left: 0%;
            &.search-all-btn {
              position: absolute;
              bottom: 10px;
              right: 10px;
              z-index: 10;
            }
            span {
              display: inline-block;
              width: 90%;
              padding: 0;
              &:hover {
                background: @LightGray;
              }
            }
            ul.search-second-list {
              transition: all .5s ease;
              li {
                width: 94%;
                padding-left: 6%;
                font-size: 12px;
                &:hover {
                  background: @LightGray;
                }
              }
            }
          }
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          &:first-child {
            margin-right: 15px;
          }
        }
      }
    }
  }

  .span-down {
    transition: all .3s;
  }
</style>
