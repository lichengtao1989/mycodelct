import util from '../../../../util'
import traceModelMine from '../../../../../../src/views/traceNode/components/traceNode-model-mine.vue'
describe('test components/traceNode-model-mine.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceModelMine);
  });

  after(() => {
    vm.$destroy();
  });

  it('test submit1', (done) => {
    vm.checkNodesModel = [];
    vm.model.checkNodes = [];
    vm.productInfo = {id: ''};
    const spy = sinon.spy(vm, '$message');
    vm.submit();
    setTimeout(() => {
      expect(spy.firstCall.args[0]).to.equal('未添加节点模板！');
      spy.restore();
      setTimeout(done, 30);
    }, 10);
  });

  it('test submit2', (done) => {
    vm.checkNodesModel = [1];
    vm.model.checkNodes = [1, 2];
    vm.productInfo = {id: '1'};
    vm.nodeList = [{sortID: 1}];
    const stub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200'}));
    vm.submit();
    setTimeout(() => {
      vm.checkNodesModel = [];
      vm.model.checkNodes = [];
      stub.restore();
      setTimeout(done, 30);
    }, 10);
  });

  it('test selectItem', (done) => {
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', data: {rows: [{}, {}, {}]}}));
    vm.selectItem({}, 22);
    setTimeout(() => {
      expect(vm.model.active).to.equal(22);
      expect(vm.model.nodeListData.length).to.equal(3);
      stub.restore();
      done();
    }, 10);
  });

  it('test checkAll', () => {
    vm.model.nodeListData = [{nodeID: 111}, {nodeID: 222}];
    vm.checkAll({target: {checked: false}});
    expect(vm.model.checkNodes.length).to.equal(0);
    vm.checkAll({target: {checked: true}});
    expect(vm.model.checkNodes).to.deep.equal([111, 222]);
    vm.model.nodeListData = [];
  });

  it('test reset', () => {
    vm.model.nodeListData = [1];
    vm.model.checkNodes = [2];
    vm.model.selectAll = true;
    vm.model.active = 3;
    vm.reset();
    expect(vm.model.nodeListData).to.deep.equal([]);
    expect(vm.model.checkNodes).to.deep.equal([]);
    expect(vm.model.selectAll).to.equal(false);
    expect(vm.model.active).to.equal(0);
  });

});
