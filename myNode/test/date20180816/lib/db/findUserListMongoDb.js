const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'student';
const dbCollection = 'users';

const findUserList = function (req,res) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, client) {
    if (err) {
      throw new Error(err)
    };


    const db = client.db(dbName);
 

    return new Promise((resolve, reject) => {
      // Get the documents collection
      const collection = db.collection(dbCollection);
      // Find some documents
      collection.find({}).toArray(function (err, docs) {
        // assert.equal(err, null);
        if (err) {
          reject(err)
        };
  
        resolve(docs)
      });
    })

  });
 
}


module.exports = findUserList;