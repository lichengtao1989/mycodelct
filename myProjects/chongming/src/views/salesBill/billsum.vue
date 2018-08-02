<template>
  <div class="billsumout">
    <div class=" listval">
      <div class="smqd"> 清单共
        <span class="totlist co1">{{dataAry.length}}</span>项总计:
        <span class="totval co1">{{computedVal}}</span>元</div>
      <div class="rightinfolct">
        <div class="sm1">待付金额:
          <span class="co2">￥
            <span class="dfje">{{computedVal}}</span>
          </span>元</div>
        <div class="sm2">
          <div class="sml">付款方式:</div>
          <div class="smr">
            <div class="part">
              <div class="line1 m10">
                <!-- <nz-radio v-model="radio" label="1" @change="changeFnRadio"></nz-radio>
                 -->
                <el-checkbox v-model="checked"></el-checkbox>
                <span class="m15">补贴账号可用金额:</span>
                <span class="co2">￥
                  <span class="kyje">{{subsidy}}</span>
                </span>
              </div>
              <div class="line1 m20" v-if="checked==true?true:false">扣款金额:
                <nz-input type="text" class="xxi" v-model="subsidypay" @input="inputFn"></nz-input>
                <span class="yy">元</span>
              </div>
            </div>
            <div class="part">
              <div class="line1 m10">
                <!-- <nz-radio v-model="radio" label="2" @change="changeFnRadio"></nz-radio> -->
                <el-checkbox v-model="checked2" @change="changeFnT2"></el-checkbox>
                <span class="m15">现金支付</span>
              </div>
              <div class="line1 m20" v-if="checked2==true?true:false">付款金额:
                <nz-input type="text" class="xxi" :readonly="compb" v-model="actualPayment" @input="inputFn"></nz-input>
                <span class="yy">元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nextje">
      实付金额:
      <span class="sfje co2">￥
        <span class="jeval ">{{nowPay}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    compb: function() {
      let bools = true;
      if (this.checked2) {
        bools = false;
      }
      return bools;
    },
    computedVal: function() {
      let val = 0;
      if (this.dataAry.length < 1) {
        val = 0;
      }
      for (let i = 0; i < this.dataAry.length; i++) {
        if (this.dataAry[i].Amount) {
          val += this.sumFn(this.dataAry[i].SaleUnitPrice, this.dataAry[i].Amount);
        }
      }
      this.total = val;
      // console.log(this.total);
      if (this.checked == true && val > 0) {
        // this.subsidypay = val;
        // let picDif = this.subsidy - val;
        // if (picDif > 0) {
        //   this.subsidypay = '';
        // } else {
        //   // this.subsidypay = Math.abs(picDif);
        //   this.subsidypay = val;
        //   this.nowPay = Math.abs(picDif);
        // }
      }
      // if (this.checked2 == true && val > 0) {
      //   console.log(11)
      //   // this.actualPayment = val;
      //   // this.nowPay = val;
      // }
      return val;
    }
  },
  props: {
    subsidy: { type: Number, default: 0 },
    dataAry: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      checked2: false,
      checked: false,
      subsidypay: '',
      radio: '1',
      actualPayment: '',
      nowPay: 0,
      total: ''
    };
  },
  mounted() {},
  methods: {
    changeFnT2() {
      if (this.checked2 == false) {
        this.nowPay = 0;
        this.actualPayment = '';
      }
    },
    inputFn() {
      // if (this.actualPayment > this.total) {
      //   this.actualPayment = this.total;
      // }
      let pay1 = parseFloat(this.subsidypay) || 0;
      let pay2 = parseFloat(this.actualPayment) || 0;

      this.nowPay = pay1 + pay2;
    },

    sumFn(a, b) {
      let total = '';
      if (b) {
        total = parseFloat(a * b);
      } else {
        total = 0;
      }
      return total;
    }
  }
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
  padding-left: 83.2%;
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
  .part:first-child {
    margin-bottom: 15px;
  }
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
.yy {
  padding-left: 14px;
}
</style>
<style lang="less" rel="stylesheet/less" >
.rightinfolct {
  .el-radio__label {
    display: none !important;
  }
}
</style>
