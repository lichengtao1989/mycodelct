<template>
  <div class="form-item-border">
    <nz-input placeholder="请输入内容" v-model="menuFilterText"></nz-input>
    <nz-tree v-if="isRender" style="margin-top: 17px" ref="menuTree" node-key="powerID" @check-change="onCheckChange" show-checkbox default-expand-all check-on-click-node :data="menuData" :props="{label:'powerName'}" accordion :filter-node-method="menuFilter"></nz-tree>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Array, required: true },
    menuData: { type: Object, required: true }
  },
  data() {
    return {
      val: [],
      isRender: true,
      menuFilterText: ''
    };
  },
  computed: {
    valJSON() {
      const val = Object.jsonClone(this.val);
      const valSort = val.sort(function(a1, a2) {
        return a1 > a2 ? 1 : -1;
      });
      return JSON.stringify(valSort);
    }
  },
  watch: {
    async menuData() {
      this.isRender = false;
      await this.$nextTick();
      this.isRender = true;
      await this.$nextTick();
      this.setVal(this.value);
      this.initMenuTree();
    },
    async menuFilterText() {
      await this.$nextTick();
      this.$refs.menuTree.filter(this.menuFilterText);
      await this.$nextTick();
      this.$emit('heightChange');
    },
    valJSON() {
      this.setValue(this.val);
    },
    value: {
      handler: function() {
        this.setVal(this.value);
      },
      deep: true
    }
  },
  methods: {
    menuFilter(value, data) {
      if (!value) {
        return true;
      }
      return data.powerName.indexOf(value) !== -1;
    },
    onCheckChange() {
      const keys = this.$refs.menuTree.getCheckedKeys();
      const newVal = this.keys2val(keys);
      this.setVal(newVal);
    },
    isParentPowerID(powerID) {
      let result = false;
      this.menuData.forEach(item => {
        if (item.powerID == powerID && item.children && item.children.length > 0) {
          result = true;
        }
      });
      return result;
    },
    isChildPowerID(powerID) {
      let result = false;
      this.menuData.forEach(item => {
        if (this.isParentPowerID(item.powerID)) {
          item.children.forEach(child => {
            if (child.powerID == powerID) {
              result = true;
            }
          });
        }
      });
      return result;
    },
    getParentPowerID(powerID) {
      let parentPowerID = '';
      this.menuData.forEach(item => {
        if (this.isParentPowerID(item.powerID)) {
          item.children.forEach(child => {
            if (child.powerID == powerID) {
              parentPowerID = item.powerID;
            }
          });
        }
      });
      return parentPowerID;
    },
    keys2val(keys) {
      const val = [];
      keys.forEach(powerID => {
        val.push(powerID);
        if (this.isChildPowerID(powerID)) {
          const parentPowerID = this.getParentPowerID(powerID);
          if (!this.isInclude(keys, parentPowerID)) {
            val.push(parentPowerID);
          }
        }
      });
      return val;
    },
    val2keys(vals) {
      const keys = vals.filter(powerID => !this.isParentPowerID(powerID));
      return keys;
    },
    isInclude(array, item) {
      return array.filter(aItem => aItem == item).length > 0;
    },
    valsSetFormat(vals) {
      const newVals = [];
      const { menuData } = this;
      vals.forEach(item => {
        if (this.isParentPowerID(item)) {
          const children = menuData.find(menuItem => menuItem.powerID == item).children;
          const isIncludeAll = children.filter(subItem => !this.isInclude(vals, subItem.powerID)).length === 0;
          if (isIncludeAll) {
            newVals.push(item);
          }
        } else {
          newVals.push(item);
        }
      });
      return newVals.map(item => item * 1);
    },
    setVal(vals) {
      this.val = this.valsSetFormat(vals).map(item => item * 1);
    },
    valuesSetFormat(vals) {
      const newVals = [...vals];
      const { menuData } = this;
      menuData.forEach(item => {
        if (!this.isInclude(vals, item.powerID) && this.isParentPowerID(item.powerID)) {
          const hasChildInVal = item.children.filter(child => this.isInclude(vals, child.powerID)).length > 0;
          if (hasChildInVal) {
            newVals.push(item.powerID);
          }
        }
      });
      return newVals.map(item => item * 1);
    },
    setValue(vals) {
      this.$emit('input', this.valuesSetFormat(vals));
    },
    initMenuTree() {
      const keys = this.val2keys(this.val);
      this.$refs.menuTree.setCheckedKeys(keys);
    }
  },
  mounted() {
    this.setVal(this.value);
    this.initMenuTree();
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.form-item-border {
  border: 1px solid #d9d9d9;
  padding: 16px;
  border-radius: 3px;
}
</style>
