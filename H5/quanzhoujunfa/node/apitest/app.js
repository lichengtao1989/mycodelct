var express = require("express");
var cors = require("cors");
var http = require("http");
var url = require("url");
var querystring = require('querystring');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var app = express();
const request = require("superagent");
// const nocache = require('superagent-no-cache');
// const prefix = require('superagent-prefix')('/static');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data
app.use(cors());

app.get('/newwap',function(req,res){
console.log(query)
  var query=req.query;
  var method=query.method;
  var datainfo=query.data;
  // var urlval='http://www.kf315.net/newwap/Common/DataService.ashx';
  var urlval='http://www.kf315.net/newwap/Common/DataService.ashx?function=GetCorpIDByCode';
  console.log(urlval)
  request
  .post(urlval)
  .set('Content-Type', 'application/json')
  .send( 'data=%7B%22code%22%3A%2231244044650579303079%22%7D')
  // .send('function=GetAntiFakeCodeCorrespondLotteryActivityID&data=%7B"CorpID"%3A14837%2C"AntiFakeCode"%3A"100540030005003691"%7D')
  .then(function(result) {
    console.log(result)
    res.send(result.text);
  })
  .catch(function(err) {
    console.log(err)
  });
  // console.log(querystring.parse(req.url.query))
  // console.log(querystring.parse(url.parse(req.url.query)))

  // console.log(url.parse(req))
});

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
