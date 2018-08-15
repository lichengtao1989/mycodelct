import url from '../../../../src/utils/url.js'

describe('工具类 -> url', ()=>{
  it('getParam', ()=>{
    var stub = sinon.stub(url, 'getLocationSearch').returns(`?age=18&Gender=m&NAME=${encodeURIComponent('高凯')}`);

    expect(url.getParam('age')).to.equal('18');
    expect(url.getParam('gender')).to.equal('m');
    expect(url.getParam('name')).to.equal('高凯');

    stub.restore();
  });

  it('getParams', ()=>{
    var stub = sinon.stub(url, 'getLocationSearch').returns(`?age=18&Gender=m&NAME=${encodeURIComponent('高凯')}`);

    var params = url.getParams();
    expect(params['age']).to.equal('18');
    expect(params['gender']).to.equal('m');
    expect(params['name']).to.equal('高凯');

    stub.restore();
  });
});
