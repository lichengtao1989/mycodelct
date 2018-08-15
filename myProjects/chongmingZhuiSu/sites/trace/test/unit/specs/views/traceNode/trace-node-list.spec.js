import util from '../../../util'
import traceNodeList from '../../../../../src/views/traceNode/traceNode-list.vue'
describe('test traceNode-list.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeList);
  });

  after(() => {
    vm.$destroy();
  });

  it('test openNewBuild', (done) => {
    vm.$nextTick(() => {
      const stub = sinon.stub(vm, 'pushPage', (arg0, arg1, arg2) => {
        expect(arg0).to.equal('node');
        expect(arg1).to.equal('新建节点');
        expect(arg2).to.deep.equal({id: 'build'});
      });
      vm.openNewBuild();
      setTimeout(() => {
        stub.restore();
        done();
      }, 10);
    });
  });

  it('test edit', (done) => {
    const row = {productID: 'productID111', productName: 'productName222'};
    const stub = sinon.stub(vm, 'pushPage');
    vm.edit(row);
    expect(vm.productInfo.id).to.equal('productID111');
    expect(vm.productInfo.name).to.equal('productName222');
    expect(stub.called).to.equal(true);
    done();
  });

  it('test deleteProductNode', (done) => {
    vm.$nextTick(() => {
      const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
      const ajaxStub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({}));
      const msgSpy = sinon.spy(vm, '$message');
      vm.deleteProductNode({productID: '123'});
      setTimeout(() => {
        expect(msgSpy.firstCall.args[0]).to.equal('已完成操作！');
        confirmStub.restore();
        ajaxStub.restore();
        msgSpy.restore();
        done();
      }, 10);
    });


  });


});
