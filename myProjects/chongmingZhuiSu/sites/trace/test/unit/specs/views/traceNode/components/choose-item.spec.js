import util from '../../../../util'
import chooseItem from '../../../../../../src/views/traceNode/components/choose-item.vue'
describe('test choose-item.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(chooseItem, {item: {optionValue: {addDay: ''}}});
  });

  after(() => {
    vm.$destroy();
  });

  it('test buttonType', () => {
    expect(vm.buttonType({required: '0'})).to.equal('default');
    expect(vm.buttonType({required: '1'})).to.equal('primary');
    expect(vm.buttonType({required: '2'})).to.equal('default');
  });

  it('test initBtnName', () => {
    const ary = ['产品名称', '新建日期', '流水号', '节点名称', '固定文字', ''];
    ary.forEach((item, index) => {
      expect(vm.initBtnName({tabType: index + 1})).to.equal(item ? item : undefined);
    });
  });

  it('test changeState', () => {
    const stub = sinon.stub(vm, '$emit');
    const item = {required: '1'};
    vm.changeState(item);
    expect(item.required).to.equal('0');
    expect(item.sortID).to.equal(-1);
    vm.changeState(item);
    expect(item.required).to.equal('1');
    expect(item.sortID).to.equal(99);
    stub.restore();
  });

  it('test deleteOption', () => {
    vm.options = [];
    const spy = sinon.spy(vm.options, 'splice');
    vm.deleteOption({}, 10);
    expect(spy.firstCall.args[0]).to.equal(10);
    expect(spy.firstCall.args[1]).to.equal(1);
    spy.restore();
  });

  it('test addOption', () => {
    vm.options = [];
    vm.addOption();
    expect(vm.options[0]).to.deep.equal({required: '1', sortID: 999, tabType: 5, tabValue: '固定文字'});
  });

  it('test addDaysOption1', (done) => {
    vm.$nextTick(() => {
      vm.item = {optionValue: {addDay: '0'}};
      vm.addDaysOption('1');
      expect(vm.dateType).to.equal('1');
      expect(vm.item.optionValue.addDay).to.equal('1');
      done();
    });
  })
  it('test addDaysOption2', (done) => {
    vm.item = {optionValue: {addDay: '0'}};
    vm.addDaysOption('35');
    setTimeout(() => {
      expect(vm.dateType).to.equal('1');
      expect(vm.item.optionValue.addDay).to.equal(31);
      done();
    }, 10);
  })
  it('test addDaysOption3', (done) => {
    vm.item = {optionValue: {addDay: '0'}};
    vm.addDaysOption('');
    setTimeout(() => {
      expect(vm.dateType).to.equal('0');
      expect(vm.item.optionValue.addDay).to.equal('');
      done();
    }, 10);
  })

});
