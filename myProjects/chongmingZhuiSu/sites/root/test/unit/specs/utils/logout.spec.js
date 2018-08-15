import {clear, addClearHandler, addLogoutHandler} from '../../../../src/utils/logout'
import logout from '../../../../src/utils/logout'
import {storage} from 'framework/utils/storage'
import util from '../../util'
import cookie from 'framework/utils/cookie'

function checkClear(fun) {
  storage.set('root-appConfig', 'root-appConfig');
  storage.set('userInfo', 'userInfo');
  storage.set('menuData', 'menuData');
  storage.set('powerData', 'powerData');
  storage.set('systemList', 'systemList');
  storage.set('userConfig', 'userConfig');

  fun();

  expect(storage.get('root-appConfig')).to.equal(undefined);
  expect(storage.get('userInfo')).to.equal(undefined);
  expect(storage.get('menuData')).to.equal(undefined);
  expect(storage.get('powerData')).to.equal(undefined);
  expect(storage.get('systemList')).to.equal(undefined);
  expect(storage.get('userConfig')).to.equal(undefined);
}

describe('工具类 -> logout', ()=>{
  before(()=>{
      util.init();
  });

  it('clear', ()=>{
    checkClear(clear);

    var handler1 = sinon.spy();
    var handler2 = sinon.spy();
    addClearHandler(handler1);
    addClearHandler(handler2);
    clear();
    expect(handler1.calledOnce).to.equal(true);
    expect(handler2.calledOnce).to.equal(true);
  });

  it('logout', ()=>{
    checkClear(logout);

    cookie.set('access_token', 'test');
    var handler1 = sinon.spy();
    var handler2 = sinon.spy();
    addLogoutHandler(handler1);
    addLogoutHandler(handler2);
    logout();
    expect(handler1.calledOnce).to.equal(true);
    expect(handler2.calledOnce).to.equal(true);
    expect(cookie.get('access_token')).to.equal(undefined);
  });
});
