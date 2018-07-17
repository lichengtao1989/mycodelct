<template>
  <nz-button type="text" @click="readMsg">知道了</nz-button>
</template>
<script>
  export default {
    props: {
      data: Object
    },
    data(){
      return {};
    },
    methods: {
      readMsg(){
        console.log(this.data);
      }
    }
  }
</script>
