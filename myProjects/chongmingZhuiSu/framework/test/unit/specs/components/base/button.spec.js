import Button from '../../../../../src/components/base/button'
import util from '../../../util'
import Vue from 'vue'

describe('组件 -> button', ()=>{
  before(()=>{
    Vue.globalData.set('powerCodes', ['test1', 'test2']);
  });

  it('有权限码的情况', ()=>{
    let vm = util.createComponent(Button, {
      powerCode: 'test1'
    });
    expect(vm.$el.outerHTML).to.not.equal(undefined);
  });

  it('没权限码的情况', ()=>{
    let vm = util.createComponent(Button, {
      powerCode: 'test3'
    });
    expect(vm.$el.outerHTML).to.equal(undefined);
  })
});
