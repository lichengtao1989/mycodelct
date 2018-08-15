<template>
  <cjm-select filterable remote :value="value" :remote-method="getData" :loading="loading" :clearable="true" :placeholder="placeholder" :disabled="disabled" @input="inputHandler" @clear="clearHandler">
    <cjm-option v-for="item in options" :key="item[valueKey]" :label="limit(item[labelKey])" :title="item[labelKey]" :value="item[valueKey]">
      <slot :item="item"></slot>
    </cjm-option>
  </cjm-select>
</template>

<script>
import emitter from '../../../../mixins/emitter';
export default {
  name: 'cjm-remote-select',
  mixins: [emitter],
  data() {
    return {
      options: [],
      loading: false
    };
  },
  props: {
    value: {
      type: String,
      required: true
    },
    /**
     * 显示的值，一般在编辑页面初始化的时候才需要赋值，仅用于一开始的显示
     */
    label: String,
    /**
     * 远程接口地址
     */
    remoteUrl: {
      type: String
    },
    /**
     * 接口参数
     */
    params: {
      type: Object
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean
    },
    /**
     * 占位文字
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * label字数限制
     */
    maxLabelLength: {
      type: Number,
      default: 0
    },
    /**
     * 获取数据的方法
     */
    fetchData: {
      type: Function,
      default: function(query, callback, params) {
        let queryParams = {
          pageSize: 50,
          ...(params || {})
        };
        queryParams[this.queryKey] = query;
        this.$ajax
          .get(this.remoteUrl, queryParams)
          .then(r => {
            if (r.resultCode == '200') {
              callback(r.data);
            } else {
              callback();
            }
          })
          .catch(() => {
            callback();
          });
      }
    },
    /**
     * options中value的key
     */
    valueKey: {
      type: String,
      default: 'id'
    },
    /**
     * options中label的key
     */
    labelKey: {
      type: String,
      default: 'name'
    },
    /**
     * 远程接口中模糊搜索的键值，默认为inputValue
     */
    queryKey: {
      type: String,
      default: 'inputValue'
    }
  },
  methods: {
    limit(val) {
      if (this.maxLabelLength == 0 || val.length <= this.maxLabelLength) {
        return val;
      } else {
        return val.substr(0, this.maxLabelLength) + '...';
      }
    },
    getData(query) {
      this.loading = true;
      this.fetchData(
        query,
        data => {
          this.loading = false;
          this.options = data || [];
        },
        this.params
      );
    },
    inputHandler(val) {
      this.$emit('input', val);

      if (val) {
        let item = this.options.find(option => {
          return option[this.valueKey] === val;
        });
        this.$emit('select', item);
      } else {
        this.$emit('select', null);
      }
    },
    clear() {
      this.options = [];
    },
    clearHandler(val){
      this.$emit('clear', val);
    }
  },
  watch: {
    label(val) {
      if (val != '' || val != undefined) {
        this.$nextTick(() => {
          let option = {};
          option[this.valueKey] = this.value;
          option[this.labelKey] = this.label;
          this.options = [option];
        });
      }
    },
    params: {
      handler() {
        this.options = [];
      },
      deep: true
    }
  },
  created() {
    if (this.label) {
      let option = {};
      option[this.valueKey] = this.value;
      option[this.labelKey] = this.label;
      this.options = [option];
    }
  }
};
</script>

<style>
</style>
