<template>
  <div>
    <cjm-alert class="cjm-alert-static" :title="alertText" type="info" show-icon></cjm-alert>
    <cjm-form style="margin-top: 22px" ref="form" :model="form" :rules="rules">

      <template v-if="ctrl==='add'||ctrl==='edit'">
        <cjm-form-item label="关联产品" :required="isProductIDRequired" v-model="form.productID" prop="productID" class="cjm-form-item-long">
          <cjm-remote-select ref="relateProduct" @select="productSelect" :remote-url="codeUrl.autoComplete.LOOKUP_CORRELATIVE_PRODUCT" :params="{from:'LogisticsCodeBind'}" :label="form.productName" v-model="form.productID">
            <template slot-scope="scope">
              <span class="cjm-option-subtitle">({{scope.item.productCode}})</span>
              <span>{{scope.item.name}}</span>
            </template>
          </cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="关联批次" :required="isProductBatchIDRequired" v-model="form.productBatchID" prop="productBatchID" class="cjm-form-item-long">
          <cjm-remote-select @select="productBatchSelect" :remote-url="codeUrl.autoComplete.PRODUCT_BATCH" :params="{productID:form.productID}" :label="form.productBatchCode" v-model="form.productBatchID"></cjm-remote-select>
        </cjm-form-item>
      </template>

      <template>
        <cjm-form-item label="关联方式" v-model="form.bindType" prop="bindType" required class="cjm-form-item-long">
          <cjm-radio class="radio" v-model="form.bindType" label="1">按号段</cjm-radio>
          <cjm-radio class="radio" v-model="form.bindType" label="3">单码</cjm-radio>
          <cjm-radio class="radio" v-model="form.bindType" label="2">整批</cjm-radio>
        </cjm-form-item>
      </template>

      <template v-if="form.bindType==='1'">
        <cjm-form-item label="起始码" key="beginCode" v-model="form.beginCode" prop="beginCode" required class="cjm-form-item-long">
          <cjm-input v-model="form.beginCode" @input="resetCalcCount" @blur="calcCount()"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="结束码" key="endCode" v-model="form.endCode" prop="endCode" required class="cjm-form-item-long">
          <cjm-input v-model="form.endCode" @input="resetCalcCount" @blur="calcCount()"></cjm-input>
        </cjm-form-item>
        <cjm-form-item v-if="isCodePass" label="共计" key="beginEndLogisticsCodeCount" class="cjm-form-item-long">
          <span>{{logisticsCodeCount}}</span>
        </cjm-form-item>
      </template>

      <template v-else-if="form.bindType==='3'">
        <cjm-form-item label="物流码" key="codes" v-model="form.codes" prop="codes" required class="cjm-form-item-long">
          <cjm-input type="textarea" placeholder="每行判定为一个物流码" @input="codeTrim()" @blur="codeTrim(true)" :rows="5" v-model="form.codes"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="共计" key="codesLogisticsCodeCount" class="cjm-form-item-long">
          <span>{{logisticsCodeCount}}</span>
        </cjm-form-item>
      </template>

      <template v-else-if="form.bindType==='2'">
        <!--CODE_GENERATION-->
        <cjm-form-item label="整批" key="batchID" v-model="form.batchID" required prop="batchID" class="cjm-form-item-long">
          <cjm-remote-select @select="batchSelect" :remote-url="codeUrl.autoComplete.LOOK_UP_CODE_GENERATION" :params="{from:'LogisticsCodeBind',productID:pesticideProductCode != ''?form.productID:''}" :label="form.batchName" v-model="form.batchID"></cjm-remote-select>
        </cjm-form-item>
        <cjm-form-item label="共计" key="codesLogisticsCodeCount" class="cjm-form-item-long">
          <span>{{ selectedBatch ? selectedBatch.batchNumber : 0 }}</span>
        </cjm-form-item>
      </template>

    </cjm-form>
  </div>
</template>
<script>
  export default {
    data() {
      const codeUrl = this.$globalData.get('code', 'apiUrl');
      const corpType = this.$globalData.get('currentUser').corpType;
      return {
        codeUrl: codeUrl,
        form: {
          productID: '',
          productName: '',
          productBatchID: '',
          productBatchCode: '',
          bindType: '1',
          beginCode: '',
          endCode: '',
          codes: '',
          batchID: '',
          batchName: '',
          id: '',
          logisticsCodeCount: 0
        },
        rules: {
          productID: [{validator: this.validSwitch, trigger: 'none'}],
          productBatchID: [{validator: this.validSwitch, trigger: 'none'}],
          bindType: [this.$formRules.required],
          beginCode: [this.$formRules.required, this.$formRules.logisticsCode, {validator: this.beginCodeValidate, trigger: 'blur'}],
          endCode: [this.$formRules.required, this.$formRules.logisticsCode, {validator: this.endCodeValidate, trigger: 'blur'}],
          codes: [this.$formRules.required, {validator: this.codesValid, trigger: 'blur'}],
          batchID: [this.$formRules.required]
        },
        selectedBatch: null,
        beginCodeErr: '',
        endCodeErr: '',
        pesticideProductCode: '',
        calcCountResult: 0,
        isCodePass: false,
        isProductIDRequired: corpType == '3',
        isProductBatchIDRequired: corpType == '3'
      };
    },
    props: ['ctrl', 'editRow'],
    computed: {
      alertText() {
        let txt = '温馨提示：';
        if (this.ctrl === 'reset') {
          //重置码关联
          txt += '只进行码关联操作的物流码将重置恢复为无关联产品及批次信息，请谨慎操作';
        } else if (this.$globalData.get('currentUser').corpType == '1') {
          //企业
          txt += '码关联操作产品和批次至少选择一个哦！';
        } else if (this.$globalData.get('currentUser').corpType == '3') {
          //政府
          txt += '码分配后才能进行物流码关联操作！产品和批次均为必填项';
        }
        return txt;
      },
      logisticsCodeCount() {
        //计算物流码数量
        let len = 0;
        if (this.form.bindType === '1') {
          //按号段
          const beginCode = this.form.beginCode;
          const endCode = this.form.endCode;
          if (((beginCode.length >= 16 && beginCode.length <= 18) || beginCode.length == 32) && ((endCode.length >= 16 && endCode.length <= 18) || endCode.length == 32)) {
            len = this.calcCountResult;
          } else {
            this.calcCountResult = 0;
          }
        } else if (this.form.bindType === '3') {
          //单码
          len = this.form.codes
            .trim()
            .split('\n')
            .filter(item => item.trim().length > 0).length;
        } else if (this.form.bindType === '2') {
          //整批
        }
        this.form.logisticsCodeCount = len;
        return len;
      }
    },
    methods: {
      resetCalcCount() {
        this.isCodePass = false;
        this.$nextTick(() => {
          if (this.form.beginCode !== this.form.beginCode.trim()) {
            this.form.beginCode = this.form.beginCode.trim();
          }
          if (this.form.endCode !== this.form.endCode.trim()) {
            this.form.endCode = this.form.endCode.trim();
          }
        });
      },
      codeTrim(isForce) {
        //物流码消除空行
        this.$nextTick(() => {
          const newCodes = this.form.codes
            .trim()
            .split('\n')
            .map(item => item.trim())
            .filter(item => item.trim().length > 0)
            .join('\n');
          if (isForce || newCodes.trim() !== this.form.codes.trim()) {
            this.form.codes = newCodes;
          }
        });
      },
      beginCodeValidate(rule, value, callback) {
        if (this.beginCodeErr) {
          callback(new Error(this.beginCodeErr));
        } else {
          callback();
        }
      },
      endCodeValidate(rule, value, callback) {
        if (this.endCodeErr) {
          callback(new Error(this.endCodeErr));
        } else {
          callback();
        }
      },
      calcCount(callback) {
        //根据起始码结束码计算数量
        this.isCodePass = false;
        let cbk = () => {
        };
        if (typeof callback === 'function') {
          cbk = callback;
        }
        if (this.form.bindType !== '1') {
          cbk();
          return;
        }
        this.$nextTick(() => {
          const beginCode = this.form.beginCode.trim();
          const endCode = this.form.endCode.trim();
          this.calcCountResult = 0;
          this.beginCodeErr = '';
          this.endCodeErr = '';
          if (((beginCode.length >= 16 && beginCode.length <= 18) || beginCode.length == 32) && ((endCode.length >= 16 && endCode.length <= 18) || endCode.length == 32)) {
            this.$ajax
              .post(this.codeUrl.codeCorrelation.GET_LOGISTICS_CODE_COUNT, {beginCode, endCode})
              .then(res => {
                if (res.resultCode === '200') {
                  this.calcCountResult = res.data * 1;
                  this.isCodePass = true;
                } else {
                  if (res.msg && res.msg.indexOf(beginCode) >= 0) {
                    this.beginCodeErr = res.msg;
                  } else {
                    this.endCodeErr = res.msg;
                  }
                }

                this.$refs.form.validateField('beginCode');
                this.$refs.form.validateField('endCode');
                cbk();
              })
              .catch(err => {
                this.beginCodeErr = err;
                this.endCodeErr = err;
                this.$refs.form.validateField('beginCode');
                this.$refs.form.validateField('endCode');
                cbk();
              });
          } else {
            cbk();
          }
        });
      },
      //本地校验物流码
      codesValid(rule, value, callback) {
        this.codeTrim();
        this.$nextTick(() => {
          let errIndex = -1;
          this.form.codes.split('\n').find((item, index) => {
            if (item.length < 16 || (item.length > 18 && item.length != 32)) {
              errIndex = index + 1;
              return true;
            }
          });
          if (errIndex > 0) {
            callback(new Error(`第${errIndex}行物流码输入有误`));
          } else {
            callback();
          }
        });
      },
      //得到
      getRealForm() {
        // 重置码关联 不需要关联产品 关联批次
        const fieldsMap = {
          add: ['productID', 'productBatchID', 'bindType'],
          edit: ['id', 'productID', 'productBatchID', 'bindType'],
          reset: ['bindType']
        };
        const fields = fieldsMap[this.ctrl] || [];
        if (this.form.bindType === '1') {
          //按号段
          fields.push('beginCode');
          fields.push('endCode');
          fields.push('logisticsCodeCount');
        } else if (this.form.bindType === '2') {
          //整批
          fields.push('batchID');
          fields.push('logisticsCodeCount');
          this.form.logisticsCodeCount = (this.selectedBatch ? this.selectedBatch.batchNumber : 0) * 1;
        } else if (this.form.bindType === '3') {
          //单码 (物流码)
          fields.push('codes');
          fields.push('logisticsCodeCount');
        }
        let form = {};
        fields.forEach(key => {
          form[key] = this.form[key];
        });

        //整批不传id传name
        if (form.batchID) {
          form.batchID = this.form.batchName;
        }

        return form;
      },
      //核查农药码
      checkPesticideProductCode() {
        return new Promise((resolve, reject) => {
          if (this.ctrl === 'reset') {
            resolve();
          } else {
            const params = {};
            params.bindType = this.form.bindType;
            let needWarn = false,
              hintText = '';
            if (params.bindType === '1') {
              //按号段
              params.beginCode = this.form.beginCode;
              params.endCode = this.form.endCode;
              if (params.beginCode.length == 32 || params.endCode.length == 32) {
                if (this.pesticideProductCode.length != 11) {
                  this.$message.error('32位农药码只能使用在农药类目产品上，请核查。');
                  reject(new Error());
                  return false;
                } else if (this.pesticideProductCode != params.beginCode.substring(0, 11) || this.pesticideProductCode != params.endCode.substring(0, 11)) {
                  hintText = '起始码和结束码前11位不是【' + this.form.productName + '】产品的码，该产品的11位产品码为【' + this.pesticideProductCode + '】，请核对后重新关联?';
                  needWarn = true;
                }
              }
            } else if (params.bindType === '3') {
              params.codes = this.form.codes;
              let codes = params.codes.split('\n');
              for (let i = 0; i < codes.length; i++) {
                if (codes[i].length == 32 && this.pesticideProductCode.length != 11) {
                  this.$message.error('32位农药码只能使用在农药类目产品上，请核查。');
                  reject(new Error());
                  return false;
                } else if (this.pesticideProductCode != codes[i].substring(0, 11) && codes[i].length == 32) {
                  hintText = '此码【' + codes[i] + '】前11位不是【' + this.form.productName + '】产品的码，该产品的11位产品码为【' + this.pesticideProductCode + '】，请核对后重新关联?';
                  needWarn = true;
                  break;
                }
              }
            }
            if (needWarn) {
              this.$confirm(hintText, '提示', {
                confirmButtonText: '继续关联',
                cancelButtonText: '重新核对',
                type: 'warning'
              })
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject(new Error());
                });
            } else {
              resolve();
            }
          }
        });
      },
      //验证是否已经存在有关联的记录
      checkIsBinded() {
        //重定义码关联时不需要校验是否已存在记录
        if (this.ctrl === 'reset') {
          return Promise.resolve(0);
        }
        const params = {};
        params.bindType = this.form.bindType;
        if (params.bindType === '1') {
          //按号段
          params.beginCode = this.form.beginCode;
          params.endCode = this.form.endCode;
        } else if (params.bindType === '2') {
          //整批
          params.batchID = this.form.batchID;
          return Promise.resolve(0); //暂时只需要校验按号段的情况
        } else if (params.bindType === '3') {
          //单码 (物流码)
          params.codes = this.form.codes;
          return Promise.resolve(0); //暂时只需要校验按号段的情况
        }
        return new Promise((resolve, reject) => {
          this.$ajax
            .get(this.codeUrl.codeCorrelation.CHECK_IS_EXIST_LOGISTICS_CODE_BIND, params)
            .then(res => {
              if (res.resultCode === '200') {
                resolve(0);
              } else if (typeof res.data === 'number') {
                //data数字大于0说明数据库已经有关联的记录
                resolve(res.data);
              } else {
                reject(res.msg);
              }
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      formDataCheck() {
        return new Promise((resolve, reject) => {
          this.calcCount(() => {
            //提交前校验表单
            this.$refs.form.validate(val => {
              if (val) {
                this.checkPesticideProductCode()
                  .then(() => {
                    //按号段情况下判断是否有已关联的记录
                    this.checkIsBinded()
                      .then(data => {
                        //data数字大于0说明数据库已经有关联的记录
                        if (data > 0) {
                          this.$confirm('该号段中存在已关联的物流码,是否覆盖关联?')
                            .then(() => resolve())
                            .catch(() => reject(new Error()));
                        } else {
                          resolve();
                        }
                      })
                      .catch(err => {
                        //this.$message.error(err.toString());
                        reject(new Error(err));
                      });
                  })
                  .catch(err => {
                    //this.$message.error(err.toString());
                    reject(new Error(err));
                  });
              } else {
                reject(new Error());
              }
            });
          });
        });
      },
      submit() {
        let url = this.codeUrl.codeCorrelation.SAVE_LOGISTICS_CODE_BIND;
        if (this.ctrl === 'reset') {
          url = this.codeUrl.codeCorrelation.RESET_LOGISTICS_CODE_BIND;
        }
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.formDataCheck()
              .then(() => {
                const realForm = this.getRealForm();
                this.$ajax
                  .post(url, realForm)
                  .then(res => {
                    if (res.resultCode === '200') {
                      if (this.ctrl === 'reset' && realForm.bindType === '3') {
                        //重置码关联 物流码(单码)
                        if (res.msg) {
                          //部分成功部分失败
                          resolve({longMsg: res.msg, type: 'reset'});
                        } else {
                          //全部成功
                          resolve();
                        }
                      } else {
                        if (res.msg) {
                          resolve({longMsg: res.msg, type: 'add'});
                        } else {
                          resolve();
                        }
                      }
                    } else {
                      if (this.ctrl === 'reset' && realForm.bindType === '3') {
                        //重置码关联 物流码(单码)
                        reject(new Error(JSON.stringify({longMsg: res.msg})));
                      } else {
                        this.$message.error(res.msg);
                        reject(new Error());
                      }
                    }
                  })
                  .catch(err => {
                    this.errMsg(err);
                    reject(new Error(err));
                  });
              })
              .catch(err => {
                this.errMsg(err);
                reject(new Error(err));
              });
          });
        });
      },
      errMsg(msg) {
        //输出字符串错误信息
        if (typeof msg === 'object' && msg.constructor === Error) {
          this.errMsg(msg.message);
        } else if (typeof msg === 'string' && msg.length > 0) {
          this.$message.error(msg);
        }
      },
      //校验 关联产品和关联批次至少选择一个
      validSwitch(rule, value, callback) {
        if (this.$globalData.get('currentUser').corpType == '3') {
          //政府类型 2个必填
          if (rule.field === 'productID') {
            if (this.form.productID) {
              callback();
            } else {
              callback(new Error('该项为必填项'));
            }
          } else if (rule.field === 'productBatchID') {
            if (this.form.productBatchID) {
              callback();
            } else {
              callback(new Error('该项为必填项'));
            }
          } else {
            callback();
          }
        } else if (this.$globalData.get('currentUser').corpType == '1') {
          //企业类型 至少填一项
          if (this.form.productID || this.form.productBatchID) {
            callback();
          } else {
            callback(new Error('关联产品和关联批次至少选择一个'));
          }
        }
      },
      //关联产品 切换
      productSelect(item) {
        this.selectedProduct = item;
        this.$nextTick(() => {
          if (item && item.id && item.name) {
            this.form.productID = item.id;
            this.form.productName = item.name;
            this.pesticideProductCode = item.pesticideProductCode;
          } else {
            this.form.productID = '';
            this.form.productName = '';
            this.pesticideProductCode = '';
          }
          this.form.productBatchID = '';
          this.form.productBatchCode = '';
          //console.log(JSON.stringify(this.form, null, 4));
        });
      },
      //关联批次 切换
      productBatchSelect(item) {
        this.$nextTick(() => {
          if (item && item.id && item.name) {
            this.form.productBatchID = item.id;
            this.form.productBatchCode = item.name;
          } else {
            this.form.productBatchID = '';
            this.form.productBatchCode = '';
          }
          //console.log(JSON.stringify(this.form, null, 4));
        });
      },
      //整批 切换
      batchSelect(item) {
        this.$nextTick(() => {
          if (item && item.id && item.name) {
            this.form.batchID = item.id;
            this.form.batchName = item.name;
            this.selectedBatch = item;
          } else {
            this.form.batchID = '';
            this.form.batchName = '';
            this.selectedBatch = null;
          }
          //console.log(JSON.stringify(this.form, null, 4));
        });
      }
    },
    mounted() {
      if (this.ctrl === 'edit') {
        //console.log(JSON.stringify(this.editRow, null, 4));
        this.form.id = this.editRow.logisticsCodeBindID;
        this.form.productName = this.editRow.productName;
        this.form.productID = this.editRow.productID;
        this.form.productBatchCode = this.editRow.productBatchCode;
        this.form.productBatchID = this.editRow.productBatchID;

        const bindType = this.editRow.codeBindType + '';
        this.form.bindType = bindType;
        if (bindType === '1') {
          //号段
          this.form.beginCode = this.editRow.beginLogisticsCode;
          this.form.endCode = this.editRow.endLogisticsCode;
          this.calcCount(); //计算号段内码的数量
        } else if (bindType === '2') {
          //整批
          this.form.batchID = this.editRow.codeGenerationID;
          this.form.batchName = this.editRow.batchID;
        } else if (bindType === '3') {
          //单码
          this.form.codes = this.editRow.logisticsCode;
        }
      }
    }
  };
</script>
<style lang="less">
  .cjm-alert-static {
    .el-alert__content {
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    }
  }
</style>
