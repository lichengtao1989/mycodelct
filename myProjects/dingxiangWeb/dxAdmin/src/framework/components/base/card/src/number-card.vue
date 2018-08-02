<template>
  <transition name="nz-normal-card-wrap">
    <!--卡片包裹容器-->
    <div class="nz-normal-card-wrap nz-number-card-wrap nz-card-wrap"
         :class="[size]" v-if="editable || visible">
      <nz-card-inside :title="title"
                       :sub-title="subTitle"
                       :editable="editable"
                       :status="status"
                       :visible="visible"
                       :head-operates="headOperates"
                       @visibleChange="visibleChange">
        <slot>
          <div class="nz-number-card-value" :style="{lineHeight: ratioStatus ? '' : '160px'}">
            {{value}}{{unit}}
          </div>
          <div class="nz-number-card-ratio" v-if="ratioStatus">
            <p class="nz-number-card-ratio-loop">
              环比{{ratioStatus==='daily' ? '前日' : '前月'}}：
              <i class="nz-icon-drop"
                 v-if="loopRatio!==''"
                 :class="loopRatio>=0 ? 'nz-icon-rotate-180' : ''"
                 :style="{color: loopRatio>0 ? '#1ad900' : '#f44'}"></i>
              {{loopRatio==='' ? '暂无数据' : Math.abs(loopRatio)*100+'%'}}
            </p>
            <p class="nz-number-card-ratio-term">
              同比{{ratioStatus==='daily' ? '上月' : '去年'}}：
              <i class="nz-icon-drop"
                 v-if="termRatio!==''"
                 :class="termRatio>=0 ? 'nz-icon-rotate-180' : ''"
                 :style="{color: termRatio>0 ? '#1ad900' : '#f44'}"></i>
              {{termRatio==='' ? '暂无数据' : Math.abs(termRatio)*100+'%'}}
            </p>
          </div>
        </slot>
        <template slot="bottomRightOperate">
          <slot name="operate"></slot>
        </template>
      </nz-card-inside>
    </div>
  </transition>
</template>

<script>
  import Card from './card.vue'
  export default {
    name: 'nz-number-card',
    componentName: 'nz-card',
    mixins: [Card],
    data(){
      return {
        value: '',
        unit: '',
        ratioStatus: '',
        termRatio: '',
        loopRatio: ''
      }
    },
    props: {
      /**
       * 数据
       */
      data: {
        required: true
      }
    },
    watch: {
      data: function (val) {
        this.setData(val);
      }
    },
    methods: {
      setData(val){
        if (!val || (Array.isArray(val) && val.length === 0)) {
          return;
        }
        if (!this.checkData(val)) {
          this.$emit('update:status', 'error');
          return;
        }
        this.value = this.getValue(val[0]);
        this.unit = val[0].unit || '';
        this.ratioStatus = val[0].ratioStatus;
        this.termRatio = val[0].termRatio || '';
        this.loopRatio = val[0].loopRatio || '';
      },
      checkData(data){
        if (!Array.isArray(data)) {
          return false;
        }
        for (let item of data) {
          if (!item.value || !/^\-?\d+(\.\d+)?$/.test(item.value)) {
            return false;
          }
        }
        return true;
      },
      getValue(data){
        if (data.value < Math.pow(10, 4)) {
          return data.value;
        }
        if (data.value >= Math.pow(10, 4) && data.value < Math.pow(10, 8)) {
          return Math.round(data.value / 100) / 100 + '万';
        }
        if (data.value > Math.pow(10, 8)) {
          return Math.round(data.value / Math.pow(10, 6)) / 100 + '亿';
        }
      }
    },
    mounted(){
      this.setData(this.data);
    }
  }
</script>

<style rel='stylesheet/less' lang='less'>
  @import "../../../../assets/css/config";

  @cardColor: #5fbaff;

  .nz-number-card-wrap .nz-card {
    border-top-color: @cardColor;

    .nz-card-head-title-main:before {
      background: @cardColor;
    }

    .nz-number-card-value {
      text-align: center;
      font-size: 35px;
      line-height: 90px;
      color: #333;
    }

    .nz-number-card-ratio {
      text-align: center;
      line-height: 28px;
      color: #aaa;
    }
  }
</style>
