<template>
  <div>
    <nz-list :request-url="requestUrl" :need-advanced-search="false" :need-base-search="true" base-search-placeholder="请输入登记名称" ref="list">
      <template slot="tableColumns">
        <nz-table-column prop="forbiddenPesticideID" width="120" label="序号" sortable="custom"></nz-table-column>
        <nz-table-column prop="registrationName" width="300" label="登记名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="englishRegistrationName" width="350" label="英文登记名称" sortable="custom"></nz-table-column>
        <nz-table-column prop="announcement" min-width="200" label="公告号" sortable="custom"></nz-table-column>
      </template>
    </nz-list>
  </div>
</template>
<script>
export default {
  data() {
    let apiUrl = this.$apiUrl.RESTRICTEDPESTICIDE;
    return {
      apiUrl: apiUrl,
      requestUrl: apiUrl.GET_LIST,
      search: {
        registrationName: ''
      }
    };
  },
  watch: {},
  methods: {},
  created() {}
};
</script>
