<template>
  <div>
    <nz-button type="text" @click="orderDetail">订单详情</nz-button>
    <nz-button type="text" @click="deliver">发货</nz-button>
  </div>
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
      orderDetail(){
        console.log(this.data);
      },
      deliver(){
        console.log(this.data);
        window.open('#/main/deliver?id=456')
      }
    }
  }
</script>
