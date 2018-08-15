import GlobalData from '../../../../src/utils/globalData.js'
import Vue from 'vue'

Vue.use(GlobalData);

describe('工具类 -> globalData', ()=>{
  it('set and get', ()=>{
    Vue.globalData.set('test1', 'test1');
    expect(Vue.globalData.get('test1')).to.equal('test1');

    Vue.globalData.set('testNamespace', 'test1', 'test11');
    expect(Vue.globalData.get('testNamespace', 'test1')).to.equal('test11');
  });

  it('append', ()=>{
    Vue.globalData.append('test2', ['test2']);
    expect(Vue.globalData.get('test2')).to.deep.equal(['test2']);

    Vue.globalData.append('test2', ['test22']);
    expect(Vue.globalData.get('test2')).to.deep.equal(['test2', 'test22']);
  });
});
