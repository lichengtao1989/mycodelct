<template>
  <div>
    <div v-if="page==''">
      <nz-button type="text" @click="page='region'">区域选择</nz-button>
      <nz-button type="text" @click="page='list'">表格</nz-button>
    </div>
    <div v-if="page=='region'">
      <nz-region-select v-model="val"></nz-region-select>
      <p>{{val}}</p>
      <p>{{text1}}</p>
      <p>{{text2}}</p>
    </div>
    <div v-if="page=='list'">
      <nz-list :request-url="requestUrl">
        <template slot="tableColumns">
          <nz-table-column label="id" sortable="custom" prop="id"></nz-table-column>
          <nz-table-column label="是否" enumName="是否" prop="yn"></nz-table-column>
          <nz-table-column label="字段1" prop="v1"></nz-table-column>
          <nz-table-column label="字段2" prop="v2"></nz-table-column>
        </template>
      </nz-list>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        requestUrl: this.$apiUrl.COMMON.DEMOLIST,
        page: 'list',
        val: '330105102',
        text1: '',
        text2: ''
      };
    },
    watch: {
      async val(){
        this.text1 = await this.$model('region').getRegionText(this.val);
        this.text2 = await this.$model('region').getRegionNameByCode(this.val);
      }
    },
    async mounted(){
      this.text1 = await this.$model('region').getRegionText(this.val);
      this.text2 = await this.$model('region').getRegionNameByCode(this.val);
    }
  }
</script>
