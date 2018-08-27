// let formidable = require('formidable');
// let querystring = require('querystring');

// function doAddUsers(req, res) {
//    console.log(req.query);

//   // console.log(querystring.parse(req.url));
//   // console.log(querystring.parse(req.query));



// }
// module.exports = doAddUsers;
// let formidable = require('formidable');

let connectDb = require('../lib/db/connect');
let deleteData = require('../lib/db/deleteData');

let dbName = 'student';
let docName = 'users';

function doDelete(req, res) {
  // console.log(req.query.id)
  let query = req.query;
  let myres = res;
  connectDb().then((client) => {
    let db=client.db(dbName);
    deleteData(db, docName, query).then((r) => {
      console.log(r)
      if(r.result.ok>0){
        myres.json({
          resultCode: 200,
          msg: 'success',
          data: {},
          total: r.result.ok
        });
        client.close();
      }
     
    }, (e) => {
      myres.json({
        resultCode: 500,
        msg: 'fail',
        data: {},
        total: ''
      })
      console.log(e);
    })
  }, (reject) => {
    console.log(reject)
  })
}
module.exports = doDelete;