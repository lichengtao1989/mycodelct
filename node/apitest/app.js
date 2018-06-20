var express = require("express");
var cors = require("cors");
var http = require("http");
var app = express();
const request = require("superagent");
// const nocache = require('superagent-no-cache');
// const prefix = require('superagent-prefix')('/static');
app.use(cors());
app.get("/index", function(req, res) {
  request
    .get("http://xex.hb.s315.net/SysCorp/GetCorpInfo")
    //  .query({ query: "Manny" })
    .then(function(result) {
      res.send(result.text);
    })
    .catch(function(err) {});
});
app.get("/query", function(req, res) {
  request
    .get("http://xex.hb.s315.net/Article/GetList")
    .query({ pageSize: 1, pageNum: 1, ArticleType: 2 })
    .then(function(result) {
      res.json({
        msg: "success",
        code: 200,
        data: JSON.parse(result.text)
      });
    })
    .catch(function(err) {});
});
app.use(function(req, res) {
  // res.send("nodejs")
});
app.listen(3000);
