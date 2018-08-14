##下拉使用方式：
<nz-select v-model="item.productName">
    <nz-option v-for="(item,index) in infoVal" :key="index" :label="item.ProductName" :value="item.PesticideId"></nz-option>
</nz-select>
##下拉选择枚举的用法
<cjm-form-item label="所属镇" prop="standard" required>
          <cjm-enum-select v-model="form.town" enum-name="崇明乡镇" enum-namespace="trace" :clearable="true"></cjm-enum-select>
 </cjm-form-item>
 watch用法 监听form.town,数据变化的时候做相应的数据变化，页面渲染
  watch: {
    'form.town'(val) {
      console.log(val);
      this.checkOrgParams['Type'] = val;
    }}
 ##cjm-list中添加查询参数
<cjm-list :request-url="requestUrl" :need-base-search="false" :need-advanced-search="true" ref="list" :before-search="beforeSearch" :auto-get-data="false">
methods: {
  beforeSearch(conditions){
    if (conditions.productID && conditions.productID.indexOf(',') > 0) {
      let a = conditions.productID.split(',');
      conditions.productID = a[0];
      conditions.specID = a[1];
    }
    return conditions;
  },
}
