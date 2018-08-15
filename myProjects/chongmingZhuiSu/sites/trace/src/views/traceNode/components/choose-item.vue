<template>
  <div>
    <cjm-form-item label="可用信息" class="cjm-form-item-long">
      <cjm-button v-for="(item,index) in options" :type="buttonType(item)" :key="index" @click="changeState(item)">
        {{initBtnName(item)}}
        <i class="cjm-icon-delete delete" @click.stop="deleteOption(item,index)" v-if="index>3"></i>
      </cjm-button>
      <cjm-button type="defalut" @click="addOption">
        <i class="cjm-icon-add"></i>新增字段</cjm-button>
    </cjm-form-item>
    <cjm-form-item class="cjm-rule-title" label="批次时间控制:">
      <cjm-radio v-model="dateType" label="0">
        默认时间
      </cjm-radio>
      <cjm-radio v-model="dateType" label="1">
        自定义时间 增加
        <cjm-input @input="addDaysOption" :disabled="dateType == 0" :value="item.optionValue.addDay" class="add-days"></cjm-input>
        天
      </cjm-radio>
    </cjm-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnName: '',
      dateType: '0'
    };
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    buttonType(item) {
      if (item.required === '1') {
        return 'primary';
      }
      return 'default';
    },
    initBtnName(item) {
      if (item.tabType === 1) {
        return '产品名称';
      }
      if (item.tabType === 2) {
        return '新建日期';
      }
      if (item.tabType === 3) {
        return '流水号';
      }
      if (item.tabType === 4) {
        return '节点名称';
      }
      if (item.tabType === 5) {
        return '固定文字';
      }
      console.log(item);
    },
    changeState(item) {
      if (item.required === '1') {
        item.required = '0';
        item.sortID = -1;
      } else {
        item.required = '1';
        item.sortID = 99;
      }
      this.$emit('createOption', this.options);
    },
    deleteOption(item, index) {
      this.options.splice(index, 1);
    },
    addOption() {
      let tabOption = {
        required: '1',
        sortID: 999,
        tabType: 5,
        tabValue: '固定文字'
      };
      this.options.push(tabOption);
    },
    addDaysOption(val) {
      this.item.optionValue.addDay = val;
      if (val !== '') {
        this.dateType = '1';
        if (val > 31) {
          val = 31;
        }
      } else {
        this.dateType = '0';
      }
      this.$nextTick(() => {
        this.item.optionValue.addDay = val;
      });
    }
  },
  mounted() {
    //      console.log(this.item)
    if (this.item.optionValue.addDay === 0 || this.item.optionValue.addDay === '') {
      this.dateType = '0';
    } else if (this.item.optionValue.addDay > 0) {
      this.dateType = '1';
    }
  },
  watch: {
    dateType(newVal) {
      if (newVal === '1' && this.item.optionValue.addDay == 0) {
        this.item.optionValue.addDay = 1;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.choose-list li {
  float: left;
  margin-right: 10px;
}

.el-button {
  position: relative;
  margin-bottom: 10px;
  margin-left: 10px;
}

.el-button:hover .delete {
  display: block;
}

.delete {
  display: none;
  position: absolute;
  right: -3px;
  top: 2px;
  color: #fff;
  font-size: 12px;
}

.add-days {
  width: 50px;
}

.cjm-rule-title .el-radio + .el-radio {
  margin-left: 0 !important;
}
</style>
