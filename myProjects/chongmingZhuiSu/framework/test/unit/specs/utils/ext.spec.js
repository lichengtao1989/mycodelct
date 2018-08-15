import '../../../../src/utils/ext/index.js';

describe('工具类 -> 原生对象扩展', () => {
  it('array.remove', () => {
    let arr = [1, 2, 3];
    arr.remove(1);
    expect(arr).to.deep.equal([2, 3]);
  });

  it('date.toString', () => {
    let date = new Date();
    date.setYear(1990);
    date.setMonth(10 - 1);
    date.setDate(17);
    date.setHours(8);
    date.setMinutes(8);
    date.setSeconds(8);
    expect(date.toString('yyyy-MM-dd')).to.equal('1990-10-17');
    expect(date.toString('yyyy/MM/dd')).to.equal('1990/10/17');
    expect(date.toString('yy/MM/dd')).to.equal('90/10/17');
    expect(date.toString('yyyy/MM/dd HH:mm:ss')).to.equal('1990/10/17 08:08:08');
    expect(date.toString('yy年MM月dd日 HH:mm:ss')).to.equal('90年10月17日 08:08:08');
  });

  it('date.getRange', () => {
    let start = new Date('2017-09-01');
    let end = new Date('2017-09-30');
    let arr = Date.getRange(start, end);
    let arrFirst = arr[0];
    let arrLast = arr[arr.length - 1];
    expect(arr.length).to.equal(30);
    expect(arrFirst).to.deep.equal(new Date('2017-09-01 00:00:00'));
    expect(arrLast).to.deep.equal(new Date('2017-09-30 00:00:00'));
  });

  it('Object.insertAfter', () => {
    let obj = { a: 1 };
    obj = Object.insertAfter(obj, { b: 2 });
    expect(obj).to.deep.equal({ a: 1, b: 2 });
  });

  it('Object.insertBefore', () => {
    let obj = { a: 1 };
    obj = Object.insertBefore(obj, { b: 2 });
    expect(obj).to.deep.equal({ b: 2, a: 1 });
  });

  it('Object.deepClone', () => {
    let obj1 = {
      a: 1,
      b: { b1: 2 },
      c: [1, 2]
    };
    let obj2 = Object.deepClone(obj1);
    expect(obj2).to.not.equal(obj1);
    expect(obj2).to.deep.equal(obj1);
    expect(obj2.b).to.not.equal(obj1.b);
    expect(obj2.b).to.deep.equal(obj1.b);
    expect(obj2.c).to.not.equal(obj1.c);
    expect(obj2.c).to.deep.equal(obj1.c);
  });

  it('Object.transfer', () => {
    let source = {
      a: 11,
      b: 2
    };
    let target = {
      a: 1,
      c: 3
    };
    Object.transfer(source, target);
    expect(target).to.deep.equal({
      a: 11,
      c: 3
    });
  });

  it('Object.sort', () => {
    let source = {
      b: { index: 2 },
      c: { index: 3 },
      a: { index: 1 }
    };
    let result = Object.sort(source, (obj1, obj2) => {
      if (obj1.value.index > obj2.value.index) {
        return 1;
      }
      return -1;
    });
    expect(Object.keys(result)[0]).to.equal('a');
    expect(Object.keys(result)[1]).to.equal('b');
    expect(Object.keys(result)[2]).to.equal('c');
  });

  it('Object.deepMerge', () => {
    let source = {
      a: { a2: 2, a3: 3 }
    };
    let target = {
      a: { a1: 1, a2: -2 },
      b: 1
    };
    Object.deepMerge(target, source);
    expect(target).to.deep.equal({
      a: { a1: 1, a2: 2, a3: 3 },
      b: 1
    });
  });
});
