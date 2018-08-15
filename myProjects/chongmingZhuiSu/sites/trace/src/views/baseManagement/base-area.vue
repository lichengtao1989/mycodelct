<template>
  <div>
    <div class="content cjm-edit-page" v-if="currentPage=='list'">
      <div class="search">
        <i class="cjm-search-button el-icon-search search-icon" @click="search"></i>
        <div class="search1">
          <cjm-input class="search-select" placeholder="基地名称、基地分区、所属机构" v-model="keyWord" @keyup.enter.native="search" clearable>
          </cjm-input>
        </div>
      </div>
      <div class="content-left ">
        <div class="category-list2" :style="contentHeight">
          <cjm-scrollbar class="category-list ">
            <ul>
              <li v-for="baseItem in baseAreaList" :key="baseItem.baseID">
                <div class="category" :class="{ 'active': baseItem.isClassActive} " @click="activeBaseArea(baseItem) ">
                  <i class="cjm-icon-caret-down arrow " :class="{ 'cjm-icon-rotate-n90':!baseItem.isActive} "></i>
                  <div class="category-name " :title="`${baseItem.baseName}(${baseItem.baseCode})`"> {{ baseItem.baseName }}({{baseItem.baseCode}})</div>
                  <i class="cjm-icon-add edit " @click.stop="addBaseArea(baseItem)"></i>
                  <div class="management-org-name">所属机构:{{baseItem.managementOrgName}}</div>
                </div>
                <ul class="category-child" :class="{ 'category-active':baseItem.isActive} ">
                  <li v-for="child in baseItem.baseArea" :key="child.baseAreaID" :class="{ 'active': child.isActive} ">
                    <div class="category-name category-name-child" :title="`${child.baseAreaName}(${child.baseAreaCode})` " @click.stop="editBaseArea(child, 'view')"> {{ child.baseAreaName }}({{child.baseAreaCode}})</div>
                    <i class="cjm-icon-close delete " title="删除" @click.stop="deleteBaseArea(child)"></i>
                    <i class="cjm-icon-edit edit " title="编辑" @click.stop="editBaseArea(child, 'edit')"></i>
                    <i class="cjm-icon-trace-node delete " title="溯源节点" @click.stop="setTraceNode(child)"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </cjm-scrollbar>
        </div>
      </div>
      <div class="content-right " v-show="isEditBaseArea">
        <div class="functional-node-list2 " :style="contentHeight">
          <div class="add-base-area">{{baseBreaName}}</div>
          <cjm-form ref="form" :model="form" :rules="rules" style="margin-top: 30px;float: left;margin-right: 10%; ">
            <cjm-form-item label="分区类型" prop="baseAreaType" required class="cjm-form-item-long ">
              <cjm-radio-group v-model="form.baseAreaType">
                <cjm-radio :label="value" v-for="(value,key) in baseAreaType" :key="value" :disabled="disabled">{{key}}
                </cjm-radio>
              </cjm-radio-group>
            </cjm-form-item>
            <cjm-form-item :label="`${baseAreaLabel}名称`" prop="baseAreaName" required class="cjm-form-item-long ">
              <cjm-input v-model="form.baseAreaName" :placeholder="`请输入${baseAreaLabel}名称`" :disabled="disabled"></cjm-input>
            </cjm-form-item>
            <cjm-form-item :label="`${baseAreaLabel}编号`" prop="baseAreaCode" class="cjm-form-item-long ">
              <cjm-input v-model="form.baseAreaCode" :placeholder="`请输入${baseAreaLabel}编号`" :disabled="disabled"></cjm-input>
            </cjm-form-item>
            <cjm-form-item :label="`${baseAreaLabel}面积`" prop="size" class="cjm-form-item-long">
              <cjm-input v-model="form.baseAreaSize" :placeholder="`请输入${baseAreaLabel}面积`" :disabled="disabled">
                <cjm-select slot="suffix" v-model="form.baseAreaSizeUnit" :disabled="disabled" style="width:120px; margin-right: -5px; ">
                  <cjm-option v-for="(value,key) in baseUnit" :label="key" :value="value" :key="value"></cjm-option>
                </cjm-select>
              </cjm-input>
            </cjm-form-item>
            <div class="cjm-page-bottom-bar" style="margin-bottom: 50px; " v-if="!disabled">
              <cjm-button type="primary" :loading="submitLoading" @click="saveBaseArea">
                <i class="cjm-icon-confirm"></i>确定
              </cjm-button>
              <cjm-button :loading="submitLoading" @click="cancelBaseArea">
                <i class="cjm-icon-close "></i>取消
              </cjm-button>
            </div>
          </cjm-form>
        </div>
      </div>
    </div>
    <!--编辑溯源节点页面-->
    <div class="cjm-edit-page" v-if="currentPage==='edit' ">
      <add-node :editType="4"></add-node>
    </div>
  </div>
</template>

<script>
import addNode from '../traceNode/traceNode-edit-add.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
import { on, off } from 'framework/utils/dom';
export default {
  mixins: [pageSwitch],
  components: {
    addNode
  },
  data() {
    let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
    //console.log(baseApiUrl);
    return {
      traceApiUrl: traceApiUrl,
      baseAreaList: [],
      contentHeight: {},
      disabled: false,
      form: {
        baseAreaType: '0',
        baseAreaName: '',
        baseAreaCode: '',
        baseAreaSize: '',
        baseAreaSizeUnit: '0',
        baseID: '',
        baseAreaID: ''
      },
      rules: {
        baseAreaName: [this.$formRules.required, this.$formRules.maxLength(20)],
        baseAreaCode: [this.$formRules.maxLength(6)]
      },
      keyWord: '',
      submitLoading: false,
      isEditBaseArea: false,
      baseBreaName: '添加基地分区',
      baseAreaLabel: '地块',
      currentPage: 'list'
    };
  },
  mounted() {
    //高度计算
    on(window, 'resize', this.resize);
    this.$nextTick(() => {
      this.resize();
    });
    //获取基地列表
    this.getBase();
  },
  destroyed() {
    off(window, 'resize', this.resize);
  },
  watch: {
    'form.baseAreaType': function(val) {
      this.baseAreaLabel = Object.keys(this.$globalData.get('trace', 'enums')['areaType']).find(key => this.$globalData.get('trace', 'enums')['areaType'][key] == this.form.baseAreaType);
    }
  },
  computed: {
    baseUnit() {
      return this.$globalData.get('trace', 'enums')['基地单位'];
    },
    baseAreaType() {
      return this.$globalData.get('trace', 'enums')['分区类型'];
    }
  },
  methods: {
    hasPower(powerCode) {
      let powerCodes = this.$globalData.get('powerCodes');
      if (!powerCodes || powerCodes.length === 0) {
        return false;
      }
      return powerCodes.includes(powerCode.toLowerCase());
    },
    getBase() {
      this.$ajax
        .get(this.traceApiUrl.baseManagement.GET_BASE_LIST, { keyWord: this.keyWord })
        .then(res => {
          if (res.resultCode == '200') {
            this.baseAreaList = res.data;
            if (this.keyWord != '') {
              for (let i = 0; i < this.baseAreaList.length; i++) {
                this.$set(this.baseAreaList[i], 'isActive', true);
              }
            }
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
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    },
    powerCode(code) {
      return this.hasPower(code);
    },
    resize() {
      let height = 0;
      if (this.isEdit == undefined) {
        height = document.documentElement.clientHeight - 208;
      } else {
        height = document.documentElement.clientHeight - 288;
      }
      this.contentHeight = {
        height: `${height}px`
      };
    },
    //展示下级分区
    activeBaseArea(baseItem) {
      if (baseItem.isActive == undefined) {
        for (let i = 0; i < this.baseAreaList.length; i++) {
          this.$set(this.baseAreaList[i], 'isActive', false);
          this.$set(this.baseAreaList[i], 'isClassActive', false);
          if (this.baseAreaList[i].baseArea && this.baseAreaList[i].baseArea.length > 0) {
            for (let j = 0; j < this.baseAreaList[i].baseArea.length; j++) {
              this.$set(this.baseAreaList[i].baseArea[j], 'isActive', false);
            }
          }
        }
      }
      if (!baseItem.isActive) {
        this.$set(baseItem, 'isActive', true);
        this.$set(baseItem, 'isClassActive', true);
      } else {
        this.$set(baseItem, 'isActive', false);
        this.$set(baseItem, 'isClassActive', false);
      }
      this.isEditBaseArea = false;
      this.reset();
    },
    //添加基地分区
    addBaseArea(baseItem) {
      this.reset();
      this.isEditBaseArea = true;
      this.form.baseID = baseItem.baseID;
      this.baseBreaName = '添加基地分区';
      this.disabled = false;
    },
    //编辑基地分区
    editBaseArea(baseAreaItem, status) {
      for (let i = 0; i < this.baseAreaList.length; i++) {
        this.$set(this.baseAreaList[i], 'isClassActive', false);
        if (this.baseAreaList[i].baseArea && this.baseAreaList[i].baseArea.length > 0) {
          for (let j = 0; j < this.baseAreaList[i].baseArea.length; j++) {
            this.$set(this.baseAreaList[i].baseArea[j], 'isActive', false);
          }
        }
      }
      if (!baseAreaItem.isActive) {
        this.$set(baseAreaItem, 'isActive', true);
      } else {
        this.$set(baseAreaItem, 'isActive', false);
      }
      this.$ajax
        .get(this.traceApiUrl.baseManagement.GET_AREA_DETAILED, { baseAreaID: baseAreaItem.baseAreaID })
        .then(res => {
          if (res.resultCode == '200') {
            this.isEditBaseArea = true;
            this.form = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error);
          }
        });
      if (status == 'view') {
        this.baseBreaName = '查看基地分区';
        this.disabled = true;
      } else {
        this.baseBreaName = '编辑基地分区';
        this.disabled = false;
      }
    },
    //保存基地分区
    saveBaseArea() {
      this.submitLoading = true;
      this.$refs.form
        .validate()
        .then(() => {
          this.$ajax.post(this.traceApiUrl.baseManagement.SAVE_BASE_AREA, this.form).then(data => {
            if (data.resultCode != 200) {
              this.submitLoading = false;
              this.$message.error(data.msg);
            } else {
              this.getBase();
              this.submitLoading = false;
              this.isEditBaseArea = false;
              this.reset();
            }
          });
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    deleteBaseArea(baseAreaItem) {
      this.$confirm('确定要删除吗', '提示', { type: 'warning' })
        .then(() => {
          this.$ajax
            .get(this.$globalData.get('trace', 'apiUrl').baseManagement.DELETE_BASE_AREA, {
              baseAreaID: baseAreaItem.baseAreaID
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.getBase();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(() => {});
    },
    reset() {
      this.form = {
        baseAreaType: '0',
        baseAreaName: '',
        baseAreaCode: '',
        baseAreaSize: '',
        baseAreaSizeUnit: '0',
        baseID: '',
        baseAreaID: ''
      };
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    //取消编辑
    cancelBaseArea() {
      this.isEditBaseArea = false;
      this.reset();
    },
    //设置溯源节点
    setTraceNode(row) {
      this.pushPage('edit', '溯源节点', { id: row.baseAreaID });
    },
    search() {
      this.getBase();
      this.reset();
      this.isEditBaseArea = false;
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

.category {
  min-width: 250px;
  width: 320px;
  padding: 10px 0px 5px 0px;
  height: 35px;
  float: left;
}

.add-category {
  color: @primaryColor;
  clear: both;
  cursor: pointer;
  border: none;
}

.cjm-icon-add2 {
  float: left;
}

.arrow {
  color: #bfcbd9;
  float: left;
  margin: 4px 4px 10px 10px;
  font-size: 12px;
}

.content {
  clear: both;
  position: relative;
}

.category-list {
  float: left;
  position: relative;
}

.category-list2 {
  float: left;
  min-width: 250px;
  width: 320px;
  margin-top: 50px;
  height: 580px;
  border: 1px #f0f0f0 solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
}

.category-list > li {
  width: 100%;
  color: #333333;
  font-weight: bold;
}

.category:hover {
  background-color: @ExtraLightGray;
}

.category-name {
  width: 240px;
  float: left;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active {
  background-color: @LightGray;
}

.edit {
  float: right;
  cursor: pointer;
  border: none;
  color: @primaryColor;
  margin-right: 10px;
  display: none;
}

.delete {
  float: right;
  cursor: pointer;
  border: none;
  color: @primaryColor;
  margin-right: 10px;
  display: none;
}

.category:hover .edit {
  display: block;
}

.category:hover .delete {
  display: block;
}

.category-child {
  width: 100%;
  display: none;
  float: left;
}

.category-child li {
  padding: 8px 0 8px 20px;
  font-weight: 500;
  min-width: 230px;
  width: 300px;
  height: 22px;
}

.category-child li:hover {
  background-color: @ExtraLightGray;
}

.category-child li:hover .edit {
  display: block;
}

.category-child li:hover .delete {
  display: block;
}

.category-child-circle {
  float: left;
  color: #cccccc;
  font-size: 5px;
  transform: scale(0.6);
  margin: 4px;
}

.content-left {
  min-width: 250px;
  width: 320px;
  box-sizing: border-box;
  position: absolute;
}

.content-right {
  left: 340px;
  position: absolute;
  right: 0;
  z-index: 2;
}

.add-power {
  color: @primaryColor;
  clear: both;
  cursor: pointer;
  float: left;
  border: none;
}

.function-list {
  float: left;
  cursor: pointer;
  position: relative;
  z-index: 5;
}

.function-list > li {
  color: #c1c1c1;
  float: left;
  width: 200px;
  padding-left: 0;
  cursor: pointer;
  margin-bottom: 5px;
}

.function-list > li:hover {
  background-color: #f7f7f7;
}

.function-list:hover .function-edit {
  display: block;
}

.function-list:hover .function-delete {
  display: block;
}

.function-list > li:hover .function-name {
  color: @primaryColor;
}

.function-edit {
  float: left;
  color: @primaryColor;
  font-size: 14px;
  border: none;
  padding: 0;
  padding-right: 10px;
  display: none;
}

.function-delete {
  float: left;
  color: #3893e2;
  font-size: 14px;
  border: none;
  padding: 0;
  display: none;
}

.function-name {
  color: #4d4d4d;
  float: left;
  width: 125px;
  margin-left: 5px;
  font-size: 14px;
}

.circular {
  width: 4px;
  height: 4px;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  background-color: #c1c1c1;
  float: left;
  margin: 4px 4px 4px 3px;
}

.functional-node-list2 {
  float: left;
  height: 580px;
  width: 100%;
  max-width: 860px;
  border: 1px #f0f0f0 solid;
  box-shadow: 0 0 10px rgb(191, 203, 217);
  margin-top: 50px;
  box-sizing: border-box;
  overflow: hidden;
}

.functional-node-list {
  float: left;
  padding-left: 40px;
}

.functional-node-list .functional-node-item {
  float: left;
  width: 200px;
  padding-top: 10px;
}

.function-child-node {
  padding-left: 0px;
  font-size: 14px;
  color: @primaryColor;
  float: left;
  width: 200px;
  position: relative;
}

.function-child-node > li {
  margin-top: -9px;
  margin-left: 5px;
  float: left;
  z-index: 2;
}

.vertical {
  height: 33px;
  border-left: 1px #c1c1c1 solid;
  float: left;
  width: 0px;
}

.horizontal {
  float: left;
  width: 22px;
  border-bottom: 1px #c1c1c1 solid;
  margin-top: 24px;
}

.minCircular {
  width: 4px;
  height: 4px;
  border: 1px solid #c1c1c1;
  border-radius: 8px;
  background-color: #c1c1c1;
  float: left;
  margin-top: 22px;
}

.child-node-name {
  float: left;
  margin-top: 15px;
  padding-left: 10px;
  width: 105px;
  color: #3893e2;
  overflow: hidden;
  word-break: keep-all;
}

.function-child-node > li:last-child .vertical {
  height: 25px;
}

.function-child-node > li:first-child .vertical {
  margin-top: 0px;
  height: 25px;
  width: 0px;
}

.mt-16 {
  margin-top: 16px;
}

.function-child {
  cursor: pointer;
  float: left;
}

.function-list:hover .function-name {
  color: #3893e2;
}

.function-child:hover .function-edit {
  display: block;
}

.function-child:hover .function-delete {
  display: block;
}

.functional-list {
  margin-top: 30px;
}

.function {
  cursor: pointer;
  float: left;
}

.function:hover .functionName {
  color: #3893e2;
}

.function:hover .functionpencil {
  display: block;
}

.function:hover .functioncross {
  display: block;
}

.category-name-child {
  width: 150px;
}

.category-active {
  display: block;
}

.child-active {
  background-color: #f7f7f7;
}

.cjm-search-input {
  float: left;
  width: 162px;
  height: 22px;
  line-height: 22px;
  padding: 5px 12px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid #ccc;
}

.cjm-search-button {
  float: left;
  width: 48px;
  height: 36px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  border: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #3493e6;
  cursor: pointer;
}

.cjm-search:after {
  content: '';
  clear: both;
}

.search-active {
  color: red;
}

.search {
  float: right;
  position: absolute;
  right: 0;
  z-index: 5;
}

.search-select {
  float: right;
  margin-right: -3px;
}

.search1 {
  float: left;
  width: 250px;
}

.search-icon {
  float: right;
  height: 36px;
}

.add-icon {
  font-size: 18px;
}
.add-base-area {
  float: left;
  height: 44px;
  width: 100%;
  max-width: 800px;
  line-height: 44px;
  padding-left: 20px;
  border-bottom: 1px #e5e9f2 solid;
}
.management-org-name {
  font-size: 12px;
  color: @ExtraLightSilver;
  width: 280px;
  height: 20px;
  cursor: pointer;
  float: left;
}
</style>
