<template>
  <cjm-form ref="form" :model="form" :rules="rules">
    <cjm-form-item label="关联关系" prop="relation" class="cjm-form-item-long">
      <cjm-autocomplete v-model="form.relation"
                        :fetch-suggestions="queryRelation"></cjm-autocomplete>
    </cjm-form-item>
  </cjm-form>
</template>

<script>
  export default{
    data(){
      return {
        form: {},
        rules: {
          relation: []
        },
        productIDs: ''
      }
    },
    methods: {
      editForm(relation){
        this.productIDs = relation.parents.map(parent=> {
          return parent.productID;
        }).join(',');
        this.reset();
        this.$nextTick(()=> {
          this.form.relation = relation.name;
        });
      },
      submit(){
        return this.$refs.form.validate().then(()=>{
          return this.form;
        });
      },
      reset(){
        this.form = {
          relation: ''
        };
        this.$nextTick(()=> {
          this.$refs.form.resetFields();
        });
      },
      queryRelation(queryString, cb){
        let params = {
          inputValue: queryString,
          productID: this.productIDs
        };
        this.$ajax.get(this.$globalData.get('trace', 'apiUrl').autoComplete.TRACE_NODE_CONFIG, params).then(r=> {
          if(r.resultCode == 200){
            cb(r.data.map(item=> {
              return {value: item.name};
            }));
          }
        });
      }
    },
    created(){
      this.reset();
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>

</style>
