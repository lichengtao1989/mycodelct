<template>
  <div class="clear prize-item">
    <cjm-form-item label="抽奖样式" class="clear-item cjm-form-item-long">
      <prize-item-type :activityStyle.sync="form.activityStyle"></prize-item-type>
    </cjm-form-item>
    <prize-item-edit :activityAwards="form.activityAwards" :activityStyle="form.activityStyle"></prize-item-edit>
  </div>
</template>
<script>
  import prizeItemType from './prize-item-type.vue'
  import prizeItemEdit from './prize-item-edit.vue'
  export default{
    components: {
      prizeItemEdit,
      prizeItemType
    },
    data(){
      return {}
    },
    props: {
      form: {
        type: Object
      },
      rules: {
        type: Object
      },
      activityCorps: {
        type: Array
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .clear-item {
    clear: both;
  }
  .prize-item{
    margin-bottom: 20px;
  }
</style>
