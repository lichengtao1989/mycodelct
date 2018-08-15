import util from '../../../util';
import addReset from '../../../../../src/views/codeCorrelation/add-reset.vue';
describe('test add-reset.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(addReset, {ctrl: 'edit', editRow: {bindType: '1'}});
  });

  after(() => {
    vm.$destroy();
  });

  it('test resetCalcCount', (done) => {
    vm.isCodePass = true;
    vm.form.beginCode = ' 1 ';
    vm.form.endCode = ' 2 ';
    vm.resetCalcCount();
    expect(vm.isCodePass).to.equal(false);
    setTimeout(() => {
      expect(vm.form.beginCode).to.equal('1');
      expect(vm.form.endCode).to.equal('2');
      done();
    }, 10);
  });

  it('test codeTrim', (done) => {
    vm.form.codes = '  123  ';
    vm.codeTrim(true);
    setTimeout(() => {
      expect(vm.form.codes).to.equal('123');
      done();
    }, 20);
  });

  it('test beginCodeValidate', (done) => {
    vm.beginCodeErr = 'error';
    const err = new Error(vm.beginCodeErr);
    vm.beginCodeValidate('', '', (arg0) => {
      expect(arg0).to.deep.equal(err);
    });
    setTimeout(() => {
      vm.beginCodeErr = '';
      vm.beginCodeValidate('', '', (arg0) => {
        expect(arg0).to.deep.equal(undefined);
      });
    }, 20);
    setTimeout(() => {
      done();
    }, 40);
  });

  it('test endCodeValidate', (done) => {
    vm.endCodeErr = 'error';
    const err = new Error(vm.endCodeErr);
    vm.endCodeValidate('', '', (arg0) => {
      expect(arg0).to.deep.equal(err);
    });
    setTimeout(() => {
      vm.endCodeErr = '';
      vm.endCodeValidate('', '', (arg0) => {
        expect(arg0).to.deep.equal(undefined);
      });
    }, 20);
    setTimeout(() => {
      done();
    }, 40);
  });

  it('test calcCount 1', (done) => {
    let i = 0;
    vm.form.bindType = '2';
    const stub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve());
    vm.calcCount(() => i++);
    setTimeout(() => {
      expect(i).to.equal(1);
      expect(stub.called).to.equal(false);
      stub.restore();
      done();
    }, 20);
  });

  it('test calcCount 2', (done) => {
    let i = 0;
    vm.form.bindType = '1';
    vm.form.beginCode = '1234567890123456';
    vm.form.endCode = '123456789012345678';
    const stub = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200', data: 5}));
    vm.calcCount(() => i++);
    setTimeout(() => {
      expect(i).to.equal(1);
      expect(vm.calcCountResult).to.equal(5);
      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    }, 20);
  });

  it('test calcCount 3', (done) => {
    let i = 0;
    vm.form.bindType = '1';
    vm.form.beginCode = '1234567890123456';
    vm.form.endCode = '123456789012345678';
    const stub = sinon.stub(vm.$ajax, 'post', () => Promise.reject('err'));
    vm.calcCount(() => i++);
    setTimeout(() => {
      expect(i).to.equal(1);
      expect(vm.beginCodeErr).to.equal('err');
      expect(vm.endCodeErr).to.equal('err');
      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    }, 20);
  });

  it('test codesValid', (done) => {
    vm.form.codes = '1234567890123456\n1234567890123456\n123';
    const errIndex = 2;
    let err = new Error(`第${errIndex}行物流码输入有误`);
    vm.codesValid('', '', (arg0) => {
      expect(arg0).to.deep.equal(err);
      done();
    });
  });

  it('test getRealForm', () => {
    vm.ctrl = 'add';
    vm.form.bindType = '1';
    let form = vm.getRealForm();
    let keys = Object.keys(form);
    expect(keys.includes('beginCode')).to.equal(true);
    expect(keys.includes('endCode')).to.equal(true);
    expect(keys.includes('logisticsCodeCount')).to.equal(true);
    vm.form.bindType = '2';
    form = vm.getRealForm();
    keys = Object.keys(form);
    expect(keys.includes('batchID')).to.equal(true);
    expect(keys.includes('logisticsCodeCount')).to.equal(true);
    vm.form.bindType = '3';
    form = vm.getRealForm();
    keys = Object.keys(form);
    expect(keys.includes('codes')).to.equal(true);
    expect(keys.includes('logisticsCodeCount')).to.equal(true);
  });

  it('test checkIsBinded 1', (done) => {
    vm.ctrl = 'reset';
    vm.checkIsBinded().then((arg0) => {
      expect(arg0).to.equal(0);
    });
    vm.ctrl = 'add';
    vm.form.bindType = '2';
    vm.checkIsBinded().then((arg0) => {
      expect(arg0).to.equal(0);
    });
    vm.form.bindType = '3';
    vm.checkIsBinded().then((arg0) => {
      expect(arg0).to.equal(0);
    });
    setTimeout(done, 20);
  });

  it('test checkIsBinded 2', (done) => {
    vm.ctrl = 'add';
    vm.form.bindType = '1';
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '200', data: 20}));
    vm.checkIsBinded().then((arg0) => {
      expect(arg0).to.equal(0);
      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });

  it('test checkIsBinded 3', (done) => {
    vm.ctrl = 'add';
    vm.form.bindType = '1';
    const stub = sinon.stub(vm.$ajax, 'get', () => Promise.resolve({resultCode: '201', data: 20}));
    vm.checkIsBinded().then((arg0) => {
      expect(arg0).to.equal(20);
      expect(stub.called).to.equal(true);
      stub.restore();
      done();
    });
  });

  it('test formDataCheck', (done) => {
    const stub1 = sinon.stub(vm, 'calcCount', cbk => cbk());
    const stub2 = sinon.stub(vm.$refs.form, 'validate', cbk => cbk(true));
    const stub3 = sinon.stub(vm, 'checkIsBinded', () => Promise.resolve(1));
    const spy = sinon.spy(vm, '$confirm');
    vm.formDataCheck();
    setTimeout(() => {
      expect(spy.firstCall.args[0]).to.equal('该号段中存在已关联的物流码,是否覆盖关联?');
      stub1.restore();
      stub2.restore();
      stub3.restore();
      spy.restore();
      done();
    }, 20);
  });

  it('test submit', (done) => {
    vm.ctrl = 'reset';
    const stub1 = sinon.stub(vm, 'getRealForm', () => ({}));
    const stub2 = sinon.stub(vm.$ajax, 'post', () => Promise.resolve({resultCode: '200'}));
    const stub3 = sinon.stub(vm, 'formDataCheck', () => Promise.resolve())
    vm.submit().then(() => {
      stub1.restore();
      stub2.restore();
      stub3.restore();
      done();
    });
  });

  it('test errMsg', () => {
    let spy = sinon.spy(vm.$message, 'error');
    vm.errMsg('123');
    expect(spy.firstCall.args[0]).to.equal('123');
    vm.errMsg();
    spy.restore();
    spy = sinon.spy(vm.$message, 'error');
    expect(spy.firstCall).to.equal(null);
    spy.restore();
  });

  it('test validSwitch', (done) => {
    vm.form.productID = '';
    vm.form.productBatchID = '';
    const err = new Error('该项为必填项');
    vm.validSwitch({field: 'productID'}, '', (arg0) => {
      expect(arg0).to.deep.equal(err);
    });
    vm.form.productBatchID = '';
    vm.validSwitch({field: 'productBatchID'}, '', (arg0) => {
      expect(arg0).to.deep.equal(err);
    });
    vm.form.productBatchID = '1';
    vm.validSwitch({field: 'productBatchID'}, '', (arg0) => {
      expect(arg0).to.equal(undefined);
    });

    const stub = sinon.stub(vm.$globalData, 'get', () => {
      return {corpType: '1'}
    });
    vm.form.productID = '';
    vm.form.productBatchID = '';
    const err1 = new Error('关联产品和关联批次至少选择一个');
    vm.validSwitch('', '', (arg0) => {
      expect(arg0).to.deep.equal(err1);
      stub.restore();
    });
    setTimeout(done, 20);
  });

  it('test productSelect', (done) => {
    const item = {id: 'aaa', name: 'bbb'};
    vm.productSelect(item);
    setTimeout(() => {
      expect(vm.form.productID).to.equal(item.id);
      expect(vm.form.productName).to.equal(item.name);
    }, 10);
    setTimeout(() => {
      item.id = '';
      vm.productSelect(item);
    }, 20);
    setTimeout(() => {
      expect(vm.form.productID).to.equal('');
      expect(vm.form.productName).to.equal('');
      done();
    }, 30);
  });

  it('test productBatchSelect', (done) => {
    const item = {id: 'aaa', name: 'bbb'};
    vm.productBatchSelect(item);
    setTimeout(() => {
      expect(vm.form.productBatchID).to.equal(item.id);
      expect(vm.form.productBatchCode).to.equal(item.name);
    }, 10);
    setTimeout(() => {
      item.id = '';
      vm.productBatchSelect(item);
    }, 20);
    setTimeout(() => {
      expect(vm.form.productBatchID).to.equal('');
      expect(vm.form.productBatchCode).to.equal('');
      done();
    }, 30);
  });

  it('test batchSelect', (done) => {
    const item = {id: 'aaa', name: 'bbb'};
    vm.batchSelect(item);
    setTimeout(() => {
      expect(vm.form.batchID).to.equal(item.id);
      expect(vm.form.batchName).to.equal(item.name);
    }, 10);
    setTimeout(() => {
      item.id = '';
      vm.batchSelect(item);
    }, 20);
    setTimeout(() => {
      expect(vm.form.batchID).to.equal('');
      expect(vm.form.batchName).to.equal('');
      done();
    }, 30);
  });

});
