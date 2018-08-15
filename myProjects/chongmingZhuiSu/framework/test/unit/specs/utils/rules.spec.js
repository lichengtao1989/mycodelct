import {rules} from '../../../../src/utils/rules'

describe('工具类 -> rules规则', ()=>{
  //必填
  it('required', ()=>{
    rules.required.validator(null, '', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('该项为必填项');
    });
    rules.required.validator(null, [], (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('该项为必填项');
    });
    rules.required.validator(null, '1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.required.validator(null, ['1'], (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //手机号
  it('mobile', ()=>{
    rules.mobile.validator(null, '82176279', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的手机号');
    });
    rules.mobile.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.mobile.validator(null, '13112345678', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //固定电话
  it('telephone', ()=>{
    rules.telephone.validator(null, '13112345678', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的电话号码');
    });
    rules.telephone.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.telephone.validator(null, '0571-82176279', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.telephone.validator(null, '82176279', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //手机号或电话
  it('phoneOrMobile', ()=>{
    rules.phoneOrMobile.validator(null, '123', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的手机号或电话号码');
    });
    rules.phoneOrMobile.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.phoneOrMobile.validator(null, '13112345678', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.phoneOrMobile.validator(null, '0571-82176279', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.phoneOrMobile.validator(null, '82176279', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //整数
  it('int', ()=>{
    rules.int.validator(null, 'a', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入整数');
    });
    rules.int.validator(null, '0.1', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入整数');
    });
    rules.int.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.int.validator(null, '123', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.int.validator(null, '-123', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //范围内的整数
  it('intRange', ()=>{
    rules.intRange(-1, 10).validator(null, 'a', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入整数');
    });
    rules.intRange(-1, 10).validator(null, '0.1', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入整数');
    });
    rules.intRange(-1, 10).validator(null, '-3', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入大于-1的整数');
    });
    rules.intRange(-1, 10).validator(null, '12', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入小于10的整数');
    });
    rules.intRange(-1, 10).validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.intRange(-1, 10).validator(null, '-1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.intRange(-1, 10).validator(null, '3', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.intRange(-1, 10).validator(null, '10', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //数字
  it('number', ()=>{
    rules.number.validator(null, 'a', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入数字');
    });
    rules.number.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.number.validator(null, '123', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.number.validator(null, '0.123', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.number.validator(null, '-123', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.number.validator(null, '-0.123', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //范围内的数字
  it('numberRange', ()=>{
    rules.numberRange(-1, 10).validator(null, 'a', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入数字');
    });
    rules.numberRange(-1, 10).validator(null, '-3', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入大于-1的数字');
    });
    rules.numberRange(-1, 10).validator(null, '12', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入小于10的数字');
    });
    rules.numberRange(-1, 10).validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.numberRange(-1, 10).validator(null, '-1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.numberRange(-1, 10).validator(null, '3.5', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.numberRange(-1, 10).validator(null, '10', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //ip地址
  it('ip', ()=>{
    rules.ip.validator(null, 'localhost', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的IP地址');
    });
    rules.ip.validator(null, 'http://192.168.1.1', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的IP地址');
    });
    rules.ip.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.ip.validator(null, '127.0.0.1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.ip.validator(null, '192.168.2.1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.ip.validator(null, '114.114.114.114', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //url
  it('url', ()=>{
    rules.url.validator(null, 'localhost', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的URL地址');
    });
    rules.url.validator(null, '', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.url.validator(null, 'http://127.0.0.1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.url.validator(null, 'https://192.168.2.1', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.url.validator(null, 'http://www.baidu.com/a/b/c?a=1&b=2', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //防伪码
  it('antifakeCode', ()=>{
    rules.antifakeCode.validator(null, '123', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入20位到22位或36位防伪码');
    });
    rules.antifakeCode.validator(null, '01234567890123456789', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.antifakeCode.validator(null, '012345678901234567890', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.antifakeCode.validator(null, '0123456789012345678901', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //物流码
  it('logisticsCode', ()=>{
    rules.logisticsCode.validator(null, '123', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入16位到18位或32位物流码');
    });
    rules.logisticsCode.validator(null, '0123456789012345', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.logisticsCode.validator(null, '01234567890123456', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.logisticsCode.validator(null, '012345678901234567', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
  //身份证号
  it('idCardNo', ()=>{
    rules.idCardNo.validator(null, '123', (error)=>{
      expect(error).to.not.equal(undefined);
      expect(error.message).to.equal('请输入正确的身份证号');
    });
    rules.idCardNo.validator(null, '339005199010171234', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.idCardNo.validator(null, '339005199010171', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.idCardNo.validator(null, '33900519901017123X', (error)=>{
      expect(error).to.equal(undefined);
    });
    rules.idCardNo.validator(null, '33900519901017123x', (error)=>{
      expect(error).to.equal(undefined);
    });
  });
});
