<template>
  <div>
    <div class="section">
      <label class="search-text">身份码：</label>
      <div class="search-input-value">
        <cjm-search-input placeholder="请输入身份码" @search="search"></cjm-search-input>
      </div>
    </div>
    <div class="tips-box" v-if="code.length===0">
      <img src="../../../static/images/no-switch.png"/>
      <p>请输入正确的身份编码进行查询！</p>
    </div>
    <div v-if="isCodeAllow">
      <div class="section" v-if="CodeInfo">
        <h2>生码信息</h2>
        <cjm-table class="cjm-table" :data="CodeInfoData.rows" element-loading-text="拼命加载中" tooltip-effect="light" v-loading="CodeInfoData.isLoading" style="width: 100%">
          <cjm-table-column prop="corpName" label="用户名称"></cjm-table-column>
          <cjm-table-column prop="batchID" label="生码批次号"></cjm-table-column>
          <cjm-table-column prop="brandName" label="品牌"></cjm-table-column>
          <cjm-table-column prop="functionType" label="码功能"></cjm-table-column>
          <cjm-table-column prop="layerType" label="物流码类型"></cjm-table-column>
          <cjm-table-column prop="createTime" label="创建时间"></cjm-table-column>
        </cjm-table>
      </div>
      <div class="section" v-if="LogisticsHistory">
        <h2>物流台账查询</h2>
        <div>
          <table class="top-table">
            <tr>
              <td class="title-box">产品名称:</td>
              <td>{{logisticsHistoryData.productName}}</td>
              <td class="title-box">产品编号:</td>
              <td>{{logisticsHistoryData.productCode}}</td>
            </tr>
            <tr>
              <td class="title-box">产品规格:</td>
              <td>{{logisticsHistoryData.specValue}}</td>
              <td class="title-box">产品批次:</td>
              <td>{{logisticsHistoryData.productBatchCode}}</td>
            </tr>
            <tr>
              <td class="title-box">计量单位:</td>
              <td>{{logisticsHistoryData.originalUnit}}</td>
              <td class="title-box">当前所在机构:</td>
              <td>{{logisticsHistoryData.nowOrgName}}</td>
            </tr>
          </table>
        </div>
        <cjm-list :request-url="logisticsHistoryUrl" @data-change="logisticsHistoryOnChange" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">
            <cjm-table-column prop="billCode" label="单据编号"></cjm-table-column>
            <cjm-table-column prop="originalCode" label="物流码"></cjm-table-column>
            <cjm-table-column prop="iOFlag" label="出入库"></cjm-table-column>
            <cjm-table-column prop="subjectName" label="科目"></cjm-table-column>
            <cjm-table-column prop="orgName" label="机构名称"></cjm-table-column>
            <cjm-table-column prop="houseName" label="库房名称"></cjm-table-column>
            <cjm-table-column prop="layer3Number" label="单标数量"></cjm-table-column>
            <cjm-table-column prop="createByName" label="操作人"></cjm-table-column>
            <cjm-table-column prop="createTime" label="操作时间"></cjm-table-column>
          </template>
        </cjm-list>
      </div>
      <div class="section" v-if="MutualCheckRecognition">
        <h2>防伪码与物流码互查</h2>
        <cjm-table class="cjm-table" :data="MutualCheckRecognitionData.rows" element-loading-text="拼命加载中" tooltip-effect="light" v-loading="MutualCheckRecognitionData.isLoading" style="width: 100%">
          <cjm-table-column prop="logisticsCode" label="物流码"></cjm-table-column>
          <cjm-table-column prop="antiFakeCode" label="防伪码"></cjm-table-column>
        </cjm-table>
      </div>
      <div class="section" v-if="BoxListQuery">
        <h2>列出整箱</h2>
        <div class="tips-line">
          <span>垛标={{codeLayerInfoData.layer1Number}}</span>
          <span>箱标={{codeLayerInfoData.layer2Number}}</span>
          <span>单标={{codeLayerInfoData.layer3Number}}</span>
        </div>
        <cjm-list :request-url="boxListQueryUrl" @data-change="boxListQueryOnChange" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">

            <cjm-table-column label="垛标" min-width="180" v-if="codeLayerInfoData.isShowCodeLayer1">
              <template slot-scope="scope"><span :style="scope.row.codeLayer1===code?'font-weight:bolder':''">{{scope.row.codeLayer1}}</span></template>
            </cjm-table-column>

            <cjm-table-column label="箱标" min-width="180">
              <template slot-scope="scope"><span :style="scope.row.codeLayer2===code?'font-weight:bolder':''">{{scope.row.codeLayer2}}</span></template>
            </cjm-table-column>

            <cjm-table-column label="单标" min-width="180">
              <template slot-scope="scope"><span :style="scope.row.codeLayer3===code?'font-weight:bolder':''">{{scope.row.codeLayer3}}</span></template>
            </cjm-table-column>

          </template>
        </cjm-list>
      </div>
      <div class="section" v-if="LogisticsQuery">
        <h2>窜货查询</h2>
        <cjm-list :request-url="LogisticsQueryUrl" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">
            <cjm-table-column prop="queryResult" label="是否窜货"></cjm-table-column>
            <cjm-table-column prop="code" label="物流码"></cjm-table-column>
            <cjm-table-column prop="productCode" label="产品编号"></cjm-table-column>
            <cjm-table-column prop="productName" label="产品名称"></cjm-table-column>
            <cjm-table-column prop="sendOrgName" label="发往机构"></cjm-table-column>
            <cjm-table-column prop="sendTime" label="发货时间"></cjm-table-column>
            <cjm-table-column prop="sendProvince" label="发往地区"></cjm-table-column>
            <cjm-table-column prop="regionFullName" label="查询地区"></cjm-table-column>
            <cjm-table-column prop="queryAddress" label="查询精确定位"></cjm-table-column>
            <cjm-table-column prop="querySourceTypeName" label="查询类型"></cjm-table-column>
            <cjm-table-column prop="queryBy" label="查询者"></cjm-table-column>
            <cjm-table-column prop="queryTime" label="查询时间"></cjm-table-column>
          </template>
        </cjm-list>
      </div>
      <div class="section" v-if="ProductDataHistoryList">
        <h2>码嵌套历史操作</h2>
        <cjm-list :request-url="ProductDataHistoryListUrl" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">
            <cjm-table-column prop="logisticsCode" label="物流码"></cjm-table-column>
            <cjm-table-column prop="parentCode" label="上级物流码"></cjm-table-column>
            <cjm-table-column prop="operationType" label="操作类型"></cjm-table-column>
            <cjm-table-column prop="createName" label="创建人"></cjm-table-column>
            <cjm-table-column prop="createTime" label="创建时间"></cjm-table-column>
            <cjm-table-column prop="result" label="结果"></cjm-table-column>
          </template>
        </cjm-list>
      </div>
      <div class="section" v-if="AntiFakeList">
        <h2>防伪查询记录</h2>
        <cjm-list :request-url="AntiFakeListUrl" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">
            <cjm-table-column prop="QueryCount" label="查询次数"></cjm-table-column>
            <cjm-table-column prop="IsNormal" label="是否正常">
              <template slot-scope="scope">
                <span v-if="scope.row.IsNormal==1">正常</span>
                <span v-if="scope.row.IsNormal==0" style="color: red;font-weight: bolder">疑</span>
              </template>
            </cjm-table-column>
            <cjm-table-column prop="Code" label="防伪码"></cjm-table-column>
            <cjm-table-column prop="ProductCode" label="产品编号"></cjm-table-column>
            <cjm-table-column prop="ProductName" label="产品名称"></cjm-table-column>
            <cjm-table-column prop="QueryTypeName" label="查询方式"></cjm-table-column>
            <cjm-table-column prop="QueryBy" label="查询者"></cjm-table-column>
            <cjm-table-column prop="QueryTime" label="查询时间"></cjm-table-column>
            <cjm-table-column prop="RegionFullName" label="查询地区"></cjm-table-column>
            <cjm-table-column prop="PositionTypeName" label="定位方式"></cjm-table-column>
            <cjm-table-column prop="QueryAddress" label="查询精确位置"></cjm-table-column>
          </template>
        </cjm-list>
      </div>
      <div class="section" v-if="CodeIntegralRechargeRecord">
        <h2>积分充值记录</h2>
        <cjm-list :request-url="CodeIntegralRechargeRecordUrl" :need-base-search="false" :need-advanced-search="false">
          <template slot="tableColumns">
            <cjm-table-column prop="customerLoginName" label="会员账号"></cjm-table-column>
            <cjm-table-column prop="integralCode" label="积分码"></cjm-table-column>
            <cjm-table-column prop="productCode" label="产品编号"></cjm-table-column>
            <cjm-table-column prop="productName" label="产品名称"></cjm-table-column>
            <cjm-table-column prop="changeValue" label="积分值"></cjm-table-column>
            <cjm-table-column prop="sourceName" label="积分途径"></cjm-table-column>
            <cjm-table-column prop="createTime" label="积分时间"></cjm-table-column>
            <cjm-table-column prop="customerProvince" label="省"></cjm-table-column>
            <cjm-table-column prop="customerCity" label="市"></cjm-table-column>
            <cjm-table-column prop="customerDistrict" label="区"></cjm-table-column>
            <cjm-table-column prop="orgName" label="门店"></cjm-table-column>
            <cjm-table-column prop="guideLoginName" label="导购员"></cjm-table-column>
          </template>
        </cjm-list>
      </div>
    </div>
  </div>
</template>
<script>
  import CjmSearchInput from 'framework/components/base/search-input';
  export default {
    components: {CjmSearchInput},
    data(){
      const codeUrl = this.$globalData.get('code', 'apiUrl');
      const powerCodes = this.$globalData.get('powerCodes');
      const ctrlPowerCodes = ['CodeInfo', 'LogisticsHistory', 'MutualCheckRecognition', 'BoxListQuery', 'LogisticsQuery', 'ProductDataHistoryList', 'AntiFakeList', 'CodeIntegralRechargeRecord'];
      const powerInfo = {};
      ctrlPowerCodes.forEach(code => {
        powerInfo[code] = powerCodes.includes(code.toLowerCase());
      });
      return {
        codeUrl,
        code: '',
        ...powerInfo,
        CodeInfoData: {isLoading: false, rows: []},
        MutualCheckRecognitionData: {isLoading: false, rows: []},
        logisticsHistoryData: {productName: '', productCode: '', specValue: '', productBatchCode: '', originalUnit: '', nowOrgName: ''},
        codeLayerInfoData: {layer1Number: '', layer2Number: '', layer3Number: '', isShowCodeLayer1: true}
      };
    },
    computed: {
      isCodeAllow(){
        return this.testCodeAllow(this.code);
      },
      logisticsHistoryUrl(){
        return this.addParam(this.codeUrl.codeSearch.GET_LOGISTICS_HISTORY, {code: this.code});
      },
      boxListQueryUrl(){
        return this.addParam(this.codeUrl.codeSearch.BOX_LIST_QUERY, {code: this.code});
      },
      LogisticsQueryUrl(){
        return this.addParam(this.codeUrl.codeSearch.GET_LOGISTICS_QUERY, {code: this.code});
      },
      ProductDataHistoryListUrl(){
        return this.addParam(this.codeUrl.codeSearch.GET_PRODUCT_DATA_HISTORY_LIST, {code: this.code});
      },
      AntiFakeListUrl(){
        return this.addParam(this.codeUrl.codeSearch.GET_ANTI_FAKE_LIST, {code: this.code});
      },
      CodeIntegralRechargeRecordUrl(){
        return this.addParam(this.codeUrl.codeSearch.GET_CODE_INTEGRAL_RECHARGE_RECORD, {code: this.code});
      }
    },
    methods: {
      addParam(url = '', params = {}){
        let searchString = Object.keys(params).map(key => key + '=' + params[key].toString()).join('&');
        if (url.indexOf('?') >= 0) {
          return url + '&' + searchString;
        } else {
          return url + '?' + searchString;
        }
      },
      //判断码的位数是否正确
      testCodeAllow(code){
        const rightLengths = [16, 17, 18, 32, 20, 21, 22, 36];
        if (rightLengths.includes(code.trim().length) && !isNaN(code.trim())) {
          return true;
        } else {
          return false;
        }
      },
      //点击搜索按钮 执行
      search(code){
        this.code = '';
        this.$nextTick(() => {
          this.code = code;
          if (code.length > 0) {
            if (this.testCodeAllow(code)) {
              this.loadData();
            } else {
              this.$message.error('该身份码不属于该企业或身份码不正确');
            }
          } else {
            //this.$message.info('请输入身份码');
          }
        });
      },
      loadData(){ //加载数据
        this.loadCodeInfo();
        this.loadMutualCheckRecognition();
        this.logisticsHistoryDataClear();
        this.boxListQueryDataClear();
      },
      loadCodeInfo(){ //加载生码信息数据
        this.CodeInfoData.isLoading = true;
        this.CodeInfoData.rows = [];
        this.$ajax.get(this.codeUrl.codeSearch.GET_CODE_INFO, {code: this.code.trim()}).then(res => {
          this.CodeInfoData.isLoading = false;
          if (res.resultCode === '200') {
            this.CodeInfoData.rows.push(res.data);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          this.CodeInfoData.isLoading = false;
          this.$message.error(err.toString());
        });
      },
      loadMutualCheckRecognition(){ //加载防伪码与物流码互查数据
        this.MutualCheckRecognitionData.isLoading = true;
        this.MutualCheckRecognitionData.rows = [];
        this.$ajax.get(this.codeUrl.codeSearch.GET_MUTUAL_CHECK_RECOGNITION, {code: this.code.trim()}).then(res => {
          this.MutualCheckRecognitionData.isLoading = false;
          if (res.resultCode === '200') {
            this.MutualCheckRecognitionData.rows.push(res.data);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          this.MutualCheckRecognitionData.isLoading = false;
          this.$message.error(err.toString());
        });
      },
      logisticsHistoryOnChange(data){ // 物流台账查询 数据获取完成后 设置 头部的一些产品数据
        if (data && data.options) {
          this.logisticsHistoryData.productName = data.options.productName;
          this.logisticsHistoryData.productCode = data.options.productCode;
          this.logisticsHistoryData.specValue = data.options.specValue;
          this.logisticsHistoryData.productBatchCode = data.options.productBatchCode;
          this.logisticsHistoryData.originalUnit = data.options.originalUnit;
          this.logisticsHistoryData.nowOrgName = data.options.nowOrgName;
        }
      },
      logisticsHistoryDataClear(){ // 物流台账查询 获取数据前 清空 头部的一些产品数据
        Object.keys(this.logisticsHistoryData).forEach(key => {
          this.logisticsHistoryData[key] = '';
        });
      },
      boxListQueryOnChange(data){ // 列出整箱 数据获取完成后 设置 头部的一些产品数据 和 判断是否显示垛标
        if (data && data.options) {
          this.codeLayerInfoData.layer1Number = data.options.layer1Number;
          this.codeLayerInfoData.layer2Number = data.options.layer2Number;
          this.codeLayerInfoData.layer3Number = data.options.layer3Number;
        }
        if (data && data.rows) {
          this.codeLayerInfoData.isShowCodeLayer1 = data.rows.filter(item => item.codeLayer1.length > 0).length > 0;
        }
      },
      boxListQueryDataClear(){ // 列出整箱 获取数据前 清空头部的 垛标 箱标 单标 数据
        this.codeLayerInfoData.layer1Number = '';
        this.codeLayerInfoData.layer2Number = '';
        this.codeLayerInfoData.layer3Number = '';
        this.codeLayerInfoData.isShowCodeLayer1 = true;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .section {
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    padding: 30px 20px;
    margin-bottom: 10px;
    h2 {
      font-size: 16px;
      color: #1f2d3d;
      margin-bottom: 10px;
    }
  }

  .search-text, .search-input-value {
    display: inline-block;
    vertical-align: middle;
  }

  .search-text {
    font-size: 13px;
  }

  .top-table {
    width: 100%;
    border-collapse: collapse;
    line-height: 40px;
    font-size: 14px;
    table-layout: fixed;
    tr {
      border: 1px solid #d1d7e0;
    }
    td {
      width: 35%;
      padding: 0 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title-box {
      background-color: #eff2f7;
      color: #324057;
      width: 15%;
    }
  }

  .tips-box {
    text-align: center;
    margin-top: 125px;
    img {
      max-width: 250px;
    }
    p {
      font-size: 16px;
      color: #999999;
      margin-top: 30px;
    }
  }

  .tips-line {
    font-size: 13px;
    color: #475669;
    span {
      margin-right: 10px;
    }
  }
</style>
