import Dialog from '../../../../../src/components/base/dialog'
import util from '../../../util'
import Vue from 'vue'
Vue.use(Dialog);

describe('组件 -> dialog', ()=>{
  before(()=>{
    util.init();
  });

  // it('init', ()=>{
  //   let vm = util.createComponent({
  //     template: '<cjm-dialog :visible="visible" ref="dialog" :height="500" title="test"><div>123</div></cjm-dialog>',
  //     data(){
  //       return {
  //         visible: false
  //       }
  //     }
  //   });
  //   expect(vm.$refs.dialog.dialogHeight).to.equal(500);
  //   expect(vm.$refs.dialog.bodyHeight).to.equal(500-120);
  // });
});
