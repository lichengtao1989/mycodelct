let formidable = require('formidable');
let insertManyMongoDb = require('../lib/db/insertManyMongoDb')

function doAddUsers(req, res) {
  // console.log(req.url);
  var form = new formidable.IncomingForm();
  var arr = [];
  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    arr.push(fields);
    insertManyMongoDb(arr, res)

  });

}
module.exports = doAddUsers;