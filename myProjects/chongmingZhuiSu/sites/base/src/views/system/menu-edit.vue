<template>
  <div>
    <i class="el-icon-search search" @click="search"></i>
    <div class="search1">
      <cjm-remote-select class="search-select" placeholder="功能名称" v-model="searchMenu" :fetch-data="fetchData"
                         @select="search">
      </cjm-remote-select>
    </div>
    <div class="add-menu">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item label="菜单名称" prop="name" class="common-label" required>
          <cjm-input v-model="form.name" placeholder="请输入菜单名称"></cjm-input>
        </cjm-form-item>
        <div class="batch-add-item" v-show="!isEdit.isView">
          <cjm-checkbox v-model="batchAdd" style="padding-left: 20px;">批量添加</cjm-checkbox>
        </div>
        <cjm-form-item v-for="(menu, index) in batchMenus" :key="menu.id" v-show="batchAdd"
                       label="菜单名称" class="common-label" style="width:340px;">
          <cjm-input v-model="menu.name" style="width:180px;float: left;" placeholder="请输入菜单名称"></cjm-input>
          <i class="cjm-icon-close del-icon" @click="delMenu(index)"></i>
        </cjm-form-item>
        <div class="add">
          <i @click="addMenu" class="cjm-icon-add" v-if="batchMenus.length > 0 && batchMenus.length < 7"></i>
        </div>
        <cjm-form-item label="菜单类型" prop="type" class="common-label" required>
          <cjm-select v-model="form.type">
            <cjm-option v-for="(value,key) in powerType" :key="value" :label="key" :value="value"></cjm-option>
          </cjm-select>
        </cjm-form-item>
        <cjm-form-item label="上级菜单" prop="parentID" v-if="form.type != 1" class="common-label" required>
          <cjm-select v-model="form.parentID" @change="setIndex">
            <cjm-option v-for="parent in parentMenu" :key="parent.id" :label="parent.name"
                        :value="parent.id"></cjm-option>
          </cjm-select>
        </cjm-form-item>
        <cjm-form-item label="序号" prop="index" v-show="!batchAdd" required class="common-label">
          <cjm-input v-model="form.index" placeholder="请输入菜单名称"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="功能选择" prop="powerName" v-show="!batchAdd" class="common-label">
          <cjm-input v-model="powerName" @focus="powerSelect" readonly="readonly"
                     placeholder="请选择功能">
            <!-- <template slot="append" @click.stop.prevent="clearMenu()"><i class="cjm-icon-close clear-icon"></i></template>  -->
            <cjm-button slot="append" @click.stop.prevent="clearMenu()" icon="cjm-icon-close"></cjm-button>
          </cjm-input>
        </cjm-form-item>
        <div class="common-label" style="text-align: center;">
          <cjm-button @click.stop="onSubmit" type="primary">
            <span v-show="!isEdit.isView"><i class="cjm-icon-add"></i>添 加</span>
            <span v-show="isEdit.isView"><i class="cjm-icon-confirm"></i>确 认</span>
          </cjm-button>
        </div>
      </cjm-form>
    </div>
    <div class="menu-list">
      <div class="menu-1">
        <cjm-scrollbar>
          <ul class="level-1 clear" id="level1">
          <li v-for="(menu,index) in menus">
            <div class="level1-menu" :class="{ 'active': menu.isBgActive }" @click="editMenu(menu, '1')">
              <i class="cjm-icon-caret-down arrow-bottom"
                 :class="{'cjm-icon-rotate-n90' : menu.childList && menu.childList.length == 0}"></i>
              <input class="level-1-name" :class="{ 'active': menu.isBgActive , 'level1active': menu.isActive }"
                     v-focus="menu.isActive" @keydown.tab.stop.prevent="keypresTab(menu ,'1')"
                     @dblclick="levelDblclick(menu)" v-model="menu.name"
                     @keyup.enter.stop="keypresEnter(menus,menu,'1',index)" :readonly="!menu.isActive"
                     @blur="changeLevel(menu)" placeholder="一级菜单" maxLength="10"/>
              <i class="cjm-icon-close del-menu" @click.stop="removeMenu(index,menu.id,'1')"></i>
            </div>
            <ul class="level-2 active-show">
              <li v-for="(level2Child,index) in menu.childList" :class="{ 'active': level2Child.isBgActive }"
                  @click="editMenu(level2Child ,'2')">
                <input class="level-2-name"
                       :class="{ 'active': level2Child.isBgActive , 'level2active': level2Child.isActive}"
                       @keydown.tab.stop.prevent="keypresTab(level2Child ,'2')" @dblclick="levelDblclick(level2Child)"
                       v-model="level2Child.name" @keyup.enter="keypresEnter(menu.childList,level2Child,'2',index)"
                       :readonly="!level2Child.isActive" placeholder="二级菜单" v-focus="level2Child.isActive"
                       @blur="changeLevel(level2Child)"
                       maxLength="10"/>
                <i class="cjm-icon-close del-menu" @click.stop="removeMenu(index,level2Child.id,'2')"></i>
              </li>
            </ul>
          </li>
        </ul>
        </cjm-scrollbar>
      </div>
      <div class="menu-2">
        <cjm-scrollbar>
          <ul class="level-3 clear">
          <li v-for="(level3Child,index) in threeList.childList" :class="{ 'active': level3Child.isBgActive}"
              @click="editMenu(level3Child ,'3')">
            <input class="level-2-name"
                   :class="{ 'active': level3Child.isBgActive , 'level3-active': level3Child.isActive}"
                   @dblclick="levelDblclick(level3Child)" v-model="level3Child.name"
                   @keyup.enter="keypresEnter(threeList.childList,level3Child,'3',index)"
                   :readonly="!level3Child.isActive"
                   v-focus="level3Child.isActive" @blur="changeLevel(level3Child)"
                   @keydown.tab.prevent="keypresTab(level3Child ,'3')" placeholder="三级菜单" maxLength="10"/>
            <i class="cjm-icon-close del-menu" @click.stop="removeMenu(index,level3Child.id,'3')"></i>
          </li>
        </ul>
        </cjm-scrollbar>
      </div>
      <div class="menu-3">
        <cjm-scrollbar>
          <ul class="level-4 clear">
          <li v-for="(level4Child,index) in fourList.childList" :class="{ 'active': level4Child.isBgActive}">
            <input class="level-2-name" @click="editMenu(level4Child ,'4')"
                   :class="{ 'active': level4Child.isBgActive , 'level3-active': level4Child.isActive}"
                   @dblclick="levelDblclick(level4Child)" v-model="level4Child.name"
                   @keyup.enter="keypresEnter(fourList.childList,level4Child,'4',index)"
                   :readonly="!level4Child.isActive"
                   v-focus="level4Child.isActive" @blur="changeLevel(level4Child)" placeholder="四级菜单" maxLength="10"/>
            <i class="cjm-icon-close del-menu" @click.stop="removeMenu(index,level4Child.id,'4')"></i>
          </li>
        </ul>
        </cjm-scrollbar>
      </div>
    </div>
    <cjm-dialog :title="powerDialogTitle" :visible.sync="powerDialogVisible" :okHandler="powerSubmit" :height="750">
      <power-edit ref="powerEdit" :isEdit="isEdit"></power-edit>
    </cjm-dialog>
  </div>
</template>
<script>
import powerEdit from '../power/list.vue';

export default {
  components: {
    powerEdit
  },
  data: function() {
    return {
      form: {
        name: '',
        id: '',
        type: '1',
        powerID: '',
        directoryID: '',
        parentID: '',
        index: 10000
      },
      batchAdd: false,
      batchMenus: [],
      menus: [],
      threeList: [],
      fourList: [],
      batchFrom: {
        menus: []
      },
      oneLevel: false,
      powerName: '',
      parentMenu: [],
      directoryID: '',
      powerDialogTitle: '',
      powerDialogVisible: false,
      isView: true,
      searchMenu: '',
      allMenus: [],
      currentMenu: '',
      isEdit: {},
      rules: {
        name: [this.$formRules.required, this.$formRules.maxLength(10)],
        parentID: [this.$formRules.required]
      }
    };
  },
  computed: {
    powerType() {
      return this.$globalData.get('base', 'enums')['菜单类型'];
    }
  },
  watch: {
    batchAdd: function() {
      if (this.batchAdd == true) {
        this.batchMenus.push(
          {
            name: ''
          },
          {
            name: ''
          },
          {
            name: ''
          }
        );
        this.form.powerID = '';
        this.powerName = '';
      } else {
        this.batchMenus = [];
      }
    },
    batchMenus: function() {
      if (this.batchMenus.length == 0) {
        this.batchAdd = false;
      }
    },
    'form.type': function(val){
      this.getParentMenuList();
    }
  },
  methods: {
    //选择上级菜单设置序号值
    setIndex() {
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].id == this.form.parentID) {
          if (this.menus[i].childList && this.menus[i].childList.length > 0) {
            this.setIndexRecursive(this.menus[i].childList);
          } else {
            this.form.index = 10000;
          }
        }
      }
    },
    setIndexRecursive(item) {
      for (let j = 0; j < item.length; j++) {
        let snLength = item.length - 1;
        this.form.index = item[snLength].index + 10000;
        if (item[j].id == this.form.parentID) {
          if (item[j].childList && item[j].childList.length > 0) {
            this.setIndexRecursive(item[j].childList);
          } else {
            this.form.index = 10000;
          }
        }
      }
    },
    //保存功能选择
    powerSubmit(callback) {
      this.powerName = this.$refs.powerEdit.powerName;
      this.form.powerID = this.$refs.powerEdit.replaceMenuName;
      this.isEdit.powerID = '';
      this.powerDialogVisible = false;
      callback();
    },
    removeFunction(item, index, id) {
      for (let j = 0; j < item.length; j++) {
        if (id == item[j].id) {
          item.splice(index, 1);
          break;
        }
        if (item[j].childList && item[j].childList.length > 0) {
          this.removeFunction(item[j].childList, index, id);
        }
      }
    },
    //删除菜单
    removeMenu(index, id, level) {
      this.$confirm('确认删除？', '提示', { type: 'warning' })
        .then(_ => {
          this.$ajax
            .get(this.$globalData.get('base', 'apiUrl').menu.DELETE, {
              id: id
            })
            .then(r => {
              if (r.resultCode == 200) {
                for (let i = 0; i < this.menus.length; i++) {
                  if (id == this.menus[i].id) {
                    this.menus.splice(index, 1);
                    break;
                  }
                  if (this.menus[i].childList && this.menus[i].childList.length > 0) {
                    this.removeFunction(this.menus[i].childList, index, id);
                  }
                }
                if (level == 2) {
                  this.threeList = '';
                } else if (level == 3) {
                  this.fourList = '';
                }
                this.$message.success('删除成功');
                this.$refs.form.resetFields();
                this.isEdit = {};
              } else {
                this.$message.error(r.msg);
              }
            });
        })
        .catch(_ => {});
    },
    setIsBgActive(item) {
      for (let j = 0; j < item.length; j++) {
        this.$set(item[j], 'isBgActive', false);
      }
    },
    //编辑菜单
    editMenu(menu, level) {
      this.currentMenu = menu;
      this.isEdit = {
        isView: true,
        powerID: this.currentMenu.powerID
      };
      this.batchAdd = false;
      this.powerName = menu.powerName;
      var newObj = Object.deepClone(menu);
      this.form = newObj;
      this.form.directoryID = this.directoryID;
      if (level < 3) {
        for (let i = 0; i < this.menus.length; i++) {
          this.$set(this.menus[i], 'isBgActive', false);
          if (this.menus[i].childList) {
            this.setIsBgActive(this.menus[i].childList);
          }
        }
      }
      if (level == 1) {
        this.threeList = '';
        this.fourList = '';
      } else if (level == 2) {
        this.threeList = menu;
        this.fourList = '';
      } else if (level == 3) {
        this.setIsBgActive(this.threeList.childList);
        this.fourList = menu;
      } else if (level == 4) {
        this.setIsBgActive(this.fourList.childList);
      }
      if (!this.currentMenu.isBgActive) {
        this.$set(menu, 'isBgActive', true);
        //this.$set(menu, 'active', true);
      } else {
        this.$set(menu, 'isBgActive', true);
        //this.$set(menu, 'active', false);
      }
    },
    //获取上级菜单列表
    getParentMenuList() {
      if (this.form.type > 1) {
        this.$ajax
          .get(this.$globalData.get('base', 'apiUrl').menu.GET_PARENT_LIST, {
            type: this.form.type,
            id: this.form.directoryID
          })
          .then(r => {
            if (r.resultCode == 200) {
              this.parentMenu = r.data;
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch();
      } else {
        this.parentMenu = [];
      }
    },
    //获取功能选择列表
    powerSelect() {
      this.powerDialogTitle = '功能选择';
      this.powerDialogVisible = true;
      this.isEdit.isView = true;
      this.$nextTick(function() {
        this.$refs.powerEdit.selectPower();
      });
    },
    clearMenu(){
      this.powerName = '';
    },
    getEditMenu(item, form, id) {
      if (item.length > 0) {
        for (let j = 0; j < item.length; j++) {
          if (form.id == item[j].id) {
            item[j].id = form.id;
            item[j].name = form.name;
            item[j].type = form.type;
            item[j].powerID = form.powerID;
            item[j].parentID = form.parentID;
            item[j].powerName = this.powerName;
            break;
          }
          if (item[j].childList && item[j].childList.length > 0) {
            this.getEditMenu(item[j].childList, form, id);
          }
        }
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        var link = '';
        let formInfo = '';
        if (!this.isEdit.isView) {
          this.form.id = '';
        }
        if (this.form.type == '1') {
          this.$set(this.form, 'parentID', '');
        }
        if (this.batchAdd == true) {
          link = this.$globalData.get('base', 'apiUrl').menu.ADD_BATCH;
          for (let i = 0; i < this.batchMenus.length; i++) {
            if (this.batchMenus[i].name != '' && this.batchMenus[i].name != this.form.name) {
              let index = this.form.index + 10000;
              this.batchMenus[i].index = index;
              this.form.index = index;
            } else if (this.batchMenus[i].name == '') {
              this.batchMenus.splice(i + 1, 1);
            } else {
              this.$message.error('菜单名称重复');
              return;
            }
          }
          this.batchMenus.push({
            name: this.form.name,
            index: this.form.index
          });
          this.batchFrom.menus = this.batchMenus;
          this.batchFrom.parentID = this.form.parentID;
          this.batchFrom.directoryID = this.form.directoryID;
          this.batchFrom.type = this.form.type;
          formInfo = this.batchFrom;
        } else {
          link = this.$globalData.get('base', 'apiUrl').menu.EDIT;
          formInfo = this.form;
        }
        if (valid) {
          this.$ajax
            .post(link, formInfo)
            .then(data => {
              if (data.resultCode == 200) {
                this.$message.success('保存成功');
                this.isEdit = {};
                this.batchMenus = [];
                if (this.batchAdd || formInfo.id == '') {
                  this.getDirectoryMenuList(this.directoryID);
                } else {
                  for (let j = 0; j < this.menus.length; j++) {
                    if (this.form.id == this.menus[j].id) {
                      this.menus[j].id = this.form.id;
                      this.menus[j].name = this.form.name;
                      this.menus[j].type = this.form.type;
                      this.menus[j].powerID = this.form.powerID;
                      this.menus[j].parentID = this.form.parentID;
                      this.menus[j].powerName = this.powerName;
                      break;
                    }
                    if (this.menus[j].childList && this.menus[j].childList.length > 0) {
                      this.getEditMenu(this.menus[j].childList, this.form, data.data.id);
                    }
                  }
                }
                this.$refs.form.resetFields();
                this.powerName = '';
                this.form.index = this.menus[this.menus.length - 1].index + 10000;
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch();
        } else {
          this.$message.error('请填写完整');
        }
      });
    },
    delMenu(index) {
      this.batchMenus.splice(index, 1);
    },
    //添加菜单
    addMenu() {
      this.batchMenus.push({
        name: ''
      });
    },
    //系统菜单结构列表
    getDirectoryMenuList(id) {
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').menu.GET_LIST, {
          id: id
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.menus = r.data;
            for (let i = 0; i < r.data.length; i++) {
              let item = r.data[i];
              this.allMenus.push({
                id: item.id,
                name: item.name
              });
              this.form.index = r.data[i].index + 10000;
              if (item.childList && item.childList.length > 0) {
                this.getAllMenu(item.childList);
              }
            }
          } else {
            this.$message.error(r.msg);
          }
        });
    },
    getAllMenu(item) {
      if (item.length > 0) {
        for (let j = 0; j < item.length; j++) {
          let item2 = item[j];
          this.allMenus.push({
            id: item2.id,
            name: item2.name
          });
          this.form.index = item2.index + 10000;
          if (item2.childList && item2.childList.length > 0) {
            this.getAllMenu(item2.childList);
          }
        }
      }
    },
    sortIndex(upperLevelIndex, nextLevelIndex, current) {
      if (upperLevelIndex > 0 && nextLevelIndex > 0) {
        this.form.index = (nextLevelIndex + upperLevelIndex) / 2;
      } else if (upperLevelIndex == 0 && nextLevelIndex > 0) {
        this.form.index = nextLevelIndex / 2;
      } else if (upperLevelIndex > 0 && nextLevelIndex == 0) {
        this.form.index = upperLevelIndex + 10000;
      } else if (upperLevelIndex == 0 && nextLevelIndex == 0) {
        this.form.index = current.index + 10000;
      }
    },
    setMenuIndex(item, current) {
      for (let i = 0; i < item.length; i++) {
        let nextLevelIndex = 0;
        let upperLevelIndex = 0;
        let id = item[i].id;
        if (id == current.id) {
          if (item[i]) {
            upperLevelIndex = item[i].index;
          }
          if (item[i + 1]) {
            nextLevelIndex = item[i + 1].index;
          }
          this.sortIndex(upperLevelIndex, nextLevelIndex, current);
          break;
        }
        if (item[i].childList && item[i].childList.length > 0) {
          this.setMenuIndex(item[i].childList, current);
        }
      }
    },
    //enter 键
    keypresEnter(menu, current, level, index) {
      for (let i = 0; i < this.menus.length; i++) {
        let nextLevelIndex = 0;
        let upperLevelIndex = 0;
        let id = this.menus[i].id;
        if (id == current.id) {
          if (this.menus[i]) {
            upperLevelIndex = this.menus[i].index;
          }
          if (this.menus[i + 1]) {
            nextLevelIndex = this.menus[i + 1].index;
          }
          this.sortIndex(upperLevelIndex, nextLevelIndex, current);
          break;
        }
        if (this.menus[i].childList && this.menus[i].childList.length > 0) {
          for (let j = 0; j < this.menus[i].childList.length; j++) {
            this.setMenuIndex(this.menus[i].childList, current);
          }
        }
      }
      //        let name = '一级菜单';
      //        if (level == 2) {
      //          name = '二级菜单';
      //        } else if (level == 3) {
      //          name = '三级菜单';
      //        } else if (level == 4) {
      //          name = '四级菜单';
      //        }
      if (!this.currentMenu.isActive) {
        menu.splice(index + 1, 0, {
          id: '',
          name: '',
          parentID: menu[0].parentID,
          type: level,
          index: this.form.index,
          isActive: true
        });
        this.currentMenu = menu[index + 1];
      } else {
        this.saveMenu(this.currentMenu);
      }
    },
    //tab 键
    keypresTab(menu, level) {
      if (menu.childList && menu.childList.length > 0) {
        let childLength = menu.childList.length - 1;
        this.form.index = menu.childList[childLength].index + 10000;
      } else {
        this.form.index = 10000;
      }
      this.$set(menu, 'isBgActive', true);
      this.$set(menu, 'active', true);
      if (!menu.isActive) {
        let index = 1;
        if (menu.childList && menu.childList.length > 0) {
          index = menu.childList.length + 1;
        } else {
          menu.childList = [];
        }
        //          let name = '二级菜单';
        //          if (level == 2) {
        //            name = '三级菜单';
        //          } else if (level == 3) {
        //            name = '四级菜单';
        //          }
        level = parseInt(level) + 1;
        menu.childList.splice(index, 0, {
          id: '',
          name: '',
          parentID: menu.id,
          type: String(level),
          index: this.form.index,
          isActive: true
        });
        this.currentMenu = menu.childList[parseInt(index) - 1];
      }
    },
    saveMenu(menu) {
      menu.isActive = false;
      var newObj = Object.deepClone(menu);
      this.form = newObj;
      this.form.directoryID = this.directoryID;
      this.$ajax
        .post(this.$globalData.get('base', 'apiUrl').menu.EDIT, this.form)
        .then(data => {
          if (data.resultCode == 200) {
            this.$message.success('保存成功');
            menu.id = data.data.id;
            this.isEdit = {};
            this.$refs.form.resetFields();
            this.powerName = '';
          } else {
            this.$message.error(data.msg);
            this.$set(menu, 'isActive', true);
            this.$set(menu, 'isBgActive', true);
          }
        })
        .catch();
    },
    setIsSelect(item) {
      for (let j = 0; j < item.length; j++) {
        this.$set(item[j], 'isBgActive', false);
        if (item[j].childList && item[j].childList.length > 0) {
          this.setIsSelect(item[j].childList);
        }
      }
    },
    //清楚全部选中
    setAllIsBgActive() {
      for (let j = 0; j < this.menus.length; j++) {
        this.$set(this.menus[j], 'isBgActive', false);
        if (this.menus[j].childList && this.menus[j].childList.length > 0) {
          this.setIsSelect(this.menus[j].childList);
        }
      }
    },
    getSearch(item, item2) {
      for (let j = 0; j < item.length; j++) {
        this.$set(item[j], 'isBgActive', false);
        let searchItem = {
          parent: item2,
          ref: item[j]
        };
        if (this.searchMenu == item[j].id) {
          if (item[j].type == 3) {
            this.threeList = item2.ref;
            this.fourList = '';
          }
          if (item[j].type == 4) {
            if (searchItem.parent.parent.ref) {
              this.$set(searchItem.parent.parent.ref, 'isBgActive', true);
            }
            this.threeList = item2.parent.ref;
            this.fourList = item2.ref;
          }
          if (searchItem.parent.ref) {
            this.$set(searchItem.parent.ref, 'isBgActive', true);
          }
          if (searchItem.ref) {
            this.$set(searchItem.ref, 'isBgActive', true);
          }
          this.$set(item[j], 'isBgActive', true);
          break;
        }
        if (item[j].childList && item[j].childList.length > 0) {
          this.getSearch(item[j].childList, searchItem);
        }
      }
    },
    //搜索菜单
    search() {
      this.threeList = '';
      this.fourList = '';
      if (this.searchMenu != '') {
        this.setAllIsBgActive();
        for (let i = 0; i < this.menus.length; i++) {
          this.$set(this.menus[i], 'isBgActive', false);
          if (this.searchMenu == this.menus[i].id) {
            this.$set(this.menus[i], 'isBgActive', true);
            break;
          }
          if (this.menus[i].childList && this.menus[i].childList.length > 0) {
            this.getSearch(this.menus[i].childList, this.menus[i]);
          }
        }
      }
    },
    fetchData(query, search) {
      search(
        this.allMenus.filter(o => {
          return o.name.indexOf(query) >= 0;
        })
      );
    },
    //双击事件
    levelDblclick(menu) {
      if (!menu.isActive) {
        this.$set(menu, 'isActive', true);
        this.$set(menu, 'isSelected', false);
      }
    },
    //失去焦点事件
    changeLevel(menu) {
      if (menu.isActive == true) {
        this.saveMenu(menu);
      }
    }
  },
  mounted() {
    let query = this.$route.query || {};
    this.directoryID = query.id;
    this.form.directoryID = query.id;
    this.getDirectoryMenuList(this.directoryID);
  }
};
</script>

<style rel='stylesheet/less' lang='less' scoped>
@import '../../assets/css/config';

.cjm-page-router {
  min-width: 1200px;
}

.menu-list {
  float: left;
  border-left: 1px #cbd5df solid;
  height: 610px;
}

.menu-1 {
  float: left;
  margin: 20px 0px 0px 70px;
  width: 230px;
  height: 540px;
  background-color: #fff;
  border: 1px #f0f0f0 solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  z-index: 10;
  position: relative;
  overflow: hidden;
}

.level1-menu {
  float: left;
  clear: both;
  padding: 5px 0;
  width: 100%;
}

.add {
  margin-top: 7px;
  float: left;
  cursor: pointer;
  color: #22a1ff;
}

.cjm-icon-close {
  display: none;
}

.level1-menu:hover {
  background-color: #eff2f7;
}

.level1-menu:hover input {
  background-color: #eff2f7;
}

.level1-menu:hover .cjm-icon-close {
  display: block;
}

.level1-input {
  float: left;
}

.level-1 {
  font-size: 14px;
  width: 100%;
  font-weight: bold;
  color: #000;
  clear: both;
  padding-top: 20px;
}

.level-1 > li {
  width: 100%;
  cursor: pointer;
  clear: both;
  float: left;
}

.level-1-name {
  float: left;
  width: 160px;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  padding: 5px 0;
}

.level-2 {
  clear: both;
  display: none;
}

.level-2 > li {
  font-size: 14px;
  color: #a9a9a9;
  font-weight: 100;
  padding: 5px 0 5px 0px;
  cursor: pointer;
  clear: both;
  float: left;
  width: 100%;
}

.level-2 > li:hover {
  background-color: #eff2f7;
}

.level-2 > li:hover i {
  display: block;
}

.level-2 > li:hover input {
  background-color: #eff2f7;
}

.level-2-name {
  width: 160px;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  float: left;
  padding: 5px 0 5px 32px;
  color: #a49696;
  user-select: none;
}

.level-2 > li.active {
  background-color: #e5e9f2;
}

.menu-2 {
  float: left;
  margin: 20px 0px 0px -5px;
  width: 230px;
  height: 540px;
  background-color: #fafbfc;
  border: 1px #f2f2f2 solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  z-index: 9;
  position: relative;
  display: block;
  overflow: hidden;
}

.level-3 {
  padding-top: 40px;
}

.level-3 > li {
  color: #808080;
  font-size: 14px;
  padding: 5px 0;
  cursor: pointer;
  clear: both;
  float: left;
  width: 100%;
}

.level-3 > li input {
  background-color: #fafafa;
}

.level-3 > li.active {
  background-color: #e5e9f2;
}

.level-3 > li:hover {
  background-color: #eff2f7;
}

.level-3 > li:hover input {
  background-color: #eff2f7;
}

.level-3 > li:hover i {
  display: block;
}

.level-3-name {
  padding-left: 40px;
}

.menu-3 {
  float: left;
  margin: 20px 0px 0px -5px;
  width: 230px;
  height: 540px;
  background-color: #fafbfc;
  border: 1px #ededed solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  z-index: 8;
  position: relative;
  overflow: hidden;
}

.level-4 {
  padding-top: 40px;
}

.level-4 > li {
  color: #808080;
  font-size: 14px;
  padding: 5px 0;
  clear: both;
  float: left;
  width: 100%;
}

.level-4 > li:hover {
  background-color: #eff2f7;
}

.level-4 > li:hover input {
  background-color: #eff2f7;
}

.level-4 > li:hover .active {
  background-color: #e5e9f2;
}

.level-4 > li.active {
  background-color: #e5e9f2;
}

.level-4-name {
  padding-left: 40px;
}

.del-menu {
  float: left;
  cursor: pointer;
  color: #27a3ff;
  padding-top: 7px;
}

.arrow-bottom {
  float: left;
  margin: 8px 5px 0 12px;
  color: #acb7c4;
  font-size: 12px;
}

.level-2 > li.active {
  background-color: #e5e9f2;
}

.level-2 > li.active:hover {
  background-color: #eff2f7;
}

.level-3-name {
  padding-left: 40px;
}

.add-menu {
  width: 400px;
  float: left;
  padding-top: 58px;
}

.level-4 > li input {
  background-color: #fafbfc;
}

.active {
  background-color: #e5e9f2;
}

.level1active {
  border: 1px #ccc solid;
  padding: 5px 0;
  background-color: #fff;
  user-select: none;
}

.level1active:hover {
  background-color: #fff;
}

.level2active {
  background-color: #fff;
  border: 1px #ccc solid;
  padding-top: 5px;
  padding-bottom: 5px;
}

.level-3 > li .level3-active {
  background-color: #fff;
  border: 1px #ccc solid;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 5px;
}

.level-3 > li .level3-active:hover {
  background-color: #fff;
}

.level-2 > li.active:hover {
  background-color: #eff2f7;
}

.active-show {
  display: block;
}

.level1active {
  border: 1px #ccc solid;
}

.cjm-form .el-form-item.common-label {
  width: 290px;
  clear: both;
}
.common-label {
  width: 290px;
  clear: both;
}
.batch-add-item {
  width: 100px;
  float: left;
  padding: 6px 0px 0px 0;
}

.level-2 {
  clear: both;
  display: none;
}

.level-2 > li.active:hover {
  background-color: #eff2f7;
}

.level-3-name {
  padding-left: 40px;
}

.active-show {
  display: block;
}

.level-2-name.active {
  background-color: #e5e9f2;
}

.level-2-name.active.level2active {
  background-color: #fff;
}

.level-1-name.active.level1active {
  background-color: #fff;
}

.level-4 > li .level3-active {
  background-color: #fff;
  border: 1px #ccc solid;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 5px;
}

.level-4 > li .level3-active:hover {
  background-color: #fff;
}

.level-4 > li:hover i {
  display: block;
}

.del-icon {
  padding-left: 20px;
  cursor: pointer;
  display: block;
  float: left;
  margin-top: 12px;
  color: #22a1ff;
}

.add-btn {
  padding-right: 5px;
}

.search-select {
  float: right;
  margin-right: -3px;
}

.search1 .el-select .el-input__inner {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}

.search {
  float: right;
  height: 36px;
  width: 48px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  border: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #20a0ff;
  cursor: pointer;
}

::placeholder {
  color: #dedede;
}
.clear-icon {
  color: #cccccc;
  cursor: pointer;
  display: block;
}
</style>
