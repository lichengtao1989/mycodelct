<template>
  <div class="info-list">
    <info-item label="生产主体" :text="info.ProductMainPart"></info-item>
    <info-item label="负责人" :text="info.ChargePerson"></info-item>
    <info-item label="手机号" :text="info.PhoneNum"></info-item>
    <info-item label="身份证号" :text="info.ChargePersonIDCode"></info-item>
    <info-item label="乡镇" :text="info.Town"></info-item>
    <info-item label="村组" :text="info.Village"></info-item>
    <info-item label="合同面积" :text="area(info.ContractArea)"></info-item>
    <info-item label="种植面积" :text="area(info.ActuralArea)"></info-item>
    <info-item label="种植产品" :text="info.Crop"></info-item>
    <info-item label="认证情况" :text="info.AuthStatus"></info-item>
    <info-item label="证书编号" :text="info.AuthCode"></info-item>
    <info-item label="补贴资金" :text="money(info.SubsidyMoney)"></info-item>
  </div>
</template>
<script>
  import infoItem from './item.vue';
  export default {
    components: {infoItem},
    data(){
      return {
        info: {
          ProductMainPart: '',
          ChargePerson: '',
          PhoneNum: '',
          IDCode: '',
          Town: '',
          Village: '',
          ContractArea: '',
          ActuralArea: '',
          Crop: '',
          AuthStatus: '',
          AuthCode: '',
          SubsidyMoney: ''
        }
      };
    },
    methods: {
      area(number, unit = '亩'){
        if (number) {
          return `${number}${unit}`;
        }
        return '';
      },
      money(number, unit = '元'){
        if (number) {
          return `${number}${unit}`;
        }
        return '';
      },
      async loadInfo(){
        const info = await this.$model('farmersInfo').getInfo();
        this.info = info;
      }
    },
    created(){
      this.loadInfo();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .info-list {
    margin: 60px 100px;
    font-size: 0;
  }
</style>
