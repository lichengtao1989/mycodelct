const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
// const dbName = 'student';

// Use connect method to connect to the server

function connectDb(dbName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (err, client) {
      if (err) {
        // throw new Error(err)
        reject(err);
      };
      // console.log("Connected successfully to server");

      const db = client.db(dbName);
      resolve(db)
      // client.close();
    });
  })
}
module.exports = connectDb;