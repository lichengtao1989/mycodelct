const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const uuidv1 = require('uuid/v1');
// console.log(uuidv1().replace(/\-/g, ''));
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'student';
const dbCollection = 'users';
// Use connect method to connect to the server
const insertDocuments = function (db, ary, callback) {
  // Get the documents collection
  const collection = db.collection(dbCollection);
  // Insert some documents
  collection.insertMany(ary, function (err, result) {
    callback(result);
  });
}
const findDocuments = function (db, json) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(dbCollection);
    collection.find(json).toArray(function (err, docs) {
      if (err) {
        reject(err)
      };
      resolve(docs)
    });
  })
}

function insertDb(arr, res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) {
      throw new Error(err)
    };


    const db = client.db(dbName);
    //插入之前先查询
    findDocuments(db, {
      phone: arr[0].phone
    }).then((result) => {
      if (result.length < 1) {
        console.log(arr);
        arr[0].userId = uuidv1().replace(/\-/g, '');
        insertDocuments(db, arr, function (r) {
          res.json({
            resultCode: 200,
            msg: 'success',
            data: {},
            total: r.ops.length
          });
          client.close();

        });
      } else {
        res.json({
          resultCode: 201,
          msg: '已经有该号码的用户了',
          data: {}
        });
      }
      client.close();
    })
  });
};
module.exports = insertDb;