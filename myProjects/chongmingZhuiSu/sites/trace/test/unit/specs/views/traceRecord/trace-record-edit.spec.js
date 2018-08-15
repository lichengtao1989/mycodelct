import util from '../../../util'
import traceReaordEdit from '../../../../../src/views/traceRecord/traceRecord-edit.vue'
describe('test traceRecord-edit.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceReaordEdit);
  });

  after(() => {
    vm.$destroy();
  });

  it('test addTraceNode', (done) => {
    vm.$nextTick(() => {
      const stub = sinon.stub(vm, 'pushPage', (arg0, arg1, arg2) => {
        expect(arg0).to.equal('recordAdd');
        expect(arg1).to.equal('添加信息');
        expect(arg2).to.equal(vm.params);
        stub.restore();
        done();
      });
      vm.addTraceNode();
    })
  });

  it('test setNoDataMsg', (done) => {
    vm.$nextTick(() => {
      vm.setNoDataMsg(true);
      expect(vm.hasNoData).to.equal(true);
      vm.setNoDataMsg(false);
      expect(vm.hasNoData).to.equal(false);
      done();
    })
  });

  it('test spreadNode', (done) => {
    vm.$nextTick(() => {
      vm.spreadNode(true);
      expect(vm.isAllSpread).to.equal(true);
      vm.spreadNode(false);
      expect(vm.isAllSpread).to.equal(false);
      done();
    });
  });

  it('test sortTraceNode', (done) => {
    vm.currentPage = 'recordList';
    vm.$nextTick(() => {
      vm.preventSortChange = true;
      let ajaxStub = sinon.stub(vm.$ajax, 'post', (arg0, arg1) => {
        expect(arg0).to.equal(vm.traceApiUrl.traceRecord.SET_TEACE_NODE_ORDER_TYPE);
        expect(arg1).to.deep.equal({productBatchID: '123', orderType: 5});
        return Promise.resolve({resultCode: '200'});
      });
      const stStub = sinon.stub(vm, 'setPageParams', (arg0, arg1) => {
        expect(arg0).to.equal('recordList');
        expect(arg1.orderType).to.equal(vm.sort);
      });
      const getDetailsListStub = sinon.stub(vm.$refs.detailList, 'getDetailsList');
      vm.sortTraceNode();
      expect(ajaxStub.called).to.equal(false);
      expect(getDetailsListStub.called).to.equal(false);
      vm.preventSortChange = false;
      vm.sort = 5;
      vm.params.productBatchID = '123';
      vm.sortTraceNode();
      setTimeout(() => {
        expect(getDetailsListStub.called).to.equal(true);
        ajaxStub.restore();
        ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '20'}));
        vm.sortTraceNode();
        ajaxStub.restore();
        ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.reject('error'));
        vm.sortTraceNode();
        ajaxStub.restore();
        stStub.restore();
        getDetailsListStub.restore();
        done();
      }, 10);
    });
  });
});
