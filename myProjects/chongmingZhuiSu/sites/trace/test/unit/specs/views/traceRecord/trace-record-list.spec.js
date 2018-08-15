import util from '../../../util'
import traceReaordList from '../../../../../src/views/traceRecord/traceRecord-list.vue'
describe('test traceRecord-list.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceReaordList);
  });

  after(() => {
    vm.$destroy();
  });

  it('test delNodeRecord single', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const ajaxStub = sinon.stub(vm.$ajax, 'post', (url, params) => {
        expect(params.productBatchID).to.deep.equal(['123']);
        return Promise.resolve({resultCode: '200', msg: 'msgmsgmsg'})
      });
      const msgSpy = sinon.spy(vm, '$message');
      vm.delNodeRecord({productBatchID: '123'});
      setTimeout(() => {
        expect(msgSpy.firstCall.args[0]).to.equal('msgmsgmsg');
        confirmStub.restore();
        ajaxStub.restore();
        msgSpy.restore();
        done();
      }, 10);
    });
  });

  it('test delNodeRecord multiple', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const ajaxStub = sinon.stub(vm.$ajax, 'post', (url, params) => {
        expect(params.productBatchID).to.deep.equal(['111', '222', '333']);
        return Promise.resolve({resultCode: '200', msg: 'msgmsgmsg'})
      });
      const msgSpy = sinon.spy(vm, '$message');
      vm.handleSelectionChange([{productBatchID: '111'}, {productBatchID: '222'}, {productBatchID: '333'}]);
      vm.delNodeRecord({});
      setTimeout(() => {
        expect(msgSpy.firstCall.args[0]).to.equal('msgmsgmsg');
        expect(vm.disableDel).to.equal(false);
        vm.handleSelectionChange([]);
        expect(vm.disableDel).to.equal(true);
        confirmStub.restore();
        ajaxStub.restore();
        msgSpy.restore();
        done();
      }, 10);
    });
  });

  it('test editNodeRecord', () => {
    const spy = sinon.spy(vm, 'pushPage');
    vm.editNodeRecord({productBatchID: 1, productID: 2, productName: 3, traceNodeOrderType: 4});
    expect(spy.firstCall.args[0]).to.equal('recordList');
    expect(spy.firstCall.args[1]).to.equal('编辑溯源记录');
    expect(spy.firstCall.args[2]).to.deep.equal({batchID: 1, productID: 2, productName: 3, productBatchID: 1, orderType: 4});
    vm.editNodeRecord({productBatchID: 1, productID: 2, productName: 3, traceNodeOrderType: ''});
    expect(spy.secondCall.args[2].orderType).to.equal('1');
    spy.restore();
  });

  it('test pageSwitched', () => {
    vm.pageSwitched(['1', '2']);
    expect(vm.currentPage).to.equal('1');
    vm.pageSwitched([]);
    expect(vm.currentPage).to.equal('list');
  });

});
