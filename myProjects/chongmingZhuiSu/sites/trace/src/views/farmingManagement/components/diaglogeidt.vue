<template>

  <cjm-dialog ref="dialogBox" class="mydialoglct farmingManagementMydialoglct" key="dialog1" :ok-handler="submit" :visible.sync="addResetDialogVisible" :title="dislogTitle">
    <div class="editlct">

      <cjm-form ref="form" :model="form" :rules="rules" label-width="140px">
        <div class="blocklct">
          <div class="ovlct">
            <cjm-form-item label="农事类型" prop="farmingTypeId">

              <cjm-select v-model="form.farmingTypeId" placeholder="">
                <cjm-option v-for="item in optionsType" :key="item.value" :label="item.typeName" :value="item.farmingTypeId">
                </cjm-option>
              </cjm-select>
            </cjm-form-item>
            <cjm-form-item label="区域" prop="">

              <cjm-select v-model="form.baseAreaId" placeholder="" v-if="flagType==1">
                <cjm-option v-for="item in baseAry" :key="item.id" :label="item.name" :value="item.id">
                </cjm-option>
              </cjm-select>
              <cjm-input v-model="baseAreaName" v-else readonly="readonly"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="操作人" prop="operatorName">
              <cjm-input v-model="form.operatorName"></cjm-input>
            </cjm-form-item>
            <cjm-form-item label="操作时间" prop="operatorTime">

              <cjm-date-picker placeholder="操作时间" type="datetime" v-model="form.operatorTime"></cjm-date-picker>

            </cjm-form-item>
          </div>
          <div class="linepart">
            <div class="wl50">
              <cjm-form-item label="操作面积" prop="area">
                <div class="inlinelct01">
                  <cjm-input v-model="form.area" class=""></cjm-input>

                </div>
              </cjm-form-item>
              <div class="inlinelctpo">
                <cjm-select v-model="form.areaUnit" placeholder="" class="">
                  <cjm-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </cjm-option>
                </cjm-select>
              </div>
            </div>
            <div class="wl50">
              <cjm-form-item label="操作工时" prop="workHour">
                <div class="inlinelct01">
                  <cjm-input v-model="form.workHour" class=""></cjm-input>

                </div>

              </cjm-form-item>
              <div class="inlinelctpo">
                <cjm-select v-model="form.workHourUnit" placeholder="" class="">
                  <cjm-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                  </cjm-option>
                </cjm-select>
              </div>

            </div>

          </div>

        </div>
        <div class="blocklct tsyslct">
          <cjm-form-item label="投入品及使用情况" prop="" style="width:99%;">
            <cjm-input type="textarea" :rows="2" placewholder="请输入内容" v-model="form.invetoryRemark">
            </cjm-input>
          </cjm-form-item>
          <!-- <div class="folct"></div>
          <cjm-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.g" class="textarealct1">
          </cjm-input> -->
        </div>
        <div class="blocklct">
          <cjm-form-item label="备注" prop="" style="width:99%;">
            <cjm-input type="textarea" :rows="2" placewholder="请输入内容" v-model="form.remark">
            </cjm-input>
          </cjm-form-item>

        </div>
      </cjm-form>
    </div>
  </cjm-dialog>
</template>

<script>
export default {
  components: {},

  data() {
    var checkOne = (rule, value, callback) => {
      var patrn = /^\d+(\.\d+)?$/;
      // console.log(typeof value);
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
      showlctflag: 1,
      flagType: 1,
      optionsType: [],
      baseAry: [],
      baseAreaName: '',
      options: [
        {
          value: '亩',
          label: '亩'
        },
        {
          value: '平方米',
          label: '平方米'
        }
      ],
      options2: [
        {
          value: '小时',
          label: '小时'
        },
        {
          value: '分钟',
          label: '分钟'
        },
        {
          value: '天',
          label: '天'
        }
      ],
      dialogHeight: 580,
      addResetDialogVisible: false,
      dislogTitle: '添加农事记录',
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
      rules: {
        // name: [{ required: true, message: '请选择农事类型', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]

        farmingTypeId: [{ required: true, message: '请选择农事类型', trigger: 'blur' }],
        area: [{ validator: checkOne, trigger: 'blur' }],
        workHour: [{ validator: checkTwo, trigger: 'blur' }],
        operatorName: [{ required: true, message: '请输入操作人', trigger: 'blur' }, { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        operatorTime: [{ required: true, message: '请选择操作时间', trigger: 'blur' }]
      }
    };
  },
  methods: {
    async showList() {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.TYPELIST;
      let dataObj = { pageSize: 100, pageNum: 1 };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      // console.log(err, res);
      if (err) {
        console.log(err);
      } else {
        this.optionsType = res.data.rows;
      }
    },
    choiceFn() {},
    clickItem() {},
    async submit(callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$ajax.post(this.$globalData.get('trace', 'apiUrl').FarmingManagement.ADD, this.form).then(data => {
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
    async lookupBaseArea(id) {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.BASEAREA;
      let dataObj = { BaseId: id };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);
      console.log(res);
      if (err) {
        console.log(err);
      } else {
        this.baseAry = res.data;
      }
    },
    async getDetail(id) {
      let url = this.$globalData.get('trace', 'apiUrl').FarmingManagement.DETAIL;
      let dataObj = { Id: id };
      let { err, res } = await this.$ajaxSync.post(url, dataObj);

      if (err) {
        console.log(err);
      } else {
        this.$refs.form.resetFields();
        // this.baseAry = res.data;
        this.form = res.data[0];
        this.form.Id = res.data[0].farmingId;
      }
    },
    initEdit(data) {
      this.showList();
      if (data.farmingId) {
        // console.log(this.$refs.form);
        //
        //编辑
        this.baseAreaName = data.baseAreaName;
        this.flagType = 2;

        this.lookupBaseArea(data.baseAreaId);
        this.getDetail(data.farmingId);
      } else {
        // this.form.baseAreaId = data.baseID;
        this.lookupBaseArea(data.baseID);
        this.form.baseName = data.baseName;
        this.form.baseId = data.baseID;
        this.form.baseAreaId = '';
        this.flagType = 1;
      }
      // this.showlctflag = 2;
    },
    show(data) {
      // console.log(data);
      this.form = Object.deepClone(this.formModel);
      if (data) {
        this.initEdit(data);
      }
      this.addResetDialogVisible = true;
    }
  },
  created() {}
};
</script>
<style rel='stylesheet/less' lang='less' >
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
.ovlct {
  position: relative;
  overflow: hidden;
}
.linepart {
  overflow: hidden;
  height: 53px;
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
    left: 71%;
    width: 29%;
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
  padding-top: 5px;
  margin-bottom: 14px;
}
</style>