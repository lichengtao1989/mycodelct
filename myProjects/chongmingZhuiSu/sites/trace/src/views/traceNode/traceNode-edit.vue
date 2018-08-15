<template>
  <div class="cjm-edit-page">
    <div class="node-steps">
      <cjm-steps :active="active">
        <cjm-step title="选择产品"></cjm-step>
        <cjm-step title="溯源节点配置"></cjm-step>
      </cjm-steps>
    </div>
    <div v-show="active == 0">
      <cjm-form ref="productSelect" class="product-select" :model="productInfo" :rules="rules">
        <cjm-form-item label="选择产品" class="cjm-form-item-long" prop="id" required>
          <cjm-remote-select :value="productInfo.id"
                             :label="productInfo.name"
                             :remote-url="productListUrl"
                             @select="selectHandler">
            <template slot-scope="scope" class="selectName">
              {{scope.item.name}}
              <span class="cjm-option-subtitle">（编号：{{scope.item.productCode}}）</span>
            </template>
          </cjm-remote-select>
        </cjm-form-item>
      </cjm-form>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button @click="next" type="primary">下一步<i class="cjm-icon-chevron-down cjm-icon-rotate-n90"></i></cjm-button>
      </div>
    </div>
    <div v-if="active == 1">
      <add-node :productObj="productInfo" :editType="0" :from="from"></add-node>
      <div class="cjm-page-bottom-holder"></div>
      <div class="cjm-page-bottom-bar">
        <cjm-button type="primary" @click="prev"><i class="cjm-icon-chevron-down cjm-icon-rotate-90"></i>上一步</cjm-button>
      </div>
    </div>
  </div>
</template>
<script>
  import pageSwitch from 'framework/mixins/pageSwitch';
  import addNode from './traceNode-edit-add.vue'
  export default{
    components: {
      addNode
    },
    mixins: [pageSwitch],
    data(){
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        productListUrl: traceApiUrl.traceNode.TRACE_PRODUCT_LIST,
        active: 0,
        productInfo: {
          id: '',
          name: ''
        },
        from: 'newBuild',
        rules: {
          id: [
            this.$formRules.required
          ]
        }
      }
    },
    methods: {
      selectHandler(val){
        if (val) {
          this.productInfo.id = val.id;
          this.productInfo.name = val.name;
        } else {
          this.productInfo.id = '';
          this.productInfo.name = '';
        }
      },
      next(){
        this.$refs.productSelect.validate(val => {
          if (val) {
            this.active = 1;
          }
        });
      },
      prev(){
        this.active = 0;
      }
    }
  }
</script>
<style lang="less" scoped>
  .node-steps {
    margin-bottom: 20px;
  }

  .product-select {
    width: 500px;
    margin: 100px auto 80px;
    position: relative;
    left: -30px;
  }
</style>
