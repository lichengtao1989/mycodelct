<template>
  <div>
    <center v-if="noSelectInsure">没有任何可选择的险种</center>
    <cjm-form ref="form" :model="form" :rules="rules" v-if="!noSelectInsure">
      <cjm-form-item label="保险公司" prop="insureCorpID" required class="cjm-form-item-long">
        <cjm-radio-group v-model="form.insureCorpID" @change="getInsureType" v-if="addRelate">
          <cjm-radio v-for="(value,key) in insureCorpList" :key="key" :label="value.id">{{value.name}}
          </cjm-radio>
        </cjm-radio-group>
        <div v-if="!addRelate">{{insureCompany}}</div>
      </cjm-form-item>
      <cjm-form-item label="选择险种" class="cjm-form-item-long" prop="insureType" required>
        <cjm-radio-group v-model="form.insureType" :disabled="!addRelate || remainCountLoading || codeCountLoading" v-if="addRelate">
          <cjm-radio label="1" key="1" v-if="radio.show1">综合险</cjm-radio>
          <cjm-radio label="2" key="2" v-if="radio.show2">基础险</cjm-radio>
        </cjm-radio-group>
        <div v-if="!addRelate">{{insureName}}</div>
      </cjm-form-item>
      <cjm-form-item label="选择产品" class="cjm-form-item-long" prop="productID" required>
        <cjm-remote-select v-model="form.productID" :remote-url="$globalData.get('trace', 'apiUrl').insurance.relate.GET_PRODUCT" :params="getProductParams" value-key="productID" label-key="productName" id="productSelect" v-if="addRelate" :disabled="remainCountLoading||codeCountLoading"></cjm-remote-select>
        <div v-if="!addRelate">{{productName}}</div>
      </cjm-form-item>
      <!-- <cjm-form-item label="选择批次" class="cjm-form-item-long">
        <cjm-remote-select v-model="form.productBatchID"
                           :remote-url="$globalData.get('trace', 'apiUrl').insurance.relate.GET_PRODUCT_BATCH"
                           :params="getProductBatchParams"
                           value-key="productBatchID"
                           label-key="productBatchCode"
                           v-if="addRelate"
                           :disabled="remainCountLoading||codeCountLoading"></cjm-remote-select>
        <div v-if="!addRelate">{{productBatchCode}}</div>
      </cjm-form-item> -->
      <cjm-form-item label="剩余份数" class="cjm-form-item-long">
        <span v-if="!remainCountLoading">
          <span class="hint">{{form.remainCount}}</span>（份）</span>
        <span v-if="remainCountLoading">
          <div style="float: left;color: #20a0ff;">正在查询中</div>
          <div class="animation">
            <span>...</span>
            <div class="cover"></div>
          </div>
        </span>
      </cjm-form-item>
      <cjm-form-item label="当前码数" class="cjm-form-item-long">
        <span v-if="!codeCountLoading">
          <span class="hint">{{this.form.codeCount}}</span>（个）</span>
        <span v-if="codeCountLoading" class="loading">
          <div style="float: left;color: #20a0ff;">正在查询中</div>
          <div class="animation">
            <span>...</span>
            <div class="cover"></div>
          </div>
        </span>
      </cjm-form-item>
      <cjm-form-item label="关联份数" class="cjm-form-item-long" prop="relateCount" required>
        <cjm-input style="width:100px" v-model="form.relateCount" v-if="addRelate"></cjm-input>
        <span v-if="!addRelate" class="loading">{{form.relateCount}}</span>（份）（1份保险将任意关联1个码）
      </cjm-form-item>
    </cjm-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        insureType: '',
        productID: '',
        productBatchID: '',
        relateCount: '0',
        remainCount: '0',
        codeCount: '0',
        insureCorpID: ''
      },
      rules: {
        insureType: [this.$formRules.required],
        productID: [this.$formRules.required],
        relateCount: [
          this.$formRules.required,
          {
            validator: (rule, value, callback) => {
              if (value == 0) {
                callback(new Error(`请输入关联份数`));
              } else if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                callback(new Error(`请输入正确的关联份数`));
              } else if (value > this.form.remainCount || value > this.form.codeCount) {
                callback(new Error(`输入数字不可大于剩余份数或者当前码数`));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      radio: {
        show1: false,
        show2: false
      },
      noSelectInsure: false, //有无可用保险
      getProductParams: {},
      getProductBatchParams: {},
      productName: '',
      insureCompany: '',
      productBatchCode: '',
      addRelate: true, //是否为添加关联保险页面，false为查看页面
      remainCountLoading: false,
      codeCountLoading: false,
      insureCorpList: []
    };
  },
  methods: {
    //获取保险公司
    getInsureCorpList() {
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.insureApplication.GET_INSURE_CORP_LIST, { type: 'relate' }).then(r => {
        if (r.resultCode == 200) {
          this.insureCorpList = r.data;
          if (this.form.insureCorpID == '') {
            this.form.insureCorpID = r.data[0].id;
          }
          this.getInsureType(this.form.insureCorpID);
        } else {
          this.$message.error(r.msg);
        }
      });
    },
    //编辑表单
    init(obj) {
      this.$refs.form.resetFields();
      if (obj) {
        this.addRelate = false;
        this.form.insureType = obj.insureType;
        this.form.productID = obj.productID;
        this.form.productBatchID = obj.productBatchID;
        this.form.relateCount = obj.relateCount;
        this.form.remainCount = parseInt(obj.remainCount) + parseInt(obj.relateCount);
        this.form.codeCount = obj.codeCount;
        this.productName = obj.productName;
        this.productBatchCode = obj.productBatchCode;
        this.insureName = obj.insureTypeName;
        this.insureCompany = obj.insureCompany;
        this.radio['show' + this.form.insureType] = true;
      } else {
        this.addRelate = true;
        this.getProductParams = { insureType: this.form.insureType, insureCorpID: this.form.insureCorpID };
        this.getProductBatchParams = { productID: this.form.productID };
      }
    },
    getInsureType(insureCorpID) {
      this.$ajax.get(this.$globalData.get('trace', 'apiUrl').insurance.relate.GET_INSURE_TYPE, { insureCorpID: insureCorpID }).then(d => {
        let me = this;
        if (d.resultCode == 200 && d.data) {
          me.noSelectInsure = false;
          let item = d.data.split(',');
          me.form.insureType = item[0];
          item.forEach(function(d) {
            me.radio['show' + d] = true;
          });
        } else {
          me.noSelectInsure = true;
        }
      });
    },
    //获取剩余的保险份数
    getRemainInsure() {
      if (this.form.productID && this.form.insureType) {
        let params = {
          insureType: this.form.insureType,
          productID: this.form.productID,
          insureCorpID: this.form.insureCorpID
        };
        this.remainCountLoading = true;
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').insurance.relate.GET_REMAIN, params)
          .then(r => {
            if (r.resultCode == '200') {
              this.form.remainCount = r.data || 0;
            }
            this.remainCountLoading = false;
          })
          .catch(r => {
            this.remainCountLoading = false;
          });
      } else {
        this.form.remainCount = 0;
      }
    },
    //获取当前码
    getCodeCount() {
      if (this.form.productID) {
        let params = {
          productID: this.form.productID
        };
        //获取当前码数
        this.codeCountLoading = true;
        this.$ajax
          .post(this.$globalData.get('trace', 'apiUrl').insurance.relate.GET_CURRENT, params)
          .then(r => {
            if (r.resultCode == '200') {
              this.form.codeCount = r.data || 0;
            }
            this.codeCountLoading = false;
          })
          .catch(r => {
            this.codeCountLoading = false;
          });
      } else {
        this.form.codeCount = 0;
      }
    },
    //提交
    submit() {
      return new Promise((resolve, reject) => {
        if (this.remainCountLoading || this.codeCountLoading) {
          reject(new Error('正在查询中,请稍后!'));
          return false;
        }
        this.$refs.form.validate(val => {
          if (val) {
            this.$confirm(
              '保险将关联【' + document.getElementById('productSelect').getElementsByTagName('input')[0].value + '】，关联份数' + this.form.relateCount + ',剩余份数' + (this.form.remainCount - this.form.relateCount) + '.点击确定后，关联将不可被修改',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            )
              .then(() => {
                let postForm = Object.deepClone(this.form);
                postForm.remainCount = this.form.remainCount - this.form.relateCount;
                this.$ajax.post(this.$globalData.get('trace', 'apiUrl').insurance.relate.ADD, postForm).then(data => {
                  if (data.resultCode == 200) {
                    this.$message({
                      type: 'success',
                      message: '关联成功!'
                    });
                    resolve(true);
                  } else {
                    reject(new Error('关联失败'));
                  }
                });
              })
              .catch(() => {
                reject(new Error('取消关联操作'));
              });
          } else {
            reject(new Error('还有必填项没填或者填写有误哦'));
          }
        });
      });
    }
  },
  watch: {
    'form.insureType'(newVal, oldVal) {
      this.getProductParams = { insureType: newVal, insureCorpID: this.form.insureCorpID };
      if (!this.addRelate) {
        return;
      }
      if (newVal != oldVal) {
        this.form.productID = '';
      }
    },
    'form.productID'(newVal, oldVal) {
      this.getProductBatchParams = { productID: newVal };
      if (!this.addRelate) {
        return;
      }
      if (newVal != oldVal) {
        this.getCodeCount();
        this.getRemainInsure();
        this.form.productBatchID = '';
      }
    },
    'form.productBatchID'(newVal, oldVal) {
      if (!this.addRelate) {
        return;
      }
      if (newVal != oldVal) {
        this.getCodeCount();
      }
    },
    'form.insureCorpID'(newVal, oldVal) {
      this.getProductParams = { insureType: this.form.insureType, insureCorpID: newVal };
      if (!this.addRelate) {
        return;
      }
      if (newVal != oldVal) {
        this.getCodeCount();
        this.getRemainInsure();
      }
    }
  },
  created() {
    this.getInsureCorpList();
  }
};
</script>
<style scoped>
.hint {
  color: #20a0ff;
}

.loading {
  font-size: 12px;
  color: #666;
}
.animation {
  width: 50px;
  float: left;
  position: relative;
}

.animation span {
  display: inline-block;
  width: 50px;
  letter-spacing: 2px;
  font-size: 20px;
  line-height: 30px;
  color: #20a0ff;
  margin-left: 5px;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  animation: move 2s infinite;
  background: #fff;
  height: 50px;
}
@keyframes move {
  from {
    left: 0px;
  }
  to {
    left: 50px;
  }
}
</style>
