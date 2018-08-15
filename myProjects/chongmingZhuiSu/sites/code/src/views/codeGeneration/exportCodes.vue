<template>
  <cjm-dialog title="生码文件导出" :visible.sync="dialogVisible">
    <cjm-form>
      <cjm-form-item label="导出字段" class="cjm-form-item-long">
        <cjm-checkbox-group v-model="form.fields">
          <cjm-checkbox label="1" v-if="hasLogisticsCode">物流码</cjm-checkbox>
          <cjm-checkbox label="2" v-if="hasAntifakeCode && config.antiFakeText">防伪码URL</cjm-checkbox>
          <cjm-checkbox label="3" v-if="hasAntifakeCode">防伪码</cjm-checkbox>
          <cjm-checkbox label="4">手工序列号</cjm-checkbox>
          <cjm-checkbox label="5" v-if="hasPai">随机码</cjm-checkbox>
          <cjm-checkbox label="6" v-if="hasPai">随机图</cjm-checkbox>
        </cjm-checkbox-group>
      </cjm-form-item>
      <template v-if="form.fields && form.fields.includes('4')">
        <cjm-form-item label="序列号前缀">
          <cjm-input v-model="form.serialNumberPrefix" :disabled="xuLieHaoSetted"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="序列号起始值">
          <cjm-input v-model="form.serialNumberIncreasing" :disabled="xuLieHaoSetted"></cjm-input>
        </cjm-form-item>
        <cjm-form-item label="序列号后缀">
          <cjm-input v-model="form.serialNumberSuffix" :disabled="xuLieHaoSetted"></cjm-input>
        </cjm-form-item>
      </template>
      <cjm-form-item label="最终结果" class="cjm-form-item-long">
        <div class="example">{{example}}</div>
      </cjm-form-item>
    </cjm-form>
    <div slot="footer">
      <cjm-button type="primary" @click="submit" :disabled="exportDisabled" :loading="loading">
        <i class="cjm-icon-confirm"></i>导出
      </cjm-button>
      <cjm-button @click="dialogVisible=false;" :disabled="loading">
        <i class="cjm-icon-close"></i>取消
      </cjm-button>
    </div>
  </cjm-dialog>
</template>

<script>
  import NTClient from './NTClient'
  import fileDownload from 'framework/utils/fileDownload'
  //示例数据
  const exampleData = {
    antifakeCode_20: '90029043xxxx67204014',
    antifakeCode_21: '1005400xxx2287342,3866',
    antifakeCode_36: '123456789011005400xxx2287342,3866',
    logisticsCode_16: '1005400xx1940433',
    logisticsCode_17: '1005400xxx2287342',
    logisticsCode_18: '1005400xxxx1940433',
    logisticsCode_32: '123456789011005400xxx2287342'
  };
  export default {
    props: {
      visible: Boolean
    },
    data(){
      return {
        enums: this.$globalData.get('code', 'enums'),
        apiUrl: this.$globalData.get('code', 'apiUrl'),
        //提交的数据
        form: {},
        //码批次的配置信息
        config: {},
        //是否禁用导出
        exportDisabled: false,
        //导出按钮的loading状态
        loading: false
      }
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.visible;
        },
        set: function (val) {
          this.$emit('update:visible', val);
        }
      },
      //示例数据
      example(){
        let result = [];
        if (this.form.fields) {
          this.form.fields.sort().forEach(field => {
            if (field == '1') {  //物流码
              if (this.config.logisticsCodeLength == 16) {
                result.push(this.config.layer1Text + exampleData['logisticsCode_16']);
              } else if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.MINGANMA)) {
                result.push(this.config.layer1Text + exampleData['logisticsCode_17']);
              } else if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.PESTICIDE)) {
                result.push(this.config.layer1Text + exampleData['logisticsCode_32']);
              } else {
                result.push(this.config.layer1Text + exampleData['logisticsCode_18']);
              }
            } else if (field == '2') { //防伪码URL
              if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.MINGANMA)) {
                result.push(this.config.antiFakeText + exampleData['logisticsCode_17']);
              } else if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.PESTICIDE)) {
                result.push(exampleData['logisticsCode_32']);
              } else {
                result.push(this.config.antiFakeText + exampleData['antifakeCode_20']);
              }
            } else if (field == '3') { //防伪码
              if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.MINGANMA)) {
                result.push(exampleData['antifakeCode_21']);
              } else if (this.config.codeType && this.config.codeType.includes(this.enums.codeType.PESTICIDE)) {
                result.push(exampleData['antifakeCode_36']);
              } else {
                result.push(exampleData['antifakeCode_20']);
              }
            } else if (field == '4') { //序列号
              result.push(this.form.serialNumberPrefix + (this.form.serialNumberIncreasing || '0') + this.form.serialNumberSuffix);
            } else if (field == '5') { //随机码
              result.push('随机码');
            } else if (field == '6') { //随机图
              result.push('随机图');
            }
          });
        }
        return result.join(',');
      },
      //是否可导出物流码
      hasLogisticsCode(){
        return this.config.functionType &&
          this.config.functionType.includes(this.enums.codeFunctionType.LOGISTICS);
      },
      //是否可导出防伪码
      hasAntifakeCode(){
        return this.config.functionType &&
          (this.config.functionType.includes(this.enums.codeFunctionType.ANTIFAKE) ||
          this.config.functionType.includes(this.enums.codeFunctionType.INTEGRAL));
      },
      //是否有π技术
      hasPai(){
        return this.config.codeType && this.config.codeType.includes(this.enums.codeType.PAI);
      },
      //是否配置了序列号
      xuLieHaoSetted(){
        return this.config.serialNumberIncreasing != '' ||
          this.config.serialNumberPrefix != '' ||
          this.config.serialNumberSuffix != '';
      }
    },
    methods: {
      //初始化表单，每次打开弹框会调用
      initForm(id, isTest = true){
        this.reset();
        this.form.type = isTest ? 'test' : 'formal';
        this.form.id = id;

        this.$ajax.get(this.apiUrl.codeGeneration.GET, {id: id}).then(r => {
          if (r.resultCode == '200') {
            this.config = r.data;
            if (this.hasLogisticsCode) {
              this.form.fields.push('1');
            }
            if (this.hasAntifakeCode && this.config.antiFakeText) {
              this.form.fields.push('2');
            }
            if (this.hasAntifakeCode) {
              this.form.fields.push('3');
            }
            if (this.xuLieHaoSetted) {
              this.form.fields.push('4');
            }
            if (this.hasPai) {
              this.form.fields.push('5');
              this.form.fields.push('6');
            }
            this.form.serialNumberPrefix = this.config.serialNumberPrefix;
            this.form.serialNumberSuffix = this.config.serialNumberSuffix;
            this.form.serialNumberIncreasing = this.config.serialNumberIncreasing;
          } else {
            this.$message.error(r.msg);
          }
        }).catch(error => {
          this.$message.error(error.message);
        });

        //USB加密狗初始化
        if (!isTest) {
          this.$ajax.get(this.apiUrl.codeGeneration.GET_USB_KEY_CONFIG, {id: id}).then(r => {
            if (r.resultCode == '200') {
              const needUSBKey = r.data.isEnable == '1';
              const seed = r.data.usbKeySeed;
              if (needUSBKey) {
                //如果加密狗初始化失败，禁用导出按钮
                if (!this.usbKeyValidate(seed)) {
                  this.exportDisabled = true;
                }
              }
            } else {
              this.$message.error(r.msg);
            }
          }).catch(error => {
            this.$message.error(error.message);
          });
        }
      },
      reset(){
        this.form = {
          id: '',
          fields: [],
          type: '',
          iaid: '',
          digest: '',
          serialNumberPrefix: '',
          serialNumberSuffix: '',
          serialNumberIncreasing: ''
        };
        this.config = {};
        this.exportDisabled = false;
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.resetFields();
          }
        });
      },
      submit(){
        this.loading = true;
        //调用接口，验证并获取导出文件的地址
        this.$ajax.post(this.apiUrl.codeGeneration.EXPORT, this.form).then(r => {
          if (r.resultCode == '200') {
            fileDownload(r.data.fileUrl);
            this.$message.success('正在导出文件，请稍候');
            this.dialogVisible = false;
          } else {
            this.$message.error(r.msg);
          }
          this.loading = false;
        }).catch(error => {
          this.$message.error(error.message);
          this.loading = false;
        });
      },
      //USB加密狗验证
      usbKeyValidate(seed){
        const browser = NTClient.DetectBrowser();
        if (browser === 'Unknown') {
          this.$message.error('加密锁不支持该浏览器，如果您在使用傲游或类似浏览器，请切换到IE模式');
          return false;
        }

        NTClient.createElementNT199();
        const isCreated = NTClient.DetectNT199Plugin();
        if (!isCreated) {
          this.$message.error('加密锁插件未安装，请直接安装CD区的插件');
          return false;
        }

        const rtn = NTClient.NT199_Find();
        if (rtn < 1) {
          this.$message.error('没有找到加密锁');
          return false;
        }

        const password = '12345678';
        const retVal = NTClient.NT199_CheckPassword(password);
        if (retVal != 0) {
          if (retVal == 1) {
            //NT199_GetLastError 为封装到JS文件的获取错误信息的方法,返回错误信息,根据错误信息到帮助文档查询具体错误
            this.$message.error('ErrorCode:' + NTClient.NT199_GetLastError() + ',没有找到加密锁');
          } else {
            this.$message.error('ErrorCode:' + NTClient.NT199_GetLastError() + ',加密锁密码不正确');
          }
          return false;
        }

        //获取USB Key的唯一硬件ID
        this.form.iaid = NTClient.NT199_GetHardwareId();
        this.form.digest = NTClient.NT199_Sha1WithSeed(seed);
        return true;
      }
    },
    created(){
      this.reset();
    }
  }
</script>

<style rel='stylesheet/less' lang='less' scoped>
  .example {
    word-wrap: break-word;
    word-break: normal;
  }
</style>
