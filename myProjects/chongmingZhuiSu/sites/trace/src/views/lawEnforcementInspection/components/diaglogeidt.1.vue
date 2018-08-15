<template>

  <cjm-dialog ref="dialogBox" class="mydialoglct farmingManagementMydialoglct" key="dialog1" :ok-handler="submit" :visible.sync="addResetDialogVisible" :title="dislogTitle">
    <cjm-scrollbar style="height:600px;">
      <div class="editlct">

        <cjm-form ref="form" :model="form" :rules="rules" label-width="150px">
          <div class="blocklct blocklct1">
            <div class="ovlct">
              <cjm-form-item label="所在乡镇" prop="Town">
                <!-- <cjm-enum-select :options="$enum('崇明乡镇').values" v-model="search.Status"></cjm-enum-select> -->
                <!-- v-if="showlctflag==2" -->
                <!-- <cjm-enum-select v-model="form.Town" enum-name="分区类型" enum-namespace="trace" :clearable="true"></cjm-enum-select> -->
                <cjm-select v-model="form.Town" placeholder="请选择乡镇" :readonly="readonly" @change="selectFn">
                  <cjm-option v-for="item in towns" :key="item.value" :label="item.name" :value="item.value">
                  </cjm-option>
                </cjm-select>
              </cjm-form-item>
              <cjm-form-item label="检查时间" prop="CheckTime" :readonly="readonly">

                <cjm-date-picker placeholder="操作时间" type="datetime" v-model="form.CheckTime"></cjm-date-picker>

              </cjm-form-item>

            </div>
            <div class="ovlct longlct">
              <cjm-form-item label="被检单位" prop="OrgID">
                <!-- v-if="showlctflag==2" -->
                <cjm-select v-model="form.OrgID" placeholder="" :readonly="readonly">
                  <cjm-option v-for="item in optionsType" :key="item.id" :label="item.name" :value="item.id">
                  </cjm-option>
                </cjm-select>

              </cjm-form-item>
            </div>
            <div class="ovlct">
              <cjm-form-item label="负责人" prop="">
                <cjm-input v-model="form.Principal" :readonly="readonly"></cjm-input>
              </cjm-form-item>
              <cjm-form-item label="电话" prop="">
                <cjm-input v-model="form.Phone" :readonly="readonly"></cjm-input>
              </cjm-form-item>
            </div>
            <div class="ovlct">
              <cjm-form-item label="生产品种" prop="ProductionVariety">
                <cjm-input v-model="form.ProductionVariety" :readonly="readonly"></cjm-input>
              </cjm-form-item>
              <cjm-form-item label="种植面积" prop="PlantingArea">
                <cjm-input v-model="form.PlantingArea" style="width:87%;" :readonly="readonly"></cjm-input>
                <span class="dwm">亩</span>
              </cjm-form-item>
            </div>

          </div>
          <div class="jcjg">
            <div class="smwz cjm-dialog-head">检查结果</div>
            <div class="nextxlxz">
              <div class="ovlct">
                <cjm-form-item label="农产品生产记录" prop="ProductionRecordType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.ProductionRecordType" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.ProductionRecordNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农资进出库情况" prop="OutgoingType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.OutgoingType" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.OutgoingTypeNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农产品检测记录" prop="TestRecordType">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.TestRecordType" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.TestRecordTypeNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="合理使用农业投入品" prop="ReasonableUseOfInputs">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.ReasonableUseOfInputs" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType2" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.ReasonableUseOfInputsNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="农产品包装/标识" prop="PackageIdentification">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.PackageIdentification" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.PackageIdentificationNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>
              <div class="ovlct">
                <cjm-form-item label="加工区" prop="ProcessingZone">
                  <!-- v-if="showlctflag==2" -->
                  <cjm-select v-model="form.ProcessingZone" placeholder="请选择" :readonly="readonly">
                    <cjm-option v-for="item in optionsType1" :key="item.value" :label="item.text" :value="item.value">
                    </cjm-option>
                  </cjm-select>

                </cjm-form-item>
                <cjm-form-item label="情况说明" prop="">
                  <cjm-input v-model="form.ProcessingZoneNote" :readonly="readonly"></cjm-input>
                </cjm-form-item>
              </div>

            </div>
          </div>
          <div class="blocklct">
            <cjm-form-item label="备注" prop="Note" style="width:99%;">
              <cjm-input type="textarea" :rows="2" placewholder="请输入内容" v-model="form.Note" :readonly="readonly">
              </cjm-input>
            </cjm-form-item>

          </div>
          <div class="qmxg ovlct">
            <cjm-form-item label="被检查单位签字（盖章）" prop="CheckOrgName" label-width="170px">
              <cjm-input v-model="form.CheckOrgName" :readonly="readonly"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="检查人签字" prop="CheckName" required>
              <cjm-input v-model="form.CheckName" :readonly="readonly"></cjm-input>
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
      if (value == '') {
        callback();
      } else {
        if (!patrn.exec(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 100000) {
            callback(new Error('超出最大输入值'));
          } else {
            callback();
          }
        }
      }
    };
    return {
      readonly: false,
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
      formModel: {
        farmingTypeName: '',
        farmingTypeId: '',
        baseAreaId: '',
        baseName: '',
        operatorName: '',
        operatorTime: '',
        area: '',
        areaUnit: '',
        workHour: '',
        workHourUnit: '',
        remark: '',
        invetoryRemark: '',
        Id: ''
      },
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
        Note: [{ max: 200, message: '长度不能超过200个字符', trigger: 'blur' }],
        ProductionVariety: [{ max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        CheckOrgName: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' }],
        // CheckName: [{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' }],
        PlantingArea: [{ validator: checkTwo, trigger: 'blur' }],
        Town: [{ required: true, message: '请选择乡镇', trigger: 'blur' }],
        farmingTypeId: [{ required: true, message: '请选择农事类型', trigger: 'blur' }],
        area: [{ validator: checkOne, trigger: 'blur' }],
        operatorName: [{ required: true, message: '请输入操作人', trigger: 'blur' }, { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        CheckTime: [{ required: true, message: '请选择检查时间', trigger: 'blur' }],
        OrgID: [{ required: true, message: '请选择被检单位', trigger: 'blur' }],
        ProductionRecordType: [{ required: true, message: '请选择农产品生产记录位', trigger: 'blur' }],
        OutgoingType: [{ required: true, message: '请选择农资进出库情况', trigger: 'blur' }],
        TestRecordType: [{ required: true, message: '请选择农产品检测记录', trigger: 'blur' }],
        ReasonableUseOfInputs: [{ required: true, message: '请选择合理使用农业投入品', trigger: 'blur' }],
        PackageIdentification: [{ required: true, message: '请选择农产品包装/标识', trigger: 'blur' }],
        ProcessingZone: [{ required: true, message: '请选择加工区', trigger: 'blur' }],
        CheckName: [{ required: true, message: '请输入检查人签字', trigger: 'blur' }]
      }
    };
  },
  methods: {
    async selectFn(val) {
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

        this.form = Object.deepClone(res.data);
        console.log(this.form);
      }
    },
    initEdit(data) {
      console.log(data);
      this.getDetail(data.LawEnforcementRecordID);
    },
    show(data, type) {
      this.form = Object.deepClone(this.formModel);
      if (type > 1) {
        this.initEdit(data);
        if (type == 3) {
          this.readonly = true;
        }
      } else {
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
.qmxg {
  padding-top: 25px;
}
// .blocklct1 {
//   margin-left: -70px;
// }
.smwz {
  width: 99%;
  margin-bottom: 15px;
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