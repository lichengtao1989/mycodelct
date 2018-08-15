<template>
  <nz-select :loading="loading" v-model="val" @focus="onFocus" @input="inputHandler" filterable remote clearable :remote-method="getData" :placeholder="placeholder" :disabled="disabled">
    <nz-option v-for="item in options" :key="item[valueKey]" :label="item[labelKey]" :itemVlaue="item" :value="item[valueKey]">
      <slot :item="item"></slot>
    </nz-option>
  </nz-select>
</template>
<script>
import valueComponent from '../../value';
export default {
  name: 'nz-remote-select',
  mixins: [valueComponent],
  props: {
    remoteUrl: { type: String },
    params: { type: Object },
    queryKey: { type: String, default: 'keyWord' },
    /**
     * 显示的值，一般在编辑页面初始化的时候才需要赋值，仅用于一开始的显示
     */
    label: String,
    /**
     * 是否禁用
     */
    disabled: { type: Boolean },
    /**
     * 占位文字
     */
    placeholder: { type: String, default: '请选择' },
    /**
     * options中value的key
     */
    valueKey: { type: String, default: 'id' },
    /**
     * options中label的key
     */
    labelKey: { type: String, default: 'name' },
    itemValue: { type: Object },
    /**
     * 获取数据的方法
     */
    fetchData: {
      type: Function,
      default: async function(query, callback) {
        const { remoteUrl, params = {}, queryKey } = this;
        const queryParams = { ...params };
        queryParams[queryKey] = query;
        const { err, res } = await this.$ajax.get(remoteUrl, queryParams);
        await this.$sleep(200);
        this.loading = false;
        if (err) {
          callback();
        }
        if (res.resultCode == '200') {
          callback(res.data);
        } else {
          callback();
        }
      }
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
    }
  },
  data() {
    return {
      loading: false,
      options: []
    };
  },
  methods: {
    onFocus() {
      if (this.options.length === 0) {
        this.getData('');
      }
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
    async getData(query) {
      const { remoteUrl, params = {}, queryKey } = this;
      const queryParams = { ...params };
      queryParams[queryKey] = query;
      this.loading = true;
      const { err, res } = await this.$ajax.get(remoteUrl, queryParams);
      await this.$sleep(200);
      this.loading = false;
      let data = [];
      if (!err && res.data) {
        data = res.data;
      }
      this.options = data;
      // this.fetchData(query, data => {
      //   this.loading = false;
      //   this.options = data || [];
      // });
    }
  }
};
</script>
