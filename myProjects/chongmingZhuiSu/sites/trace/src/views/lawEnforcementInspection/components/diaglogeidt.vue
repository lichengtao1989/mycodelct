<template>

  <cjm-dialog ref="dialogBox" class="mydialoglct farmingManagementMydialoglct" key="dialog1" :ok-handler="submit" :visible.sync="addResetDialogVisible" :title="dislogTitle">
    <cjm-scrollbar style="height:600px;">
      <div class="editlct">

        <cjm-form ref="form" :model="form" :rules="rules" label-width="150px">
          <div class="blocklct blocklct1">
            <div class="ovlct">
              <cjm-form-item label="所在乡镇" prop="town">
                <!-- <cjm-enum-select :options="$enum('崇明乡镇').values" v-model="search.Status"></cjm-enum-select> -->
                <!-- v-if="showlctflag==2" -->
                <cjm-enum-select v-model="form.town" enum-name="崇明乡镇" enum-namespace="trace" :clearable="true" @change="selectFn" :disabled="disabled"></cjm-enum-select>
                <!-- <cjm-select v-model="form.town" placeholder="请选择乡镇" :readonly="readonly" :disabled="disabled" @change="selectFn">
                  <cjm-option v-for="item in towns" :key="item.value" :label="item.name" :value="item.value">
                  </cjm-option>
                </cjm-select> -->
              </cjm-form-item>
              <cjm-form-item label="检查时间" prop="checkTime">

                <cjm-date-picker placeholder="操作时间" type="datetime" v-model="form.checkTime" :readonly="readonly" :disabled="disabled"></cjm-date-picker>

              </cjm-form-item>

            </div>
            <div class="ovlct longlct">
              <cjm-form-item label="被检单位" prop="orgID">
                <!-- v-if="showlctflag==2" -->
                <cjm-select v-model="form.orgID" placeholder="" :readonly="readonly" :disabled="disabled" ref="selectOrg" v-if="selectFlag">
                  <cjm-option v-for="item in optionsType" :key="item.id" :label="item.name" :value="item.id">
                  </cjm-option>
                </cjm-select>
                <!-- <cjm-remote-select v-model="form.orgID" placeholder="被检单位" :remote-url="$globalData.get('trace', 'apiUrl').Law.TOWNORG" :params="{Type: typeVal}"></cjm-remote-select> -->

              </cjm-form-item>
            </div>
            <div class="ovlct">
              <cjm-form-item label="负责人" prop="">
                <cjm-input v-model="form.principal" :readonly="readonly" :disabled="disabled"></cjm-input>
              </cjm-form-item>
              <cjm-form-item label="电话" prop="">
                <cjm-input v-model="form.phone" :readonly="readonly" :disabled="disabled"></cjm-input>
              </cjm-form-item>
            </div>
            <div class="ovlct">
              <cjm-form-item label="生产品种" prop="productionVariety">
                <cjm-input v-model="form.productionVariety" :readonly="readonly" :disabled="disabled"></cjm-input>
              </cjm-form-item>
              <cjm-form-item label="种植面积" prop="plantingArea">
                <cjm-input v-model="form.plantingArea" style="width:87%;" :readonly="readonly" :disabled="disabled"></cjm-input>
                <span class="dwm">亩</span>
              </cjm-form-item>
            </div>

          </div>
          <div class="jcjg">
            <div class="smwz">检查结果</div>
            <div class="nextxlxz">
              <div class="ovlct">
                <cjm-form-item label="农产品生产记录" prop="productionRecordType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.productionRecordType" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="productionRecordNote">
                  <cjm-input v-model="form.productionRecordNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农资进出库情况" prop="outgoingType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.outgoingType" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="outgoingTypeNote">
                  <cjm-input v-model="form.outgoingTypeNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农产品检测记录" prop="testRecordType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.testRecordType" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="testRecordTypeNote">
                  <cjm-input v-model="form.testRecordTypeNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="合理使用农业投入品" prop="reasonableUseOfInputs">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.reasonableUseOfInputs" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType2" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="reasonableUseOfInputsNote">
                  <cjm-input v-model="form.reasonableUseOfInputsNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农产品包装/标识" prop="packageIdentification">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.packageIdentification" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="packageIdentificationNote">
                  <cjm-input v-model="form.packageIdentificationNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="加工区" prop="processingZone">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.processingZone" placeholder="请选择" :readonly="readonly" :disabled="disabled">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="processingZoneNote">
                  <cjm-input v-model="form.processingZoneNote" :readonly="readonly" :disabled="disabled"></cjm-input>
                </cjm-form-item>
              </div>

            </div>
          </div>
          <div class="blocklct" style="height:75px;">
            <cjm-form-item label="备注" prop="note" style="width:99%;">
              <cjm-input type="textarea" :rows="2" placewholder="请输入内容" v-model="form.note" :readonly="readonly" :disabled="disabled">
              </cjm-input>
            </cjm-form-item>

          </div>
          <div class="qmxg ovlct">
            <cjm-form-item label="被检查单位签字（盖章）" prop="checkOrgName" label-width="170px">
              <cjm-input v-model="form.checkOrgName" :readonly="readonly" :disabled="disabled"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="检查人签字" prop="checkName" required>
              <cjm-input v-model="form.checkName" :readonly="readonly" :disabled="disabled"></cjm-input>
            </cjm-form-item>
          </div>
          <div class="qmxg ovlct">
            <cjm-form-item label="电子签名" prop="">
              <img src="../../../../static/images/trace-icon-init.png" class="imgslct">
              <!-- form.Img1 -->
            </cjm-form-item>
            <cjm-form-item label="电子签名" prop="">
              <!-- form.Img2 -->
              <img src="../../../../static/images/trace-icon-init.png" class="imgslct">
            </cjm-form-item>
          </div>
        </cjm-form>
      </div>
    </cjm-scrollbar>
  </cjm-dialog>
</template>

<script>
export default {
  components: {},

  data() {
    var checkOne = (rule, value, callback) => {
      var patrn = /^\d+(\.\d+)?$/;

      if (value == '') {
        callback();
      } else {
        if (!patrn.exec(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 10000000000) {
            callback(new Error('超出最大输入值'));
          } else {
            callback();
          }
        }
      }
    };
    var checkTwo = (rule, value, callback) => {
      var patrn = /^\d+(\.\d+)?$/;
      if (!value) {
        callback();
      } else {
        if (!patrn.exec(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 1000000) {
            callback(new Error('超出最大输入值'));
          } else {
            callback();
          }
        }
      }
    };
    return {
      selectFlag: true,
      disabled: false,
      readonly: false,
      typeVal: '',
      optionsType1: [{ text: '有', value: '1' }, { text: '无', value: '2' }, { text: '不完善', value: '3' }],
      optionsType2: [{ text: '是', value: '1' }, { text: '否', value: '2' }, { text: '不完善', value: '3' }],
      showlctflag: 1,
      flagType: 1,
      optionsType: [],
      baseAry: [],
      baseAreaName: '',
      dialogHeight: 580,
      addResetDialogVisible: false,
      dislogTitle: '添加执法记录',
      form: {},
      formModel: { town: '', orgID: '' },
      PesticideName: '',
      towns: [
        { value: 1, name: '城桥镇' },
        { value: 2, name: '堡镇' },
        { value: 3, name: '新河镇' },
        { value: 4, name: '庙镇' },
        { value: 5, name: '竖新镇' },
        { value: 6, name: '向化镇' },
        { value: 7, name: '三星镇' },
        { value: 9, name: '中兴镇' },
        { value: 10, name: '陈家镇' },
        { value: 11, name: '绿华镇' },
        { value: 12, name: '港西镇' },
        { value: 13, name: '建设镇' },
        { value: 14, name: '新海镇' },
        { value: 15, name: '东平镇' },
        { value: 16, name: '长兴镇' },
        { value: 17, name: '新村乡' },
        { value: 18, name: '横沙乡' }
      ],
      rules: {
        productionRecordNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        outgoingTypeNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        testRecordTypeNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        reasonableUseOfInputsNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        packageIdentificationNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        processingZoneNote: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        note: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        productionVariety: [{ max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        checkOrgName: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' }],
        // checkName: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' }],
        plantingArea: [{ validator: checkTwo, trigger: 'blur' }],
        town: [{ required: true, message: '请选择乡镇', trigger: 'blur' }],
        farmingTypeId: [{ required: true, message: '请选择农事类型', trigger: 'blur' }],
        area: [{ validator: checkOne, trigger: 'blur' }],
        operatorName: [{ required: true, message: '请输入操作人', trigger: 'blur' }, { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        checkTime: [{ required: true, message: '请选择检查时间', trigger: 'blur' }],
        orgID: [{ required: true, message: '请选择被检单位', trigger: 'blur' }],
        productionRecordType: [{ required: true, message: '请选择农产品生产记录位', trigger: 'blur' }],
        outgoingType: [{ required: true, message: '请选择农资进出库情况', trigger: 'blur' }],
        testRecordType: [{ required: true, message: '请选择农产品检测记录', trigger: 'blur' }],
        reasonableUseOfInputs: [{ required: true, message: '请选择合理使用农业投入品', trigger: 'blur' }],
        packageIdentification: [{ required: true, message: '请选择农产品包装/标识', trigger: 'blur' }],
        processingZone: [{ required: true, message: '请选择加工区', trigger: 'blur' }],
        checkName: [{ required: true, message: '请输入检查人签字', trigger: 'blur' }]
      }
    };
  },
  watch: {
    'form.orgID'(val) {
      if (val) {
        this.orgInfo(val);
      }
    }
  },
  methods: {
    async orgInfo(val) {
      let url = this.$globalData.get('trace', 'apiUrl').Law.ORGINFO;
      let dataObj = { pageSize: 50, id: val };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      if (err) {
      } else {
        if (res.resultCode == 200) {
          this.$set(this.form, 'principal', res.data[0].name);
          this.$set(this.form, 'phone', res.data[0].managerPhone);
        }
      }
    },
    async selectFn(val) {
      this.optionsType = [];
      this.form.orgID = '';
      let url = this.$globalData.get('trace', 'apiUrl').Law.TOWNORG;
      let dataObj = { pageSize: 50, Type: val };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      if (err) {
      } else {
        if (res.resultCode == 200) {
          this.optionsType = res.data;
        }
      }
    },
    choiceFn() {},
    clickItem() {},
    async submit(callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$ajax.post(this.$globalData.get('trace', 'apiUrl').Law.ADD, this.form).then(data => {
            if (data.resultCode == 200) {
              this.$emit('saveInfo');
              this.addResetDialogVisible = false;
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      callback();
    },
    init() {
      this.dislogTitle = '编辑农事记录';
      // this.form = Object.jsonClone(this.formModel);
    },

    async getDetail(id) {
      let url = this.$globalData.get('trace', 'apiUrl').Law.DETAIL;
      let dataObj = { id: id };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);

      if (err) {
        console.log(err);
      } else {
        // this.baseAry = res.data;
        // this.form = res.data;
        this.$refs.form.resetFields();
        this.form = res.data;
      }
    },
    initEdit(data) {
      this.getDetail(data.LawEnforcementRecordID);
    },
    show(data, type) {
      this.form = Object.deepClone(this.formModel);
      this.disabled = false;
      if (type > 1) {
        this.initEdit(data);
        this.dislogTitle = '编辑执法检查';
        this.selectFn(data.Town);
        this.readonly = false;
        if (type == 3) {
          this.dislogTitle = '查看执法检查';
          this.readonly = true;
          this.disabled = true;
        }
      } else {
        this.readonly = false;
        this.dislogTitle = '添加执法检查';
      }
      // if (data) {

      // }
      this.addResetDialogVisible = true;
    }
  },
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' >
.longlct {
  height: 60px;
  .el-form-item {
    width: 100% !important;
  }
}
.tsyslct {
  .el-form-item__label {
    line-height: 20px !important;
  }
}
.wl50 {
  .el-form-item {
    width: 100% !important;
  }
}
</style>
<style rel='stylesheet/less' lang='less' scoped>
.imgslct {
  display: inline-block;
  width: 105px;
  height: 105px;
}

.smwz {
  width: 99%;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
  padding: 10px;
}
.ovlct {
  position: relative;
  overflow: hidden;
}
.linepart {
  overflow: hidden;
  height: 50px;
}
.wl50 {
  position: relative;
  width: 49%;
  display: inline-block;
  vertical-align: top;
  height: 36px;
  .inlinelctpo {
    position: absolute;
    top: 0;
    left: 77%;
    width: 25%;
    z-index: 2;
  }
}
.inlinelct01 {
  width: 60% !important;
  position: relative;
}
.wlct1 {
  width: 66% !important;
}
.wlct12 {
  width: 10% !important;
}
.wlct13 {
  width: 30% !important;
}
.wlct {
  width: 30% !important;
}
.blocklct {
  overflow: hidden;
}
.folct {
  font-size: 14px;
  color: #606266;
  padding-left: 14px;
  padding-bottom: 14px;
}
.textarealct1 {
  margin-left: 16%;
  width: 545px;
}
.tsyslct {
  margin-bottom: 14px;
}
</style>
