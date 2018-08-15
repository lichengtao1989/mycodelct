<template>
  <div>
    <ul class="prize-type clear">
      <li :class="item.activeName == activeName?'active':''" v-for="(item,index) in prizeTypeList"
          @click="selectItem(item)">
        <img :src="item.src" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeName: '',
        prizeTypeList: [{
          activeName: '0',
          src: 'static/images/marketing_prize_type_01.jpg' //九宫格
        }, {
          activeName: '2',
          src: 'static/images/marketing_prize_type_02.jpg' //大转盘
        }, {
          activeName: '3',
          src: 'static/images/marketing_prize_type_03.jpg' //刮刮卡
        }, {
          activeName: '1',
          src: 'static/images/marketing_prize_type_04.jpg' //翻牌
        }]
      }
    },
    methods: {
      selectItem(item){
        this.activeName = item.activeName;
        this.$emit('update:activityStyle', item.activeName);
      }
    },
    props: {
      activityStyle: {
        type: String
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.activeName = this.activityStyle;
      })
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .prize-type {
    li {
      box-sizing: border-box;
      float: left;
      width: 15%;
      padding: 1% 1%;
      margin-right: 2%;
      border: 1px solid @ExtraLightSilver;
      border-radius: 5px;
      cursor: pointer;
      &:nth-child(6n) {
        margin-right: 0;
      }
      &.active {
        border-color: #20a0ff;
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          background: url('../../../../assets/images/prize_type_select.png') no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: -9px;
          right: -9px;
        }
      }
      img {
        width: 100%;
      }
    }
  }
</style>
