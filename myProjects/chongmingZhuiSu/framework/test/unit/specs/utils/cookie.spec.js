import cookie from '../../../../src/utils/cookie.js'

function parseCookieString(text, shouldDecode) {
  var cookies = {};

  if (typeof text === 'string' && text.length > 0) {
    var cookieParts = text.split(/;\s/g);
    var cookieName;
    var cookieValue;
    var cookieNameValue;

    for (var i = 0, len = cookieParts.length; i < len; i++) {
      cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
      if (cookieNameValue instanceof Array) {
        try {
          cookieName = decodeURIComponent(cookieNameValue[1]);
          if (shouldDecode) {
            cookieValue = decodeURIComponent(cookieParts[i].substring(cookieNameValue[1].length + 1));
          } else {
            cookieValue = cookieParts[i].substring(cookieNameValue[1].length + 1);
          }
        } catch (ex) {
          // Intentionally ignore the cookie -
          // the encoding is wrong
        }
      } else {
        // Means the cookie does not have an "=", so treat it as
        // a boolean flag
        cookieName = decodeURIComponent(cookieParts[i]);
        cookieValue = '';
      }

      if (cookieName) {
        cookies[cookieName] = cookieValue;
      }
    }
  }

  return cookies;
}

describe('工具类 -> cookie', ()=>{
  it('cookie.set', ()=>{
    var date = new Date();
    date.setDate(date.getDate() + 7);
    const cookieStr = cookie.set('test', '1', {
      path: '/test/',
      expires: date,
      domain: 'app315.kf315.net'
    });
    expect(cookieStr).to.equal(`test=1; expires=${date.toUTCString()}; domain=app315.kf315.net; path=/test/`);

    cookie.set('test', '1');
    const cookies = parseCookieString(document.cookie);
    expect(cookies['test']).to.equal('1');
  });

  it('cookie.get', ()=>{
    document.cookie = 'test2=2';
    var test2 = cookie.get('test2');
    expect(test2).to.equal('2');
  });

  it('cookie.remove', ()=>{
    document.cookie = 'test3=3';
    cookie.remove('test3');
    const cookies = parseCookieString(document.cookie);
    expect(cookies['test3']).to.equal(undefined);
  })
});
