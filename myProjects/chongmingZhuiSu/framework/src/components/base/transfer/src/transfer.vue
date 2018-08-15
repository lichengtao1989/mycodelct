<template>
  <div class="cjm-transfer clear">
    <div class="cjm-transfer-side">
      <transfer-panel :data="sourceData"
                      :disabled="disabled"
                      :key-prop="keyProp"
                      :label-prop="labelProp"
                      :title="titles && titles.length===2 ? titles[0] : ''"
                      @checked-change="sourceCheckedChange"></transfer-panel>
    </div>
    <div class="cjm-transfer-buttons">
      <cjm-button type="primary" icon="el-icon-arrow-right" :disabled="disabled || leftChecked.length===0" @click="addToRight"></cjm-button>
      <cjm-button type="primary" icon="el-icon-arrow-left" :disabled="disabled || rightChecked.length===0" @click="addToLeft"></cjm-button>
    </div>
    <div class="cjm-transfer-side">
      <transfer-panel :data="targetData"
                      :disabled="disabled"
                      :key-prop="keyProp"
                      :label-prop="labelProp"
                      :title="titles && titles.length===2 ? titles[1] : ''"
                      @checked-change="targetCheckedChange"></transfer-panel>
    </div>
  </div>
</template>

<script>
  import TransferPanel from './transfer-panel.vue'
  import Emitter from 'framework/mixins/emitter';
  export default{
    name: 'cjm-transfer',
    mixins: [Emitter],
    data(){
      return {
        innerData: [], //data的深拷贝对象
        leftChecked: [],
        rightChecked: [],
        currentValue: []
      }
    },
    props: {
      data: {
        type: Array,
        default(){
          return [];
        }
      },
      value: {
        type: Array,
        default(){
          return [];
        }
      },
      disabled: Boolean,
      keyProp: {
        type: String,
        default: 'id'
      },
      labelProp: {
        type: String,
        default: 'name'
      },
      titles: Array
    },
    components: {
      TransferPanel
    },
    computed: {
      sourceData(){
        const result = this.innerData.filter(item => {
          return !item['_isTarget'];
        });
        return result;
      },
      targetData(){
        const result = this.innerData.filter(item => {
          return item['_isTarget'];
        });
        return result;
      }
    },
    watch: {
      value(val){
        if (this.currentValue !== val) {
          this.initData();
        }
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      },
      data(){
        this.initData();
      }
    },
    methods: {
      addToRight(){
        this.leftChecked.forEach(item => {
          this.$set(item, '_isTarget', true);
        });
        this.currentValue = this.innerData.filter(item => {
          return item['_isTarget'];
        }).map(item => {
          return item[this.keyProp];
        });
        this.$emit('input', this.currentValue);
      },
      addToLeft(){
        this.rightChecked.forEach(item => {
          this.$set(item, '_isTarget', false);
        });
        this.currentValue = this.innerData.filter(item => {
          return item['_isTarget'];
        }).map(item => {
          return item[this.keyProp];
        });
        this.$emit('input', this.currentValue);
      },
      sourceCheckedChange(val){
        this.leftChecked = val;
      },
      targetCheckedChange(val){
        this.rightChecked = val;
      },
      //初始化数据
      initData(){
        this.innerData = Object.deepClone(this.data);
        //以1000为单位分批处理数据，避免阻塞渲染进程
        for (let i = 0, len = this.innerData.length; i < len; i += 1000) {
          setTimeout(() => {
            let end = i + 1000 > len ? len : i + 1000;
            for (let j = i; j < end; j++) {
              if (this.value.indexOf(this.innerData[j][this.keyProp]) >= 0) {
                this.$set(this.innerData[j], '_isTarget', true);
              }
            }
          }, 0);
        }
      }
    },
    created(){
      this.initData();
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  .cjm-transfer {
    width: 100%;
    position: relative;

    .cjm-transfer-side {
      width: 50%;
      float: left;
      box-sizing: border-box;
    }

    .cjm-transfer-side:first-child {
      padding-right: 35px;
    }

    .cjm-transfer-side:last-child {
      padding-left: 35px;
    }

    .cjm-transfer-buttons {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100px;
      width: 48px;
      margin-left: -24px;
      margin-top: -50px;

      .el-button {
        margin-left: 0;
        padding: 10px 16px;

        i{
          margin-right: 0;
        }

        &:first-child {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
        }

        &:last-child {
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
</style>
