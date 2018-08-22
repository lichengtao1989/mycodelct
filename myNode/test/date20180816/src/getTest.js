// let formidable = require('formidable');
// let querystring = require('querystring');

// function doAddUsers(req, res) {
//    console.log(req.query);

//   // console.log(querystring.parse(req.url));
//   // console.log(querystring.parse(req.query));



// }
// module.exports = doAddUsers;
// let formidable = require('formidable');
let insertManyMongoDb = require('../lib/db/insertManyMongoDb')

function doAddUsers(req, res) {
  var arr=[];
  arr.push(req.query);
  insertManyMongoDb(arr, res)

}
module.exports = doAddUsers;