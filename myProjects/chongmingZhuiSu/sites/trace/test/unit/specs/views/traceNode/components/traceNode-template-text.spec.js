import util from '../../../../util'
import traceNodeTemplateText from '../../../../../../src/views/traceNode/components/traceNode-template-text.vue'
describe('test traceNode-template-text.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeTemplateText, {nodeData: {}});
  });

  after(() => {
    vm.$destroy();
  });

  it('test close', () => {
    const spy = sinon.spy(vm, '$emit');
    vm.close();
    expect(spy.firstCall.args[0]).to.equal('deleteEvent');
    expect(spy.firstCall.args[1]).to.equal('子组件的数据');
    spy.restore();
  });

  it('test dataModelInput1', (done) => {
    const fieldExt = [{itemName: 'minSize', itemValue: 'v1'}];
    vm.minValue = false;
    vm.dataModelInput(120, fieldExt, 'minSize');
    setTimeout(() => {
      expect(fieldExt[0].itemValue).to.equal(100);
      expect(vm.minValue).to.equal(true);
      done();
    }, 10);
  });

  it('test dataModelInput2', (done) => {
    const fieldExt = [{itemName: 'minSize', itemValue: 'v1'}];
    vm.minValue = false;
    vm.dataModelInput('', fieldExt, 'minSize');
    setTimeout(() => {
      expect(fieldExt[0].itemValue).to.equal('');
      expect(vm.minValue).to.equal(false);
      done();
    }, 10);
  });

  it('test dataModelInput3', (done) => {
    const fieldExt = [{itemName: 'maxSize', itemValue: 'v1'}];
    vm.minValue = false;
    vm.dataModelInput(120, fieldExt, 'maxSize');
    setTimeout(() => {
      expect(fieldExt[0].itemValue).to.equal(100);
      expect(vm.maxValue).to.equal(true);
      done();
    }, 10);
  });

  it('test dataModelInput4', (done) => {
    const fieldExt = [{itemName: 'maxSize', itemValue: 'v1'}];
    vm.minValue = false;
    vm.dataModelInput('', fieldExt, 'maxSize');
    setTimeout(() => {
      expect(fieldExt[0].itemValue).to.equal('');
      expect(vm.maxValue).to.equal(false);
      done();
    }, 10);
  });

});
