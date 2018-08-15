<template>
  <nz-button type="text" @click="viewDetail">详情</nz-button>
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
      viewDetail(){
        window.open('#/main/stock?id=' + this.data.Id);
      }
    }
  }
</script>
