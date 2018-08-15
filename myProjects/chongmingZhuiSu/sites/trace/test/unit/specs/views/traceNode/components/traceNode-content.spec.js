import util from '../../../../util'
import traceNodeContent from '../../../../../../src/views/traceNode/components/traceNode-content.vue'
describe('test traceNode-content.vue', () => {
  let vm;
  before(() => {
    util.init();
    vm = util.createComponent(traceNodeContent, {nodeData: {fieldConfig: []}});
  });

  after(() => {
    vm.$destroy();
  });

  it('test deleteTemplate', () => {
    vm.nodeData.fieldConfig = [{sortID: 111, x: 1}, {sortID: 222, y: 2}, {sortID: 333, z: 3}];
    vm.deleteTemplate(1);
    console.log(vm.nodeData.fieldConfig);
    expect(vm.nodeData.fieldConfig).to.deep.equal([{sortID: 0, x: 1}, {sortID: 1, z: 3}]);
    vm.nodeData.fieldConfig = [];
  });

  it('test sortList', () => {
    vm.nodeData.fieldConfig = [{sortID: 111, x: 1}, {sortID: 222, y: 2}, {sortID: 333, z: 3}];
    vm.sortList();
    expect(vm.nodeData.fieldConfig).to.deep.equal([{sortID: 0, x: 1}, {sortID: 1, y: 2}, {sortID: 2, z: 3}]);
    vm.nodeData.fieldConfig = [];
  })

});
