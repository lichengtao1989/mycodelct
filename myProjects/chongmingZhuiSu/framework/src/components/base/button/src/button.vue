<template>
  <button
    v-if="visible"
    class="el-button"
    @click="handleClick"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading" @click="handleInnerClick"></i>
    <i :class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
    <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>

<script>
  import {Button} from 'element-ui'
  export default {
    name: 'cjm-button',
    mixins: [
      Button
    ],
    props: {
      /**
       * 权限码
       */
      powerCode: String
    },
    computed: {
      visible(){
        if (this.powerCode) {
          return this.hasPower(this.powerCode);
        }
        return true;
      }
    },
    methods: {
      hasPower(powerCode){
        const powerCodes = this.$globalData.get('powerCodes');
        if (!powerCodes || powerCodes.length === 0) {
          return false;
        }
        return powerCodes.includes(powerCode.toLowerCase());
      }
    }
  }
</script>
