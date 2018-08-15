<template>
  <div v-if="insureCompany">
    <comprehensive   ref="comprehensive" v-show="id==1 && insureType==1"></comprehensive>
    <comprehensive-clause  ref="comprehensiveClause" v-show="id==4 && insureType==1"></comprehensive-clause>
    <comprehensive-info   ref="comprehensiveInfo" v-show="id==3 && insureType==1"></comprehensive-info>
    <basic ref="basic" v-show="id==2 && insureType==2"></basic>
    <basic-clause ref="basicClause" v-show="id==4 && insureType==2"></basic-clause>
    <basic-info  ref="basicInfo" v-show="id==3 && insureType==2"></basic-info>
  </div>
  <div v-else>
    <zhonghua-comprehensive   ref="comprehensive" v-show="id==1 && insureType==1"></zhonghua-comprehensive>
    <zhonghua-comprehensive-clause  ref="comprehensiveClause" v-show="id==4 && insureType==1"></zhonghua-comprehensive-clause>
    <zhonghua-comprehensive-info   ref="comprehensiveInfo" v-show="id==3 && insureType==1"></zhonghua-comprehensive-info>
    <zhonghua-basic ref="basic" v-show="id==2 && insureType==2"></zhonghua-basic>
    <zhonghua-basic-clause ref="basicClause" v-show="id==4 && insureType==2"></zhonghua-basic-clause>
    <zhonghua-basic-info  ref="basicInfo" v-show="id==3 && insureType==2"></zhonghua-basic-info>
  </div>
</template>
<script>
import Comprehensive from './components/pingan/comprehensive.vue';
import ComprehensiveClause from './components/pingan/comprehensive-clause.vue';
import ComprehensiveInfo from './components/pingan/comprehensive-info.vue';
import Basic from './components/pingan/basic.vue';
import BasicClause from './components/pingan/basic-clause.vue';
import BasicInfo from './components/pingan/basic-info.vue';
import zhonghuaComprehensive from './components/zhonghua/comprehensive.vue';
import zhonghuaComprehensiveClause from './components/zhonghua/comprehensive-clause.vue';
import zhonghuaComprehensiveInfo from './components/zhonghua/comprehensive-info.vue';
import zhonghuaBasic from './components/zhonghua/basic.vue';
import zhonghuaBasicClause from './components/zhonghua/basic-clause.vue';
import zhonghuaBasicInfo from './components/zhonghua/basic-info.vue';
export default {
  components: {
    Comprehensive,
    ComprehensiveClause,
    ComprehensiveInfo,
    Basic,
    BasicClause,
    BasicInfo,
    zhonghuaComprehensive,
    zhonghuaComprehensiveClause,
    zhonghuaComprehensiveInfo,
    zhonghuaBasic,
    zhonghuaBasicClause,
    zhonghuaBasicInfo
  },
  data() {
    return {
      id: 1,
      insureType: 1,
      insureCompany: true
    };
  },
  methods: {
    addForm(id, type, name) {
      this.$nextTick(() => {
        this.id = id;
        this.insureType = type;
        if(name.indexOf('平安') < 0){
          this.insureCompany = false;
        }else{
          this.insureCompany = true;
        }
      });
    }
  }
};
</script>
<style scoped>
.hint {
  color: #20a0ff;
}

.loading {
  font-size: 12px;
  color: #666;
}
</style>
