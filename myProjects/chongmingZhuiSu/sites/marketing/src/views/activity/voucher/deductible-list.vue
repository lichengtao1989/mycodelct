<!--  -->
<template>
  <div>
    <div v-if="currentPage == 'list'">
      <cjm-list :request-url="requestUrl" :need-base-search="true" :need-advanced-search="true">
        <div slot="operate">
          <cjm-button class="cjm-icon-add" type="primary" @click="add('add')">新建活动</cjm-button>
        </div>
        <div slot="search">
          <cjm-search-item label="券有效期" search-key="voucherTime" v-model="search.voucherTime">
            <cjm-date-picker type="datetimerange" :readonly="false" v-model="search.voucherTime" :picker-options="options"></cjm-date-picker>
          </cjm-search-item>
          <cjm-search-item label="折扣券名称" search-key="voucherName" v-model="search.voucherName">
            <cjm-input v-model="search.voucherName"></cjm-input>
          </cjm-search-item>
          <cjm-search-item label="产品" search-key="productID" v-model="search.productID">
            <cjm-remote-select v-model="search.productID" :remote-url="$globalData.get('marketing', 'apiUrl').autoComplete.PRODUCT"></cjm-remote-select>
          </cjm-search-item>
        </div>
        <template slot="tableColumns">
          <cjm-table-column sortable="custom" prop="voucherName" label="折扣券名称" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="" label="券有效期" width="280">
            <template slot-scope="scope">
              <span>{{scope.row.beginTime}} ~ {{scope.row.endTime}}</span>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="batchID" label="发放方式" width="180">
            <template slot-scope="scope">
              <span>整批生码批次{{scope.row.batchID}}</span>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="amount" label="折扣金额" width="120">
            <template slot-scope="scope">
              <p v-if="parseFloat(scope.row.amount) != 0"> {{scope.row.amount}} </p>
              <p v-if="parseFloat(scope.row.discount) != 0"> {{parseFloat(scope.row.discount)}} 折</p>
              <p v-if="parseFloat(scope.row.beginRandomAmount) != 0 && parseFloat(scope.row.endRandomAmount) != 0"> {{scope.row.beginRandomAmount}} - {{scope.row.endRandomAmount}} </p>
            </template>
          </cjm-table-column>
          <cjm-table-column sortable="custom" prop="productName" label="产品" min-width="150"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="createTime" label="创建时间" width="180"></cjm-table-column>
          <cjm-table-column sortable="custom" prop="" label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <cjm-button type="text" @click="add('read', scope.row)">查看</cjm-button>
            </template>
          </cjm-table-column>
        </template>
      </cjm-list>
    </div>
    <div v-if="currentPage == 'edit'">
      <exchange-edit></exchange-edit>
    </div>
  </div>
</template>
<script>
import exchangeEdit from './deductible-edit.vue';
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  components: {
    exchangeEdit
  },
  mixins: [pageSwitch],
  data() {
    return {
      requestUrl: this.$globalData.get('marketing', 'apiUrl').activity.voucher.DEDUCTIBLE_LIST,
      search: {
        dateRange: '',
        voucherName: '',
        productID: '',
        voucherTime: ''
      },
      options: {
        disabledDate(time) {
          return false;
        }
      },
      currentPage: 'list'
    };
  },

  computed: {},

  methods: {
    add(type, data) {
      switch (type) {
        case 'read':
          this.pushPage('edit', '查看', { id: 'read', renderData: data });
          break;
        case 'add':
          this.pushPage('edit', '新建活动', { id: 'add' });
          break;
      }
    },
    pageSwitched(codes) {
      this.currentPage = codes.length > 0 ? codes[0] : 'list';
    }
  }
};
</script>
<style lang='less' scoped>

</style>

