// const proxy = { target: "http://c.kf315.net/", changeOrigin: true };
const proxy = {target: "http://xuanenc.kf315.net", changeOrigin: true};
module.exports = {
  "/SysCorp": proxy,
  "/common": proxy,
  "/Feedback": proxy,
  "/Article": proxy,
  "/Sysslide": proxy,
  "/product": proxy,
  "/sysCorp": proxy,
  "/NontraceabilityCorp": proxy,
  "/Region": proxy,
  "/Syslink": proxy,
  "/Click": proxy
};
