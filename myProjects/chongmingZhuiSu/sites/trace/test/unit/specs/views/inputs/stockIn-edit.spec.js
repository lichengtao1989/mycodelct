import util from '../../../util'
import StockInEdit from '../../../../../src/views/inputs/stockIn-edit.vue'

describe('inputs -> stockIn-edit', ()=>{
  let vm;

  before(()=>{
    util.init();
    vm = util.createComponent(StockInEdit);
  });

  after(()=>{
    vm.$destroy();
  });

  it('checkInputs', ()=>{
    const messageSpy = sinon.spy(vm.$message, 'warning');
    const inputs = [
      {
        id: '1',
        name: '投入品1',
        type: '1',
        spec: '1',
        quantity: '1',
        productionTime: '2017/1/1',
        productionBatch: 'batch1',
        validTime: '2017/1/1',
        measurementUnit: '个'
      }
    ];
    expect(vm.checkInputs(inputs)).to.equal(true);

    inputs.push({
      id: '',
      name: '',
      type: '',
      spec: '',
      quantity: '',
      productionTime: '',
      productionBatch: '',
      validTime: '',
      measurementUnit: ''
    });
    expect(vm.checkInputs(inputs)).to.equal(true);

    inputs.push({
      id: '1',
      name: '投入品1',
      type: '1',
      spec: '1',
      quantity: '1',
      productionTime: '2017/1/1',
      productionBatch: '',
      validTime: '2017/1/1',
      measurementUnit: '个'
    });
    expect(vm.checkInputs(inputs)).to.equal(false);
    expect(messageSpy.firstCall.args[0]).to.equal('第2行投入品数据验证失败，请填写生产批次');

    messageSpy.restore();
  });

  it('submit', (done)=>{
    vm.submit();
    setTimeout(()=>{
      expect(vm.submitLoading).to.equal(false);
      done();
    }, 100);
  })
});
