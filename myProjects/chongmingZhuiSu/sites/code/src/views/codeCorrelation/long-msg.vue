<template>
  <div>
    <cjm-input type="textarea" :rows="15" :readonly="true" :value="text"></cjm-input>
  </div>
</template>
<script>
  export default {
    props: ['text']
  }
</script>
