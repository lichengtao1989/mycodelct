<template>
  <div>
    <div v-for="item in field" :key="item.fieldKey">
      <cjm-form label-width="140px">
        <!--文字字段-->
        <cjm-form-item v-if="item.type == 1"
                       :label="item.fieldName"
                       :required="item.isRequired == 1"
                       class="cjm-form-item-long">
          <cjm-input v-model="item.defaultValue"></cjm-input>
          <span v-if="item.unitValue">单位：{{item.unitValue}}</span>
        </cjm-form-item>
        <!--图片字段-->
        <cjm-form-item v-if="item.type == 2"
                       :label="item.fieldName"
                       :required="item.isRequired == 1"
                       class="cjm-form-item-long">
          <img-upload :max-number="item.maxNumber" :multiple="true" v-model="item.imageItem" :set-title="item.isRemarkEnable == '1'"></img-upload>
          <!--<div v-for="(img,index) in item.imageItem" :key="index" class="clear marginBottom">-->
          <!--<img-upload :set-title="item.isRemarkEnable == '1'"></img-upload>-->
          <!--<cjm-image-upload v-model="img.imageValue" :multiple="false" style="float: left;"></cjm-image-upload>-->
          <!--<cjm-form-item v-if="item.isRemarkEnable == '1'" label="图片说明">-->
          <!--<cjm-input></cjm-input>-->
          <!--</cjm-form-item>-->
          <!--</div>-->
        </cjm-form-item>
        <!--单选字段-->
        <cjm-form-item v-if="item.type == 3"
                       :label="item.fieldName"
                       :required="item.isRequired == 1"
                       class="cjm-form-item-long">
          <cjm-select v-model="item.selectValue" v-if="item.dataType == 0">
            <cjm-option v-for="(opt,index) in selectOption(item.dataValue)" :label="opt.label" :value="opt.value"
                        :key="index"></cjm-option>
          </cjm-select>
          <cjm-remote-select
            v-model="item.selectValue"
            v-if="item.dataType != 0"
            :remote-url="item.apiUrl?item.apiUrl:''">
          </cjm-remote-select>
        </cjm-form-item>
        <!--时间字段-->
        <cjm-form-item v-if="item.type == 4"
                       :label="item.fieldName"
                       :required="item.isRequired == 1"
                       class="cjm-form-item-long">
          <cjm-input></cjm-input>
        </cjm-form-item>
      </cjm-form>
    </div>
  </div>
</template>
<script>
  import imgUpload from '../../traceRecord/components/img-upload/image-upload.vue'
  import util from '../util'
  export default{
    components: {
      imgUpload
    },
    data(){
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        field: []
      }
    },
    props: ['fieldConfig'],
    methods: {
      previewConfig(config){
        config.forEach((val, i, arr) => {
          let target = {
            applyType: val.applyType,
            fieldName: val.fieldName,
            isRequired: val.isRequired,
            nodeID: val.nodeID,
            showHidden: val.showHidden,
            sortID: val.sortID,
            fieldKey: val.fieldKey,
            type: val.type
          };
          switch (val.type) {
            case 1:
              target.defaultValue = util.findItemValue(val.fieldExt, 'defaultValue').itemValue;
              target.unitValue = util.findItemValue(val.fieldExt, 'unitValue').itemValue;
              break;
            case 2:
              target.imageItem = [];
              target.requiredNumber = util.findItemValue(val.fieldExt, 'requiredNumber').itemValue;
              target.minNumber = parseInt(util.findItemValue(val.fieldExt, 'minNumber').itemValue);
              target.maxNumber = parseInt(util.findItemValue(val.fieldExt, 'maxNumber').itemValue);
              target.isRemarkEnable = util.findItemValue(val.fieldExt, 'isRemarkEnable').itemValue;
              break;
            case 3:
              target.selectValue = '';
              target.dataValue = util.findItemValue(val.fieldExt, 'dataValue').itemValue;
              target.dataType = util.findItemValue(val.fieldExt, 'dataType').itemValue;
              target.apiUrl = this.localList(target.dataType);
              break;
            case 4:
              break;
          }
          this.field.push(target);
        });
      },
      /*选项列表*/
      localList(val){
        let url = '';
        switch (val) {
          case '1':
            url = this.traceApiUrl.autoComplete.ORG;
            break;
          case '2':
            url = this.traceApiUrl.autoComplete.PRODUCT;
            break;
          case '3':
            url = this.traceApiUrl.autoComplete.PRODUCT_BATCH;
            break;
          case '4':
            url = this.traceApiUrl.autoComplete.USER;
            break;
          case '5':
            url = this.traceApiUrl.autoComplete.PLOTS;
            break;
          case '6':
            url = this.traceApiUrl.autoComplete.INPUTS;
            break;
          case '7':
            url = this.traceApiUrl.autoComplete.MONITOR;
            break;
        }
        return url;
      },
      /*配置节点预览中的单选 选项*/
      selectOption(val){
        let result = [];
        let arr = val.split('\n');
        if (arr.length < 0) {
          return [];
        }
        for (let i = 0; i < arr.length; i++) {
          result.push({
            value: arr[i],
            label: arr[i]
          });
        }
        return result;
      },
      /*重置*/
      reset(){
        this.field = [];
      },
      addForm(){
        this.reset();
        this.previewConfig(this.fieldConfig);
      }
    },
    watch: {
      imageItem(newVal, oldVal){
        console.log(newVal, oldVal);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../assets/css/config";

  .marginBottom {
    margin-bottom: 20px;
  }
</style>
