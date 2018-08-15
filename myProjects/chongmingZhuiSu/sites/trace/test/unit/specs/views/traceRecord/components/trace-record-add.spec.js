import util from '../../../../util'
import traceReaordAdd from '../../../../../../src/views/traceRecord/components/traceRecord-add.vue'
describe('test traceRecord-add.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceReaordAdd);
  });

  after(() => {
    vm.$destroy();
  });


  it('test getNodeInfoTemplate', (done) => {
    vm.currentPage = 'recordAdd';
    vm.$nextTick(() => {
      const node = {nodeID: '1', nodeName: '2'};
      vm.productInfo.batchID = '3';
      const stub = sinon.stub(vm.$refs.listForDetail, 'setSelectedStatus', (_node) => {
        expect(_node).to.equal(node);
      });
      vm.getNodeInfoTemplate(node);
      expect(stub.called).to.equal(true);
      stub.restore();
      expect(vm.showEditBtn).to.equal(true);
      expect(vm.showConfigArea).to.equal(true);
      expect(vm.paramsForConfig.nodeID).to.equal('1');
      expect(vm.paramsForConfig.nodeName).to.equal('2');
      expect(vm.paramsForConfig.batchID).to.equal('3');
      done();
    });
  });

  it('test setBoxHeight', (done) => {
    vm.$nextTick(() => {
      const eventStub = sinon.stub(window, 'addEventListener', (eventName, cbk) => {
        expect(eventName).to.equal('resize');
        cbk();
      });
      const domStub = sinon.stub(document, 'getElementsByClassName', () => {
        return [{style: {minHeight: '100px'}}];
      });
      vm.setBoxHeight();
      expect(vm.fullHeight).to.equal(100 - 42 - 15 - 30);
      eventStub.restore();
      domStub.restore();
      done();
    });
  });

  it('test setNoDataMsg', (done) => {
    vm.$nextTick(() => {
      vm.setNoDataMsg(true);
      expect(vm.hasNoData).to.equal(true);
      vm.setNoDataMsg(false);
      expect(vm.hasNoData).to.equal(false);
      done();
    });
  });

  it('test configTraceNode', (done) => {
    vm.$nextTick(() => {
      const stub = sinon.stub(vm, 'pushPage', (arg0, arg1, arg2) => {
        expect(arg0).to.equal('edit');
        expect(arg1).to.equal('溯源节点配置');
        expect(arg2).to.equal(vm.productInfoForConfig);
      });
      vm.configTraceNode();
      stub.restore();
      done();
    });
  });

  it('test addNodeConfig', (done) => {
    vm.$nextTick(() => {
      let stub = sinon.stub(vm.$refs.infoAdd, 'submit', () => (new Promise(resolve => setTimeout(resolve, 10))));
      const popStub = sinon.stub(vm, 'popPage');
      vm.addNodeConfig();
      expect(vm.isDisabledSubmit).to.equal(true);
      setTimeout(() => {
        expect(popStub.called).to.equal(true);
        expect(vm.isDisabledSubmit).to.equal(false);
        stub.restore();
        popStub.restore();
        vm.isDisabledSubmit = true;
        stub = sinon.stub(vm.$refs.infoAdd, 'submit', () => Promise.reject('error'));
        vm.addNodeConfig();
        setTimeout(() => {
          expect(vm.isDisabledSubmit).to.equal(false);
          stub.restore();
          done();
        }, 10);
      }, 20);
    });
  });

  it('test cancleNodeConfig', (done) => {
    vm.$nextTick(() => {
      const stub = sinon.stub(vm.$refs.listForDetail, 'setSelectedStatus');
      vm.cancleNodeConfig();
      expect(stub.called).to.equal(true);
      expect(vm.showConfigArea).to.equal(false);
      expect(vm.showEditBtn).to.equal(false);
      stub.restore();
      done();
    });
  });
  it('test pageSwitched', (done) => {
    vm.$nextTick(() => {
      const ary = ['1', '2', '3'];
      vm.pageSwitched(ary);
      expect(vm.currentPage).to.equal(ary[2]);
      vm.pageSwitched([]);
      expect(vm.currentPage).to.equal('recordAdd');
      done();
    });
  });

});

