<template>
  <div>
    <nz-button type="text" @click="orderDetail">订单详情</nz-button>
    <nz-button type="text" @click="deliver">发货</nz-button>
    <view-detail ref="dialog"></view-detail>
  </div>
</template>
<script>
  import viewDetail from '../../deliver/detail.vue'
  export default {
    components: {viewDetail},
    props: {
      data: Object
    },
    data(){
      return {};
    },
    methods: {
      orderDetail(){
        this.$refs.dialog.show(this.data);
      },
      deliver(){
        const {ID} = this.data;
        window.open('#/main/deliver?id=' + ID)
      }
    }
  }
</script>
