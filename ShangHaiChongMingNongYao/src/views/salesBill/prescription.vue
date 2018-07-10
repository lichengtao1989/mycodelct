<template>
  <div class="prescriptionwrap">
    <div class="prescriptionlist">
      <div class="tops">处方单
        <div class="pobj">
          <span class="bj1">
            <i class="nz-icon-edit"></i>
          </span>
          <span class="bj1">
            <i class="nz-icon-close"></i>
          </span>
        </div>
      </div>
      <div class="nextll">
        <div class="sst">
          <div class="pp">
            <span class="spl1">针对作物:</span>敌敌畏</div>
          <div class="pp">
            <span class="spl1">生长阶段:</span>xxxx</div>
          <div class="pp">
            <span class="spl1">针对病虫害:</span>xxxx</div>
        </div>
        <div class="sst">
          <div class="pp">
            <span class="spl1">商品名称:</span>敌敌畏</div>
          <div class="pp">
            <span class="spl1">亩用量:</span>xxxx</div>
          <div class="pp">
            <span class="spl1">安全间隔期:</span>xxxx</div>
          <div class="pp">
            <span class="spl1">农药药性:</span>xxxx</div>
          <div class="pp">
            <span class="spl1">使用方法:</span>xxxx</div>
        </div>
        <div class="sst">
          <div class="pp">
            <span class="spl1">用药注意事项:</span>敌敌畏</div>
        </div>
      </div>
    </div>
    <!-- <div class="ann" @click.once="lookPrescription"> -->
    <div class="ann" @click="lookPrescription">
      <span>
        <i class="nz-icon-add2 add-icon"></i>处方单</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    lookPrescription() {
      console.log(123);
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
