<template>
  <div :class="{'view': isFunction}" class="content">
    <div class="content-left">
      <cjm-button @click="addCategory" type="text" class="add-category">
        <i class="cjm-icon-add2"></i>新增类别
      </cjm-button>
      <div class="category-list2" :style="contentHeight">
        <cjm-scrollbar class="category-list">
          <ul>
            <li v-for="category in categorys" :key="category.id">
              <div class="category" :class="{'active': category.isClassActive}" @click="activeCategory(category)">
                <i class="cjm-icon-caret-down arrow" :class="{'cjm-icon-rotate-n90':!category.isActive}"></i>
                <div class="category-name"> {{ category.name }}</div>
                <i class="cjm-icon-edit edit" @click="editCategory(category,'','')"></i>
                <i class="cjm-icon-close delete" @click="delCategory(category.id)"></i>
              </div>
              <ul class="category-child" :class="{'category-active':category.isActive}">
                <li v-for="child in category.childList" :key="child.id" :class="{'active': child.isActive}"
                    @click="activeCategoryChild(child)">
                  <i class="cjm-icon-circle category-child-circle"></i>
                  <div class="category-name category-name-child"> {{ child.name }}</div>
                  <i class="cjm-icon-edit edit" @click="editCategory(child, category.name, category.id)"></i>
                  <i class="cjm-icon-close delete" @click="delCategory(child.id)"></i>
                </li>
              </ul>
            </li>
          </ul>
        </cjm-scrollbar>
      </div>
    </div>
    <div class="search">
      <i class="cjm-search-button el-icon-search search-icon" @click="search"></i>
      <div class="search1">
        <cjm-remote-select class="search-select" placeholder="功能名称" v-model="searchPower" :fetch-data="fetchData"
                           @select="search">
        </cjm-remote-select>
      </div>
    </div>
    <div class="content-right" v-show="showPowerBnt">
      <cjm-button @click="addPower" type="text" class="add-power">
        <i class="cjm-icon-add2"></i>新增功能
      </cjm-button>
      <div class="functional-node-list2" :style="contentHeight">
        <cjm-scrollbar class="functional-node-list">
          <ul class="clear">
            <li class="functional-node-item" v-for="power in powers" :key="power.id">
              <cjm-radio class="powerRadio" v-model="replaceMenuName" @click.native="replaceMenuNameChange(power.name)"
                         :label="power.id">
                <div class="circular"></div>
                <div class="function-list">
                  <div class="function-name" :class="{'search-active': power.isActive}">{{ power.name }}</div>
                </div>
              </cjm-radio>
              <div class="power-name">
                <div class="circular"></div>
                <div class="function-list">
                  <div class="function-name" :class="{'search-active': power.isActive}">{{ power.name }}</div>
                  <i class="cjm-icon-edit function-edit" @click="editPower(power.id)"></i>
                  <i class="cjm-icon-close function-delete" @click="delPower(power.id)"></i>
                </div>
              </div>
              <ul class="function-child-node clear">
                <li v-for="child in power.childList" :key="child.id">
                  <div class="vertical"></div>
                  <div class="horizontal"></div>
                  <div class="minCircular"></div>
                  <div class="function-child">
                    <div class="child-node-name">{{ child.name }}</div>
                    <i class="cjm-icon-edit function-edit mt-16" @click="editPower(child.id)"></i>
                    <i class="cjm-icon-close function-delete mt-16" @click="delPower(child.id)"></i>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </cjm-scrollbar>
      </div>
    </div>
    <cjm-dialog :title="dialogTitle" :visible.sync="dialogVisible" :okHandler="categoryConfirm" :height="600">
      <category-edit ref="categoryEdit"></category-edit>
    </cjm-dialog>
    <cjm-dialog :title="powerDialogTitle" :visible.sync="powerDialogVisible" :okHandler="powerConfirm" :height="600">
      <power-edit ref="powerEdit" :powers="powers"></power-edit>
    </cjm-dialog>
  </div>
</template>

<script>
import categoryEdit from './category-edit.vue';
import powerEdit from './power-edit.vue';
import { on, off } from 'framework/utils/dom';

export default {
  components: {
    categoryEdit,
    powerEdit
  },
  data() {
    return {
      categorys: [],
      dialogTitle: '',
      dialogVisible: false,
      powerDialogTitle: '',
      powerDialogVisible: false,
      showPowerBnt: false,
      powerCategoryIDVal: '',
      searchPower: '',
      powers: [],
      allPowers: [],
      isFunction: false,
      replaceMenuName: '',
      powerName: '',
      contentHeight: {}
    };
  },
  props: {
    isEdit: Object
  },
  computed: {},
  watch: {
    powerCategoryIDVal: function() {
      this.getPowerList();
    },
    searchPower: function() {
      this.getPowerList();
    }
  },
  methods: {
    //新增
    addCategory() {
      this.dialogTitle = '新增类别';
      this.dialogVisible = true;
      if (this.$refs.categoryEdit) {
        this.$nextTick(function() {
          this.$refs.categoryEdit.reset();
        });
      }
    },
    editCategory(item, name, id) {
      this.dialogTitle = '编辑类别';
      this.dialogVisible = true;
      this.$nextTick(function() {
        this.$refs.categoryEdit.editForm(item, name, id);
      });
    },
    //编辑选中名称修改
    replaceMenuNameChange(powerName) {
      this.powerName = powerName;
    },
    delCategory(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$ajax
            .get(this.$globalData.get('base', 'apiUrl').powerCategory.DELELE, {
              id: id
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$message.success('删除成功');
                this.getPowerCategoryList();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(_ => {});
    },
    delPower(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$ajax
            .get(this.$globalData.get('base', 'apiUrl').power.DELELE, {
              id: id
            })
            .then(r => {
              if (r.resultCode == 200) {
                this.$message.success('删除成功');
                this.getPowerList();
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(_ => {});
    },
    getPowerCategoryList() {
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').powerCategory.GET_LIST)
        .then(r => {
          if (r.resultCode == 200) {
            this.categorys = r.data.rows;
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    allGetPowerList() {
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').power.GET_LIST)
        .then(r => {
          if (r.resultCode == 200) {
            this.allPowers = r.data;
            this.search();
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    addPower() {
      this.powerDialogTitle = '新增功能';
      this.powerDialogVisible = true;
      this.$nextTick(function() {
        this.$refs.powerEdit.addForm(this.powerCategoryIDVal);
      });
    },
    getPowerList() {
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').power.GET_LIST, {
          categoryID: this.powerCategoryIDVal
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.powers = r.data;
            if (this.searchPower != '') {
              for (let i = 0; i < this.powers.length; i++) {
                this.$set(this.powers[i], 'isActive', false);
                if (this.powers[i].id == this.searchPower) {
                  if (this.isFunction) {
                    this.replaceMenuName = this.searchPower;
                    this.powerName = this.powers[i].name;
                  } else {
                    this.$set(this.powers[i], 'isActive', true);
                  }
                }
              }
            }
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    editPower(powerID) {
      this.powerDialogTitle = '编辑功能';
      this.powerDialogVisible = true;
      this.$nextTick(function() {
        this.$refs.powerEdit.editForm(powerID);
      });
    },
    categoryConfirm(callback) {
      this.$refs.categoryEdit
        .submit()
        .then(() => {
          callback();
          this.$message.success('保存成功');
          this.dialogVisible = false;
          this.getPowerCategoryList();
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    powerConfirm(callback) {
      this.$refs.powerEdit
        .submit()
        .then(() => {
          this.$message.success('保存成功');
          this.powerDialogVisible = false;
          this.getPowerList();
          this.allGetPowerList();
          callback();
        })
        .catch(error => {
          if (error != '') {
            this.$message.error(error.message);
          }
          callback();
        });
    },
    search() {
      if (this.searchPower != '' && this.searchPower != undefined) {
        this.powerCategoryIDVal = '';
        this.showPowerBnt = true;
        for (let i = 0; i < this.allPowers.length; i++) {
          if (this.allPowers[i].id == this.searchPower) {
            this.powerCategoryIDVal = this.allPowers[i].categoryID;
            break;
          }
        }
        for (let i = 0; i < this.categorys.length; i++) {
          this.$set(this.categorys[i], 'isActive', false);
          this.$set(this.categorys[i], 'isClassActive', false);
          if (this.categorys[i].id == this.powerCategoryIDVal) {
            this.$set(this.categorys[i], 'isActive', true);
            this.$set(this.categorys[i], 'isClassActive', true);
          }
          for (let j = 0; j < this.categorys[i].childList.length; j++) {
            let item = this.categorys[i].childList[j];
            if (item.id == this.powerCategoryIDVal) {
              this.$set(this.categorys[i], 'isActive', true);
              this.$set(this.categorys[i], 'isClassActive', false);
              this.$set(this.categorys[i].childList[j], 'isActive', true);
            }
          }
        }
      }
    },
    fetchData(query, search) {
      search(
        this.allPowers.filter(o => {
          return o.name.indexOf(query) >= 0;
        })
      );
    },
    activeCategory(category) {
      this.showPowerBnt = true;
      for (let i = 0; i < this.categorys.length; i++) {
        this.$set(this.categorys[i], 'isActive', false);
        this.$set(this.categorys[i], 'isClassActive', false);
        if (
          this.categorys[i].childList &&
          this.categorys[i].childList.length > 0
        ) {
          for (let j = 0; j < this.categorys[i].childList.length; j++) {
            this.$set(this.categorys[i].childList[j], 'isActive', false);
          }
        }
      }
      this.powerCategoryIDVal = category.id;
      if (!category.isActive) {
        this.$set(category, 'isActive', true);
        this.$set(category, 'isClassActive', true);
      } else {
        this.$set(category, 'isActive', false);
        this.$set(category, 'isClassActive', false);
      }
    },
    activeCategoryChild(categoryChild) {
      this.showPowerBnt = true;
      for (let i = 0; i < this.categorys.length; i++) {
        this.$set(this.categorys[i], 'isClassActive', false);
        if (
          this.categorys[i].childList &&
          this.categorys[i].childList.length > 0
        ) {
          for (let j = 0; j < this.categorys[i].childList.length; j++) {
            this.$set(this.categorys[i].childList[j], 'isActive', false);
          }
        }
      }
      this.powerCategoryIDVal = categoryChild.id;
      if (!categoryChild.isActive) {
        this.$set(categoryChild, 'isActive', true);
      } else {
        this.$set(categoryChild, 'isActive', false);
      }
    },
    selectPower() {
      this.isFunction = this.isEdit.isView;
      this.searchPower = this.isEdit.powerID;
      if (this.isEdit.powerID != '' && this.isEdit.powerID != undefined) {
        this.search();
        this.allGetPowerList();
      } else {
        this.replaceMenuName = '';
      }
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
    }
  },
  mounted() {
    this.getPowerCategoryList();
    this.allGetPowerList();
    on(window, 'resize', this.resize);
    this.$nextTick(() => {
      this.resize();
    });
  },
  destroyed() {
    this.powerCategoryIDVal = '';
    off(window, 'resize', this.resize);
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.category {
  width: 250px;
  padding: 10px 0px 0px 0px;
  height: 28px;
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
  width: 250px;
  margin-top: 20px;
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
  width: 160px;
  float: left;
  cursor: pointer;
  font-size: 14px;
}

.active {
  background-color: @LightGray;
}

.edit {
  float: left;
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
  margin-right: 17px;
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
}

.category-child li {
  padding: 8px 0 8px 20px;
  font-weight: 500;
  width: 230px;
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
  width: 250px;
  box-sizing: border-box;
  position: absolute;
}

.content-right {
  left: 280px;
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
  background-color: @DarkWhite;
  border: 1px #f0f0f0 solid;
  box-shadow: 0 0 10px rgb(191, 203, 217);
  margin-top: 20px;
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

.view.content {
  padding-top: 0px;
}

.view .category-list2 {
  box-shadow: none;
}

.view .functional-node-list {
  box-shadow: none;
  background-color: #fff;
  border: none;
  padding-left: 20px;
}

.view .add-category {
  display: none;
}

.view .category-list2 {
  margin-top: 0px;
}

.view .add-power {
  display: none;
}

.view .search {
  display: none;
}

.view .content-right {
  left: 252px;
}

.view .function:hover .functionpencil {
  display: none;
}

.view .function:hover .functioncross {
  display: none;
}

.view .category:hover .edit {
  display: none;
}

.view .category:hover .delete {
  display: none;
}

.view .category-child li:hover .edit {
  display: none;
}

.view .category-child li:hover .delete {
  display: none;
}

.view .function-child:hover .function-edit {
  display: none;
}

.view .function-child:hover .function-delete {
  display: none;
}

.view .function-list:hover .function-edit {
  display: none;
}

.view .function-list:hover .function-delete {
  display: none;
}

.view .functional-node-list .functional-node-item {
  width: 170px;
}

.powerRadio {
  float: right;
  margin-top: -5px;
  display: none;
}

.view .powerRadio {
  display: block;
}

.view .function-child-node > li {
  margin-left: 36px;
}

.view .el-radio {
  margin-right: 17px;
}

.view .functional-node-list2 {
  box-shadow: none;
  background-color: #fff;
  border: none;
  height: auto;
  min-height: 580px;
  margin-top: 0px;
}
.view .function-name {
  width: 105px;
}
.view .power-name {
  display: none;
}
.view .circular {
  margin: 8px 4px 4px 3px;
}
.search-select {
  float: right;
  margin-right: -3px;
}

.search1 {
  float: left;
}

.search-icon {
  float: right;
  height: 36px;
}

.add-icon {
  font-size: 18px;
}
</style>
<style rel='stylesheet/less' lang='less'>
.powerRadio .el-radio__label {
  float: right;
}
</style>
