/**
 * Created by 67340 on 2018/5/28.
 */
const config = {
  camelCodeSystemUrl: ''
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, {
    camelCodeSystemUrl: ''
  });
}else {
  Object.assign(config, {
    camelCodeSystemUrl: 'http://dev.91djb.net/lotcode/superC.php?param='
  });
}

export default config
