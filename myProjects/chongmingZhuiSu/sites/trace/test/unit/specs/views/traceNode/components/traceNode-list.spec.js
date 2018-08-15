import util from '../../../../util'
import traceNodeList from '../../../../../../src/views/traceNode/components/traceNode-list.vue'
describe('test components/traceNode-list.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeList);
  });

  after(() => {
    vm.$destroy();
  });


  it('test editNode', () => {
    vm.editable = false;
    const stub = sinon.stub(vm, 'setSelectedStatus');
    const node = {};
    vm.editNode(node);
    expect(stub.called).to.equal(false);
    vm.editable = true;
    vm.editNode(node);
    expect(stub.called).to.equal(true);
    stub.restore();
  });

  it('test copyNode', () => {
    const spy = sinon.spy(vm, '$message');
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({data: [{}]}));
    const node = {};
    vm.isModify = false;
    vm.isAddNodeList = true;
    vm.copyNode(node);
    expect(spy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');
    vm.isAddNodeList = false;
    vm.copyNode(node);
    expect(stub.called).to.equal(true);
    spy.restore();
    stub.restore();
  });


  it('test nodeSort', () => {
    const spy = sinon.spy(vm, '$message');
    const node = {nodeID: '111', sortID: '222'};
    vm.isModify = false;
    vm.isAddNodeList = true;
    vm.nodeSort(node, 1, 2);
    expect(spy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');
    vm.isAddNodeList = false;
    vm.nodeList = [{}];
    vm.nodeSort(node, 1, 2);
    vm.nodeList = [{}, {}, {}, {nodeID: '333', sortID: '444'}];
    vm.nodeSort(node, 0, -1);
    const stub = sinon.stub(vm, 'saveNodeSort', (param) => {
      expect(param).to.deep.equal([{nodeID: '111', sortID: '444'}, {nodeID: '333', sortID: '222'}]);
    });
    vm.nodeSort(node, 1, 2);
    spy.restore();
    stub.restore();
    vm.nodeList = [];
  });

  it('test getData', () => {
    vm.nodeList = [];
    vm.nodeListData = '';
    let stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', data: {rows: []}}));
    vm.getData();

    stub.restore();
    stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '201', msg: 'msgtest'}));
    vm.getData();

    stub.restore();
    stub = sinon.stub(vm.$ajax, 'get', () => Promise.reject('error'));
    vm.getData();

    stub.restore();
  });


  it('test delNode', (done) => {
    const spy = sinon.spy(vm, '$message');
    const confirmStub = sinon.stub(vm, '$confirm', () => Promise.resolve());
    const emitStub = sinon.stub(vm, '$emit');
    const ajaxStub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200'}));
    vm.isAddNodeList = true;
    const currentNode = {nodeID: ''};
    vm.delNode(currentNode, 1);
    expect(spy.firstCall.args[0]).to.equal('请先保存当前编辑的节点信息！');

    vm.isAddNodeList = false;
    vm.delNode(currentNode, 1);

    currentNode.nodeID = 0;
    vm.delNode(currentNode, 1);

    currentNode.nodeID = 1;
    vm.nodeList = [{}, {}, {}];
    vm.delNode(currentNode, 1);


    setTimeout(() => {
      vm.nodeList = [];
      spy.restore();
      confirmStub.restore();
      emitStub.restore();
      ajaxStub.restore();
      done();
    }, 100);
  });


  it('test saveNodeSort', (done) => {
    const data = {x: 1, y: 2};
    const stub = sinon.stub(vm.$ajax, 'post', (arg0, arg1) => {
      expect(arg1.data).to.equal(JSON.stringify(data));
      return Promise.resolve({msg: 'mmm'});
    });
    vm.saveNodeSort(data);
    setTimeout(() => {
      stub.restore();
      done();
    }, 10);
  });

});
