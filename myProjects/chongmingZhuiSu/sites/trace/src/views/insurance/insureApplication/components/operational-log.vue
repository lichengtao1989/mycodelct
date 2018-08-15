<template>
  <div class="commonbom"> 
    <cjm-table  :data="form.insureAuditRecord"
                 class="cjm-table" tooltip-effect="light"
                 border>
        <cjm-table-column prop="loginName" label="审核人" width="200">
          <template slot-scope="scope">
            {{scope.row.loginName}}({{scope.row.userName}})
          </template>
        </cjm-table-column>
        <cjm-table-column prop="auditStatus" label="审核结果"  width="120"  enum-name="审核结果" enum-namespace="trace" >
        </cjm-table-column>
        <cjm-table-column prop="auditTime" label="时间" width="250">
        </cjm-table-column>
        <cjm-table-column prop="failCause" label="备注" >
        </cjm-table-column>    
      </cjm-table>
  </div>
</template>
<script>
import pageSwitch from 'framework/mixins/pageSwitch';
export default {
  mixins: [pageSwitch],
  data() {
    return {
      enums: this.$globalData.get('trace', 'enums'),
      apiUrl: this.$globalData.get('trace', 'apiUrl'),
      pageType: 'edit',
      insureID: '',
      getProductAuditList: []
    };
  },
  props: {
    form: {
      type: Object
    },
    rules: {
      type: Object
    },
    currentPageInfo: {
      type: Object
    }
  },
  computed: {
    insureStatus() {
      return this.$globalData.get('trace', 'enums')['审核结果'];
    }
  },
  methods: {
    //添加投保
    addInsureApplication() {
      let insureTypeName = Object.keys(this.insurance).find(key => this.insurance[key] == this.form.insureType);
      this.form.insureApplicationDetail.push({
        detailID: '',
        premium: '',
        productID: '',
        productName: '',
        productNumber: '',
        productSell: '',
        insureType: insureTypeName
      });
    },
    //删除投保
    deleteInsureApplication(row) {
      this.form.insureApplicationDetail.remove(row);
    },
    //所属机构下的，综合险则筛选第三方检测过的上架产品，其他则带出所有上架产品
    getProductSelectFn() {
      this.$ajax
        .get(this.apiUrl.insurance.insureApplication.GET_PRODUCT_AUDIT_LIST, {
          insureID: this.insureID
        })
        .then(r => {
          if (r.resultCode == 200) {
            this.getProductAuditList = r.data;
          } else {
            this.$message.error(r.msg);
          }
        });
    }
  },
  created() {
    if (this.getPageParams('edit')) {
      this.insureID = this.getPageParams('edit').insureID;
      this.pageType = this.getPageParams('edit').pageType;
    } else {
      if (this.$route.query && this.$route.query.insureID != undefined) {
        this.pageType = this.$route.query.pageType;
        this.insureID = this.$route.query.insureID;
      }
    }
    this.getProductSelectFn();
  }
};
</script>
<style rel='stylesheet/less' lang='less' scoped>
@import '../../../../assets/css/config';

.add-application-wrap {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2px;
}

.add-application {
  text-align: center;
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
}
.total-count {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #dfe6ec;
  border-top: none;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.total-count-span {
  font-size: 14px;
  width: 60px;
  text-align: center;
  float: left;
}
.total-count-val {
  padding-left: 30px;
  float: left;
}
.commonbom {
  margin-bottom: 55px;
  float: left;
  width: 100%;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
