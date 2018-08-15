<template>
  <div>
    <cjm-list :request-url="requestUrl"
              :need-base-search="true"
              :need-advanced-search="true"
              base-search-placeholder="输入会员手机号、注册门店" ref="list">
      <div slot="operate">
        <cjm-button class="cjm-icon-export" @click="exportData">导出</cjm-button>
      </div>
      <div slot="search">
        <cjm-search-item label="性别" search-key="gender" v-model="search.gender">
          <cjm-enum-select v-model="search.gender" enum-name="性别" enum-namespace="marketing"></cjm-enum-select>
        </cjm-search-item>
        <cjm-search-item label="产品名称" search-key="productName" v-model="search.productName">
          <cjm-input v-model="search.productName"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品编号" search-key="productCode" v-model="search.productCode">
          <cjm-input v-model="search.productCode"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="产品分类" search-key="classifyID" v-model="search.classifyID">
          <cjm-remote-select
            v-model="search.classifyID"
            :remote-url="$globalData.get('marketing','apiUrl').statistics.GET_PRODUCT_CLASSIFY"
            value-key="classifyID"
            label-key="classifyName"></cjm-remote-select>
        </cjm-search-item>
        <cjm-search-item label="产品价格" search-key="priceOriginal_B" v-model="search.priceOriginal_B">
          <cjm-input v-model="search.priceOriginal_B"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="至" search-key="priceOriginal_E" v-model="search.priceOriginal_E">
          <cjm-input v-model="search.priceOriginal_E"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="交易次数" search-key="buyCount_B" v-model="search.buyCount_B">
          <cjm-input v-model="search.buyCount_B"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="至" search-key="buyCount_E" v-model="search.buyCount_E">
          <cjm-input v-model="search.buyCount_E"></cjm-input>
        </cjm-search-item>
        <cjm-search-item label="交易时间" search-key="buyTime_B" v-model="search.buyTime_B">
          <cjm-date-picker type="date" v-model="search.buyTime_B" :picker-options="exchangeBeginTime"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="至" search-key="buyTime_E" v-model="search.buyTime_E">
          <cjm-date-picker type="date" v-model="search.buyTime_E" :picker-options="exchangeEndTime"></cjm-date-picker>
        </cjm-search-item>
        <cjm-search-item label="会员地址" search-key="regionCode" v-model="search.regionCode">
          <cjm-region-select v-model="search.regionCode" :require-level="1"></cjm-region-select>
        </cjm-search-item>
        <cjm-search-item v-for="(item, index) in fields"
                         :label="item.name"
                         :search-key="item.formName"
                         v-model="search[item.formName]" :key="index">
          <cjm-select v-model="search[item.formName]">
            <cjm-option v-for="(opt, index) in item.dataValue" :value="opt" :lable="opt" :key="index"></cjm-option>
          </cjm-select>
        </cjm-search-item>
      </div>
      <template slot="tableColumns">
        <cjm-table-column label="会员账号" prop="loginName" width="120"></cjm-table-column>
        <cjm-table-column label="会员姓名" prop="customerName" min-width="120"></cjm-table-column>
        <cjm-table-column label="活跃度" prop="activeStatus" enum-name="活跃度" enum-namespace="marketing"
                          width="100"></cjm-table-column>
        <cjm-table-column label="年龄" prop="ageValue" width="100"></cjm-table-column>
        <cjm-table-column label="性别" prop="gender" width="100" enum-name="性别"
                          enum-namespace="marketing"></cjm-table-column>
        <cjm-table-column label="生日" prop="birthday" width="180"></cjm-table-column>
        <cjm-table-column label="省" prop="province" min-width="120"></cjm-table-column>
        <cjm-table-column label="市" prop="city" min-width="120"></cjm-table-column>
        <cjm-table-column label="区" prop="district" min-width="120"></cjm-table-column>
        <cjm-table-column label="详细地址" prop="address" min-width="150"></cjm-table-column>
        <cjm-table-column label="邮箱" prop="email" min-width="120"></cjm-table-column>
        <cjm-table-column label="购买金额" prop="totalBuyPrice" min-width="120"></cjm-table-column>
        <cjm-table-column label="会员等级" prop="customerClassName" width="120"></cjm-table-column>
        <cjm-table-column label="累计积分" prop="totalIntegral" width="120"></cjm-table-column>
        <cjm-table-column label="可用积分" prop="remainIntegral" width="120"></cjm-table-column>
        <cjm-table-column label="会员类型" prop="customerTypeName" width="120"></cjm-table-column>
        <cjm-table-column label="推荐人" prop="referrer1LoginName" width="120"></cjm-table-column>
        <cjm-table-column label="状态" prop="statusName" width="120"></cjm-table-column>
        <cjm-table-column label="注册途径" prop="sourceName" width="120"></cjm-table-column>
        <cjm-table-column label="注册时间" prop="createTime" width="180"></cjm-table-column>
        <cjm-table-column v-for="(item,index) in fields" :label="item.name" :prop="item.formName"
                          :key="index" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.extFields[index].split(':')[1]}}</span>
          </template>
        </cjm-table-column>
      </template>
    </cjm-list>
  </div>
</template>
<script>
  import fileDownload from 'framework/utils/fileDownload'
  export default{
    data(){
      let self = this;
      return {
        requestUrl: this.$globalData.get('marketing', 'apiUrl').statistics.GET_VIP_LIST,
        search: {
          productName: '',
          classifyID: '',
          productCode: '',
          activeStatusName: '',
          gender: '',
          customerClassName: '',
          regionCode: '',
          priceOriginal_B: '',
          priceOriginal_E: '',
          buyCount_B: '',
          buyCount_E: '',
          buyTime_B: '',
          buyTime_E: ''
        },
        fields: [],
        exchangeBeginTime: {
          disabledDate(time){
            if (self.search.buyTime_E !== '') {
              return time.getTime() > new Date(self.search.buyTime_E).getTime();
            }
          }
        },
        exchangeEndTime: {
          disabledDate(time){
            if (self.search.buyTime_B !== '') {
              return time.getTime() < new Date(self.search.buyTime_B).getTime();
            }
          }
        }
      }
    },
    methods: {
      getFieldsData(){
        this.$ajax.get(this.$globalData.get('marketing', 'apiUrl').statistics.GET_FIELDS).then((res) => {
          if (res.resultCode === '200') {
            this.fields = res.data.map((p) => {
              p[p.formName] = p.formName;
              p.dataValue = p.dataValue.split(',');
              return p;
            });
            res.data.forEach((p) => {
              this.$set(this.search, p.formName, '');
            });
          }
        })
      },
      exportData(){
        fileDownload(this.$globalData.get('marketing', 'apiUrl').statistics.EXPORT_LIST, this.$refs.list.getConditions());
      }
    },
    created(){
      this.getFieldsData();
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";
</style>
