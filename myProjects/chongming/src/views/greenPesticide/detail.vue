<template>

  <div style="padding-right: 15px" class="lctstyle">
    <nz-form label-width="130px" ref="form" :model="form" :rules="rules">
      <div class="topinfo ovlct">
        <nz-form-item label="类型">
          <nz-button @click="tabindexFn(index)" :class="{activelct:index==myindex}" v-for="(item,index) in textAry" :key="item.id">{{item.text}}</nz-button>
        </nz-form-item>
      </div>
      <div class="leftright ovlct nongyao" v-if="type==1">
        <div class="left-group">
          <nz-form-item label="登记证号" required>
            <nz-input v-model="form.CertificateNumber" @keyup.enter.native="enterKey" ref="inputPart" v-on:blur="enterKey"></nz-input>
          </nz-form-item>
          <nz-form-item label="登记名称">
            <nz-input v-model="form.CertificateName" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="生产厂家">
            <nz-input v-model="form.ProductionEnterprise" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="有效成分含量">
            <nz-input v-model="form.TotalContent" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="有效起始日">
            <nz-input v-model="form.EffectiveStartDay" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="保质期">
            <nz-input v-model="form.EffectiveEndDay" :readonly="onlyflag"></nz-input>
          </nz-form-item>

        </div>
        <div class="right-group">
          <nz-form-item label="注册商标">
            <nz-input v-model="form.b" ></nz-input>
          </nz-form-item>
          <nz-form-item label="毒性">
            <nz-input v-model="form.Toxicity" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="剂型">
            <nz-input v-model="form.DosageForm" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="有效成分">
            <nz-input v-model="form.bb" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="有效截止日">
            <nz-input v-model="form.EffectiveEndDay" :readonly="onlyflag"></nz-input>
          </nz-form-item>
        </div>
      </div>
      <div class="leftright ovlct feiliao" v-if="type==2">
        <div class="left-group">
          <nz-form-item label="登记证号" required>
            <nz-input v-model="form.RegistrationNumber" v-on:blur="enterKey" @keyup.enter.native="enterKey" ref="inputPart"></nz-input>
          </nz-form-item>
          <nz-form-item label="通用名">
            <nz-input v-model="form.ProductGeneralName" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="生产厂家">
            <nz-input v-model="form.CompanyName" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="适宜作物">
            <nz-input v-model="form.SuitableCrop" :readonly="onlyflag"></nz-input>
          </nz-form-item>
        </div>
        <div class="right-group" required>
          <nz-form-item label="商品名称">
            <nz-input v-model="form.ProductName" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="产品形态">
            <nz-input v-model="form.ProductForm" :readonly="onlyflag"></nz-input>
          </nz-form-item>
          <nz-form-item label="登记技术指标">
            <nz-input v-model="form.TechnicalIndexOfRegistration" :readonly="onlyflag"></nz-input>
          </nz-form-item>

        </div>
      </div>
      <div class="middle" v-if="addflag">
        <div class="lcttable">
          <nz-table element-loading-text="拼命加载中" :data="goodsDetailsReturn" class="nz-table" :stripe="true" tooltip-effect="light" border>
            <nz-table-column label="作物" prop="PesticideName">
              <template slot-scope="scope">
                <nz-input type="text" v-model="scope.row.a"></nz-input>
              </template>
            </nz-table-column>
            <nz-table-column label="防治对象" prop="PesticideSpec">
              <template slot-scope="scope">
                <nz-input type="text" v-model="scope.row.b"></nz-input>
              </template>
            </nz-table-column>
            <nz-table-column label="用药量" prop="PesticideTraderMark">
              <template slot-scope="scope">
                <nz-input type="text" v-model="scope.row.c"></nz-input>
              </template>
            </nz-table-column>
            <nz-table-column label="施用方法" prop="Count">

              <template slot-scope="scope">
                <nz-input type="text" v-model="scope.row.d"></nz-input>
              </template>

            </nz-table-column>

          </nz-table>
        </div>
        <div class="addmiddle ann" v-if="addflag">
          <span @click="pushAry">
            <i class="nz-icon-add2 add-icon"></i>
            <span>添加</span>
          </span>
        </div>
      </div>
      <div class="bottom">
        <div class="ovlct">
          <nz-form-item label="注意事项">
            <nz-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </nz-input>
          </nz-form-item>
        </div>
        <div class="nextbottom ovlct">
          <div class="left-group">
            <nz-form-item label="规格" prop="SpecQuantity" required>
              <nz-input class="input-select-group" v-model="form.SpecQuantity">
                <div class="select-wrap clear" slot="suffix">
                  <nz-valid-reject>
                    <div class="select-item">
                      <nz-enum-select :options="$enum('规格包装类型').values" placeholder="包装类型" v-model="form.SpecType"></nz-enum-select>
                    </div>
                    <div class="select-item">
                      <nz-enum-select :options="$enum('规格包装单位').values" placeholder="包装单位" v-model="form.SpecUnit"></nz-enum-select>
                    </div>
                  </nz-valid-reject>
                </div>
              </nz-input>
            </nz-form-item>
            <nz-form-item label="商品码" prop="TraderMark" required>
              <nz-input v-model="form.TraderMark"></nz-input>
            </nz-form-item>
          </div>
          <div class="right-group">
            <nz-form-item label="装箱规格" prop="SpecQuantity">
              <nz-input class="input-select-group" v-model="form.SpecQuantity1">
                <div class="select-wrap clear" slot="suffix">
                  <nz-valid-reject>
                    <div class="select-item" id="lctyj">
                      <nz-enum-select :options="$enum('规格包装类型').values" placeholder="包装类型" v-model="form.SpecType2"></nz-enum-select>
                    </div>

                  </nz-valid-reject>
                </div>
                <div class="input-unit" slot="suffix">箱</div>
              </nz-input>
            </nz-form-item>
            <nz-form-item label="销售单价" prop="SaleUnitPrice" required>
              <nz-input v-model="form.SaleUnitPrice">
                <div class="input-unit" slot="suffix">元</div>
              </nz-input>
            </nz-form-item>
          </div>
        </div>
      </div>
    </nz-form>
    <div class="nextbtn">

      <nz-button size="small" class="bot3" @click="cancelJump">
        <i class="nz-icon-close"></i>
        返回
      </nz-button>
      <nz-button type="primary" size="small" @click="putIn" class="bot3">
        <i class="nz-icon-confirm"></i>
        确定
      </nz-button>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      myindex: 0,
      textAry: [{ text: '农药', id: 0 }, { text: '肥料', id: 1 }],
      onlyflag: false,
      type: 1,
      addflag: true,
      goodsDetailsReturn: [{}],
      restaurants: [],
      state1: '',
      state2: '',
      formModel: {},
      editID: null,
      editFlag: false,
      form: {},
      rules: {
        CertificateNumber: [{ required: true, message: '请输入登记证号', trigger: 'blur' }]
      }
    };
  },
  watch: {
    $route: function() {
      this.setViewPage();
    }
  },
  mounted() {
    const { type } = this.$route.query;
    this.setViewPage(type);
    const { RegisteCode } = this.$route.query;
    const { edit } = this.$route.query;
    this.editFlag = edit;
    if (RegisteCode) {
      this.queryInfo(RegisteCode);
    }
  },
  methods: {
    putIn() {
      this.$message.success('保存成功!');
      setTimeout(() => {
        this.$router.push({
          path: '/main/greenPesticide'
        });
      }, 2000);
    },
    async queryInfo(val) {
      let url = '';
      url = this.type == 1 ? this.$apiUrl.COMMONAPI.GetPesticideInfoByCertificateNumber + '?CertificateNumber=' + val : this.$apiUrl.COMMONAPI.GetFertilizerInfo + '?keyword=' + val;
      // if (this.type == 1) {
      //   url = this.$apiUrl.COMMONAPI.GetPesticideInfoByCertificateNumber + '?CertificateNumber=' + val;
      // } else {
      //   url = this.$apiUrl.COMMONAPI.GetFertilizerInfo + '?keyword=' + val;
      // }

      let { err, res } = await this.$ajax.post(url);

      if (err) {
        console.log(err);
      } else {
        this.form = res.data;
        this.onlyflag = true;
      }
    },
    async enterKey(event) {
      // let valNow = this.form.CertificateNumber;
      let url = '';
      url = this.type == 1 ? this.$apiUrl.COMMONAPI.GetPesticideInfoByCertificateNumber + '?CertificateNumber=' + this.form.CertificateNumber : this.$apiUrl.COMMONAPI.GetFertilizerInfo + '?keyword=' + this.form.RegistrationNumber;
      // if (this.type == 1) {
      //   this.$apiUrl.COMMONAPI.GetPesticideInfoByCertificateNumber + '?CertificateNumber=' + this.form.CertificateNumber;
      // } else {
      //   url = this.$apiUrl.COMMONAPI.GetFertilizerInfo + '?keyword=' + this.form.RegistrationNumber;
      // }

      let { err, res } = await this.$ajax.post(url);
      // let { res } = await this.$ajax.post(this.$apiUrl.COMMONAPI.GetPesticideInfoByCertificateNumber, { CertificateNumber: this.form.CertificateNumber });
      this.form = {};
      if (err) {
        // let valueNow = this.form.CertificateNumber;
        console.log(err);
        // this.form.CertificateNumber = valueNow;
      } else {
        this.form = res.data;
        // this.form.CertificateNumber = valNow;
        this.onlyflag = true;
      }
    },
    setViewPage(type) {
      // console.log(type);
      this.type = type;
      this.myindex = parseInt(type) - 1;
      if (type == 1) {
        this.addflag = true;
      } else {
        this.addflag = false;
      }
    },
    pushAry() {
      this.goodsDetailsReturn.push({});
    },
    cancelJump() {
      this.$router.push({
        path: '/main/greenPesticide'
      });
    },
    tabindexFn(idx) {
      if (this.editFlag) {
      } else {
        if (this.myindex != idx) {
          this.form = {};
        }
        this.myindex = idx;
        this.type = parseInt(idx) + 1;

        this.setViewPage(this.type);
      }
    },

    handleSelect(item) {
      // console.log(item);
      this.form.CertificateNumber = item.value;
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.lctstyle {
  padding-top: 45px;
  padding-right: 25% !important;
  .activelct {
    background: #00a88a;
    color: #fff;
  }
}
.nextbtn {
  padding-top: 50px;
  text-align: center;
  padding-bottom: 50px;
  .bot3 {
    margin-right: 10px;
  }
}
.ovlct {
  overflow: hidden;
  color: red;
}
.middle {
  margin-left: 20px;
}
.ann {
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
  color: #00a88a;
  font-size: 14px;
}
.bottom {
  margin-top: 30px;
}
</style>
<style lang="less" rel="stylesheet/less">
.lctstyle {
  #lctyj {
    margin-right: 40px;
  }
  .el-autocomplete {
    width: 100%;
  }
}
.lctstyle {
  .lstylelct {
    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner,
    .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #dcdfe6;
    }
  }
}
</style>
