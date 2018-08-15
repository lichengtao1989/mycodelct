import util from '../../../../util'
import traceReaordEdit from '../../../../../../src/views/traceRecord/components/traceRecord-edit.vue'
describe('test traceRecord-edit.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceReaordEdit, {params: {isEdit: false}});
  });

  after(() => {
    vm.$destroy();
  });

  function fieldsInit() {
    const form = JSON.parse('{"nodeID":"","productID":"eb563be8-2dd8-4e48-b0c0-7756f3b284b1","batchID":"","operateTimeShowHidden":0,"operateTime":"","operateTimeFormat":"","content":[{"fieldKey":"95821A16BE7A3046","fieldValue":"","errMsg":""},{"fieldKey":"1F253E021FE5E4F0","fieldValue":"","errMsg":""},{"fieldKey":"8E066FB3FFC917C1","fieldValue":"","errMsg":""},{"fieldKey":"9BA58B86A6197875","fieldValue":"","errMsg":""}]}');
    const modelForm = JSON.parse('[{"fieldID":10487,"fieldKey":"95821A16BE7A3046","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"操作时间","isRequired":1,"sortID":0,"showHidden":1,"type":4,"dataType":"2","dataSource":"2","dataFormat":"","isSysDefine":"1"},{"fieldID":10488,"fieldKey":"1F253E021FE5E4F0","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"播种时间","isRequired":0,"sortID":1,"showHidden":1,"type":4,"dataType":"2","dataSource":"2","dataFormat":"yyyy/MM/dd","isSysDefine":"0"},{"fieldID":5141,"fieldKey":"8E066FB3FFC917C1","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"种苗名称","isRequired":1,"sortID":2,"showHidden":1,"type":1,"defaultValue":"苗","unitValue":"2","valiateFormat":",chinese,letter","maxSize":"","minSize":""},{"fieldID":3230,"fieldKey":"9BA58B86A6197875","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"图片","isRequired":1,"sortID":3,"showHidden":1,"type":2,"requiredNumber":"","minNumber":"","maxNumber":"","isRemarkEnable":"1"}]');
    const fields = JSON.parse('[{"fieldID":10487,"fieldKey":"95821A16BE7A3046","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"操作时间","isRequired":1,"sortID":0,"showHidden":1,"type":4,"fieldExt":[{"itemName":"dataType","itemValue":"2"},{"itemName":"dataSource","itemValue":"2"},{"itemName":"dataFormat","itemValue":"yyyy,MM,dd,HH,mm,ss"},{"itemName":"isSysDefine","itemValue":"1"}]},{"fieldID":10488,"fieldKey":"1F253E021FE5E4F0","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"播种时间","isRequired":0,"sortID":1,"showHidden":1,"type":4,"fieldExt":[{"itemName":"dataType","itemValue":"2"},{"itemName":"dataSource","itemValue":"2"},{"itemName":"dataFormat","itemValue":"yyyy,MM,dd"},{"itemName":"isSysDefine","itemValue":"0"}]},{"fieldID":5141,"fieldKey":"8E066FB3FFC917C1","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"种苗名称","isRequired":1,"sortID":2,"showHidden":1,"type":1,"fieldExt":[{"itemName":"defaultValue","itemValue":"苗"},{"itemName":"unitValue","itemValue":"2"},{"itemName":"valiateFormat","itemValue":",chinese,letter"},{"itemName":"maxSize","itemValue":""},{"itemName":"minSize","itemValue":""}]},{"fieldID":3230,"fieldKey":"9BA58B86A6197875","applyName":"","applyType":0,"nodeID":"5142e936-1f96-4239-84d8-533185275b15","fieldName":"图片","isRequired":1,"sortID":3,"showHidden":1,"type":2,"fieldExt":[{"itemName":"requiredNumber","itemValue":""},{"itemName":"minNumber","itemValue":""},{"itemName":"maxNumber","itemValue":""},{"itemName":"isRemarkEnable","itemValue":"1"}]}]');
    Object.keys(form).forEach((item) => vm.$set(vm.form, item, form[item]));
    Object.keys(modelForm).forEach((item) => vm.$set(vm.modelForm, item, modelForm[item]));
    Object.keys(fields).forEach((item) => vm.$set(vm.fields, item, fields[item]));
  }

  it('test remoteSelectSwitch', () => {
    expect(vm.remoteSelectSwitch(0)).to.equal('');
    expect(vm.remoteSelectSwitch(1)).to.equal(vm.traceApiUrl.autoComplete.ORG);
    expect(vm.remoteSelectSwitch(2)).to.equal(vm.traceApiUrl.traceNode.TRACE_PRODUCT_LIST);
    expect(vm.remoteSelectSwitch(3)).to.equal(vm.traceApiUrl.autoComplete.PRODUCT_BATCH);
    expect(vm.remoteSelectSwitch(4)).to.equal(vm.traceApiUrl.autoComplete.USER);
    expect(vm.remoteSelectSwitch(5)).to.equal(vm.traceApiUrl.autoComplete.PLOTS);
    expect(vm.remoteSelectSwitch(6)).to.equal(vm.traceApiUrl.autoComplete.INPUTS);
    expect(vm.remoteSelectSwitch(7)).to.equal(vm.traceApiUrl.autoComplete.MONITOR);
  });
  it('test validChinese', () => {
    expect(vm.validChinese('中文')).to.equal(true);
    expect(vm.validChinese('english')).to.equal(false);
  });
  it('test validLetter', () => {
    expect(vm.validLetter('abc')).to.equal(true);
    expect(vm.validLetter('!@#')).to.equal(false);
  });
  it('test validNumber', () => {
    expect(vm.validNumber('123')).to.equal(true);
    expect(vm.validNumber('NaN')).to.equal(false);
  });
  it('test validSymbol', () => {
    expect(vm.validSymbol('!@#')).to.equal(true);
    expect(vm.validSymbol('123')).to.equal(false);
  });
  it('test errMsgCreate', () => {
    expect(vm.errMsgCreate('aaa', 'bbb')).to.deep.equal({fieldKey: 'aaa', msg: 'bbb'});
  });
  it('test validRequire', (done) => {
    vm.$nextTick(() => {
      fieldsInit();
      vm.form.content[0].fieldValue = '';
      vm.form.content[2].fieldValue = '';
      const errMsgs = vm.validRequire();
      expect(errMsgs).to.deep.equal([{fieldKey: '95821A16BE7A3046', msg: '操作时间:必填'}, {fieldKey: '8E066FB3FFC917C1', msg: '种苗名称:必填'}]);
      done();
    });
  });
  it('test validInputType', (done) => {
    vm.$nextTick(() => {
      fieldsInit();
      vm.form.content[2].fieldValue = '123';
      let errMsgs = vm.validInputType();
      expect(errMsgs).to.deep.equal([{fieldKey: '8E066FB3FFC917C1', msg: '种苗名称:只能输入(中文,英文)'}]);
      vm.form.content[2].fieldValue = 'abcABC中文';
      errMsgs = vm.validInputType();
      expect(errMsgs).to.deep.equal([]);
      done();
    });
  });
  it('test validTestSize', (done) => {
    vm.$nextTick(() => {
      fieldsInit();
      vm.modelForm[2].maxSize = '8';
      vm.modelForm[2].minSize = '4';
      vm.fields[2].fieldExt[3].itemValue = '8';
      vm.fields[2].fieldExt[4].itemValue = '4';
      vm.form.content[2].fieldValue = '一二三';
      let errMsgs = vm.validTestSize();
      expect(errMsgs).to.deep.equal([{fieldKey: '8E066FB3FFC917C1', msg: '种苗名称:不能少于4位'}]);
      vm.form.content[2].fieldValue = '一二三四五六七八九';
      errMsgs = vm.validTestSize();
      expect(errMsgs).to.deep.equal([{fieldKey: '8E066FB3FFC917C1', msg: '种苗名称:不能多于8位'}]);
      vm.form.content[2].fieldValue = '一二三四五';
      errMsgs = vm.validTestSize();
      expect(errMsgs).to.deep.equal([]);
      done();
    });
  });
  it('test validImageNumber', (done) => {
    vm.$nextTick(() => {
      fieldsInit();
      let errMsgs = vm.validImageNumber();
      expect(errMsgs).to.deep.equal([{fieldKey: '9BA58B86A6197875', msg: '图片:请上传图片'}]);
      vm.form.content[3].fieldValue = ['1', '2'];
      errMsgs = vm.validImageNumber();
      expect(errMsgs).to.deep.equal([]);
      vm.modelForm[3].minNumber = '3';
      vm.modelForm[3].maxNumber = '5';
      errMsgs = vm.validImageNumber();
      expect(errMsgs).to.deep.equal([{fieldKey: '9BA58B86A6197875', msg: '图片:请至少上传3张图片'}]);
      vm.form.content[3].fieldValue = ['1', '2', '3', '4', '5', '6'];
      errMsgs = vm.validImageNumber();
      expect(errMsgs).to.deep.equal([{fieldKey: '9BA58B86A6197875', msg: '图片:最多只能上传5张图片'}]);
      fieldsInit();
      vm.modelForm[3].isRequired = 0;
      vm.modelForm[3].maxNumber = '2';
      vm.form.content[3].fieldValue = ['1', '2', '3'];
      errMsgs = vm.validImageNumber();
      expect(errMsgs).to.deep.equal([{fieldKey: '9BA58B86A6197875', msg: '图片:最多只能上传2张图片'}]);
      done();
    });
  });
  it('test validContent', (done) => {
    vm.$nextTick(() => {
      fieldsInit();
      vm.validContent('', '', () => true);
      vm.form.content[0].fieldValue = '';
      vm.form.content[2].fieldValue = '';
      expect(vm.form.content[0].errMsg).to.equal('操作时间:必填');
      expect(vm.form.content[2].errMsg).to.equal('种苗名称:必填');
      done();
    });
  });
  it('test getTitleByImgUrl', (done) => {
    fieldsInit();
    vm.$nextTick(() => {
      vm.form.content[3].fieldValue = ['11', '22', '33'];
      vm.form.content[3].fieldContent = [{url: '11', title: 'title11'}, {url: '22', title: 'title22'}, {url: '33', title: 'title33'}];
      setTimeout(() => {
        const title = vm.getTitleByImgUrl('22');
        expect(title).to.equal('title22');
        done();
      }, 10);
    });
  });
  it('test form2AjaxParams', (done) => {
    fieldsInit();
    vm.$nextTick(() => {
      vm.form.content[3].fieldValue = ['11', '22', '33'];
      const content = [{url: '11', title: 'title11'}, {url: '22', title: 'title22'}, {url: '33', title: 'title33'}]
      vm.form.content[3].fieldContent = content;
      vm.modelForm[0].isSysDefine = 1;
      const fieldKey = vm.modelForm[0].fieldKey;
      setTimeout(() => {
        const params = vm.form2AjaxParams();
        expect(JSON.parse(params.content[2].fieldValue)).to.deep.equal(content);
        const isSysDefineItem = params.content.find(item => item.fieldKey === fieldKey);
        expect(isSysDefineItem).to.equal(undefined);
        done();
      }, 10);
    });
  });
  it('test setOperationTime', (done) => {
    fieldsInit();
    vm.$nextTick(() => {
      vm.modelForm[0].type = 4;
      vm.modelForm[0].dataSource = 1;
      const dataFormat = 'yyyy年MM月dd日 HH:mm:ss';
      vm.modelForm[0].dataFormat = dataFormat;
      vm.modelForm[0].isSysDefine = 0;
      vm.setOperationTime();
      expect(vm.form.content[0].fieldValue).to.equal((new Date()).toString(dataFormat));
      //
      fieldsInit();
      vm.modelForm[0].dataFormat = dataFormat;
      vm.modelForm[0].isSysDefine = 1;
      vm.modelForm[0].showHidden = 1;
      vm.modelForm[0].dataType = 2;
      vm.form.content[0].fieldValue = '2016年01月02日 03:04:05 ~ 2017年01月02日 03:04:05';
      vm.form.operateTimeFormat = '';
      vm.form.operateTimeShowHidden = '';
      vm.form.operateTime = '';
      vm.setOperationTime();
      expect(vm.form.operateTimeFormat).to.equal(dataFormat);
      expect(vm.form.operateTimeShowHidden).to.equal(1);
      expect(vm.form.operateTime).to.equal('2016年01月02日 03:04:05');
      expect(vm.form.operateTimeEnd).to.equal('2017年01月02日 03:04:05');
      //
      vm.form.content[0].fieldValue = '2016年01月02日 03:04:05';
      vm.modelForm[0].dataType = 1;
      vm.form.operateTime = '';
      vm.form.operateTimeEnd = '';
      vm.setOperationTime();
      expect(vm.form.operateTime).to.equal('2016年01月02日 03:04:05');
      expect(vm.form.operateTimeEnd).to.equal('');
      done();
    });
  });
  it('test getNodeDataForEdit', (done) => {
    vm.$nextTick(() => {
      let res = {resultCode: '200', data: [{nodeExt: [], operateTime: '123', operateTimeEnd: '456'}]};
      const imgDataStr = '[{"url":"11","title":"title11"},{"url":"22","title":"title22"}]';
      res.data[0].nodeExt.push({fieldType: 2, fieldKey: 'fieldKey111', fieldValue: imgDataStr});
      res.data[0].nodeExt.push({fieldType: 1, fieldKey: 'fieldKey222', fieldValue: ''});
      vm.modelForm = [{fieldKey: 'fieldKey222', dataType: 2, isSysDefine: 1}];
      const ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve(util.deepClone(res)));
      vm.getNodeDataForEdit();
      setTimeout(() => {
        let resultObj = util.deepClone(res.data[0].nodeExt);
        resultObj[0].fieldContent = JSON.parse(imgDataStr);
        resultObj[0].fieldValue = ['11', '22'];
        resultObj[0].errMsg = '';
        resultObj[1].fieldValue = '123 ~ 456';
        resultObj[1].errMsg = '';
        expect(vm.form.content).to.deep.equal(resultObj);
        vm.modelForm = [{fieldKey: 'fieldKey222', dataType: 1, isSysDefine: 1}];
        vm.getNodeDataForEdit();
        setTimeout(() => {
          resultObj[1].fieldValue = '123';
          expect(vm.form.content).to.deep.equal(resultObj);
          ajaxStub.restore();
          done();
        }, 10);
      }, 10);
    });
  });

  it('test setFormData', (done) => {
    vm.$nextTick(() => {
      let fieldConfig = [];
      fieldConfig.push({fieldKey: '123', type: 3, fieldExt: [{itemName: 'name1', itemValue: 'value1'}, {itemName: 'dataType', itemValue: '0'}, {itemName: 'dataValue', itemValue: '  1,2,3 '}]});
      fieldConfig.push({fieldKey: '234', type: 4, fieldExt: [{itemName: 'name2', itemValue: 'value2'}, {itemName: 'dataFormat', itemValue: 'yyyy,MM,dd,HH,mm,ss'}]});
      fieldConfig.push({fieldKey: '345', type: 4, fieldExt: [{itemName: 'name3', itemValue: 'value3'}, {itemName: 'dataFormat', itemValue: 'yyyy,MM,dd'}]});
      fieldConfig.push({fieldKey: '456', type: 4, fieldExt: [{itemName: 'name4', itemValue: 'value4'}, {itemName: 'dataFormat', itemValue: 'HH'}, {itemName: 'defaultValue', itemValue: 'time'}]});
      fieldConfig.push({fieldKey: '567', type: 4, fieldExt: [{itemName: 'name5', itemValue: 'value5'}, {itemName: 'dataFormat', itemValue: 'xx'}, {itemName: 'requiredNumber', itemValue: 5}]});
      let res = {data: [{fieldConfig: fieldConfig}]};
      vm.params.isEdit = true;
      const stub = sinon.stub(vm, 'getNodeDataForEdit', () => Promise.resolve());
      vm.form.content = [];
      vm.modelForm = [];
      vm.setFormData(util.deepClone(res));
      expect(stub.called).to.equal(true);
      stub.restore();
      const resFormContent = [{fieldKey: "123", fieldValue: ""}, {fieldKey: "234", fieldValue: ""}, {fieldKey: "345", fieldValue: ""}, {fieldKey: "456", fieldValue: ""}, {fieldKey: "567", fieldValue: ""}];
      const modelForm = [{fieldKey: "123", type: 3, name1: "value1", dataType: "0", dataValue: ["1", "2", "3"]}, {fieldKey: "234", type: 4, name2: "value2", dataFormat: "yyyy/MM/dd HH:mm:ss"}, {fieldKey: "345", type: 4, name3: "value3", dataFormat: "yyyy/MM/dd"}, {fieldKey: "456", type: 4, name4: "value4", dataFormat: "yyyy/MM/dd HH:mm:ss", defaultValue: "time"}, {fieldKey: "567", type: 4, name5: "value5", dataFormat: "yyyy/MM/dd", requiredNumber: 5, minNumber: 5, maxNumber: 5}];
      expect(vm.form.content).to.deep.equal(resFormContent);
      expect(vm.modelForm).to.deep.equal(modelForm);
      vm.params.isEdit = false;
      vm.form.content = [];
      vm.modelForm = [];
      vm.setFormData(util.deepClone(res));
      resFormContent[3].fieldValue = 'time';
      expect(vm.form.content).to.deep.equal(resFormContent);
      fieldConfig.push({fieldKey: '678', type: 1, fieldExt: [{itemName: 'isSysDefine', itemValue: 1}, {itemName: 'dataType', itemValue: 1}, {itemName: 'dataFormat', itemValue: 'yyyy,MM,dd'}]});
      resFormContent.push({fieldKey: '678', fieldValue: (new Date()).toString('yyyy,MM,dd')});
      vm.form.content = [];
      vm.modelForm = [];
      vm.setFormData(util.deepClone(res));
      expect(vm.form.content).to.deep.equal(resFormContent);
      done();
    });
  });

  it('test getNodeConfig', (done) => {
    vm.$nextTick(() => {
      let ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200'}));
      const emitSpy = sinon.spy(vm, '$emit');

      const setFormDataStub = sinon.stub(vm, 'setFormData', (res) => expect(res).to.deep.equal({resultCode: 200, data: [1, 2, 3]}));
      vm.getNodeConfig();
      setTimeout(() => {
        expect(emitSpy.firstCall.args[0]).to.equal('configNull');
        emitSpy.restore();
        ajaxStub.restore();
        ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: 200, data: [1, 2, 3]}));
        vm.getNodeConfig();
        setTimeout(() => {
          ajaxStub.restore();
          setFormDataStub.restore();
          done();
        }, 10);
      }, 10);
    })
  });

  it('test submit', (done) => {
    vm.$nextTick(() => {
      let ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200', msg: '111'}));
      let validateStub = sinon.stub(vm.$refs.form, 'validate', cbk => cbk(false));
      vm.submit().catch(() => {
        setTimeout(() => {
          expect(ajaxStub.called).to.equal(false);
        }, 10);
      });
      setTimeout(() => {
        ajaxStub.restore();
        validateStub.restore();
        ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200', msg: '111'}));
        validateStub = sinon.stub(vm.$refs.form, 'validate', cbk => cbk(true));
        vm.submit().then(() => {
          setTimeout(() => {
            expect(ajaxStub.called).to.equal(true);
            ajaxStub.restore();
            ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.reject('error'));
            vm.submit();
            ajaxStub.restore();
            ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '20', msg: '111'}));
            vm.submit();
          }, 10);
        });
      }, 20);
      setTimeout(() => {
        ajaxStub.restore();
        validateStub.restore();
        done();
      }, 50);
    });
  });
});
