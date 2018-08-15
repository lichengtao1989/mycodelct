<template>
  <div class="info-list">
    <info-item label="统一社会信用代码" :text="userInfo.CreditCode"></info-item>
    <info-item label="农资店名称" :text="userInfo.StoreName"></info-item>
    <info-item label="负责人" :text="userInfo.ChargePerson"></info-item>
    <info-item label="手机号" :text="userInfo.PhoneNum"></info-item>
    <info-item label="身份证号" :text="userInfo.IDCode"></info-item>
    <info-item label="经营地址" :text="userInfo.ManageAddress"></info-item>
    <info-item label="状态" :text="statusText(userInfo.StoreStatus)"></info-item>
  </div>
</template>
<script>
  import infoItem from './item.vue';
  export default {
    components: {infoItem},
    data(){
      return {
        userInfo: {}
      }
    },
    methods: {
      statusText(status){
        return ['运行中', '关闭'][status];
      },
      async getUserInfo(){
        const userInfo = await this.$model('user').getLoginUserInfo();
        if (userInfo) {
          this.userInfo = userInfo;
        }
      }
    },
    mounted(){
      this.getUserInfo();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .info-list {
    // margin: 60px 100px;
    position: absolute;top:100px;
    left:50%;
    transform: translateX(-50%);
    font-size: 0;
  }
</style>
