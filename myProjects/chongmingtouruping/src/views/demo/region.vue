<template>
  <div style="padding: 30px;width: 300px">
    <nz-region-select v-model="region"></nz-region-select>
    <p>{{region}}</p>
    <p>{{regionName}}</p>
    <p>{{regionDetail}}</p>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        region: '',
        regionName: '',
        regionDetail: []
      }
    },
    watch: {
      async region(){
        if (this.region) {
          this.regionName = await this.$model('region').getRegionNameByCode(this.region);
          this.regionDetail = await this.$model('region').getRegionText(this.region);
        } else {
          this.regionName = '';
          this.regionDetail = [];
        }
      }
    }
  }
</script>
