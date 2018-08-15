import util from '../../../../util'
import traceReaordList from '../../../../../../src/views/traceRecord/components/traceRecord-list.vue'
describe('test traceRecord-list.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceReaordList);
  });

  after(() => {
    vm.$destroy();
  });

  it('test configNull', (done) => {
    vm.$nextTick(() => {
      const spy = sinon.spy(vm.$message, 'error');
      vm.configNull();
      expect(spy.firstCall.args[0]).to.equal('该数据的溯源节点配置不存在');
      expect(vm.dialogVisible).to.equal(false);
      spy.restore();
      done();
    })
  });

  it('test triggerH5', (done) => {
    const node = {showHidden: 2};
    const stub = sinon.stub(vm, 'setH5Hidden');
    vm.triggerH5(node);
    expect(node.showHidden).to.equal('0');
    vm.triggerH5(node);
    expect(node.showHidden).to.equal('1');
    expect(stub.called).to.equal(true);
    stub.restore();
    done();
  });

  it('test editNodeConfig', (done) => {
    vm.$nextTick(() => {
      const node = {nodeName: '1', nodeID: '2', batchID: '4', traceNodeID: '5'};
      vm.editNodeConfig(node);
      setTimeout(() => {
        expect(vm.dialogVisible).to.equal(true);
        expect(vm.dialogTitle).to.equal('1');
        expect(vm.paramsForConfig).to.deep.equal({nodeName: '1', nodeID: '2', batchID: '4', traceNodeID: '5', isEdit: true});
        done();
      }, 20);
    });
  });

  it('test editNodeConfirm', (done) => {
    vm.dialogVisible = true;
    vm.$nextTick(() => {
      let stub = sinon.stub(vm.$refs.editNodePage, 'submit', () => Promise.resolve());
      const obj = {
        cbk: function () {
        }
      };
      const cbkStub = sinon.stub(obj, 'cbk');
      const getDetailsListStub = sinon.stub(vm, 'getDetailsList');
      vm.editNodeConfirm(obj.cbk);
      setTimeout(() => {
        expect(cbkStub.called).to.equal(true);
        expect(getDetailsListStub.called).to.equal(true);
        expect(vm.dialogVisible).to.equal(false);
        vm.dialogVisible = true;
        vm.$nextTick(() => {
          stub.restore();
          cbkStub.restore();
          getDetailsListStub.restore();
          stub = sinon.stub(vm.$refs.editNodePage, 'submit', () => Promise.reject('error'));
          vm.editNodeConfirm(obj.cbk);
          stub.restore();
          done();
        });
      }, 10);
    });
  });

  it('test delNodeConfig1', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', (arg0, arg1, arg2) => {
        expect(arg0).to.equal('确认删除？');
        expect(arg1).to.equal('提示');
        expect(arg2).to.deep.equal({type: 'warning'});
        return Promise.reject();
      });
      vm.delNodeConfig();
      confirmStub.restore();
      done();
    })
  });
  it('test delNodeConfig2', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const postStub = sinon.stub(vm.$ajax, 'post', (url, param) => {
        expect(param).to.deep.equal({traceNodeID: '111'});
        return Promise.reject('error123');
      });
      const errorSpy = sinon.spy(vm.$message, 'error');
      vm.delNodeConfig({traceNodeID: '111', sss: '222'});
      setTimeout(() => {
        expect(errorSpy.firstCall.args[0]).to.equal('error123');
        confirmStub.restore();
        postStub.restore();
        errorSpy.restore();
        done();
      }, 10);
    })
  });

  it('test delNodeConfig3', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const postStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '123', msg: 'error456'}));
      const errorSpy = sinon.spy(vm.$message, 'error');
      vm.delNodeConfig({traceNodeID: '1'});
      setTimeout(() => {
        expect(errorSpy.firstCall.args[0]).to.equal('error456');
        confirmStub.restore();
        postStub.restore();
        errorSpy.restore();
        done();
      }, 10);
    });
  });

  it('test delNodeConfig4', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const postStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200', msg: 'msg123'}));
      const msgSpy = sinon.spy(vm, '$message');
      const getDetailsListStub = sinon.stub(vm, 'getDetailsList');
      vm.delNodeConfig({traceNodeID: '1'});
      setTimeout(() => {
        expect(msgSpy.firstCall.args[0]).to.equal('msg123');
        expect(getDetailsListStub.called).to.equal(true);
        confirmStub.restore();
        postStub.restore();
        msgSpy.restore();
        getDetailsListStub.restore();
        done();
      }, 10);
    });
  });

  it('test nodesInfoSetting', (done) => {
    vm.$nextTick(() => {
      const nodesInfo = [{
        operateTime: 'time123',
        operateTimeEnd: 'time456',
        nodeExt: [
          {isSysDefine: 1},
          {isSysDefine: 0, fieldText: 'text', fieldValue: 'value', fieldType: '1'},
          {isSysDefine: 0, fieldText: 'text', fieldValue: 'value', fieldType: '3'}
        ]
      }];
      const newNodesInfo = vm.nodesInfoSetting(util.deepClone(nodesInfo));
      expect(newNodesInfo[0].nodeExt[0].fieldValue).to.equal('time123 ~ time456');
      expect(newNodesInfo[0].nodeExt[1].fieldValue).to.equal('valuetext');
      expect(newNodesInfo[0].nodeExt[2].fieldValue).to.equal('text');
      done();
    });
  });

  it('test getDetailsList', (done) => {
    vm.$nextTick(() => {
      vm.datasList = [1, 2, 3];
      vm.getDetailsList();
      expect(vm.nodesInfo).to.equal(vm.datasList);
      vm.datasList = null;
      const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', data: {rows: []}}));
      vm.allSpread = true;
      const spy = sinon.spy(vm, 'toggleInfoShow');
      const emitStub = sinon.stub(vm, '$emit');
      vm.getDetailsList();
      setTimeout(() => {
        expect(vm.nodesInfo).to.deep.equal([]);
        expect(spy.firstCall.args[0]).to.equal(true);
        expect(emitStub.called).to.equal(true);
        spy.restore();
        emitStub.restore();
        stub.restore();
        done();
      }, 10);
    });
  });

  it('test imgDataFormatter', (done) => {
    const val = [{url: 'url1', title: 'title2'}];
    const resHtml = vm.imgDataFormatter(JSON.stringify(val));
    expect(resHtml).to.equal('<ul><li><img src="url1"/><p>title2</p></li></ul>');
    done();
  });

  it('test toggleInfoShow', (done) => {
    const data = {isShow: true};
    vm.toggleInfoShow(data);
    expect(data.isShow).to.equal(false);
    vm.toggleInfoShow(data);
    expect(data.isShow).to.equal(true);
    done();
  });

  it('test setH5Hidden', (done) => {
    const node = {traceNodeID: '1', showHidden: 0};
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', msg: 'msg111'}));
    const spy = sinon.spy(vm, '$message');
    vm.setH5Hidden(node);
    setTimeout(() => {
      expect(spy.firstCall.args[0]).to.equal('msg111');
      stub.restore();
      spy.restore();
      done();
    }, 10);
  });

});
