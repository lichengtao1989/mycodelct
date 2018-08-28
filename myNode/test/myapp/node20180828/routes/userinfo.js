var express = require('express');
var router = express.Router();
function routerAll(app){
  app.use('/userinfo',router.get('/', function(req, res, next) {
    res.send('userinfo');
  }))
}

module.exports = routerAll;
