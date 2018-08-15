import {storage} from '../../../../src/utils/storage.js'

describe('工具类 -> storage', ()=>{
  it('set and get', ()=>{
    storage.set('test1', 1);
    expect(storage.get('test1')).to.equal(1);
    storage.set('test2', '2');
    expect(storage.get('test2')).to.equal('2');
    storage.set('test3', {test3: '3'});
    expect(storage.get('test3')).to.deep.equal({test3: '3'});
    storage.set('test4', [1, 2, 3]);
    expect(storage.get('test4')).to.deep.equal([1, 2, 3]);
  });

  it('remove', ()=>{
    storage.set('test11', 11);
    storage.remove('test11');
    expect(storage.get('test11')).to.equal(undefined);
  });

  after(()=>{
    storage.remove('test1');
    storage.remove('test2');
    storage.remove('test3');
    storage.remove('test4');
  });
});
