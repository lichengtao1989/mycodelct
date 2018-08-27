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
    // assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // assert.equal(3, result.ops.length);
    // console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs)
//     callback(docs);
//   });
// }
const findDocuments = function (db, json) {
  return new Promise((resolve, reject) => {
    // Get the documents collection
    const collection = db.collection(dbCollection);
    // Find some documents
    // let jsonVal = json;

    // jsonVal.userId = uuidv1().replace(/\-/g, '');
    // console.log(jsonVal)
    collection.find(json).toArray(function (err, docs) {
      // assert.equal(err, null);
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
      console.log(result.length)
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