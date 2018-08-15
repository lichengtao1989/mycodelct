import util from '../../../../util'
import traceNodeControl from '../../../../../../src/views/traceNode/components/traceNode-control.vue'
describe('test traceNode-control.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeControl, {nodeData: {}});
  });

  after(() => {
    vm.$destroy();
  });

  it('test selectHandler', () => {
    const item = {productName: ''};
    vm.selectHandler({name: '123'}, item);
    expect(item.productName).to.equal('123');
  });

  it('test radioValue', () => {
    expect(vm.radioValue('aaa', 1)).to.equal('aaa');
    expect(vm.radioValue(0, 0)).to.equal(' ');
    expect(vm.radioValue('bbb', 0)).to.equal('bbb');
  });

  it('test getOptions', () => {
    const item = {tabLabel: ''};
    vm.getOptions('111', 1, item);
    expect(item.tabLabel).to.equal('111');
  });

  it('test tabLabelResultRender', () => {
    vm.productInfo = {name: 'pname'};
    const item = {
      optionValue: {linkString: '无连接符', dateRuleType: 'yyyyMMdd', numberRule: '0001'},
      dataSource: 0,
      tabLabel: [
        {required: '1', sortID: 0, tabType: 1},
        {required: '1', sortID: 1, tabType: 1},
        {required: '1', sortID: 2, tabType: 1}
      ]
    };
    let res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pnamepnamepname');

    item.optionValue.linkString = undefined;
    res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pnamepnamepname');

    item.optionValue.linkString = '--';
    res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pname--pname--pname');

    item.dataSource = 1;
    res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pname--pname--pname');

    item.productName = 'pname2';
    res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pname2--pname2--pname2');

    item.tabLabel[1].tabType = 4;
    item.tabLabel[1].tabValue = 'val4';
    item.tabLabel[2].tabType = 5;
    item.tabLabel[2].tabValue = 'val5';
    res = vm.tabLabelResultRender(item);
    expect(res).to.equal('pname2--val4--val5');

    item.tabLabel[1].tabType = 2;
    item.tabLabel[2].tabType = 3;
    res = vm.tabLabelResultRender(item);
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = String(month).length > 1 ? String(month) : '0' + month;
    const day = now.getDate();
    const dt = year + '' + month + '' + day;
    expect(res).to.equal('pname2--' + dt + '--0001');
  });

  it('test addNewRules', (done) => {
    vm.$nextTick(() => {
      vm.nodeData = {configCreateSet: {length: 1}};
      vm.nodeData.configCreateSet.push = () => {
      };
      const spy = sinon.spy(vm.nodeData.configCreateSet, 'push');
      vm.productInfo = {name: 'pname', id: 'pid', productCode: 'pcode'};
      vm.addNewRules();
      const newRule = spy.firstCall.args[0];
      expect(newRule.corpID).to.equal(vm.$globalData.get('currentUser').corpID);
      expect(newRule.productID).to.equal('pid');
      expect(newRule.productName).to.equal('pname');
      expect(newRule.productCode).to.equal('pcode');
      expect(newRule.sortID).to.equal(vm.nodeData.configCreateSet.length + 1);
      expect(newRule.applyType).to.equal('0');
      vm.productInfo = {name: 'pname'};
      vm.nodeData = {};
      spy.restore();
      setTimeout(done, 150);
    });
  });

  it('test chooseScence', () => {
    vm.scence = false;
    vm.chooseScence();
    expect(vm.scence).to.equal(true);
    expect(vm.nodeData.batchCreateType).to.equal(2);
    vm.chooseScence();
    expect(vm.scence).to.equal(false);
    expect(vm.nodeData.batchCreateType).to.equal(1);
  });

});
