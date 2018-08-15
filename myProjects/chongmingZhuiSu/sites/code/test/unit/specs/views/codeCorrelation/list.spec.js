import util from '../../../util';
import codeCorrelationList from '../../../../../src/views/codeCorrelation/list.vue';
describe('test list.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(codeCorrelationList);
  });

  after(() => {
    vm.$destroy();
  });

  it('test editCodeCorrelation', () => {
    const row = {};
    vm.addResetDialogVisible = false;
    vm.editCodeCorrelation(row);
    expect(vm.editRow).to.equal(row);
    expect(vm.dislogTitle).to.equal('重定义码关联');
    expect(vm.dialogHeight).to.equal(580);
    expect(vm.dialogCtrl).to.equal('edit');
    expect(vm.addResetDialogVisible).to.equal(true);
    vm.addResetDialogVisible = false;
  });

  it('test addCodeCorrelation', () => {
    vm.addResetDialogVisible = false;
    vm.addCodeCorrelation();
    expect(vm.editRow).to.deep.equal({});
    expect(vm.dislogTitle).to.equal('码关联');
    expect(vm.dialogHeight).to.equal(580);
    expect(vm.dialogCtrl).to.equal('add');
    expect(vm.addResetDialogVisible).to.equal(true);
    vm.addResetDialogVisible = false;
  });

  it('test codeCorrelationReset', () => {
    vm.addResetDialogVisible = false;
    vm.codeCorrelationReset();
    expect(vm.editRow).to.deep.equal({});
    expect(vm.dislogTitle).to.equal('重置码关联');
    expect(vm.dialogHeight).to.equal(470);
    expect(vm.dialogCtrl).to.equal('reset');
    expect(vm.addResetDialogVisible).to.equal(true);
    vm.addResetDialogVisible = false;
  });

  it('test addResetSubmit 1', (done) => {
    vm.addResetDialogVisible = true;
    vm.$nextTick(() => {
      const stub = sinon.stub(vm.$refs.addReset, 'submit', () => Promise.resolve({longMsg: 'xxx'}));
      vm.addResetSubmit(() => false);
      setTimeout(() => {
        expect(vm.addResetDialogVisible).to.equal(false);
        expect(vm.longMsgText).to.equal('xxx');
        stub.restore();
        done();
      }, 20);
    });
  });

  it('test addResetSubmit 2', (done) => {
    vm.addResetDialogVisible = true;
    vm.$nextTick(() => {
      const stub = sinon.stub(vm.$refs.addReset, 'submit', () => Promise.reject({longMsg: 'xxx'}));
      vm.addResetSubmit(() => false);
      setTimeout(() => {
        expect(vm.addResetDialogVisible).to.equal(false);
        expect(vm.longMsgText).to.equal('xxx');
        stub.restore();
        done();
      }, 20);
    });
  });

  it('test clearLongMsg', () => {
    vm.longMsgText = 'xxxxx';
    vm.clearLongMsg();
    expect(vm.longMsgText).to.equal('');
  });

});
