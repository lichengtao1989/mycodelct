<template>
  <div>
    <div>
      <cjm-list ref="list" :request-url="requestUrl" :need-advanced-search="true" :need-base-search="true">
        <div slot="operate">
          <cjm-button type="primary" @click="recordExport" power-code="qualityInspectionExport">
            <i class="cjm-icon-export"></i>导出
          </cjm-button>
          <cjm-upload class="upload-file" name="fileData" :on-success="uploadSuccess" :show-file-list="false" :action="$globalData.get('trace', 'apiUrl').productTesting.QUALITYINSPECTION_LIST_IMPORT">
            <cjm-button class="cjm-icon-import" power-code="qualityInspectionImport">导入</cjm-button>
          </cjm-upload>
        </div>
        <div slot="search">
          <cjm-search-item label="样品名称" search-key="sampleName" v-model="search.sampleName">
            <cjm-input v-model="search.sampleName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="样品种类" search-key="sampleType" v-model="search.sampleType">
            <cjm-input v-model="search.sampleType"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="检测时间" search-key="detectionTime" v-model="search.detectionTime">
            <cjm-date-picker v-model="search.detectionTime" type="daterange"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="样品编码" search-key="sampleCode" v-model="search.sampleCode">
            <cjm-input v-model="search.sampleCode"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="检测人" search-key="testingPerson" v-model="search.testingPerson">
            <cjm-input v-model="search.testingPerson"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="判定结果" search-key="decisionResult" v-model="search.decisionResult">
            <cjm-enum-select v-model="search.decisionResult" enum-name="判定结果" enum-namespace="trace" :clearable="true"></cjm-enum-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <!-- <cjm-table-column prop="qualityInspectionID" label="ID" width="80"></cjm-table-column> -->
          <cjm-table-column prop="databaseID" label="数据库ID" width="100"></cjm-table-column>
          <cjm-table-column prop="passagewayID" label="通道ID" width="100"></cjm-table-column>
          <cjm-table-column prop="sampleName" label="样品名称" min-width="150"></cjm-table-column>
          <cjm-table-column prop="flowNumber" label="流水号" width="150"></cjm-table-column>
          <cjm-table-column prop="sampleCode" label="样品编号" width="150"></cjm-table-column>
          <cjm-table-column prop="sampleType" label="样品种类" width="150"></cjm-table-column>
          <cjm-table-column prop="sampleTypeCode" label="样品类别编号" width="180"></cjm-table-column>
          <cjm-table-column prop="standardSymbol" label="标准值比较符号" width="140"></cjm-table-column>
          <cjm-table-column prop="standardValue" label="标准值" width="100"></cjm-table-column>
          <cjm-table-column prop="standardValueUnit" label="标准值单位" width="150"></cjm-table-column>
          <cjm-table-column prop="standardNumber" label="标准号" width="120"></cjm-table-column>
          <cjm-table-column prop="operators" label="经营户" width="150"></cjm-table-column>
          <cjm-table-column prop="passiveInspectionCompanyAddress" label="被检查单位地址" width="200"></cjm-table-column>
          <cjm-table-column prop="dilutionMultiple" label="稀释倍数" width="150"></cjm-table-column>
          <cjm-table-column prop="numberOfReactiveDroplets" label="反应液滴数" width="150"></cjm-table-column>
          <cjm-table-column prop="controlValue" label="对照值" width="120"></cjm-table-column>
          <cjm-table-column prop="detectionResult" label="检测结果" width="120"></cjm-table-column>
          <cjm-table-column prop="decisionResult" label="判定结果" width="120"></cjm-table-column>
          <cjm-table-column prop="testingPerson" label="检测人" width="120"></cjm-table-column>
          <cjm-table-column prop="detectionTime" label="检测时间" width="150"></cjm-table-column>
          <cjm-table-column prop="detectionPointLongitude" label="检测点经度" width="140"></cjm-table-column>
          <cjm-table-column prop="detectionPointLatitude" label="检测点纬度" width="140"></cjm-table-column>
          <cjm-table-column prop="detectionPlaceName" label="检测地点名称" width="200"></cjm-table-column>
          <cjm-table-column prop="detectionMethod" label="检测方法" width="150"></cjm-table-column>
          <cjm-table-column prop="detectionProject" label="检测项目" width="150"></cjm-table-column>
          <cjm-table-column prop="detectionModule" label="检测模块" width="150"></cjm-table-column>
          <cjm-table-column prop="qualityInspectionCode" label="检测记录唯一编号" width="250"></cjm-table-column>
        </template>
      </cjm-list>
    </div>
  </div>
</template>
<script>
import fileDownload from 'framework/utils/fileDownload';
export default {
  data() {
    return {
      search: {
        sampleName: '',
        sampleType: '',
        detectionTime: '',
        sampleCode: '',
        testingPerson: '',
        decisionResult: ''
      },
      requestUrl: this.$globalData.get('trace', 'apiUrl').productTesting.GET_QUALITYINSPECTION_LIST
    };
  },
  methods: {
    uploadSuccess(res) {
      if (res.resultCode === '200') {
        this.$message.success(res.msg);
        this.$refs.list.refresh();
      } else {
        this.$message.error(res.msg);
      }
    },
    //导出
    recordExport() {
      fileDownload(this.$globalData.get('trace', 'apiUrl').productTesting.QUALITYINSPECTION_LIST_EXPORT, this.$refs.list.getConditions());
    }
  }
};
</script>
<style  lang='less' scoped>
.upload-file {
  display: inline-block;
}
</style>
