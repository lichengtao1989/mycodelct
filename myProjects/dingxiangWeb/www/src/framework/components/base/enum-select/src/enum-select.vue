<template>
  <!--单选radio-->
  <nz-radio-group v-if="isRadio" v-model="val" :disabled="disabled" :placeholder="placeholder">
    <nz-radio v-for="(item,index) in options" :label="item.value" :key="index">{{item.name}}</nz-radio>
  </nz-radio-group>
  <!--单选按钮组-->
  <nz-radio-group v-else-if="isRadioBtn" v-model="val" :disabled="disabled" :placeholder="placeholder">
    <nz-radio-button v-for="(item,index) in options" :label="item.value" :key="index">{{item.name}}</nz-radio-button>
  </nz-radio-group>
  <!--单选下拉菜单-->
  <nz-select v-else v-model="val" :disabled="disabled" :placeholder="placeholder">
    <nz-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value"></nz-option>
  </nz-select>
</template>
<script>
  import valueComponent from '../../value';
  export default {
    name: 'nz-enum-select',
    mixins: [valueComponent],
    props: {
      isRadio: {type: Boolean, default: false},
      isRadioBtn: {type: Boolean, default: false},
      placeholder: {type: String, default: '请选择'},
      disabled: {type: Boolean},
      /**
       * 选项 数组
       * [
       * {name:'xxx1',value:'yyy1'},
       * {name:'xxx2',value:'yyy2'}
       * ]
       * */
      options: {type: Array, required: true}
    },
    data() {
      return {};
    },
    methods: {},
    created() {
    }
  };
</script>
