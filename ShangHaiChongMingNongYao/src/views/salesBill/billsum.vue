<template>
  <div class="billsumout">
    <div class=" listval">
      <div class="smqd"> 清单共
        <span class="totlist co1">2</span>项总计:
        <span class="totval co1">300.00</span>元</div>
      <div class="rightinfolct">
        <div class="sm1">待付金额:
          <span class="co2">￥
            <span class="dfje">300.00</span>
          </span>元</div>
        <div class="sm2">
          <div class="sml">付款方式:</div>
          <div class="smr">
            <div class="part">
              <div class="line1 m10">
                <nz-radio v-model="radio" label="1"></nz-radio>
                <span class="m15">补贴账号可用金额:</span>
                <span class="co2">￥
                  <span class="kyje">3000.00</span>
                </span>
              </div>
              <div class="line1 m20">扣款金额:
                <nz-input type="text" class="xxi"></nz-input><span class="yy">元</span></div>
            </div>
            <div class="part">
              <div class="line1 m10">
                <nz-radio v-model="radio" label="2"></nz-radio>
                <span class="m15">现金支付</span>
              </div>
              <div class="line1 m20">付款金额:
                <nz-input type="text" class="xxi"></nz-input><span class="yy">元</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nextje">
      实付金额:
      <span class="sfje co2">￥<span class="jeval ">300.00</span></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1'
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>

.billsumout {
  border: 1px solid #e9f4f2;

  font-size: 13px;
}
.listval {
  position: relative;
  height: 226px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 19px;
  padding-left: 16px;
}
.nextje {
  border-top: 1px solid #e9f4f2;
  height: 39px;
  line-height: 39px;
  padding-left:83.2%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.co1 {
  color: #03a78c;
}
.rightinfolct {
  width: 320px;
  position: absolute;
  top: 25px;
  right: 0;
  z-index: 2;
  .m15 {
    padding-left: 10px;
  }
  .part {
    width: 100%;
   
  }
  .part:first-child{margin-bottom:15px;}
  .sm1 {
    padding-left: 112px;
    padding-bottom: 25px;
  }
  .sm2 {
    overflow: hidden;
    .sml,
    .smr {
      display: inline-block;
      vertical-align: top;
    }
  }
  .xxi {
    width: 108px !important;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .m10 {
    margin-bottom: 10px;
    padding-left: 15px;
  }
  .m20 {
    padding-left: 38px;
  }
}
.co2 {
  color: #ff4949;
}
.yy{padding-left:14px;}
</style>
<style lang="less" rel="stylesheet/less" >
.rightinfolct {
  .el-radio__label {
    display: none !important;
  }
}
</style>
