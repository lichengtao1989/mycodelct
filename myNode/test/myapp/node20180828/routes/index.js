var express = require('express')
var router = express.Router()
//实现路由的模块化
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('home page')
})
// define the about route
router.get('/users', function (req, res) {
  res.send('users')
})

router.get('/abouts', function (req, res) {
  res.send('abouts abouts birds')
})
module.exports = router

// var express = require('express');
// var router = express.Router();
// var indexRouter = require('./indexRouter')
// var usersRouter = require('./users')

// function routerAll(app) {


//   app.use('/userinfo', router.get('/', function (req, res, next) {
//     res.send('userinfo');
//   }));
 

// }

// module.exports = routerAll;




// // var express = require('express');
// // var router = express.Router();

// // /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express1' });
// // });



// // module.exports = router;


// // // module.exports = routers;