<template>
  <div class="el-steps" :class="[
       !simple && 'el-steps--' + direction,
       simple && 'el-steps--simple'
     ]">
    <slot></slot>
  </div>
</template>

<script>
import { Steps } from 'element-ui';
export default {
  name: 'cjm-steps',
  mixins: [Steps],
  props: {
    alignCenter: {
      type: Boolean,
      default: true
    },
    processStatus: {
      type: String,
      default: 'finish'
    },
    finishStatus: {
      type: String,
      default: 'success'
    }
  }
};
</script>
