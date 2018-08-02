<template>
  <div style="width: 300px;padding: 30px">
    <!---->
    <h3>一般下拉</h3>
    <nz-select v-model="v1">
      <nz-option label="选项1" value="1"></nz-option>
      <nz-option label="选项2" value="2"></nz-option>
      <nz-option label="选项3" value="3"></nz-option>
    </nz-select>
    <!--enum-->
    <h3>枚举下拉</h3>
    <nz-enum-select v-model="v2" :options="ynOptions"></nz-enum-select>
    <br/>
    <nz-enum-select v-model="v2" :options="ynOptions" isRadio></nz-enum-select>
    <br/>
    <nz-enum-select v-model="v2" :options="ynOptions" isRadioBtn></nz-enum-select>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        v1: '',
        v2: '1',
        v3: '',
        remoteUrl: this.$apiUrl.DEMO.REMOTE_SELECT,
        ynOptions: this.$enum('枚举示例').values
      }
    }
  }
</script>
