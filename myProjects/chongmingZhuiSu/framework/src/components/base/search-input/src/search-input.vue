<template>
  <div class="cjm-search">
    <input type="text" v-model="queryTxt" :placeholder="placeholder || '输入内容搜索'" @keyup.enter="search"
           class="cjm-search-input">
    <i class="cjm-search-clear el-icon-circle-close" v-show="queryTxt.length>0" @click="clear"></i>
    <i class="cjm-search-button el-icon-search" @click="search"></i>
  </div>
</template>

<script>
  export default{
    name: 'cjm-search-input',
    data(){
      return {
        queryTxt: ''
      }
    },
    props: {
      placeholder: String
    },
    methods: {
      search(){
        this.queryTxt = this.queryTxt.trim();
        this.$emit('search', this.queryTxt);
      },
      clear(){
        this.queryTxt = '';
        this.$emit('search', this.queryTxt);
      }
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";
  .cjm-search{
    position: relative;
  }

  .cjm-search-input {
    float: left;
    width: 162px;
    height: 22px;
    line-height: 22px;
    padding: 5px 20px 5px 12px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border: 1px solid @ExtraLightSilver;
  }

  .cjm-search-input::placeholder{
    color: @ExtraLightSilver;
  }

  .cjm-search-clear{
    position: absolute;
    right: 52px;
    top: 10px;
    color: @ExtraLightSilver;
    font-size: 15px;
    cursor: pointer;
  }

  .cjm-search-button {
    float: left;
    width: 48px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    text-align: center;
    border: none;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background-color: @primaryColor;
    cursor: pointer;
  }

  .cjm-search:after {
    content: '';
    clear: both;
  }
</style>
