<template>
  <cjm-select class="cjm-select-multiple" :placeholder="placeholder" @remove-tag="onRemoveTag" :disabled="disabled" v-model="val" multiple>
    <cjm-option label="全选" :value="checlAllID">
      <div class="check-all-option-inner" @click="checkAllToggle">全选</div>
    </cjm-option>
    <cjm-option v-for="(opt,index) in options" :value="opt.id" :key="index" :label="opt.name"></cjm-option>
  </cjm-select>
</template>
<script>
export default {
  name: 'cjm-select-multiple',
  props: {
    value: { type: Array, required: true },
    options: { type: Array, default: [] },
    disabled: Boolean,
    placeholder: { type: String, default: '请选择' }
  },
  data() {
    return {
      val: [],
      checlAllID: 'check-all-id'
    };
  },
  computed: {
    hasOptions() {
      return this.options.length > 0;
    },
    //判断是否已经全选
    isCheckedAll() {
      const allID = this.options.map(opt => opt.id);
      const checkedID = this.val;
      let result = true;
      allID.forEach(id => {
        if (!checkedID.includes(id)) {
          result = false;
        }
      });
      return result;
    },
    //获取所有已选id排除全选id
    realVal() {
      return this.val.filter(id => id != this.checlAllID);
    },
    //判断val和value的元素是否相同
    isValSame() {
      const { value, realVal } = this;
      const valueInVal = !value.find(item => !realVal.includes(item));
      const valInValue = !realVal.find(item => !value.includes(item));
      if (valueInVal && valInValue) {
        return true;
      }
      return false;
    }
  },
  watch: {
    value: {
      handler: function() {
        this.onValueChanged();
      },
      deep: true
    },
    val: {
      handler: function() {
        this.onValChanged();
      },
      deep: true
    }
  },
  methods: {
    //如果删除全选标签,就清空所有已选id
    onRemoveTag(removeID) {
      if (removeID === this.checlAllID) {
        this.clearVal();
      }
    },
    //
    async onValueChanged() {
      await this.$nextTick();
      if (!this.isValSame) {
        this.val = [...this.value];
      }
    },
    //
    async onValChanged() {
      await this.$nextTick();
      this.valFormat();
      if (!this.isValSame) {
        this.$emit('input', [...this.realVal]);
      }
    },
    //清空所有已选择的id
    clearVal() {
      while (this.val.length > 0) {
        this.val.splice(0, 1);
      }
    },
    //选中所有未选的id
    fillVal() {
      this.options.forEach(opt => {
        if (!this.val.includes(opt.id)) {
          this.val.push(opt.id);
        }
      });
    },
    /***
     * 如果已经全选就把全选id加入val
     * 如果没有全选就去掉val中的全选id
     */
    valFormat() {
      if (this.hasOptions && this.isCheckedAll) {
        if (!this.val.includes(this.checlAllID)) {
          this.clearVal();
          this.val.push(this.checlAllID);
          this.fillVal();
        }
      } else {
        if (this.val.includes(this.checlAllID)) {
          this.val.splice(this.val.indexOf(this.checlAllID), 1);
        }
      }
    },
    //切换全选反选
    async checkAllToggle() {
      await this.$nextTick();
      if (this.isCheckedAll) {
        this.clearVal();
      } else {
        this.fillVal();
      }
    }
  },
  created() {
    this.val = [...this.value];
  }
};
</script>
<style rel="stylesheet/less" lang="less">
.cjm-select-multiple {
  .check-all-option-inner {
  }
}
</style>
