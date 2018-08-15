import traceUtil from '../../../../../src/views/traceNode/util';

describe('test traceNode/util.js', () => {
  it('test createDateFormat', (done) => {
    const opt = {
      optionValue: {},
      tabLabel: [{tabType: 2}]
    };
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = String(month).length > 1 ? String(month) : '0' + month;
    const day = now.getDate();
    let result = '';

    opt.optionValue.dateRuleType = 'yyyy年MM月dd日';
    result = traceUtil.createDateFormat(opt);
    expect(result).to.equal(year + '年' + month + '月' + day + '日');

    opt.optionValue.dateRuleType = 'yyyyMMdd';
    result = traceUtil.createDateFormat(opt);
    expect(result).to.equal(year + '' + month + '' + day);

    opt.optionValue.dateRuleType = 'yyyy/MM/dd';
    result = traceUtil.createDateFormat(opt);
    expect(result).to.equal(year + '/' + month + '/' + day);

    opt.optionValue.dateRuleType = 'yyyy.MM.dd';
    result = traceUtil.createDateFormat(opt);
    expect(result).to.equal(year + '.' + month + '.' + day);

    opt.optionValue.addDay = '1';
    traceUtil.createDateFormat(opt);

    opt.optionValue.addDay = 1;
    traceUtil.createDateFormat(opt);

    done();
  });


  it('test createSerialNumber', () => {
    let result = '';
    result = traceUtil.createSerialNumber({optionValue: {numberRule: '001'}, tabLabel: []});
    expect(result).to.equal('001');
    result = traceUtil.createSerialNumber({optionValue: {numberRule: '0001'}, tabLabel: []});
    expect(result).to.equal('0001');
    result = traceUtil.createSerialNumber({optionValue: {numberRule: '00001'}, tabLabel: [{tabType: 3}]});
    expect(result).to.equal('00001');
  });

  it('test contains', () => {
    expect(traceUtil.contains([11, 22, 33], 22)).to.equal(true);
  });
});
