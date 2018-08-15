import util from '../../../util'
import traceNodeEdit from '../../../../../src/views/traceNode/traceNode-edit.vue'
describe('test traceNode-edit.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeEdit);
  });

  after(() => {
    vm.$destroy();
  });

  const selectItem = {
    id: "ae8bd5cc-c787-4dfc-95ca-fb95e08c84c5",
    name: "iphone手机",
    productCode: "000240",
    thumbnail1: "https://resource1.app315.net/10054/16e95f583e964fe5ac8857e95c01f33f.png?imageView2/2/w/800/h/800"
  };

  it('test selectHandler', (done) => {
    vm.$nextTick(() => {
      vm.selectHandler(selectItem);
      expect(vm.productInfo).to.equal(selectItem);
      vm.selectHandler();
      expect(vm.productInfo).to.deep.equal({id: '', name: ''});
      done();
    });
  });

  it('test next', (done) => {
    vm.$nextTick(() => {
      vm.selectHandler(selectItem);
      setTimeout(() => {
        vm.next();
        expect(vm.active).to.equal(1);
        done();
      }, 10);
    });
  });

  it('test prev', (done) => {
    vm.$nextTick(() => {
      vm.prev();
      expect(vm.active).to.equal(0);
      done();
    });
  });
});
