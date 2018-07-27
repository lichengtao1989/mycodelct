// const proxy = {target: "http://xuanenc.kf315.net", changeOrigin: true};
const proxy = {
  target: "http://dxx.kf315.net/",
  changeOrigin: true
};
// const proxy = {target: "http://dxx.sx.s315.net/", changeOrigin: true};
module.exports = {
  "/SysCorp": proxy,
  "/common": proxy,
  "/Feedback": proxy,
  "/Article": proxy,
  "/Sysslide": proxy,
  "/product": proxy,
  "/Product": proxy,
  "/Material": proxy,
  "/sysCorp": proxy,
  "/NontraceabilityCorp": proxy,
  "/Region": proxy,
  "/Syslink": proxy,
  "/Files": proxy,
  "/File": proxy,
  "/News": proxy,
  "/Sysimage": proxy,
  "/Click": proxy
};
