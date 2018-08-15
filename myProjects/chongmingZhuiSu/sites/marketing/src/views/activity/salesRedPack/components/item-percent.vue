<template>
  <div>
    <div class="clear" style="position:relative;margin-bottom: 20px" v-for="(item,index) in form.amtPercent">
      <cjm-form-item label="单个红包金额(元)" required class="cjm-form-item-long">
        <cjm-input :value="item.amount" @input="limitAmount(arguments[0],index)" placeholder="请输入红包金额" style="width: 48%;"></cjm-input>
      </cjm-form-item>
      <cjm-form-item label="获得红包概率(%)" required class="cjm-form-item-long">
        <cjm-input v-model="item.percents" @input="limitPercent(arguments[0],index)" placeholder="请输入红包概率" style="width: 48%;"></cjm-input>
        <div class="handle-btn clear">
          <i class="cjm-icon-delete delete-btn" v-show="form.amtPercent.length != 1" @click="deletePercent(index)"></i>
          <i class="cjm-icon-add2 add-btn" v-show="index == form.amtPercent.length - 1 && index < 4"
             @click="addPercent"></i>
        </div>
      </cjm-form-item>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        amtPercent: {}
      }
    },
    props: {
      form: {
        type: Object
      }
    },
    methods: {
      addPercent(){
        this.form.amtPercent.push({
          amount: '',
          percents: '',
          prizeID: '',
          status: ''
        })
      },
      limitAmount(val, index){
        this.form.amtPercent[index].amount = val;
        if (val < 1) {
          this.$message('红包金额不能小于1元！');
        }
      },
      limitPercent(val, index){
        if (val >= 0) {
          this.form.amtPercent[index].percents = val;
        } else {
          this.form.amtPercent[index].percents = 0;
          this.$message('获奖概率不能小于 0%！');
        }
        if (val > 100) {
          this.form.amtPercent[index].percents = 100;
          this.$message('获奖概率不能大于 100%！');
        }
      },
      deletePercent(index){
        this.form.amtPercent.splice(index, 1);
      }
    }
  }
</script>
<style rel='stylesheet/less' lang='less' scoped>
  @import "../../../../assets/css/config";

  .amount label {
    text-align: center !important;
  }

  .cjm-icon-relation {
    position: absolute;
    left: 53%;
    transform: rotate(45deg);
    margin-top: 10px;
  }

  .handle-btn {
    color: #20a0ff;
    width: 52px;
    display: inline-block;
    i {
      color: #20a0ff;
      float: left;
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
