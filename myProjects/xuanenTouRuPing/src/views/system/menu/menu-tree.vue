<template>
  <div v-loading="isLoading" style="min-height: 200px">
    <nz-form-item>
      <nz-button type="text" @click="addMenuItem">
        <i class="nz-icon-add2"></i>新增菜单</nz-button>
      <nz-tree style="width: 425px" node-key="powerID" :data="menuData" :expand-on-click-node="false" :props="{label:'powerName'}" default-expand-all :render-content="renderContent"></nz-tree>
    </nz-form-item>
    <add-menu-dialog ref="addDialog" :powerType="powerType" @save-success="loadMenuData"></add-menu-dialog>
    <edit-menu-dialog ref="editDialog" @save-success="loadMenuData"></edit-menu-dialog>
  </div>
</template>
<script>
import menuItem from './item';
import addMenuDialog from './add-menu-dialog.vue';
import editMenuDialog from './edit-menu-dialog.vue';
import Vue from 'vue';
export default {
  components: { addMenuDialog, editMenuDialog },
  props: ['powerType'],
  data() {
    const localEventBus = new Vue();
    return {
      localEventBus,
      isLoading: false,
      menuData: []
    };
  },
  methods: {
    renderContent(h, { node, data, store }) {
      const isFirstItem = this.isFirstItem(data);
      const isLastItem = this.isLastItem(data);
      return h(menuItem(data, this.localEventBus, isFirstItem, isLastItem));
    },
    isFirstItem(menuItem) {
      let result = false;
      this.menuData.forEach((item, index) => {
        if (item === menuItem && index === 0) {
          result = true;
        } else if (item && item.children && item.children.length > 0) {
          item.children.forEach((subItem, index) => {
            if (subItem === menuItem && index === 0) {
              result = true;
            }
          });
        }
      });
      return result;
    },
    isLastItem(menuItem) {
      let result = false;
      const maxIndex = this.menuData.length - 1;
      this.menuData.forEach((item, index) => {
        if (item === menuItem && index === maxIndex) {
          result = true;
        } else if (item && item.children && item.children.length > 0) {
          const subMaxIndex = item.children.length - 1;
          item.children.forEach((subItem, index) => {
            if (subItem === menuItem && index === subMaxIndex) {
              result = true;
            }
          });
        }
      });
      return result;
    },
    menuDataFormat(data, parentID) {
      const menuData = Object.jsonClone(data);
      menuData.forEach(item => {
        if (parentID) {
          item.parentID = parentID;
        }
        if (item.children) {
          item.children = this.menuDataFormat(item.children, item.powerID);
        }
      });
      return menuData;
    },
    async loadMenuData() {
      this.isLoading = true;
      const menuData = await this.$model('system').menu.getPowerList(this.powerType);
      this.menuData = this.menuDataFormat(menuData);
      this.isLoading = false;
    },
    addMenuItem(parentMenuData) {
      this.$refs.addDialog.show(parentMenuData);
    },
    editMenuItem(data) {
      this.$refs.editDialog.show(data);
    },
    async delMenuItem(data) {
      const result = await this.$message.confirm('确认删除该菜单项?');
      if (result) {
        await this.$model('system').menu.delItem(data.powerID);
        await this.loadMenuData();
      }
    },
    getSort(stutas, data) {
      let sortArray = [];
      let indexVal = 0;
      this.menuData.forEach((menu, index) => {
        if (menu.powerID == data.powerID) {
          sortArray.push({
            powerID: menu.powerID,
            sorting: menu.sorting
          });
          if (stutas == 0) {
            indexVal = index + 1;
          } else {
            indexVal = index - 1;
          }
          sortArray.push({
            powerID: this.menuData[indexVal].powerID,
            sorting: this.menuData[indexVal].sorting
          });
        }
        if (menu.children && menu.children.length > 2) {
          menu.children.forEach((menuChildren, index) => {
            if (menuChildren.powerID == data.powerID) {
              sortArray.push({
                powerID: menuChildren.powerID,
                sorting: menuChildren.sorting
              });
              if (stutas == 0) {
                indexVal = index + 1;
              } else {
                indexVal = index - 1;
              }
              sortArray.push({
                powerID: menu.children[indexVal].powerID,
                sorting: menu.children[indexVal].sorting
              });
            }
          });
        }
      });
      return sortArray;
    },
    async moveUpMenuItem(data) {
      let sortArray = this.getSort(1, data);
      await this.$model('system').menu.sortItem(sortArray, this.powerType);
      await this.loadMenuData();
    },
    async moveDownMenuItem(data) {
      let sortArray = this.getSort(0, data);
      await this.$model('system').menu.sortItem(sortArray);
      await this.loadMenuData();
    }
  },
  async created() {
    await this.loadMenuData();
    this.localEventBus.$on('addMenuItem', this.addMenuItem);
    this.localEventBus.$on('editMenuItem', this.editMenuItem);
    this.localEventBus.$on('moveUpMenuItem', this.moveUpMenuItem);
    this.localEventBus.$on('moveDownMenuItem', this.moveDownMenuItem);
    this.localEventBus.$on('delMenuItem', this.delMenuItem);
  },
  beforeDestroy() {
    this.localEventBus.$off('addMenuItem', this.addMenuItem);
    this.localEventBus.$off('editMenuItem', this.editMenuItem);
    this.localEventBus.$off('moveUpMenuItem', this.moveUpMenuItem);
    this.localEventBus.$off('moveDownMenuItem', this.moveDownMenuItem);
    this.localEventBus.$off('delMenuItem', this.delMenuItem);
    this.localEventBus.$destroy();
  }
};
</script>
