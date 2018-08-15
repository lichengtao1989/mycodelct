<template>
  <div class="cjm-view-page">
    <div v-if="currentPage=='edit'">
      <cjm-form>
        <cjm-form-item label="入库机构" prop="stockInOrgID" required>
          这是一段测试文本内容
        </cjm-form-item>
        <cjm-form-item label="入库类型" prop="billType" required>
          这是一段测试文本内容
        </cjm-form-item>
        <cjm-form-item label="入库类型" prop="billType" required class="cjm-form-item-long">
          这是一段测试文本内容这是一段测试文本内容这是一段测试文本内容这是一段测试文本内容这是一段测试文本内容<br/>
          这是一段测试文本内容<br/>
          这是一段测试文本内容<br/>
          这是一段测试文本内容<br/>
          这是一段测试文本内容<br/>
        </cjm-form-item>
        <cjm-form-item label="附件图片" prop="images" class="cjm-form-item-long">
          <cjm-image-upload v-model="form.images" :multiple="true" :maxNumber="5" :disabled="true"></cjm-image-upload>
        </cjm-form-item>
        <cjm-form-item label="入库类型" prop="billType" required class="cjm-form-item-long">
          <cjm-radio-group v-model="form.relationCodeType">
            <cjm-radio label="1" key="1">按号段</cjm-radio>
            <cjm-radio label="2" key="2">单码</cjm-radio>
          </cjm-radio-group>
        </cjm-form-item>
      </cjm-form>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="popPage"><i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
        <cjm-button type="primary" @click="next"><i class="cjm-icon-confirm"></i>进入</cjm-button>
      </div>
    </div>
    <div v-if="currentPage=='next'">
      下一级
      <cjm-button @click="popPage"><i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>返回</cjm-button>
    </div>
  </div>
</template>

<script>
  import pageSwitch from 'framework/mixins/pageSwitch'
  export default{
    mixins: [pageSwitch],
    data(){
      return {
        name: 'edit',
        form: {
          stockInOrgID: '',
          billType: '',
          images: ['http://resource1.app315.net/10054/f8358038769f41e1949fa73eed659b6b.jpg',
            'http://resource1.app315.net/10054/04340b91ceb944178d63b7f9e9295711.png'],
          relationCodeType: '1'
        },
        currentPage: 'edit'
      }
    },
    methods: {
      next(){
        this.pushPage('next', '测试', {});
      },
      pageSwitched(codes){
        this.currentPage = codes.length > 1 ? codes[1] : 'edit';
      }
    },
    mounted(){
      //console.log(this.getPageParams('edit'));
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>

</style>
