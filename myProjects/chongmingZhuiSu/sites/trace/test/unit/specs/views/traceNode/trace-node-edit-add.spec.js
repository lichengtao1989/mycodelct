import util from '../../../util'
import traceNodeEditAdd from '../../../../../src/views/traceNode/traceNode-edit-add.vue'
describe('test traceNode-edit-add.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeEditAdd);
  });

  after(() => {
    vm.$destroy();
  });

  it('test dataModel', () => {
    const ary = [{itemName: '111'}, {itemName: '222'}, {itemName: '333'}];
    expect(vm.dataModel(ary, '333')).to.equal(ary[2]);
  });

  //初始化nodeList
  it('test getEditNodeList', (done) => {
    vm.editType = 0;
    vm.nodeList = [];
    vm.productInfo = {id: '06fbe112-9441-45df-9701-64f5a3473bad', name: 'mao'};
    const dataStr = '{"data":{"total":10,"rows":[{"nodeID":"ebc571d1-795d-4594-bb6a-f3a9dc0f2161","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"节点1","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"0","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/14 18:51:33","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"842b54a0-4887-45e7-8070-dc2d7cef162f","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"复制节点1","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"1","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/14 18:51:33","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"c8b6b4a7-c5b5-4152-90c0-b6ef1358e066","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"旧版添加的节点2","nodeType":"1","inputTimes":"1","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"2","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/25 14:06:24","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"95d62f44-dd83-4546-bba3-1f4d6f3b8d85","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"旧版添加节点","nodeType":"1","inputTimes":"1","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"3","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/25 14:06:29","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"4d7597e3-656b-4a9f-86e0-f56f0aeaaa7f","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"1","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"4","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/25 14:06:29","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"2f6eed92-6dbd-43d9-8f32-bdb8d259efda","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"旧版3","nodeType":"1","inputTimes":"1","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"5","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/14 18:51:33","isRequired":"1","showHidden":"0","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"e450553c-510e-478d-bcc8-2e835ea1fe36","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"嗯嗯","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"6","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/14 18:51:33","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"5799c9b3-866e-46da-a850-bcf08a1e946a","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"科学调研","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"1","isBatchEdit":"0","isOpen":"0","sortID":"6","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/23 11:02:17","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/23 11:02:17","isRequired":"1","showHidden":"0","plotsID":"","batchCreateType":"2","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"1b7c0d83-2db4-4819-b849-5e23a6ba78e4","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"厉害了1的发给大","nodeType":"1","inputTimes":"1","limitOrder":"0","limitNodeID":"","isBatchCreate":"1","isBatchEdit":"0","isOpen":"0","sortID":"6","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/23 11:02:40","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/23 11:03:33","isRequired":"0","showHidden":"2","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]},{"nodeID":"8ae8cdfa-9b8e-4208-8326-d7f13151a9ec","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"果树播种","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"6","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/23 11:03:04","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/23 11:03:33","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]}]},"msgDetails":{"msgs":null},"resultCode":"200","msg":""}';
    const postStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve(JSON.parse(dataStr)));
    vm.getEditNodeList();
    vm.editType = 1;
    vm.getEditNodeList();
    vm.editType = 2;
    vm.getEditNodeList();
    setTimeout(function () {
      expect(vm.nodeList.length).not.to.equal(0);
      postStub.restore();
      done();
    }, 10);
  });

  //复制节点
  it('test copyObject', () => {
    const dataStr = '{"nodeID":"","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"717c8d6f-3ad2-4f7d-98ac-d6a8d40283b2","nodeName":"","nodeType":"1","inputTimes":"1","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":7,"createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/14 18:51:33","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/14 18:51:33","isRequired":"1","showHidden":"0","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","fieldConfig":[{"fieldID":11411,"fieldKey":"4B29A386538BBD19","applyName":"","applyType":0,"nodeID":"2f6eed92-6dbd-43d9-8f32-bdb8d259efda","fieldName":"操作时间","isRequired":1,"sortID":1,"showHidden":0,"type":4,"fieldExt":[{"itemName":"dataType","itemValue":"1"},{"itemName":"dataSource","itemValue":"2"},{"itemName":"dataFormat","itemValue":"yyyy,MM,dd,HH,mm,ss"},{"itemName":"isSysDefine","itemValue":"1"}]},{"fieldID":5583,"fieldKey":"614C60AC4BDD39B9","applyName":"","applyType":0,"nodeID":"2f6eed92-6dbd-43d9-8f32-bdb8d259efda","fieldName":"手动","isRequired":0,"sortID":2,"showHidden":0,"type":3,"fieldExt":[{"itemName":"dataType","itemValue":"0"},{"itemName":"dataValue","itemValue":"1565的发给对方,大范甘迪电饭锅地方,电饭锅电饭锅电饭锅,地方郭德纲电饭锅发的个"}]}],"configCreateSet":[],"roleList":[]}';
    const len1 = vm.nodeList.length;
    vm.copyObject(JSON.parse(dataStr));
    const len2 = vm.nodeList.length;
    expect(len2 - len1).to.equal(1);
    expect(vm.nodeList[vm.nodeList.length - 1].unSaved).to.equal(true);
  });

  //编辑节点 取消编辑节点
  it('test showNodeDetail cancelEdit', (done) => {
    vm.$nextTick(() => {
      const itemStr = '{"nodeID":"a30a4acc-fe61-42bf-82da-e7b85a1965c4","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"06fbe112-9441-45df-9701-64f5a3473bad","nodeName":"11-5","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"1","isBatchEdit":"0","isOpen":"0","sortID":"3","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/9 20:38:43","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/17 14:49:44","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]}';
      const msgSpy = sinon.spy(vm, '$message');
      vm.showNodeDetail(JSON.parse(itemStr));
      expect(msgSpy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');
      vm.cancelEdit();
      vm.showNodeDetail(JSON.parse(itemStr));
      expect(msgSpy.secondCall).to.equal(null);
      vm.cancelEdit();
      vm.isAddNodeList = true;
      vm.showNodeDetail(JSON.parse(itemStr));
      expect(vm.nodeData).to.equal(vm.nodeListModel);
      vm.cancelEdit();
      msgSpy.restore();
      done();
    });
  });

  it('test addNode', (done) => {
    vm.$nextTick(() => {
      const editData = '{"data":[{"nodeID":"81b2fb3c-58d0-4fc4-a87b-807ddbe8b692","corpID":"40018","categoryID":"","applyName":"","applyType":"0","productID":"a00a5dc2-ae05-4a7c-bae6-007c1c946e2c","nodeName":"车间5","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"0","isBatchEdit":"0","isOpen":"0","sortID":"2","createBy":"b536e020-3029-4760-9827-24bb3e01a28e","createTime":"2017/8/10 9:40:40","lastUpdateBy":"b536e020-3029-4760-9827-24bb3e01a28e","lastUpdateTime":"2017/8/10 9:50:53","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","fieldConfig":[{"fieldID":10632,"fieldKey":"F03AC0E001396BBA","applyName":"","applyType":0,"nodeID":"81b2fb3c-58d0-4fc4-a87b-807ddbe8b692","fieldName":"操作时间","isRequired":1,"sortID":0,"showHidden":1,"type":4,"fieldExt":[{"itemName":"dataType","itemValue":"1"},{"itemName":"dataSource","itemValue":"2"},{"itemName":"dataFormat","itemValue":"yyyy,MM,dd,HH,mm,ss"},{"itemName":"isSysDefine","itemValue":"1"}]}],"configCreateSet":[],"roleList":[]}],"resultCode":"200","msg":"","msgDetails":{"msgs":null}}';
      const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve(JSON.parse(editData)));
      const itemStr = '{"nodeID":"a30a4acc-fe61-42bf-82da-e7b85a1965c4","corpID":"11622","categoryID":"","applyName":"","applyType":"0","productID":"06fbe112-9441-45df-9701-64f5a3473bad","nodeName":"11-5","nodeType":"1","inputTimes":"2","limitOrder":"0","limitNodeID":"","isBatchCreate":"1","isBatchEdit":"0","isOpen":"0","sortID":"3","createBy":"92bfefc6-d90a-4614-bb36-d27514653381","createTime":"2017/8/9 20:38:43","lastUpdateBy":"92bfefc6-d90a-4614-bb36-d27514653381","lastUpdateTime":"2017/8/17 14:49:44","isRequired":"1","showHidden":"1","plotsID":"","batchCreateType":"1","visibleControl":"1","templateType":"0","inputCount":"0","roleList":[]}';
      vm.showNodeDetail(JSON.parse(itemStr));
      setTimeout(() => {
        vm.addNode('configText');
        expect(vm.nodeData.fieldConfig[vm.nodeData.fieldConfig.length - 1].type).to.equal(1);
        vm.addNode('configImage');
        expect(vm.nodeData.fieldConfig[vm.nodeData.fieldConfig.length - 1].type).to.equal(2);
        vm.addNode('configOption');
        expect(vm.nodeData.fieldConfig[vm.nodeData.fieldConfig.length - 1].type).to.equal(3);
        vm.addNode('configDatetime');
        expect(vm.nodeData.fieldConfig[vm.nodeData.fieldConfig.length - 1].type).to.equal(4);
        stub.restore();
        setTimeout(done, 150);
      }, 10);
    });
  });

  it('test addNodeList', (done) => {
    vm.$nextTick(() => {
      const msgSpy = sinon.spy(vm, '$message');
      vm.addNodeList();
      expect(msgSpy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');
      vm.cancelEdit();
      const len1 = vm.nodeList.length;
      vm.addNodeList();
      const len2 = vm.nodeList.length;
      expect(vm.nodeData.unSaved).to.equal(true);
      expect(vm.nodeList[vm.nodeList.length - 1]).to.equal(vm.nodeData);
      expect(len1 + 1).to.equal(len2);
      msgSpy.restore();
      done();
    });
  });

  it('test nextStep nodeName empty', (done) => {
    vm.$nextTick(() => {
      const msgSpy = sinon.spy(vm, '$message');
      vm.nextStep();
      expect(msgSpy.firstCall.args[0]).to.equal('节点名称不能为空，请填写完整！');
      msgSpy.restore();
      done();
    });
  });

  it('test nextStep nodeName not empty', (done) => {
    vm.$nextTick(() => {
      vm.nodeData.nodeName = 'xxxx';
      vm.nextStep();
      expect(vm.activeName).to.equal('2');
      vm.nextStep();
      expect(vm.activeName).to.equal('3');
      vm.nextStep();
      expect(vm.activeName).to.equal('3');
      vm.nextStep();
      expect(vm.activeName).to.equal('3');
      done();
    });
  });

  it('test saveDataRules nodeName empty', (done) => {
    vm.$nextTick(() => {
      const msgSpy = sinon.spy(vm, '$message');
      vm.saveDataRules({nodeName: ''});
      expect(msgSpy.firstCall.args[0]).to.equal('节点名称不能为空，请填写完整！');
      msgSpy.restore();
      done();
    });
  });

  it('test messageError', () => {
    vm.messageError('卡片名称不能重复');
    expect(vm.activeName).to.equal('2');
  });

  it('test saveDataRules', (done) => {
    vm.$nextTick(() => {
      const data = {nodeName: null, configCreateSet: [], isBatchCreate: '1'};
      const spy = sinon.spy(vm, '$message');
      let res = vm.saveDataRules(data);
      expect(res).to.equal(false);
      expect(spy.firstCall.args[0]).to.equal('节点名称不能为空，请填写完整！');

      data.nodeName = '111';
      data.fieldConfig = [{type: 1, fieldName: ''}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('字段节点内容名称不能为空，请填写完整！');

      data.fieldConfig = [{type: 1, fieldName: '2', fieldExt: [{itemName: 'minSize', itemValue: 5}, {itemName: 'maxSize', itemValue: 2}]}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('位数最大值不能小于最小值！');

      data.fieldConfig[0].fieldExt[1].itemValue = 10;
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('启用后至少要新建一条规则！');

      data.isBatchCreate = '2';
      res = vm.saveDataRules(data);
      expect(res).to.equal(true);

      data.configCreateSet.push({tabLabel: [{tabType: 3, required: '0'}]});
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('流水号必填哦!');

      data.fieldConfig = [{type: 2, fieldName: ''}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('图片节点内容名称不能为空，请填写完整！');

      data.fieldConfig = [{type: 2, fieldName: '111', fieldExt: [{itemName: 'minNumber', itemValue: 5}, {itemName: 'maxNumber', itemValue: 2}]}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('图片数量最大值不能小于最小值！');

      data.fieldConfig[0].fieldExt[1].itemValue = 10;
      data.isBatchCreate = '2';
      data.configCreateSet = [];
      res = vm.saveDataRules(data);
      expect(res).to.equal(true);

      data.fieldConfig = [{type: 3, fieldName: ''}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('单选节点内容名称不能为空，请填写完整！');

      data.fieldConfig = [{type: 3, fieldName: '111', fieldExt: [{itemName: 'dataValue', itemValue: '111\n222'}]}];
      res = vm.saveDataRules(data);
      expect(res).to.equal(true);

      data.fieldConfig = [{type: 3, fieldName: '111', fieldExt: [{itemName: 'dataValue', itemValue: '1234512345123451\n123'}]}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('每个单选最多只能输入15个字');

      data.fieldConfig = [{type: 4, fieldName: ''}];
      res = vm.saveDataRules(data);
      expect(spy.lastCall.args[0]).to.equal('时间节点内容名称不能为空，请填写完整！');

      data.fieldConfig = [{type: 4, fieldName: '123'}];
      res = vm.saveDataRules(data);
      expect(res).to.equal(true);


      spy.restore();
      done();
    });
  });

  it('test saveData', (done) => {
    vm.$nextTick(() => {
      let saveStub = sinon.stub(vm, 'saveDataRules', () => false);
      let postStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200', msg: 'msgtest'}));
      const spy = sinon.spy(vm, '$message');
      expect(vm.saveData()).to.equal(false);
      expect(postStub.called).to.equal(false);
      saveStub.restore();
      saveStub = sinon.stub(vm, 'saveDataRules', () => true);
      vm.nodeData = {};
      vm.nodeData.nodeID = '11';
      vm.saveData();
      vm.nodeData = {};
      vm.nodeData.nodeID = '';
      vm.saveData();
      setTimeout(() => {
        expect(spy.lastCall.args[0]).to.equal('msgtest');
        postStub.restore();
        postStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '201', msg: 'msgtest'}));
        vm.nodeData = {};
        vm.nodeData.nodeID = '';
        vm.saveData();
        vm.nodeData.nodeID = '11';
        vm.saveData();
        setTimeout(() => {
          expect(spy.lastCall.args[0]).to.equal('msgtest');
          saveStub.restore();
          postStub.restore();
          spy.restore();
          done();
        }, 10);
      }, 10);
    });
  });

  it('test nodePreview', (done) => {
    vm.$nextTick(() => {
      const stub = sinon.stub(vm, '$nextTick', (cbk) => {
        setTimeout(cbk, 20);
      });
      vm.nodePreview();
      setTimeout(() => {
        const stub2 = sinon.stub(vm.$refs.nodePreviewComponent, 'addForm');
        setTimeout(() => {
          expect(vm.dialogVisible).to.equal(true);
          expect(stub2.called).to.equal(true);
          stub.restore();
          stub2.restore();
          done();
        }, 20);
      }, 10);
    });
  });

  it('test confirm', () => {
    const obj = {
      cbk: () => {
      }
    };
    const stub = sinon.stub(obj, 'cbk');
    vm.confirm(obj.cbk);
    expect(vm.dialogVisible).to.equal(false);
    expect(stub.called).to.equal(true);
    stub.restore();
  });

  it('test handleModelClick', (done) => {
    vm.$nextTick(() => {
      /*vm.editType = 0;
       vm.isAddNodeList = true;
       vm.modelDialogVisible = true;*/
      const stub = sinon.stub(vm, '$nextTick', (cbk) => {
        try {
          cbk();
        } catch (e) {
        }
      });
      setTimeout(() => {
        vm.handleModelClick({name: 'cateModel'});
        expect(vm.modelTableType).to.equal('cateModel');
        vm.handleModelClick({name: 'myModel'});
        expect(vm.modelTableType).to.equal('myModel');
        vm.handleModelClick({name: 'gapModel'});
        expect(vm.modelTableType).to.equal('gapModel');
        vm.handleModelClick({name: 'haccpModel'});
        expect(vm.modelTableType).to.equal('haccpModel');
        setTimeout(() => {
          stub.restore();
          done();
        }, 10);
      }, 30);
    });
  });

  it('test modelConfirm', (done) => {
    vm.$nextTick(() => {
      vm.editType = 0;
      vm.dialogVisible = false;
      setTimeout(() => {
        vm.modelDialogVisible = true;
        // vm.isAddNodeList = true;
        vm.modelTableType = 'cateModel';
        vm.activeModelName = 'cateModel';
      }, 20);
      setTimeout(() => {
        const stub = sinon.stub(vm.$refs.cateModel, 'submit', () => {
          return Promise.resolve({msg: 'msgtest'});
        });
        const getEditNodeListStub = sinon.stub(vm, 'getEditNodeList');
        vm.modelConfirm();
        setTimeout(() => {
          expect(getEditNodeListStub.called).to.equal(true);
          stub.restore();
          getEditNodeListStub.restore();
          done();
        }, 10);
      }, 50);
    });
  });


  it('test addNodeFromModel', (done) => {
    vm.$nextTick(() => {
      vm.isAddNodeList = true;
      this.isModify = true;
      const spy = sinon.spy(vm, '$message');
      vm.addNodeFromModel();
      expect(spy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');
      vm.isAddNodeList = false;
      vm.addNodeFromModel();
      expect(vm.activeModelName).to.equal('cateModel');
      expect(vm.modelDialogVisible).to.equal(true);
      setTimeout(() => {
        spy.restore();
        done();
      }, 20);
    });
  });

});
