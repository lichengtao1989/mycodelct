<template>
  <nz-cascader v-model="val" :options="options" :props="props" :clearable="clearable" @active-item-change="onActiveItemChange"></nz-cascader>
</template>
<script>
  import setting from 'framework/setting.js';
  export default {
    name: 'nz-region-select',
    props: {
      value: {type: String, required: true},
      clearable: {type: Boolean, default: true}
    },
    data(){
      const {getRegion} = setting.get();
      return {
        getRegion,
        val: [],
        options: []
      };
    },
    watch: {
      val: {
        handler: function () {
          this.onValChange();
        }, deep: true
      },
      value(){
        this.onValueChange();
      }
    },
    methods: {
      onValChange(){
        this.$emit('input', this.val[this.val.length - 1] || '');
      },
      onValueChange(){
        this.value2val();
      },
      async value2val(){
        const val = [];
        const valueSplit = this.value.split('');
        if (valueSplit[0] && valueSplit[1]) {
          val[0] = valueSplit[0] + valueSplit[1];
          this.getMatchOpt(this.options, val[0]).children = await this.getOptions(val[0]);
        }
        if (val[0] && valueSplit[2] && valueSplit[3]) {
          val[1] = val[0] + valueSplit[2] + valueSplit[3];
          this.getMatchOpt(this.options, val[1]).children = await this.getOptions(val[1]);
        }
        if (val[1] && valueSplit[4] && valueSplit[5]) {
          val[2] = val[1] + valueSplit[4] + valueSplit[5];
          this.getMatchOpt(this.options, val[2]).children = await this.getOptions(val[2], null);
        }
        if (val[2] && valueSplit[6] && valueSplit[7] && valueSplit[8]) {
          val[3] = val[2] + valueSplit[6] + valueSplit[7] + valueSplit[8];
          this.getMatchOpt(this.options, val[3]).children = null;
        }
        if (val.length > 0) {
          this.val = [...val];
        }
      },
      async onActiveItemChange($event){
        const activeItems = [...$event];
        const activeValue = activeItems[activeItems.length - 1];
        const activeItem = this.getMatchOpt(this.options, activeValue);
        let children = null;
        if (activeItems.length == 3) {
          this.val = activeItems;
          children = await this.getOptions(activeValue, null);
        } else if (activeItems.length == 4) {
          this.val = activeItems;
        } else {
          children = await this.getOptions(activeValue);
        }
        activeItem.children = children;
        if (!children || children.length === 0) {
          this.val = activeItems;
        }
      },
      getMatchOpt(options, value){
        let matchOpt = null;
        options.forEach(item => {
          if (!matchOpt) {
            if (item.value === value) {
              matchOpt = item;
            } else if (item.children && item.children.length > 0) {
              matchOpt = this.getMatchOpt(item.children, value);
            }
          }
        });
        return matchOpt;
      },
      async getOptions(parentValue, children = []){
        const data = await this.getRegion(parentValue);
        const options = data.map(item => {
          const {location: label, regionCode: value} = item;
          return {label, value, children};
        });
        return options;
      }
    },
    async created(){
      const options = await this.getOptions();
      this.options = options;
      await this.value2val();
    }
  }
</script>
