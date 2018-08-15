<template>
  <span class="head-weather">
    <span>{{weather}}</span>
    <span>{{temperature}}</span>
    <span>{{address}}</span>
  </span>
</template>

<script>
  export default{
    data(){
      return {
        weather: '',
        temperature: '',
        address: ''
      }
    },
    created(){
//      this.$ajax.get(this.$apiUrl.common.GET_WEATHER).then((r)=> {
//        this.weather = r.data.Weather;
//        this.temperature = r.data.Temperature + '℃';
//        this.address = r.data.City;
//      })
    }
  }
</script>

<style scoped>
  .head-weather span {
    margin-right: 5px;
    font-size: 14px;
    color: #fff;
  }
</style>
