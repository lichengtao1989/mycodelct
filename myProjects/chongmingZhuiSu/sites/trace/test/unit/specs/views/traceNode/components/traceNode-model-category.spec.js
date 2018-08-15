import util from '../../../../util'
import traceModelCategory from '../../../../../../src/views/traceNode/components/traceNode-model-category.vue'
describe('test components/traceNode-model-category.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceModelCategory);
  });

  after(() => {
    vm.$destroy();
  });

  it('test selectItem', () => {
    const item = {subItems: [1, 2, 3]};
    vm.selectItem(item, 1);
    const oldModel = util.deepClone(vm.model);
    expect(vm.model.secondListData).to.equal(item.subItems);
    expect(vm.model.active).to.equal(1);
    expect(vm.model.nodeListData).to.equal('');
    expect(vm.model.checkNodes).to.deep.equal([]);
    expect(vm.model.secondActive).to.equal('');
    vm.model = oldModel;
  });


  it('test selectSecondItem', (done) => {
    const item = {categoryID: '1'};
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', data: {rows: [{}, {}]}}));
    const oldModel = util.deepClone(vm.model);
    vm.selectSecondItem(item, 1);
    setTimeout(() => {
      stub.restore();
      expect(vm.model.nodeListData.length).to.equal(2);
      vm.model = oldModel;
      done();
    }, 10);
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

  it('test checkAll', () => {
    vm.model.nodeListData = [{nodeID: 111}, {nodeID: 222}];
    vm.checkAll({target: {checked: false}});
    expect(vm.model.checkNodes.length).to.equal(0);
    vm.checkAll({target: {checked: true}});
    expect(vm.model.checkNodes).to.deep.equal([111, 222]);
    vm.model.nodeListData = [];
  });


});
