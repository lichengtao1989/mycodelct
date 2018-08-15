<template>
  <cjm-select :value="value"
              :placeholder="placeholder"
              :disabled="disabled"
              :clearable="clearable"
              :multiple="multiple"
              @input="inputHandler"
              @change="changeHandler">
    <cjm-option v-for="(value,key) in enumData" :label="key" :value="value" :key="value"></cjm-option>
  </cjm-select>
</template>

<script>
  export default{
    name: 'cjm-enum-select',
    props: {
      value: {
        type: [String, Array],
        required: true
      },
      /**
       * 占位文字
       */
      placeholder: {
        type: String,
        default: ''
      },
      /**
       * 是否禁用
       */
      disabled: {
        type: Boolean
      },
      /**
       * 枚举名称
       */
      enumName: {
        type: String,
        required: true
      },
      /**
       * 枚举命名空间
       */
      enumNamespace: {
        type: String
      },
      /**
       * 是否可清除
       */
      clearable: {
        type: Boolean
      },
      /**
       * 是否可多选
       */
      multiple: {
        type: Boolean
      }
    },
    computed: {
      enumData(){
        if(this.enumNamespace){
          return this.$globalData.get(this.enumNamespace, 'enums')[this.enumName];
        } else {
          return this.$globalData.get('enums')[this.enumName];
        }
      }
    },
    methods: {
      inputHandler(val){
        this.$emit('input', val);
      },
      changeHandler(val){
        this.$emit('change', val);
      }
    }
  }
</script>

<style>

</style>
