<template>
  <div class="prescriptionwrap">
    <div class="prescriptionlist" v-if="infoAry.crop">
      <div class="tops">处方单
        <div class="pobj">
          <span class="bj1" @click="editFn">
            <i class="nz-icon-edit"></i>
          </span>
          <span class="bj1" @click="delFn">
            <i class="nz-icon-close"></i>
          </span>
        </div>
      </div>
      <div class="nextll">
        <div class="sst">
          <div class="pp">
            <span class="spl1">针对作物:</span>{{infoAry.crop}}
          </div>
          <div class="pp">
            <span class="spl1">生长阶段:</span>{{infoAry.growth}}
          </div>
          <div class="pp">
            <span class="spl1">针对病虫害:</span>{{infoAry.pest}}
          </div>
        </div>
        <div class="sst" v-for="item in infoAry.productList" :key="item.productName">
          <div class="pp">
            <span class="spl1">商品名称:</span>{{item.productName}}
          </div>
          <div class="pp">
            <span class="spl1">亩用量:</span>{{item.num}}
          </div>
          <div class="pp">
            <span class="spl1">安全间隔期:</span>{{item.day}}
          </div>
          <!-- <div class="pp">
            <span class="spl1">农药药性:</span>xxxx
          </div> -->
          <div class="pp">
            <span class="spl1">使用方法:</span>
            <span v-for="itm in item.type" :key="itm">{{itm}}</span>
          </div>
        </div>
        <div class="sst">
          <div class="pp">
            <span class="spl1">用药注意事项:</span>{{infoAry.warnText}}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="ann" @click.once="lookPrescription"> -->
    <div class="ann" @click="lookPrescription">
      <span>
        <i class="nz-icon-add2 add-icon"></i>
        <span>处方单</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoAry: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      prescriptionListAry: [1]
    };
  },
  mounted() {},
  methods: {
    delFn() {
      this.$emit('delPrescriptionList');
    },
    editFn() {
      this.$emit('editPrescriptionList');
    },
    lookPrescription() {
      this.$emit('lookPrescription');
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.prescriptionlist {
  border: 1px solid #d9d9d9;
  .nextll {
    padding-top: 29px;
    padding-left: 17px;
  }
}

.prescriptionwrap {
  padding-top: 35px;
  padding-bottom: 51px;
  .tops {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 17px;
    border-bottom: 1px solid #d9d9d9;
  }
  .pp {
    display: inline-block;
    vertical-align: top;
    width: 250px;
    padding-bottom: 20px;
    color: #333;
  }
  .ann {
    cursor: pointer;
    margin-top: 20px;
    text-align: center;
    color: #00a88a;
  }
  .pobj {
    position: absolute;
    top: 0;
    right: 20px;
    color: #333;
    cursor: pointer;
    .bj1 {
      margin-left: 10px;
    }
  }
}
</style>
