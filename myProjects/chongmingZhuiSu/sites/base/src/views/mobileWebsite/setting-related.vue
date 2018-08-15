<template>
  <div>
    <cjm-form ref="mobileWebsiteRelate" :model="form">
      <div class="clear cjm-item-area" v-for="(item, k) in form.mobileWebsiteRelate" :key="k">
        <div class="clear cjm--delete-panel">
          <div class="cjm-item-delete" @click="delRelate(item)"><i class="cjm-icon-close"></i></div>
        </div>
          <cjm-form-item label="关联方式" required class="cjm-form-item-long">
            <cjm-select v-model="item.relateType" placeholder="关联方式">
              <cjm-option v-for="(value, key) in relateTypeItems" :key="value" :label="key" :value="value"></cjm-option>
            </cjm-select>
          </cjm-form-item>
          <cjm-form-item label="关联组织" :prop="'mobileWebsiteRelate.'+k+'.relateCorpID'" :rules="rules.relateCorpID(item)" required class="cjm-form-item-long" v-show="item.relateType > 0">
            <cjm-remote-select v-model="item.relateCorpID" @select="selectRelateCorpID(item,k)" placeholder="关联组织" :remote-url="$globalData.get('base', 'apiUrl').autoComplete.CORP2" :label="item.relateCorpName">
              <template slot-scope="scope">{{scope.item.name}}({{scope.item.corpID}})</template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="关联机构" :prop="'mobileWebsiteRelate.'+k+'.relateOrgID'" :rules="rules.relateOrgID(item)" required class="cjm-form-item-long" v-show="item.relateType == 2 || item.relateType == 3">
            <cjm-remote-select  ref="orgRelateSelect" v-model="item.relateOrgID" @select="selectRelateOrgID(item,k)" :remote-url="$globalData.get('base', 'apiUrl').autoComplete.ORG" :params="{corpID: item.relateCorpID}" :disabled="!item.relateCorpID" :label="item.relateOrgName" placeholder="关联机构">
              <template slot-scope="scope">{{scope.item.name}}({{scope.item.orgCode}})</template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="关联产品" :prop="'mobileWebsiteRelate.'+k+'.relateProductID'" :rules="rules.relateProductID(item)" required class="cjm-form-item-long" v-show="item.relateType == 3">
            <cjm-remote-select  ref="productRelateSelect" v-model="item.relateProductID" @select="selectRelateProductID(item,k)" placeholder="关联产品"  :remote-url="$globalData.get('base', 'apiUrl').autoComplete.ALL_PRODUCT" :params="{type:'h5tool', corpID: item.relateCorpID,orgID: item.relateOrgID}" :disabled="!item.relateCorpID || !item.relateOrgID" :label="item.relateProductName">
              <template slot-scope="scope">{{scope.item.name}}({{scope.item.productCode}})</template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="关联批次" :prop="'mobileWebsiteRelate.'+k+'.relateProductBatchID'" :rules="rules.relateProductBatchID(item)" required class="cjm-form-item-long" v-show="item.relateType == 3">
            <cjm-remote-select ref="productBatchRelateSelect" v-model="item.relateProductBatchID" placeholder="关联批次" :remote-url="$globalData.get('base', 'apiUrl').autoComplete.ALL_PRODUCT_BATCH" :params="{productid: item.relateProductID}" :disabled="!item.relateProductID" :label="item.relateProductBatchCode">
              <template slot-scope="scope">{{scope.item.name}}</template>
            </cjm-remote-select>
          </cjm-form-item>
          <cjm-form-item label="码关联方式" required class="cjm-form-item-long" v-show="item.relateType == 4">
            <cjm-select placeholder="码关联方式" :disabled="true" v-model="codeRelateType">
              <cjm-option v-for="(value, key) in relateCode" :key="value" :label="key" :value="value"> </cjm-option>
            </cjm-select>
          </cjm-form-item>
          <cjm-form-item label="生码批次" :prop="'mobileWebsiteRelate.'+k+'.relateCodeBatchID'" :rules="rules.relateCodeBatchID(item)" required class="cjm-form-item-long" v-show="item.relateType == 4">
            <cjm-remote-select ref="codeBatchRelateSelect"  v-model="item.relateCodeBatchID"  placeholder="生码批次"  :remote-url="$globalData.get('base', 'apiUrl').autoComplete.LOOK_UP_CODE_GENERATION" :params="{corpID: item.relateCorpID}" :label="item.relateCodeBatchName"></cjm-remote-select>
          </cjm-form-item>
       </div>
    </cjm-form>
    <div v-if="isLoading" style="text-align:center;"><i class="el-icon-loading"></i></div>
    <cjm-button class="add-related" @click="addRelated">
      <i class="cjm-icon-add2 add-icon"></i>
      <span class="related-bnt">新增关联信息</span>
    </cjm-button>
  </div>
</template>

<script>
import '../../assets/css/icon.css';
export default {
  data: function() {
    return {
      relateItem: {
        relateType: '0',
        relateID: '',
        listID: '',
        relateCorpID: '',
        relateOrgID: '',
        relateOrgName: '',
        relateProductID: '',
        relateProductName: '',
        relateProductBatchID: '',
        relateProductBatchCode: '',
        relateCodeBatchID: ''
      },
      codeRelateType: '2', //码关联方式
      form: {
        mobileWebsiteRelate: [],
        deleteRelateItem: []
      },
      isLoading: false,
      rules: {
        relateCorpID: (item)=>{
          return [{
            validator: (rule, value, callback) => {
              if ((item.relateType == this.relateTypeItems['按组织关联'] ||
              item.relateType == this.relateTypeItems['按机构关联'] ||
              item.relateType == this.relateTypeItems['按产品批次关联'] ||
              item.relateType == this.relateTypeItems['按码关联']) &&
              (value == '' || value == null || value == undefined)){
                callback(new Error(`企业必须选择`));
              } else {
                callback();
              }
            }, trigger: 'change,blur'
          }];
        },
        relateOrgID: (item)=>{
          return [{
            validator: (rule, value, callback) => {
              if ((item.relateType == this.relateTypeItems['按机构关联'] ||
              item.relateType == this.relateTypeItems['按产品批次关联']) &&
              (value == '' || value == null || value == undefined)){
                callback(new Error(`机构必须选择`));
              } else {
                callback();
              }
            }, trigger: 'change,blur'
          }];
        },
        relateProductID: (item)=>{
          return [{
            validator: (rule, value, callback) => {
              if (item.relateType == this.relateTypeItems['按产品批次关联'] &&
              (value == '' || value == null || value == undefined)){
                callback(new Error(`产品必须选择`));
              } else {
                callback();
              }
            }, trigger: 'change,blur'
          }];
        },
        relateProductBatchID: (item)=>{
          return [{
            validator: (rule, value, callback) => {
              if (item.relateType == this.relateTypeItems['按产品批次关联'] &&
              (value == '' || value == null || value == undefined)){
                callback(new Error(`产品批次必须选择`));
              } else {
                callback();
              }
            }, trigger: 'change,blur'
          }];
        },
        relateCodeBatchID: (item)=>{
          return [{
            validator: (rule, value, callback) => {
              if (item.relateType == this.relateTypeItems['按码关联'] &&
              (value == '' || value == null || value == undefined)){
                callback(new Error(`生码批次必须选择`));
              } else {
                callback();
              }
            }, trigger: 'change,blur'
          }];
        }
      }
    };
  },
  computed: {
    relateTypeItems() {
      return this.$globalData.get('base', 'enums')['关联方式'];
    },
    relateCode() {
      return this.$globalData.get('base', 'enums')['码关联方式'];
    }
  },
  methods: {
    submit() {
      return  new Promise((resolve, reject)=>{
        if(this.form.mobileWebsiteRelate.length != 0){
          this.$refs['mobileWebsiteRelate'].validate((val)=> {
            if(!val){
              throw new Error(`验证错误`);
            }
            this.$ajax.post(this.$globalData.get('base', 'apiUrl').mobileWebsite.ADD_RELATE_ALL, {data: {mobileWebsiteRelate: this.form.mobileWebsiteRelate, deleteRelateItem: this.form.deleteRelateItem}}).then(data => {
              if(data.resultCode != 200){
                reject(new Error(data.msg));
              } else {
                if(data.msg){
                  this.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      resolve();
                    }});
                } else {
                  resolve();
                }
              }
            });
          });
        } else {
          throw new Error(`请先添加关联信息`);
        }
      });
    },
    addForm(id) {
      this.$refs.mobileWebsiteRelate.resetFields();
      this.form.deleteRelateItem = [];//初始化删除项
      this.relateItem.listID = id;
      this.isLoading = true;
      this.$ajax
        .get(this.$globalData.get('base', 'apiUrl').mobileWebsite.GET_DETAIL, {
          listID: id
        })
        .then(r => {
          this.isLoading = false;
          if (r.resultCode == 200) {
            this.$nextTick(()=>{
              this.form.mobileWebsiteRelate = r.data.mobileWebsiteRelate;
            });
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch(()=>{
          this.isLoading = false;
        });
    },
    delRelate(item) {
      this.$confirm('确认要删除？', '提示', { type: 'warning' })
        .then(() => {
          if(item.relateID){
            this.form.deleteRelateItem.push(item.relateID);
          }
          this.form.mobileWebsiteRelate.remove(item);
        })
        .catch(() => {});
    },
    addRelated(){
      this.form.mobileWebsiteRelate.push(Object.deepClone(this.relateItem));
    },
    selectRelateCorpID(item, index){
      item.relateOrgID = '';
      item.relateOrgName = '';
      item.relateProductID = '';
      item.relateProductName = '';
      item.relateProductBatchID = '';
      item.relateProductBatchCode = '';
      item.relateCodeBatchID = '';
      item.relateCodeBatchName = '';
      this.$refs.orgRelateSelect[index].clear();
      this.$refs.productRelateSelect[index].clear();
      this.$refs.productBatchRelateSelect[index].clear();
      this.$refs.codeBatchRelateSelect[index].clear();
    },
    selectRelateOrgID(item, index){
      item.relateOrgName = '';
      item.relateProductID = '';
      item.relateProductName = '';
      item.relateProductBatchID = '';
      item.relateProductBatchCode = '';
      this.$refs.productRelateSelect[index].clear();
      this.$refs.productBatchRelateSelect[index].clear();
    },
    selectRelateProductID(item, index){
      item.relateProductName = '';
      item.relateProductBatchID = '';
      item.relateProductBatchCode = '';
      this.$refs.productBatchRelateSelect[index].clear();
    }
  }
};
</script>

<style scoped>
.add {
  float: left;
  cursor: pointer;
}
.cjm-icon-add2 {
  float: left;
}
.add-related {
  text-align: center;
  color: #20a0ff;
  cursor: pointer;
  clear: both;
  float: left;
  margin-left: 250px;
  border: none;
}
</style>
