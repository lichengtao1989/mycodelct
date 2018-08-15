<template>
  <div>
    <p class="node-name" v-if="!params.isEdit">{{nodeInfo.nodeName}}</p>
    <div :class="params.isEdit?'config-infos edit-infos':'config-infos'">
      <cjm-form ref="form" :model="form" :rules="rules">
        <cjm-form-item v-for="(item, index) in modelForm" labelWidth="135px" :error="form.content[index].errMsg" :key="item.fieldID" :label="item.fieldName || '未设置'" :required="item.isRequired==1" class="cjm-form-item-long">
          <!--操作时间 时间点 系统确认-->
          <template v-if="item.isSysDefine==1&&item.dataType==1">
            <cjm-date-picker :format="item.dataFormat" :type="item.dataFormat=='yyyy/MM/dd'?'date':'datetime'" v-model="form.content[index].fieldValue"></cjm-date-picker>
          </template>
          <template v-else>
            <cjm-input type="text" v-model="form.content[index].fieldValue" :minlength="item.minSize?item.minSize*1:undefined" :maxlength="item.maxSize?item.maxSize*1:undefined" v-if="item.type==1"></cjm-input>
            <span v-if="item.type==1&&item.unitValue!='无单位'">单位：{{item.unitValue}}</span>

            <trace-image-upload ref="imgCtrls" v-model="form.content[index].fieldValue" :url-title-groups="form.content[index].fieldContent" :set-title="item.isRemarkEnable==1" :max-number="item.maxNumber*1" :min-number="item.minNumber*1" v-if="item.type==2" :multiple="true"></trace-image-upload>

            <cjm-select v-if="item.type==3&&item.dataType==0" clearable v-model="form.content[index].fieldValue">
              <cjm-option :label="option" :value="option" v-for="(option,index) in item.dataValue" :key="index"></cjm-option>
            </cjm-select>

            <cjm-remote-select v-model="form.content[index].fieldValue" :label="form.content[index].fieldText||undefined" :remote-url="remoteSelectSwitch(item.dataType)" v-if="item.type==3&&(!!remoteSelectSwitch(item.dataType))"></cjm-remote-select>

            <employee-info v-if="item.dataType==8" :employeeID="form.content[index].fieldValue"></employee-info>

            <!--手动输入 时间点-->
            <cjm-date-picker :format="item.dataFormat" v-model="form.content[index].fieldValue" :type="item.dataFormat=='yyyy/MM/dd'?'date':'datetime'" v-if="item.type==4&&item.dataSource==2&&item.dataType==1"></cjm-date-picker>
            <!--系统录入时间点-->
            <cjm-input v-model="form.content[index].fieldValue" :readonly="true" placeholder="由系统确认" v-if="item.type==4&&item.dataType==1 && item.dataSource==1"></cjm-input>
            <!--手动输入 时间段-->
            <cjm-date-picker :format="item.dataFormat" v-model="form.content[index].fieldValue" :type="item.dataFormat=='yyyy/MM/dd'?'daterange':'datetimerange'" v-if="item.type==4&&item.dataType==2 && item.dataSource!=1"></cjm-date-picker>
          </template>
        </cjm-form-item>

        <cjm-form-item label="_content" key="_content" prop="_content" v-show="false">
          <cjm-input type="text" v-model="form._content"></cjm-input>
        </cjm-form-item>

      </cjm-form>
    </div>
  </div>
</template>


<script>
  import traceImageUpload from './img-upload/image-upload.vue';
  //  import enums from 'static/data/enums.json';
  import employeeInfo from './employee-info.vue';
  export default {
    name: 'trace-record-edit',
    components: {
      traceImageUpload, employeeInfo
    },
    props: {
      /**
       *远程请求地址
       */
      remoteUrl: String,
      /**
       *远程请求参数
       */
      params: Object
    },
    data() {
      let traceApiUrl = this.$globalData.get('trace', 'apiUrl');
      return {
        traceApiUrl: traceApiUrl,
        rules: {
          operateTime: [this.$formRules.required],
          _content: [{validator: this.validContent, trigger: 'blur'}]
        },
        modelForm: [],
        form: {
          nodeID: '',
          productID: '',
          batchID: '',
          operateTimeShowHidden: 1,
          operateTime: '',
          operateTimeFormat: 'yyyy,MM,dd,HH,mm,ss',
          content: []
        },
        nodeInfo: {},
        configInfo: [],
        fields: []
      };
    },
    watch: {
      params: {
        handler: function () {
          this.nodeInfo = this.params;
          this.getNodeConfig();
        },
        deep: true
      }
    },
    methods: {
      //下拉输入框,根据dataType得到不同的接口url
      remoteSelectSwitch(dataType) {
        return [
          '',
          this.traceApiUrl.autoComplete.ORG, //机构列表 1
          this.traceApiUrl.traceNode.TRACE_PRODUCT_LIST, //产品列表 2
          this.traceApiUrl.autoComplete.PRODUCT_BATCH, //批次列表 3
          this.traceApiUrl.autoComplete.USER, //用户列表 4
          this.traceApiUrl.autoComplete.PLOTS, //地块列表 5
          this.traceApiUrl.autoComplete.INPUTS, //投入品列表 6
          this.traceApiUrl.autoComplete.MONITOR, //监控列表 7
          this.traceApiUrl.autoComplete.EMPLOYEE //人员列表 8
        ][dataType];
      },
      //判断是否是中文
      validChinese(word) {
        return /[\u4e00-\u9fa5]+/.test(word);
      },
      validLetter(word) {
        return /[A-z]+/.test(word);
      },
      validNumber(word) {
        return !isNaN(word);
      },
      validSymbol(word) {
        return /\W+/.test(word);
      },
      errMsgCreate(fieldKey, msg) {
        return {fieldKey: fieldKey, msg: msg};
      },
      //必填项验证
      validRequire() {
        let errMsgs = [];
        let contents = this.form.content;
        contents.forEach(item => {
          let accordField = this.fields.find(field => {
            return field.fieldKey === item.fieldKey;
          });
          let modelItem = this.modelForm.find(mdf => {
            return mdf.fieldKey === item.fieldKey;
          });

          if (!item.fieldValue && accordField.isRequired == 1 && modelItem.type != 2) {
            let isSysDefine = !!accordField.fieldExt.find(fe => {
              return fe.itemName === 'isSysDefine' && fe.itemValue == 1;
            });
            let dataTypeField = accordField.fieldExt.find(fe => {
              return fe.itemName === 'dataType';
            });
            if (dataTypeField && dataTypeField.itemValue == 2 && isSysDefine) {
              errMsgs.push(this.errMsgCreate(accordField.fieldKey, accordField.fieldName + ':必填'));
            }
            if (!isSysDefine) {
              errMsgs.push(this.errMsgCreate(accordField.fieldKey, accordField.fieldName + ':必填'));
            }
          }
        });
        return errMsgs;
      },
      //输入框可输入内容限制
      validInputType() {
        let errMsgs = [];
        this.modelForm.forEach(item => {
          if (item.valiateFormat && item.type == 1) {
            let vlas = item.valiateFormat.split(',').filter(vlaItem => {
              return !!vlaItem;
            });
            let itemValue = this.form.content.find(fcItem => {
              return fcItem.fieldKey === item.fieldKey;
            }).fieldValue;
            if (itemValue) {
              itemValue = itemValue.split('');
              let vlaMap = {
                chinese: this.validChinese,
                letter: this.validLetter,
                number: this.validNumber,
                symbol: this.validSymbol
              };
              let isPass = true;
              for (let i = 0, len = itemValue.length; i < len; i++) {
                let _ispass = false;
                for (let j = 0, leng = vlas.length; j < leng; j++) {
                  if (vlaMap[vlas[j]](itemValue[i])) {
                    _ispass = true;
                    break;
                  }
                }
                if (!_ispass) {
                  isPass = false;
                  break;
                }
              }
              if (!isPass) {
                errMsgs.push(
                  this.errMsgCreate(
                    item.fieldKey,
                    item.fieldName +
                    ':只能输入(' +
                    vlas
                      .join(',')
                      .replace('chinese', '中文')
                      .replace('letter', '英文')
                      .replace('number', '数字')
                      .replace('symbol', '特殊字符') +
                    ')'
                  )
                );
              }
            }
          }
        });
        return errMsgs;
      },
      //文字字数限制
      validTestSize() {
        let errMsgs = [];
        let contents = this.form.content;
        contents.forEach(item => {
          let modelItem = this.modelForm.find(mdf => {
            return mdf.fieldKey === item.fieldKey;
          });
          if (modelItem.type == 1) {
            if (modelItem.minSize && item.fieldValue && item.fieldValue.length < modelItem.minSize) {
              errMsgs.push(
                this.errMsgCreate(
                  modelItem.fieldKey,
                  modelItem.fieldName + ':不能少于' + modelItem.minSize + '位'
                )
              );
            }
            if (modelItem.maxSize && item.fieldValue && item.fieldValue.length > modelItem.maxSize) {
              errMsgs.push(
                this.errMsgCreate(
                  modelItem.fieldKey,
                  modelItem.fieldName + ':不能多于' + modelItem.maxSize + '位'
                )
              );
            }
          }
        });
        return errMsgs;
      },
      //图片上传范围限制
      validImageNumber() {
        let errMsgs = [];
        let contents = this.form.content;
        contents.forEach(item => {
          let modelItem = this.modelForm.find(mdf => {
            return mdf.fieldKey === item.fieldKey;
          });
          if (modelItem.type == 2) {
            let minNumber = modelItem.minNumber;
            let maxNumber = modelItem.maxNumber;
            let requiredNumber = modelItem.requiredNumber; //固定多少张
            if (requiredNumber != '') {
              minNumber = requiredNumber;
              maxNumber = requiredNumber;
            }
            let imgLen = item.fieldValue.length;
            if (modelItem.isRequired == 1) {
              //必填
              if (!imgLen) {
                errMsgs.push(
                  this.errMsgCreate(modelItem.fieldKey, modelItem.fieldName + ':请上传图片')
                );
              } else if (minNumber && imgLen < minNumber) {
                errMsgs.push(
                  this.errMsgCreate(
                    modelItem.fieldKey,
                    modelItem.fieldName + ':请至少上传' + minNumber + '张图片'
                  )
                );
              } else if (maxNumber && imgLen > maxNumber) {
                errMsgs.push(
                  this.errMsgCreate(
                    modelItem.fieldKey,
                    modelItem.fieldName + ':最多只能上传' + maxNumber + '张图片'
                  )
                );
              }
            } else {
              //选填
              if (maxNumber && imgLen > maxNumber) {
                errMsgs.push(
                  this.errMsgCreate(
                    modelItem.fieldKey,
                    modelItem.fieldName + ':最多只能上传' + maxNumber + '张图片'
                  )
                );
              }
            }
          }
        });
        return errMsgs;
      },
      /**
       * 提交前验证form.content
       * */
      validContent(rule, value, callback) {
        let errMsgs = [];
        this.form.content.forEach(item => {
          this.$set(item, 'errMsg', '');
        });
        errMsgs = errMsgs.concat(this.validRequire());
        errMsgs = errMsgs.concat(this.validTestSize());
        errMsgs = errMsgs.concat(this.validImageNumber());
        errMsgs = errMsgs.concat(this.validInputType());
        if (errMsgs.length) {
          callback(new Error('error'));
          this.form.content.forEach(item => {
            let fieldKey = item.fieldKey;
            errMsgs.forEach(err => {
              if (err.fieldKey === fieldKey) {
                this.$set(item, 'errMsg', err.msg);
              }
            });
          });
        } else {
          callback();
        }
      },
      getTitleByImgUrl(imgUrl) {
        let title = '';
        this.$refs.imgCtrls.forEach(imgCtrl => {
          imgCtrl.imgs.forEach(_imgUrl => {
            if (imgUrl === _imgUrl) {
              title = imgCtrl.getTitleByImgUrl(_imgUrl);
            }
          });
        });
        return title;
      },
      form2AjaxParams() {
        let params = JSON.parse(JSON.stringify(this.form));
        if (this.params.traceNodeID) {
          params.traceNodeID = this.params.traceNodeID;
          //console.log(params);
        }
        params.content.forEach(item => {
          delete item.errMsg;
          this.modelForm.forEach(itemModel => {
            if (itemModel.fieldKey === item.fieldKey && itemModel.type === 2) {
              let imgFieldValue = (item.fieldValue || []).map(imgUrl => {
                let title = this.getTitleByImgUrl(imgUrl);
                return {url: imgUrl, title: title};
              });
              item.fieldValue = JSON.stringify(imgFieldValue);
              delete item.fieldContent;
            }
            if (itemModel.isSysDefine == 1 && itemModel.fieldKey === item.fieldKey) {
              item.isDel = 1;
            }
            if (
              itemModel.fieldKey === item.fieldKey &&
              itemModel.type == 4 &&
              itemModel.dataType == 2 &&
              itemModel.dataSource != 1
            ) {
              item.fieldValue &&
              (item.fieldValue =
                item.fieldValue.indexOf(' ~ ') > 0
                  ? item.fieldValue.replace(' ~ ', ',')
                  : item.fieldValue);
            }
            if (itemModel.fieldKey === item.fieldKey && itemModel.type == 4) {
              item.fieldValue && (item.fieldValue = item.fieldValue.replace(/\//g, '-'));
            }
          });
        });
        params.content = params.content.filter(item => {
          return item.isDel != 1;
        });
        return params;
      },
      //设置录入时间
      setOperationTime() {
        this.modelForm
          .filter(item => {
            return item.type == 4 && item.dataSource == 1;
          })
          .forEach(item => {
            this.form.content
              .filter(fmItem => {
                return item.fieldKey == fmItem.fieldKey;
              })
              .forEach(fmItem => {
                if (!fmItem.fieldValue) {
                  fmItem.fieldValue = new Date().toString(item.dataFormat);
                }
              });
          });
        let operateItem = this.modelForm.find(item => {
          return item.isSysDefine == 1;
        });
        if (operateItem) {
          this.form.operateTimeFormat = operateItem.dataFormat;
          this.form.operateTimeShowHidden = operateItem.showHidden;
          //操作时间 时间段 可修改
          let operateFormItem = this.form.content.find(fmItem => {
            return operateItem.fieldKey == fmItem.fieldKey;
          });
          if (operateItem.dataType == 2) {
            if (operateFormItem && operateFormItem.fieldValue) {
              let timeFieldValue = operateFormItem.fieldValue;
              this.form.operateTime = timeFieldValue.split('~')[0].trim();
              this.form.operateTimeEnd = timeFieldValue.split('~')[1].trim();
            }
          } else {
            //操作时间 时间点 可修改
            this.form.operateTime = operateFormItem.fieldValue;
          }
        }
      },
      submit() {
        this.setOperationTime();
        return this.$refs.form.validate().then(() => {
          this.form.nodeID = this.nodeInfo.nodeID;
          this.form.batchID = this.nodeInfo.batchID;
          /**
           * 图片提交时的数据格式修改
           * */
          let params = this.form2AjaxParams();
          return this.$ajax.post(this.traceApiUrl.traceRecord.SAVE_NODE, params).then(res => {
            if (res.resultCode == '200') {
              this.$message.success(res.msg);
            } else {
              if (res.msg) {
                this.$message.error(res.msg);
              }
              throw new Error(res.msg);
              //节点批次控制配置错误导致无法在批次入口采集溯源信息，请将节点控制类型修改为产品批次入口采集溯源信息！
            }
          });
        });
      },
      getNodeDataForEdit() {
        this.$ajax
          .post(this.traceApiUrl.traceRecord.GET_NODE_DATA_SIGLE, {
            traceNodeID: this.params.traceNodeID
          })
          .then(res => {
            if (res.resultCode == '200') {
              if (res.data && res.data[0]) {
                var data = res.data[0].nodeExt;
                var temp,
                  tempArr = [];
                //this.form.content = res.data[0].nodeExt;
                for (var i = 0; i < data.length; i++) {
                  if (data[i].fieldType == 2) {
                    try {
                      temp = JSON.parse(data[i].fieldValue);
                    } catch (e) {
                      temp = [];
                    }
                    tempArr = [];
                    for (var j = 0; j < temp.length; j++) {
                      if (temp[j].url) {
                        tempArr.push(temp[j].url);
                      }
                    }
                    data[i].fieldValue = tempArr;
                    data[i].fieldContent = temp;
                  }
                  if (data[i].fieldType == 4) {
                    data[i].fieldValue &&
                    (data[i].fieldValue = data[i].fieldValue
                      .replace(',', ' ~ ')
                      .replace(/\-/g, '/'));
                  }
                  let operateItem = this.modelForm.find(item => {
                    return item.fieldKey == data[i].fieldKey && item.isSysDefine == 1;
                  });
                  if (operateItem && operateItem.dataType == 2) {
                    data[i].fieldValue = res.data[0].operateTime + ' ~ ' + res.data[0].operateTimeEnd;
                  } else if (operateItem && operateItem.dataType == 1) {
                    data[i].fieldValue = res.data[0].operateTime;
                  }
                  data[i].errMsg = '';
                }

                this.form.content = res.data[0].nodeExt;
              } else {
                this.$message.error(res.msg);
              }
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error.toString());
            }
          });
      },
      setFormData(res) {
        var fields = res.data[0].fieldConfig;
        this.fields = fields;
        //编辑请求发送
        if (this.params.isEdit) {
          this.getNodeDataForEdit();
        }
        this.modelForm = [];
        this.form.productID = res.data[0].productID;
        this.form.content = [];
        for (let i = 0; i < fields.length; i++) {
          let temp = {};
          let singleContent = {fieldKey: fields[i].fieldKey, fieldValue: ''};
          for (let item in fields[i]) {
            if (item != 'fieldExt') {
              temp[item] = fields[i][item];
            } else {
              for (let j = 0; j < fields[i].fieldExt.length; j++) {
                temp[fields[i].fieldExt[j].itemName] = fields[i].fieldExt[j].itemValue;
              }
              if (fields[i].type == 3 && temp.dataType == 0) {
                temp.dataValue = temp.dataValue
                  .trim()
                  .replace(/\,/g, '\n')
                  .split('\n');
              }
              if (fields[i].type == 4 && temp.dataFormat) {
                /*if (temp.dataType == 0) {
                 temp.dataType = '1';
                 }*/
                let dateFormat = temp.dataFormat;
                if (dateFormat === 'yyyy,MM,dd,HH,mm,ss') {
                  dateFormat = 'yyyy/MM/dd HH:mm:ss';
                } else if (dateFormat === 'yyyy,MM,dd') {
                  dateFormat = 'yyyy/MM/dd';
                } else {
                  //如果配置了(时分秒)任意一项就是(年月日时分秒) 否则 就是(年月日)
                  if (
                    dateFormat.indexOf('HH') >= 0 ||
                    dateFormat.indexOf('mm') >= 0 ||
                    dateFormat.indexOf('ss') >= 0
                  ) {
                    dateFormat = 'yyyy/MM/dd HH:mm:ss';
                  } else {
                    dateFormat = 'yyyy/MM/dd';
                  }
                }
                temp.dataFormat = dateFormat;
              }
            }
          }
          if (!this.params.isEdit && temp.defaultValue) {
            singleContent.fieldValue = temp.defaultValue;
          }
          //固定requiredNumber张图片
          if (temp.requiredNumber > 0) {
            temp.minNumber = temp.requiredNumber;
            temp.maxNumber = temp.requiredNumber;
          }
          //查找单位文字
          /*if (temp.unitValue) {
           for (let k in enums['溯源文字节点单位']) {
           if (enums['溯源文字节点单位'][k] == temp.unitValue) {
           temp.unitValue = k;
           }
           }
           }*/
          //操作时间 时间点 如果没有值 就设为当前时间
          if (temp.isSysDefine == 1 && temp.dataType == 1 && !singleContent.fieldValue) {
            let dataFormat = temp.dataFormat;
            singleContent.fieldValue = new Date().toString(dataFormat);
          }
          this.form.content.push(singleContent);
          this.modelForm.push(temp);
        }
      },
      getNodeConfig() {
        this.$ajax
          .post(this.remoteUrl, this.params)
          .then(res => {
            if (res.resultCode == '200') {
              if (res.data && res.data[0]) {
                this.setFormData(res);
              } else {
                this.$emit('configNull');
              }
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error);
            }
          });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/config';

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix:after {
    display: block;
    content: '.';
    clear: both;
    height: 0;
    visibility: hidden;
  }

  .config-infos {
    padding: 20px;
    &.edit-infos {
      padding: 0 20px;
    }
  }

  .node-name {
    color: @primaryColor;
    text-align: center;
    font-size: 14px;
    margin-top: 41px;
  }
</style>
